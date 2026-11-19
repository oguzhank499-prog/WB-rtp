import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const port=Number(process.env.PORT||8787);
// Local-only by default: explicit configuration is required for network exposure.
const bindHost=process.env.WB_BIND_HOST||'127.0.0.1';
const maxQuestionRequests=Math.max(1,Math.min(60,Number(process.env.WB_RATE_LIMIT)||8));
const maxBodyBytes=12000;
const requestTimeoutMs=10000;
const apiKey=process.env.OPENAI_API_KEY;
const model=process.env.OPENAI_MODEL||'gpt-4.1-mini';
const buckets=new Map();
const securityHeaders={'X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"};
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.md':'text/plain; charset=utf-8'};
function json(res,status,body){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...securityHeaders});res.end(JSON.stringify(body))}
const server=http.createServer(async(req,res)=>{
const host=req.headers.host||'';if(!/^[a-zA-Z0-9.\-\[\]:]+$/.test(host)){json(res,400,{error:'Geçersiz istek'});return}
if((bindHost==='127.0.0.1'||bindHost==='localhost'||bindHost==='::1')&&!/^(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(host)){json(res,403,{error:'Yerel sunucuya geçersiz Host'});return}
const origin=req.headers.origin;
if(origin){let u;try{u=new URL(origin)}catch{json(res,403,{error:'İzin verilmeyen origin'});return}if(u.host!==host||!['http:','https:'].includes(u.protocol)){json(res,403,{error:'İzin verilmeyen origin'});return}}
let path;try{path=new URL(req.url||'/',`http://${host}`).pathname}catch{json(res,400,{error:'Geçersiz URL'});return}
if(path==='/api/health'){if(req.method!=='GET'){json(res,405,{error:'GET gerekli'});return}json(res,200,{status:'ok',aiConfigured:Boolean(apiKey)});return}
if(path==='/api/wb-ai'){
if(req.method!=='POST'){json(res,405,{error:'POST gerekli'});return}
if(!apiKey){json(res,503,{error:'AI sunucusu yapılandırılmadı. OPENAI_API_KEY gerekli.'});return}
if(!(req.headers['content-type']||'').startsWith('application/json')){json(res,415,{error:'JSON gerekli'});return}
const ip=req.socket.remoteAddress||'unknown';const now=Date.now();const recent=(buckets.get(ip)||[]).filter(t=>now-t<60000);if(recent.length>=maxQuestionRequests){json(res,429,{error:`Dakikada en fazla ${maxQuestionRequests} soru gönderebilirsin.`});return}recent.push(now);buckets.set(ip,recent);if(buckets.size>10000)buckets.clear();
let raw='';let bytes=0;let tooLong=false;req.setTimeout(requestTimeoutMs,()=>req.destroy());try{for await(const chunk of req){bytes+=chunk.length;if(bytes>maxBodyBytes){tooLong=true;break}raw+=chunk.toString('utf8')}}catch{if(!res.destroyed)json(res,408,{error:'İstek tamamlanamadı'});return}if(tooLong){json(res,413,{error:'İstek çok uzun'});return}
let question;try{question=JSON.parse(raw).question}catch{json(res,400,{error:'Geçersiz JSON'});return}
if(typeof question!=='string'||question.trim().length<5||question.length>4000){json(res,400,{error:'Soru 5–4000 karakter olmalı.'});return}
try{const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({model,store:false,max_output_tokens:1100,instructions:'Sen WB Kimya Akademisi için Türkçe konuşan üniversite düzeyinde kimya öğretmenisin. Kısa, adım adım, hesapları birimleriyle açıkla. Emin olmadığın bilgiyi belirt. Zararlı kimyasal üretimi ve tehlikeli deneyler için uygulamalı talimat verme. Bilimsel güvenilirliği önemse.',input:question.trim()}),signal:AbortSignal.timeout(25000)});
const data=await response.json();if(!response.ok){console.error('AI sağlayıcı hata kodu',response.status);json(res,502,{error:'AI sağlayıcısına erişilemedi.'});return}
const answer=(data.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text||'').join('\n').trim();if(!answer){json(res,502,{error:'AI boş yanıt döndürdü.'});return}json(res,200,{answer:answer.slice(0,12000)})
}catch(e){console.error('AI bağlantı hatası',e.name);json(res,502,{error:'AI bağlantısı başarısız veya zaman aşımına uğradı.'})}return}
if(req.method!=='GET'&&req.method!=='HEAD'){json(res,405,{error:'Yöntem desteklenmiyor'});return}
let pathname;try{pathname=decodeURIComponent(path)}catch{json(res,400,{error:'Geçersiz yol'});return}
const file=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!(file===root||file.startsWith(root+sep))||file.includes(`${sep}server${sep}`)||file.endsWith(`${sep}server`)||pathname.split('/').some(segment=>segment.startsWith('.'))||!['.html','.js','.css','.json','.webmanifest','.svg','.png','.ico'].includes(extname(file))){json(res,404,{error:'Bulunamadı'});return}
try{const s=await stat(file);if(!s.isFile())throw Error('not file');const data=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream',...securityHeaders,'Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:data)}catch{json(res,404,{error:'Dosya bulunamadı'})}
});
server.listen(port,bindHost,()=>console.log(`WB server listening on ${bindHost}:${port}`));

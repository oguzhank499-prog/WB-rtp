import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
const port=18000+Math.floor(Math.random()*20000);
const base=`http://127.0.0.1:${port}`;
const child=spawn(process.execPath,['server/server.mjs'],{cwd:new URL('../',import.meta.url),env:{...process.env,PORT:String(port),WB_BIND_HOST:'127.0.0.1',OPENAI_API_KEY:''},stdio:'ignore'});
try{
 for(let i=0;i<60;i++){try{const r=await fetch(base+'/api/health');if(r.ok)break}catch{}await delay(50)}
 test('health reports no API key',async()=>{const r=await fetch(base+'/api/health');assert.equal(r.status,200);assert.deepEqual(await r.json(),{status:'ok',aiConfigured:false})});
 test('homepage and JS load',async()=>{for(const p of ['/','/wb-online-ai.js']){const r=await fetch(base+p);assert.equal(r.status,200);assert.equal(r.headers.get('x-content-type-options'),'nosniff')}});
 test('no private source files exposed',async()=>{for(const p of ['/server/server.mjs','/server/README.md','/CHANGELOG-40.md','/.env','/%2eenv']){const r=await fetch(base+p);assert.equal(r.status,404,p)}});
 test('AI requires key and POST',async()=>{let r=await fetch(base+'/api/wb-ai');assert.equal(r.status,405);r=await fetch(base+'/api/wb-ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:'What is water?'})});assert.equal(r.status,503)});
 test('DNS rebinding host blocked',async()=>{const status=await new Promise((resolve,reject)=>{import('node:http').then(({request})=>{const q=request(base+'/api/health',{headers:{Host:'attacker.example'}},r=>{r.resume();resolve(r.statusCode)});q.on('error',reject);q.end()})});assert.equal(status,403)});
 test('unsupported methods and content security',async()=>{const r=await fetch(base+'/',{method:'POST'});assert.equal(r.status,405);const h=await fetch(base+'/api/health');assert.equal(h.headers.get('content-security-policy')!==null,true)});
 test('cross origin request denied',async()=>{const r=await fetch(base+'/api/health',{headers:{Origin:'https://evil.example'}});assert.equal(r.status,403)});
}finally{process.on('exit',()=>child.kill());setTimeout(()=>child.kill(),1000).unref()}

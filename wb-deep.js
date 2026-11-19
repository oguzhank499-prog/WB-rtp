(()=>{
'use strict';
const host=document.querySelector('#wb-mastery');
if(!host)return;
const KEY='wb-deep-practice-v2',DAY=86400000;
const problems=[
{id:'h3o',topic:'Formal yük',level:'Temel',prompt:'H₃O⁺ iyonunda oksijenin formal yükü nedir?',choices:['−1','0','+1','+2'],answer:2,why:'Oksijenin 6 değerlik elektronu vardır. 1 ortaklanmamış çift (2 elektron) ve 3 tek bağ: FY = 6 − 2 − 3 = +1.',trap:'Oksijenin üç bağ yaptığı için yüksüz olduğunu düşünmek.'},
{id:'nh4',topic:'Formal yük',level:'Temel',prompt:'NH₄⁺ iyonunda azotun formal yükü nedir?',choices:['−1','0','+1','+2'],answer:2,why:'Azotun 5 değerlik elektronu, 0 bağ yapmayan elektronu ve 4 tek bağı vardır: FY = 5 − 0 − 4 = +1.',trap:'İyonun toplam yükü ile tek atomun formal yükünü ayıramamak.'},
{id:'no3',topic:'Rezonans',level:'Uygulama',prompt:'NO₃⁻ için eşdeğer başlıca rezonans Lewis yapısı sayısı kaçtır?',choices:['1','2','3','4'],answer:2,why:'Bir N=O çift bağı üç farklı oksijene yerleştirilebilir. Üç eşdeğer başlıca rezonans yapısı bulunur; gerçek yapı rezonans hibritidir.',trap:'Rezonans yapılarını farklı moleküller sanmak.'},
{id:'co2',topic:'Lewis',level:'Uygulama',prompt:'O=C=O yapısında merkez karbonun formal yükü kaçtır?',choices:['−2','−1','0','+2'],answer:2,why:'Karbonun 4 değerlik elektronu ve toplam 4 bağ mertebesi vardır: FY = 4 − 0 − 4 = 0.',trap:'Çift bağı tek bağ gibi saymak.'},
{id:'cn',topic:'Lewis',level:'İleri',prompt:'CN⁻ için :C≡N: Lewis yapısında karbonun formal yükü kaçtır?',choices:['−1','0','+1','−2'],answer:0,why:'Karbon 4 değerlik elektronu taşır; 2 bağ yapmayan elektron ve üçlü bağdan 3 pay alır: FY = 4 − 2 − 3 = −1. Azotun formal yükü 0’dır.',trap:'Negatif yükün mutlaka daha elektronegatif azotta olması gerektiğini düşünmek.'},
{id:'o3',topic:'Rezonans',level:'İleri',prompt:'O₃ için O=O–O rezonans yapısında merkez oksijenin formal yükü kaçtır?',choices:['−1','0','+1','+2'],answer:2,why:'Merkez oksijende 1 ortaklanmamış çift ve toplam 3 bağ mertebesi bulunur: FY = 6 − 2 − 3 = +1.',trap:'Rezonans nedeniyle her oksijenin formal yükünü sıfır sanmak.'},
{id:'bf3',topic:'Oktet',level:'İleri',prompt:'BF₃ molekülünde merkez bor için doğru ifade hangisidir?',choices:['Borun 8 elektronu vardır','Bor 6 elektronla eksik oktetlidir','Bor 10 elektron taşır','Molekül zorunlu olarak iyoniktir'],answer:1,why:'BF₃’te bor üç tek bağ yapar ve çevresinde 6 elektron bulunur. Bor eksik oktetli bir Lewis asididir.',trap:'Oktet kuralının her merkez atom için istisnasız geçerli olduğunu varsaymak.'},
{id:'so4',topic:'Formal yük',level:'Ustalık denemesi',prompt:'SO₄²⁻ için dört S–O tek bağı içeren Lewis gösteriminde kükürdün formal yükü kaçtır?',choices:['0','+2','−2','+4'],answer:1,why:'Kükürt 6 değerlik elektronu taşır, bağ yapmayan elektron yoktur ve dört tek bağdan 4 pay alır: FY = 6 − 0 − 4 = +2. Bu, sülfat için olası Lewis gösterimlerinden biridir.',trap:'Formal yükü tüm rezonans gösterimlerinde değişmez sanmak.'}
];
let data;try{data=JSON.parse(localStorage.getItem(KEY)||'{}')}catch{data={}}
if(!data||typeof data!=='object'||Array.isArray(data))data={};
data.records??={};data.log??=[];data.notes??={};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(data))}catch{status.textContent='Depolama kullanılamıyor; bu oturumdaki kayıtlar kalıcı olmayabilir.'}};
const wrap=document.createElement('div');wrap.id='wb-deep';wrap.innerHTML=`
<div class="panel"><div class="wb-deep-head"><h3>Derin Çalışma</h3><span class="wb-deep-tag">WB · Ustalık</span></div><p class="muted">Soruyu önce yardımsız çöz. Sonra nedenini ve yanlış düşünceni kaydet.</p>
<div class="wb-deep-stats"><div><strong id="deep-solved">0</strong><small>Çözülen</small></div><div><strong id="deep-accuracy">—</strong><small>İlk deneme doğruluğu</small></div><div><strong id="deep-due">0</strong><small>Tekrar zamanı</small></div></div>
<div class="wb-deep-actions"><button id="deep-new">Yeni soru</button><button id="deep-review">Tekrarları çalış</button></div>
<p id="deep-status" class="muted" aria-live="polite"></p></div>
<div class="panel"><div class="wb-deep-head"><span id="deep-topic" class="wb-deep-tag"></span><span id="deep-level" class="muted"></span></div>
<h3 id="deep-prompt"></h3><div id="deep-options"></div>
<div id="deep-result" aria-live="polite" hidden></div>
<div id="deep-reflection" hidden><label for="deep-note">Nerede zorlandın? Kendi açıklamanı yaz (isteğe bağlı).</label><textarea id="deep-note" rows="3" placeholder="Örn. Bağ mertebesini yanlış saydım."></textarea><button id="deep-save-note">Notu kaydet</button></div></div>
<div class="panel"><h3>Akıllı tekrar defteri</h3><p class="muted">Yanlış cevaplar 1 gün, doğru cevaplar artan aralıklarla (1, 3, 7, 14 gün) yeniden sorulur. Bu, başlangıç algoritmasıdır; ustalık kanıtı değildir.</p><div id="deep-review-list"></div><button id="deep-export" class="wide">Çalışma verilerimi JSON olarak indir</button></div>`;
host.append(wrap);
const el=id=>document.getElementById(id),status=el('deep-status');
let current=null,locked=false,reviewMode=false;
function due(rec){return rec&&rec.due<=Date.now()}
function record(id){return data.records[id]}
function choose(){
 const dueList=problems.filter(p=>due(record(p.id)));
 const unseen=problems.filter(p=>!record(p.id));
 const pool=reviewMode?dueList:(unseen.length?unseen:dueList.length?dueList:problems);
 if(!pool.length){current=null;el('deep-prompt').textContent=reviewMode?'Şu an zamanı gelmiş tekrar yok.':'Henüz soru bulunamadı.';el('deep-options').replaceChildren();el('deep-result').hidden=true;el('deep-reflection').hidden=true;status.textContent='Sonraki tekrar zamanını aşağıda görebilirsin.';return}
 current=pool[Math.floor(Math.random()*pool.length)];locked=false;
 el('deep-topic').textContent=current.topic;el('deep-level').textContent=current.level;
 el('deep-prompt').textContent=current.prompt;el('deep-result').hidden=true;el('deep-reflection').hidden=true;el('deep-note').value=data.notes[current.id]||'';
 el('deep-options').replaceChildren(...current.choices.map((choice,i)=>{const b=document.createElement('button');b.className='wb-choice';b.textContent=String.fromCharCode(65+i)+') '+choice;b.onclick=()=>answer(i);return b}));
 status.textContent=reviewMode?'Tekrar sorusu':'Önce kendi cevabını belirle, sonra seç.';
}
function answer(index){
 if(locked||!current)return;locked=true;const p=current,ok=index===p.answer,prev=record(p.id);
 const streak=ok?Math.min(4,(prev?.streak||0)+1):0;
 const days=ok?[1,3,7,14][streak-1]:1;
 const oldAttempts=prev?.attempts||0;
 data.records[p.id]={streak,attempts:oldAttempts+1,correct:(prev?.correct||0)+(ok?1:0),firstCorrect:prev?.firstCorrect??ok,due:Date.now()+days*DAY,last:Date.now()};
 data.log.push({id:p.id,ok,at:new Date().toISOString()});save();
 [...el('deep-options').children].forEach((b,i)=>{b.disabled=true;if(i===p.answer)b.classList.add('good');else if(i===index)b.classList.add('bad')});
 el('deep-result').hidden=false;
 el('deep-result').textContent=(ok?'✓ Doğru. ':'Yanlış. ')+p.why+' Dikkat: '+p.trap;
 el('deep-reflection').hidden=false;
 status.textContent=`Sonraki tekrar: ${days} gün sonra.`;render();
}
function render(){
 const records=Object.values(data.records),attempts=data.log.length,first=records.filter(r=>r.firstCorrect).length;
 el('deep-solved').textContent=String(attempts);el('deep-accuracy').textContent=records.length?Math.round(100*first/records.length)+'%':'—';
 const pending=problems.filter(p=>due(record(p.id)));el('deep-due').textContent=String(pending.length);
 const list=problems.filter(p=>record(p.id)).sort((a,b)=>record(a.id).due-record(b.id).due);
 el('deep-review-list').replaceChildren(...(list.length?list.map(p=>{const row=document.createElement('div');row.className='wb-deep-item';const r=record(p.id);const date=new Date(r.due).toLocaleDateString('tr-TR');const left=document.createElement('span');left.textContent=p.topic+' · '+p.level;const right=document.createElement('small');right.textContent=due(r)?'Tekrar hazır':date;row.append(left,right);return row}):[Object.assign(document.createElement('p'),{textContent:'Henüz çözülen soru yok.'})]));
}
el('deep-new').onclick=()=>{reviewMode=false;choose()};
el('deep-review').onclick=()=>{reviewMode=true;choose()};
el('deep-save-note').onclick=()=>{if(!current)return;data.notes[current.id]=el('deep-note').value.trim().slice(0,2000);save();status.textContent='Not kaydedildi.'};
el('deep-export').onclick=()=>{const payload={format:'wb-deep-v2',exportedAt:new Date().toISOString(),...data};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='WB-ustalik-yedek.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
render();choose();
})();
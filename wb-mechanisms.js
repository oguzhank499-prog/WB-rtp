(()=>{
'use strict';
const host=document.getElementById('wb-mastery');if(!host)return;
const cases=[
{title:'Eten + HBr',kind:'Elektrofilik katılma',eq:'CH₂=CH₂ + HBr → CH₃–CH₂Br',steps:[
{q:'İlk elektron hareketi hangisidir?',opts:['π(C=C) elektronları H’ye yönelir','Br⁻ karbonun H atomuna saldırır','C–C σ bağı kopar'],a:0,ex:'Alkenin π bağı elektronca zengindir; HBr içindeki H elektrofiliktir.'},
{q:'H–Br bağı nasıl kırılır?',opts:['Homolitik: H· ve Br·','Heterolitik: elektron çifti Br’ye gider','Bağ hiç kırılmaz'],a:1,ex:'H–Br bağ elektronları Br’ye geçer, Br⁻ oluşur.'},
{q:'Son adımda ne gerçekleşir?',opts:['Br⁻ karbokatyonu yakalar','H⁺ Br⁻ ile birleşir','Bir H₂ molekülü ayrılır'],a:0,ex:'Br⁻ karbokatyonun boş orbitaline elektron çifti verir ve C–Br bağı oluşur.'}
],note:'Eten simetriktir; Markovnikov yönlenmesi ayrımı burada gerekmez.'},
{title:'Propen + HBr',kind:'Markovnikov katılması',eq:'CH₃–CH=CH₂ + HBr → CH₃–CHBr–CH₃',steps:[
{q:'H⁺ hangi karbona eklenirse daha kararlı ara ürün oluşur?',opts:['Orta karbona','Uç CH₂ karbonuna','Her ikisi eşit'],a:1,ex:'H uç karbona katılınca orta karbonda sekonder karbokatyon oluşur; primer karbokatyondan daha kararlıdır.'},
{q:'Oluşan ara ürün hangisidir?',opts:['Primer karbokatyon','Sekonder karbokatyon','Karbanyon'],a:1,ex:'Pozitif yük orta karbon üzerindedir ve iki alkil grubuyla stabilize edilir.'},
{q:'Br⁻ saldırısı sonunda ana ürün hangisidir?',opts:['1-bromopropan','2-bromopropan','1,2-dibromopropan'],a:1,ex:'Peroksitsiz iyonik HBr katılmasında Markovnikov ürünü 2-bromopropandır.'}
],note:'Peroksit varlığında radikal HBr katılması farklı yönlenebilir; bu soru peroksitsiz koşullar içindir.'},
{title:'2-bromopropan + OH⁻',kind:'SN2 – sulu koşullar',eq:'(CH₃)₂CHBr + OH⁻ → (CH₃)₂CHOH + Br⁻',steps:[
{q:'Nükleofil hangi türdür?',opts:['OH⁻','Br⁻','Karbon atomu'],a:0,ex:'OH⁻ elektron çifti vererek C–O bağı kurabilir.'},
{q:'SN2 mekanizmasında hangi olay eşzamanlıdır?',opts:['C–O oluşumu ve C–Br kopması','Önce karbokatyon, sonra saldırı','Önce radikal oluşumu'],a:0,ex:'SN2 tek basamaklıdır: arkadan saldırı ve ayrılan grubun çıkışı birlikte olur.'},
{q:'Bu koşulda beklenen yer değiştirme ürünü nedir?',opts:['Propen','Propan-2-ol','Propan'],a:1,ex:'Br yerine OH gelir ve propan-2-ol oluşur. Sekonder halojenürlerde E2 rekabeti mümkündür.'}
],note:'Bu örnek SN2 yolunu öğretir; sekonder halojenürlerde çözücü, sıcaklık ve baz koşulları ürün dağılımını etkiler.'},
{title:'2-bromopropan + etoksit',kind:'E2 – eliminasyon',eq:'(CH₃)₂CHBr + EtO⁻ → CH₃–CH=CH₂ + EtOH + Br⁻',steps:[
{q:'Baz hangi hidrojeni uzaklaştırır?',opts:['β-karbon üzerindeki H','Brom atomundaki H','Merkez karbondaki α-H'],a:0,ex:'E2’de ayrılan grubun bağlı olduğu karbonun komşusu β-karbondan proton alınır.'},
{q:'E2’de elektronlar nasıl yeniden düzenlenir?',opts:['C–H elektronları π bağ oluşturur, C–Br kopar','Önce serbest karbokatyon oluşur','İki Br atomu birleşir'],a:0,ex:'β-C–H bağı elektronları C=C bağına dönüşürken C–Br ayrılır; tek basamaktır.'},
{q:'Organik ürün hangisidir?',opts:['Propan-2-ol','Propen','Propan'],a:1,ex:'Bir HBr eşdeğeri elimine edilince propen elde edilir.'}
],note:'E2 için uygun antiperiplanar geometri gerekir; basit asiklik örnekte erişilebilir.'},
{title:'Benzen nitrasyonu',kind:'Elektrofilik aromatik yer değiştirme',eq:'C₆H₆ + HNO₃ / H₂SO₄ → C₆H₅NO₂ + H₂O',steps:[
{q:'Aktif elektrofil hangisidir?',opts:['NO₃⁻','NO₂⁺','NH₄⁺'],a:1,ex:'Asit karışımında nitronyum iyonu NO₂⁺ oluşur.'},
{q:'Benzenin π elektronları NO₂⁺ ile birleşince ne oluşur?',opts:['σ-kompleksi (arenyum iyonu)','Serbest fenil radikali','Benzen anyonu'],a:0,ex:'Aromatiklik geçici kaybolur ve rezonansla stabilize σ-kompleksi oluşur.'},
{q:'Aromatiklik nasıl geri kazanılır?',opts:['H⁺ uzaklaştırılır','H₂ eklenir','NO₂⁺ ayrılır'],a:0,ex:'Baz H⁺ alır, C–H bağ elektronları halkadaki π sistemine döner.'}
],note:'Bu bir katılma değil, aromatik yer değiştirmedir.'},
{title:'Metan + Cl₂ (hν)',kind:'Radikal zincir mekanizması',eq:'CH₄ + Cl₂ → CH₃Cl + HCl',steps:[
{q:'Başlatmada ışık hangi bağı nasıl kırar?',opts:['Cl–Cl homolitik kırılır','C–H heterolitik kırılır','C–C bağı kırılır'],a:0,ex:'UV ışığı Cl₂ bağını homolitik koparır: 2 Cl·.'},
{q:'İlk yayılma adımında ne olur?',opts:['Cl· metandan H koparır','CH₄ doğrudan Cl⁻ ile tepkimeye girer','HCl homolitik parçalanır'],a:0,ex:'Cl· + CH₄ → HCl + CH₃·.'},
{q:'İkinci yayılma adımı hangisidir?',opts:['CH₃· + Cl₂ → CH₃Cl + Cl·','CH₃· + H₂ → CH₄','CH₃· → CH₃⁺ + e⁻'],a:0,ex:'Metil radikali Cl₂’den klor alır ve yeni Cl· üreterek zinciri sürdürür.'}
],note:'Fazla klor varsa çoklu klorlama ürünleri de oluşabilir.'}
];
const KEY='wb-mechanisms-11';let data={};try{data=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch{}
let idx=0,step=0,mistakes=0,answered=false;
const root=document.createElement('div');root.id='wb-mechanisms';root.className='panel';root.innerHTML=`<div class="mech-head"><h3>Organik Mekanizma Laboratuvarı</h3><span class="mech-pill">Adım adım</span></div><p class="muted">Elektronların neden ve nereye hareket ettiğini çöz. Her adımı açıklamadan geçemezsin.</p><label for="mech-select">Mekanizma seç</label><select id="mech-select"></select><div class="mech-info"><strong id="mech-kind"></strong><p id="mech-eq"></p><small id="mech-step"></small></div><h4 id="mech-question"></h4><div id="mech-choices"></div><p id="mech-feedback" aria-live="polite"></p><button id="mech-next" class="primary wide" hidden>Sonraki adım</button><div class="mech-footer"><span id="mech-score"></span><button id="mech-reset">Baştan çöz</button></div><p id="mech-note" class="muted"></p>`;
host.append(root);
const $=id=>root.querySelector('#'+id);
const selector=$('mech-select');cases.forEach((c,i)=>{const o=document.createElement('option');o.value=i;o.textContent=c.title;selector.append(o)});
const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(data))}catch{}};
function render(){
 const c=cases[idx],s=c.steps[step];answered=false;
 $('mech-kind').textContent=c.kind;$('mech-eq').textContent=c.eq;
 $('mech-step').textContent=`Adım ${step+1} / ${c.steps.length}`;
 $('mech-question').textContent=s.q;$('mech-choices').replaceChildren();
 s.opts.forEach((o,i)=>{const b=document.createElement('button');b.className='mech-option';b.textContent=String.fromCharCode(65+i)+') '+o;b.addEventListener('click',()=>respond(i));$('mech-choices').append(b)});
 $('mech-feedback').textContent='';$('mech-next').hidden=true;$('mech-next').textContent=step===c.steps.length-1?'Mekanizmayı bitir':'Sonraki adım';$('mech-note').textContent=c.note;
 $('mech-score').textContent=`${Object.keys(data).filter(k=>data[k]?.completed).length} / ${cases.length} mekanizma tamamlandı`;
}
function respond(i){
 if(answered)return;answered=true;const c=cases[idx],s=c.steps[step],ok=i===s.a;
 if(!ok)mistakes++;
 [...$('mech-choices').children].forEach((b,j)=>{b.disabled=true;if(j===s.a)b.classList.add('mech-good');else if(j===i)b.classList.add('mech-bad')});
 $('mech-feedback').textContent=(ok?'✓ Doğru. ':'Yanlış. ')+s.ex;
 $('mech-next').hidden=false;
}
function start(i){idx=i;step=0;mistakes=0;selector.value=String(i);render()}
selector.onchange=()=>start(Number(selector.value));
$('mech-reset').onclick=()=>start(idx);
$('mech-next').onclick=()=>{
 if(!answered)return;
 if(step<cases[idx].steps.length-1){step++;render();return}
 const key=String(idx),old=data[key]||{};
 data[key]={completed:true,bestMistakes:Math.min(old.bestMistakes??Infinity,mistakes),last:new Date().toISOString()};persist();
 $('mech-feedback').textContent=`Mekanizma tamamlandı. Bu denemede ${mistakes} yanlışın var. ${mistakes===0?'Harika; şimdi başka koşullarda ürünün değişip değişmediğini düşün.':'Yanlış yaptığın adımları tekrar çöz.'}`;
 $('mech-next').hidden=true;$('mech-score').textContent=`${Object.keys(data).filter(k=>data[k]?.completed).length} / ${cases.length} mekanizma tamamlandı`;
};start(0);
})();
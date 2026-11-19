(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.WBElectronStep=api;})(typeof globalThis!=='undefined'?globalThis:null,function(){'use strict';
const VE={H:1,C:4,N:5,O:6,F:7,Cl:7,Br:7,S:6,P:5};
function compute(data){const sums=data.atoms.map(()=>0);data.bonds.forEach(b=>{sums[b.a]+=b.order;sums[b.b]+=b.order});return data.atoms.map((a,i)=>Number.isInteger(a.lp)?VE[a.el]-2*a.lp-sums[i]:null)}
function step(input){
 let data;try{data=JSON.parse(JSON.stringify(input))}catch{return {ok:false,error:'Geçersiz taslak.'}}
 if(!data||!Array.isArray(data.atoms)||!Array.isArray(data.bonds)||!Array.isArray(data.arrows))return {ok:false,error:'Geçersiz taslak.'};
 if(data.arrows.length<1||data.arrows.length>12)return {ok:false,error:'Bir adımda 1–12 elektron oku kullanılabilir.'};
 const n=data.atoms.length, m=data.bonds.length;
 if(n<1||n>150||m>300)return {ok:false,error:'Taslak boyutu desteklenen sınırların dışında.'};
 if(!data.atoms.every(a=>a&&VE[a.el]!==undefined&&Number.isInteger(a.lp)&&a.lp>=0&&a.lp<=4))return {ok:false,error:'Tüm atomların geçerli element ve yalnız çift sayıları tanımlanmalı.'};
 if(!data.bonds.every(b=>Number.isInteger(b.a)&&Number.isInteger(b.b)&&b.a>=0&&b.b>=0&&b.a<n&&b.b<n&&b.a!==b.b&&Number.isInteger(b.order)&&b.order>=1&&b.order<=3))return {ok:false,error:'Geçersiz bağ bilgisi.'};
 const before=compute(data), initialCharge=before.reduce((a,b)=>a+b,0), lpDelta=Array(n).fill(0), changes=new Map(), touched=[];
 const key=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;
 const bondByKey=new Map();data.bonds.forEach((b,i)=>bondByKey.set(key(b.a,b.b),i));
 if(bondByKey.size!==m)return {ok:false,error:'Aynı atom çifti arasında yinelenen bağ var.'};
 for(let k=0;k<data.arrows.length;k++){
  const arrow=data.arrows[k];if(!Array.isArray(arrow)||arrow.length!==2)return {ok:false,error:`${k+1}. ok geçersiz.`};
  const [from,to]=arrow;if(typeof from!=='string'||typeof to!=='string'||!/^[ab]\d+$/.test(from)||!/^[ab]\d+$/.test(to))return {ok:false,error:`${k+1}. okun uçları geçersiz.`};
  const fi=Number(from.slice(1)),ti=Number(to.slice(1));
  if(from[0]==='a'&&to[0]==='a'){
   if(fi>=n||ti>=n||fi===ti)return {ok:false,error:`${k+1}. ok iki farklı atom arasında olmalı.`};
   lpDelta[fi]--;const pair=key(fi,ti);changes.set(pair,(changes.get(pair)||0)+1);touched.push(`${fi+1} → ${ti+1}`);
  }else if(from[0]==='b'&&to[0]==='a'){
   const b=data.bonds[fi];if(!b||ti>=n||(b.a!==ti&&b.b!==ti))return {ok:false,error:`${k+1}. ok, bağın kendi uç atomuna yönelmeli.`};
   lpDelta[ti]++;const pair=key(b.a,b.b);changes.set(pair,(changes.get(pair)||0)-1);touched.push(`Bağ ${fi+1} → atom ${ti+1}`);
  }else if(from[0]==='a'&&to[0]==='b'){
   const b=data.bonds[ti];if(fi>=n||!b||(b.a!==fi&&b.b!==fi))return {ok:false,error:`${k+1}. ok: yalnız çift, kaynağı olan atomun bağlı olduğu bağa yönelmeli.`};
   lpDelta[fi]--;const pair=key(b.a,b.b);changes.set(pair,(changes.get(pair)||0)+1);touched.push(`Atom ${fi+1} → bağ ${ti+1}`);
  }else if(from[0]==='b'&&to[0]==='b'){
   const source=data.bonds[fi],dest=data.bonds[ti];if(!source||!dest||fi===ti)return {ok:false,error:`${k+1}. ok: iki farklı ve mevcut bağ gerekli.`};
   if(source.order<2)return {ok:false,error:`${k+1}. ok: bağdan bağa π-elektron aktarımı için kaynak bağ en az çiftli olmalı.`};
   if(![source.a,source.b].some(v=>v===dest.a||v===dest.b))return {ok:false,error:`${k+1}. ok: kaynak ve hedef bağ ortak atom paylaşmalı.`};
   const a=key(source.a,source.b),b=key(dest.a,dest.b);changes.set(a,(changes.get(a)||0)-1);changes.set(b,(changes.get(b)||0)+1);touched.push(`Bağ ${fi+1} → bağ ${ti+1}`);
  }else return {ok:false,error:`${k+1}. ok türü desteklenmiyor.`};
 }
 for(let i=0;i<n;i++){const v=data.atoms[i].lp+lpDelta[i];if(v<0||v>4)return {ok:false,error:`${i+1}. atomun yalnız çift sayısı 0–4 aralığının dışına çıkıyor.`};data.atoms[i].lp=v}
 const newBonds=data.bonds.map(b=>({...b}));
 for(const [pair,delta] of changes){const [a,b]=pair.split(':').map(Number);const idx=bondByKey.get(pair);const old=idx===undefined?0:newBonds[idx].order;const next=old+delta;
  if(next<0||next>3)return {ok:false,error:`${a+1}–${b+1} bağının mertebesi geçersiz (${next}).`};
  if(idx===undefined){if(next>0)newBonds.push({a,b,order:next})}else newBonds[idx].order=next;
 }
 data.bonds=newBonds.filter(b=>b.order>0);
 const sums=Array(n).fill(0);data.bonds.forEach(b=>{sums[b.a]+=b.order;sums[b.b]+=b.order});
 for(let i=0;i<n;i++){const a=data.atoms[i],shell=2*a.lp+2*sums[i];const limit=a.el==='H'?2:8;
  if(shell>limit)return {ok:false,error:`${i+1}. ${a.el} atomunda ${shell} elektron var; bu basit model ${limit} elektron sınırını aşan ürünü desteklemiyor.`};
 }
 const after=compute(data);const finalCharge=after.reduce((a,b)=>a+b,0);
 if(finalCharge!==initialCharge)return {ok:false,error:`Elektrik yükü korunmadı: başlangıç ${initialCharge}, ürün ${finalCharge}.`};
 data.arrows=[];
 return {ok:true,description:`${touched.length} elektron oku eşzamanlı uygulandı: ${touched.join('; ')}.`,before,after,chargeBefore:initialCharge,chargeAfter:finalCharge,product:data,limitations:'Oklar başlangıç yapısına göre aynı anda yorumlanır. Bu model yalnızca elektron çifti muhasebesidir; mekanizma, kinetik veya ürün kararlılığı doğrulanmış değildir.'};
}

function resonanceCandidate(before,after){
 if(!before||!after||!Array.isArray(before.atoms)||!Array.isArray(after.atoms)||!Array.isArray(before.bonds)||!Array.isArray(after.bonds))return {candidate:false,reason:'Yapı bilgisi eksik.'};
 if(before.atoms.length!==after.atoms.length||before.atoms.some((a,i)=>!after.atoms[i]||a.el!==after.atoms[i].el))return {candidate:false,reason:'Atomların türü veya sayısı değişmiş.'};
 const bondMap=d=>{const map=new Map();for(const b of d.bonds){if(!Number.isInteger(b.a)||!Number.isInteger(b.b)||!Number.isInteger(b.order)||b.order<1)return null;const k=[b.a,b.b].sort((a,b)=>a-b).join(':');if(map.has(k))return null;map.set(k,b.order)}return map};
 const a=bondMap(before),b=bondMap(after);if(!a||!b)return {candidate:false,reason:'Bağ listesi geçersiz.'};
 if(a.size!==b.size||[...a.keys()].some(k=>!b.has(k)))return {candidate:false,reason:'Sigma bağ iskeleti değişmiş; bu bir rezonans dönüşümü değil.'};
 const chargesA=compute(before),chargesB=compute(after);if(chargesA.includes(null)||chargesB.includes(null))return {candidate:false,reason:'Yalnız çift bilgileri eksik.'};
 if(chargesA.reduce((x,y)=>x+y,0)!==chargesB.reduce((x,y)=>x+y,0))return {candidate:false,reason:'Toplam formal yük korunmamış.'};
 const changed=[...a.keys()].filter(k=>a.get(k)!==b.get(k));
 if(!changed.length)return {candidate:false,reason:'Bağ mertebesi değişmedi; yeni bir rezonans yapısı gösterilemiyor.'};
 return {candidate:true,changedBonds:changed.length,reason:'Atomlar ve sigma bağ iskeleti aynı, bağ mertebeleri değişmiş ve toplam yük korunmuş. Bu yalnızca olası rezonans yapısı için yapısal ön kontroldür.'};
}

return {step,compute,resonanceCandidate};});

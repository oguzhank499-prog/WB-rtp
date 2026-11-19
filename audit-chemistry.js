'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const src=fs.readFileSync(__dirname+'/app.js','utf8');const ctx={Math,console};vm.createContext(ctx);
vm.runInContext(src.slice(0,src.indexOf('const lewisDiagrams='))+';globalThis.audit={db,extra,cat,an,ionicFormula};',ctx);
const {db,extra,cat,an,ionicFormula}=ctx.audit;let checks=0;
function check(cond,message){checks++;assert.ok(cond,message)}
const elements=db.filter(x=>x.group==='element');check(elements.length===118,'118 elements');check(new Set(elements.map(x=>x.formula)).size===118,'unique symbols');
const all=new Set();for(const x of db){check(x.formula&&x.name,'nonempty '+x.id);check(!all.has(x.formula),'duplicate formula: '+x.formula);all.add(x.formula)}
const chargeSymbols={Li:1,Na:1,K:1,Rb:1,Cs:1,Ag:1,Mg:2,Ca:2,Sr:2,Ba:2,Zn:2,Cd:2,Al:3};
for(const x of db.filter(x=>x.cation)){const [cf,cc]=x.cation,[af,ac]=x.anion;check(cc>0&&ac>0,'ion charge');check(x.formula===ionicFormula(x.cation,x.anion),'formula from ionic charges '+x.formula);const gcd=(a,b)=>b?gcd(b,a%b):a;const n=ac/gcd(cc,ac),m=cc/gcd(cc,ac);check(n*cc===m*ac,'electroneutrality '+x.formula)}
for(const q of extra){check(typeof q.prompt==='string'&&q.prompt.length>0,'question prompt '+q.id);check(q.options.length===4,'four choices '+q.id);check(new Set(q.options).size===4,'unique choices '+q.id);check(q.options.filter(x=>x===q.correct).length===1,'one correct choice '+q.id);check(q.explanation.length>0,'explanation '+q.id)}
const anchor=new Map([['Fe₂O₃','Demir(III) oksit'],['H₂SO₄','Sülfürik asit'],['NaCl','Sodyum klorür'],['CH₃COOH','Asetik asit'],['CH₃CH₂COOH','Propanoik asit'],['Ca₃(PO₄)₂','Kalsiyum fosfat'],['NH₄NO₃','Amonyum nitrat'],['CH₄','Metan'],['CO₂','Karbon dioksit']]);for(const [f,n] of anchor){check(db.some(x=>x.formula===f&&x.name===n),'anchor '+f)}
const ids=new Set();for(const q of extra){check(!ids.has(q.id),'unique question id '+q.id);ids.add(q.id)}
console.log(JSON.stringify({status:'PASS',assertions:checks,records:db.length,generatedIonic:db.filter(x=>x.cation).length,conceptQuestions:extra.length,scope:'Structural, ionic charge balancing, selected known examples. Not an independent scientific review of every name, question or explanation.'},null,2));

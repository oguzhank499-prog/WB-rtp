const assert=require('node:assert/strict');const {step,compute}=require('./wb-electron-step.js');
const examples=[
 {name:'heterolitik ayrılma',atoms:[{el:'H',lp:0},{el:'Cl',lp:3}],bonds:[{a:0,b:1,order:1}],arrows:[['b0','a1']]},
 {name:'nükleofilik bağ oluşumu',atoms:[{el:'O',lp:3},{el:'H',lp:0}],bonds:[],arrows:[['a0','a1']]},
 {name:'karboksilat rezonansı',atoms:[{el:'O',lp:2},{el:'C',lp:0},{el:'O',lp:3}],bonds:[{a:0,b:1,order:2},{a:1,b:2,order:1}],arrows:[['a2','b1'],['b0','a0']]}
];
for(const ex of examples){const r=step(ex);assert(r.ok,ex.name+': '+r.error);assert.equal(r.chargeBefore,r.chargeAfter,ex.name);assert.equal(r.chargeBefore,compute(ex).reduce((a,b)=>a+b,0));assert.equal(r.product.arrows.length,0)}
assert.equal(step({...examples[0],atoms:[]}).ok,false);
assert.equal(step({...examples[0],atoms:Array.from({length:151},()=>({el:'H',lp:0}))}).ok,false);
console.log('Charge conservation: 3 reaction cases and 2 input limits passed');

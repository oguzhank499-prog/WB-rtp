const assert=require('node:assert/strict');const {step}=require('./wb-electron-step.js');
const base={atoms:[{el:'O',lp:2},{el:'C',lp:0},{el:'O',lp:3}],bonds:[{a:0,b:1,order:2},{a:1,b:2,order:1}],arrows:[['a2','b1'],['b0','a0']]};
let r=step(base);assert(r.ok,r.error);assert.deepEqual(r.product.bonds.map(b=>b.order),[1,2]);assert.deepEqual(r.after,[ -1,1,0]);assert.equal(base.bonds[0].order,2);
const allyl={atoms:[{el:'C',lp:0},{el:'C',lp:0},{el:'C',lp:0}],bonds:[{a:0,b:1,order:2},{a:1,b:2,order:1}],arrows:[['b0','b1']]};
r=step(allyl);assert(r.ok,r.error);assert.deepEqual(r.product.bonds.map(b=>b.order),[1,2]);
r=step({...allyl,bonds:[{a:0,b:1,order:1},{a:1,b:2,order:1}]});assert(!r.ok);
r=step({...allyl,arrows:[['a0','b1']]});assert(!r.ok);
r=step({...allyl,atoms:[...allyl.atoms,{el:'H',lp:0}],bonds:[...allyl.bonds,{a:2,b:3,order:1}],arrows:[['b0','b2']]});assert(!r.ok);
console.log('9/9 resonance assertions passed');

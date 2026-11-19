const assert=require('node:assert/strict');const {step}=require('./wb-electron-step.js');
// SN2-like simultaneous electron bookkeeping: O attacks C as C-Cl electrons move to Cl
const base={atoms:[{el:'O',lp:3},{el:'C',lp:0},{el:'Cl',lp:3},{el:'H',lp:0},{el:'H',lp:0},{el:'H',lp:0}],bonds:[{a:1,b:2,order:1},{a:1,b:3,order:1},{a:1,b:4,order:1},{a:1,b:5,order:1}],arrows:[['a0','a1'],['b0','a2']]};
let r=step(base);assert(r.ok,r.error);assert.equal(r.product.bonds.some(b=>b.a===1&&b.b===2),false);assert.equal(r.product.bonds.some(b=>(b.a===0&&b.b===1)||(b.a===1&&b.b===0)),true);assert.equal(r.product.atoms[0].lp,2);assert.equal(r.product.atoms[2].lp,4);assert.equal(base.bonds.length,4);
// Same intermediate would violate carbon octet if only attack arrow is drawn
r=step({...base,arrows:[['a0','a1']]});assert(!r.ok);
// Two electron donations from one lone pair are rejected
r=step({...base,arrows:[['a0','a1'],['a0','a1']]});assert(!r.ok);
// Bond cleavage with two opposing arrows produces invalid bond order
r=step({...base,arrows:[['b0','a1'],['b0','a2']]});assert(!r.ok);
// Single-bond pi shift must fail explicitly
r=step({...base,arrows:[['b0','b1']]});assert(!r.ok);
console.log('5/5 multi-arrow tests passed');

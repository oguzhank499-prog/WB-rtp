const assert=require('assert');const e=require('./wb-electron-step.js');const clone=x=>JSON.parse(JSON.stringify(x));
let x={atoms:[{el:'O',lp:2},{el:'C',lp:0}],bonds:[],arrows:[['a0','a1']]};let r=e.step(x);assert(r.ok);assert.equal(r.product.bonds[0].order,1);assert.equal(r.product.atoms[0].lp,1);assert.deepEqual(r.after,[3,3]);assert.equal(x.atoms[0].lp,2);
x={atoms:[{el:'C',lp:0},{el:'Cl',lp:3}],bonds:[{a:0,b:1,order:1}],arrows:[['b0','a1']]};r=e.step(x);assert(r.ok);assert.equal(r.product.bonds.length,0);assert.deepEqual(r.after,[4,-1]);
x={atoms:[{el:'O',lp:0},{el:'C',lp:0}],bonds:[],arrows:[['a0','a1']]};assert(!e.step(x).ok);
x={atoms:[{el:'O',lp:2},{el:'C',lp:0}],bonds:[],arrows:[['a0','a1'],['a1','a0']]};assert(!e.step(x).ok);
x={atoms:[{el:'C',lp:0},{el:'H',lp:0}],bonds:[{a:0,b:1,order:1}],arrows:[['a0','a1']]};assert(!e.step(x).ok);
console.log('5/5 electron step tests passed');
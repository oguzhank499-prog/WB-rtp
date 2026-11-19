const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const core=require('./wb42-core');let n=0;function test(name,fn){fn();n++;console.log('PASS',name)}
const app=fs.readFileSync('app.js','utf8');const m=app.match(/const raw=`([\s\S]*?)`;/);assert.ok(m,'Dataset not found');const rows=m[1].trim().split('\n').map(r=>r.split('|'));
test('118 elements at beginning',()=>{assert.equal(rows.filter(r=>r[3]==='element').length,118);assert.equal(rows[0][0],'H');assert.equal(rows[117][0],'Og')});
test('element symbols unique',()=>assert.equal(new Set(rows.filter(r=>r[3]==='element').map(r=>r[0])).size,118));
test('all rows have four fields',()=>rows.forEach((r,i)=>assert.equal(r.length,4,'row '+i)));
test('ionic charges integer or blank',()=>rows.forEach((r,i)=>assert.ok(!r[2]||Number.isSafeInteger(Number(r[2])),'row '+i)));
test('no empty formula/name',()=>rows.forEach((r,i)=>assert.ok(r[0]&&r[1],'row '+i)));
test('all JS syntax',()=>fs.readdirSync('.').filter(x=>x.endsWith('.js')&&!x.startsWith('verify')&&x!=='sw.js').forEach(f=>new vm.Script(fs.readFileSync(f,'utf8'),{filename:f})));
test('service worker caches all script assets',()=>{const html=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8');for(const [,file] of html.matchAll(/<script src="([^"]+)"/g)){assert.ok(fs.existsSync(file));assert.ok(sw.includes("'./"+file+"'"),file)}});
test('five bottom tabs',()=>assert.equal((fs.readFileSync('index.html','utf8').match(/data-page="/g)||[]).length,5));
test('correct VSEPR',()=>{assert.equal(core.electronGeometry(4,2).molecularGeometry,'Açısal');assert.equal(core.electronGeometry(6,2).molecularGeometry,'Kare düzlem')});
test('strong acid and base reference calculations',()=>{assert.equal(core.phStrongAcid(.01),2);assert.equal(core.phStrongBase(.01),12)});
console.log('PASS total',n,'checks; dataset rows',rows.length);

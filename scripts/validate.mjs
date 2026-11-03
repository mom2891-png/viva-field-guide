import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const read=f=>JSON.parse(fs.readFileSync(new URL('../dist/'+f,import.meta.url),'utf8'));
const animals=read('species.json'),plants=read('plants.json'),morphs=read('morphs.json');
const all=[...animals,...plants];
assert.equal(new Set(all.map(r=>r.id)).size,all.length,'Duplicate catalog ID');
for(const list of [animals,plants])assert.equal(new Set(list.map(r=>r.latin.trim().toLowerCase())).size,list.length,'Duplicate taxon string');
for(const r of all){
  for(const key of ['id','name','latin','catalogType','verification','domesticStatus'])assert.ok(r[key],`${r.id}: missing ${key}`);
  if(r.id.startsWith('plant-'))for(const k of ['category','environment','care','light','humidity','placement'])assert.ok(r[k],`${r.id}: missing ${k}`);
  else for(const k of ['major','middle','env'])assert.ok(r[k],`${r.id}: missing ${k}`);
  if(!r.popularityKnown)assert.equal(r.popularity,null,`${r.id}: unverified popularity must be null`);
  else assert.ok(Number.isFinite(r.popularity)&&r.popularity>0,`${r.id}: invalid popularity rank`);
  if(r.image){assert.ok(r.image.startsWith('https://'));assert.ok(r.credit?.license&&r.credit?.url,`${r.id}: incomplete photo credit`);}
}
for(const id of Object.keys(morphs))assert.ok(animals.some(r=>r.id===id),`Orphan morph ${id}`);
// Exercise actual catalog logic with a small DOM stand-in, without browser dependencies.
const elements=new Map();
const element=key=>{if(!elements.has(key))elements.set(key,{value:'',textContent:'',innerHTML:'',hidden:false,checked:false,setAttribute(){},closest(){return this},querySelectorAll(){return []}});return elements.get(key);};
const ctx=vm.createContext({document:{querySelector:element,querySelectorAll:()=>[]},localStorage:{getItem:()=>null},setTimeout,clearTimeout,a:animals,p:plants,m:morphs});
const code=fs.readFileSync(new URL('../dist/app.js',import.meta.url),'utf8').split("document.addEventListener('click'")[0];
vm.runInContext(code,ctx);
const run=s=>vm.runInContext(s,ctx);
run('animals=a;plants=p;morphs=m;species=animals;render()');
assert.equal(run('filtered().length'),animals.length);
assert.equal(run('filtered().findIndex(r=>!r.popularityKnown)'),animals.filter(r=>r.popularityKnown).length,'Ranked/unranked boundary');
assert.equal(run("state.search='릴리';filtered()[0].id"),'species-1');
run("state.search='';state.category='invert';state.subgroup='톡토기';render()");
assert.ok(run("filtered().length>0&&filtered().every(r=>r.middle==='톡토기')"));
run("state.page='plants';species=plants;state.category='all';state.subgroup='all';state.search='화이트스타';render()");
assert.equal(run('filtered()[0].id'),'plant-1');
run("state.search='';state.availability='unranked';render()");assert.ok(run('filtered().length>0&&filtered().every(r=>!r.popularityKnown)'));
run("state.availability='all';state.category='우산이끼류';render()");assert.ok(run("filtered().length>0&&filtered().every(r=>r.category==='우산이끼류')"));
console.log(`PASS: ${animals.length} animal entries, ${plants.length} plant/moss entries; IDs, credits, morph links, ranking, filters and search.`);

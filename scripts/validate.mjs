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
const element=key=>{if(!elements.has(key))elements.set(key,{value:'',textContent:'',innerHTML:'',hidden:false,checked:false,style:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},setAttribute(){},addEventListener(){},closest(){return this},querySelectorAll(){return []},querySelector(){return null},showModal(){this.open=true}});return elements.get(key);};
const ctx=vm.createContext({document:{querySelector:element,querySelectorAll:()=>[],body:{style:{}}},localStorage:{getItem:()=>null},setTimeout,clearTimeout,URL,a:animals,p:plants,m:morphs});
const code=fs.readFileSync(new URL('../dist/app.js',import.meta.url),'utf8').split("document.addEventListener('click'")[0];
vm.runInContext(code,ctx);
const run=s=>vm.runInContext(s,ctx);
run('animals=a;plants=p;morphs=m;species=animals;render()');
assert.equal(run('filtered().length'),animals.length);
assert.equal((element('#grid').innerHTML.match(/<article class="species-card"/g)||[]).length,animals.length,'All animals rendered without pagination');
assert.ok(!fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8').includes('id="loadMore"'),'No load-more button');
assert.equal(run('filtered().findIndex(r=>!r.popularityKnown)'),animals.filter(r=>r.popularityKnown).length,'Ranked/unranked boundary');
assert.equal(run("state.search='릴리';filtered()[0].id"),'species-1');
run("state.search='';state.category='invert';state.subgroup='톡토기';render()");
assert.ok(run("filtered().length>0&&filtered().every(r=>r.middle==='톡토기')"));
run("state.page='plants';species=plants;state.category='all';state.subgroup='all';state.search='화이트스타';render()");
assert.equal(run('filtered()[0].id'),'plant-1');
run("state.search='';state.availability='unranked';render()");assert.ok(run('filtered().length>0&&filtered().every(r=>!r.popularityKnown)'));
run("state.availability='all';state.category='우산이끼류';render()");assert.ok(run("filtered().length>0&&filtered().every(r=>r.category==='우산이끼류')"));
console.log(`PASS: ${animals.length} animal entries, ${plants.length} plant/moss entries; IDs, credits, morph links, ranking, filters and search.`);

run("reset();state.page='plants';species=plants;render()");
assert.equal(run('plantGroups(filtered()).length'),new Set(plants.map(r=>r.latin.split(' ')[0])).size,'One card per genus');
assert.equal(run('plantGroups(filtered()).flatMap(g=>g.rows).length'),plants.length,'Grouping preserves every plant');
assert.equal((element('#grid').innerHTML.match(/<article class="species-card genus-card"/g)||[]).length,run('plantGroups(filtered()).length'),'Every genus rendered');
assert.equal(run("plantGroups(filtered()).find(g=>g.key==='Begonia').rows.length"),19);
assert.equal(run("plantGroups(filtered()).find(g=>g.key==='Peperomia').rows.length"),13);
assert.equal(run('plantGroups(filtered())[0].key'),'Ficus','Genus with first ranked plant leads popular order');
run("state.sort='name';render()");
assert.ok(run("plantGroups(filtered()).every((g,i,arr)=>!i||arr[i-1].name.localeCompare(g.name,'ko')<=0)"),'Sort by genus name');
run("state.sort='popular';state.search='암피옥수스';render();openPlantGroup('Begonia')");
assert.equal(run('plantGroups(filtered()).length'),1);
assert.equal(run('plantGroups(filtered())[0].rows.length'),1,'Search keeps only matching species within genus');
assert.ok(element('#detailContent').innerHTML.includes('현재 조건에 맞는 1개 / 전체 19개'));
assert.ok(element('#detailContent').innerHTML.includes('data-parent-genus="Begonia"'));
run("state.search='화이트스타';render();openPlantGroup('Fittonia');openDetail('plant-1','Fittonia')");
assert.ok(element('#detailContent').innerHTML.includes('화이트스타'),'Cultivar remains in species detail');
assert.ok(element('#detailContent').innerHTML.includes('data-genus="Fittonia"'),'Back navigation to genus');
run("state.search='베고니아';render()");
assert.equal(run("plantGroups(filtered()).find(g=>g.key==='Begonia').rows.length"),19,'Korean genus search');
assert.ok(run("plantGroups(filtered()).find(g=>g.key==='Cissus').rows.every(r=>genusOf(r)==='Cissus')"),'Common-name alias does not change botanical genus');
run("state.search='';state.environment=plants[0].environment;render()");
assert.ok(run('plantGroups(filtered()).every(g=>g.rows.every(r=>r.environment===state.environment))'),'Environment filter applies within genus');
run("state.environment='all';favorites.add('plant-1');state.savedOnly=true;render();openPlantGroup('Fittonia')");
assert.equal(run('plantGroups(filtered()).length'),1);
assert.equal(run('plantGroups(filtered())[0].rows[0].id'),'plant-1','Favorites preserve species IDs');
assert.equal((element('#detailContent').innerHTML.match(/class="genus-species"/g)||[]).length,1);
console.log('PASS: full animal catalog; genus grouping, plant search/filter/popular/name sorting, species detail/back navigation, cultivars and favorites.');

// Expansion must keep new taxa reachable and uncertain trade forms distinct.
run("reset();state.page='animals';species=animals;state.category='turtle';render()");
assert.ok(run("filtered().length>0&&filtered().every(r=>r.middle==='거북')"),'Turtles have their own category');
assert.ok(run("animals.every(r=>animalCategories.some(([key])=>key===categoryOf(r)))"),'Every animal maps to a visible category');
run("state.excludeSpecial=true;render()");
assert.ok(run("filtered().every(r=>!r.env.includes('대')&&!r.env.includes('냉'))"),'Special-condition filter also covers new categories');
run("reset();state.category='invert';state.search='러버더키';render()");
assert.ok(run("filtered().length===1&&filtered()[0].catalogType==='유통명'&&!filtered()[0].popularityKnown"),'Unresolved isopod trade form stays unranked and searchable');
run("reset();state.page='plants';species=plants;state.search='핑크벨벳';render()");
assert.ok(run("plantGroups(filtered()).length===1&&plantGroups(filtered())[0].key==='Homalomena'"),'New plant genus searchable by trade form');
assert.ok(run("filtered().every(r=>r.catalogType==='유통명')"),'Trade form not counted as verified species');
run("state.search='더피';render()");
assert.equal(run("filtered()[0].latin"),'Nephrolepis cordifolia','Cultivar attached to its existing species');
assert.equal(plants.filter(r=>r.latin==='Nephrolepis cordifolia').length,1);
run("reset();state.category='식충식물';render()");
assert.ok(run("filtered().length>0&&filtered().every(r=>r.environment==='습지형')"),'Specialist plants retain a separate environment');
run("reset();render()");
assert.ok(run("plantGroups(filtered()).every(g=>genusName(g.key)!==g.key)"),'New genera have Korean display names');
for(const r of all.filter(r=>r.catalogType==='유통명'))assert.ok(r.latin.includes('sp.')||r.verification,'Trade name uncertainty retained');
console.log('PASS: expansion categories, trade-form identity, new genus search, cultivar deduplication and specialist environments.');

run("reset();state.page='animals';species=animals;state.search='오레오크럼블';render()");
assert.equal(run("filtered()[0].latin"),'Porcellionides pruinosus','New color form searchable under original species');

// Execute the complete startup script, including event binding and all three fetches.
const requests=[];
const startupContext=vm.createContext({document:{querySelector:element,querySelectorAll:()=>[],addEventListener(){},body:{style:{},classList:{toggle(){}}}},localStorage:{getItem:()=>null},setTimeout,clearTimeout,URL,window:{scrollTo(){}},fetch:async path=>{requests.push(path);return {ok:true,json:async()=>read(path.split('?')[0])}}});
vm.runInContext(fs.readFileSync(new URL('../dist/app.js',import.meta.url),'utf8'),startupContext);
await new Promise(resolve=>setImmediate(resolve));
assert.equal(requests.length,3,'Startup fetches every data file');
assert.ok(requests.every(path=>/^(species|plants|morphs)\.json\?v=/.test(path)),'Versioned relative paths work under GitHub Pages subdirectory');
assert.equal(Number(element('#animalTotal').textContent),animals.length,'Live total refreshed after loading');
assert.ok(element('#resultCount').textContent.includes(String(animals.length)),'Initial render succeeds');
vm.runInContext("setPage('plants')",startupContext);
assert.ok(element('#resultCount').textContent.includes(String(plants.length)),'Plant navigation succeeds after full initialization');
console.log('PASS: complete app startup, versioned data fetch and page navigation.');

run("reset();state.page='animals';species=animals;state.sort='recent';render()");
assert.equal(run("filtered()[0].n"),Math.max(...animals.filter(r=>r.addedAt===animals.at(-1).addedAt).map(r=>r.n)),'Same-day additions ordered by insertion sequence');
run("state.page='plants';species=plants;render()");
assert.equal(run("plantGroups(filtered())[0].rows[0].n"),plants.at(-1).n,'Newest plant genus leads recent ordering');

// Size must say what was measured; price ranges cannot merge sale units.
for(const row of all){
 const size=row.sizeInfo,price=row.priceInfo;
 if(size){
  assert.ok(size.measurement&&size.basis&&size.checkedAt,`${row.id}: size basis missing`);
  assert.ok(['cm','mm'].includes(size.unit));
  assert.ok(['range','maximum','minimum','approximate'].includes(size.kind));
  for(const v of [size.min,size.max])if(v!==null)assert.ok(Number.isFinite(v)&&v>0,`${row.id}: invalid size`);
  if(size.min!==null&&size.max!==null)assert.ok(size.min<=size.max);
  if(size.kind==='maximum')assert.equal(size.min,null);
  assert.ok(!/[\u3040-\u30ff]/.test(size.note),'Size note must be Korean');
 }
 if(price){
  assert.equal(price.currency,'KRW');assert.equal(price.kind,'listed');assert.ok(price.checkedAt&&price.basis&&price.note);
  assert.ok(price.offers.length>0);
  assert.equal(new Set(price.offers.map(o=>o.unit)).size,price.offers.length,'One offer range per sale unit');
  for(const offer of price.offers){assert.ok(offer.unit);assert.ok(Number.isFinite(offer.min)&&offer.min>0&&offer.max>=offer.min);assert.ok(offer.sampleCount>=offer.shopCount&&offer.shopCount>0);}
 }
}
run("reset();state.page='animals';species=animals;state.availability='priced';render()");
assert.equal(run('filtered().length'),animals.filter(r=>r.priceInfo).length,'Price filter selects only observed listings');
run("state.availability='size';render()");
assert.equal(run('filtered().length'),animals.filter(r=>r.sizeInfo).length,'Size filter independent of popularity');
assert.ok(run("sizeText(animals.find(r=>r.latin==='Folsomia candida'))").includes('3 mm'),'Tiny sizes rendered in millimetres');
run("openDetail('species-1')");
assert.ok(element('#detailContent').innerHTML.includes('크기와 참고 가격'));
assert.ok(element('#detailContent').innerHTML.includes('전체길이·꼬리 포함'));
assert.ok(element('#detailContent').innerHTML.includes('2026.11.03'));
run("reset();state.page='plants';species=plants;openPlantGroup('Fittonia')");
assert.ok(element('#detailContent').innerHTML.includes('facts-preview'),'Individual plant child shows its own size/price');
assert.ok(!run('renderPlantGroups(plantGroups(plants))').includes('facts-preview'),'Genus card does not pretend to have a single species size');
const moss=plants.find(r=>r.id==='plant-124');
assert.ok(moss.priceInfo.offers.some(o=>o.unit==='1촉'&&o.min===o.max),'Single-shoot price not mixed with bulk pack');
assert.ok(run('factsSection({id:"unverified"})').includes('국내 가격 확인 중'),'Missing prices remain unknown');
assert.ok(!run('factsSection({id:"unverified"})').includes('0원'),'Unknown does not become free');
const singleOffer={min:7000,max:7000};
assert.equal(run('priceText({min:7000,max:7000})'),'7,000원','Single observed amount is not a fabricated range');
assert.ok(animals.find(r=>r.id==='species-97').priceInfo.offers.some(o=>o.unit==='한 쌍'),'Paired animals not priced as individuals');
console.log('PASS: size measurement basis, domestic price units, unknown values, filters and individual fact displays.');
for(const row of all){
  if(!row.priceInfo){assert.ok(!row.purchaseLinks?.length);continue;}
  assert.ok(row.purchaseLinks?.length,`${row.id}: priced entry needs product links`);
  const urls=new Set();
  for(const item of row.purchaseLinks){
    const u=new URL(item.url);
    assert.equal(u.protocol,'https:');
    assert.ok(u.pathname.includes('/product/')||u.pathname.includes('goods_view.php'),`${row.id}: direct product URL required`);
    assert.ok(!urls.has(item.url),`${row.id}: duplicate purchase URL`);urls.add(item.url);
    assert.ok(item.shop&&item.title&&item.unit&&item.checkedAt);
    assert.ok(Number.isFinite(item.price)&&item.price>=100);
    assert.ok(['listed','soldOut'].includes(item.status));
    assert.ok(row.priceInfo.offers.some(o=>o.unit===item.unit&&o.min<=item.price&&item.price<=o.max));
  }
  for(const offer of row.priceInfo.offers){
    const items=row.purchaseLinks.filter(item=>item.unit===offer.unit);
    assert.equal(items.length,offer.sampleCount);
    assert.equal(new Set(items.map(item=>item.shop)).size,offer.shopCount);
    assert.equal(Math.min(...items.map(item=>item.price)),offer.min);
    assert.equal(Math.max(...items.map(item=>item.price)),offer.max);
  }
}
run("openDetail('species-1')");
assert.ok(element('#detailContent').innerHTML.includes('구매처'));
assert.ok(element('#detailContent').innerHTML.includes('target="_blank" rel="noopener noreferrer"'));
assert.ok(element('#detailContent').innerHTML.includes('다른 상품'));
assert.equal(run('purchaseSection({purchaseLinks:[{url:"javascript:alert(1)"}]})'),'');
assert.ok(run('purchaseSection({purchaseLinks:[{shop:"<script>",title:"<img onerror=alert(1)>",url:"https://example.com/product/1",unit:"1개체",price:12000,status:"soldOut"}]})').includes('&lt;img'));
assert.ok(run('purchaseSection({purchaseLinks:[{shop:"판매점",title:"상품",url:"https://example.com/product/1",unit:"1개체",price:12000,status:"soldOut"}]})').includes('품절 표시'));
assert.ok(!animals.find(r=>r.id==='species-328').purchaseLinks.some(i=>i.title.includes('트리프록')));
assert.ok(!animals.find(r=>r.id==='species-13').purchaseLinks.some(i=>i.title.includes('거북')));
assert.ok(!animals.find(r=>r.id==='species-129').purchaseLinks.some(i=>i.title.includes('"책"')));
console.log('PASS: purchase product URLs, unit/price consistency, shop deduplication, safe external links and unrelated product exclusions.');

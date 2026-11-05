import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const ctx=vm.createContext({URL});
vm.runInContext(fs.readFileSync(new URL('../dist/care-sheets.js',import.meta.url),'utf8'),ctx);
const api=ctx.VivaCareSheets;
const fixture={sources:{s:{author:'전문 재배자',title:'원문',url:'https://example.org/care',checkedAt:'2026-11-05'}},profiles:{p:{title:'실제 종 자료',scope:'species',summary:'<script>bad</script>',sourceIds:['s'],sections:[{title:'빛',text:'밝은 산란광'}],placement:{zones:['전경'],surfaces:['토양'],method:'뿌리를 배지에 심기',avoid:'물 고임',reason:'빛과 배수 조건',basis:'editorial'}}},entries:{'plant-1':{profileId:'p',status:'species-reviewed',missingFields:['온도']}}};
let html=api.render(fixture,{id:'plant-1',name:'피토니아'},'variety:plant-1:0');
assert(html.includes('전문 재배자')&&html.includes('https://example.org/care'));
assert(html.indexOf('전문 재배자')<html.indexOf('<details'),'Source author is visible before expanding details');
assert(html.includes('식재 위치')&&html.includes('전경')&&html.includes('재배 조건을 바탕으로 한 식재 제안'));
assert(html.includes('&lt;script&gt;')&&!html.includes('<script>'));
assert(html.includes('온도')&&html.includes('부모 항목'));
fixture.sources.s.url='javascript:alert(1)';assert(!api.render(fixture,{id:'plant-1'}).includes('javascript:'));
assert(api.render({sources:{},profiles:{},entries:{}},{id:'plant-2'}).includes('조사 대기'));
assert(api.render({loadState:'error',sources:{},profiles:{},entries:{}},{id:'plant-2'}).includes('불러오지 못했어요'));
assert.equal(api.placementText(fixture,'plant-1'),'전경 · 토양');
vm.runInContext(fs.readFileSync(new URL('../dist/catalog-navigation.js',import.meta.url),'utf8'),ctx);
const positionModel=ctx.VivaCatalog.createModel([],[{id:'plant-1',name:'피토니아',latin:'Fittonia albivenis',category:'관엽식물'}],{}, {},{'plant-1':'전경 · 토양'});
assert(positionModel.search('전경','plants').some(n=>n.entryId==='plant-1'),'TOC search finds reviewed planting positions');
const bank=JSON.parse(fs.readFileSync(new URL('../dist/care-sheets.json',import.meta.url),'utf8'));
const all=['species','plants'].flatMap(k=>JSON.parse(fs.readFileSync(new URL('../dist/'+k+'.json',import.meta.url),'utf8')));
assert.deepEqual(Object.keys(bank.entries).sort(),all.map(x=>x.id).sort(),'Every entry has a tracked care status');
for(const [id,entry]of Object.entries(bank.entries)){
 assert(['pending','species-reviewed','group-reference','identity-limited','source-limited'].includes(entry.status),id+': invalid status');
 if(!entry.profileId){assert.equal(entry.status,'pending');continue;}
 const p=bank.profiles[entry.profileId];assert(p,id+': missing profile');
 assert.equal(new Set(p.sourceIds).size,p.sourceIds.length,id+': duplicate care source');
 assert.equal(new Set(p.sections.map(s=>s.key)).size,p.sections.length,id+': duplicate management section');
 assert(p.taxa.includes(all.find(x=>x.id===id).latin),id+': wrong target taxon');
 assert(p.sourceIds.length&&p.summary&&p.sections.length,id+': empty care profile');
 for(const sid of p.sourceIds){const s=bank.sources[sid];assert(s?.author&&s.title&&s.checkedAt,id+': missing source provenance');assert.match(s.url,/^https:\/\//);}
 if(entry.status==='group-reference')assert.notEqual(p.scope,'species',id+': generic care is not species-reviewed');
 if(p.placement){assert(id.startsWith('plant-'));assert(p.placement.zones.length&&p.placement.surfaces.length&&p.placement.method&&p.placement.avoid&&p.placement.reason);assert(['editorial','source'].includes(p.placement.basis));}
}
console.log('PASS: care provenance, missing fields, inferred placement, parent inheritance, escaping and unsafe-link rejection.');

// Narrower source populations and common cultivar text must keep their limits.
assert.equal(bank.entries['species-34'].status,'identity-limited');
assert.equal(bank.profiles[bank.entries['species-34'].profileId].scope,'subspecies');
for(const id of ['plant-227','plant-228','plant-229']){
 const e=bank.entries[id];assert.equal(e.status,'group-reference');
 assert.equal(bank.profiles[e.profileId].scope,'genus');
 assert.equal(bank.profiles[e.profileId].placement.basis,'editorial');
}
const limitedHTML=api.render(bank,all.find(r=>r.id==='species-336'));
assert(limitedHTML.includes('자료 제한 · 추가 교차검증 필요'),'Source-limited references include dated breeder or institutional sources, not only growers');
console.log('PASS: population limits, common cultivar guidance and source limitations stay explicit.');

import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read = name => JSON.parse(fs.readFileSync(new URL('../dist/' + name + '.json', import.meta.url)));
const animals = read('species'), plants = read('plants'), morphs = read('morphs');
const original = JSON.stringify([animals, plants, morphs]);
const context = {};
vm.runInNewContext(fs.readFileSync(new URL('../dist/catalog-navigation.js', import.meta.url), 'utf8'), context);
const model = context.VivaCatalog.createModel(animals, plants, morphs, {Crepidomanes: '괴불이끼류'});
const all = [...animals, ...plants];
assert(all.length >= 523);
assert.equal(model.nodes.filter(n => n.kind === 'entry').length, all.length);
assert.equal(new Set(model.nodes.map(n => n.id)).size, model.nodes.length);
for (const row of all) {
  const node = model.entryNode(row.id), path = model.path(node.id);
  assert.equal(node.entryId, row.id);
  assert.equal(path.at(-1).id, node.id);
  assert.equal(new Set(path.map(n => n.id)).size, path.length);
  assert.equal(path[0].id, row.id.startsWith('plant-') ? 'plants' : 'animals');
}
for (const node of model.nodes) {
  if (node.parentId) assert(model.nodes.some(n => n.id === node.parentId));
  assert.equal(node.count, new Set(model.descendantEntryIds(node.id)).size);
  if (node.kind === 'group' || node.kind === 'genus' || node.kind === 'root') {
    assert.equal(model.children(node.id).reduce((sum, n) => sum + n.count, 0), node.count);
    if (node.kind !== 'root') assert(node.count > 0);
  }
}
assert.equal(model.nodes.find(n => n.id === 'animals').count, animals.length);
assert.equal(model.nodes.find(n => n.id === 'plants').count, plants.length);
const labels = id => model.path(model.entryNode(id).id).map(n => n.label).join(' > ');
assert.match(labels('species-1'), /파충류.*게코.*크레스티드/);
const firstMorph = model.children('entry:species-1')[0];
assert.equal(firstMorph.kind, 'morph');
assert.equal(firstMorph.morphIndex, 0);
assert.equal(model.path(firstMorph.id).at(-2).entryId, 'species-1');
for (const row of animals.filter(r => /^(Dendrobates|Ranitomeya|Oophaga|Epipedobates|Phyllobates) /.test(r.latin))) assert.match(labels(row.id), /다트프로그류/);
for (const row of animals.filter(r => r.middle === '등각류')) assert.match(labels(row.id), /절지동물.*등각류/);
assert.match(labels('plant-177'), /고사리·석송류.*괴불이끼류/);
assert.match(labels('plant-6'), /난초류.*보석란/);
assert.match(labels('plant-149'), /난초류.*그 외 착생란/);
assert.match(labels('plant-27'), /브로멜리아류/);
assert.match(labels('plant-51'), /브로멜리아류/);
assert.match(labels('plant-61'), /고사리·석송류/);
assert.match(labels('plant-246'), /고사리·석송류/);
for (const row of plants.filter(r => ['이끼','이끼류','우산이끼류','태류','뿔이끼류'].includes(r.category))) {
  assert(!labels(row.id).includes('분류 미확인'), row.id + ': bryophyte must remain reachable');
  assert(row.mossHabitats?.length && row.mossForms?.length, row.id + ': discovery tags missing');
  assert(model.matchesMoss(row.id, row.mossHabitats[0], row.mossForms[0]));
}
assert(model.matchesMoss('plant-284', 'aquatic', 'leafy'), 'Phoenix moss has a submerged discovery route');
assert(!model.matchesMoss('plant-284', 'dry', 'leafy'));
assert(!model.matchesMoss('plant-2', 'temperate', 'all'), 'Spikemoss is not a true moss');
assert.match(labels('plant-277'), /태류/);
assert(!model.nodes.some(n => n.id === 'plants/hornworts'), 'No empty hornwort branch');
assert.equal(model.entryNode('plant-3').parentId, model.entryNode('plant-65').parentId);
assert(model.search(morphs['species-1'][0].name).some(n => n.id === firstMorph.id));
assert(model.search('CORRELOPHUS - CILIATUS').some(n => n.entryId === 'species-1'));
assert.equal(model.search('크레스티드', 'plants').length, 0);
const sample = context.VivaCatalog.createModel([{id:'x',name:'<img onerror=evil>',latin:'Unknown sp.',major:'미확인',middle:'미확인',aliases:['alias name'],varieties:['rare form']}], [], {}, {});
assert.equal(sample.entryNode('x').label, '<img onerror=evil>');
assert.equal(sample.search('ALIAS-NAME').length, 1);
assert.equal(sample.search('rare form').length, 1);
const varietyModel = context.VivaCatalog.createModel([], [{id:'p', name:'Plant', latin:'Begonia sp.', category:'관엽식물', varieties:['Silver form', {name:'Dark form', aliases:['Night Leaf']}]}], {}, {});
assert.equal(varietyModel.children('entry:p').length, 2);
assert.equal(varietyModel.children('entry:p')[0].id, 'variety:p:0');
assert.equal(varietyModel.children('entry:p')[0].kind, 'variety');
assert.equal(varietyModel.children('entry:p')[1].varietyIndex, 1);
assert.equal(varietyModel.path('variety:p:1').at(-2).entryId, 'p');
assert.equal(varietyModel.nodes.find(n => n.id === 'plants').count, 1);
assert(varietyModel.search('night-leaf').some(n => n.id === 'variety:p:1'));
assert.equal(varietyModel.search('night-leaf', 'animals').length, 0);
assert.equal(sample.search('alias', 'invalid').length, 0);
assert.equal(JSON.stringify([animals, plants, morphs]), original);
console.log(`Navigation validated: ${all.length} entries, ${model.nodes.length} nodes; paths, partitions, morphs, taxonomy, search and immutability.`);

for(const row of animals){
 const entry=model.entryNode(row.id),parent=model.nodes.find(n=>n.id===entry.parentId);
 assert.equal(parent.kind,'genus',row.id+': animal must appear under a genus');
}
assert.equal(model.entryNode('species-91').parentId,model.entryNode('species-92').parentId);
assert.equal(model.entryNode('species-91').parentId,model.entryNode('species-93').parentId);
assert.equal(model.descendantEntryIds(model.entryNode('species-91').parentId).length,3);
assert.equal(model.path(firstMorph.id).at(-3).kind,'genus','Morph remains beneath species within genus');
console.log('PASS: every animal has a genus parent; Abronia and species/morph paths stay distinct.');

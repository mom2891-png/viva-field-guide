import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ctx = {};
const browserPath = new URL('../dist/catalog-browser.js', import.meta.url);
assert(fs.existsSync(browserPath), 'catalog browser module must exist');
vm.runInNewContext(fs.readFileSync(new URL('../dist/catalog-navigation.js', import.meta.url), 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync(browserPath, 'utf8'), ctx);
const model = ctx.VivaCatalog.createModel([{id:'a',name:'<Animal>',latin:'Test sp.',major:'파충류',middle:'게코'}], [{id:'p',name:'Plant',latin:'Begonia sp.',category:'관엽식물',varieties:['Silver']}], {a:[{name:'Rare morph'}]});
const elements = new Map();
for (const id of ['catalogMenuTitle','catalogNavSearch','catalogSearchScope','catalogTrail','catalogColumns','catalogSearchResults','catalogMenuStatus']) elements.set('#'+id, {innerHTML:'',textContent:'',value:'',checked:false,hidden:false});
const listeners = {};
let restored = 0;
const root = {hidden:true,ownerDocument:{activeElement:{focus(){restored++;}}},querySelector:s=>elements.get(s),addEventListener:(e,f)=>listeners[e]=f,contains:()=>true};
const opened=[], browsed=[];
const ui = ctx.VivaCatalogBrowser.mount(root,{onBrowse:id=>browsed.push(id),onOpen:n=>opened.push(n)});
const click = (key,id) => listeners.click({target:{closest:()=>({dataset:{[key]:id}})}});
ui.open('animals');
assert(ui.isOpen());
assert.match(elements.get('#catalogMenuStatus').textContent,/불러/);
ui.setModel(model);
assert.match(elements.get('#catalogColumns').innerHTML,/파충류/);
ui.setSelected('entry:a');
const html=elements.get('#catalogColumns').innerHTML;
assert.match(html,/&lt;Animal&gt;/);
assert(!html.includes('<Animal>'));
assert.match(html,/Rare morph/);
assert.equal((html.match(/catalog-column current/g)||[]).length,1);
assert.match(html,/하위 항목 펼치기/);
click('navNode','animals/reptiles');
assert.equal(opened.length,0);
click('navBrowse','animals/reptiles');
assert.equal(browsed[0],'animals/reptiles');
assert(!ui.isOpen());
ui.open('animals');
assert.match(elements.get('#catalogColumns').innerHTML,/게코/);
elements.get('#catalogNavSearch').value='Plant'; listeners.input({target:elements.get('#catalogNavSearch')});
assert.match(elements.get('#catalogSearchResults').innerHTML,/Plant/);
assert.match(elements.get('#catalogSearchResults').innerHTML,/식물 도감/);
elements.get('#catalogSearchScope').checked=true;listeners.change({target:elements.get('#catalogSearchScope')});
assert.match(elements.get('#catalogMenuStatus').textContent,/0/);
assert.match(elements.get('#catalogSearchResults').innerHTML,/data-nav-reset/);
click('navReset','');
assert.equal(elements.get('#catalogNavSearch').value,'');
click('navOpen','morph:a:0');
assert.equal(opened[0].kind,'morph');
ui.open('plants');ui.setSelected('entry:p');
assert.match(elements.get('#catalogColumns').innerHTML,/Silver/);
click('navOpen','variety:p:0');assert.equal(opened[1].kind,'variety');
ui.open('animals');listeners.keydown({key:'Escape',preventDefault(){}});
assert(!ui.isOpen());assert(restored>0);
console.log('Catalog browser validated: lifecycle, loading, path columns, escaped labels, browse/open, global/scoped search, reset, morph/variety and Escape.');

// Embedded guide stays visible while navigating and selecting entries.
const embeddedRoot={...root,hidden:false};
const inlineOpened=[];
const embedded=ctx.VivaCatalogBrowser.mount(embeddedRoot,{inline:true,onOpen:n=>inlineOpened.push(n)});
embedded.setModel(model);embedded.open('animals');
click('navOpen','entry:a');
assert(embedded.isOpen(),'Inline guide must stay visible after selecting a species');
assert.equal(inlineOpened[0].entryId,'a');
assert.match(elements.get('#catalogTrail').innerHTML,/&lt;Animal&gt;/,'Selected species remains in the inline path');
embedded.close();assert(embedded.isOpen(),'Inline guide has no dismiss overlay');
console.log('PASS: inline guide remains visible and keeps species selection.');

// Model actual DOM replacement: new column elements start at scrollTop=0.
let scrollColumns=[],columnReplacements=0;
const scrollingHost={scrollLeft:0,querySelectorAll:()=>scrollColumns};
Object.defineProperty(scrollingHost,'innerHTML',{
 set(html){columnReplacements++;this.html=html;this.scrollLeft=0;scrollColumns=[...html.matchAll(/data-nav-column="([^"]+)"/g)].map(m=>({dataset:{navColumn:m[1]},scrollTop:0}));},
 get(){return this.html||'';}
});
const scrollingRoot={...embeddedRoot,querySelector:s=>s==='#catalogColumns'?scrollingHost:elements.get(s)};
const scrolling=ctx.VivaCatalogBrowser.mount(scrollingRoot,{inline:true});
scrolling.setModel(model);scrolling.open('animals');scrolling.setSelected('entry:a');
const genusColumn=scrollColumns.find(c=>c.dataset.navColumn===model.entryNode('a').parentId);
assert(genusColumn);
genusColumn.scrollTop=240;scrollingHost.scrollLeft=125;
click('navOpen','entry:a');
const replacementCount=columnReplacements;scrolling.setSelected('entry:a');
assert.equal(columnReplacements,replacementCount,'Selecting the same path does not rebuild the columns');
assert.equal(scrollColumns.find(c=>c.dataset.navColumn===genusColumn.dataset.navColumn).scrollTop,240,'Clicking a species keeps its column position');
assert.equal(scrollingHost.scrollLeft,125,'Clicking keeps the horizontal path position');
assert.match(scrollingHost.innerHTML,/catalog-node selected[^]*data-nav-open="entry:a"/,'Clicked species remains selected');
scrolling.setSelected('animals');scrolling.setSelected('entry:a');
assert.equal(scrollColumns.find(c=>c.dataset.navColumn===genusColumn.dataset.navColumn).scrollTop,240,'Returning to a branch restores its own column position');
scrolling.setSelected('plants');scrolling.setSelected('entry:p');
assert.equal(scrollColumns.find(c=>c.dataset.navColumn===model.entryNode('p').parentId).scrollTop,0,'Different branches do not inherit another column position');
console.log('PASS: selected path, vertical column offsets and horizontal scroll survive navigation rerenders.');

// Habitat and shape are independent discovery filters; they do not add duplicate taxonomy rows.
for (const id of ['catalogMossFilters','catalogMossHabitat','catalogMossForm']) elements.set('#'+id,{value:'all',hidden:false});
const mossModel=ctx.VivaCatalog.createModel([], [
  {id:'wet',name:'Water moss',latin:'Fissidens test',category:'이끼',mossHabitats:['aquatic'],mossForms:['leafy']},
  {id:'forest',name:'Forest moss',latin:'Mnium test',category:'이끼류',mossHabitats:['temperate'],mossForms:['upright']},
  {id:'fern',name:'Fern',latin:'Lepisorus test',category:'양치식물'}
],{});
const discovery=ctx.VivaCatalogBrowser.mount(embeddedRoot,{inline:true});discovery.setModel(mossModel);discovery.open('plants');
elements.get('#catalogMossHabitat').value='aquatic';listeners.change({target:elements.get('#catalogMossHabitat')});
assert(!elements.get('#catalogColumns').innerHTML.includes('고사리·석송류'));
assert.match(elements.get('#catalogMenuStatus').textContent,/1개/);
elements.get('#catalogNavSearch').value='moss';listeners.input({target:elements.get('#catalogNavSearch')});
assert.match(elements.get('#catalogSearchResults').innerHTML,/Water moss/);
assert(!elements.get('#catalogSearchResults').innerHTML.includes('Forest moss'));
elements.get('#catalogMossForm').value='upright';listeners.change({target:elements.get('#catalogMossForm')});
assert.match(elements.get('#catalogMenuStatus').textContent,/0개/);
discovery.open('animals');assert(elements.get('#catalogMossFilters').hidden);
discovery.open('plants');assert.match(elements.get('#catalogMenuStatus').textContent,/0개/);
assert(!elements.get('#catalogColumns').innerHTML.includes('Forest moss'), 'Returning to plants retains the filtered navigation root');
console.log('PASS: moss habitat/shape intersection, filtered taxonomy counts/search, fern exclusion and animal-page visibility.');

elements.get('#catalogMossHabitat').value='all';elements.get('#catalogMossForm').value='all';
const atlasSearch=[];
const atlas=ctx.VivaCatalogBrowser.mount(embeddedRoot,{inline:true,tree:true,onSearch:q=>atlasSearch.push(q),resultPhoto:()=>'<span class="test-preview"></span>'});
atlas.setModel(model);atlas.open('animals');atlas.setSelected('entry:a');
let treeHTML=elements.get('#catalogColumns').innerHTML;
assert.equal((treeHTML.match(/data-nav-column=/g)||[]).length,1,'Atlas has a single taxonomy rail');
assert(treeHTML.includes('catalog-tree-branch')&&treeHTML.includes('Rare morph'),'The selected path expands to its subordinate forms');
click('navToggle',model.entryNode('a').parentId);
assert(!elements.get('#catalogColumns').innerHTML.includes('Rare morph'),'Collapsing a branch removes only its nested rows');
elements.get('#catalogNavSearch').value='Plant';listeners.input({target:elements.get('#catalogNavSearch')});
assert.equal(atlasSearch[0],'Plant');
assert(elements.get('#catalogSearchResults').innerHTML.includes('test-preview'),'Atlas search results include the matching photo slot');
atlas.setSearch('Rare morph');assert.equal(elements.get('#catalogNavSearch').value,'Rare morph');
console.log('PASS: single-rail tree, branch collapse, photo search and synchronized query.');

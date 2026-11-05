import fs from 'node:fs';import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
const stack=[],nodes=new Map(),voidTags=new Set(['meta','link','input','br','hr','img','source','area','base','embed','param','track','wbr']);
for(const match of html.matchAll(/<\/?([a-zA-Z][\w:-]*)\b([^>]*)>/g)){
 const tag=match[1].toLowerCase(),attrs=match[2];
 if(match[0].startsWith('</')){assert.equal(stack.pop()?.tag,tag,'HTML nesting: '+tag);continue;}
 const id=attrs.match(/\bid="([^"]+)"/)?.[1],classes=attrs.match(/\bclass="([^"]+)"/)?.[1]||'';
 const node={tag,id,classes,parents:stack.slice()};
 if(id){assert(!nodes.has(id),'Duplicate id: '+id);nodes.set(id,node);}
 if(!voidTags.has(tag)&&!attrs.trim().endsWith('/'))stack.push(node);
}
assert.equal(stack.length,0,'HTML tags are balanced');
for(const id of ['collection','catalogDetail','catalogSearchResults'])assert(nodes.get(id).parents.some(n=>n.classes==='catalog-main'),id+' belongs in the main reading surface');
for(const id of ['catalogColumns','categories','environments','sizeClass','catalogMossFilters'])assert(nodes.get(id).parents.some(n=>n.id==='catalogSidebar'),id+' belongs in the compact sidebar');
assert(!nodes.get('catalogNavSearch').parents.some(n=>n.id==='catalogSidebar'),'Shared search stays accessible when mobile navigation is collapsed');
const css=fs.readFileSync(new URL('../dist/atlas-layout.css',import.meta.url),'utf8');
assert(css.includes('grid-template-columns:250px minmax(0,1fr)'));
assert(css.includes('.atlas.has-selection #catalogDetail{display:block}'));
assert(css.includes('max-height:none;overflow:visible'),'Main detail reads with the document scrollbar');
assert(css.includes('@media(max-width:760px)')&&css.includes('.atlas.drawer-open .catalog-sidebar{display:block}'));
assert(fs.readFileSync(new URL('../docs/ui-editorial-prompt.md',import.meta.url),'utf8').includes('기존 ID'));
console.log('PASS: balanced atlas markup, main/sidebar placement, mobile navigation and saved editorial prompt.');

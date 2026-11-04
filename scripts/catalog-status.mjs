import fs from 'node:fs';
const read=name=>JSON.parse(fs.readFileSync(new URL('../dist/'+name+'.json',import.meta.url),'utf8'));
const animals=read('species'),plants=read('plants'),rows=[...animals,...plants];
const counts=list=>({entries:list.length,photo:list.filter(r=>r.image).length,size:list.filter(r=>r.sizeInfo).length,price:list.filter(r=>r.priceInfo).length,missingPhoto:list.filter(r=>!r.image).length,missingSize:list.filter(r=>!r.sizeInfo).length,missingPrice:list.filter(r=>!r.priceInfo).length,nonSpeciesEntries:list.filter(r=>r.catalogType!=='종').length});
const groups={};for(const row of rows){const key=row.id.startsWith('plant-')?'식물/'+row.category:'동물/'+row.major+'/'+row.middle;(groups[key]??=[]).push(row);}
console.log(JSON.stringify({total:counts(rows),animals:counts(animals),plants:counts(plants),groups:Object.fromEntries(Object.entries(groups).map(([key,list])=>[key,counts(list)]))},null,2));

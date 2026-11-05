import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const context={};vm.runInNewContext(fs.readFileSync(new URL('../dist/image-loader.js',import.meta.url),'utf8'),context);
let intersection,mutations,observed=new Set();
class Observer{constructor(cb){intersection=cb;}observe(img){observed.add(img);}unobserve(img){observed.delete(img);}}
class Mutations{constructor(cb){mutations=cb;}observe(){}}
function img(url){const listeners=new Map();return {dataset:{photoSrc:url},isConnected:true,visible:true,getClientRects(){return this.visible?[{}]:[];},addEventListener(k,fn){listeners.set(k,fn);},removeEventListener(k){listeners.delete(k);},complete(k='load'){listeners.get(k)?.();}};}
const images=[img('images/test-one.jpg'),img('images/test-two.jpg'),img('images/test-three.jpg')];
const hidden=img('images/morph-hidden.jpg');hidden.visible=false;
context.VivaImageLoader.mount({documentElement:{},querySelectorAll:()=>[...images,hidden]},Observer,Mutations);
assert(images.every(i=>!i.src),'No request before viewport intersection');
intersection([...images,hidden].map(target=>({target,isIntersecting:true})));
assert(images[0].src&&images[1].src&&!images[2].src,'Only two requests may start together');
images[0].complete();assert(images[2].src,'A completed request releases one queue slot');
images[2].dataset.photoFallback='images/original-three.jpg';images[2].complete('error');
assert.equal(images[2].src,'images/original-three.jpg','Missing preview retries the original while keeping its queue slot');
images[1].complete();assert(!hidden.src,'Closed morph sections cannot load photos');
assert(observed.has(hidden));hidden.visible=true;intersection([{target:hidden,isIntersecting:true}]);assert(hidden.src);
const removed=img('images/removed.jpg');const more=img('images/more.jpg');
mutations([{addedNodes:[{querySelectorAll:()=>[removed,more]}]}]);
removed.isConnected=false;mutations([{addedNodes:[]}]);assert(!observed.has(removed),'Removed image nodes must be released');
intersection([{target:more,isIntersecting:true}]);assert(!more.src);
images[2].complete('error');assert(more.src,'Error releases the next slot');
assert(!removed.src);
const fallback=img('images/fallback.jpg');fallback.visible=false;
context.VivaImageLoader.mount({querySelectorAll:()=>[fallback]},null,null);
assert(fallback.src,'Without IntersectionObserver native lazy loading remains usable');
vm.runInNewContext(fs.readFileSync(new URL('../dist/image-previews.js',import.meta.url),'utf8'),context);
function jpegSize(path){
 const b=fs.readFileSync(path);
 if(b.readUInt16BE(0)===0x8950)return {width:b.readUInt32BE(16),height:b.readUInt32BE(20)};
 if(b.toString('ascii',0,3)==='GIF')return {width:b.readUInt16LE(6),height:b.readUInt16LE(8)};
 assert.equal(b.readUInt16BE(0),0xffd8);
 for(let i=2;i<b.length;){
  if(b[i]!==255){i++;continue;}
  const marker=b[i+1];if(marker===255){i++;continue;}
  if([0xc0,0xc1,0xc2].includes(marker))return {width:b.readUInt16BE(i+7),height:b.readUInt16BE(i+5)};
  i+=b.readUInt16BE(i+2)+2;
 }
 throw Error('Missing JPEG dimensions: '+path);
}
for(const [original,preview]of Object.entries(context.VivaImagePreviews)){
 assert.match(preview,/^images\/thumb-[a-z0-9-]+\.jpg$/);
 assert(fs.existsSync(new URL('../dist/'+original,import.meta.url)));
 assert(fs.statSync(new URL('../dist/'+preview,import.meta.url)).size>0);
 const sourceSize=jpegSize(new URL('../dist/'+original,import.meta.url)),size=jpegSize(new URL('../dist/'+preview,import.meta.url));
 assert.equal(Math.max(size.width,size.height),640,'Preview keeps useful resolution, capped at 640px');
 assert(Math.abs(size.width*sourceSize.height-size.height*sourceSize.width)<=Math.max(sourceSize.width,sourceSize.height),'Preview preserves the original aspect ratio');
}
console.log('PASS: deferred image requests, concurrency cap, hidden morphs, removed nodes, error recovery, fallback and preview assets.');

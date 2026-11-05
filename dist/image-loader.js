/* Images have no request URL until visible; keep only two requests in flight. */
(function(root){
  'use strict';
  function mount(doc,Observer,Mutations){
    var pending=new Set(),queue=[],active=0;
    function valid(url){return /^images\/[a-z0-9-]+\.(jpg|png|webp)$/.test(url)||/^https:\/\//.test(url);}
    function pump(){
      while(active<2&&queue.length){
        var img=queue.shift();
        if(!img.isConnected)continue;
        // Closed morph sections and off-screen cards wait for a new intersection.
        if(observer&&img.getClientRects&&!img.getClientRects().length){watch(img);continue;}
        var url=img.dataset.photoSrc;if(!valid(url||''))continue;
        active++;
        (function(image){
          var done=false;
          function release(){if(done)return;done=true;image.removeEventListener('load',release);image.removeEventListener('error',failure,true);active--;pump();}
          function failure(event){
            var fallback=image.dataset.photoFallback;
            if(fallback&&valid(fallback)){delete image.dataset.photoFallback;event?.stopImmediatePropagation();image.src=fallback;return;}
            release();
          }
          image.addEventListener('load',release);image.addEventListener('error',failure,true);
          image.src=url;delete image.dataset.photoSrc;
        })(img);
      }
    }
    function enqueue(img){pending.delete(img);if(observer)observer.unobserve(img);queue.push(img);pump();}
    var observer=Observer?new Observer(function(entries){entries.forEach(function(e){if(e.isIntersecting&&pending.has(e.target))enqueue(e.target);});},{rootMargin:'240px 0px'}):null;
    function watch(img){
      if(pending.has(img)||!img.dataset.photoSrc)return;
      if(!observer){if(valid(img.dataset.photoSrc)){img.src=img.dataset.photoSrc;delete img.dataset.photoSrc;}return;}
      pending.add(img);observer.observe(img);
    }
    function scan(node){if(node.matches&&node.matches('img[data-photo-src]'))watch(node);if(node.querySelectorAll)node.querySelectorAll('img[data-photo-src]').forEach(watch);}
    scan(doc);
    var mutations=Mutations?new Mutations(function(records){
      pending.forEach(function(img){if(!img.isConnected){if(observer)observer.unobserve(img);pending.delete(img);}});
      queue=queue.filter(function(img){return img.isConnected;});
      records.forEach(function(record){Array.from(record.addedNodes||[]).forEach(scan);});
    }):null;
    if(mutations)mutations.observe(doc.documentElement,{childList:true,subtree:true});
    return {scan:scan};
  }
  root.VivaImageLoader={mount:mount};
  if(typeof document!=='undefined'){
    function start(){mount(document,root.IntersectionObserver,root.MutationObserver);}
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  }
})(globalThis);

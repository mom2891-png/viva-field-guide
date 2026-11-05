/* Images have no request URL until visible; keep only two requests in flight. */
(function(root){
  'use strict';
  function mount(doc,Observer,Mutations){
    var pending=new Set(),queue=[],active=0,inflight=new Map();
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
          var done=false,timer=null;
          function release(){if(done)return;done=true;if(timer&&root.clearTimeout)root.clearTimeout(timer);image.removeEventListener('load',success);image.removeEventListener('error',failure,true);inflight.delete(image);active--;pump();}
          function success(){delete image.dataset.photoLoading;release();}
          function deadline(){if(root.setTimeout){if(timer)root.clearTimeout(timer);timer=root.setTimeout(function(){failure();},12000);}}
          function failure(event){
            if(done)return;
            event?.stopImmediatePropagation();
            var fallback=image.dataset.photoFallback;
            if(fallback&&valid(fallback)){delete image.dataset.photoFallback;image.src=fallback;deadline();return;}
            if(doc.createElement&&image.replaceWith){var message=doc.createElement('span');message.className='photo-placeholder photo-error';message.textContent='사진을 불러오지 못했어요';message.setAttribute('role','img');message.setAttribute('aria-label',(image.alt||'생물')+' 사진 연결 실패');image.replaceWith(message);}
            release();
            if(image.removeAttribute)image.removeAttribute('src');
          }
          inflight.set(image,function(){release();if(image.removeAttribute)image.removeAttribute('src');});
          image.dataset.photoLoading='true';image.loading='eager';
          image.addEventListener('load',success);image.addEventListener('error',failure,true);deadline();
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
      inflight.forEach(function(cancel,img){if(!img.isConnected)cancel();});
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

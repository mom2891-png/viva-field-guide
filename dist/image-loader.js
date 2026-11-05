/* Images have no request URL until visible; keep only two requests in flight. */
(function(root){
  'use strict';
  function mount(doc,Observer,Mutations){
    var pending=new Set(),visible=new Set(),queued=new Set(),queue=[],active=0,inflight=new Map();
    function valid(url){return /^images\/[a-z0-9-]+\.(jpg|png|webp)$/.test(url)||/^https:\/\//.test(url);}
    function onScreen(img){
      if(!img.isConnected||(img.getClientRects&&!img.getClientRects().length))return false;
      if(img.getBoundingClientRect){var rect=img.getBoundingClientRect(),height=root.innerHeight||doc.documentElement?.clientHeight,width=root.innerWidth||doc.documentElement?.clientWidth;if(height&&width)return rect.bottom>0&&rect.top<height&&rect.right>0&&rect.left<width&&rect.width>0&&rect.height>0;}
      return true;
    }
    function pump(){
      while(active<2&&queue.length){
        var img=queue.shift();queued.delete(img);
        if(!onScreen(img)||(observer&&!visible.has(img)))continue;
        var url=img.dataset.photoSrc;if(!valid(url||''))continue;
        pending.delete(img);
        active++;
        (function(image,requestUrl){
          var done=false,timer=null,currentUrl=requestUrl;
          function release(){if(done)return;done=true;if(timer&&root.clearTimeout)root.clearTimeout(timer);image.removeEventListener('load',success);image.removeEventListener('error',failure,true);inflight.delete(image);visible.delete(image);if(observer)observer.unobserve(image);active--;pump();}
          function success(){delete image.dataset.photoLoading;release();}
          function deadline(){if(root.setTimeout){if(timer)root.clearTimeout(timer);timer=root.setTimeout(function(){failure();},12000);}}
          function failure(event){
            if(done)return;
            event?.stopImmediatePropagation();
            var fallback=image.dataset.photoFallback;
            if(fallback&&valid(fallback)){delete image.dataset.photoFallback;currentUrl=fallback;image.src=fallback;deadline();return;}
            if(doc.createElement&&image.replaceWith){var message=doc.createElement('span');message.className='photo-placeholder photo-error';message.textContent='사진을 불러오지 못했어요';message.setAttribute('role','img');message.setAttribute('aria-label',(image.alt||'생물')+' 사진 연결 실패');image.replaceWith(message);}
            release();
            if(image.removeAttribute)image.removeAttribute('src');
          }
          inflight.set(image,function(resume){release();if(image.removeAttribute)image.removeAttribute('src');delete image.dataset.photoLoading;if(resume&&image.isConnected){image.dataset.photoSrc=currentUrl;watch(image);}});
          image.dataset.photoLoading='true';image.loading='eager';
          image.addEventListener('load',success);image.addEventListener('error',failure,true);deadline();
          image.src=requestUrl;delete image.dataset.photoSrc;
        })(img,url);
      }
    }
    function enqueue(img){if(queued.has(img)||inflight.has(img))return;queued.add(img);queue.push(img);pump();}
    var observer=Observer?new Observer(function(entries){entries.forEach(function(e){
      var img=e.target;
      if(!pending.has(img)&&!inflight.has(img)){visible.delete(img);observer.unobserve(img);return;}
      if(e.isIntersecting&&onScreen(img)){visible.add(img);if(pending.has(img))enqueue(img);}
      else {visible.delete(img);queued.delete(img);queue=queue.filter(function(item){return item!==img;});if(inflight.has(img))inflight.get(img)(true);}
    });},{rootMargin:'0px',threshold:0}):null;
    function watch(img){
      if(pending.has(img)||!img.dataset.photoSrc)return;
      pending.add(img);if(observer)observer.observe(img);else if(onScreen(img))enqueue(img);
    }
    function checkVisible(){if(!observer)pending.forEach(function(img){if(onScreen(img))enqueue(img);});}
    function scan(node){if(node.matches&&node.matches('img[data-photo-src]'))watch(node);if(node.querySelectorAll)node.querySelectorAll('img[data-photo-src]').forEach(watch);checkVisible();}
    scan(doc);
    var mutations=Mutations?new Mutations(function(records){
      pending.forEach(function(img){if(!img.isConnected){if(observer)observer.unobserve(img);pending.delete(img);visible.delete(img);}});
      queue=queue.filter(function(img){if(img.isConnected)return true;queued.delete(img);return false;});
      inflight.forEach(function(cancel,img){if(!img.isConnected)cancel();});
      records.forEach(function(record){Array.from(record.addedNodes||[]).forEach(scan);});
    }):null;
    if(mutations)mutations.observe(doc.documentElement,{childList:true,subtree:true});
    if(!observer&&root.addEventListener){root.addEventListener('scroll',checkVisible,{passive:true,capture:true});root.addEventListener('resize',checkVisible,{passive:true});}
    return {scan:scan};
  }
  root.VivaImageLoader={mount:mount};
  if(typeof document!=='undefined'){
    function start(){mount(document,root.IntersectionObserver,root.MutationObserver);}
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  }
})(globalThis);

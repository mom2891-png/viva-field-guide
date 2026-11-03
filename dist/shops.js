'use strict';
var VivaShops = (()=>{
  const categories=['정글플랜트','이끼·수초','파충류·양서류','무척추동물','테라리움 완성품·주문제작','자재·도구','DIY 키트'];
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=value=>String(value).toLowerCase().replace(/[\s·\-]/g,'');
  const safe=value=>{try{const u=new URL(value);return u.protocol==='https:'?u.href:'';}catch{return '';}};
  function filter(shops,query='',category='all'){
    const term=normalize(query);
    return shops.filter(s=>(category==='all'||s.categories.includes(category))&&normalize([s.name,...(s.aliases||[]),s.description,...s.categories,...(s.assortment||[]).map(p=>p.name)].join(' ')).includes(term)).sort((a,b)=>a.name.localeCompare(b.name,'ko'));
  }
  function linkedRows(shop,rows){return rows.filter(r=>[...(r.purchaseLinks||[]),...(r.sellerOffers||[])].some(p=>p.shop===shop.name)).sort((a,b)=>a.name.localeCompare(b.name,'ko'));}
  function cards(shops,rows){return shops.map(shop=>{
    const count=linkedRows(shop,rows).length,url=safe(shop.url);
    return `<article class="shop-card"><div class="eyebrow">DOMESTIC SHOP</div><h2>${escape(shop.name)}</h2><div class="shop-tags">${shop.categories.map(c=>`<span>${escape(c)}</span>`).join('')}</div><p>${escape(shop.description)}</p><div class="shop-card-bottom">${url?`<a class="shop-visit" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(shop.linkLabel)} ↗</a>`:'<span>링크 확인 중</span>'}${count?`<button class="shop-related" data-shop-related="${escape(shop.id)}">관련 도감 ${count}항목 →</button>`:''}${shop.assortment?.length?`<button class="shop-related" data-shop-menu="${escape(shop.id)}">판매 품목·가격표 →</button>`:''}</div><small>${escape(shop.checkedAt.replaceAll('-','.'))} · ${shop.verification==='user'?'사용자 제공 문의처':'사이트·취급 정보 확인'}</small></article>`;
  }).join('');}
  function relatedHTML(shop,rows){return `<div class="shop-species"><div class="eyebrow">SHOP COLLECTION</div><h2>${escape(shop.name)}</h2><p>도감에 판매 정보가 연결된 항목이에요. 현재 재고는 판매처에서 확인해 주세요.</p><div class="shop-species-list">${linkedRows(shop,rows).map(row=>`<button data-shop-entry="${escape(row.id)}" data-shop-origin="${escape(shop.id)}"><span>${row.id.startsWith('plant-')?'식물·이끼':'동물'}</span><strong>${escape(row.name)}</strong><i>${escape(row.latin)}</i><span aria-hidden="true">→</span></button>`).join('')}</div></div>`;}
  function assortmentHTML(shop){
    const money=v=>new Intl.NumberFormat('ko-KR').format(v)+'원';
    return `<div class="shop-species"><div class="eyebrow">SHOP MENU</div><h2>${escape(shop.name)} 판매 품목</h2><p>사용자가 제공한 가격표를 옮긴 정보예요. 원본 게시일은 미상이며 현재 재고·가격·정확한 종은 판매처에서 확인해 주세요.</p>${shop.menuNote?`<p>${escape(shop.menuNote)}</p>`:''}<div class="shop-menu-list">${(shop.assortment||[]).map(p=>`<article><span class="env-tag">${escape(p.category||'판매 품목')}</span><h3>${escape(p.name)}</h3><p>${escape(p.unit||'단위 미표기')} · ${p.price!=null?money(p.price):p.min!=null?money(p.min)+'~'+money(p.max):'가격 문의'}${p.status==='soldOut'?' · 품절':p.status==='restocking'?' · 재입고 대기':''}</p>${p.note?`<p>${escape(p.note)}</p>`:''}${p.catalogId?`<button class="shop-related" data-shop-return="menu" data-shop-entry="${escape(p.catalogId)}" data-shop-origin="${escape(shop.id)}">관련 도감 보기 →</button>`:''}</article>`).join('')}</div>${safe(shop.url)?`<a class="shop-visit" href="${escape(safe(shop.url))}" target="_blank" rel="noopener noreferrer">카카오톡 문의 ↗</a>`:''}</div>`;
  }
  function mount(root,{version,onRelated,onMenu}){
    const input=root.querySelector('#shopSearch');if(!input)return null;
    const grid=root.querySelector('#shopGrid'),count=root.querySelector('#shopCount'),empty=root.querySelector('#shopEmpty'),reset=root.querySelector('#shopReset'),retry=root.querySelector('#shopRetry'),filters=root.querySelector('#shopFilters');
    let shops=[],rows=[],category='all',loaded=false,pending=null;
    filters.innerHTML=[['all','전체'],...categories.map(c=>[c,c])].map(([value,label])=>`<button class="env-chip" data-shop-category="${escape(value)}" aria-pressed="${value==='all'}">${escape(label)}</button>`).join('');
    function render(){
      if(!loaded)return;
      const matches=filter(shops,input.value,category);grid.innerHTML=cards(matches,rows);count.textContent=`${matches.length}곳의 국내 구매처`;empty.hidden=matches.length>0;reset.hidden=!input.value&&category==='all';
      filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.shopCategory===category)));
    }
    function clear(){input.value='';category='all';render();input.focus();}
    async function show(){
      if(loaded){render();return;}if(pending)return pending;
      count.textContent='구매처를 불러오는 중이에요.';retry.hidden=true;
      pending=fetch(`shops.json?v=${encodeURIComponent(version)}`).then(r=>{if(!r.ok)throw Error('shops');return r.json();}).then(data=>{shops=data;loaded=true;render();}).catch(()=>{count.textContent='구매처를 불러오지 못했어요. 다시 시도해 주세요.';retry.hidden=false;}).finally(()=>{pending=null;});
      return pending;
    }
    input.addEventListener('input',render);reset.addEventListener('click',clear);root.querySelector('#shopEmptyReset').addEventListener('click',clear);retry.addEventListener('click',show);
    filters.addEventListener('click',event=>{const b=event.target.closest('[data-shop-category]');if(b){category=b.dataset.shopCategory;render();}});
    grid.addEventListener('click',event=>{const menu=event.target.closest('[data-shop-menu]');if(menu){onMenu?.(shops.find(s=>s.id===menu.dataset.shopMenu));return;}const b=event.target.closest('[data-shop-related]');if(b)onRelated(shops.find(s=>s.id===b.dataset.shopRelated));});
    return {show,setCatalog(data){rows=data;render();},getShop(id){return shops.find(s=>s.id===id);}};
  }
  return {categories,filter,linkedRows,cards,relatedHTML,assortmentHTML,mount};
})();

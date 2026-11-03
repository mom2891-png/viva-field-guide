'use strict';
const $ = (selector) => document.querySelector(selector);
const envNames = {습:'습식',혼:'건습 혼합',건:'건조',수:'반수생·수생',냉:'냉량 관리',대:'대형 사육장',환:'충분한 환기',굴:'깊은 바닥재',해:'담수·해수'};
const descriptions = {
  습:'살아 있는 식물과 가지, 은신처를 활용하는 습식 환경의 후보예요. 습도를 유지하되 바닥이 물에 잠기지 않도록 배수하고, 종에 맞는 환기와 건조 주기를 마련해 주세요.',
  혼:'건조한 활동 공간과 습한 은신처를 함께 마련하는 환경이 어울려요. 사육장 전체를 계속 축축하게 유지하는 방식과는 구분해서 계획해 주세요.',
  건:'건조형 테라리움에 맞춰 환경을 구성하는 생물이에요. 이끼와 열대식물 중심의 고습 사육장에 넣기보다, 건조한 바닥과 필요한 습한 은신처를 구분해 주세요.',
  수:'수역이나 수조를 포함해 계획해야 하는 생물이에요. 종과 성장 단계에 따라 육지 비율이 달라지므로, 물의 깊이·수질·편하게 오르내릴 출입부를 함께 확인해 주세요.'
};
let species = [], animals = [], plants = [], morphs = {}, limit = 24, state = {category:'all',environment:'all',search:'',sort:'popular',excludeSpecial:false,savedOnly:false,page:'animals',subgroup:'all',availability:'all'};
let favorites = new Set();
try { favorites = new Set(JSON.parse(localStorage.getItem('viva-favorites-v1') || '[]')); } catch {}
const animalCategories = [ ['all','전체 생물'],['gecko','게코'],['lizard','도마뱀'],['snake','뱀'],['frog','개구리'],['newt','뉴트·도롱뇽'],['invert','무척추동물'] ];
const animalEnvironments = [['all','모든 환경'],['습','습식'],['혼','건습 혼합'],['건','건조'],['수','반수생·수생'],['냉','냉량 관리'],['환','환기 중점']];
function categoryOf(row) {
  if(row.id.startsWith('plant-')) return row.category;
  if(['절지동물','연체동물','무척추동물'].includes(row.major)) return 'invert';
  if(row.middle==='게코') return 'gecko';
  if(row.middle.startsWith('뱀')) return 'snake';
  if(row.middle.startsWith('개구리')) return 'frog';
  if(row.middle.startsWith('도롱뇽')) return 'newt';
  return 'lizard';
}
function normalized(value){return value.toLowerCase().replace(/[\s·\-]/g,'');}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
function safeUrl(url){try {const u=new URL(url); return u.protocol==='https:' ? u.href : '';} catch{return '';}}
function tags(row){if(row.id.startsWith('plant-'))return [row.environment,'빛 '+row.light,'습도 '+row.humidity].map(t=>`<span class="env-tag">${escapeHTML(t)}</span>`).join('');return row.env.split('·').map(code=>`<span class="env-tag ${'냉대환해'.includes(code)?'special':''}">${envNames[code]||code}</span>`).join('');}
function placeholder(row){return `<div class="photo-placeholder" role="img" aria-label="${escapeHTML(row.name)} 사진 준비 중"><span class="silhouette" aria-hidden="true">✳</span><span>사진 준비 중</span></div>`;}
function photo(row, className='') {
  return row.image?`<img class="${className}" src="${escapeHTML(safeUrl(row.image))}" alt="${escapeHTML(row.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`:placeholder(row);
}
function updateSaved(){ $('#savedCount').textContent=favorites.size; $('#savedButton').setAttribute('aria-pressed',String(state.savedOnly));}
function saveFavorite(id){
  const added=!favorites.has(id);
  if(added) favorites.add(id); else favorites.delete(id);
  try{localStorage.setItem('viva-favorites-v1',JSON.stringify([...favorites]));}catch{showToast('이 브라우저에서는 저장 공간을 사용할 수 없어요.');}
  updateSaved();
  document.querySelectorAll(`[data-favorite="${id}"]`).forEach(button=>{
    button.classList.toggle('active',added);button.setAttribute('aria-pressed',String(added));
    button.innerHTML=button.classList.contains('detail-save')?(added?'♥ 관심 생물에 저장됨':'♡ 관심 생물로 저장'):(added?'♥':'♡');
    button.setAttribute('aria-label',added?'관심 생물에서 삭제':'관심 생물에 저장');
  });
  if(state.savedOnly||state.sort==='saved') render();
  showToast(added?'관심 생물에 담았어요.':'관심 생물에서 뺐어요.');
}
let toastTimer;
function showToast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2200);}
function filtered(){
  const search=normalized(state.search);
  return species.filter(row=>(state.category==='all'||categoryOf(row)===state.category)
    &&(state.subgroup==='all'||(row.middle||row.category)===state.subgroup)
    &&(state.availability==='all'||(state.availability==='domestic'?row.domesticStatus==='국내 취급 기록':state.availability==='new'?Boolean(row.addedAt):!row.popularityKnown))
    &&(state.environment==='all'||(row.id.startsWith('plant-')?row.environment===state.environment:row.env.split('·').includes(state.environment)))
    &&(!state.excludeSpecial||(!row.env?.includes('대')&&!row.env?.includes('냉')))
    &&(!state.savedOnly||favorites.has(row.id))
    &&(!search||normalized(`${row.name} ${row.latin} ${row.major||row.category} ${row.middle||''} ${(row.aliases||[]).join(' ')} ${(row.varieties||[]).join(' ')} ${(morphs[row.id]||[]).map(m=>[m.name,...m.aliases].join(' ')).join(' ')}`).includes(search)))
    .sort((a,b)=>(state.sort==='popular'?(Number(b.popularityKnown)-Number(a.popularityKnown)||((a.popularity??1e9)-(b.popularity??1e9))):state.sort==='recent'?((b.addedAt||'').localeCompare(a.addedAt||'')):state.sort==='saved'?Number(favorites.has(b.id))-Number(favorites.has(a.id)):0)||a.name.localeCompare(b.name,'ko'));
}
function render(){
  const categories=state.page==='plants'?[['all','전체 식물'],...[...new Set(plants.map(r=>r.category))].map(c=>[c,c])]:animalCategories;
  const environments=state.page==='plants'?[['all','모든 환경'],...[...new Set(plants.map(r=>r.environment))].map(c=>[c,c])]:animalEnvironments;
  const list=filtered();
  const groups=[...new Set(species.filter(r=>state.category==='all'||categoryOf(r)===state.category).map(r=>r.middle||r.category))].sort((a,b)=>a.localeCompare(b,'ko'));
  $('#subgroup').innerHTML='<option value="all">모든 세부 분류</option>'+groups.map(g=>`<option value="${escapeHTML(g)}">${escapeHTML(g)}</option>`).join('');$('#subgroup').value=state.subgroup;$('#availability').value=state.availability;
  $('#sort').innerHTML='<option value="popular">인기순</option>'+'<option value="name">이름순</option><option value="recent">최근 추가순</option><option value="saved">관심 생물 먼저</option>';$('#sort').value=state.sort;
  $('#categories').innerHTML=categories.map(([id,name])=>`<button class="category-tab ${state.category===id?'active':''}" data-category="${id}" aria-pressed="${state.category===id}">${name}<span>${id==='all'?species.length:species.filter(r=>categoryOf(r)===id).length}</span></button>`).join('');
  $('#environments').innerHTML=environments.map(([id,name])=>`<button class="env-chip ${state.environment===id?'active':''}" data-environment="${id}" aria-pressed="${state.environment===id}">${name}</button>`).join('');
  $('#grid').innerHTML=list.slice(0,limit).map(row=>`<article class="species-card"><div class="card-image"><button class="open-detail" data-detail="${row.id}" aria-label="${escapeHTML(row.name)} 자세히 보기">${photo(row)}</button><span class="ranking">${row.id.startsWith('plant-')?'BOTANICAL':'FIELD GUIDE'}</span><button class="favorite ${favorites.has(row.id)?'active':''}" data-favorite="${row.id}" aria-pressed="${favorites.has(row.id)}" aria-label="${favorites.has(row.id)?'관심 생물에서 삭제':'관심 생물에 저장'}">${favorites.has(row.id)?'♥':'♡'}</button></div><div class="card-info"><p class="card-meta">${escapeHTML(row.major||'식물')} / ${escapeHTML(categories.find(c=>c[0]===categoryOf(row))[1])}</p><button class="species-title" data-detail="${row.id}">${escapeHTML(row.name)}</button><span class="latin">${escapeHTML(row.latin)}</span><div class="card-env">${tags(row)}</div>${morphs[row.id]?.length?`<div class="morph-preview">${morphs[row.id].slice(0,3).map(m=>escapeHTML(m.name)).join(' · ')} <button data-detail="${row.id}">${morphs[row.id].length}개 모프·패턴 보기</button></div>`:''}${!row.popularityKnown?'<span class="catalog-status">확장 후보 · 인기 미집계</span>':''}${row.catalogType!=='종'?`<span class="catalog-status">${escapeHTML(row.catalogType)}</span>`:''}${row.placement?`<p class="plant-placement">${escapeHTML(row.placement)}</p>`:''}</div></article>`).join('');
  $('#grid').querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{const row=species.find(r=>r.id===img.closest('[data-detail]').dataset.detail);img.replaceWith(document.createRange().createContextualFragment(placeholder(row)));},{once:true}));
  $('#resultCount').textContent=`${state.savedOnly?'관심 목록 · ':''}${list.length}개 항목의 ${state.page==='plants'?'식물':'생물'}`;
  $('#empty').hidden=list.length!==0;
  $('#empty h3').textContent=state.savedOnly&&!favorites.size?'마음에 드는 생물을 담아보세요':'조건에 맞는 생물이 없어요';
  $('#empty p').textContent=state.savedOnly&&!favorites.size?'사진의 하트를 누르면 이곳에서 다시 만날 수 있어요.':'검색어나 환경 조건을 조금 바꿔보세요.';
  $('#loadMore').hidden=limit>=list.length;
  $('#pageCount').textContent=list.length?`${Math.min(limit,list.length)} / ${list.length}`:'';
  $('#resetFilters').hidden=state.category==='all'&&state.environment==='all'&&!state.search&&!state.excludeSpecial&&!state.savedOnly&&state.subgroup==='all'&&state.availability==='all';
  $('#sortNote').hidden=state.page!=='plants';$('#sortNote').textContent='빛·습도·배치를 함께 확인해 주세요';$('#excludeSpecial').closest('label').hidden=state.page==='plants';
  $('#collectionTitle').textContent=state.savedOnly?'마음에 담아둔 생물들':(state.page==='plants'?'작은 숲을 무엇으로 채울까요?':'어떤 생물과 함께할까요?');
  updateSaved();
}
function reset(){state={...state,category:'all',environment:'all',search:'',excludeSpecial:false,savedOnly:false,subgroup:'all',availability:'all'};$('#search').value='';$('#excludeSpecial').checked=false;limit=24;render();}
function photoCredit(row){
  if(!row.image)return '';
  const c=row.credit||{}, file=row.imageFile;
  const url=safeUrl(c.url)||(file?'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file):'');
  return `<details class="photo-credit"><summary>사진 정보</summary><div>${escapeHTML(c.author||'Wikimedia Commons')} ${c.license?'· '+escapeHTML(c.license):''} ${url?`<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">원본·라이선스 ↗</a>`:''}</div></details>`;
}
function openDetail(id){
  const row=[...animals,...plants].find(r=>r.id===id);if(!row)return;
  if(row.id.startsWith('plant-')){openPlantDetail(row);return;}
  const extras=[];
  if(row.env.includes('냉'))extras.push('여름철 냉각을 포함해 냉량 환경을 유지할 수 있는지 먼저 확인해 주세요.');
  if(row.env.includes('대'))extras.push('성체의 몸집과 활동량에 맞는 큰 사육 공간을 먼저 확보해 주세요.');
  if(row.env.includes('환'))extras.push('공기가 정체되지 않도록 충분한 통풍을 계획해 주세요.');
  if(row.env.includes('굴'))extras.push('굴을 파고 몸을 숨길 수 있는 깊은 바닥재가 중요해요.');
  if(row.env.includes('해'))extras.push('담수와 해수를 따로 제공하고, 물에서 스스로 나올 수 있는 구조를 마련해 주세요.');
  $('#detailContent').innerHTML=`<div class="detail-layout"><div class="detail-image-wrap">${photo(row,'detail-image')}</div><div class="detail-info"><div class="eyebrow">FIELD GUIDE · ANIMALS</div><h2>${escapeHTML(row.name)}</h2><span class="latin">${escapeHTML(row.latin)}</span><div class="taxonomy"><span>${escapeHTML(row.major||'식물')}</span><span>${escapeHTML(row.middle)}</span><span>${escapeHTML(row.name)}</span></div>${statusSection(row)}${morphSection(row)}<h3>함께할 환경</h3><div class="card-env">${tags(row)}</div><p>${escapeHTML(row.careNote||descriptions[row.env[0]]||descriptions['습'])}</p>${extras.length?`<p>${extras.join(' ')}</p>`:''}<button class="outline-button detail-save ${favorites.has(row.id)?'active':''}" data-favorite="${row.id}" aria-pressed="${favorites.has(row.id)}">${favorites.has(row.id)?'♥ 관심 생물에 저장됨':'♡ 관심 생물로 저장'}</button><p class="note-small">환경 표시는 후보를 고르는 참고 정보예요. 같은 환경 표시는 합사 가능을 뜻하지 않아요. 입양 전 정확한 종명과 종별 사육 조건을 확인해 주세요.</p>${photoCredit(row)}</div></div>`;
  const img=$('#detailContent img');if(img)img.addEventListener('error',()=>img.replaceWith(document.createRange().createContextualFragment(placeholder(row))),{once:true});
  $('#detailDialog').showModal();document.body.style.overflow='hidden';
}
function statusSection(row){return `<div class="entry-status"><span>${escapeHTML(row.domesticStatus)}</span><span>${escapeHTML(row.verification)}</span>${row.catalogType!=='종'?`<span>${escapeHTML(row.catalogType)}</span>`:''}</div>`;}
function morphSection(row){
  const items=morphs[row.id]||[];if(!items.length)return '';
  return `<section class="morph-section"><h3>모프·패턴·지역형 <span>${items.length}</span></h3><p class="note-small">같은 종 안에서 구별하는 이름이에요. 화면의 사진은 종의 참고 사진이며 특정 모프를 대표하지 않아요.</p><div class="morph-list">${items.map(m=>`<details><summary>${escapeHTML(m.name)} <span>${escapeHTML(m.type)}</span></summary><p>${escapeHTML(m.description)}</p></details>`).join('')}</div></section>`;
}
function openPlantDetail(row){
  $('#detailContent').innerHTML=`<div class="detail-layout"><div class="detail-image-wrap">${photo(row,'detail-image')}</div><div class="detail-info"><div class="eyebrow">BOTANICAL FIELD GUIDE</div><h2>${escapeHTML(row.name)}</h2><span class="latin">${escapeHTML(row.latin)}</span><div class="taxonomy"><span>식물</span><span>${escapeHTML(row.category)}</span><span>${escapeHTML(row.name)}</span></div>${statusSection(row)}${row.varieties?.length?`<h3>품종·유통명</h3><div class="card-env">${row.varieties.map(v=>`<span class="env-tag">${escapeHTML(v)}</span>`).join('')}</div><p class="note-small">종의 참고 사진이에요. 특정 품종의 모습을 뜻하지 않아요.</p>`:''}<h3>자랄 자리</h3><div class="card-env">${tags(row)}</div><p><strong>배치</strong> · ${escapeHTML(row.placement)}</p><p>${escapeHTML(row.care)}</p><button class="outline-button detail-save" data-favorite="${row.id}" aria-pressed="${favorites.has(row.id)}">${favorites.has(row.id)?'♥ 관심 생물에 저장됨':'♡ 관심 생물로 저장'}</button><p class="note-small">식물별 빛과 통풍 조건을 함께 확인해 주세요. 식재 후보 목록은 모든 동물에게 섭취해도 안전하다는 뜻이 아니에요. 수변 식물은 설명에 맞게 뿌리와 잎의 위치를 구분해 주세요.</p>${photoCredit(row)}</div></div>`;
  const img=$('#detailContent img');if(img)img.addEventListener('error',()=>img.replaceWith(document.createRange().createContextualFragment(placeholder(row))),{once:true});
  $('#detailDialog').showModal();document.body.style.overflow='hidden';
}
function setPage(page){
  state.page=page;species=page==='plants'?plants:animals;state.sort='popular';
  document.body.classList.toggle('plants-view',page==='plants');
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  $('#search').placeholder=page==='plants'?'식물 이름·학명으로 찾아보세요':'생물·모프 이름·학명으로 찾아보세요';
  $('#search').setAttribute('aria-label',page==='plants'?'식물 이름 또는 학명 검색':'생물 모프 이름 또는 학명 검색');
  reset();window.scrollTo({top:0,behavior:'smooth'});
}
document.addEventListener('click',event=>{
  const favorite=event.target.closest('[data-favorite]');if(favorite){saveFavorite(favorite.dataset.favorite);return;}
  const detail=event.target.closest('[data-detail]');if(detail){openDetail(detail.dataset.detail);return;}
  const category=event.target.closest('[data-category]');if(category){state.category=category.dataset.category;state.subgroup='all';limit=24;render();return;}
  const environment=event.target.closest('[data-environment]');if(environment){state.environment=environment.dataset.environment;limit=24;render();return;}
  const page=event.target.closest('[data-page]');if(page){setPage(page.dataset.page);}
});
$('#search').addEventListener('input',event=>{state.search=event.target.value;limit=24;render();});
$('#sort').addEventListener('change',event=>{state.sort=event.target.value;limit=24;render();});
$('#excludeSpecial').addEventListener('change',event=>{state.excludeSpecial=event.target.checked;limit=24;render();});
for(const key of ['subgroup','availability'])$('#'+key).addEventListener('change',event=>{state[key]=event.target.value;limit=24;render();});
$('#loadMore').addEventListener('click',()=>{limit+=24;render();});
$('#resetFilters').addEventListener('click',reset);$('#emptyReset').addEventListener('click',reset);
$('#savedButton').addEventListener('click',()=>{state.savedOnly=!state.savedOnly;limit=24;render();$('#collection').scrollIntoView({behavior:'smooth'});});
$('#heroDetail').addEventListener('click',()=>openDetail('species-1'));
$('#closeDialog').addEventListener('click',()=>$('#detailDialog').close());
$('#detailDialog').addEventListener('close',()=>document.body.style.overflow='');
$('#detailDialog').addEventListener('click',event=>{if(event.target===$('#detailDialog')){const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.target.close();}});
$('#aboutButton').addEventListener('click',()=>{$('#detailContent').innerHTML=`<div class="about"><div class="eyebrow">ABOUT THE FIELD GUIDE</div><h2>나만의 작은 세계를 위한 도감</h2><p>동물 ${animals.length}개와 식물·이끼 ${plants.length}개 항목을 분류·환경별로 탐색할 수 있어요. 동물 17종의 모프·패턴·지역형 92개는 해당 종 아래에 연결했으며 별도 종으로 세지 않았어요.</p><p>인기순은 국내 판매처의 취급 범위를 참고한 추정 순서이며 실제 판매량 순위는 아니에요. 확인된 인기 자료가 있는 항목을 먼저 정렬하고, 미집계 항목은 그 뒤에서 이름순으로 보여줘요. 미집계는 희귀하거나 인기가 없다는 뜻이 아니에요. 새 확장 후보의 국내 유통과 종별 조건은 계속 확인하고 있어요.</p><p>습식·건조·반수생 등 환경을 구별해 골라 주세요. 같은 환경 표시는 합사 가능을 뜻하지 않아요. 학명·유통명과 사진의 개체가 다를 수 있으며 사진 저작자와 라이선스는 각 항목의 ‘사진 정보’에서 확인할 수 있어요.</p><p>관심 목록은 현재 브라우저에 저장되며, 동물과 식물 도감 각각에서 볼 수 있어요.</p></div>`;$('#detailDialog').showModal();document.body.style.overflow='hidden';});
document.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('#detailDialog').open){event.preventDefault();setPage('animals');$('#search').focus();}});
Promise.all(['species.json','plants.json','morphs.json'].map(path=>fetch(path).then(response=>{if(!response.ok)throw new Error(path);return response.json();}))).then(([a,p,m])=>{
  animals=a;plants=p;morphs=m;species=animals;$('#animalTotal').textContent=animals.length;document.querySelectorAll('[data-plant-total]').forEach(e=>e.textContent=plants.length);$('#footerTotal').textContent=`동물 ${animals.length} · 식물·이끼 ${plants.length} 항목`;render();const hero=animals.find(r=>r.n===1);if(hero?.image)$('#heroPhoto').style.backgroundImage=`url("${safeUrl(hero.image)}")`;
}).catch(()=>{$('#resultCount').textContent='도감을 불러오지 못했어요. 새로고침해 주세요.';$('#loadMore').hidden=true;});


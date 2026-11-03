'use strict';
const CATALOG_VERSION = '2026-11-03-plants2';
const $ = (selector) => document.querySelector(selector);
const envNames = {습:'습식',혼:'건습 혼합',건:'건조',수:'반수생·수생',냉:'냉량 관리',대:'대형 사육장',환:'충분한 환기',굴:'깊은 바닥재',해:'담수·해수'};
const descriptions = {
  습:'살아 있는 식물과 가지, 은신처를 활용하는 습식 환경의 후보예요. 습도를 유지하되 바닥이 물에 잠기지 않도록 배수하고, 종에 맞는 환기와 건조 주기를 마련해 주세요.',
  혼:'건조한 활동 공간과 습한 은신처를 함께 마련하는 환경이 어울려요. 사육장 전체를 계속 축축하게 유지하는 방식과는 구분해서 계획해 주세요.',
  건:'건조형 테라리움에 맞춰 환경을 구성하는 생물이에요. 이끼와 열대식물 중심의 고습 사육장에 넣기보다, 건조한 바닥과 필요한 습한 은신처를 구분해 주세요.',
  수:'수역이나 수조를 포함해 계획해야 하는 생물이에요. 종과 성장 단계에 따라 육지 비율이 달라지므로, 물의 깊이·수질·편하게 오르내릴 출입부를 함께 확인해 주세요.'
};
let species = [], animals = [], plants = [], morphs = {}, state = {category:'all',environment:'all',search:'',sort:'popular',excludeSpecial:false,savedOnly:false,page:'animals',subgroup:'all',availability:'all'};
let favorites = new Set();
try { favorites = new Set(JSON.parse(localStorage.getItem('viva-favorites-v1') || '[]')); } catch {}
const animalCategories = [ ['all','전체 생물'],['gecko','게코'],['lizard','도마뱀'],['snake','뱀'],['frog','개구리'],['newt','뉴트·도롱뇽'],['turtle','거북'],['invert','무척추동물'] ];
const animalEnvironments = [['all','모든 환경'],['습','습식'],['혼','건습 혼합'],['건','건조'],['수','반수생·수생'],['냉','냉량 관리'],['환','환기 중점']];
function categoryOf(row) {
  if(row.id.startsWith('plant-')) return row.category;
  if(['절지동물','연체동물','무척추동물'].includes(row.major)) return 'invert';
  if(row.middle==='거북') return 'turtle';
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
function formatMeasure(value){return new Intl.NumberFormat('ko-KR',{maximumFractionDigits:2}).format(value);}
function sizeText(row){
  const s=row.sizeInfo;if(!s)return '크기 정보 확인 중';
  const toMM=s.unit==='cm'&&(s.max??s.min)<1,scale=toMM?10:1,unit=toMM?'mm':s.unit;
  const low=s.min==null?null:formatMeasure(s.min*scale),high=s.max==null?null:formatMeasure(s.max*scale);
  if(s.kind==='maximum')return `최대 약 ${high} ${unit}`;
  if(s.kind==='minimum')return `약 ${low} ${unit} 이상`;
  return `약 ${low===high?low:`${low}~${high}`} ${unit}`;
}
function priceText(offer){if(!offer)return '국내 가격 확인 중';const money=v=>new Intl.NumberFormat('ko-KR').format(v);return offer.min===offer.max?`${money(offer.min)}원`:`${money(offer.min)}~${money(offer.max)}원`;}
function factsPreview(row){
  const s=row.sizeInfo,p=row.priceInfo,offer=p?.offers?.[0];if(!s&&!offer)return '';
  return `<dl class="facts-preview">${s?`<div><dt>${escapeHTML(s.measurement)}</dt><dd>${escapeHTML(sizeText(row))}</dd></div>`:''}${offer?`<div><dt>국내 표시가</dt><dd>${escapeHTML(priceText(offer))}</dd></div><div class="facts-unit"><dt>판매 단위</dt><dd>${escapeHTML(offer.unit)}</dd></div>`:''}</dl>`;
}
function factsSection(row){
  const s=row.sizeInfo,p=row.priceInfo;
  return `<section class="entry-facts"><h3>크기와 참고 가격</h3><dl class="facts-detail"><div><dt>${s?escapeHTML(s.basis):row.id.startsWith('plant-')?'성숙':'성체'} 크기</dt><dd>${escapeHTML(sizeText(row))}${s?`<small>${escapeHTML(s.measurement)}</small>`:''}</dd></div></dl>${s?.note?`<p class="facts-note">${escapeHTML(s.note)}</p>`:''}${p?`<dl class="price-offers">${p.offers.map(offer=>`<div><dt>${escapeHTML(offer.unit)}</dt><dd>${escapeHTML(priceText(offer))}</dd></div>`).join('')}</dl><p class="facts-note">${escapeHTML(p.basis)} · ${escapeHTML(p.checkedAt.replaceAll('-','.'))} 확인</p><p class="facts-note">${escapeHTML(p.note)}</p>${purchaseSection(row)}`:'<p class="facts-pending">국내 가격 확인 중</p>'}</section>`;
}
function purchaseSection(row){
  const groups=new Map();
  for(const item of [...(row.purchaseLinks||[]),...(row.sellerOffers||[])]){if(!safeUrl(item.url))continue;if(!groups.has(item.shop))groups.set(item.shop,[]);groups.get(item.shop).push(item);}
  if(!groups.size)return '';
  const link=item=>`<a class="purchase-link" href="${escapeHTML(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer"><span class="purchase-title">${escapeHTML(item.title)}</span><span class="purchase-meta">${escapeHTML(item.unit)} · ${escapeHTML(priceText({min:item.price,max:item.price}))}${item.status==='soldOut'?' · <strong>품절 표시</strong>':''}${item.sourceType==='userMenu'?' · 제공 가격표·게시일 미상':''}</span><span class="purchase-action">${item.sourceType==='userMenu'?'문의하기':'상품 보기'} ↗</span></a>`;
  return `<div class="purchase-section"><h4>구매처 <span>${groups.size}곳</span></h4><p class="facts-note">판매처에서 현재 재고·옵션·최종 가격을 확인하세요.</p>${[...groups].map(([shop,items])=>{const label=items.some(item=>item.sourceType==='userMenu')?'판매 정보':'상품';items.sort((a,b)=>Number(a.status==='soldOut')-Number(b.status==='soldOut')||a.price-b.price);return `<section class="purchase-shop"><h5>${escapeHTML(shop)} <span>${items.length}개 ${label}</span></h5>${link(items[0])}${items.length>1?`<details class="purchase-more"><summary>다른 ${label} ${items.length-1}개</summary>${items.slice(1).map(link).join('')}</details>`:''}</section>`;}).join('')}</div>`;
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
    &&(state.availability==='all'||(state.availability==='domestic'?row.domesticStatus==='국내 취급 기록':state.availability==='new'?Boolean(row.addedAt):state.availability==='size'?Boolean(row.sizeInfo):state.availability==='priced'?Boolean(row.priceInfo):!row.popularityKnown))
    &&(state.environment==='all'||(row.id.startsWith('plant-')?row.environment===state.environment:row.env.split('·').includes(state.environment)))
    &&(!state.excludeSpecial||(!row.env?.includes('대')&&!row.env?.includes('냉')))
    &&(!state.savedOnly||favorites.has(row.id))
    &&(!search||normalized(`${row.name} ${row.latin} ${row.id.startsWith('plant-')?genusName(genusOf(row)):''} ${row.major||row.category} ${row.middle||''} ${(row.aliases||[]).join(' ')} ${(row.varieties||[]).join(' ')} ${(morphs[row.id]||[]).map(m=>[m.name,...m.aliases].join(' ')).join(' ')}`).includes(search)))
    .sort(compareEntries);
}
const genusNames = {
  Strobilanthes:'스트로빌란테스',Saxifraga:'바위취류',Selliguea:'셀리구에아',Solanum:'솔라넘',Crepidomanes:'괴불이끼류 (고사리)',Teratophyllum:'테라토필럼',Crypsinus:'고란초류',Lepisorus:'일엽초류',Loxogramme:'주걱일엽류',Hymenophyllum:'수염이끼류 (고사리)',Huperzia:'뱀톱류',Deparia:'진고사리·버들참빗류',Gastrochilus:'탐라난류',Oberonia:'차걸이란류',
  Homalomena:'호마로메나',Labisia:'라비시아',Bucephalandra:'부세파란드라',Sonerila:'소네릴라',Bertolonia:'베르톨로니아',Geogenanthus:'지오제난투스',Argostemma:'아르고스템마',Mikania:'미카니아',Scindapsus:'스킨답서스',Biophytum:'비오피툼',Ardisia:'자금우',Pellaea:'펠레아 (버튼고사리)',Microsorum:'미크로소룸',Bulbophyllum:'벌보필룸',Phalaenopsis:'호접란',Dendrobium:'석곡·덴드로비움',Drosera:'끈끈이주걱',Utricularia:'통발류',Rhodobryum:'꽃송이이끼',Pyrrhobryum:'편백이끼·너구리꼬리이끼',Thamnobryum:'대호꼬리이끼',Mnium:'초롱이끼',
  Adiantum:'아디안텀',Anoectochilus:'아노엑토칠루스',Anubias:'아누비아스',Asplenium:'아스플레니움',Atrichum:'주름솔이끼',Aulacomnium:'긴몸초롱이끼',Begonia:'베고니아',Bolbitis:'볼비티스',Callicladium:'풀이끼',Callisia:'칼리시아',Ceratodon:'지붕빨간이끼',Cissus:'시서스',Climacium:'나무이끼',Cryptanthus:'크립탄서스',Cryptocoryne:'크립토코리네',Davallia:'다발리아',Dicranum:'꼬리이끼',Dischidia:'디스키디아',Dossinia:'도시니아',Entodon:'윤이끼',Epipremnum:'에피프레넘',Episcia:'에피스키아',Ficus:'피커스',Fissidens:'봉황이끼',Fittonia:'피토니아',Goeppertia:'고에페르티아',Guzmania:'구즈마니아',Hemionitis:'헤미오니티스',Hoya:'호야',Hydrocotyle:'하이드로코틸레',Hypnum:'털깃털이끼',Leptochilus:'렙토킬루스',Leucobryum:'흰털이끼',Ludisia:'루디시아',Macodes:'마코데스',Maranta:'마란타',Marcgravia:'마크그라비아',Marchantia:'우산이끼',Monstera:'몬스테라',Neoregelia:'네오레겔리아',Nephrolepis:'네프로레피스',Peperomia:'페페로미아',Philodendron:'필로덴드론',Pilea:'피레아',Plagiomnium:'덩굴초롱이끼',Polytrichum:'솔이끼',Procris:'프로크리스',Pteris:'프테리스',Ptilium:'타조이끼',Pyrrosia:'피로시아',Rhytidiadelphus:'겉굵은이끼',Riccardia:'산호우산대이끼',Riccia:'리치아',Selaginella:'셀라기넬라',Soleirolia:'솔레이롤리아',Sphagnum:'물이끼·수태',Taxiphyllum:'자바모스류',Thuidium:'깃털이끼',Tillandsia:'틸란드시아',Vesicularia:'크리스마스모스류'
};
function genusOf(row){return row.latin.match(/^[A-Z][a-z]+\b/)?.[0]||row.id;}
function genusName(key){return genusNames[key]||key;}
function comparePriority(a,b){return (state.sort==='popular'?(Number(b.popularityKnown)-Number(a.popularityKnown)||((a.popularity??1e9)-(b.popularity??1e9))):state.sort==='recent'?((b.addedAt||'').localeCompare(a.addedAt||'')||(a.addedAt&&b.addedAt?b.n-a.n:0)):state.sort==='saved'?Number(favorites.has(b.id))-Number(favorites.has(a.id)):0);}
function compareEntries(a,b){return comparePriority(a,b)||a.name.localeCompare(b.name,'ko');}
function plantGroups(list){
  const groups=new Map();
  for(const row of list){const key=genusOf(row);if(!groups.has(key))groups.set(key,{key,name:genusName(key),rows:[]});groups.get(key).rows.push(row);}
  return [...groups.values()].map(g=>({...g,rows:g.rows.sort(compareEntries),total:plants.filter(r=>genusOf(r)===g.key).length})).sort((a,b)=>(state.sort==='name'?a.name.localeCompare(b.name,'ko'):comparePriority(a.rows[0],b.rows[0]))||a.name.localeCompare(b.name,'ko'));
}
function renderAnimalCards(list){
  return list.map(row=>`<article class="species-card"><div class="card-image"><button class="open-detail" data-detail="${row.id}" aria-label="${escapeHTML(row.name)} 자세히 보기">${photo(row)}</button><span class="ranking">${row.id.startsWith('plant-')?'BOTANICAL':'FIELD GUIDE'}</span><button class="favorite ${favorites.has(row.id)?'active':''}" data-favorite="${row.id}" aria-pressed="${favorites.has(row.id)}" aria-label="${favorites.has(row.id)?'관심 생물에서 삭제':'관심 생물에 저장'}">${favorites.has(row.id)?'♥':'♡'}</button></div><div class="card-info"><p class="card-meta">${escapeHTML(row.major||'식물')} / ${escapeHTML(animalCategories.find(c=>c[0]===categoryOf(row))[1])}</p><button class="species-title" data-detail="${row.id}">${escapeHTML(row.name)}</button><span class="latin">${escapeHTML(row.latin)}</span>${factsPreview(row)}<div class="card-env">${tags(row)}</div>${morphs[row.id]?.length?`<div class="morph-preview">${morphs[row.id].slice(0,3).map(m=>escapeHTML(m.name)).join(' · ')} <button data-detail="${row.id}">${morphs[row.id].length}개 모프·패턴 보기</button></div>`:''}${!row.popularityKnown?'<span class="catalog-status">확장 후보 · 인기 미집계</span>':''}${row.catalogType!=='종'?`<span class="catalog-status">${escapeHTML(row.catalogType)}</span>`:''}${row.placement?`<p class="plant-placement">${escapeHTML(row.placement)}</p>`:''}</div></article>`).join('');
}
function renderPlantGroups(groups){return groups.map(group=>{
  const representative=group.rows.find(r=>r.image)||group.rows[0];
  const categories=[...new Set(group.rows.map(r=>r.category))];
  const habitats=[...new Set(group.rows.map(r=>r.environment))];
  return `<article class="species-card genus-card"><div class="card-image"><button class="open-detail" data-genus="${escapeHTML(group.key)}" aria-label="${escapeHTML(group.name)} 속의 종 목록 보기">${photo(representative)}</button><span class="ranking">GENUS · 속</span><span class="genus-count">${group.rows.length}개 항목</span></div><div class="card-info"><p class="card-meta">식물 / ${categories.map(escapeHTML).join(' · ')}</p><button class="species-title" data-genus="${escapeHTML(group.key)}">${escapeHTML(group.name)}</button><span class="latin">${escapeHTML(group.key)}</span><p class="genus-description">${group.rows.slice(0,3).map(r=>escapeHTML(r.name)).join(' · ')}${group.rows.length>3?' 외':''}</p><div class="card-env">${habitats.map(h=>`<span class="env-tag">${escapeHTML(h)}</span>`).join('')}</div><button class="genus-cta" data-genus="${escapeHTML(group.key)}">종·품종 살펴보기 <span>↗</span></button><p class="genus-photo-note">사진: ${escapeHTML(representative.name)}</p></div></article>`;
}).join('');}
function render(){
  const isPlant=state.page==='plants';
  const categories=isPlant?[['all','전체 식물'],...[...new Set(plants.map(r=>r.category))].map(c=>[c,c])]:animalCategories;
  const environments=isPlant?[['all','모든 환경'],...[...new Set(plants.map(r=>r.environment))].map(c=>[c,c])]:animalEnvironments;
  const list=filtered(),plantList=isPlant?plantGroups(list):[];
  const subgroups=[...new Set(species.filter(r=>state.category==='all'||categoryOf(r)===state.category).map(r=>r.middle||r.category))].sort((a,b)=>a.localeCompare(b,'ko'));
  $('#subgroup').innerHTML='<option value="all">모든 세부 분류</option>'+subgroups.map(g=>`<option value="${escapeHTML(g)}">${escapeHTML(g)}</option>`).join('');$('#subgroup').value=state.subgroup;$('#availability').value=state.availability;
  $('#sort').innerHTML='<option value="popular">인기순</option><option value="name">이름순</option><option value="recent">최근 추가순</option><option value="saved">관심 생물 먼저</option>';$('#sort').value=state.sort;
  $('#categories').innerHTML=categories.map(([id,name])=>`<button class="category-tab ${state.category===id?'active':''}" data-category="${id}" aria-pressed="${state.category===id}">${name}<span>${id==='all'?species.length:species.filter(r=>categoryOf(r)===id).length}</span></button>`).join('');
  $('#environments').innerHTML=environments.map(([id,name])=>`<button class="env-chip ${state.environment===id?'active':''}" data-environment="${id}" aria-pressed="${state.environment===id}">${name}</button>`).join('');
  $('#grid').innerHTML=isPlant?renderPlantGroups(plantList):renderAnimalCards(list);
  $('#grid').querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{const button=img.closest('button');const row=button.dataset.genus?plantList.find(g=>g.key===button.dataset.genus)?.rows.find(r=>r.image):species.find(r=>r.id===button.dataset.detail);if(row)img.replaceWith(document.createRange().createContextualFragment(placeholder(row)));},{once:true}));
  $('#resultCount').textContent=`${state.savedOnly?'관심 목록 · ':''}${isPlant?`${plantList.length}개 속 · ${list.length}개 식물 항목`:`${list.length}개 동물 항목`}`;
  $('#empty').hidden=list.length!==0;
  $('#empty h3').textContent=state.savedOnly&&!favorites.size?'마음에 드는 생물을 담아보세요':'조건에 맞는 생물이 없어요';
  $('#empty p').textContent=state.savedOnly&&!favorites.size?'상세 화면의 하트를 누르면 이곳에서 다시 만날 수 있어요.':'검색어나 환경 조건을 조금 바꿔보세요.';
  $('#resetFilters').hidden=state.category==='all'&&state.environment==='all'&&!state.search&&!state.excludeSpecial&&!state.savedOnly&&state.subgroup==='all'&&state.availability==='all';
  $('#sortNote').hidden=!isPlant;$('#sortNote').textContent='속 → 종 → 품종·유통명 순으로 살펴보세요';$('#excludeSpecial').closest('label').hidden=isPlant;
  $('#collectionTitle').textContent=state.savedOnly?'마음에 담아둔 생물들':(isPlant?'어떤 식물 속을 만나볼까요?':'어떤 생물과 함께할까요?');
  updateSaved();
}
function openPlantGroup(key){
  const group=plantGroups(filtered()).find(g=>g.key===key)||plantGroups(plants).find(g=>g.key===key);if(!group)return;
  $('#detailContent').innerHTML=`<div class="genus-detail"><div class="eyebrow">BOTANICAL GENERA · 속으로 둘러보기</div><h2>${escapeHTML(group.name)}</h2><p class="latin">${escapeHTML(key)}</p><p class="genus-intro">${group.rows.length===group.total?`${group.total}개 항목`:`현재 조건에 맞는 ${group.rows.length}개 / 전체 ${group.total}개 항목`} · 종을 선택하면 사진과 관리 정보, 품종·유통명을 볼 수 있어요.</p><div class="genus-species-grid">${group.rows.map(row=>`<article class="genus-species"><button class="genus-species-open" data-detail="${row.id}" data-parent-genus="${escapeHTML(key)}">${photo(row)}<strong>${escapeHTML(row.name)}</strong><span class="latin">${escapeHTML(row.latin)}</span></button>${factsPreview(row)}<div class="card-env">${tags(row)}</div><div class="genus-species-bottom"><span>${escapeHTML(row.catalogType)}${row.varieties?.length?` · 품종·유통명 ${row.varieties.length}개`:''}</span><button class="favorite-inline" data-favorite="${row.id}" aria-label="${escapeHTML(row.name)} ${favorites.has(row.id)?'관심 목록에서 삭제':'관심 목록에 저장'}" aria-pressed="${favorites.has(row.id)}">${favorites.has(row.id)?'♥':'♡'}</button></div></article>`).join('')}</div></div>`;
  $('#detailContent').querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{const row=plants.find(r=>r.id===img.closest('[data-detail]').dataset.detail);img.replaceWith(document.createRange().createContextualFragment(placeholder(row)));},{once:true}));
  if(!$('#detailDialog').open)$('#detailDialog').showModal();$('#detailDialog').scrollTop=0;document.body.style.overflow='hidden';
}
function reset(){state={...state,category:'all',environment:'all',search:'',excludeSpecial:false,savedOnly:false,subgroup:'all',availability:'all'};$('#search').value='';$('#excludeSpecial').checked=false;render();}
function photoCredit(row){
  if(!row.image)return '';
  const c=row.credit||{}, file=row.imageFile;
  const url=safeUrl(c.url)||(file?'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file):'');
  return `<details class="photo-credit"><summary>사진 정보</summary><div>${escapeHTML(c.author||'Wikimedia Commons')} ${c.license?'· '+escapeHTML(c.license):''} ${url?`<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">원본·라이선스 ↗</a>`:''}</div></details>`;
}
function openDetail(id,parentGenus=null){
  const row=[...animals,...plants].find(r=>r.id===id);if(!row)return;
  if(row.id.startsWith('plant-')){openPlantDetail(row,parentGenus);return;}
  const extras=[];
  if(row.env.includes('냉'))extras.push('여름철 냉각을 포함해 냉량 환경을 유지할 수 있는지 먼저 확인해 주세요.');
  if(row.env.includes('대'))extras.push('성체의 몸집과 활동량에 맞는 큰 사육 공간을 먼저 확보해 주세요.');
  if(row.env.includes('환'))extras.push('공기가 정체되지 않도록 충분한 통풍을 계획해 주세요.');
  if(row.env.includes('굴'))extras.push('굴을 파고 몸을 숨길 수 있는 깊은 바닥재가 중요해요.');
  if(row.env.includes('해'))extras.push('담수와 해수를 따로 제공하고, 물에서 스스로 나올 수 있는 구조를 마련해 주세요.');
  $('#detailContent').innerHTML=`<div class="detail-layout"><div class="detail-image-wrap">${photo(row,'detail-image')}</div><div class="detail-info"><div class="eyebrow">FIELD GUIDE · ANIMALS</div><h2>${escapeHTML(row.name)}</h2><span class="latin">${escapeHTML(row.latin)}</span><div class="taxonomy"><span>${escapeHTML(row.major||'식물')}</span><span>${escapeHTML(row.middle)}</span><span>${escapeHTML(row.name)}</span></div>${statusSection(row)}${factsSection(row)}${morphSection(row)}<h3>함께할 환경</h3><div class="card-env">${tags(row)}</div><p>${escapeHTML(row.careNote||descriptions[row.env[0]]||descriptions['습'])}</p>${extras.length?`<p>${extras.join(' ')}</p>`:''}<button class="outline-button detail-save ${favorites.has(row.id)?'active':''}" data-favorite="${row.id}" aria-pressed="${favorites.has(row.id)}">${favorites.has(row.id)?'♥ 관심 생물에 저장됨':'♡ 관심 생물로 저장'}</button><p class="note-small">환경 표시는 후보를 고르는 참고 정보예요. 같은 환경 표시는 합사 가능을 뜻하지 않아요. 입양 전 정확한 종명과 종별 사육 조건을 확인해 주세요.</p>${photoCredit(row)}</div></div>`;
  const img=$('#detailContent img');if(img)img.addEventListener('error',()=>img.replaceWith(document.createRange().createContextualFragment(placeholder(row))),{once:true});
  if(!$('#detailDialog').open)$('#detailDialog').showModal();$('#detailDialog').scrollTop=0;document.body.style.overflow='hidden';
}
function statusSection(row){return `<div class="entry-status"><span>${escapeHTML(row.domesticStatus)}</span><span>${escapeHTML(row.verification)}</span>${row.catalogType!=='종'?`<span>${escapeHTML(row.catalogType)}</span>`:''}</div>`;}
function morphSection(row){
  const items=morphs[row.id]||[];if(!items.length)return '';
  return `<section class="morph-section"><h3>모프·패턴·지역형 <span>${items.length}</span></h3><p class="note-small">같은 종 안에서 구별하는 이름이에요. 화면의 사진은 종의 참고 사진이며 특정 모프를 대표하지 않아요.</p><div class="morph-list">${items.map(m=>`<details><summary>${escapeHTML(m.name)} <span>${escapeHTML(m.type)}</span></summary><p>${escapeHTML(m.description)}</p></details>`).join('')}</div></section>`;
}
function openPlantDetail(row,parentGenus=null){
  $('#detailContent').innerHTML=`<div class="detail-layout"><div class="detail-image-wrap">${photo(row,'detail-image')}</div><div class="detail-info"><button class="genus-back" data-genus="${escapeHTML(parentGenus||genusOf(row))}">← ${escapeHTML(genusName(parentGenus||genusOf(row)))} 속의 종 목록</button><div class="eyebrow">BOTANICAL FIELD GUIDE</div><h2>${escapeHTML(row.name)}</h2><span class="latin">${escapeHTML(row.latin)}</span><div class="taxonomy"><span>식물</span><span>${escapeHTML(row.category)}</span><span>${escapeHTML(genusName(genusOf(row)))}</span><span>${escapeHTML(row.name)}</span></div>${statusSection(row)}${factsSection(row)}${row.varieties?.length?`<h3>품종·유통명</h3><div class="card-env">${row.varieties.map(v=>`<span class="env-tag">${escapeHTML(v)}</span>`).join('')}</div><p class="note-small">종의 참고 사진이에요. 특정 품종의 모습을 뜻하지 않아요.</p>`:''}<h3>자랄 자리</h3><div class="card-env">${tags(row)}</div><p><strong>배치</strong> · ${escapeHTML(row.placement)}</p><p>${escapeHTML(row.care)}</p><button class="outline-button detail-save" data-favorite="${row.id}" aria-pressed="${favorites.has(row.id)}">${favorites.has(row.id)?'♥ 관심 생물에 저장됨':'♡ 관심 생물로 저장'}</button><p class="note-small">식물별 빛과 통풍 조건을 함께 확인해 주세요. 식재 후보 목록은 모든 동물에게 섭취해도 안전하다는 뜻이 아니에요. 수변 식물은 설명에 맞게 뿌리와 잎의 위치를 구분해 주세요.</p>${photoCredit(row)}</div></div>`;
  const img=$('#detailContent img');if(img)img.addEventListener('error',()=>img.replaceWith(document.createRange().createContextualFragment(placeholder(row))),{once:true});
  if(!$('#detailDialog').open)$('#detailDialog').showModal();$('#detailDialog').scrollTop=0;document.body.style.overflow='hidden';
}
function openShopRelated(shop){
  if(!shop)return;
  $('#detailContent').innerHTML=VivaShops.relatedHTML(shop,[...animals,...plants]);
  if(!$('#detailDialog').open)$('#detailDialog').showModal();$('#detailDialog').scrollTop=0;document.body.style.overflow='hidden';
}
function openShopMenu(shop){
  if(!shop)return;$('#detailContent').innerHTML=VivaShops.assortmentHTML(shop);
  if(!$('#detailDialog').open)$('#detailDialog').showModal();$('#detailDialog').scrollTop=0;document.body.style.overflow='hidden';
}
function setPage(page){
  $('#animalPage').hidden=page==='shops';$('#shopsPage').hidden=page!=='shops';
  if(page==='shops'){
    state.page=page;document.body.classList.remove('plants-view');document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
    shopDirectory?.show();window.scrollTo({top:0,behavior:'smooth'});return;
  }
  state.page=page;species=page==='plants'?plants:animals;state.sort='popular';
  document.body.classList.toggle('plants-view',page==='plants');
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  $('#search').placeholder=page==='plants'?'식물 이름·학명으로 찾아보세요':'생물·모프 이름·학명으로 찾아보세요';
  $('#search').setAttribute('aria-label',page==='plants'?'식물 이름 또는 학명 검색':'생물 모프 이름 또는 학명 검색');
  reset();window.scrollTo({top:0,behavior:'smooth'});
}
document.addEventListener('click',event=>{
  const menuBack=event.target.closest('[data-shop-back-menu]');if(menuBack){openShopMenu(shopDirectory?.getShop(menuBack.dataset.shopBackMenu));return;}
  const shopBack=event.target.closest('[data-shop-back]');if(shopBack){openShopRelated(shopDirectory?.getShop(shopBack.dataset.shopBack));return;}
  const shopEntry=event.target.closest('[data-shop-entry]');if(shopEntry){
    if(![...animals,...plants].some(row=>row.id===shopEntry.dataset.shopEntry)){showToast('도감을 아직 불러오지 못했어요. 잠시 후 다시 시도하거나 새로고침해 주세요.');return;}
    openDetail(shopEntry.dataset.shopEntry);const info=$('#detailContent .detail-info');
    if(info){const isMenu=shopEntry.dataset.shopReturn==='menu';info.querySelector('.genus-back')?.remove();info.insertAdjacentHTML('afterbegin',`<button class="genus-back" ${isMenu?'data-shop-back-menu':'data-shop-back'}="${escapeHTML(shopEntry.dataset.shopOrigin)}">← ${isMenu?'판매 품목·가격표':'구매처의 도감 목록'}</button>`);}
    return;
  }
  const favorite=event.target.closest('[data-favorite]');if(favorite){saveFavorite(favorite.dataset.favorite);return;}
  const genus=event.target.closest('[data-genus]');if(genus){openPlantGroup(genus.dataset.genus);return;}
  const detail=event.target.closest('[data-detail]');if(detail){openDetail(detail.dataset.detail,detail.dataset.parentGenus);return;}
  const category=event.target.closest('[data-category]');if(category){state.category=category.dataset.category;state.subgroup='all';render();return;}
  const environment=event.target.closest('[data-environment]');if(environment){state.environment=environment.dataset.environment;render();return;}
  const page=event.target.closest('[data-page]');if(page){setPage(page.dataset.page);}
});
$('#search').addEventListener('input',event=>{state.search=event.target.value;render();});
$('#sort').addEventListener('change',event=>{state.sort=event.target.value;render();});
$('#excludeSpecial').addEventListener('change',event=>{state.excludeSpecial=event.target.checked;render();});
for(const key of ['subgroup','availability'])$('#'+key).addEventListener('change',event=>{state[key]=event.target.value;render();});
$('#resetFilters').addEventListener('click',reset);$('#emptyReset').addEventListener('click',reset);
$('#savedButton').addEventListener('click',()=>{if(state.page==='shops')setPage('animals');state.savedOnly=!state.savedOnly;render();$('#collection').scrollIntoView({behavior:'smooth'});});
$('#heroDetail').addEventListener('click',()=>openDetail('species-1'));
$('#closeDialog').addEventListener('click',()=>$('#detailDialog').close());
$('#detailDialog').addEventListener('close',()=>document.body.style.overflow='');
$('#detailDialog').addEventListener('click',event=>{if(event.target===$('#detailDialog')){const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.target.close();}});
$('#aboutButton').addEventListener('click',()=>{$('#detailContent').innerHTML=`<div class="about"><div class="eyebrow">ABOUT THE FIELD GUIDE</div><h2>나만의 작은 세계를 위한 도감</h2><p>동물 ${animals.length}개와 식물·이끼 ${plants.length}개 항목을 분류·환경별로 탐색할 수 있어요. 동물 ${Object.keys(morphs).length}개 항목의 모프·패턴·지역형 ${Object.values(morphs).flat().length}개는 해당 종 아래에 연결했으며 별도 종으로 세지 않았어요.</p><p>인기순은 국내 판매처의 취급 범위를 참고한 추정 순서이며 실제 판매량 순위는 아니에요. 확인된 인기 자료가 있는 항목을 먼저 정렬하고, 미집계 항목은 그 뒤에서 이름순으로 보여줘요. 미집계는 희귀하거나 인기가 없다는 뜻이 아니에요. 새 확장 후보의 국내 유통과 종별 조건은 계속 확인하고 있어요.</p><p>습식·건조·반수생 등 환경을 구별해 골라 주세요. 열대 습식뿐 아니라 건조형·냉량형·수역 전용 후보도 포함하므로 환경과 성체 크기를 먼저 확인해 주세요. 같은 환경 표시는 합사 가능을 뜻하지 않아요. 학명·유통명과 사진의 개체가 다를 수 있으며 사진 저작자와 라이선스는 각 항목의 ‘사진 정보’에서 확인할 수 있어요.</p><p>관심 목록은 현재 브라우저에 저장되며, 동물과 식물 도감 각각에서 볼 수 있어요. 식물은 속 카드에서 종 목록을 열고, 종 상세에서 품종·유통명을 살펴볼 수 있어요. 환경 필터와 검색은 해당 조건에 맞는 종만 속 안에 보여줘요.</p></div>`;if(!$('#detailDialog').open)$('#detailDialog').showModal();$('#detailDialog').scrollTop=0;document.body.style.overflow='hidden';});
document.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('#detailDialog').open){event.preventDefault();if(state.page==='shops')$('#shopSearch').focus();else {setPage('animals');$('#search').focus();}}});
const shopDirectory=VivaShops.mount($('#shopsPage'),{version:CATALOG_VERSION,onRelated:openShopRelated,onMenu:openShopMenu});
Promise.all(['species.json','plants.json','morphs.json'].map(path=>fetch(`${path}?v=${CATALOG_VERSION}`).then(response=>{if(!response.ok)throw new Error(path);return response.json();}))).then(([a,p,m])=>{
  animals=a;plants=p;morphs=m;species=state.page==='plants'?plants:animals;shopDirectory?.setCatalog([...animals,...plants]);$('#animalTotal').textContent=animals.length;document.querySelectorAll('[data-plant-total]').forEach(e=>e.textContent=plants.length);$('#footerTotal').textContent=`동물 ${animals.length} · 식물·이끼 ${plants.length} 항목`;if(state.page!=='shops')render();const hero=animals.find(r=>r.n===1);if(hero?.image)$('#heroPhoto').style.backgroundImage=`url("${safeUrl(hero.image)}")`;
}).catch(()=>{$('#resultCount').textContent='도감을 불러오지 못했어요. 새로고침해 주세요.';});


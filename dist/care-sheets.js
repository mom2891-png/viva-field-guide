(function(root){
  'use strict';
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const list=value=>Array.isArray(value)?value:[];
  function safeLink(value){try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return '';}}
  function resolve(bank,id){const entry=bank?.entries?.[id];return {entry,profile:bank?.profiles?.[entry?.profileId]};}
  function placementText(bank,id){const p=resolve(bank,id).profile?.placement;return p?[...list(p.zones),...list(p.surfaces)].join(' · '):'';}
  function render(bank,row,selection=''){
    const {entry,profile}=resolve(bank,row.id);
    if(!profile)return `<section class="care-sheet"><h3>케어시트</h3><p>-</p>${row.light||row.humidity||row.placement?`<dl class="care-key-info">${[['빛',row.light],['습도',row.humidity],['배치',row.placement]].filter(([,v])=>v).map(([k,v])=>`<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`:''}${row.care?`<details class="care-details"><summary>기존 설명</summary><p>${esc(row.care)}</p><p>${esc(entry?.reason||'종별 케어 근거 미확보')}</p></details>`:''}${bank?.loadState==='error'?'<p class="care-alert">자료를 불러오지 못했습니다.</p>':''}</section>`;
    const statuses={'species-reviewed':'종·품종별 핵심 자료 검토','group-reference':'그룹 공통 참고','identity-limited':'유통형·적용 범위 제한','source-limited':'자료 제한 · 추가 교차검증 필요'};
    const placement=profile.placement;
    const inherited=/^(?:morph|variety):/.test(selection);
    const references=list(profile.sourceIds).map(id=>bank.sources?.[id]).filter(Boolean).map(s=>{
      const href=safeLink(s.url);const title=[s.author,s.title].filter(Boolean).join(' · ');
      return `<li>${href?`<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(title)}</a>`:esc(title)}${s.publishedAt?`<span>원문 발행 ${esc(s.publishedAt)}</span>`:''}${s.updatedAt?`<span>원문 갱신 ${esc(s.updatedAt)}</span>`:''}<span>확인 ${esc(s.checkedAt)}</span></li>`;
    }).join('');
    const seen=new Set();
    const mainSections=list(profile.sections).filter(s=>s.text&&s.title&&s.key!=='scope'&&!seen.has(s.text)&&seen.add(s.text));
    const compact=row.id==='plant-189'?[{title:'식재 제안',text:'수중 전경에 작은 군락으로 식재.'},{title:'빛',text:'수중 재배 기준 중간.'},{title:'주의',text:'육상 재배 조건은 미검증. 건조한 육상 바닥·일반 관엽용 일괄 시비는 피함.'}]:mainSections;
    const limits={'group-reference':'그룹 공통 참고','identity-limited':'종·유통형 적용 제한','source-limited':'자료 교차검증 필요'};
    return `<section class="care-sheet"><h3>케어시트</h3>${limits[entry.status]?`<p class="care-limit">${esc(limits[entry.status])}</p>`:''}${inherited?'<p class="care-limit">부모 종의 공통 관리</p>':''}${compact.length?`<dl class="care-key-info">${compact.map(s=>`<dt>${esc(s.title)}</dt><dd>${esc(s.text)}</dd>`).join('')}</dl>`:`<p>${esc(profile.summary||'-')}</p>`}${placement&&row.id!=='plant-189'?`<dl class="care-key-info care-placement"><dt>식재${placement.basis==='editorial'?' 제안':''}</dt><dd>${esc(placementText(bank,row.id))}</dd><dt>방법</dt><dd>${esc(placement.method)}</dd>${row.id!=='plant-189'?`<dt>주의</dt><dd>${esc(placement.avoid)}</dd>`:''}</dl>`:''}<details class="care-details"><summary>출처·적용 범위</summary><p>${esc(statuses[entry.status]||'자료 제한')} · ${esc(profile.title)}</p>${profile.scopeNote?`<p>${esc(profile.scopeNote)}</p>`:''}<p>${esc(profile.summary)}</p>${list(profile.sections).map(s=>`<p><strong>${esc(s.title)}</strong> · ${esc(s.text)}</p>`).join('')}${placement?`<p>${placement.basis==='editorial'?'재배 조건을 바탕으로 한 식재 제안':'원문 배치 안내'} · ${esc(placement.reason)}</p>`:''}${list(entry.missingFields).length?`<p>미확인 항목 · ${list(entry.missingFields).map(esc).join(' · ')}</p>`:''}<ul class="care-sources">${references}</ul></details></section>`;
  }
  root.VivaCareSheets={render,placementText};
})(globalThis);

(function(root){
  'use strict';
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const list=value=>Array.isArray(value)?value:[];
  function safeLink(value){try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return '';}}
  function resolve(bank,id){const entry=bank?.entries?.[id];return {entry,profile:bank?.profiles?.[entry?.profileId]};}
  function placementText(bank,id){const p=resolve(bank,id).profile?.placement;return p?[...list(p.zones),...list(p.surfaces)].join(' · '):'';}
  function render(bank,row,selection=''){
    const {entry,profile}=resolve(bank,row.id);
    if(!profile)return `<section class="care-sheet"><h3>케어시트</h3><p class="note-small">${bank?.loadState==='error'?'케어시트를 불러오지 못했어요. 새로고침 후 다시 확인해 주세요.':`전문 자료 조사 대기 · ${esc(entry?.reason||'종별 사육·재배 근거 확인 중')}`} 아래 기존 도감 설명은 종별 케어시트 검토 완료를 뜻하지 않아요.</p></section>`;
    const statuses={'species-reviewed':'종·품종별 핵심 자료 검토','group-reference':'그룹 공통 참고','identity-limited':'유통형·적용 범위 제한','source-limited':'자료 제한 · 추가 교차검증 필요'};
    const placement=profile.placement;
    const inherited=/^(?:morph|variety):/.test(selection);
    const references=list(profile.sourceIds).map(id=>bank.sources?.[id]).filter(Boolean).map(s=>{
      const href=safeLink(s.url);const title=[s.author,s.title].filter(Boolean).join(' · ');
      return `<li>${href?`<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(title)}</a>`:esc(title)}${s.publishedAt?`<span>원문 발행 ${esc(s.publishedAt)}</span>`:''}${s.updatedAt?`<span>원문 갱신 ${esc(s.updatedAt)}</span>`:''}<span>확인 ${esc(s.checkedAt)}</span></li>`;
    }).join('');
    return `<section class="care-sheet"><h3>케어시트</h3><p class="care-status">${esc(statuses[entry.status]||'자료 정리 중')} · ${esc(profile.title)}</p><p class="note-small care-source-lead">자료 · ${[...new Set(list(profile.sourceIds).map(id=>bank.sources?.[id]?.author).filter(Boolean))].map(esc).join(" · ")}</p>${inherited?'<p class="note-small">부모 항목의 케어시트입니다. 선택한 모프·품종의 별도 관리 차이는 확인된 경우에만 추가합니다.</p>':''}<p>${esc(profile.summary)}</p>${profile.scopeNote?`<p class="note-small">${esc(profile.scopeNote)}</p>`:''}${placement?`<div class="care-placement"><h4>비바리움 식재 위치</h4><p><strong>${esc(placementText(bank,row.id))}</strong></p><dl><dt>심는 방법</dt><dd>${esc(placement.method)}</dd><dt>피할 조건</dt><dd>${esc(placement.avoid)}</dd><dt>위치 선정 이유</dt><dd>${esc(placement.reason)}</dd></dl><p class="note-small">${placement.basis==='editorial'?'재배 조건을 바탕으로 한 식재 제안':'원문에 제시된 배치 안내'} · 실제 조명·수분·환기에 맞춰 조절하세요.</p></div>`:''}<details class="care-details"><summary>상세 관리 · 출처 보기</summary>${list(profile.sections).map(s=>`<h4>${esc(s.title)}</h4><p>${esc(s.text)}</p>`).join('')}${list(entry.missingFields).length?`<p class="care-missing">추가 확인: ${list(entry.missingFields).map(esc).join(' · ')}</p>`:''}<h4>전문 자료 출처</h4><p class="note-small">원문을 한국어로 요약했습니다. 종별 적용 범위와 작성자의 재배·사육 조건을 함께 확인하세요.</p><ul class="care-sources">${references}</ul></details></section>`;
  }
  root.VivaCareSheets={render,placementText};
})(globalThis);

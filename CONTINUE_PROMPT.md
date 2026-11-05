# Claude에 전달할 재개 프롬프트

```text
GitHub에서 비바리움 도감을 직접 받아 이어서 작업해줘.
저장소: https://github.com/mom2891-png/viva-field-guide.git
브랜치: codex/purchase-review-price-expansion
현재 UI 기준:65cd555. 최종 인계 SHA가 함께 제공되면 그 커밋을 우선 확인해.

Git·Node.js22+를 확인해. 공개 clone은 로그인 불필요야.
처음 받는 PC라면 빈 작업 위치에서:
git clone --branch codex/purchase-review-price-expansion https://github.com/mom2891-png/viva-field-guide.git viva-field-guide
cd viva-field-guide

기존 폴더가 있으면 status·remote·branch부터 확인하고 변경을 보존해.
같은 저장소·같은 브랜치이고 깨끗할 때 fetch 후 ff-only로 갱신해.
reset·clean·자동 stash·덮어쓰기·강제 전환하지 마.
전달받은 인계 SHA는 git merge-base --is-ancestor 인계SHA HEAD로 포함 여부를 확인해.
gh가 있으면 gh auth status, 추후 쓰기 인증이 필요할 때만 정상 로그인하고 토큰은 요구하지 마.

CLAUDE.md, AGENTS.md, docs/agent-work-rules.md, docs/mister-han-style.md,
CONTINUE_ON_NEW_PC.md, HANDOFF.md 최신 부분, README.md를 읽어.

가장 먼저 승인된 카드 가상화 작업을 진행해.
파충류 클릭 렉은 여전히 남아 있어. 현재200항목/115카드를 한꺼번에 만들고,
카드 등장 애니메이션도 남아 있어. 사진 지연 로딩과 카드 가상화는 달라.
카드 자체를 보이는 구간 중심으로 생성하고 화면 밖 DOM을 제한하며 애니메이션을 제거해.
이 작업은 승인됐지만 아직 착수 전이야.

목록 전체 스크롤·검색·정렬·관심·모프/품종·반응형·URL/뒤로가기·복귀 위치를 보존해.
더보기 버튼·항목 수 제한으로 해결하지 마. 사진은 실제 가시 영역만 요청하는 현재 로더를 유지해.
실제 브라우저에서 원인을 측정해. Node VM 순수 계산18.5ms는 브라우저 성능 측정이 아니야.

미스터 한 기준: 큰 사진, 짧고 밀도 높은 정보, 중복/장식 제거, 미확인 값 - .
출처·사진 권리·종/클론 미확정·수중/육상 등 중요한 제한은 보존해.
현재660항목·케어301연결/미연결359이며 완성 케어시트301개라는 뜻은 아니야.
기존 데이터·사진·가격·크기·이름·인기·ID와 구매 링크5회 해제 규칙을 지켜.

npm start 또는 node scripts/serve.mjs → http://127.0.0.1:4173/
이전 PC 서버·경로·캐시를 가정하지 마. 브라우저가 비활성이면 우회하거나 확인한 척하지 마.
국소 검사 후 큰 묶음 끝에 npm run check와 git diff --check를 해.
하위 에이전트 기본 미사용, 관련 자료만 재사용하고 작은 단계마다 계속할지 묻지 마.
이후 GitHub 업로드·main 반영·공개 배포는 내 지시를 받아.
```

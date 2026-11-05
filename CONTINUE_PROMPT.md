# 다른 컴퓨터에서 받을 통합 시작 프롬프트

```text
GitHub에서 비바리움 도감을 직접 받아 케어시트 작업을 이어가줘.
저장소: https://github.com/mom2891-png/viva-field-guide.git
브랜치: codex/purchase-review-price-expansion

Git·Node.js22 이상을 확인해. gh가 있으면 gh auth status로 인증 상태를 확인해.
공개 저장소 clone에는 로그인 불필요. 추후 쓰기 인증이 필요하면 gh auth login을 사용하고 토큰은 채팅으로 요구하지 마.
도구가 없으면 운영체제에 맞는 설치 방법을 확인해 준비하고, 사용자 조작이 필요한 단계만 요청해.

처음 받는 컴퓨터라면 빈 작업 위치에서 실제 실행해:
git clone --branch codex/purchase-review-price-expansion https://github.com/mom2891-png/viva-field-guide.git viva-field-guide
cd viva-field-guide

이미 저장소가 있으면 해당 폴더에서 git status --short --branch, git remote -v, git branch --show-current를 먼저 확인해.
같은 저장소·같은 브랜치이고 깨끗할 때만:
git pull --ff-only https://github.com/mom2891-png/viva-field-guide.git codex/purchase-review-price-expansion
변경이 있거나 브랜치가 다르면 기존 작업을 보존해. reset·clean·자동 stash·강제 전환·덮어쓰기 금지.
사용자가 제공한 최신 인계 SHA가 있으면 git merge-base --is-ancestor 인계SHA HEAD로 포함 여부를 확인해.

저장소 루트에서 AGENTS.md → docs/agent-work-rules.md → README.md → CONTINUE_ON_NEW_PC.md 상단 → HANDOFF.md 최신 부분을 읽어.
Claude는 CLAUDE.md도 읽어. 이어서 docs/care-sheet-plan.md, docs/care-sheet-progress.md와 필요한 docs/care-source-audit.json 항목을 확인해.
npm run check를 1회 실행하고 npm start로 로컬 화면을 확인해. 실행 중인 이전 PC 서버·절대경로·원문 캐시가 있다고 가정하지 마.

현재 도감은 동물362·식물298=660항목. 사진은 대표660·모프100·식물 하위형28=788자리 연결.
케어 자료 연결은278/660(동물156·식물122), 식재 위치122. 미연결382.
종·품종별 핵심 검토156/공통참고80/유통형·범위제한11/단일재배자 교차검증31이며 완성 케어시트278개라는 뜻은 아니야.
케어 정보는 dist/care-sheets.json, 화면은 care-sheets.js와 app.js에 연결돼 있어.

승인된 다음 작업: 미연결382의 전문 사육자·브리더·재배자 케어시트를 우선 찾아 출처와 함께 한국어로 정리하고, 기존278의 미입력 필드도 보강해.
식물은 전경/중경/후경/배경벽 등의 위치와 토양/유목/바위/물가/수중의 표면, 고정 방법·피할 조건·이유를 구분해.
원문 직접 안내와 재배 조건에서 도출한 편집 제안을 구분하고, 모프·품종은 부모 관리와 확인된 차이만 연결해.
게코·개구리와 정글식물·지피·덩굴·브로멜리아·이끼 우선. 달팽이·육지소라게 심화는 마지막.
기존 ID·사진·가격·크기·이름·인기는 보존. 원문 없는 수치·추정 학명·인기·단위를 만들지 마.
원문 화씨/섭씨 충돌, 다른 종 관리 문단 복사, Taiwan/Mini Taiwan 혼용, 이끼 재배업체의 의심되는 침수/배지 안내 보류를 유지해.
원문 전체 번역·복제 대신 핵심 한국어 요약과 저자·기관·원문 링크·확인일을 남겨.
일반 사진141장의 재게시 권리 미확인 표시와 정확한 종/클론 미확인·복합모프 표시를 보존해.
구매 링크와 구매처는 입력칸 밖에서 숫자5 독립 연속5회로만 해제. 사진 원본 비율 유지, 잘림·팝업·로고 사진 추가 금지.

새 작업 범위는 승인받고 이미 승인된 케어 작업은 작은 묶음마다 재확인하며 멈추지 마.
하위 에이전트 기본 미사용. 기존 조사 장부를 재사용하고, 추가마다 전체 검사하지 말고 국소 검사 후 큰 묶음 끝 전체 검사1회.
이전 묶음의 공개 배포 승인을 앞으로의 추가 업로드·main 반영·배포 승인으로 확대하지 마.
브라우저 검수는 사용 가능한 도구로 실제 확인하고, 비활성이면 우회하거나 검수 완료로 주장하지 마.
파일·터미널 권한이 없으면 내려받았다고 하지 말고 필요한 실행 환경을 알려줘.
```

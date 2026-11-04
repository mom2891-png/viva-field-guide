# 다른 컴퓨터에서 이어가기

인계 작성: 2026-11-04 (Asia/Seoul).
저장소: https://github.com/mom2891-png/viva-field-guide.git (공개)
업로드 브랜치: `codex/purchase-review-price-expansion`
`main`과 공개 사이트는 이번 인계에서 변경하지 않는다. 이 문서가 포함된 브랜치를 받아야 최신 작업이 있다.

## 받기와 확인

Git·Node.js22 이상이 필요하다. 공개 읽기는 로그인 없이 HTTPS clone 가능하다. GitHub CLI를 사용하면 `gh auth status`를 확인하고 필요한 경우 `gh auth login`한다. 토큰을 채팅이나 파일로 공유하지 않는다.

처음 받기:
```sh
git clone --branch codex/purchase-review-price-expansion https://github.com/mom2891-png/viva-field-guide.git viva-field-guide
cd viva-field-guide
```
GitHub CLI 대안:
```sh
gh repo clone mom2891-png/viva-field-guide -- --branch codex/purchase-review-price-expansion
cd viva-field-guide
```
기존 폴더는 `git status --short --branch`, `git remote -v`를 먼저 확인한다. 같은 저장소·같은 브랜치이고 깨끗할 때만:
```sh
git pull --ff-only https://github.com/mom2891-png/viva-field-guide.git codex/purchase-review-price-expansion
```
변경이 있거나 브랜치가 다르면 기존 작업을 보존한다. 강제 reset·clean·무조건 stash·덮어쓰기를 하지 않는다. 받은 HEAD가 최종 답변의 인계 SHA를 포함하는지 `git merge-base --is-ancestor 인계SHA HEAD`로 확인한다.

## 현재 상태와 읽을 문서

동물360·식물196=556항목. 목차830노드, 소/중/대·미확인 필터, 분류/전역 검색·URL/이전 목록 상태 복원을 구현했다. 잎 길이만 있는 식물은 전체 크기 분류에서 미확인으로 처리한다. 종·품종·유통명·동정 한계와 측정 부위는 보존한다. 사진427·크기182·가격214항목 입력은 정보 검증 완료 수가 아니다.

README.md → AGENTS.md → HANDOFF.md를 읽는다. 계획은 `docs/superpowers/plans/2026-11-03-field-guide-completion.md`, 조사 상태는 `docs/catalog-coverage.md`, 필드 기준은 `docs/catalog-field-standards.md`다. 과거 날짜의 수치는 당시 기록이며 실제 JSON과 `node scripts/catalog-status.mjs`를 우선한다.

전체 자동 검사는556항목 기준 통과했다. 실제 화면 최종 검수는 이전 환경에서 브라우저 제어가 꺼져 있어 미완료다. 데이터는 dist/species.json·plants.json·morphs.json, 목차는 catalog-navigation.js·catalog-browser.js·catalog-route.js 및 전용 CSS. 패키지 설치·API키·Sites 연결 불필요.

## 다음 실제 작업

1. 새 환경에서 브라우저 사용이 가능하면 데스크톱/390px 목차·크기 필터·상세 복귀·URL/뒤로가기·구매처 왕복을 검수한다. 불가능하면 미완료로 기록하고 독립 작업을 계속한다.
2. 정글플랜트·지피·덩굴·브로멜리아와 게코·개구리를 우선 보강한다. 달팽이·육지소라게 추가 심화는 사용자 지시로 낮은 우선순위다. 국내 카테고리의 미검증 페이지·학명 충돌을 완료로 표시하지 않는다.
3. 주요 도마뱀 누락 후보 Xenosaurus grandis·Pseudopus apodus는 아직 추가하지 않았다. 파충류출몰구역 상품2134·2788 판매명과 독립 분류/관리 자료를 대조한다. 식물·동물 기존 항목도 크기·관리·가격을 근거별로 보강한다.

저장소 밖 원시 조사 파일은 GitHub에 포함하지 않았다. 필요한 최소 근거 URL과 접근 한계는 공개 조사 장부에 있다. 이전 PC의 임시 경로·로그인·브라우저·프로세스가 새 PC에 있다고 가정하지 않는다.

## 비용과 실행 규칙

승인된9단계: 상태 정리 → 목차/크기 검수 → 조사 기준 목록 → 정화생물 → 식물 → 주 사육동물 → 기존 정보 심화 → 통합 검증 → 최종 결과 보고. 소규모 작업 뒤마다 멈추거나 계속할지 반복 질문하지 않는다. 중간 진행만 짧게 보고하며 이어간다.

검색 결과를 짧게 읽고 자료를 재사용하며 하위 에이전트를 자제한다. 항목별 전체 검사를 반복하지 않고 국소 검사 후 주요 묶음 끝에 `npm run check`와 `git diff --check`를 실행한다. 시작 환경 확인으로 한 번 검사한 뒤 변경 없이 반복하지 않는다. 검증되지 않은 인기·사진·크기·학명을 만들지 않는다. 추가 업로드·main 반영·공개 배포는 최종 보고 뒤 사용자 지시에 따른다.

## 새 AI 재시작 프롬프트

이 컴퓨터에서 https://github.com/mom2891-png/viva-field-guide.git 의 codex/purchase-review-price-expansion 브랜치를 직접 받아 비바리움 도감 작업을 이어가. Git·Node22+·인증 상태를 확인하고, 폴더가 없으면 위 clone 명령을 실행해. 기존 폴더는 원격·브랜치·미커밋 변경을 확인하고 안전할 때만 위 pull --ff-only로 갱신해. CONTINUE_ON_NEW_PC.md와 연결된 문서를 읽고 다음 실제 작업과 비용/실행 규칙에 따라 계속해. main·배포는 임의로 변경하지 마. 터미널/파일 권한이 없다면 받은 척하지 말고 필요한 실행 환경을 알려줘.

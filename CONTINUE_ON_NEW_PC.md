# 다른 PC·다른 AI에서 이어가기

공통 프롬프트 단일 원본: [docs/agent-work-rules.md](docs/agent-work-rules.md).
검수·갱신일: 2026-11-04 (Asia/Seoul).
복사해서 전달할 시작 프롬프트: [CONTINUE_PROMPT.md](CONTINUE_PROMPT.md).

## 받기

저장소: https://github.com/mom2891-png/viva-field-guide.git
작업 브랜치: codex/purchase-review-price-expansion

Git과 Node22 이상을 확인한다. 공개 읽기에는 로그인이 필요 없다. gh를 쓸 때만 gh auth status 확인, 쓰기 인증이 필요하면 정상 로그인한다. 토큰을 요구하거나 문서에 넣지 않는다.

```sh
git clone --branch codex/purchase-review-price-expansion https://github.com/mom2891-png/viva-field-guide.git viva-field-guide
cd viva-field-guide
```

기존 폴더가 있으면 origin·브랜치·status부터 확인하고 변경을 보존한다. 같은 저장소/브랜치이고 깨끗하며 fast-forward 가능할 때만:

```sh
git pull --ff-only https://github.com/mom2891-png/viva-field-guide.git codex/purchase-review-price-expansion
```

사용자가 전달한 인계 SHA가 포함되는지 git merge-base --is-ancestor 인계SHA HEAD로 확인한다. main은 공개 배포 원본이며 현재 작업 브랜치와 버전이 다를 수 있다. 자동 reset·clean·무조건 stash·강제 전환 금지.

## 모든 AI의 읽기 순서

1. AGENTS.md → docs/agent-work-rules.md. Claude는 CLAUDE.md도 읽는다.
2. README.md → HANDOFF.md의 최신 배치. 이전 스냅샷 전체를 매번 읽지 않는다.
3. 관련 계획 docs/superpowers/plans/2026-11-03-field-guide-completion.md, docs/catalog-coverage.md, docs/catalog-field-standards.md 중 이번 작업에 필요한 구간.

상세 규칙을 각 AI 파일에 복제하지 않는다. 공통 프롬프트만 갱신하고 시작 문서는 그 파일로 연결한다. 모델의 기억·구독 계정·이전 대화가 전달된다고 가정하지 않는다. 새 커밋을 받지 않은 PC에는 새 규칙이 없다. 현재 PC의 로컬 수정은 업로드 또는 파일 직접 전달 후에만 다른 PC에 전달된다.

## 최신 로컬 상태

- 최신 분류 묶음:591항목 유지, 동물208속/반복69속·식물111속. 목차1080. 아브로니아3종 전개·종/모프·필터·URL/뒤로가기 유지. 원본 동물3항목 middle만 통일. docs/catalog-grouping-review.md 참조. 실제 화면 검수는 연결 오류로 미완료.

- 최신42건 후속: 동물362·식물229=591, 목차885·사진444·크기187·가격214. 신규17·기존10보강. 42건 모두 판정 기록, 8신규 보류와 기존 부분보강/사진·부모종 연결은 미완료. 브라우저 getTab 연결 오류로 실제 검수 미완료. 아래 수치는 이전 배치 기록.

- 최신 기본 이끼 배치: 동물362·식물212=574, 목차858·사진437·크기186·가격214. 신규6·기존2, 서리이끼는 미확정 유통명. 비단 대표명/별칭과 속 카드 개선; 비단 사진은 종 동정 불확실해 보류. 새 화면 실제 검수 미완료. 아래 수치는 이전 배치 기록이다.

- 최신 식물 배치: 동물362·식물206=568, 목차848·사진432·크기184·가격214. 신규8항목·기존6항목 보강. 상세 변경·남은 조사·검수 한계는 HANDOFF의 정글·덩굴·브로멜리아 보강 절을 따른다. 새 UI 실제 검수는 브라우저 연결 오류로 미완료.

- 기준 원격 인계: d3a882d25c2e54fae315cdae6c40132d40d7ced1, 당시 동물360/식물196.
- 후속 로컬: fd6313e에서 동물362/식물198=560, 목차835·사진427·크기184·가격214. 신규4항목과 기존4항목 보강, 구매처 왕복 필터 복원. 대표1440px/390px 검수.
- 8a739a6에서 승인 지침과 구매 링크5회 해제 구현. 기본 링크/구매처 탭 숨김, 입력칸 밖에서5를5회 연속 누르면 현재 페이지에서 해제, 새로고침하면 잠금. 공개 데이터의 비밀 보관 기능은 아니다.
- 구매 링크 해제의 새 UI는 브라우저 연결 오류로 실제 재검수 미완료. 자동 검사 통과와 구별한다.
- 플랜티멀48의150상품 목록: 대조 후보28/보류122. 판매 규격·단위 미확인 신규 가격은 반영하지 않음. 국내 실물 동정·주요 관리·다른 업체 대조는 계속 진행 중.

정확한 최신 커밋은 최종 작업 응답과 git log에서 확인한다. 추가 업로드·main 반영·공개 배포는 최종 보고 후 사용자의 지시를 따른다.

## 실행과 후속

- 실행: npm start 또는 node scripts/serve.mjs. 기본 http://127.0.0.1:4190/ . 사용 불가 포트는 환경을 확인해 PORT로 변경한다.
- 전체 검사: npm run check. npm이 없으면 HANDOFF.md의 Node 직접 실행 명령으로 package.json check와 동일한 명령을 수행한다.
- 문서만 변경하면 링크·내용과 git diff --check만 검사한다. 코드/데이터 작업은 국소 검사 후 주요 묶음 끝에 전체 검사를 한다.
- 다음 우선: 구매 링크 해제 실제 UI 검수 → 정글플랜트·지피·덩굴·브로멜리아와 게코·개구리 보강. 달팽이·육지소라게 심화는 후순위.
- Xenosaurus grandis/Pseudopus apodus는361/362로 이미 추가했으므로 중복 생성하지 않는다. 실물 동정·가격 단위·세부 관리의 미확인만 후속 검증한다.
- 원시 HTML·조사 스크립트·이미지 검수 자료는 checkout 밖이며 다른 PC에 자동 전달되지 않는다. 공개 장부의 최소 URL로 필요한 부분만 재조사한다. API 키·Sites 연결·패키지 설치는 실행에 필요 없다.

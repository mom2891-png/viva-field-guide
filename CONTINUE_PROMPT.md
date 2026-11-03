다른 PC의 Codex 또는 Claude에 아래 내용을 전달하세요.

```text
먼저 GitHub에서 작업 저장소를 이 컴퓨터로 받아온 뒤 비바리움 도감 작업을 이어가줘.
저장소: https://github.com/mom2891-png/viva-field-guide.git
브랜치: main
사이트: https://mom2891-png.github.io/viva-field-guide/

1. 원하는 작업 위치와 Git/Node.js 22 이상 설치를 실제 확인해.
   처음 받는 PC라면 빈 작업 위치에서:
   git clone --branch main https://github.com/mom2891-png/viva-field-guide.git viva-field-guide
2. 이미 저장소가 있으면 덮어쓰지 말고 origin/브랜치/git status를 확인해.
   git fetch origin 후 main이고 깨끗하며 fast-forward 가능할 때만
   git pull --ff-only origin main으로 갱신해. 자동 reset/stash/강제 전환 금지.
3. 받은 폴더를 열고 README.md, CONTINUE_ON_NEW_PC.md, AGENTS.md,
   HANDOFF.md 최신 항목을 읽어. Claude는 CLAUDE.md도 읽어.
   git log에서 구매 링크·가격 확장 및 다른 PC 인계 변경을 확인해.
4. node --check dist/app.js와 node scripts/validate.mjs를 실행해.
   미리보기는 node scripts/serve.mjs, http://127.0.0.1:4190/ 이야.

최신 작업: 여러 사이트의 가격 보강과 가격 있는 항목의 실제 구매 링크 추가.
가격175항목(동물136/식물39), 13업체의 상품1141개를 연결했어.
가격 없는 동물201/식물116개를 실제 상품으로 계속 보강해.
모프/쌍/개체/촉/컵/포트 가격을 섞지 말고 동명 다른 종·도서·용품을 제외해.
기존 인기값·사진·크기·ID를 유지하며 미확인 값은 추정하지 마.
이전 PC는 브라우저 제어가 꺼져 구매처 UI의 실제 화면 검수가 남았어.
공개 checkout 밖 조사 HTML/스크립트/캐시는 새 PC에 없고 실행에 필요 없어.
공개 purchaseLinks의 상품 URL로 재조사하면 돼.
GitHub 쓰기는 소유자/협업자 인증이 필요하고 토큰을 문서에 넣지 마.
다른 AI와 동시에 같은 폴더에 쓰지 말고 각 한도10%를 남겨.
검사·인계 갱신 후 main 반영 시 자동 배포 성공과 원격 SHA를 확인해 알려줘.
```

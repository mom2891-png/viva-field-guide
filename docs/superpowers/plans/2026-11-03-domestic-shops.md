# Domestic Shops Implementation Plan

**Goal:** 국내 구매처 22곳을 검색·분류하고 공식 사이트 또는 문의처와 관련 도감 항목으로 연결한다.

**Architecture:** shops.json은 명시적으로 검토한 업체 목록이다. shops.js의 독립 함수가 검색·관련 종 중복 제거·HTML 생성과 화면 이벤트를 담당한다. app.js는 페이지 표시와 기존 종 상세 연결을 담당한다. 업체 목록은 도감과 별도로 불러와 실패가 도감 로드를 막지 않는다.

**Tech Stack:** Buildless HTML/CSS/vanilla JavaScript, Node assert/vm.

## 실행 순서

- [x] scripts/validate-shops.mjs에 국내 22곳, 사용자 제공 링크, 분류·검색·빈 결과·관련 종 중복 제거·안전 링크·HTML escape 검사를 작성하고 실패를 확인한다.
- [x] dist/shops.json과 dist/shops.js를 작성해 위 검사를 통과시킨다. 홈페이지·스토어·SNS·카카오톡 링크의 버튼 설명을 구분하고 미확인 품목을 만들지 않는다.
- [x] dist/index.html에 구매처 탭과 본문, dist/style.css에 반응형 카드·필터, dist/app.js에 페이지 전환·연결 종 목록·복귀를 연결한다. 기존 전체 startup 검사에 shops.js를 함께 로드한다.
- [x] package.json의 check에 새 검사를 연결한다. npm run check 및 git diff --check를 실행한다.
- [x] 실제 브라우저에서 구매처 검색·필터·빈 결과·초기화·관련 종 상세·복귀·기존 두 도감·390px 메뉴와 카드·긴 업체명·카카오톡 링크를 검수한다.
- [x] 코드 리뷰 피드백을 처리하고 HANDOFF/README/설계 문서를 최종 동작과 일치시킨 뒤 검사와 명시 파일 커밋을 진행한다. 원격 push/배포 여부는 별도로 보고한다.

## 검증 명령

`node scripts/validate-shops.mjs`는 업체 목록 무결성과 실제 구매처 함수를 검사한다. `npm run check`는 기존 도감 전체와 구매처 검사를 실행한다. 브라우저는 PORT=8419 미리보기를 재사용한다. 외부 원문은 checkout 밖에 보관한다.

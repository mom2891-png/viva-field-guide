# 비바 — Vivarium Field Guide

동물·식물·이끼를 계속 확장하는 한국어 비바리움 도감. Codex와 Claude가 함께 사용하는 원본 저장소입니다.

- 사이트: https://mom2891-png.github.io/viva-field-guide/
- 원본: https://github.com/mom2891-png/viva-field-guide
- 로컬: Node.js 22 이상에서 `npm start` → http://127.0.0.1:4190/
- 검사: `npm run check` (패키지 설치 불필요)

npm이 없는 Node 단독 환경에서는 `node --check dist/app.js`, `node scripts/validate.mjs`, `node scripts/serve.mjs`를 직접 실행해도 됩니다.

## 어디에서 편집하나요?

다른 PC나 AI 세션에서는 아래 주소를 복제하거나 이 폴더를 엽니다.

```sh
git clone https://github.com/mom2891-png/viva-field-guide.git
cd viva-field-guide
npm run check
npm start
```

Codex는 AGENTS.md, Claude는 CLAUDE.md와 AGENTS.md를 읽고 작업합니다. 공통 작업 현황은 HANDOFF.md에 남깁니다. 다른 AI에 전달할 문구는 CONTINUE_PROMPT.md에 있습니다.

## 자동 배포

`main`에 반영된 변경 → GitHub Actions 검사 → 통과한 dist/만 GitHub Pages에 배포합니다. PR에서는 검사만 실행합니다. 동시에 작업할 때는 도구마다 별도 브랜치·체크아웃을 사용하고 PR로 합칩니다. 같은 폴더를 두 세션이 동시에 수정하면 충돌할 수 있습니다.

공개 저장소는 누구나 읽을 수 있지만 수정 권한은 GitHub 인증을 따릅니다. 같은 GitHub 계정으로 인증하거나 저장소 소유자가 협업자로 초대한 계정으로 작업해야 합니다. AI 구독 계정이 바뀌어도 원본은 이 저장소에 남습니다.

## 파일

| 파일 | 용도 |
|---|---|
| dist/index.html / app.js / style.css | 화면과 탐색 기능 |
| dist/species.json | 동물 항목 |
| dist/plants.json | 식물·이끼·우산이끼 항목 |
| dist/morphs.json | 동물 종 아래 모프·패턴·지역형 |
| dist/shops.json / shops.js | 국내 구매처 목록·검색·품목 필터·관련 도감 연결 |
| scripts/validate.mjs | 데이터·검색·정렬 검증 |
| .github/workflows/pages.yml | 검사와 자동 배포 |
| HANDOFF.md | 공통 작업 현황 |

이 저장소에는 이전 계정의 Sites 연결 정보·토큰·조사 원문·대화 기록을 포함하지 않습니다. 정적 파일은 다른 정적 호스팅으로도 이전할 수 있습니다. 사진 권리는 각 사진의 라이선스를 따르며 상세 화면에 저작자·원본 정보를 유지합니다.

## 크기와 가격 데이터

각 항목의 `sizeInfo`는 측정 기준(전체길이/몸길이/잎 길이 등)과 성체·성숙 기준을 포함합니다. `kind: maximum`은 하한을 추정하지 않습니다. `priceInfo`는 국내 공개 표시가이며 판매 단위별 `offers`로 나눕니다. 포트·컵·촉·묶음·한 쌍 가격을 서로 섞거나 개체당 가격으로 임의 환산하지 않습니다. 자료가 없으면 필드를 생략하며 UI에서 확인 중으로 표시합니다. 가격 갱신일은 `checkedAt`에 기록하고, 표본 가격을 인기 순위로 자동 전환하지 않습니다.


가격이 있는 항목의 `purchaseLinks`에는 실제 상품별 shop/title/url/price/unit/status/checkedAt을 저장합니다. 사용자가 요청한 공개 판매 상품 정보이며 인증·연락처·주문 정보는 넣지 않습니다. `listed`는 목록에서 확인했다는 뜻이며 재고 보장이 아닙니다. `soldOut`은 조사 시 품절 표시가 있었던 상품입니다. 상세 화면에서 구매처별 첫 상품과 펼칠 수 있는 나머지 상품 링크를 제공합니다. 같은 판매 단위의 링크 가격으로만 offers를 계산하며 동명 다른 종·장난감·도서·용품·사육 세트는 제외합니다. 최종 재고·옵션·배송비는 판매 페이지에서 확인합니다.

다른 컴퓨터에서는 [CONTINUE_ON_NEW_PC.md](CONTINUE_ON_NEW_PC.md)부터 확인하세요.

## 국내 구매처

상단 구매처 탭에서 국내 업체 22곳을 이름·취급 품목으로 검색할 수 있습니다. 정글플랜트, 이끼·수초, 파충류·양서류, 무척추동물, 테라리움 완성품·주문제작, 자재·도구, DIY 키트를 구분합니다. 업체의 홈페이지·SNS·카카오톡 문의를 구별해 연결하며, 기존 상품 링크가 있는 업체는 중복을 제거한 관련 도감 항목으로 이동할 수 있습니다. 업체 이름순이며 인기·추천 순위가 아닙니다. 표시 품목은 확인 범위이며 전체 취급 품목과 현재 재고를 보장하지 않습니다. 카카오톡 문의처는 사용자가 제공한 공개 링크이며 채팅 내용·개인 연락처는 수집하지 않습니다.

사용자 제공 가격표는 업체의 `assortment`에 판매 단위·금액·품절·재입고 상태로 보존하며 구매처 카드의 ‘판매 품목·가격표’에서 볼 수 있습니다. 특정 식물로 연결 가능한 문의 가격만 해당 항목의 `sellerOffers`에 저장하고 단위별 `priceInfo` 집계에 포함합니다. `sourceType: userMenu`, `sourceDate: null`은 원본 게시일이 알려지지 않은 제공 가격표라는 뜻이며 현재 웹 판매가로 가장하지 않습니다. 카카오톡 문의 링크를 실제 상품 URL인 `purchaseLinks`로 저장하지 않습니다. 혼합 상품·자재·학명 불명 품목은 임의로 특정 종 가격에 합치지 않습니다.

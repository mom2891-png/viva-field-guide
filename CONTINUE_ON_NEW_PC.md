# 다른 컴퓨터에서 이어가기

GitHub 저장소가 유일한 최신 원본이다. 이전 Sites 계정이나 예전 사이트 복사본으로 덮어쓰지 않는다.

## GitHub에서 받기

저장소: https://github.com/mom2891-png/viva-field-guide.git
브랜치: main
사이트: https://mom2891-png.github.io/viva-field-guide/

Git과 Node.js 22 이상을 실제 확인한다. 비어 있는 원하는 작업 위치에서:

```sh
git clone --branch main https://github.com/mom2891-png/viva-field-guide.git viva-field-guide
cd viva-field-guide
git status --short --branch
git log -3 --oneline
```

이미 받은 저장소가 있으면 origin/브랜치/status를 확인하고 기존 변경을 보존한다. git fetch origin 후 main이고 깨끗하며 fast-forward 가능할 때만 git pull --ff-only origin main으로 갱신한다. 충돌·분기는 자동 reset/stash/강제 푸시로 해결하지 않는다. 공개 읽기는 로그인 없이 가능하지만 수정/배포에는 소유자 또는 협업자 GitHub 인증이 필요하다. 토큰을 파일에 저장하지 않는다.

## 현재 상태

README.md → AGENTS.md → HANDOFF.md 최신 첫 항목을 읽는다. Claude는 CLAUDE.md도 읽는다. 인계 기준은 구매 링크·가격 확장 변경이며 정확한 SHA는 최종 응답과 git log에서 확인한다.

- 로컬 후속 작업: 가격181항목(동물140/식물41), 15개 업체의 실제 상품1,147개 연결. main에 미반영이면 이 수치는 후속 브랜치 기준이며 HANDOFF 최신 항목을 확인한다.
- 동물337/식물155, 식물은 속→종→품종, 동물은 처음부터 전체 나열. 인기 미집계에 임의 순위 생성 금지.
- 데이터는 dist/species.json, dist/plants.json의 sizeInfo/priceInfo/purchaseLinks. 화면은 dist/app.js/style.css/index.html. 패키지 설치·빌드·API 키·Sites 연결 불필요.
- 한국어 통용명·주요 모프·동물/식물/이끼 전체 범위와 여러 판매처 가격 보강이 사용자 방향. 200종 상한·한 업체만 참고·모호한 유통명으로 학명 확정하는 방식 금지. 조사 표는 UI에 필요 없고 구매 링크·사진 권리 표기는 유지.

## 실행 및 검사

```sh
node --check dist/app.js
node scripts/validate.mjs
node scripts/serve.mjs
```

미리보기: http://127.0.0.1:4190/ . npm이 있으면 npm run check / npm start도 동일하다. 이전 PC에서 구문·전체 기능·구매 링크 안전성/단위/가격 일관성 검사 통과. 브라우저 제어가 비활성화되어 실제 화면 검수는 못했다. 새 PC에서는 허용된 브라우저로 구매처·긴 상품명 모바일 줄바꿈·다른 상품 펼침·모프 펼침 후 사진 크기·식물 속 내부를 확인한다.

## 다음 작업

1. Actions에서 main 배포와 사이트 버전 확인. 로컬 후속 CATALOG_VERSION은 2026-11-03-shops1, 인계 main 공개 버전은 purchase1. 국내 구매처22곳의 새 탭과 관련 도감 연결은 후속 브랜치 기준이다.
2. 최신 사용자 요청을 확인하고, 가격 없는 동물197/식물114항목의 국내 실제 상품 우선 조사. 모프/연령/성별/규격/품절/옵션을 대조하며 추정 가격을 만들지 않는다.
3. purchaseLinks에 확인 상품 저장, 같은 판매 단위 가격만 priceInfo.offers에 집계. 도서·인조 식물·장난감·사육장/키트·동명 다른 종 제외. listed는 재고 보장이 아니다. 카테고리·모바일 주소 중복 제거.
4. 가격 외 ID/사진/크기/인기를 보존. 주요 모프별 연결·부족한 분류/사진은 HANDOFF 참조.
5. 검사·HANDOFF 갱신·명시 파일만 커밋. main 푸시는 공개 자동 배포이므로 Actions 성공과 원격 SHA까지 확인해 보고한다.

원문 HTML·개인 메모·조사 스크립트·캐시는 저장소에 없으며 이전 PC 절대경로에 의존하지 않는다. 공개 상품 URL로 재조사하면 된다. 다른 AI와 같은 폴더에 동시에 쓰지 말고 별도 브랜치/체크아웃 사용. 과거 PC의 설치물·인증·한도 수치를 가정하지 말고 확인 가능한 한도의 10%는 남긴다.

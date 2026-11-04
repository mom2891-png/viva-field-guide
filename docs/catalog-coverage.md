# 도감 수록 범위·조사 장부

초기 기록: 2026-11-03 (Asia/Seoul). 초기 배치는 등각류 공개 카테고리의 **목록 전 페이지 대조**와 드워프화이트 추가다. 전체 도감·업체 전 상품 조사 완료를 뜻하지 않는다. 목록 열람 완료와 후보 처리 완료를 구분한다. 미조사는 누락 0건이 아니며, 후보 미확정은 종 수에 넣지 않는다.

최신 집계(2026-11-04): 동물362·식물212=574항목. 세부군·입력 누락은 node scripts/catalog-status.mjs로 집계한다. 사진437·크기186·가격214항목이 입력되어 있다. 아래 분류 표와 초기 배치95상품·74보류 수치는 당시 기록이며 이후 추가·동정 보류는 후속 배치별로 별도 기록한다. 항목에는 종·속·유통명이 섞여 있어 이 수치를 동정 완료 종 수로 쓰지 않는다.

## 2026-11-04 기본 이끼·착생 고사리 반영

- package.json 전체 check·git diff --check 통과. 기존 동물 불변, 기존206식물 중 plant-176/127의 허용한 이름·별칭·설명·사진 필드만 바뀐 보존 검사 통과.
- 현재 동물362·식물212=574항목, 목차858노드. 사진437·크기186·가격214. 신규6(이끼4·착생 고사리2), 기존2항목 보강. 서리이끼는 유통명1건이며 확정 종으로 세지 않는다.
- plant-176 대표명을 비단이끼로 줄이고 가는흰털이끼·빵이끼·과거 표기 별칭을 연결. Leucobryum 속 표시는 비단이끼·흰털이끼로 바꿔 기본 이름으로 찾기 쉽게 했다. L. glaucum과 합치지 않음. 기존 가격/인기/ID는 보존.
- plant-127 털깃털이끼에 실제 생육 사진을 추가하고 ITIS의 최신 조합 Calohypnum plumiforme 등을 별칭으로 연결. 기존 Hypnum plumiforme 학명 표기/검색을 보존했다.
- Commons 후보를 직접 열어 검수했다. 사진5장은 저자·이용허락·원본 링크와 반영. 비단이끼 후보는 L. albidum과 최근 재동정 문제로 제외, 깃털/봉황의 건조 표본과 헤테로필라 첫 후보의 다른 잎 형태도 제외. 깃털·봉황·그늘대호꼬리와 비단이끼의 적합한 살아있는 종 사진 확보는 계속 필요하다.
- 쥐꼬리이끼 줄기1~5cm(FNA), 큰솔이끼 줄기 높이 보통3~8cm/드물게20cm(Montana 형태자료)를 측정부위·한계와 함께 입력. 큰솔 필터는 드문 최대20cm를 사용. 고사리 잎 길이를 전체 크기로 입력하지 않음. 신규 가격/구매 링크/인기 순위는 확정하지 않음.
- 양털 판매명은 물가양털이끼와 자동 연결하지 않았다. 세줄·양털·큰초롱 판매명은 종·관리 대조 보류. 새로운 물가양털이끼는 국내 재배 연구 근거이며 판매 확인 항목이 아니다. 미크로그램마2종은 해외 재배 참고로 국내 취급·인기와 구분.
- 자료·후보 사진·제외 사유·필드별 URL은 저장소 밖 research/moss-batch-2026-11-04/에 보관. 공개 최소 근거는 아래 기록. 실제 새 화면 검수는 미완료이며 이전 브라우저 연결 오류가 해결되었다고 가정하지 않음. 업로드·main·배포 없음.

|ID|반영|최소 근거·한계|
|---|---|---|
|plant-176|비단이끼|[자료1](https://www.nibr.go.kr/aiibook/catImage/20/National%20Species%201.pdf) · [자료2](https://www.akb.jp/c/int/koke_pack/int-096) · [자료3](https://www.bibsbryology.org/learning/species-finder/leucobryum-juniperoideum-2/)|
|plant-127|털깃털이끼|[자료1](https://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=1136446) · [자료2](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?command=show&id=98943&lvl=&mode=node)|
|plant-207|쥐꼬리이끼|[자료1](https://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=547912) · [자료2](https://bryophyteportal.org/portal/taxa/index.php?taxon=159990) · [자료3](https://library.nih.go.kr/ncmiklib/elib/kom/articleDtl.do?pk_pb_seq=PB06067674) · [자료4](https://silvarium2023.cafe24.com/product/list.html?cate_no=43)|
|plant-208|큰솔이끼|[자료1](https://www.bibsbryology.org/learning/species-finder/polytrichum-formosum/) · [자료2](https://fieldguide.mt.gov/speciesDetail.aspx?elcode=NBMUS5T020) · [자료3](https://silvarium2023.cafe24.com/product/list.html?cate_no=43)|
|plant-209|서리이끼·양지이끼 유통형|[자료1](https://www.kjpr.kr/articles/xml/bYqR/) · [자료2](https://m.oqua.co.kr/category/이끼/453/) · [자료3](https://silvarium2023.cafe24.com/product/list.html?cate_no=43)|
|plant-210|물가양털이끼|[자료1](https://www.nibr.go.kr/aiibook/catImage/20/National%20Species%201.pdf) · [자료2](https://library.nih.go.kr/ncmiklib/elib/kom/articleDtl.do?pk_pb_seq=PB06067674)|
|plant-211|미크로그램마 렙탄스|[자료1](https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:17444950-1) · [자료2](https://glassboxtropicals.com/microgramma-reptans/)|
|plant-212|미크로그램마 헤테로필라|[자료1](https://powo.science.kew.org/taxon/17444900-1) · [자료2](https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A17444900-1/general-information) · [자료3](https://glassboxtropicals.com/microgramma-heterophylla/)|

## 2026-11-04 기본 이끼·식물 누락 재조사

[42검토건 대기열](moss-plant-expansion-queue.md): 신규 검토30·기존 보강12. 후보 발굴이며 추가 확정 종 수가 아니다. 현재568항목 유지. 기본 이끼의 통용명·사진과 지피/착생란/초화 등 부족한 구성을 먼저 보강한다. 조사 범위·품절·접근 실패는 대기열 문서 참조.

## 2026-11-04 정글·덩굴·브로멜리아 보강

- 현재 동물362·식물206=568항목, 목차848노드. 사진432·크기184·가격214. 신규8항목과 기존6항목 보강. 가격·성숙 크기·인기 순위는 새로 확정하지 않았다.
- 플랜티멀48의 기존150상품 장부를 재사용해 이번10상품을 수동 처리했다. 신규6항목 연결, 기존 종의 별칭/하위 유통형4상품 연결. 나머지140상품은 이전 후보/보류 상태이며 실물 동정·단위·재고 확인 완료가 아니다. 별도 브로멜리아 참고2항목을 더했다.
- 미칸은 plant-41의 벨벳잎 유통형, 윌데노위 바리에가타는 plant-66 하위 판매 유통형이다. 피쉬본은 Ruellia makoyana와 R. devosiana 중 어느 종인지 확정하지 않고 유통명으로 보존했다. 국내 판매명 발견은 실물 종 동정과 구별했다.
- 관리·분류 대조는 Kew, NParks, RHS와 직접 재배업체/베고니아 협회 자료를 사용했다. 항목별 근거와 한계는 verification·care 필드에 남겼다. 판매 포트·잎 크기를 성숙 크기로 전환하지 않았다.
- Commons 사진5장의 실제 모습을 확인하고 저자·라이선스·원본 링크를 반영했다. 브랜티아넘·그라실레·레프로사·파우시플로라·조나투스에 추가. 특정 품종 사진으로 표시하지 않는다.
- 원문·사진 검수본·10상품 처리 장부는 저장소 밖 research/plant-batch-2026-11-04/에 보관했다. 공개 저장소에는 원문 수집본을 넣지 않는다. 새 PC에서는 항목의 근거 링크로 재확인할 수 있다.
- 실제 새 화면 검수는 browser.user is unavailable 연결 오류로 미완료. 자동 검사와 사진 파일 검수는 실제 화면 검수와 구별한다. 추가 업로드·main·배포는 하지 않는다.

|ID|추가 항목|분류|
|---|---|---|
|plant-199|스킨답서스 트루비 / Scindapsus treubii|종|
|plant-200|필로덴드론 브랜티아넘 / Philodendron brandtianum|종|
|plant-201|안스리움 그라실레 / Anthurium gracile|종|
|plant-202|루엘리아 피쉬본 유통형 / Ruellia sp. “Fishbone”|유통명|
|plant-203|베고니아 레프로사 / Begonia leprosa|종|
|plant-204|셀라기넬라 픽타 / Selaginella picta|종|
|plant-205|네오레겔리아 파우시플로라 / Neoregelia pauciflora|종|
|plant-206|크립탄서스 조나투스 / Cryptanthus zonatus|종|

## 2026-11-04 인계 후속 — 우선 식물 목록·도마뱀 후보·대표 화면 검수

### 플랜티멀 정글플랜트48: 목록 전수, 동정·가격 처리 일부

[공개 카테고리48](https://plantimal.co.kr/product/list.html?cate_no=48)의 표시 총수150건을 페이지1~4의40+40+40+30개와 대조했다. 중복 제거 상품 URL150개. 기존 이름/학명/별칭으로 28상품에 대조 후보 ID를 지정했고, 122상품은 미확정 보류로 기록했다. 이 판정은 보수적인 이름 대조이며 122개의 신규 종이나 28개의 실물 동정 완료를 뜻하지 않는다. 전체 상품별 원장은 checkout 밖 ../research/review-2026-11-04/plantimal-review-ledger.json, 원문과 목록은 같은 폴더에 보관했다. 가격은 단위·규격 검증 전이라 이번 목록 배치에서 추가하지 않았다.

상세6상품(1029 라비시아 핑크 그라데이션,739 호마로메나 골드벨벳,591 페페로미아 메탈리카,571 마르크라시아 콜롬비아,522 에피스시아 핑크스모크,519 필레아 브론즈 실버트리)에 접근했다. 목록의 표시 가격과 상세 판매명을 확인했으나 화분·촉·수량 규격이 텍스트로 확인되지 않았다. 최소 주문수량1개는 식물1촉/1포트 근거로 사용하지 않았다. 571/522/519의 기존 유통명 항목은 그대로 유지하며 종 동정·현재 재고를 확정하지 않았다.

다음 보류 우선 묶음: 호말로메나 실버 네로우리프·골드벨벳·하세호미 / 라비시아 핑크 그라데이션·블랙·WK그린 / 피커스 sp. 빌로사 / 셀라지넬라 인터메디아·픽타·퍼플 / 베고니아 판매명 철자 충돌. 서리이끼 건조이끼·혼합 SET는 살아 있는 특정 종으로 자동 연결하지 않는다. 브로멜리아 상품은 이 카테고리에서 확인되지 않았으므로 브로멜리아 국내 전체 조사를 완료로 표시하지 않는다.

### 신규4항목과 기존4항목의 정보 보강

|ID|항목|확인 범위와 한계|
|---|---|---|
|species-361|제노사우루스 그란디스 · Xenosaurus grandis|[ITIS586165](https://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=586165), [Reptile Database](https://reptile-database.reptarium.cz/Xenosaurus/grandis), [직접 야외연구](https://www.thebhs.org/publications/the-herpetological-journal/volume-21-number-2-april-2011/619-03-estimating-potential-reproductive-costs-in-the-survival-of-a-xenosaurid-lizard/file)의 바위 틈·단독 생활 대조. 국내[2134](https://reptileahead.com/product/detail.html?product_no=2134)는 한글 판매명만 확인. 옛 grandis 아종을 모두 현행 종으로 합치지 않음. 성숙 개시 SVL9.5/10cm를 성체 최대크기로 쓰지 않음. 세부 사육 조건 추가 검증 필요.|
|species-362|유러피안 글라스리자드 · Pseudopus apodus|[현행/옛 학명](https://reptile-database.reptarium.cz/Pseudopus/apodus), [Beardsley Zoo](https://beardsleyzoo.org/plan-your-visit/animals/legless-lizard/), [Phoenix Zoo](https://www.phoenixzoo.org/explore/animals/european-legless-lizard/)의 지상 생활·낙엽/굴·먹이·꼬리 포함 최대4피트 대조. 국내[2788](https://reptileahead.com/product/detail.html?product_no=2788) 한글 판매명만 확인. 아종/실물 동정·가격 단위 미확인. 뱀 분류로 넣지 않음.|
|plant-197|페페로미아 메탈리카 · Peperomia metallica|[POWO 이름색인](https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A189133-2/general-information)·WFO0001092562 이름 대조, POWO 본문403. [재배자의 종별 안내](https://rootgrowings.com/products/peperomia-metallica)의 중간 빛·급수/배수 참고. 국내591 판매명 확인·실물 종 일치 미확정. 재배자의 small표현과 판매 화분4인치를 성숙 크기로 쓰지 않음.|
|plant-198|디스키디아 누뮬라리아 · Dischidia nummularia|[NParks1385](https://www.nparks.gov.sg/florafaunaweb/flora/1/3/1385)의 종명/이명·착생·빛·적은 급수 대조. 잎 지름7~10mm는 전체 크기 필터에 넣지 않음. 국내 취급은 미조사.|

신규4항목의 사진·인기·가격은 미입력 유지. 두 국내 도마뱀 상품은 한글 판매명과 상품가(2134:700,000원,2788:150,000원)를 읽었으나 학명/생물 단위/옵션을 모두 검증하지 못해 구매 링크·가격을 입력하지 않았다. SOLD OUT과 구매하기가 같은 텍스트에 나와 재고도 확정하지 않았다.

- species-42 골든더스트데이게코: [ReptiFiles 종별 사육 안내](https://reptifiles.com/gold-dust-day-gecko)의 주행성·수목성·잡식·UVB·습도 일주기·약한 피부를 careNote에 반영. 기존 크기/가격/인기는 보존.
- species-183 밀키프로그: [Smithsonian 직접 사육 전시 자료](https://nationalzoo.si.edu/animals/news/fun-facts-about-amazon-milk-frogs)의 수목 생활·곤충 먹이·방어 분비물 반영. 온습도 수치를 만들지 않음.
- plant-24 네오레겔리아 릴리푸티아나: [Steve's Leaves 재배 자료](https://stevesleaves.com/products/neoregelia-lilliputiana)의 밝은 여과광·고습·포복경·식물 높이2~3인치를 반영. 높이5.08~7.62cm와 군락 폭/판매 화분3.5인치를 구별.
- plant-51 크립탄서스 비비타투스: [NParks3875](https://www.nparks.gov.sg/florafaunaweb/flora/3/8/3875)의 Pink Starlite를 기존 종 아래 품종으로 연결. 해당 품종의 지생·배수·여과광·잎 가장자리 주의만 설명하고 품종 최대높이20cm를 종 전체 크기로 덮어쓰지 않음.

대표 UI를1440×900/390×844에서 검수했다. 동물 목차→파충류→게코, 식물 목차 전역검색→브로멜리아 상세, 크기 필터·종 상세/선택목록/속 목록 복귀·URL 새로고침·뒤로/앞으로·구매처 검색→관련 식물→상세→원래 업체 목록을 확인했다. 구매처 탭 전환이 원래 history 항목을 덮어쓰는 문제를 실제 화면에서 재현한 뒤, 출발 상태 저장과 새 history 항목 push로 수정했다. 실패하는 회귀검사→수정→모바일/데스크톱 왕복 재검수 통과. 새 덩굴 상세에서 페이지390/scroll390, 대화상자337/scroll337로 가로 넘침 없음; 데스크톱 상세885/scroll885. 확인한 브라우저 console error 없음. 전 항목/전 외부 구매 상품의 전수 검수는 아니다.

## 기준 목록 정리

524항목의 ID·표시명·학명·별칭·종 구분·목차 경로·모프·품종과 사진/크기/가격 입력 여부를 checkout 밖 조사 기준 파일로 내보냈다. 고유 ID 524, 경로 누락 0, 사진 427, 크기 164, 가격 214항목이다. 입력 여부 집계이며 정보 검증 완료 수를 뜻하지 않는다. 후보를 대조할 때 이 기준과 기존 ID를 보존한다.

## 조사 상태와 판정

- 대기: 카테고리 URL·전체 페이지·후보를 아직 확정하지 않음. 미처리 후보 수는 **미상**.
- 목록 전수/처리 일부: 공개 목록의 페이지·표시 상품 수는 대조했지만 상세 동정·관리·모프 판정이 남음.
- 부분 접근: 동적 목록·접근 실패 때문에 전체 상품·페이지 수를 검증할 수 없음.
- 상품 처리는 기존 항목 대조 / 신규 항목 / 미확정 보류 / 다른 군으로 이관 중 하나로 기록. 기존 항목 대조는 구매 링크·가격까지 새로 반영했다는 뜻이 아니다.
- 각 신규 필드는 독립 검증: 학명은 분류 자료, 국내 유통은 국내 상품, 관리·성체 크기는 생물 자료. 사진은 실제 분류군과 이용허락을 확인하지 못하면 공란. 가격·인기는 서로 대체하지 않음.

## 전체 분류군 작업 대기열

화면과 동일한 안정 목차 ID. 모든 현재 세부군을 포함한다. 중간 부모와 자식 합계를 더하지 않는다. 아래 수록 수는 해당 분기의 고유 항목 수이고 누락 후보의 분모가 아니다. 관엽·초화 아래 덩굴·지피·수변은 환경/역할로 함께 조사한다.

|목차 ID|분기|현재 항목|조사 상태|다음 조사·자료|미처리 후보|
|---|---|---:|---|---|---|
|`animals/reptiles`|파충류|198|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/geckos`|파충류 > 게코|66|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/geckos/day-geckos`|파충류 > 게코 > 데이게코류|9|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/other-lizards`|파충류 > 기타 도마뱀|69|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/other-lizards/skinks`|파충류 > 기타 도마뱀 > 스킨크류|16|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/other-lizards/agamids-horned`|파충류 > 기타 도마뱀 > 아가마·드래곤·혼리자드류|18|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/other-lizards/other`|파충류 > 기타 도마뱀 > 그 외 도마뱀|22|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/other-lizards/chameleons`|파충류 > 기타 도마뱀 > 카멜레온류|11|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/snakes`|파충류 > 뱀|57|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/snakes/other`|파충류 > 뱀 > 콜루브리드·기타|45|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/snakes/boas-pythons`|파충류 > 뱀 > 보아·파이톤류|12|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/amphibians`|양서류|70|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/amphibians/frogs-toads`|양서류 > 개구리·두꺼비|55|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/amphibians/frogs-toads/other-frogs`|양서류 > 개구리·두꺼비 > 그 외 개구리·두꺼비|14|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/amphibians/frogs-toads/pacman`|양서류 > 개구리·두꺼비 > 팩맨·혼프로그류|5|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/amphibians/frogs-toads/tree-frogs`|양서류 > 개구리·두꺼비 > 트리프로그류|17|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/amphibians/frogs-toads/dart-frogs`|양서류 > 개구리·두꺼비 > 다트프로그류|19|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/amphibians/salamanders`|양서류 > 도롱뇽·뉴트|15|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods`|절지동물|69|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods/millipedes`|절지동물 > 노래기|6|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods/crabs-hermits`|절지동물 > 게·육지소라게|6|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods/springtails`|절지동물 > 톡토기|14|부분 접근|렙틸리아716·워터테일 먹이·더쥬86; 아래 접근 한계|아래 상품 단위 보류 수; 중복 종 미통합|
|`animals/arthropods/isopods`|절지동물 > 등각류|21|목록 전수/처리 일부|플랜티멀85·더쥬217·게코빌리지82; 아래 배치|아래 상품 단위 보류 수; 중복 종 미통합|
|`animals/arthropods/arachnids`|절지동물 > 거미·전갈·기타 거미류|12|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods/arachnids/scorpions`|절지동물 > 거미·전갈·기타 거미류 > 전갈|2|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods/arachnids/jumping-spiders`|절지동물 > 거미·전갈·기타 거미류 > 점핑스파이더|2|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods/insects`|절지동물 > 곤충|10|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods/insects/other`|절지동물 > 곤충 > 그 외 곤충|3|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods/arachnids/other`|절지동물 > 거미·전갈·기타 거미류 > 그 외 거미류|1|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/molluscs`|연체동물|1|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/molluscs/snails`|연체동물 > 달팽이류|1|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods/arachnids/tarantulas`|절지동물 > 거미·전갈·기타 거미류 > 타란튤라|7|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods/insects/mantises`|절지동물 > 곤충 > 사마귀|3|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods/insects/stick-leaf`|절지동물 > 곤충 > 대벌레·잎벌레|2|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/arthropods/insects/beetles`|절지동물 > 곤충 > 딱정벌레|2|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/turtles`|파충류 > 거북|6|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/turtles/box-turtles`|파충류 > 거북 > 상자거북류|3|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/turtles/tortoises`|파충류 > 거북 > 육지거북류|3|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`animals/reptiles/other-lizards/monitors`|파충류 > 기타 도마뱀 > 모니터류|2|대기|더쥬·더사파리·서울렙타일·타란센터·뉴런·플랜티멀 중 해당 카테고리 / 공식 분류·전문 사육 자료|미상|
|`plants/foliage`|관엽·초화류|87|대기|플랜티멀·오쿠아·꿈속의 자연·티스투·내츄럴팟·마이플랜트·라라아쿠아 / 공식 식물 분류·전문 식재 자료|미상|
|`plants/ferns`|고사리·석송류|39|대기|플랜티멀·오쿠아·꿈속의 자연·티스투·내츄럴팟·마이플랜트·라라아쿠아 / 공식 식물 분류·전문 식재 자료|미상|
|`plants/bromeliads`|브로멜리아류|9|대기|플랜티멀·오쿠아·꿈속의 자연·티스투·내츄럴팟·마이플랜트·라라아쿠아 / 공식 식물 분류·전문 식재 자료|미상|
|`plants/orchids`|난초류|12|대기|플랜티멀·오쿠아·꿈속의 자연·티스투·내츄럴팟·마이플랜트·라라아쿠아 / 공식 식물 분류·전문 식재 자료|미상|
|`plants/orchids/jewel`|난초류 > 보석란|6|대기|플랜티멀·오쿠아·꿈속의 자연·티스투·내츄럴팟·마이플랜트·라라아쿠아 / 공식 식물 분류·전문 식재 자료|미상|
|`plants/mosses`|이끼류|34|대기|플랜티멀·오쿠아·꿈속의 자연·티스투·내츄럴팟·마이플랜트·라라아쿠아 / 공식 식물 분류·전문 식재 자료|미상|
|`plants/liverworts`|우산이끼류|3|대기|플랜티멀·오쿠아·꿈속의 자연·티스투·내츄럴팟·마이플랜트·라라아쿠아 / 공식 식물 분류·전문 식재 자료|미상|
|`plants/orchids/other`|난초류 > 그 외 착생란·소형 난초|6|대기|플랜티멀·오쿠아·꿈속의 자연·티스투·내츄럴팟·마이플랜트·라라아쿠아 / 공식 식물 분류·전문 식재 자료|미상|
|`plants/carnivorous`|식충식물|2|대기|플랜티멀·오쿠아·꿈속의 자연·티스투·내츄럴팟·마이플랜트·라라아쿠아 / 공식 식물 분류·전문 식재 자료|미상|

## 국내 업체22곳의 카테고리 조사 상태

홈페이지가 등록되어 있다고 전체 카테고리가 조사된 것은 아니다. 관련성이 낮다는 이유만으로 미조사 업체를 비해당 처리하지 않는다. 알려진 이전 배치는 HANDOFF의 기록을 인계한 것이며 이번에 전수 재검증하지 않았다.

|업체 ID|업체·공식 진입점|관련 범위|카테고리 감사 상태|
|---|---|---|---|
|naturallpot|[내츄럴팟](https://naturallpot.co.kr/)|정글플랜트|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|newrun|[뉴런렙타일](https://newrunreptile.co.kr/)|파충류·양서류|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|themonster|[더몬스터](https://www.themonster.co.kr/)|파충류·양서류·무척추동물|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|thesafari|[더사파리](https://www.thesafari.kr/)|파충류·양서류|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|thezoo|[더쥬](https://xn--9m1b023b.com/)|파충류·양서류·무척추동물|등각류217 목록 전수/처리 일부; 생먹이86 목록5개 확인; 나머지 대기|
|raraaqua|[라라아쿠아](https://raraaqua.com/)|이끼·수초|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|reptilia|[렙틸리아](https://reptilia.co.kr/)|무척추동물|톡토기716 부분 접근; 다른 군 대기|
|myplant|[마이플랜트](https://myplant.co.kr/)|정글플랜트|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|seoulreptile|[서울렙타일](https://m.seoulreptile.co.kr/)|파충류·양서류|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|oqua|[오쿠아](https://oqua.co.kr/)|정글플랜트·이끼·수초|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|changsoo|[창수네 사육공간](https://xn--s39awrm4hoou7ubb3mrsj.com/)|파충류·양서류|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|tarancenter|[타란센터](https://tarancenter.com/)|파충류·양서류·무척추동물|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|tistou|[티쭈 (티스투)](https://tistou.co.kr/)|정글플랜트|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|reptileahead|[파충류출몰구역](https://reptileahead.com/)|파충류·양서류|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|plantimal|[플랜티멀](https://plantimal.co.kr/)|정글플랜트·무척추동물·파충류·양서류|등각류85·정글플랜트48 목록 전수/처리 일부(48:150상품); 먹이50 접근 실패; 기타군 대기|
|dreamnature|[꿈속의 자연](https://www.xn--cw0b005ajgdetb9h.com/)|정글플랜트·이끼·수초·테라리움 완성품·주문제작·자재·도구|이전 기록: 정글·생태 식물44의3페이지28상품 처리; 이번 재검증 없음; 다른 군 대기|
|firerium|[Firerium](https://www.daangn.com/kr/local-profile/firerium-2q9mrmii51h7/)|테라리움 완성품·주문제작|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|iammoss|[아이엠모스](https://www.iammoss.kr/)|테라리움 완성품·주문제작·DIY 키트|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|moss-shop|[이끼상점](https://open.kakao.com/o/smxDuN7h)|테라리움 완성품·주문제작·이끼·수초·정글플랜트·자재·도구|이전 기록: 제공 가격표36옵션 처리(게시일 미상); 온라인 전체목록 조사 아님|
|dachaerium|[다채리움](https://www.instagram.com/dachaerium/)|테라리움 완성품·주문제작·파충류·양서류|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|nature-rail|[네이쳐레일](https://open.kakao.com/o/sEVfZMAi)|테라리움 완성품·주문제작|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|
|purmmk|[이너푸름](https://purmmk.co.kr/)|자재·도구·DIY 키트|대기 — 세부 카테고리 URL·하위 페이지·표시 총수 미확정|

## 정화생물 첫 배치: 공개 목록 감사

모두 확인일2026-11-03. 품절 공개 상품도 포함. 독립 업체 단위로 세며 더쥬 지점·모바일 중복을 업체 수로 늘리지 않았다. 상품별 목록 단계 판정 원장은 checkout 밖 `../viva-research/cleanup-2026-11-03/`에만 보관한다. 보류 상품은 아래 이름을 다음 조사에서 재확인한다.

|업체·카테고리 URL|공개 총수|확인 페이지/상품 수|기존 대조|신규로 대응|다른 군 이관|보류|상태|
|---|---:|---|---:|---:|---:|---:|---|
|[플랜티멀 등각류85](https://plantimal.co.kr/product/list.html?cate_no=85)|56|1~2 / 40+16=56|6|2|3|45|목록 전수; 보류 상세 동정·모프 확인 필요|
|[더쥬 등각류217](https://xn--9m1b023b.com/category/콩벌레등각류/217/)|36|1~2 / 20+16=36|7|1|0|28|목록 전수; 보류 상세 동정·모프 확인 필요|
|[게코빌리지 등각류82](https://geckovillage.co.kr/category/등각류/82/)|3|1 / 3|1|1|0|1|목록 전수; 굴뚝양쥐며느리 학명 대조 보류|
|[더쥬 생먹이86](https://xn--9m1b023b.com/category/생먹이/86/)|5|1 / 5|0|0|5|0|공개 목록에 톡토기 없음; 귀뚜라미·밀웜·밀기울·슈퍼밀웜은 이번 정화생물 범위 밖|
|[렙틸리아 톡토기716](https://m.reptilia.co.kr/product/list_zoom.html?cate_no=716)|미검증|동적 목록1페이지 진입; 총 페이지 미상|0|0|0|최소1|동적 본문 비노출; 검색색인의 상품1044만 확인. 전수 아님|
|[워터테일 먹이](https://watertail.com/insects)|미검증|동적 목록1페이지 진입; 총 페이지 미상|0|0|0|최소1|목록에 상품 링크 비노출; 직접 톡토기 상품만 확인. 전수 아님|
|[플랜티멀 먹이50](https://plantimal.co.kr/product/list.html?cate_no=50)|미검증|0 / 미상|0|0|0|미상|공개 메뉴의 링크 진입 실패(cache miss); 재조사|

더쥬 페이지1은 링크152~172 중 품절아이콘162를 제외한20개, 페이지2는152~168 중 품절아이콘153을 제외한16개다. 플랜티멀 페이지1은 상품37 및43~81의40개, 페이지2는37 및43~57의16개다. 링크 번호는 수집 시점의 문서 내 번호이며 고정 상품 ID가 아니다. 표시 총수와 합계는 일치한다. 가격/상태를 확인하지 않은 목록상품에 새 구매 링크나 가격을 만들지 않았다.

### 누락·보류 결과

- **확인 누락 추가:** 드워프화이트 `species-338 / Trichorhina tomentosa`. 플랜티멀30마리·500마리는 같은 종 후보의 다른 수량으로2상품, 더쥬20마리와 게코빌리지 상품도 같은 신규 항목으로 대응한다. 각각을 별도 종으로 만들지 않음.
- 기존 대조: 플랜티멀 데어리카우2→species-271, 제브라→277, 클루기→276, 스카버→270, 러버더키→311. 더쥬 데어리카우→271, 판다킹→312, 게스트로이→310, 호프만세기→308, 무리나→273, 제브라→277, 러버더키→311. 게코빌리지 데어리카우→271.
- 플랜티멀 다른 군3상품: 러버더키 메가볼·쿠키앤크림 메가볼·타이 화이트헤드 밀리패드는 노래기로 이관하여 추후 학명·기존 항목 대조. 이름의 러버더키만 보고 등각류에 연결하지 않음.
- **종 수준 누락 후보(아직 미추가):** 그라눌라툼, 바디움, 바에티센시스, 무리카툼, 볼리바리, 매그니피쿠스, 석신크투스, 워너리, 플라보스쿠타툼, 오피시날리스, 익스판서스, 하우세니, 플라보마기나투스, 트릴로바투스, 알보마지나툼, 코카시우스, 인카누스, 프론테트리앙굴룸, 니클레시. 상품명 또는 판매 학명은 있으나 공식 학명·동의어·기존 이름·종별 환경을 이번 배치에서 모두 검증하지 못했으므로 확정 종으로 추가하지 않았다.
- **유통형·모프 판정 보류:** 엠버·빅블루·레몬블루·응우옌 크래비·체리블라썸·닥신트라이컬러·핑크/레드판다킹·쥬피터·카푸치노/딸기라떼·아이스플라워·나란지토·마다가스카르 타입2·엠버파이어플라이GNR/LCF/HL·트로글로딜로 그린스팟/벡스·크레이지홀스·엠버판다·엠버패턴리스·마블제브라·러버비·퍼플초콜렛·펭귄/자이언트펭귄/백귄·셰이드피존·레드스커트·블라인드사툰·네소딜로켄팅·화이트샤크·cf.팔라시·굴뚝양쥐며느리. 이 목록은 상품 수나 종 수와 일치하지 않는다. 같은 상품/유통형의 중복 판매와 색상은 다음 판정에서 합친다.
- 엠버비 상품의 판매속 `Ardentiella`와 기존 species-313의 `Merulanella sp.`는 충돌하므로 자동 연결하지 않았다. 동일성·현행 조합 검증 필요.
- 톡토기 렙틸리아 [상품1044](https://reptilia.co.kr/product/스프링테일톡톡이톡토기100/1044), 워터테일 [1통 상품](https://watertail.com/product/cricket001-198-199-219-220)은 학명 미표기다. 흰색/스프링테일이라는 이유로 Folsomia candida 등 기존14종 중 하나에 붙이지 않았고, 가격도 해당 종에 넣지 않았다. 국내 톡토기 목록2업체 전수 대조는 **미완료**.

### species-338 필드 근거와 한계

|필드|근거|판정|
|---|---|---|
|학명·상위 분류·이명|[NCBI172010](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=172010), [분류 논문](https://www.scielo.br/j/bn/a/g3vC5yxGPSNDCHkr56BrTWp/?format=html)|Trichorhina tomentosa, 등각류, 원조합 Alloniscus tomentosus 대조. 국내 판매 군체 자체의 표본 동정은 하지 않음|
|국내 유통명·판매 단위·표시가|[플랜티멀964](https://plantimal.co.kr/product/드워프화이트-30마리-등각류-드화-분해생물-청소생물-톡토기/964/category/85/display/1/)|30마리4,000원. 상세의 SOLD OUT 문구를 보수적으로 품절로 기록. 배송·포장 추가금 제외. 500마리·타 업체 가격은 상세 단위/상태 미검증으로 가격에 미포함|
|습윤 낙엽·부후목·최대 약5mm|[BMIG 종 자료](https://bmig.org.uk/species/trichorhina-tomentosa)|검색색인에 종 크기·습윤 미소서식처 확인; 직접 본문503 응답도 있어 재접근 필요|
|기질·환기·건조와 침수 구분|[Herpeton 사육 자료](https://academy.herpeton.net/en/caresheets/invertebrates/trichorhina-tomentosa/), 플랜티멀964 상세|깊은 촉촉한 기질·덜 젖은 표면·환기, 이동/합사 개별 판단. 정밀 온습도 수치는 자료의 경험적 성격을 고려해 새로 입력하지 않음|
|사진·인기|미검증|사진 공란; popularityKnown=false, popularity=null, shopCoverage=null. 국내 취급 상품 수를 인기 점수로 바꾸지 않음|

WoRMS 직접 상세는403, BMIG 직접 열람은503. 이를 정상 열람으로 기록하지 않는다. 신규 항목의 이름과 해외 생물 자료는 대조했지만 유통명이 판매군체의 종 동정을 보장하지 않는다는 한계를 verification에 명시했다.

### 익스판서스 후속 대조

- 포셀리오 익스판서스는 [ITIS 종 기록](https://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=596345)과 [GBIF](https://www.gbif.org/taxon/4LW72)에서 종명을 확인했다. [플랜티멀 상품](https://plantimal.co.kr/product/%ED%8F%AC%EC%85%80%EB%A6%AC%EC%98%A4-%EC%9D%B5%EC%8A%A4%ED%8C%90%EC%84%9C%EC%8A%A4-%EC%98%A4%EB%A0%8C%EC%A7%80-%EC%A5%90%EB%A9%B0%EB%8A%90%EB%A6%AC-%EA%B3%B5%EB%B2%8C%EB%A0%88-%EC%BD%A9%EB%B2%8C%EB%A0%88-%EB%B6%84%ED%95%B4%EC%83%9D%EB%AC%BC/848/category/85/display/1/)은 오렌지 유통형과 아성체 약 1cm를 표기한다. 이는 성체 크기 근거가 아니며 판매 군체 실물 동정도 확인되지 않았다. 종별 관리와 판매 단위·품절 상태를 확인할 때까지 추가 보류한다.

## 다음 배치

1. 등각류 보류74상품(45+28+1)의 상세·동의어·모프 판정 및 노래기3상품 이관 처리. 같은 분류군의 중복 상품은 신규 종으로 세지 않음.
2. 톡토기 전문 목록의 동적 로딩·페이지 총수와 학명 제공 여부 확인. 접근 불가를 해소할 때까지 기존14항목의 국내 유통 검증 완료를 주장하지 않음.
3. 지피·소형 덩굴·브로멜리아, 이후 모든 동물/식물 대기 분기. 이전 꿈속의 자연28상품·이끼상점36옵션 기록은 해당 범위에만 적용.
4. 기존 항목의 사진 권리/실물 일치·성체 크기·종별 관리·단위별 가격을 각각 조사. 이번 신규1항목 추가로 기존 부족 정보의 전수 심화가 완료된 것은 아님.

집계 재현: `node -e "const fs=require('fs'); for(const f of ['species','plants']) { const a=JSON.parse(fs.readFileSync('dist/'+f+'.json')); console.log(f,a.length); }"`. 화면 분기 집계는 `VivaCatalog.createModel(animals,plants,morphs).nodes`의 고유 하위 항목 수를 사용한다.

## 후속 추가: 익스판서스

기존 보류 후보에서 species-339 / Porcellio expansus를 추가했다. ITIS596345·GBIF taxon/4LW72로 종명, 플랜티멀848의 검색 색인으로 국내 유통을 대조했다. 상세 재접근은 cache miss여서 판매 단위·현재 재고·가격은 새로 입력하지 않았다. 성체 약3~4cm와 건조 표면/촉촉한 피난처/강한 환기는 https://academy.herpeton.net/en/caresheets/invertebrates/porcellio-expansus/ 자료를 참고했다. 사진·인기는 미확인으로 유지. 총 동물339·식물186=525항목이다. 기존 보류74상품 전체 처리 완료를 뜻하지 않는다.

## 후속 정화생물 배치 — 종별 판정

동물345·식물186=531항목. species-340 볼리바리(ITIS596293)는 국내 상품919의 Porcellio ornatus bolivari와 표기 충돌로 상품 연결을 보류했다. 그라눌라툼341, 오피시날리스342, 무리카툼343, 매그니피쿠스344, 워너리345를 추가했다. 사진·인기는 미확인 유지. 무리카툼 크기는 자료 상충으로 비웠다.

|항목|학명 근거|국내 상품|관리·크기 근거|
|---|---|---|---|
|341 Armadillidium granulatum|https://itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=594342|플랜티멀829 나란지토|https://academy.herpeton.net/en/caresheets/invertebrates/armadillidium-granulatum/|
|342 Armadillo officinalis|ITIS594523|플랜티멀854 달마시안|https://www.geckonia.eu/en/p/armadillo-officinalis|
|343 Cristarmadillidium muricatum|NCBI2876739; FWS/ITIS594901|플랜티멀905|https://thespidershop.co.uk/product/cristarmadillidium-muricatum/ ; 크기 자료별0.5~1cm 차이, 수치 입력 보류|
|344 Porcellio magnificus|ITIS596421|플랜티멀904: sp. 포함 불완전 표기, 종 연결 보류|https://www.porcellio.nl/_downloads/d2cdeb36a8bf6ca82ada2945ddb41dee ; https://scuttleandsqueak.com/care-guides/isopods/porcellio-magnificus|
|345 Porcellio werneri|ITIS596545; GBIF4LWGW|플랜티멀880 실버백|https://academy.herpeton.net/en/caresheets/invertebrates/porcellio-werneri/|

톡토기 후속: 렙틸리아 canonical /category/스프링테일톡톡이/716/ 공개 목록1상품·1페이지 확인. 상품1044는 학명 미표기로 기존14종 연결 보류. 워터테일 /insects 총수·페이지 비노출 유지. 플랜티멀 /category/먹이/50/는 표시87상품·3페이지 중1페이지40상품만 확인, 나머지47상품 및 생먹이102 접근 실패. 드워프화이트964는 등각류이며 톡토기로 중복 추가하지 않는다.

플랜티멀 등각류 목록 캐시에서24건/56건이 다르게 나타나므로 이전95상품 대조 기록을 새 전수 완료로 덮어쓰지 않는다. 상품별 후속 판정과 원 조사 분모를 구분한다.

## 후속 정화생물 배치2

346바디움,347바에티센시스,348석신크투스,349플라보스쿠타툼,350하우세니,351넵튜너스공노래기를 추가했다. 학명·국내 판매명 충돌/상세 접근 실패 항목346·348·350은 종 일치 미확정으로 유지한다. 가격은 개체 수 미확인이라 추가하지 않았다.

- 바디움: ITIS594285; 국내777은 Cubaris와 Armadillidium 혼재, 크기 사육자료1~1.5cm와15~20mm 상충으로 미입력. 관리 https://academy.herpeton.net/en/caresheets/invertebrates/armadillidium-badium/ .
- 바에티센시스: https://graellsia.revistas.csic.es/index.php/graellsia/article/download/666/962 및 https://isopods.nhm.org/pdfs/27577/27577.pdf ; ITIS597977은 옛 아종명을 유지하므로 ITIS 종 지위 확인으로 쓰지 않는다. 국내910 판매학명 일치. 관리 https://academy.herpeton.net/en/caresheets/invertebrates/porcellio-baeticensis/ .
- 석신크투스: ITIS596519; https://www.porcellio.nl/_downloads/54dab6333467771facbf2e693e71067a 몸길이 수컷25mm, 꼬리다리 포함35mm를 구별. 국내896 상세 접근 실패. 관리 https://academy.herpeton.net/ro/ingrijire/nevertebrate/porcellio-succinctus/ .
- 플라보스쿠타툼: ITIS594328; https://exuvium.net/wp-content/uploads/2023/04/revision-of-the-armadillidium-klugii-group-stuttgarter-beitraege-naturkunde_ns_6_a_0001-0012.pdf 표본 최대15mm; 국내877 레드헤드 학명 확인. 커피메이트804는 상세 미확인으로 자동 연결하지 않았다. 관리 https://academy.herpeton.net/en/factsheets/invertebrates/armadillidium-flavoscutatum/ .
- 하우세니: ITIS594344; https://www.porcellio.nl/_downloads/d66be956894341e0b6ec464a3bbff9d8 표본 최대14mm. 국내815 상세 실패. 일부 사육 기록15~20mm와 차이 보존. P.haasi로 연결하지 않았다. 관리 https://xoticbugs.com/pages/armadillidium-hauseni-triceratops-isopod-care 및 https://www.isopodsmania.fr/product-page/armadillidium-hauseni-lot-de-5 .
- 넵튜너스: 국내 플랜티멀737 학명 Zoosphaerium neptunus; https://tb.plazi.org/GgServer/html/03FFBE1DFFFD735E32FAFEC1E69BFD9D/2 및 https://zoologicalbulletin.de/BzB_Volumes/BzM_63/BzM_63.pdf ; https://zoomuziejus.lt/en/cpt-news/new-exhibit-the-millipede-zoosphaerium-neptunus/ 암컷90mm·수컷45mm, 습윤 낙엽층·분해식물 먹이·사육 먹이 적응 문제.

플랜티멀 절지류47는21상품·1페이지, 밀리패드84는8상품·1페이지를 확인했다. 동일8노래기 후보는 넵튜너스 외7유통명 보류. 등각류85에서 이관된826러버더키는 학명 없음,806쿠키앤크림/798타이화이트헤드는 상세 접근 실패. 해외 유사상품의 Hyleoglomeris/Zephronia 표기를 국내 상품의 학명으로 대체하지 않는다.

## 후속 정화생물 배치3 — 이름 혼동 분리

352알보마지나툼(Armadillidium albomarginatum),353트릴로바투스(Trachelipus trilobatus),354코카시우스(Trachelipus caucasius),355인카누스(Porcellio incanus),356프론테트리앙굴룸(Armadillidium frontetriangulum),357니클레시(Porcellio nicklesi)를 종 참고항목으로 추가했다. 국내 판매 상세 접근 실패·동정 문제로 모두 국내 종 일치 미확정이며 가격 연결을 만들지 않았다.

- 알보마지나툼: Schmalfuss2003 https://www.porcellio.nl/_downloads/873745a24252c52b51ae0d0e98a78bcd ; 국내771의 Armadillidium과 별개 Armadillo albomarginatus(ITIS594477)를 합치지 않는다. 관리 https://xoticbugs.com/pages/armadillidium-albomarginatum-isopod-care ; 크기 미확인.
- 트릴로바투스: GBIF57NNB; https://www.porcellio.nl/_downloads/c7092a7fc952a248e28721e3f0163b34 표본 수컷11~18mm·암컷12~19mm; https://studiabiologia.reviste.ubbcluj.ro/index.php/studiabio/issue/download/8/53 생태. 국내775. 관리 https://academy.herpeton.net/en/caresheets/invertebrates/trachelipus-trilobatus/ .
- 코카시우스: https://www.zobodat.at/pdf/Stuttgarter-Beitraege-Naturkunde_NS_8_A_0009-0020.pdf 표본 최대20mm·습윤 숲; 국내더쥬12642. 관리 https://postpods.co.uk/blogs/isopods-useful-articles/trachelipus-isopod-care-guide . Porcellio로 연결하지 않는다.
- 인카누스: ITIS596388; https://www.caib.es/sites/proteccioespecies/ca/d/porcellio_incanus_balears_bioatles_2013-75723/ ; 국내더쥬12649. 관리 https://insektenliebe.com/en/shop/product/porcellio-incanus/ ; 크기 단위 미확인 자료 제외.
- 프론테트리앙굴룸: ITIS594331; 국내더쥬12660. https://www.podhausllc.com/product-page/armadillidium-frontetriangulum-orange-corfu 관리; https://www.ridgewayfrozen.co.uk/product/armadillidium-frontetriangulum-corfu-painted-isopod-tub-of-10/ 성체 참고1.8cm. Porcellio가 아닌 Armadillidium.
- 니클레시: ITIS596441; 국내더쥬12661는 nicklessi(Tang) 철자. https://backoffice.biblio.ugent.be/download/01JK9H1A3DJCMXA1JGB8EQJADP/01JPMCDQNH67PPCEA6VB2W53MC 유통 오동정 문제; https://academy.herpeton.net/en/caresheets/invertebrates/porcellio-nicklesi/ 참고관리. 유통형 Tang을 종 동정 근거로 쓰지 않는다.

## 우선순위 조정·식물 후속

사용자 지시로 달팽이·육지소라게의 추가 심화는 낮은 우선순위로 미룬다. 정글플랜트·지피·덩굴 및 게코·개구리 등 주요 동물 보강을 우선한다. 기존 항목과 조사자료는 보존한다.

식물187실버차미 아이비는 티쭈2524 판매학명·Kew90723-1·NC State 자료,188코도난테 그라실리스는 티쭈3143 공식목록·Kew378723-1·NParks6107,189그래미니폴리아 귀개는 오쿠아4672 판매명·Kew526792-1·Tropica4480을 대조했다. 189는 국내 종 일치 미확정, 포장컵 크기를 성숙 크기로 쓰지 않았다. 188의200cm는 줄기 길이이며 잎크기가 아니다.

190에피스키아 핑크스모크는 품종·교잡 유통형으로 추가했다. https://hgic.clemson.edu/factsheet/flame-violets-episcia-spp-indoor-care-growing-tips-plant-guide/ 및 https://gesneriadsociety.org/wp-content/uploads/2014/03/Gesneriads2013Q4HD.pdf 로 품종명 확인. 국내 플랜티멀522는 목록 판매명 확인·상세 재접근 실패, 가격·사진·성숙 최대크기는 미확인 유지. E.cupreata로 학명을 추정하지 않는다.

식물191 Marcgravia sp. Colombia와192 Pilea sp. 브론즈 실버트리는 국내 판매명 보존을 위한 미확정 유통형이다. 플랜티멀571/519 상세 접근 실패로 기존 종·품종과 합치지 않았고 가격·크기·사진은 미입력. 속/재배 참고: https://www.naturalhistory.si.edu/sites/default/files/media/file/marcgraviaceae.pdf , https://glassboxtropicals.com/marcgravia-sp-colombia/ , https://www.rhs.org.uk/plants/42765/pilea-silver-tree/details , https://www.rhs.org.uk/plants/pilea/how-to-grow-pilea . 해외 같은 유통형명 자료가 국내 동일 계통을 증명하지 않음을 care에 명시했다.
크기 분류 국소 수정: 잎 길이만 확인된 식물은 전체 크기 소/중/대 분류에 사용하지 않고 미확인으로 남긴다. 원래 크기·측정 부위는 상세에 보존한다. 국소 회귀 검사 통과.

식물193피막이(Hydrocotyle sibthorpioides),194호자덩굴(Mitchella undulata)은 공식 국명·학명과 원예/식물지 자료로 종 참고항목을 추가했다. 국내4306/4661 판매명은 확인했으나 종 일치는 미확정으로 유지하고 가격을 연결하지 않았다. 피막이: https://species.nibr.go.kr/html/home/nibr_qr_code_plant.pdf , https://powo.science.kew.org/taxon/843698-1 , https://www.rhs.org.uk/plants/143295/hydrocotyle-sibthorpioides/details . 호자덩굴: https://www.forest.go.kr/kna/special/download/English_Names_for_Korean_Native_Plants.pdf , https://www.efloras.org/florataxon.aspx?flora_id=2&taxon_id=242332827 . 측정 부위(높이/포복줄기)와 옆으로 퍼지는 범위를 구별했다. 이전192식물 전체 보존·새 ID중복·측정부위·미집계값 국소 검사 통과.

195네오레겔리아 Fireball은 https://www.rhs.org.uk/plants/80504/neoregelia-fireball/details 의 accepted 품종·로제트 약30cm·밝은 여과광·배수/컵 급수 자료를 반영했다. 국내 판매 근거가 없어 해외 원예 자료로 유지, 구매처를 만들지 않았다. 196Dischidia ovata는 https://www.nparks.gov.sg/florafaunaweb/flora/5/2/5219 의 착생 덩굴·반그늘·적당한 급수, https://www.poetrygarden.co.kr/shop_view/?idx=174 국내 판매 학명 색인을 대조했다. 국내 상세403으로 규격·가격·현재 재고는 미확인. NParks 사진 재사용 권한은 확보하지 않아 사진 미입력. 기존194식물 보존·새 ID·인기/가격/사진 국소 검사 통과.

## 기존 주요 동물 관리 설명 보강

Correlophus ciliatus와 Eublepharis macularius의 careNote를 종별로 보강했다. 수목/지상 생활, 습윤 후 건조·환기 또는 건조 환경과 습윤 은신처, 급이·UVB/열 구역을 구분했다. 정밀 수치·보충제 용량은 추가하지 않았다. 근거 https://reptifiles.com/crested-gecko/care-guide , https://reptifiles.com/crested-gecko/care-guide/crested-gecko-temperatures-humidity , https://reptifiles.com/crested-gecko/care-guide/crested-gecko-food , https://reptifiles.com/leopard-gecko/care-guide , https://reptifiles.com/leopard-gecko/care-guide/leopard-gecko-lighting-heating-humidity , https://reptifiles.com/leopard-gecko/care-guide/leopard-gecko-food . careNote 외 모든 동물 필드·사진·인기·가격 보존 국소 비교 통과.

화이트트리프로그(Litoria caerulea 기존 ID 유지)의 종별 careNote를 보강했다. https://treeoflifeexotics.vet/education-resource-center/for-clients/amphibians/white-s-tree-frog-care 의 수목 공간·분무 사이 건조·환기·얕은 물·다양한 먹이 설명을 참고했다. 서로 다른 사육자료의 습도 수치를 평균내지 않았고 수치·의약품·용량은 입력하지 않았다. 기존 학명은 이번 관리 설명 배치에서 변경하지 않았다. careNote 외 동물 데이터 보존 국소 비교 통과.

가고일게코·리키에너스게코의 careNote를 종별 보강했다. 가고일: https://reptifiles.com/gargoyle-gecko/care-guide 및 https://reptifiles.com/gargoyle-gecko/care-guide/gargoyle-gecko-temperatures-humidity 의 수목·야간활동·습도 변동·환기, 요약/상세의 서로 다른 수치 범위를 합치지 않았다. 리키에너스: https://reptilesmagazine.com/the-care-and-breeding-of-rhacodactylus-leachianus/ (직접15년 사육자의 기록), 무거운 몸을 지탱할 구조·건습 은신처·식재/청소 부담을 반영했다. 저자의 특정 합사·유아식·핑키급이 관행을 일반 권고로 옮기지 않았고, 본문에 남아 있는 옛 분류표기도 기존 학명에 적용하지 않았다. careNote 외 동물 필드 보존 국소 검사 통과.

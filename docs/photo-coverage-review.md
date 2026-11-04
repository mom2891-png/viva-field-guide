# 사진 보강·미확보 장부

## 2026-11-05 전체 사진 공개 포함 승인 — 배포 묶음

사용자가 “일반 사진도 출처·미확인 표시로 포함”을 명시 승인했다. 대표660/660·동물 모프100/100·식물 하위형28/28, 총788자리의 정적 파일을 이번 공개 배포에 포함한다. 재게시 조건 미확인141장의 저작자·원본·미확인 표시를 유지하며, 사용자 승인 자체를 저작권자의 이용허락으로 표기하지 않는다. 복합 모프·동명 유통품의 정체 한계도 유지한다.

이번 승인으로 아래 이전의 공개 포함 범위 답변 대기는 해소됐다. 저장소 밖 개인 서버 없이 사진이 표시되도록 images/ 파일을 묶었다. GitHub Actions 및 실제 공개 응답 확인 결과는 이번 작업 최종 보고를 따른다. 전체 수형 사진 미확보와 실제 화면 QA 미완료는 사진 슬롯 충원과 별개로 남긴다.


## 2026-11-05 참고 사진 승인 반영 — 최신 현황

- 동물362·식물298 = **660항목**. 로컬 개인 검토 사진 연결: 대표 **660/660**, 동물 모프·지역형 **100/100**, 식물 하위형 **28/28**, 총 **788/788자리**. 시작676자리 대비112자리 증가. 사진 연결률이며 정확한 종/클론 동정·전신 확보·재게시 권리 확인 완료율이 아니다.
- 사용자 추가 승인: 복합 모프는 실제 조합명을, 동명 유통품은 동일 종/클론 미확인 문구를 사진 옆에 표시. 윗블릿은 Hypo+Witblits, 패러독스는 Albino+Paradox 참고. 별도 기록한 대표 참고7개는 바이컬러뱀파이어크랩·파게르린디·필름고사리·미니 필로덴드론·셀레지넬라·애기석위·머릴아이. Mini Santiago/South Sumatra 등 원래 판매명도 노출하며 국내 판매형과 동일하다고 주장하지 않음. 머릴아이는 꽃·줄기 부분 참고여서 전체 수형 사진 확보는 남음. 이9자리는 정확한 단독 대상 사진 확보 수에 합산하지 않음. 다른 기존 사진도 별도 동정 검증 없이 정확사진으로 재집계하지 않음.
- 신규 이끼·태류10(plant-289~298) 추가, 총95항목. 위핑·타이완·모노솔레니움·스트링기·Taxiphyllum taxirameum 및 Flame/Spiky/열대 유통형. Fissidens B/C/D는 한 미확정 항목 아래3형으로 분리, 3종으로 세지 않음. 국내 후보8건은4취급 근거 연결·4중복/다른 분류군/동정 부족 처리. 국내 신규8종을 억지로 채우지 않음.
- 야쿠시마는 근거 없는 종명을 보존 별칭으로 옮기고 Saxifraga sp. “Yakushima” 유통명으로 교정. 기존 ID·이름·가격·크기·인기·기존 사진 보존 대조 통과. Lepanthes calodictyon f. ivanoflava는 Kew 동의어 확인; 별도 종 추가하지 않음.
- 검증: 이 배치 코드·데이터의 npm run check 1회 통과(660항목·1199목차 노드). 최종 로컬 응답 사진788자리, 로컬 이미지141개 HTTP200, 기존 필드 보존·7참고 및2복합 문구 연결 국소 검사 통과. 사진마다 전체 검사 반복하지 않음.
- 실제 화면 QA는 Work 설정의 브라우저 제어 비활성으로 미완료. 원본 이미지는 contact sheet/개별 확인. 로고·글씨·잘린 동물 후보 제외. 공개 업로드·GitHub push·배포 미실행.
- 개인 검토: http://127.0.0.1:8421/ . 사진은 저장소 밖 viva-research/photo-2026-11-04/private-overlay.json 및 원본 파일에 있음. private-preview.mjs로 제공. plan-execution-overlay.json도 최신화. GitHub만 복제해도 개인 사진이 복원되는 것은 아님.

아래 이전 수치는 당시 기록이며 최신 현황은 이 절을 따른다. 빈 슬롯 충원은 완료했으나 정확한 단독/판매형 사진 보강, 전체 수형 사진, 권리 확인, 화면 QA는 구별해 남긴다.


## 2026-11-05 계획 실행 현황 (최신 로컬)

- 승인된 사진·식물 하위형·이끼 확장 계획 실행. 신규 이끼40(plant-249~288), 식물 하위형4(아우레아·나나·마블퀸·네온) 추가. 동물362+식물288=650항목. 이끼·태류45→85(선류77·태류8).
- 로컬 개인 검토 사진: 대표642/650, 동물 하위형96/100, 식물 하위형25/25. 시작676자리 확보→763자리 확보, **87장 증가**. 기존 빈55자리 중43충원; 신규 이끼40·신규 하위형4 포함. 기존21식물 하위형은 모두 별도 사진 연결.
- 대표8·동물 모프4=12자리 미확보. [남은 전체 목록과 사유](remaining-photo-slots.md). 다른 종/복합 모프, 포스터, 워터마크, 프레임 밖으로 잘린 전신 사진을 임의로 채택하지 않음. 판매자 연락·유료 의뢰 미실행.
- 기존248식물 입력 명칭·별칭·하위형·독립 행 대조. [입력 대조 장부](plant-subtype-audit.md). 전체 세계 품종의 외부 전수 조사가 아님. f. ivanoflava 지위 확인 보류.
- 선류/태류 공식 목차, 이끼 환경5종·형태6종의 독립 필터 추가. 이끼류/양치식물 표기로 미분류에 빠졌던247·248/246 경로 수정. 실제 항목 없는 뿔이끼는 노출하지 않음.
- [이끼 확장 근거](moss-expansion-notes.md). 신규40사진 중38은 공개 이용 조건 확인,2는 개인 검토 전용. NC29장은 비영리 조건 노출·상업화 전 재검토 목록 추가. 국내 신규8·열대 착생형/태류6이라는 조사 구성 목표와 열대 범위 보강은 미충족으로 보존.
- 검증: 수정 후 npm run check 통과(650항목·1184목차 노드), 새 환경/형태 교차 필터·검색·카운트 검사 포함. 시작 스냅샷과 기존 사진/ID/이름/학명/가격/크기/인기 필드 보존 대조 통과. 로컬 사진120개 HTTP200. 최초 검사에서 NC 조건 표시 누락29건을 찾아 note 추가 후 통과. 사진별로 전체 검사를 반복하지 않음.
- 브라우저 직접 제어가 비활성 상태여서 실제 화면 최종 검수는 미완료. 원본 사진은 로컬 contact sheet/개별 이미지로 확인했으며 화면 QA와 구별.
- 공개 업로드·배포·커밋 없음. HEAD95e3c0fa0253a5ef7f264269523932a3cf490eec 유지. 브랜치 codex/purchase-review-price-expansion의 미커밋 작업 보존.
- 개인 화면 http://127.0.0.1:8421/ 새로고침. 사진 주입 서버와 미확인 원본은 checkout 밖 C:/Users/Admin/Desktop/viva-research/photo-2026-11-04. private-preview.mjs, private-overlay.json, fittonia-candidates.json, plant-form-overlay.json, review-*.jpg를 함께 보존해야 함. plan-execution-overlay.json은 최신 overlay 복구본. 기존 build-overlay.mjs 재실행 전 이 복구본과 새 이끼/모프 사진을 병합해야 하며 덮어쓰지 말 것.
- 전체 계획 미완료: 남은12사진, 열대·국내 유통 이끼 공백, 실제 화면 QA. 완수 또는 사용자 지시 없이 이를 완료 처리하지 말 것.


## 2026-11-04 빈 사진 충원·식물 품종 사진 분리 (최신 로컬)

- 최신 승인: 기존 사진 교체 중단, 빈 동물 모프/지역형·식물/이끼 사진 채우기와 신규 식물/이끼 추가. 신규 사진은 글씨·로고·워터마크 없음. 케어시트·업로드·배포 제외.
- 피토니아 화이트스타/레드스타가 종 대표 사진을 공유하던 처리를 수정. selectedPhoto가 varietyIndex와 varietyPhotos를 해석하고 식물 상세에도 적용. 미확보 품종은 종 대표 사진을 대신 표시하지 않음. 품종 문자열·ID·종수 유지. 개인 검토 사진은 checkout 밖 private-preview.mjs에서 주입; 공개용 plants.json에 미확인 판매 사진을 입력하지 않음.
- 신규 plant-246 콩짜개덩굴(Lepisorus microphyllus; Lemmaphyllum microphyllum 이명), plant-247 Plagiomnium affine, plant-248 Exsertotheca crispa(Neckera crispa 이명). 일반 실물 사진과 저자/라이선스 포함. 두 이끼의 온대·배수 조건을 보존, 고온 밀폐 열대 적합성 보장 안 함. 가격·인기·크기 추정 없음.
- 빈 모프 사진4: 파우더블루, 스케이버 달마시안/스패니시오렌지, 불가레 오렌지비거. 로컬 개인 검토 화면에 글씨 없는 원본 적용.
- 현재 로컬 개인 검토: 동물362+식물248=610, 대표599/610, 동물 모프75/100, 피토니아 품종2/4. 종 대표/모프/식물 품종 사진 집계 분리. 기존 사진을 글씨 기준으로 제외했던 이전 작업으로 생긴 빈칸도 현재 미확보에 포함하며 최신 지시 이후 기존 사진은 변경 없음.
- 검증: npm run check 통과(610항목 탐색/검색/필터/라우트 및 식물 품종별 이미지·미확보 대체 방지). HTTP로 로컬 품종 사진 두 장 확인. 승인 시작 스냅샷과 기존 표시 사진 URL 전체 불변 확인. 브라우저 실제 화면 검수 미완료.
- 로컬 검토 http://127.0.0.1:8421/ 는 Desktop/viva-research/photo-2026-11-04/private-preview.mjs 실행 필요. 원본·overlay·품종 사진과 후보 장부는 checkout 밖. GitHub push/main/공개 배포 없음.


## 최신 후속 — 2026-11-04 생체 사진16·제주애기모람 교정

- 대표 사진519→535, 미확보88→72(동물20/식물52). 항목607/모프 사진7 유지. 야생 research 관찰 외 재배·사육/일반 관찰까지 조사했으며 관찰 등급·사진 동정 한계를 보존한다. 해당 종/사진별 CC BY·CC BY-SA·CC0 조건과 원본 미리보기 육안 검수. 분류 확인을 유전자/표본 동정 완료로 주장하지 않음.

|ID|반영|원본|
|---|---|---|
|species-259|Sinella curviseta · 관찰 needs_id|[사진 29816152](https://www.inaturalist.org/photos/29816152)|
|species-210|Paroedura vazimba · 관찰 needs_id|[사진 188597373](https://www.inaturalist.org/photos/188597373)|
|species-261|Entomobryoides purpurascens · 관찰 needs_id|[사진 198588235](https://www.inaturalist.org/photos/198588235)|
|species-278|Porcellionides floria · 관찰 needs_id|[사진 255145669](https://www.inaturalist.org/photos/255145669)|
|plant-26|Neoregelia tigrina · 관찰 casual|[사진 417396004](https://www.inaturalist.org/photos/417396004)|
|plant-73|Begonia ningmingensis · 관찰 casual|[사진 529894907](https://www.inaturalist.org/photos/529894907)|
|plant-117|Fissidens nobilis · 관찰 needs_id|[사진 347317518](https://www.inaturalist.org/photos/347317518)|
|plant-124|Thamnobryum plicatulum · 관찰 needs_id|[사진 344849867](https://www.inaturalist.org/photos/344849867)|
|plant-147|Microsorum musifolium · 관찰 casual|[사진 611678759](https://www.inaturalist.org/photos/611678759)|
|plant-148|Davallia solida · 관찰 needs_id|[사진 758235813](https://www.inaturalist.org/photos/758235813)|
|plant-150|Phalaenopsis parishii · 관찰 casual|[사진 624794052](https://www.inaturalist.org/photos/624794052)|
|plant-158|Asplenium sarelii · 관찰 needs_id|[사진 1292135](https://www.inaturalist.org/photos/1292135)|
|plant-163|Selliguea rhynchophylla · 관찰 needs_id|[사진 652951706](https://www.inaturalist.org/photos/652951706)|
|plant-166|Davallia parvula · 관찰 casual|[사진 656086889](https://www.inaturalist.org/photos/656086889)|
|plant-204|Selaginella picta · 관찰 casual|[사진 656086206](https://www.inaturalist.org/photos/656086206)|
|plant-195|Neoregelia 'Fireball' · 원본 품종명 명시|[Alphama · CC BY4.0](https://commons.wikimedia.org/wiki/File:Neoregelia_%27Fireball%27.jpg)|

제주애기모람 plant-64 대표 사진 교체: [Ficus thunbergii 유년형](https://commons.wikimedia.org/wiki/File:Juvenile_Ficus_thunbergii_covering_the_surface_of_the_tree_trunk_1.jpg), M108t·CC BY4.0. 기존 큰 잎 가지 사진460358714는 원본403으로 동정 재확인 불가하여 모람 오동정으로 단정하지 않는다. 기존 학명·가격·ID 유지. [국립수목원 상담3207561](https://kna.forest.go.kr/kfsweb/cop/bbs/selectBoardArticle.do?bbsId=BBSMSTR_1109&nttId=3207561)은 검색 색인에서 제주애기모람의 유년상 유통/이름 혼용 설명 확인·본문 직접 접근 실패. [Shimomura1984](https://doi.org/10.5632/jila1934.48.5_127)는 F. thunbergii와 F. pumila의 유년/성숙 이형엽, F. oxyphylla와의 차이 설명. 판매 개체의 동일성을 모두 확정하는 근거는 아님.

다른 출처 조사: GBIF 우선16종의 정확명 match와 발생기록12건/종에서 개별 media license를 대조. 남부화이트립파이톤은 fredparkeri로 처리되는 기록/장부 스캔, 나머지 베고니아/보석란 등은 건조표본·게코는 박물관 자료가 포함되어 생체 사진으로 자동 입력하지 않음. Kew/RBGE/Naturalis/NYBG/Yale 등 기관의 일반 라이선스를 다른 사진에 확대 적용하지 않는다. 남은72는 확보 미완료이며 완전 입력으로 주장하지 말 것. 원시 조회/사진과 남은 항목×기존 상품 링크×허락 필요 사유 CSV는 저장소 밖 viva-research/photo-2026-11-04에 보관. 허락 요청 메시지는 발송하지 않음.


## 최신 보강 — 2026-11-04 대표 사진21·모프 사진7

- 대표 사진498→519, 빈 사진109→88(동물24·식물64). 607항목 유지. 모프·패턴·지역형100개 중 사진0→7개이며 종 항목 수에 합산하지 않음. 기존 대표 사진·모프 설명·별칭·가격·크기·인기는 보존.
- 빈109개를 유형별 분류: 종74개는 iNaturalist 정확 학명 조회, 유통명/품종/속 수준35개는 별도 형태 일치가 필요해 종 사진 자동 대입 제외. 종74 중 정확명 미연결11, 사용 조건에 맞는 기본 사진9, 나머지54개의 공개 research 관찰 대조에서 후보12 확보. 원본 미리보기21장 육안 확인. 본문 페이지는 검색 도구에서 접근 실패했으며 공개 API의 사진별 저자·license_code·원본 식별자와 종명으로 확인했다. 커뮤니티 동정을 독립 실물 동정으로 주장하지 않는다.
- representative source는 iNaturalist(CC0/CC BY/CC BY-SA), 모프는 Commons(CC BY-SA). CC0/위키미디어로 출처를 제한하지 않음. Commons API는11번째 질의에서429, 즉시 중단; 남은 모프93개 전부의 외부 조사가 끝난 것은 아님. 판매업체 검색 결과의 사진 존재·일반 웹페이지 하단 라이선스를 개별 사진 재사용 허락으로 해석하지 않음.
- species-260은 현미경 전신 관찰, species-351은 방어 자세, plant-184/243/245는 꽃 중심, plant-237은 자연 서식 장면. 확대·관찰 각도 한계가 있으며 크기 측정/유전형 확인 자료로 쓰지 않는다.

### 이번 대표 사진

|ID|항목|원본·권리|
|---|---|---|
|plant-75|베고니아 프리스마토카르파|[CC BY-SA](https://www.inaturalist.org/photos/63394392)|
|plant-128|깃털이끼|[CC BY](https://www.inaturalist.org/photos/220120287)|
|plant-138|베르톨로니아 마르모라타|[CC BY](https://www.inaturalist.org/photos/342404910)|
|plant-156|스트로빌란테스 렙탄스|[CC BY-SA](https://www.inaturalist.org/photos/245838361)|
|plant-184|탐라난|[CC BY](https://www.inaturalist.org/photos/571410708)|
|plant-224|모노레나 프리뮬리플로라|[CC BY](https://www.inaturalist.org/photos/186633239)|
|plant-225|글록시넬라 린데니아나|[CC BY-SA](https://www.inaturalist.org/photos/464777191)|
|plant-243|에어랑기스 푼크타타|[CC0](https://www.inaturalist.org/photos/1533894)|
|plant-245|팔레놉시스 쉴레리아나|[CC BY](https://www.inaturalist.org/photos/289248027)|
|species-257|바일라스톡토기|[CC BY](https://www.inaturalist.org/photos/724667107)|
|species-260|동굴구형톡토기|[CC BY-SA](https://www.inaturalist.org/photos/257381584)|
|species-263|소일톡토기|[CC BY](https://www.inaturalist.org/photos/723683527)|
|species-267|롤프시톡토기|[CC BY](https://www.inaturalist.org/photos/680946334)|
|species-351|넵튜너스공노래기|[CC BY](https://www.inaturalist.org/photos/531210858)|
|species-361|제노사우루스 그란디스|[CC BY](https://www.inaturalist.org/photos/308371086)|
|plant-165|솔라넘 울레넘|[CC BY](https://www.inaturalist.org/photos/252783198)|
|plant-176|비단이끼|[CC BY](https://www.inaturalist.org/photos/376584565)|
|plant-230|포토스 스칸덴스|[CC BY](https://www.inaturalist.org/photos/755923035)|
|plant-231|셀라기넬라 시아멘시스|[CC BY](https://www.inaturalist.org/photos/630196465)|
|plant-237|브리세아 라시나에|[CC BY](https://www.inaturalist.org/photos/627314826)|
|plant-244|레판테스 칼로딕티온|[CC BY](https://www.inaturalist.org/photos/508116632)|

### 이번 모프·지역형 사진

|부모ID|형태|원본·권리|
|---|---|---|
|species-1|릴리화이트|[CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File%3ACrested%20gecko-mars.jpg)|
|species-1|할리퀸|[CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File%3ACrested%20gecko%20juvenile.jpg)|
|species-1|익스트림 할리퀸|[CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File%3ALil%20B%20the%20Crested%20Gecko.jpg)|
|species-13|블리자드|[CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File%3AEublepharis%20macularius%20-%20Blizzard.JPG)|
|species-97|암빌로비|[CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File%3AAmbilobe%20panther%20chameleon.jpg)|
|species-129|아멜·알비노|[CC BY-SA 2.0](https://commons.wikimedia.org/wiki/File%3APantherophis%20guttatus%20(48325672551).jpg)|
|species-129|애너리|[CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File%3AAnerycorn.JPG)|

릴리화이트는 원본 구조화 캡션, 할리퀸/익스트림 할리퀸·블리자드·아멜·애너리·암빌로비는 원본 설명에서 해당 형태 명시 확인. 작성자 설명을 혈통/유전자 검사 보증으로 취급하지 않는다. 사진을 서로 다른 유전형 증명으로 재사용하지 않으며 조합형 사진을 부모 모프의 단독 예시로 넣지 않는다.

추가 탐색: Openverse의 Flickr 조회는401(인증 필요)로 중단, 인증 생성/토큰 요청/우회 없음. 개별 Flickr·전문 자료 검색에서 모프명이 없는 알비노 사진은 트렘퍼/벨/레인워터에 임의 배정하지 않음. [유전 모프 연구 후보](https://pmc.ncbi.nlm.nih.gov/articles/PMC12774848/)는 원문 접근 확인 화면으로 사진/개별 권리 검증 불가, 미사용. [Goniurosaurus 연구 PDF](https://www.amphibian-reptile-conservation.org/pdfs/Volume/Vol_13_no_2/ARC_13_2_%5BGeneral_Section%5D_1-13_e183.pdf)는 접근 실패, 검색 요약만으로 다른 종 패널을 대입하지 않음.

### 남은 대표 사진88

|ID|항목|최소 확인 자료·보류 사유|
|---|---|---|
|species-151|남부화이트립파이톤|정확 학명 연결 실패. 유사 검색 결과를 임의 대입하지 않음|
|species-177|미니모시프로그|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/26634)|
|species-199|라오스뉴트|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/135109)|
|species-207|아라네우스 케이브게코|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/34560)|
|species-210|바짐바 그라운드게코|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/34091)|
|species-236|멕시칸블랙킹|정확 학명 연결 실패. 유사 검색 결과를 임의 대입하지 않음|
|species-255|옐로톡토기|정확 학명 연결 실패. 유사 검색 결과를 임의 대입하지 않음|
|species-259|커비세타톡토기|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/261806)|
|species-261|우드러너톡토기|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/477297)|
|species-278|플로리아등각류|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/425067)|
|species-287|센트로볼루스 리카르디|정확 학명 연결 실패. 유사 검색 결과를 임의 대입하지 않음|
|species-308|호프만세기등각류|정확 학명 연결 실패. 유사 검색 결과를 임의 대입하지 않음|
|species-311|러버더키등각류|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|species-312|판다킹등각류|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|species-313|엠버비등각류|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|species-318|바이컬러뱀파이어크랩|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/805434)|
|species-340|볼리바리등각류|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1121300)|
|species-344|매그니피쿠스등각류|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/891779)|
|species-345|워너리등각류|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/910777)|
|species-349|플라보스쿠타툼공벌레|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1619012)|
|species-350|하우세니공벌레|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/941684)|
|species-352|알보마지나툼공벌레|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1688970)|
|species-353|트릴로바투스등각류|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1125292)|
|species-357|니클레시등각류|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1121301)|
|plant-25|네오레겔리아 푼크타티시마|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1405785)|
|plant-26|네오레겔리아 티그리나|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/898425)|
|plant-70|베고니아 리케노라|정확 학명 연결 실패. 유사 검색 결과를 임의 대입하지 않음|
|plant-71|베고니아 루조넨시스|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1048351)|
|plant-73|베고니아 닝밍엔시스|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1094399)|
|plant-74|베고니아 페라켄시스|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1603891)|
|plant-76|베고니아 프테리디포르미스|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1415094)|
|plant-88|페페로미아 파게르린디|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/441887)|
|plant-98|피레아 글라우카 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-117|봉황이끼|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1340109)|
|plant-124|그늘대호꼬리이끼|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/907152)|
|plant-129|호마로메나 핑크벨벳|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-130|호마로메나 실버핑크 네로우리프|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-131|호마로메나 다크레드|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-132|라비시아 터틀|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-133|라비시아 플래티넘핑크|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-134|부세파란드라 케다강|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-135|부세파란드라 미니캐서린|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-136|부세파란드라 웨이비그린|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-137|소네릴라 그린스팟|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-140|아르고스템마 후케리|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1607995)|
|plant-143|비오피툼 에콰도르 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-147|크로커다일고사리|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/431312)|
|plant-148|토끼발고사리|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/425336)|
|plant-150|파리쉬호접란|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/710300)|
|plant-153|아노엑토칠루스 알볼리네아투스|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/567902)|
|plant-157|라비시아 터틀백 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-158|돌담고사리|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/138119)|
|plant-159|야쿠시마 바위취|정확 학명 연결 실패. 유사 검색 결과를 임의 대입하지 않음|
|plant-162|베트남 아르디시아 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-163|태국고란초|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/977023)|
|plant-164|피커스 슈마트라 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-166|다발리아 파풀라|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/427460)|
|plant-167|필름고사리 미확정 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-168|미니 필로덴드론 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-169|셀레지넬라 미확정 판매형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-170|테라토필럼 로툰디폴리아텀|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/426794)|
|plant-171|고란초|정확 학명 연결 실패. 유사 검색 결과를 임의 대입하지 않음|
|plant-172|애기석위 유통형 (학명 확인 필요)|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-177|부채괴불이끼|정확 학명 연결 실패. 유사 검색 결과를 임의 대입하지 않음|
|plant-178|애기수염이끼|정확 학명 연결 실패. 유사 검색 결과를 임의 대입하지 않음|
|plant-185|차걸이란|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/471207)|
|plant-186|덴드로비움 머릴아이 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-187|실버차미 아이비|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-190|에피스키아 핑크스모크|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-191|마르크그라비아 콜롬비아 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-192|필레아 브론즈 실버트리 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-195|네오레겔리아 파이어볼|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-197|페페로미아 메탈리카|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1025931)|
|plant-202|루엘리아 피쉬본 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-204|셀라기넬라 픽타|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/873228)|
|plant-209|서리이끼·양지이끼 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-218|텍타리아 힐로카르파|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1156946)|
|plant-219|소네릴라 칸토넨시스|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1146747)|
|plant-223|시서스 아마조니카 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-226|스키스마토글로티스 푸실라|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1569100)|
|plant-227|네오레겔리아 치키타 린다|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-228|네오레겔리아 푸니니|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-229|네오레겔리아 도미노|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-232|아르고스템마 비폴리움 부킷 라루트 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-235|블레크넘 옵투사툼|정확 학명 연결 실패. 유사 검색 결과를 임의 대입하지 않음|
|plant-238|트리코산테스 와우라에|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/1134944)|
|plant-240|라피도포라 테누이스 실버 유통형|전용 유통형/품종/속 수준 사진의 일치·사용 허락 미확인|
|plant-242|보석란 히스피다|사용 조건에 맞고 정확 종명으로 연결되는 기본/관찰 사진 미확보 · [taxon](https://www.inaturalist.org/taxa/948584)|

추가 외부 자료 확인(2026-11-04): [Begonia lichenora 판매 사진](https://borneoaquatic.com/product/begonia-sarawak/)은 재사용 허락 미확인. [RBG Victoria punctatissima](https://data.rbg.vic.gov.au/rbgcensus/census/taxon/71e3a454-21c7-4680-8a14-6de34e64f977)는 목록의 조건을 개별 사진 허락으로 일반화하지 않음. 원문/API/육안 검수용 사진은 저장소 밖 viva-research/photo-2026-11-04에 보관하며 공개 저장소에는 넣지 않음.


확인일:2026-11-04. 기존 사진447개에서 46개 추가해493개, 미입력144→98. 동물·식물591항목 유지. 이번은 대표 종 사진 보강이며 국내 판매 실물·모프·품종 사진 동정을 뜻하지 않는다.

Commons 신규 조회 중429가 발생해 중단했다. 기존 캐시와 iNaturalist 공개 API의 정확한 종명·research 관찰·사진별 CC0/CC BY/CC BY-SA를 대조하고 원본을 직접 열어 검수했다. 원문·작성자 계정·관찰 위치는 공개 조사 장부에 복제하지 않고 저장소 밖 research/photo-fill-2026-11-04/에 보관한다. 사진의 필수 저자·권리·원본 링크는 도감 credit에 보존한다. iNaturalist 동정은 오류 가능성이 있으며 검경·표본 재동정 완료를 의미하지 않는다.

## 추가 사진46

|ID|항목|사진 원본·권리|
|---|---|---|
|species-140|뷰티렛|[CC BY 3.0](https://commons.wikimedia.org/wiki/File:Orthriophis-taeniurus-sch%C3%B6nnatter.jpg)|
|species-244|라니토메야 플라보비타타|[CC BY](https://www.inaturalist.org/photos/340480358)|
|species-256|오렌지톡토기 유키아누라|[CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Yuukianura_Aphoruroides.jpg)|
|species-265|트로피컬핑크톡토기|[CC BY](https://www.inaturalist.org/photos/600855944)|
|species-266|바이올렛톡토기|[CC BY](https://www.inaturalist.org/photos/603046673)|
|species-309|오르나투스등각류|[CC BY](https://www.inaturalist.org/photos/721349940)|
|species-338|드워프화이트등각류|[CC BY-SA](https://www.inaturalist.org/photos/603417436)|
|species-339|익스판서스등각류|[CC BY](https://www.inaturalist.org/photos/662144624)|
|species-341|그라눌라툼공벌레|[CC BY](https://www.inaturalist.org/photos/757845014)|
|species-342|오피시날리스공벌레|[CC BY](https://www.inaturalist.org/photos/758413412)|
|species-343|무리카툼공벌레|[CC BY](https://www.inaturalist.org/photos/446028673)|
|species-346|바디움공벌레|[CC0](https://www.inaturalist.org/photos/753676522)|
|species-347|바에티센시스등각류|[CC BY](https://www.inaturalist.org/photos/653732225)|
|species-348|석신크투스등각류|[CC BY](https://www.inaturalist.org/photos/427270858)|
|species-354|코카시우스등각류|[CC BY](https://www.inaturalist.org/photos/399168554)|
|species-355|인카누스등각류|[CC BY](https://www.inaturalist.org/photos/746910446)|
|species-356|프론테트리앙굴룸공벌레|[CC BY](https://www.inaturalist.org/photos/387778255)|
|species-358|인도육지소라게|[CC BY](https://www.inaturalist.org/photos/754121960)|
|species-359|러그육지소라게|[CC0](https://www.inaturalist.org/photos/759377559)|
|species-360|바이오라센츠육지소라게|[CC BY](https://www.inaturalist.org/photos/746401786)|
|species-362|유러피안 글라스리자드|[CC BY](https://www.inaturalist.org/photos/754605585)|
|plant-31|아노엑토칠루스 록스버기|[CC BY](https://www.inaturalist.org/photos/618849401)|
|plant-80|베고니아 투리알바에|[CC BY](https://www.inaturalist.org/photos/698489168)|
|plant-86|피커스 바키니오이데스|[CC BY](https://www.inaturalist.org/photos/734145111)|
|plant-87|페페로미아 에마르지넬라|[CC BY](https://www.inaturalist.org/photos/714522933)|
|plant-90|페페로미아 자포니카|[CC BY](https://www.inaturalist.org/photos/687704788)|
|plant-141|미카니아 테르나타|[CC BY](https://www.inaturalist.org/photos/484266603)|
|plant-160|마르크그라비아 신테니시|[CC BY](https://www.inaturalist.org/photos/619413854)|
|plant-161|다발리아 앙구스타타|[CC BY](https://www.inaturalist.org/photos/269565639)|
|plant-173|개부처손|[CC BY](https://www.inaturalist.org/photos/583903829)|
|plant-174|애기일엽초|[CC0](https://www.inaturalist.org/photos/731231009)|
|plant-175|버들일엽초|[CC BY](https://www.inaturalist.org/photos/688400638)|
|plant-179|뱀톱|[CC BY](https://www.inaturalist.org/photos/732441740)|
|plant-180|넉줄고사리|[CC0](https://www.inaturalist.org/photos/132110679)|
|plant-181|버들참빗|[CC BY](https://www.inaturalist.org/photos/687027388)|
|plant-182|거미고사리|[CC0](https://www.inaturalist.org/photos/735199716)|
|plant-183|괴불이끼|[CC BY](https://www.inaturalist.org/photos/174686499)|
|plant-188|코도난테 그라실리스|[CC BY](https://www.inaturalist.org/photos/754223953)|
|plant-189|그래미니폴리아 귀개|[CC BY](https://www.inaturalist.org/photos/653790535)|
|plant-193|피막이|[CC BY](https://www.inaturalist.org/photos/757952650)|
|plant-194|호자덩굴|[CC BY](https://www.inaturalist.org/photos/744315774)|
|plant-196|디스키디아 오바타|[CC0](https://www.inaturalist.org/photos/112007166)|
|plant-198|디스키디아 누뮬라리아|[CC BY](https://www.inaturalist.org/photos/737293378)|
|plant-199|스킨답서스 트루비|[CC BY](https://www.inaturalist.org/photos/669961183)|
|plant-207|쥐꼬리이끼|[CC BY](https://www.inaturalist.org/photos/374050027)|
|plant-220|미크로그램마 텍타|[CC BY](https://www.inaturalist.org/photos/598216413)|

## 제외와 한계

- 비단이끼: 새 관찰 후보도 유럽 자료여서 최근 Leucobryum 재동정 문제 해결에 불충분. 기존 보류 유지.
- 동굴구형톡토기: 현미경 슬라이드 후보만 있어 대표 생체 사진에서 제외. 봉황·깃털이끼의 건조 표본과 분포 지도도 사용하지 않음.
- Solanum uleanum, Strobilanthes reptans, Pseudosinella rolfsi/violenta, Thalassaphorura encarpata, Xenosaurus grandis, Zoosphaerium neptunus: 후보가 있으나 흐림·가림·주체 크기·어둠 등 대표 사진 품질 문제로 보류. Monolena primuliflora 첫 후보는 열매 위주여서 전초 사진 보강 대기.
- 유통명·품종의 종 대표 사진 대체 금지. 아래 미확보는 이번 조회의 결과이며 인터넷 전체에 사진이 없다는 판정이 아니다. 이명·다른 언어·정확한 품종 사진과 촬영자 사용 허락으로 계속 확보할 수 있다.

## 남은98항목

|ID|항목|이번 상태|
|---|---|---|
|species-151|남부화이트립파이톤|정확한 종의 이용 가능한 후보 미확보|
|species-177|미니모시프로그|정확한 종의 이용 가능한 후보 미확보|
|species-199|라오스뉴트|정확한 종의 이용 가능한 후보 미확보|
|species-207|아라네우스 케이브게코|정확한 종의 이용 가능한 후보 미확보|
|species-210|바짐바 그라운드게코|정확한 종의 이용 가능한 후보 미확보|
|species-236|멕시칸블랙킹|정확한 종의 이용 가능한 후보 미확보|
|species-255|옐로톡토기|정확한 종의 이용 가능한 후보 미확보|
|species-257|바일라스톡토기|후보 있음 · 동정/사진 품질 추가 검수|
|species-259|커비세타톡토기|정확한 종의 이용 가능한 후보 미확보|
|species-260|동굴구형톡토기|후보 있음 · 동정/사진 품질 추가 검수|
|species-261|우드러너톡토기|정확한 종의 이용 가능한 후보 미확보|
|species-263|소일톡토기|후보 있음 · 동정/사진 품질 추가 검수|
|species-267|롤프시톡토기|후보 있음 · 동정/사진 품질 추가 검수|
|species-278|플로리아등각류|정확한 종의 이용 가능한 후보 미확보|
|species-287|센트로볼루스 리카르디|정확한 종의 이용 가능한 후보 미확보|
|species-308|호프만세기등각류|정확한 종의 이용 가능한 후보 미확보|
|species-311|러버더키등각류|유통형·품종 전용 사진 및 권리 확인 필요|
|species-312|판다킹등각류|유통형·품종 전용 사진 및 권리 확인 필요|
|species-313|엠버비등각류|유통형·품종 전용 사진 및 권리 확인 필요|
|species-318|바이컬러뱀파이어크랩|정확한 종의 이용 가능한 후보 미확보|
|species-340|볼리바리등각류|정확한 종의 이용 가능한 후보 미확보|
|species-344|매그니피쿠스등각류|정확한 종의 이용 가능한 후보 미확보|
|species-345|워너리등각류|정확한 종의 이용 가능한 후보 미확보|
|species-349|플라보스쿠타툼공벌레|정확한 종의 이용 가능한 후보 미확보|
|species-350|하우세니공벌레|정확한 종의 이용 가능한 후보 미확보|
|species-351|넵튜너스공노래기|후보 있음 · 동정/사진 품질 추가 검수|
|species-352|알보마지나툼공벌레|정확한 종의 이용 가능한 후보 미확보|
|species-353|트릴로바투스등각류|정확한 종의 이용 가능한 후보 미확보|
|species-357|니클레시등각류|정확한 종의 이용 가능한 후보 미확보|
|species-361|제노사우루스 그란디스|후보 있음 · 동정/사진 품질 추가 검수|
|plant-25|네오레겔리아 푼크타티시마|정확한 종의 이용 가능한 후보 미확보|
|plant-26|네오레겔리아 티그리나|정확한 종의 이용 가능한 후보 미확보|
|plant-70|베고니아 리케노라|정확한 종의 이용 가능한 후보 미확보|
|plant-71|베고니아 루조넨시스|정확한 종의 이용 가능한 후보 미확보|
|plant-73|베고니아 닝밍엔시스|정확한 종의 이용 가능한 후보 미확보|
|plant-74|베고니아 페라켄시스|정확한 종의 이용 가능한 후보 미확보|
|plant-75|베고니아 프리스마토카르파|정확한 종의 이용 가능한 후보 미확보|
|plant-76|베고니아 프테리디포르미스|정확한 종의 이용 가능한 후보 미확보|
|plant-88|페페로미아 파게르린디|정확한 종의 이용 가능한 후보 미확보|
|plant-98|피레아 글라우카 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-117|봉황이끼|정확한 종의 이용 가능한 후보 미확보|
|plant-124|그늘대호꼬리이끼|정확한 종의 이용 가능한 후보 미확보|
|plant-128|깃털이끼|정확한 종의 이용 가능한 후보 미확보|
|plant-129|호마로메나 핑크벨벳|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-130|호마로메나 실버핑크 네로우리프|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-131|호마로메나 다크레드|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-132|라비시아 터틀|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-133|라비시아 플래티넘핑크|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-134|부세파란드라 케다강|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-135|부세파란드라 미니캐서린|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-136|부세파란드라 웨이비그린|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-137|소네릴라 그린스팟|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-138|베르톨로니아 마르모라타|정확한 종의 이용 가능한 후보 미확보|
|plant-140|아르고스템마 후케리|정확한 종의 이용 가능한 후보 미확보|
|plant-143|비오피툼 에콰도르 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-147|크로커다일고사리|정확한 종의 이용 가능한 후보 미확보|
|plant-148|토끼발고사리|정확한 종의 이용 가능한 후보 미확보|
|plant-150|파리쉬호접란|정확한 종의 이용 가능한 후보 미확보|
|plant-153|아노엑토칠루스 알볼리네아투스|정확한 종의 이용 가능한 후보 미확보|
|plant-156|스트로빌란테스 렙탄스|후보 있음 · 동정/사진 품질 추가 검수|
|plant-157|라비시아 터틀백 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-158|돌담고사리|정확한 종의 이용 가능한 후보 미확보|
|plant-159|야쿠시마 바위취|정확한 종의 이용 가능한 후보 미확보|
|plant-162|베트남 아르디시아 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-163|태국고란초|정확한 종의 이용 가능한 후보 미확보|
|plant-164|피커스 슈마트라 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-165|솔라넘 울레넘|후보 있음 · 동정/사진 품질 추가 검수|
|plant-166|다발리아 파풀라|정확한 종의 이용 가능한 후보 미확보|
|plant-167|필름고사리 미확정 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-168|미니 필로덴드론 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-169|셀레지넬라 미확정 판매형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-170|테라토필럼 로툰디폴리아텀|정확한 종의 이용 가능한 후보 미확보|
|plant-171|고란초|정확한 종의 이용 가능한 후보 미확보|
|plant-172|애기석위 유통형 (학명 확인 필요)|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-176|비단이끼|후보 있음 · 동정/사진 품질 추가 검수|
|plant-177|부채괴불이끼|정확한 종의 이용 가능한 후보 미확보|
|plant-178|애기수염이끼|정확한 종의 이용 가능한 후보 미확보|
|plant-184|탐라난|정확한 종의 이용 가능한 후보 미확보|
|plant-185|차걸이란|정확한 종의 이용 가능한 후보 미확보|
|plant-186|덴드로비움 머릴아이 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-187|실버차미 아이비|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-190|에피스키아 핑크스모크|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-191|마르크그라비아 콜롬비아 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-192|필레아 브론즈 실버트리 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-195|네오레겔리아 파이어볼|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-197|페페로미아 메탈리카|정확한 종의 이용 가능한 후보 미확보|
|plant-202|루엘리아 피쉬본 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-204|셀라기넬라 픽타|정확한 종의 이용 가능한 후보 미확보|
|plant-209|서리이끼·양지이끼 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-218|텍타리아 힐로카르파|정확한 종의 이용 가능한 후보 미확보|
|plant-219|소네릴라 칸토넨시스|정확한 종의 이용 가능한 후보 미확보|
|plant-223|시서스 아마조니카 유통형|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-224|모노레나 프리뮬리플로라|후보 있음 · 동정/사진 품질 추가 검수|
|plant-225|글록시넬라 린데니아나|정확한 종의 이용 가능한 후보 미확보|
|plant-226|스키스마토글로티스 푸실라|정확한 종의 이용 가능한 후보 미확보|
|plant-227|네오레겔리아 치키타 린다|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-228|네오레겔리아 푸니니|유통형·품종 전용 사진 및 권리 확인 필요|
|plant-229|네오레겔리아 도미노|유통형·품종 전용 사진 및 권리 확인 필요|

## 카페 식물 조사

사용자 지정 https://cafe.naver.com/vivariummania 를 식물 후보·재배 사례 조사 대상으로 추가했다. 검색 도구는 robots 차단, 검색 결과 없음. 브라우저 도구는 Local browser use is disabled in Work settings를 반환했다. 사용자의 설정 캡처에는 브라우저 허용이 켜져 있어 설정과 세션 응답 불일치 상태다. 실제 카페 글은 아직 읽지 못했으며 후보를 만들어 반영하지 않았다. 연결 복구 후 식물 게시판·공개 글 이름→기존 ID/별칭/품종→신규 검토 후보로 분리하고 공식 학명·관리 자료를 대조한다. 회원 글·사진은 공개 재사용 허락으로 간주하지 않는다.

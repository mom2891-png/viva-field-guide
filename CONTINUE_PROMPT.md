다른 PC·다른 AI에 아래 내용을 그대로 전달하세요. 공통 규칙은 docs/agent-work-rules.md 한 파일에서 관리합니다.

```text
먼저 GitHub에서 비바리움 도감 저장소를 이 컴퓨터로 받아 작업을 이어가줘.
저장소: https://github.com/mom2891-png/viva-field-guide.git
브랜치: codex/purchase-review-price-expansion
최신 데이터 기준: 2c3ad822c00664c133c3ed5621b679238614a16d

Git과 Node.js22 이상을 확인해. 처음 받는 PC라면 빈 작업 위치에서:
git clone --branch codex/purchase-review-price-expansion https://github.com/mom2891-png/viva-field-guide.git viva-field-guide
cd viva-field-guide

이미 폴더가 있으면 git status --short --branch와 git remote -v부터 확인해.
기존 변경을 보존하고 같은 저장소·브랜치이며 깨끗할 때 git fetch origin으로 비교한 뒤,
fast-forward 가능한 경우만 git pull --ff-only origin codex/purchase-review-price-expansion을 실행해.
reset·clean·자동 stash·덮어쓰기·강제 전환하지 마.
git merge-base --is-ancestor 2c3ad822c00664c133c3ed5621b679238614a16d HEAD로 포함 여부를 확인해.
사용자가 더 최신 인계 SHA를 전달했으면 그 포함 여부도 확인해.
공개 clone에는 로그인 불필요. gh를 쓸 때만 gh auth status, 쓰기 인증 필요시 정상 로그인하고 토큰은 요구하지 마.

AGENTS.md → docs/agent-work-rules.md → README.md → CONTINUE_ON_NEW_PC.md 상단 → HANDOFF.md 최신 부분을 읽어.
Claude는 CLAUDE.md도 읽고 다른 AI도 같은 공통 규칙을 적용해. 관련 장부만 필요한 부분을 읽어.

현재604항목(동물362/식물242), 사진498·크기190·가격214.
카페9게시판135개 고유 제목·본문25글 열람, 전체 카페 조사는 아니야.
docs/cafe-plant-review.md의 다음 난/소네릴라 후보 정명·중복·관리부터 대조해.
정글·지피·덩굴·브로멜리아와 게코·개구리, 미확보 사진을 우선해.
블랙스완/알소비아 미니/야마사키카즈라/Corybas 보류 사유를 유지해.
기존 ID·사진 권리·인기·가격 보존, 미확인 학명·관리·크기·가격을 추정하지 마.
구매 링크/구매처 탭은 입력칸 밖에서5를 독립적으로 연속5회 누를 때만 해제해. 이는 인증이 아니야.

자료 재사용·관련 구간만 읽기·불필요한 반복 검색 금지·하위 에이전트 기본 미사용을 지켜.
국소 검사 후 주요 묶음 끝에 npm run check와 git diff --check, 문서만 수정하면 문서 검사만 해.
작은 단계마다 계속할지 묻지 말고 짧은 중간 보고로 이어가. 한도는 조회 가능하면10%를 남기고 추정하지 마.
실제 도감 화면 검수는 미완료. 가능하면 데스크톱/390px에서 목차·크기 필터·상세 복귀·URL·뒤로가기·구매처 왕복을 확인해.
실행은 npm start 또는 node scripts/serve.mjs. 패키지 설치는 필요 없어.
checkout 밖 원문/캐시는 전달되지 않으니 공개 장부의 최소 URL을 재사용해.
공개 main/홈페이지는9c4899d의591항목이고 작업 브랜치와 달라.
후속 업로드·main 반영·공개 배포는 최종 보고 후 내 지시에 따라.
```

다른 PC·다른 AI에 아래 내용을 그대로 전달하세요. 상세 규칙은 docs/agent-work-rules.md 한 파일에서 관리합니다.

```text
GitHub 저장소의 비바리움 도감 작업을 이어가줘.
저장소: https://github.com/mom2891-png/viva-field-guide.git
작업 브랜치: codex/purchase-review-price-expansion

처음 받는 컴퓨터라면 Git/Node22+를 확인하고 빈 작업 위치에 다음으로 받아:
git clone --branch codex/purchase-review-price-expansion https://github.com/mom2891-png/viva-field-guide.git viva-field-guide

이미 폴더가 있으면 origin·브랜치·git status부터 확인하고 기존 변경을 보존해.
같은 저장소/브랜치이고 깨끗하며 fast-forward 가능한 경우만 갱신해.
사용자가 준 인계 커밋이 HEAD에 포함되는지 확인해. 강제 reset·clean·덮어쓰기 금지.

AGENTS.md와 docs/agent-work-rules.md를 먼저 읽고 이 작업의 공통 프롬프트로 적용해.
Claude라면 CLAUDE.md도 읽어. 다른 AI도 같은 공통 프롬프트를 따라.
README.md, CONTINUE_ON_NEW_PC.md, HANDOFF.md의 최신 부분과 관련 계획·장부만 읽고 이어가.
이전 대화나 AI의 기억에 의존하지 마. 문서가 없다면 규칙이 전달됐다고 가정하지 마.

특히 공통 프롬프트의 토큰 절약 규칙을 지켜:
확보 자료 재사용, 관련 구간만 읽기, 원문·대형 JSON·로그 전체 출력 금지,
목적 없는 반복 검색 금지, 하위 에이전트 기본 미사용,
국소 검사 후 주요 묶음 끝에 전체 검사, 문서 변경은 문서만 검사,
중복 보고·작은 단계마다 계속할지 묻기 금지.
정확성·사진 권리·필수 검증을 비용 절약 명목으로 생략하지 마.

최신 실제 현황과 다음 작업은 HANDOFF.md를 기준으로 해.
기존 ID·인기·사진 권리 보존, 미확인 학명·관리·크기·가격 추정 금지.
구매 링크는 입력칸 밖에서5를5회 연속 눌렀을 때만 표시하는 규칙 유지.
추가 업로드·main 반영·공개 배포는 최종 보고 후 사용자 지시에 따라.
```

현재 PC의 새 지침은 로컬 커밋으로 저장합니다. 업로드 전에는 다른 PC에서 GitHub clone/pull만으로 이 지침을 받을 수 없습니다. 이 파일과 공통 프롬프트 파일을 직접 전달하거나, 사용자가 지시한 뒤 작업 브랜치를 업로드해야 합니다. 파일을 전달해도 AI의 상위 시스템 지침까지 바뀌는 것은 아니며, 프로젝트 작업 규칙으로 적용합니다.

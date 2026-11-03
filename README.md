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
| scripts/validate.mjs | 데이터·검색·정렬 검증 |
| .github/workflows/pages.yml | 검사와 자동 배포 |
| HANDOFF.md | 공통 작업 현황 |

이 저장소에는 이전 계정의 Sites 연결 정보·토큰·조사 원문·대화 기록을 포함하지 않습니다. 정적 파일은 다른 정적 호스팅으로도 이전할 수 있습니다. 사진 권리는 각 사진의 라이선스를 따르며 상세 화면에 저작자·원본 정보를 유지합니다.

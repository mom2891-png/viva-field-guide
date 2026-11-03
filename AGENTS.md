# Viva — shared agent instructions

This Git repository is the canonical editable source for all Codex and Claude sessions. Hosting is GitHub Pages. Do not create a new Sites project or overwrite this with an older chat artifact. Read README.md and HANDOFF.md first. Claude sessions must also read this file (CLAUDE.md points here).

## Editing workflow

1. Inspect `git status`, current branch and remote. Fetch/pull only with a clean working tree; preserve unfinished edits. Never force-push, reset or overwrite another session's work.
2. When multiple sessions work concurrently, use separate branches `codex/<task>` or `claude/<task>` and separate clones/worktrees. One checkout must have only one writer. Use PRs to integrate; do not let two agents edit the same file simultaneously.
3. Before merging/pushing main, bring in current main and run `npm run check`. A main push deploys publicly. Commit only the authorized work, never credentials or local research.
4. Update HANDOFF.md with concrete changes, checks, remaining work and any blocker. Report the exact commit and deployment result. A file edit is not proof of a successful deployment.

## Data rules

- Do not cap the catalog at 200/500 entries. Expand by documented taxonomic/husbandry coverage, not padding.
- `dist/species.json`: animals; `dist/plants.json`: plants/mosses/liverworts; `dist/morphs.json`: subordinate morphs keyed by animal ID. IDs must stay stable. Never renumber IDs or count morphs as species.
- `catalogType`: 종 / 유통명 / 속 수준 / 품종·교잡종. Unknown names must remain unknown; do not invent binomials from ambiguous trade names. A source's trade name is not a formal taxonomic verification.
- Do not manufacture popularity. `popularityKnown: false` requires `popularity: null`. Overseas listings do not establish Korean popularity. Multiple morphs, pot sizes and shop branches are not separate species/shop votes.
- Keep moisture/cooling/ventilation/terrestrial/aquatic requirements distinct. Shared tags do not imply cohabitation. Never claim every moss is suited to a hot tropical vivarium.
- Photos must match the identified taxon, use an eligible license, and retain author/license/original URL. Do not substitute a generic species image for a particular morph/cultivar. Leave a placeholder when uncertain.
- User wants a clean product: no research-source tables. Retain image credits for reuse obligations. Research snapshots, user names, private notes and raw exports do not belong in this public repository; keep them outside checkout. Minimal nonpersonal source records for future additions can be retained in public change notes if needed.

## Application

Buildless HTML/CSS/vanilla JavaScript in dist/. No required packages, secrets, server, proprietary runtime or AI connector. Use Node 22+ for checks and preview. Keep all asset/fetch paths relative so /viva-field-guide/ works on GitHub Pages. Favorites are browser-local, not shared between devices/accounts. No AI tool automatically receives GitHub write permission; use the owner's authorized GitHub login or PRs.

## Verification

`npm run check` validates data integrity and real filtering/ranking/search logic. For UI work additionally use the session's permitted browser tools if available. If browser control is disabled, report that visual QA remains outstanding; do not claim screenshot verification.

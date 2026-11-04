# Claude entry point

Read and follow [AGENTS.md](AGENTS.md) and the single shared prompt [docs/agent-work-rules.md](docs/agent-work-rules.md), including its token-saving rules. Then read only the latest relevant portion of [HANDOFF.md](HANDOFF.md) and [README.md](README.md). This applies on every new PC/session; do not rely on prior chat memory. Do not duplicate or maintain a separate Claude version of the shared rules.

This is the same source used by Codex. Use this repository, preserve stable IDs, run `npm run check`, and update HANDOFF.md before handing work back. Use a separate `claude/<task>` branch/checkout when another session is active. GitHub authorization is still required to push; public read access alone does not grant write access.

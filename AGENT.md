# AGENTS.md  – OSAL Guide
## How to run tests
- Root: `pnpm test` (Node)  &  `pytest` (Python)

## Lint / format (optional)
pnpm dlx eslint . --ext .ts

## Useful scripts
- Setup: `pnpm install --frozen-lockfile`
- All packages live under `packages/`

## Branch / PR rules
- Branch naming: `feat/<task-id>`
- PR title: `[auto] <task-id> — <short>` 
- CI must pass before merge

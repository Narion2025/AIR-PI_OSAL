# AIR-PI OSAL

This repository contains the first iteration of the **Open Systemic Awareness Layer (OSAL)** MVP. The MVP demonstrates a full stack from local marker capture to LLM response while preserving user privacy.

## Repository Layout
- `packages/edge_marker` – local marker engine (TypeScript)
- `packages/osal_gateway` – Fastify gateway service
- `packages/heart_api` – FastAPI service computing prompt vectors
- `packages/demo_ui` – Vite React demo application

See `SPECS.md` for the detailed task breakdown and sprint plan. The current Kanban board is maintained in `KANBAN_BOARD.md`.

## Getting Started
1. Install dependencies using `pnpm install`.
2. Run unit tests (if present) with `pnpm test`.
3. Start services individually from each package.

Environment variables are defined in `.env.example`.

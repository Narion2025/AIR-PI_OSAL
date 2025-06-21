# AIR-PI OSAL

This repository contains the first iteration of the **Open Systemic Awareness Layer (OSAL)** MVP. The MVP demonstrates a full stack from local marker capture to LLM response while preserving user privacy.

## Repository Layout
- `packages/edge_marker` – local marker engine (TypeScript)
- `packages/osal_gateway` – Fastify gateway service
- `packages/heart_api` – FastAPI service computing prompt vectors
- `packages/demo_ui` – Vite React demo application

See `SPECS.md` for the detailed task breakdown and sprint plan. The current Kanban board is maintained in `KANBAN_BOARD.md`. An example scenario is described in [docs/USE_CASE.md](docs/USE_CASE.md).

## Getting Started
1. Install dependencies using `pnpm install`.
2. Run unit tests with `pnpm test`.
3. Build the edge marker package with `pnpm --filter edge_marker build`.
4. Start the local edge marker API via `pnpm --filter edge_marker start`.
5. Start the gateway service with `pnpm --filter osal_gateway start`.
6. Start the Heart API using `uvicorn heart_api.main:app --reload --port 8000`.

Environment variables are defined in `.env.example`.

### Definition of Done for Edge-Spark
The first sprint (**Edge-Spark**) focuses on the local marker engine. It is considered complete when:

* `pnpm --filter edge_marker test` reports coverage above 90%.
* Running `node dist/edge_marker/example.js "I am happy"` outputs a JSON `MarkerPacket`.

### Deploy to Render
Deploy the edge marker API using the provided `render.yaml`:

1. Create a new Web Service on [render.com](https://render.com) and link this repository.
2. Render will detect `render.yaml` and automatically build and start the service.

## Product Vision
The Open Systemic Awareness Layer empowers applications to adapt to users' emotional context without compromising privacy. By keeping raw data on-device and only transmitting small, anonymized marker packets, OSAL enables ethical AI-driven experiences across education, therapy and civic tech.

## Next Sprint: First Light
With the Heart-Beat sprint complete, the focus shifts to delivering the demo UI and deployment. The upcoming iteration will add a simple React interface displaying live markers and set up Render/Vercel to host the services publicly.

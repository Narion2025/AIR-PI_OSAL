# OSAL Hello-World Stack - MVP1 Specifications

This document captures the task breakdown and sprint roadmap for the
first MVP iteration of the Open Systemic Awareness Layer (OSAL).

## Task Breakdown

| ID   | Component            | Task Summary                                                       | Acceptance Criteria                                                  |
|------|---------------------|-------------------------------------------------------------------|---------------------------------------------------------------------|
| E-01 | Repo & CI           | Initialise mono-repo with pnpm workspaces: edge_marker, osal_gateway, heart_api, demo_ui. Configure GitHub Actions (lint -> test -> build). | Main branch green build; ESLint/Black pass. |
| E-02 | Edge Marker SDK     | TypeScript lib to capture mic/clipboard, tokenise using cosd_markers_v4.yaml, output MarkerPacket JSON <=2KB. | 90% unit test coverage; Avg run <=5ms/1kB text. |
| G-01 | Gateway Skeleton    | Fastify service with /ingest and /status endpoints, verify ZK-stamp placeholder, write packet to Redis queue. | POST /ingest returns 201; Bad signature -> HTTP 400. |
| G-02 | Consent Capsule     | JSON header builder & middleware (TTL, purpose).                   | Capsule attached & logged.                                           |
| G-03 | Differential Privacy Salt | Implement Laplace noise (ε = 0.8) on numeric scores.         | Unit-test mean error <5%.                                            |
| H-01 | Heart API core      | FastAPI service loading cross_links.json & marker weights; calculate synergy and return PromptVector. | Response <50ms; synergy unit tests pass. |
| H-02 | Prompt Adapter      | Node utility injecting PromptVector into OpenAI chat completion call. | Snapshot test ensures system prompt includes vector. |
| D-01 | Demo UI             | React Vite app with text box, live Aura-Ring (d3 radar) and LLM answer display. | Works in Chrome & iOS Safari.                                        |
| T-01 | Smoke Tests         | Port smoke_test_system.py into repo CI.                           | `pnpm test:e2e` green.                                               |
| DEP-01 | Deployment        | Render for gateway/heart, Vercel for UI; Terraform script.        | `osal.demo.io` online with SSL.                                      |

## Roadmap - 4×1 Week AI-Dev Sprints

| Sprint | Primary Goal  | Stories (IDs)                      | Definition of Done                                       |
|-------|---------------|-----------------------------------|----------------------------------------------------------|
| S-1 "Edge-Spark" | Local Marker Engine operational & unit tested. | E-01, E-02, part of T-01 | MarkerPacket JSON output in console; >90% test coverage. |
| S-2 "Secure Flow" | Data flows remote with privacy capsule. | G-01 to G-03, remaining T-01 | `curl /ingest` shows DP-noised values; Redis queue contains packets. |
| S-3 "Heart-Beat" | Heart API calculates vectors & forms prompts. | H-01, H-02 | Postman test: marker in -> prompt out; GPT-4 returns reply including vector. |
| S-4 "First Light" | End-to-end demo UI online. | D-01, DEP-01 | User types text -> sees Aura-Ring update -> gets GPT answer; Lighthouse performance >=85. |

Additional Sprints can be appended if scope overruns.

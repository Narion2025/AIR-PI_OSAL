# Technical Use Case: Emotional Feedback in a Learning App

This scenario illustrates how the first OSAL MVP components can be used in an educational context.

1. **Edge Marker Engine** captures text snippets from the learner and produces a `MarkerPacket` with detected emotions.
2. **OSAL Gateway** receives the packet via `/ingest`, attaches a consent capsule and applies differential privacy before queueing it in Redis.
3. **Heart API** (not yet implemented) will read packets from Redis, compute a synergy vector and adapt the prompts for the tutoring LLM.
4. The **Demo UI** displays a live radar chart showing the learner's current emotional state while streaming responses from the model.

This flow allows real‑time adaptation of learning material without exposing raw user data, fulfilling the privacy requirements.

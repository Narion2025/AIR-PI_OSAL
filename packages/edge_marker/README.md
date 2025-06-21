# edge_marker

Local marker engine for OSAL. It parses text and produces a privacy-friendly `MarkerPacket` JSON.

## Usage

```
pnpm --filter edge_marker build
node dist/edge_marker/example.js "I am happy"
```

## Development

Run unit tests:

```
pnpm --filter edge_marker test
```

Start the local API server (for Render deployment):

```
pnpm --filter edge_marker start
```

The server exposes `/analyze` (POST `{text}`) and `/status`.

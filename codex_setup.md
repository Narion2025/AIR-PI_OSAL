# Codex Setup

## Runtime Versions
NODE_VERSION=">=20.12.0"
PYTHON_VERSION="3.11"

## OpenAI Call
MODEL_NAME="gpt-4o-mini"

## Redis
REDIS_IMAGE="redis:7-alpine"
REDIS_PORT=6379

## ZK-Stamp
```python
def verify_dummy(packet):
    """Placeholder always returning True until real ZKP added."""
    return True
```

from pathlib import Path
import json
from fastapi import FastAPI
from pydantic import BaseModel

BASE = Path(__file__).resolve().parent
with open(BASE / 'data/cross_links.json') as f:
    CROSS = json.load(f)
with open(BASE / 'data/marker_weights.json') as f:
    WEIGHTS = json.load(f)

class MarkerPacket(BaseModel):
    id: str
    markers: dict[str, float]
    ttl: int | None = 3600

class PromptVector(BaseModel):
    synergy: float
    vector: list[float]
    target_sd: str

def compute_vector(markers: dict[str, float]) -> PromptVector:
    dim = len(next(iter(CROSS.values())))
    vector = [0.0] * dim
    synergy = 0.0
    for name, value in markers.items():
        weight = WEIGHTS.get(name, 1.0)
        link = CROSS.get(name, [0.0] * dim)
        for i in range(dim):
            vector[i] += value * weight * link[i]
        synergy += value * weight
    return PromptVector(synergy=synergy, vector=vector, target_sd="generic")

app = FastAPI()

@app.get('/status')
def status():
    return {'status': 'ok'}

@app.post('/vector')
def vector(pkt: MarkerPacket) -> PromptVector:
    return compute_vector(pkt.markers)

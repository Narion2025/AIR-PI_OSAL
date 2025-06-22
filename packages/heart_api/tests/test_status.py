from fastapi.testclient import TestClient
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parents[1]))
from main import app

client = TestClient(app)

def test_status():
    resp = client.get('/status')
    assert resp.status_code == 200
    assert resp.json() == {'status': 'ok'}

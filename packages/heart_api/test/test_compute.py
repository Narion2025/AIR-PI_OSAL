import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from main import compute_vector

def test_compute_vector():
    pkt = {'joy': 1.0, 'anger': 0.5}
    vec = compute_vector(pkt)
    assert len(vec.vector) == 2
    assert vec.synergy > 0

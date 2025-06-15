import { describe, it, expect } from 'vitest';
import { analyzeText } from '../src/markerEngine';

describe('analyzeText', () => {
  it('detects joy marker', () => {
    const pkt = analyzeText('id1', 'I feel so happy and full of joy!');
    expect(pkt.markers.joy).toBeGreaterThan(0);
  });

  it('detects no markers when none present', () => {
    const pkt = analyzeText('id2', 'Nothing to match here');
    expect(pkt.markers.joy).toBe(0);
    expect(pkt.markers.anger).toBe(0);
  });
});

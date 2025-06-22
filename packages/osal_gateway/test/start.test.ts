import { describe, it, expect } from 'vitest';
import { start } from '../index';

describe('start', () => {
  it('runs', () => {
    start();
    expect(1).toBe(1);
  });
});

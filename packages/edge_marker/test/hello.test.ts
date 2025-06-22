import { describe, it, expect } from 'vitest';
import { hello } from '../src';

describe('hello', () => {
  it('returns greeting', () => {
    expect(hello()).toBe('hello from edge_marker');
  });
});

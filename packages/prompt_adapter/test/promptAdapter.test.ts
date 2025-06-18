import { describe, it, expect, vi } from 'vitest';
const create = vi.fn().mockResolvedValue({ choices: [{ message: { content: 'ok' } }] });
vi.mock('openai', () => ({ default: class { chat = { completions: { create } }; } }));
import OpenAI from 'openai';
import { runCompletion, PromptVector } from '../src/index';

describe('runCompletion', () => {
  it('injects vector into system prompt', async () => {
    const vector: PromptVector = { synergy: 1, vector: [0.1, 0.2], target_sd: 'x' };
    const res = await runCompletion('k', [{ role: 'user', content: 'hi' }], vector);
    expect(res).toBe('ok');
    expect(create).toHaveBeenCalled();
  });
});

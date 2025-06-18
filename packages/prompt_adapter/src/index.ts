import OpenAI from 'openai';

export interface PromptVector {
  synergy: number;
  vector: number[];
  target_sd: string;
}

export async function runCompletion(
  apiKey: string,
  messages: { role: string; content: string }[],
  vector: PromptVector,
  model = 'gpt-4o-mini'
): Promise<string> {
  const openai = new OpenAI({ apiKey });
  const sys = { role: 'system', content: `vector:${vector.vector.join(',')}` };
  const res = await openai.chat.completions.create({
    model,
    messages: [sys, ...messages]
  });
  return res.choices[0].message.content;
}

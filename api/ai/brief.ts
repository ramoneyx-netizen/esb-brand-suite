import type { VercelRequest, VercelResponse } from '@vercel/node';

function json(res: VercelResponse, status: number, body: unknown) { res.status(status).setHeader('Content-Type', 'application/json').json(body); }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return json(res, 405, { error: 'POST required' });
  const { prompt, provider = 'gemini' } = req.body || {};
  if (typeof prompt !== 'string' || prompt.trim().length < 3 || prompt.length > 4000) return json(res, 400, { error: 'Prompt must be between 3 and 4000 characters.' });
  if (provider !== 'gemini' && provider !== 'grok') return json(res, 400, { error: 'Unsupported provider.' });

  const system = 'You are an expert brand strategist. Return a concise, actionable brand brief with positioning, audience, personality, tagline options, and visual direction.';
  try {
    let response: Response;
    if (provider === 'grok') {
      if (!process.env.XAI_API_KEY) return json(res, 503, { error: 'Grok is not configured on the server.' });
      response = await fetch('https://api.x.ai/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.XAI_API_KEY}` }, body: JSON.stringify({ model: process.env.XAI_MODEL || 'grok-3-mini', messages: [{ role: 'system', content: system }, { role: 'user', content: prompt.trim() }] }) });
    } else {
      if (!process.env.GEMINI_API_KEY) return json(res, 503, { error: 'Gemini is not configured on the server.' });
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || 'gemini-2.0-flash'}:generateContent?key=${process.env.GEMINI_API_KEY}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: 'user', parts: [{ text: prompt.trim() }] }] }) });
    }
    const data = await response.json() as any;
    if (!response.ok) return json(res, response.status, { error: data?.error?.message || 'Provider request failed.' });
    const text = provider === 'grok' ? data?.choices?.[0]?.message?.content : data?.candidates?.[0]?.content?.parts?.map((part: any) => part.text).join('');
    if (!text) return json(res, 502, { error: 'Provider returned no text.' });
    return json(res, 200, { provider, text });
  } catch { return json(res, 502, { error: 'Unable to reach the AI provider.' }); }
}

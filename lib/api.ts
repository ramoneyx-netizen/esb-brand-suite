const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');

export type AiProvider = 'gemini' | 'grok';
export type BriefResponse = { provider: AiProvider; text: string; requestId?: string };

export async function generateBrief(prompt: string, provider: AiProvider): Promise<BriefResponse> {
  if (!API_URL) {
    throw new Error('EXPO_PUBLIC_API_URL is not configured. Add it to your local environment before using AI.');
  }

  const response = await fetch(`${API_URL}/api/ai/brief`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, provider }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `AI request failed (${response.status})`);
  return payload as BriefResponse;
}

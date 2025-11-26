export const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001';

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('docplant_token') : null;
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(init?.headers as any || {}) };
  // Only inject Authorization if caller didn't supply one (prevents race with stale localStorage token)
  if (!headers.Authorization && token) headers.Authorization = `Bearer ${token}`;
  // Important: spread init first, then our merged headers so we don't overwrite them
  const res = await fetch(`${API_URL}${path}`, { ...(init || {}), headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

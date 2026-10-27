const KV_PREFIX = 'mainter_kv_';

export async function getKV<T>(key: string): Promise<T | null> {
  try {
    const raw = localStorage.getItem(KV_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function kvGet(key: string) {
  return getKV(key);
}

export async function kvPut(key: string, value: unknown) {
  localStorage.setItem(KV_PREFIX + key, JSON.stringify(value));
}

const SESSION_KEY = 'mainter_session';

const seedUser = { email: 'carla@mainter.com.bo', name: 'Carla' };

export async function getSession() {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function login(email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const normalized = email.trim().toLowerCase();
  if (normalized === seedUser.email && password === 'salvatierabonita') {
    const session = { email: seedUser.email, name: seedUser.name, authenticated: true };
    if (typeof window !== 'undefined') localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }
  throw new Error('Invalid credentials');
}

export async function logout() {
  if (typeof window !== 'undefined') localStorage.removeItem(SESSION_KEY);
}

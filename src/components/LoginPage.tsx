import { useState } from 'react';
import { login } from '~/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('carla@mainter.com.bo');
  const [password, setPassword] = useState('salvatierabonita');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      window.location.href = '/_authenticated/dashboard';
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-watermark" aria-hidden="true" />
      <div className="login-card">
        <img src="/logomainter.png" alt="Mainter" className="login-logo" />
        <p className="login-subtitle">Sistema de gestión de clientes</p>
        <form onSubmit={submit} className="login-form">
          <label className="login-field">
            <span className="login-label">Correo</span>
            <input className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="login-field">
            <span className="login-label">Contraseña</span>
            <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          {error && <div className="login-error">{error}</div>}
          <button className="button login-button" disabled={loading} type="submit">
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}

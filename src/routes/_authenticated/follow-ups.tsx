import { createRoute } from '@tanstack/react-router';
import { Route as authenticatedRoute } from './_layout';
import { useEffect, useState } from 'react';
import { listFollowUps, saveFollowUp, listCustomers } from '~/lib/crm-store';

export const Route = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/follow-ups',
  component: FollowUpsComponent,
});

function FollowUpsComponent() {
  const [followUps, setFollowUps] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [form, setForm] = useState({ customerId: '', dueDate: '', note: '' });

  useEffect(() => {
    (async () => {
      const [fups, custs] = await Promise.all([listFollowUps(), listCustomers()]);
      setFollowUps(fups.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1)));
      setCustomers(custs);
    })();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveFollowUp({ id: '', customerId: form.customerId, dueDate: form.dueDate, note: form.note, completed: false });
    const fups = await listFollowUps();
    setFollowUps(fups.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1)));
    setForm({ customerId: '', dueDate: '', note: '' });
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 14px 0' }}>Seguimientos</h2>
      <form onSubmit={submit} className="panel" style={{ marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <label className="field">Cliente
            <select className="select" value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })} required>
              <option value="">Seleccionar</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.fullName}</option>)}
            </select>
          </label>
          <label className="field">Vencimiento <input className="input" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} required /></label>
          <label className="field">Nota <input className="input" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></label>
        </div>
        <button className="button" style={{ marginTop: 10 }} type="submit">Agregar</button>
      </form>
      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Vencimiento</th><th>Cliente</th><th>Nota</th><th>Estado</th></tr></thead>
            <tbody>
              {followUps.map((item) => {
                const customer = customers.find((c) => c.id === item.customerId);
                return <tr key={item.id}><td>{item.dueDate}</td><td>{customer?.fullName ?? item.customerId}</td><td>{item.note || '-'}</td><td>{item.completed ? 'Completado' : 'Pendiente'}</td></tr>;
              })}
            </tbody>
          </table>
          {!followUps.length && <div className="empty">Sin seguimientos</div>}
        </div>
      </div>
    </div>
  );
}

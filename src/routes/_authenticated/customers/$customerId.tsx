import { createRoute } from '@tanstack/react-router';
import { Route as customersRoute } from '~/routes/_authenticated/customers';
import { useEffect, useState } from 'react';
import { listInteractions, saveInteraction, deleteCustomer, listFollowUps, saveFollowUp, listCustomers } from '~/lib/crm-store';
import { interactionSchema, followUpSchema, type Interaction, type FollowUp } from '~/lib/schemas';

export const Route = createRoute({
  getParentRoute: () => customersRoute,
  path: '$customerId',
  component: CustomerProfileComponent,
});

const INTERACTION_TYPES = [
  { value: 'visit', label: 'Visita' },
  { value: 'call', label: 'Llamada' },
  { value: 'purchase', label: 'Compra' },
  { value: 'quote', label: 'Cotización' },
  { value: 'event', label: 'Evento' },
];

function emptyInteraction(customerId: string): Omit<Interaction, 'id'> {
  return { customerId, type: 'visit', date: new Date().toISOString().slice(0, 10), notes: '', amount: 0 };
}

function emptyFollowUp(customerId: string): Omit<FollowUp, 'id'> {
  return { customerId, dueDate: new Date().toISOString().slice(0, 10), note: '', completed: false };
}

function CustomerProfileComponent() {
  const params = Route.useParams();
  const customerId = params.customerId;
  const [customer, setCustomer] = useState<any>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [interactionForm, setInteractionForm] = useState<Omit<Interaction, 'id'>>(emptyInteraction(customerId));
  const [followUpForm, setFollowUpForm] = useState<Omit<FollowUp, 'id'>>(emptyFollowUp(customerId));
  const [tab, setTab] = useState<'info' | 'history' | 'followups'>('info');

  useEffect(() => {
    (async () => {
      const all = await listCustomers();
      const found = all.find((c) => c.id === customerId);
      setCustomer(found ?? null);
      const [ints, fups] = await Promise.all([listInteractions(customerId), listFollowUps()]);
      setInteractions(ints.sort((a, b) => (b.date > a.date ? 1 : -1)));
      setFollowUps(fups.filter((f) => f.customerId === customerId).sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1)));
    })();
  }, [customerId]);

  const saveInteractionAsync = async () => {
    const data = interactionSchema.parse({ id: undefined, ...interactionForm });
    const saved = await saveInteraction(data);
    setInteractions((prev) => [saved, ...prev]);
    setInteractionForm(emptyInteraction(customerId));
  };

  const saveFollowUpAsync = async () => {
    const data = followUpSchema.parse({ id: undefined, ...followUpForm });
    const saved = await saveFollowUp(data);
    setFollowUps((prev) => [...prev, saved]);
    setFollowUpForm(emptyFollowUp(customerId));
  };

  const remove = async () => {
    if (!confirm('¿Eliminar cliente? Se borrarán sus datos asociados.')) return;
    await deleteCustomer(customerId);
    window.location.href = '/_authenticated/customers';
  };

  if (!customer) {
    return <div className="panel"><div className="empty">Cargando cliente...</div></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ margin: 0 }}>{customer.fullName}</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="button secondary" onClick={() => window.location.href = '/_authenticated/customers'}>Volver</button>
          <button className="button danger" onClick={remove}>Eliminar</button>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: 14 }}>
        <button className={`tab ${tab === 'info' ? 'tab--active' : ''}`} onClick={() => setTab('info')}>Información</button>
        <button className={`tab ${tab === 'history' ? 'tab--active' : ''}`} onClick={() => setTab('history')}>Historial</button>
        <button className={`tab ${tab === 'followups' ? 'tab--active' : ''}`} onClick={() => setTab('followups')}>Seguimientos</button>
      </div>

      {tab === 'info' && (
        <div className="panel">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            <div><strong>Nombre:</strong> {customer.fullName}</div>
            <div><strong>Empresa:</strong> {customer.company || '-'}</div>
            <div><strong>NIT/CI:</strong> {customer.nitCi || '-'}</div>
            <div><strong>Tipo:</strong> {customer.customerType}</div>
            <div><strong>Estado:</strong> {customer.status}</div>
            <div><strong>Departamento:</strong> {customer.department || '-'}</div>
            <div><strong>Municipio:</strong> {customer.municipality || '-'}</div>
            <div><strong>Correo:</strong> {customer.email || '-'}</div>
            <div><strong>Teléfono:</strong> {customer.phone || '-'}</div>
            <div><strong>WhatsApp:</strong> {customer.whatsapp || '-'}</div>
            <div><strong>Dirección:</strong> {customer.address || '-'}</div>
            <div><strong>Hectáreas:</strong> {customer.hectares ?? '-'}</div>
            <div><strong>Cultivos:</strong> {(customer.crops || []).join(', ') || '-'}</div>
            <div><strong>Maquinaria:</strong> {(customer.machinery || []).join(', ') || '-'}</div>
            <div><strong>Líneas:</strong> {(customer.businessLines || []).join(', ') || '-'}</div>
            <div><strong>Etiquetas:</strong> {(customer.tags || []).join(', ') || '-'}</div>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div>
          <form onSubmit={(e) => { e.preventDefault(); saveInteractionAsync(); }} className="panel" style={{ marginBottom: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
              <label className="field">Tipo
                <select className="select" value={interactionForm.type} onChange={(e) => setInteractionForm({ ...interactionForm, type: e.target.value as Interaction['type'] })}>
                  {INTERACTION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </label>
              <label className="field">Fecha <input className="input" type="date" value={interactionForm.date} onChange={(e) => setInteractionForm({ ...interactionForm, date: e.target.value })} /></label>
              <label className="field">Monto <input className="input" type="number" value={interactionForm.amount} onChange={(e) => setInteractionForm({ ...interactionForm, amount: Number(e.target.value) })} /></label>
            </div>
            <label className="field" style={{ marginTop: 10 }}>Notas <textarea className="input" value={interactionForm.notes} onChange={(e) => setInteractionForm({ ...interactionForm, notes: e.target.value })} /></label>
            <button className="button" style={{ marginTop: 10 }} type="submit">Agregar interacción</button>
          </form>
          <div className="panel">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Fecha</th><th>Tipo</th><th>Monto</th><th>Notas</th></tr></thead>
                <tbody>
                  {interactions.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{INTERACTION_TYPES.find((t) => t.value === item.type)?.label}</td>
                      <td>{item.amount}</td>
                      <td>{item.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!interactions.length && <div className="empty">Sin interacciones</div>}
            </div>
          </div>
        </div>
      )}

      {tab === 'followups' && (
        <div>
          <form onSubmit={(e) => { e.preventDefault(); saveFollowUpAsync(); }} className="panel" style={{ marginBottom: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
              <label className="field">Vencimiento <input className="input" type="date" value={followUpForm.dueDate} onChange={(e) => setFollowUpForm({ ...followUpForm, dueDate: e.target.value })} /></label>
              <label className="field">Nota <input className="input" value={followUpForm.note} onChange={(e) => setFollowUpForm({ ...followUpForm, note: e.target.value })} /></label>
            </div>
            <button className="button" style={{ marginTop: 10 }} type="submit">Agregar seguimiento</button>
          </form>
          <div className="panel">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Vencimiento</th><th>Nota</th><th>Estado</th></tr></thead>
                <tbody>
                  {followUps.map((item) => (
                    <tr key={item.id}>
                      <td>{item.dueDate}</td>
                      <td>{item.note || '-'}</td>
                      <td>{item.completed ? 'Completado' : 'Pendiente'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!followUps.length && <div className="empty">Sin seguimientos</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

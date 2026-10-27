import { createRoute } from '@tanstack/react-router';
import { Route as authenticatedRoute } from './_layout';
import { useEffect, useState, useMemo } from 'react';
import { listCustomers, saveCustomer, deleteCustomer } from '~/lib/crm-store';
import { customerSchema, type Customer } from '~/lib/schemas';

export const Route = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/customers',
  component: CustomersComponent,
});

const STATUSES = ['lead', 'active', 'inactive'];
const TYPES = ['producer', 'distributor', 'company', 'individual'];
const BUSINESS_LINES = ['proteccion', 'maquinaria', 'repuestos', 'plagas', 'climatizacion'];

const STATUS_LABEL: Record<string, string> = {
  lead: 'Potencial',
  active: 'Activo',
  inactive: 'Inactivo',
};

const TYPE_LABEL: Record<string, string> = {
  producer: 'Productor',
  distributor: 'Distribuidor',
  company: 'Empresa',
  individual: 'Persona individual',
};

const LINE_LABEL: Record<string, string> = {
  proteccion: 'Protección',
  maquinaria: 'Maquinaria',
  repuestos: 'Repuestos',
  plagas: 'Plagas',
  climatizacion: 'Climatización',
};

function translateStatus(value: string) {
  return STATUS_LABEL[value] ?? value;
}

function translateType(value: string) {
  return TYPE_LABEL[value] ?? value;
}

function translateLine(value: string) {
  return LINE_LABEL[value] ?? value;
}

function defaultCustomer(): Customer {
  return {
    id: '', fullName: '', company: '', nitCi: '', phone: '', whatsapp: '', email: '', address: '', department: '', municipality: '', customerType: 'individual', status: 'lead', businessLines: [], tags: [], hectares: 0, crops: [], machinery: [], preferences: { contactChannel: '', preferredBrands: [], buyingSeason: '' }, customValues: {}
  };
}

function CustomersComponent() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [line, setLine] = useState<string>('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [edit, setEdit] = useState<Customer | null>(null);
  const [formState, setFormState] = useState<Customer>(defaultCustomer());

  useEffect(() => { listCustomers().then(setCustomers); }, []);

  const filtered = useMemo(() => {
    let next = customers;
    const s = q.trim().toLowerCase();
    if (s) next = next.filter((c) => [c.fullName, c.company, c.nitCi, c.phone, c.email, c.address].some((v) => String(v).toLowerCase().includes(s)));
    if (status) next = next.filter((c) => c.status === status);
    if (type) next = next.filter((c) => c.customerType === type);
    if (line) next = next.filter((c) => c.businessLines.includes(line));
    return next;
  }, [customers, q, status, type, line]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = customerSchema.parse(formState);
    const saved = await saveCustomer(data);
    setCustomers((prev) => {
      const idx = prev.findIndex((x) => x.id === saved.id);
      const next = [...prev];
      if (idx >= 0) next[idx] = saved; else next.push(saved);
      return next;
    });
    setEdit(null);
    setFormState(defaultCustomer());
  };

  const remove = async (id: string) => {
    if (!confirm('Eliminar cliente?')) return;
    await deleteCustomer(id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setSelected((prev) => { const next = new Set(prev); next.delete(id); return next; });
  };

  const bulkDelete = async () => {
    if (!confirm(`Eliminar ${selected.size} clientes?`)) return;
    await Promise.all([...selected].map(deleteCustomer));
    setCustomers((prev) => prev.filter((c) => !selected.has(c.id)));
    setSelected(new Set());
  };

  const exportCsv = () => {
    const header = 'Nombre,Empresa,Tipo,Estado,Departamento,Correo,Teléfono';
    const rows = filtered.map((c) => `"${c.fullName}","${c.company}","${translateType(c.customerType)}","${translateStatus(c.status)}","${c.department}","${c.email}","${c.phone}"`);
    const blob = new Blob([header, ...rows].join('\n'), { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'clientes.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h2 style={{ margin: 0 }}>Clientes</h2>
        <button className="button secondary" onClick={() => { setEdit(null); setFormState(defaultCustomer()); }}>Nuevo</button>
      </div>
      <form onSubmit={submit} className="panel" style={{ marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          <label className="field">Nombre <input className="input" value={formState.fullName} onChange={(e) => setFormState({ ...formState, fullName: e.target.value })} required /></label>
          <label className="field">Empresa <input className="input" value={formState.company} onChange={(e) => setFormState({ ...formState, company: e.target.value })} /></label>
          <label className="field">NIT/CI <input className="input" value={formState.nitCi} onChange={(e) => setFormState({ ...formState, nitCi: e.target.value })} /></label>
          <label className="field">Tipo <select className="select" value={formState.customerType} onChange={(e) => setFormState({ ...formState, customerType: e.target.value as Customer['customerType'] })}>
            {TYPES.map((t) => <option key={t} value={t}>{translateType(t)}</option>)}
          </select></label>
          <label className="field">Departamento <input className="input" value={formState.department} onChange={(e) => setFormState({ ...formState, department: e.target.value })} /></label>
          <label className="field">Municipio <input className="input" value={formState.municipality} onChange={(e) => setFormState({ ...formState, municipality: e.target.value })} /></label>
          <label className="field">Correo <input className="input" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} /></label>
          <label className="field">Teléfono <input className="input" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} /></label>
          <label className="field">WhatsApp <input className="input" value={formState.whatsapp} onChange={(e) => setFormState({ ...formState, whatsapp: e.target.value })} /></label>
          <label className="field">Dirección <input className="input" value={formState.address} onChange={(e) => setFormState({ ...formState, address: e.target.value })} /></label>
          <label className="field">Estado <select className="select" value={formState.status} onChange={(e) => setFormState({ ...formState, status: e.target.value as Customer['status'] })}>
            {STATUSES.map((s) => <option key={s} value={s}>{translateStatus(s)}</option>)}
          </select></label>
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
          <button className="button" type="submit">{edit ? 'Guardar' : 'Crear'}</button>
          <button className="button secondary" type="button" onClick={() => setFormState(defaultCustomer())}>Limpiar</button>
        </div>
      </form>

      <div className="panel">
        <div className="toolbar">
          <input className="input" placeholder="Buscar..." value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">Estado</option>{STATUSES.map((s) => <option key={s} value={s}>{translateStatus(s)}</option>)}</select>
          <select className="select" value={type} onChange={(e) => setType(e.target.value)}><option value="">Tipo</option>{TYPES.map((t) => <option key={t} value={t}>{translateType(t)}</option>)}</select>
          <select className="select" value={line} onChange={(e) => setLine(e.target.value)}><option value="">Línea</option>{BUSINESS_LINES.map((b) => <option key={b} value={b}>{translateLine(b)}</option>)}</select>
          <button className="button secondary" onClick={exportCsv}>Exportar CSV</button>
          <button className="button secondary" onClick={() => alert('Importación CSV: pendiente')}>Importar CSV</button>
          <button className="button secondary" onClick={bulkDelete} disabled={!selected.size}>Borrar selección</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th><input type="checkbox" onChange={(e) => { const next = new Set(e.target.checked ? filtered.map((c) => c.id) : []); setSelected(next); }} /></th><th>Nombre</th><th>Empresa</th><th>Tipo</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td><input type="checkbox" checked={selected.has(c.id)} onChange={(e) => setSelected((prev) => { const next = new Set(prev); e.target.checked ? next.add(c.id) : next.delete(c.id); return next; })} /></td>
                  <td><a href={`/_authenticated/customers/${c.id}`}>{c.fullName}</a></td>
                  <td>{c.company}</td>
                  <td>{translateType(c.customerType)}</td>
                  <td>{translateStatus(c.status)}</td>
                  <td>
                    <button className="button secondary" onClick={() => { setEdit(c); setFormState(c); }}>Editar</button>
                    <button className="button danger" onClick={() => remove(c.id!)}>Borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && <div className="empty">Sin clientes</div>}
        </div>
      </div>
    </div>
  );
}

import { createRoute } from '@tanstack/react-router';
import { Route as authenticatedRoute } from './_layout';
import { useEffect, useState } from 'react';
import { listSalesmen, saveSalesman, deleteSalesman, getSalesMetrics, type Salesman } from '~/lib/crm-store';

export const Route = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/salesmen',
  component: SalesmenComponent,
});

function SalesmenComponent() {
  const [salesmen, setSalesmen] = useState<Salesman[]>([]);
  const [editing, setEditing] = useState<Salesman | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    commissionRate: 0,
    active: true,
  });

  useEffect(() => {
    (async () => {
      const data = await listSalesmen();
      setSalesmen(data);
    })();
  }, []);

  const loadMetrics = async () => {
    const metrics = await getSalesMetrics();
    console.log('Sales metrics:', metrics);
    return metrics;
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return;
    
    const saved = await saveSalesman({
      ...(editing || {}),
      ...formData,
      id: editing?.id,
    });
    
    setSalesmen(prev => {
      const next = prev.filter(s => s.id !== saved.id);
      return [...next, saved].sort((a, b) => a.name.localeCompare(b.name));
    });
    
    setFormData({ name: '', email: '', phone: '', commissionRate: 0, active: true });
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar vendedor?')) return;
    await deleteSalesman(id);
    setSalesmen(prev => prev.filter(s => s.id !== id));
  };

  const startEdit = (salesman: Salesman) => {
    setEditing(salesman);
    setFormData({
      name: salesman.name,
      email: salesman.email,
      phone: salesman.phone,
      commissionRate: salesman.commissionRate,
      active: salesman.active,
    });
    setShowForm(true);
  };

  const startNew = () => {
    setEditing(null);
    setFormData({ name: '', email: '', phone: '', commissionRate: 0, active: true });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h2 style={{ margin: 0 }}>Vendedores</h2>
        <button className="button" onClick={startNew}>Nuevo vendedor</button>
      </div>

      <div className="tabs" style={{ marginBottom: 14 }}>
        <button className="tab tab--active" onClick={() => loadMetrics()}>Ver métricas</button>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Comisión</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {salesmen.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.commissionRate}%</td>
                  <td>
                    <span className={`badge ${item.active ? 'badge-active' : 'badge-inactive'}`}>
                      {item.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button className="button secondary" onClick={() => startEdit(item)}>Editar</button>
                    <button className="button danger" onClick={() => handleDelete(item.id!)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!salesmen.length && <div className="empty">Sin vendedores. Agrega uno nuevo.</div>}
        </div>
      </div>

      {showForm && (
        <div className="panel" style={{ marginTop: 14 }}>
          <h3 style={{ margin: '0 0 10px 0' }}>{editing ? 'Editar vendedor' : 'Nuevo vendedor'}</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <div className="field" style={{ flex: 1, minWidth: 200 }}>
                <label className="field-label">Nombre</label>
                <input 
                  className="input" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  required 
                />
              </div>
              <div className="field" style={{ flex: 1, minWidth: 200 }}>
                <label className="field-label">Email</label>
                <input 
                  className="input" 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <div className="field" style={{ flex: 1, minWidth: 200 }}>
                <label className="field-label">Teléfono</label>
                <input 
                  className="input" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                />
              </div>
              <div className="field" style={{ flex: 1, minWidth: 150 }}>
                <label className="field-label">Comisión (%)</label>
                <input 
                  className="input" 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={formData.commissionRate} 
                  onChange={(e) => setFormData({ ...formData, commissionRate: parseFloat(e.target.value) || 0 })} 
                />
              </div>
              <div className="field" style={{ flex: 1, minWidth: 150 }}>
                <label className="field-label">Estado</label>
                <select 
                  className="select" 
                  value={formData.active ? 'active' : 'inactive'} 
                  onChange={(e) => setFormData({ ...formData, active: e.target.value === 'active' })}
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="button" type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
              <button className="button secondary" type="button" onClick={cancelEdit}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
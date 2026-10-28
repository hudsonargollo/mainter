import { createRoute } from '@tanstack/react-router';
import { Route as authenticatedRoute } from './_layout';
import { useEffect, useState } from 'react';
import { listPublicSubmissions, updatePublicSubmissionStatus, type PublicSubmission } from '~/lib/crm-store';

export const Route = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/submissions',
  component: SubmissionsComponent,
});

type Status = PublicSubmission['status'];

const STATUS_LABEL: Record<Status, string> = {
  new: 'Nuevo',
  reviewed: 'Revisado',
  merged: 'Fusionado',
};

function SubmissionsComponent() {
  const [items, setItems] = useState<PublicSubmission[]>([]);
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const data = await listPublicSubmissions();
      setItems(data.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? '')));
    })();
  }, []);

  const visible = filterStatus === 'all' ? items : items.filter((s) => s.status === filterStatus);

  const updateStatus = async (id: string, status: Status) => {
    const updated = await updatePublicSubmissionStatus(id, status);
    if (!updated) return;
    setItems((prev) => prev.map((s) => (s.id === id ? updated : s)));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ margin: 0 }}>Respuestas de formularios</h2>
        <select className="select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
          <option value="all">Todos</option>
          <option value="new">Nuevos</option>
          <option value="reviewed">Revisados</option>
          <option value="merged">Fusionados</option>
        </select>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Formulario</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((item) => (
                <tr key={item.id}>
                  <td>{item.createdAt ? new Date(item.createdAt).toLocaleString('es-BO') : '-'}</td>
                  <td>{item.formId}</td>
                  <td>{item.customerId ?? 'Sin vincular'}</td>
                  <td>
                    <span className={`badge badge-${item.status === 'new' ? 'lead' : item.status === 'reviewed' ? 'active' : 'inactive'}`}>
                      {STATUS_LABEL[item.status]}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button className="button secondary" onClick={() => setExpandedId(expandedId === item.id ? null : item.id!)}>
                      {expandedId === item.id ? 'Ocultar' : 'Ver'}
                    </button>
                    <button className="button secondary" onClick={() => updateStatus(item.id!, 'reviewed')}>Revisado</button>
                    <button className="button secondary" onClick={() => updateStatus(item.id!, 'merged')}>Fusionar</button>
                  </td>
                </tr>
              ))}
              {!visible.length && <tr><td colSpan={5}><div className="empty">Sin respuestas</div></td></tr>}
            </tbody>
          </table>
        </div>

        {expandedId && (
          <div style={{ marginTop: 14 }}>
            {visible.map((item) =>
              item.id === expandedId ? (
                <div key={item.id} className="panel" style={{ padding: 14 }}>
                  <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: 'var(--ink)' }}>
                    {JSON.stringify(item.data, null, 2)}
                  </pre>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

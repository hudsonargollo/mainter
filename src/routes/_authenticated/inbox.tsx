import { createRoute } from '@tanstack/react-router';
import { Route as authenticatedRoute } from './_layout';
import { useEffect, useState } from 'react';
import { listPublicSubmissions, updatePublicSubmissionStatus, listCustomers } from '~/lib/crm-store';
import { type PublicSubmission } from '~/lib/schemas';

export const Route = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/inbox',
  component: InboxComponent,
});

const STATUS_MAP: Record<string, string> = {
  new: 'Por revisar',
  reviewed: 'Revisado',
  merged: 'Fusionado',
};

function InboxComponent() {
  const [submissions, setSubmissions] = useState<PublicSubmission[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [subs, custs] = await Promise.all([listPublicSubmissions(), listCustomers()]);
      setSubmissions(subs.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? '')));
      setCustomers(custs);
    })();
  }, []);

  const updateStatus = async (id: string, status: PublicSubmission['status']) => {
    await updatePublicSubmissionStatus(id, status);
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const findCustomer = (customerId?: string) => customers.find((c) => c.id === customerId);

  return (
    <div>
      <h2 style={{ margin: '0 0 14px 0' }}>Bandeja</h2>
      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Formulario</th><th>Cliente</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead>
            <tbody>
              {submissions.map((item) => (
                <tr key={item.id}>
                  <td>{item.formId}</td>
                  <td>{findCustomer(item.customerId)?.fullName ?? item.customerId ?? '-'}</td>
                  <td>{STATUS_MAP[item.status] ?? item.status}</td>
                  <td>{item.createdAt?.slice(0, 10) ?? '-'}</td>
                  <td style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button className="button secondary" onClick={() => updateStatus(item.id!, 'reviewed')}>Marcar revisado</button>
                    <button className="button secondary" onClick={() => updateStatus(item.id!, 'merged')}>Fusionar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!submissions.length && <div className="empty">Sin envíos públicos aún</div>}
        </div>
      </div>
    </div>
  );
}

import { createRoute } from '@tanstack/react-router';
import { Route as authenticatedRoute } from './_layout';
import { useEffect, useState } from 'react';
import { listCustomers, listInteractions, listFollowUps } from '~/lib/crm-store';

export const Route = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/dashboard',
  component: DashboardComponent,
});

function DashboardComponent() {
  const [stats, setStats] = useState({ total: 0, newThisMonth: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [customers, interactions, followUps] = await Promise.all([listCustomers(), listInteractions(''), listFollowUps()]);
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const newThisMonth = customers.filter((c: any) => c.createdAt ? new Date(c.createdAt) >= startOfMonth : false).length;
      setStats({ total: customers.length, newThisMonth });
      setRecent((interactions || []).sort((a: any, b: any) => (b.date > a.date ? 1 : -1)).slice(0, 8));
      setUpcoming((followUps || []).filter((f: any) => !f.completed).sort((a: any, b: any) => (a.dueDate > b.dueDate ? 1 : -1)).slice(0, 8));
    })();
  }, []);

  return (
    <div>
      <h2 style={{ margin: '0 0 14px 0' }}>Tablero</h2>
      <div className="grid-4">
        <div className="panel"><div className="kpi-value">{stats.total}</div><div className="kpi-label">Clientes totales</div></div>
        <div className="panel"><div className="kpi-value">{stats.newThisMonth}</div><div className="kpi-label">Nuevos este mes</div></div>
        <div className="panel"><div className="kpi-value">-</div><div className="kpi-label">Línea principal</div></div>
        <div className="panel"><div className="kpi-value">-</div><div className="kpi-label">Departamento principal</div></div>
      </div>
      <div className="grid-2" style={{ marginTop: 14 }}>
        <div className="panel">
          <h3 style={{ margin: '0 0 10px 0' }}>Interacciones recientes</h3>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Fecha</th><th>Tipo</th><th>Nota</th></tr></thead>
              <tbody>
                {recent.map((item: any) => <tr key={item.id}><td>{item.date}</td><td>{item.type}</td><td>{item.notes || '-'}</td></tr>)}
              </tbody>
            </table>
            {!recent.length && <div className="empty">Sin interacciones</div>}
          </div>
        </div>
        <div className="panel">
          <h3 style={{ margin: '0 0 10px 0' }}>Seguimientos próximos</h3>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Vencimiento</th><th>Nota</th><th>Estado</th></tr></thead>
              <tbody>
                {upcoming.map((item: any) => <tr key={item.id}><td>{item.dueDate}</td><td>{item.note || '-'}</td><td>{item.completed ? 'Completado' : 'Pendiente'}</td></tr>)}
              </tbody>
            </table>
            {!upcoming.length && <div className="empty">Sin seguimientos</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

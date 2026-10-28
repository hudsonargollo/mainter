import { createRoute } from '@tanstack/react-router';
import { Route as authenticatedRoute } from './_layout';
import { useEffect, useState } from 'react';
import { listPublicSubmissions } from '~/lib/crm-store';

export const Route = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/reports',
  component: ReportsComponent,
});

type AgeGroup = '0-17' | '18-34' | '35-54' | '55+';

function toAgeGroup(age?: string | number | null): AgeGroup | null {
  const n = typeof age === 'string' ? parseInt(age, 10) : age;
  if (!Number.isFinite(n as number)) return null;
  if ((n as number) < 18) return '0-17';
  if ((n as number) < 35) return '18-34';
  if ((n as number) < 55) return '35-54';
  return '55+';
}

function ageLabel(group: AgeGroup) {
  return group === '0-17' ? '0-17' : group === '18-34' ? '18-34' : group === '35-54' ? '35-54' : '55+';
}

function valueOrNull(v: any): string | null {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  return s ? s : null;
}

function ReportsComponent() {
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await listPublicSubmissions();
      setSubmissions(data);
    })();
  }, []);

  const total = submissions.length;

  const countsByAge: Record<AgeGroup, number> = { '0-17': 0, '18-34': 0, '35-54': 0, '55+': 0 };
  const countsByEstado: Record<string, number> = {};
  const countsByTieneHijos: Record<string, number> = {};
  const countsByFutbol: Record<string, number> = {};
  const countsByViaja: Record<string, number> = {};
  const countsByTrabaja: Record<string, number> = {};
  const countsByMadruga: Record<string, number> = {};

  for (const item of submissions) {
    const data = item.data || {};
    const age = toAgeGroup(data.edad);
    if (age) countsByAge[age]++;

    const estado = valueOrNull(data.estado_civil);
    if (estado) countsByEstado[estado] = (countsByEstado[estado] || 0) + 1;

    const hijos = valueOrNull(data.tiene_hijos);
    if (hijos) countsByTieneHijos[hijos] = (countsByTieneHijos[hijos] || 0) + 1;

    const futbol = valueOrNull(data.futbol);
    if (futbol) countsByFutbol[futbol] = (countsByFutbol[futbol] || 0) + 1;

    const viaja = valueOrNull(data.viaja);
    if (viaja) countsByViaja[viaja] = (countsByViaja[viaja] || 0) + 1;

    const trabaja = valueOrNull(data.trabaja_campo);
    if (trabaja) countsByTrabaja[trabaja] = (countsByTrabaja[trabaja] || 0) + 1;

    const madruga = valueOrNull(data.madruga);
    if (madruga) countsByMadruga[madruga] = (countsByMadruga[madruga] || 0) + 1;
  }

  const renderGroup = (title: string, counts: Record<string, number>) => (
    <div className="panel" style={{ padding: 14 }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: 16 }}>{title}</h3>
      {Object.keys(counts).length === 0 && <div className="empty">Sin datos</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {Object.entries(counts)
          .sort((a, b) => (b[1] - a[1]))
          .map(([label, count]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
              <span>{label}</span>
              <span style={{ fontWeight: 800 }}>{count}</span>
            </div>
          ))}
      </div>
    </div>
  );

  const ageTotal = countsByAge['0-17'] + countsByAge['18-34'] + countsByAge['35-54'] + countsByAge['55+'];
  const agePct = (group: AgeGroup) => (ageTotal ? Math.round((countsByAge[group] / ageTotal) * 100) : 0);

  return (
    <div>
      <h2 style={{ margin: '0 0 14px 0' }}>Reportes</h2>

      <div className="grid-4" style={{ marginBottom: 14 }}>
        <div className="panel"><div className="kpi-value">{total}</div><div className="kpi-label">Respuestas totales</div></div>
        <div className="panel"><div className="kpi-value">{countsByViaja['Sí'] + countsByViaja['No'] ? Math.round((countsByViaja['Sí'] / (countsByViaja['Sí'] + countsByViaja['No'])) * 100) : '-'}</div><div className="kpi-label">% viajeros</div></div>
        <div className="panel"><div className="kpi-value">{countsByTieneHijos['Sí'] + countsByTieneHijos['No'] ? Math.round((countsByTieneHijos['Sí'] / (countsByTieneHijos['Sí'] + countsByTieneHijos['No'])) * 100) : '-'}</div><div className="kpi-label">% con hijos</div></div>
        <div className="panel"><div className="kpi-value">{countsByFutbol['Sí'] + countsByFutbol['No'] ? Math.round((countsByFutbol['Sí'] / (countsByFutbol['Sí'] + countsByFutbol['No'])) * 100) : '-'}</div><div className="kpi-label">% fanáticos del fútbol</div></div>
      </div>

      <div className="grid-2" style={{ marginBottom: 14 }}>
        <div className="panel" style={{ padding: 14 }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: 16 }}>Distribución por edad</h3>
          {ageTotal === 0 && <div className="empty">Sin datos</div>}
          {ageTotal > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(['0-17', '18-34', '35-54', '55+'] as AgeGroup[]).map((group) => (
                <div key={group}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span>{ageLabel(group)}</span>
                    <span style={{ fontWeight: 700 }}>{countsByAge[group]} ({agePct(group)}%)</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 999, background: 'rgba(18,32,43,0.06)', overflow: 'hidden' }}>
                    <div style={{ width: `${agePct(group)}%`, height: '100%', background: 'var(--mainter-primary)', borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {renderGroup('Estado civil', countsByEstado)}
      </div>

      <div className="grid-4" style={{ marginBottom: 14 }}>
        {renderGroup('Hijos', countsByTieneHijos)}
        {renderGroup('Fútbol', countsByFutbol)}
        {renderGroup('Viajes', countsByViaja)}
        {renderGroup('Trabajo en el campo', countsByTrabaja)}
      </div>

      <div className="panel" style={{ padding: 14 }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: 16 }}>Rutina</h3>
        <div className="grid-2">
          {renderGroup('Madruga', countsByMadruga)}
          <div className="panel" style={{ padding: 14 }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: 16 }}>Acceso rápido</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <span>Total formularios</span>
                <span style={{ fontWeight: 800 }}>1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <span>Total respuestas</span>
                <span style={{ fontWeight: 800 }}>{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { createRoute } from '@tanstack/react-router';
import { Route as authenticatedRoute } from './_layout';
import { useEffect, useState } from 'react';
import { listForms, saveForm, deleteForm } from '~/lib/crm-store';
import { formSchema, type FormDef } from '~/lib/schemas';

export const Route = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/forms',
  component: FormsComponent,
});

const FIELD_TYPES = [
  { value: 'text', label: 'Texto' },
  { value: 'number', label: 'Número' },
  { value: 'date', label: 'Fecha' },
  { value: 'single_choice', label: 'Opción única' },
  { value: 'multi_choice', label: 'Opción múltiple' },
  { value: 'yes_no', label: 'Sí/No' },
  { value: 'phone', label: 'Teléfono' },
  { value: 'email', label: 'Correo electrónico' },
];

function emptyForm(): FormDef {
  return { id: '', title: '', description: '', fields: [], createdAt: '' };
}

function emptyField() {
  return { id: '', name: '', label: '', type: 'text' as const, required: false, options: [], order: 0 };
}

function FormsComponent() {
  const [forms, setForms] = useState<FormDef[]>([]);
  const [form, setForm] = useState<FormDef>(emptyForm());
  const [field, setField] = useState(emptyField());
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'editor'>('list');

  useEffect(() => {
    (async () => {
      const data = await listForms();
      setForms(data.sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? '')));
    })();
  }, []);

  const saveFormAsync = async (data: FormDef) => {
    const saved = await saveForm(data);
    setForms((prev) => {
      const idx = prev.findIndex((x) => x.id === saved.id);
      const next = [...prev];
      if (idx >= 0) next[idx] = saved; else next.push(saved);
      return next.sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? ''));
    });
    setForm(emptyForm());
    setEditing(false);
    setActiveTab('list');
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = formSchema.parse(form);
    await saveFormAsync(data);
  };

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar formulario?')) return;
    await deleteForm(id);
    setForms((prev) => prev.filter((f) => f.id !== id));
  };

  const addField = () => {
    if (!field.label.trim() || !field.name.trim()) return;
    const nextField = { ...field, id: field.id || Math.random().toString(36).slice(2), order: form.fields.length };
    setForm((prev) => ({ ...prev, fields: [...prev.fields, nextField] }));
    setField(emptyField());
  };

  const removeField = (id: string) => {
    setForm((prev) => ({ ...prev, fields: prev.fields.filter((f) => f.id !== id) }));
  };

  const startEdit = (item: FormDef) => {
    setForm(item);
    setEditing(true);
    setActiveTab('editor');
  };

  const cancelEdit = () => {
    setForm(emptyForm());
    setEditing(false);
    setActiveTab('list');
  };

  const createNew = () => {
    setForm(emptyForm());
    setEditing(false);
    setActiveTab('editor');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h2 style={{ margin: 0 }}>Formularios</h2>
        <button className="button" onClick={createNew}>Nuevo formulario</button>
      </div>

      <div className="tabs" style={{ marginBottom: 14 }}>
        <button className={`tab ${activeTab === 'list' ? 'tab--active' : ''}`} onClick={() => setActiveTab('list')}>Listado</button>
        <button className={`tab ${activeTab === 'editor' ? 'tab--active' : ''}`} onClick={() => setActiveTab('editor')}>{editing ? 'Editar' : 'Nuevo'}</button>
      </div>

      {activeTab === 'list' && (
        <div className="panel">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Título</th><th>Descripción</th><th>Campos</th><th>Acciones</th></tr></thead>
              <tbody>
                {forms.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.fields.length}</td>
                    <td style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button className="button secondary" onClick={() => startEdit(item)}>Editar</button>
                      <button className="button danger" onClick={() => remove(item.id!)}>Borrar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!forms.length && <div className="empty">Sin formularios</div>}
          </div>
        </div>
      )}

      {activeTab === 'editor' && (
        <form onSubmit={save} className="panel">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            <label className="field">Título <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
            <label className="field">Descripción <input className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          </div>

          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <h3 style={{ margin: 0 }}>Campos</h3>
            <button className="button secondary" type="button" onClick={addField}>Agregar campo</button>
          </div>

          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {form.fields.map((fld, idx) => (
              <div key={fld.id} className="panel" style={{ padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                  <div>
                    <strong>{idx + 1}. {fld.label}</strong>
                    <div style={{ color: 'var(--muted)', fontSize: 12 }}>{FIELD_TYPES.find((t) => t.value === fld.type)?.label} {fld.required ? '• Obligatorio' : ''}</div>
                  </div>
                  <button className="button secondary" onClick={() => removeField(fld.id!)}>Quitar</button>
                </div>
              </div>
            ))}
            {!form.fields.length && <div className="empty">Sin campos. Agrega el primero.</div>}
          </div>

          <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
            <button className="button" type="submit">{editing ? 'Actualizar' : 'Crear formulario'}</button>
            {editing && <button className="button secondary" type="button" onClick={cancelEdit}>Cancelar</button>}
          </div>
        </form>
      )}

      <div className="panel" style={{ marginTop: 14 }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Agregar campo</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
          <label className="field">Nombre <input className="input" value={field.name} onChange={(e) => setField({ ...field, name: e.target.value })} /></label>
          <label className="field">Etiqueta <input className="input" value={field.label} onChange={(e) => setField({ ...field, label: e.target.value })} /></label>
          <label className="field">Tipo <select className="select" value={field.type} onChange={(e) => setField({ ...field, type: e.target.value as FormDef['fields'][0]['type'] })}>
            {FIELD_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select></label>
        </div>
        <label style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={field.required} onChange={(e) => setField({ ...field, required: e.target.checked })} />
          <span>Obligatorio</span>
        </label>
        {(field.type === 'single_choice' || field.type === 'multi_choice') && (
          <label className="field" style={{ marginTop: 10 }}>Opciones <input className="input" value={field.options.join(', ')} onChange={(e) => setField({ ...field, options: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} /></label>
        )}
      </div>
    </div>
  );
}

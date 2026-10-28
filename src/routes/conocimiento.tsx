import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/conocimiento',
  component: ConocimientoComponent,
});

function ConocimientoComponent() {
  const params = new URLSearchParams(window.location.search);
  const prefilled = params.get('cliente') || '';

  return (
    <div className="conocimiento-wrap">
      <div className="conocimiento-card">
        <div className="conocimiento-header">
          <img src="/logomainter.png" alt="Mainter" className="conocimiento-logo" />
          <h1>Conocimiento del cliente</h1>
          <p>Cuéntenos sobre su familia, gustos y rutina para acompañarlo mejor.</p>
        </div>

        <form className="conocimiento-form" onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const data = new FormData(form);
          const payload = Object.fromEntries(data.entries());
          const submission = {
            id: crypto.randomUUID(),
            formId: 'conocimiento',
            customerId: prefilled || null,
            data: payload,
            status: 'new',
            createdAt: new Date().toISOString(),
          };
          await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submission) });
          alert('Gracias, su información fue enviada.');
          form.reset();
        }}>
          <section className="form-section">
            <h2>Datos personales</h2>
            <div className="field">
              <label>Nombre completo <span className="required">*</span></label>
              <input name="nombre_completo" required defaultValue={prefilled} />
            </div>
            <div className="grid-2">
              <div className="field">
                <label>Edad</label>
                <input name="edad" type="number" min="0" />
              </div>
              <div className="field">
                <label>Estado civil</label>
                <select name="estado_civil">
                  <option value="">Seleccione</option>
                  <option>Soltero</option>
                  <option>Casado</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>¿Tiene hijos?</label>
              <select name="tiene_hijos">
                <option value="">Seleccione</option>
                <option>Sí</option>
                <option>No</option>
              </select>
            </div>
          </section>

          <section className="form-section">
            <h2>Familia y orígenes</h2>
            <div className="field">
              <label>Aniversario de bodas</label>
              <input name="aniversario" type="date" />
            </div>
            <div className="field">
              <label>¿Tiene nietos?</label>
              <select name="tiene_nietos">
                <option value="">Seleccione</option>
                <option>Sí</option>
                <option>No</option>
              </select>
            </div>
            <div className="field">
              <label>Ciudad o región de origen</label>
              <input name="origen" />
            </div>
            <div className="field">
              <label>Tradición familiar importante</label>
              <textarea name="tradicion_familiar" rows="3"></textarea>
            </div>
          </section>

          <section className="form-section">
            <h2>Gustos, aficiones y estilo de vida</h2>
            <div className="field">
              <label>Comida favorita</label>
              <input name="comida_favorita" />
            </div>
            <div className="field">
              <label>¿Le gusta el fútbol?</label>
              <select name="futbol">
                <option value="">Seleccione</option>
                <option>Sí</option>
                <option>No</option>
              </select>
            </div>
            <div className="field">
              <label>Equipo favorito</label>
              <input name="equipo_favorito" />
            </div>
            <div className="field">
              <label>Actividades con su Asesor de Negocios</label>
              <textarea name="actividades_adn" rows="3"></textarea>
            </div>
            <div className="field">
              <label>Aficiones o pasatiempos</label>
              <textarea name="aficiones" rows="3"></textarea>
            </div>
            <div className="field">
              <label>¿Le gusta viajar?</label>
              <select name="viaja">
                <option value="">Seleccione</option>
                <option>Sí</option>
                <option>No</option>
              </select>
            </div>
            <div className="field">
              <label>¿Viaja frecuentemente?</label>
              <select name="viaja_frecuencia">
                <option value="">Seleccione</option>
                <option>Sí</option>
                <option>No</option>
              </select>
            </div>
          </section>

          <section className="form-section">
            <h2>Rutina, personalidad y vínculo con el campo</h2>
            <div className="field">
              <label>¿Trabaja solo o con familia en el campo?</label>
              <select name="trabaja_campo">
                <option value="">Seleccione</option>
                <option>Solo</option>
                <option>Con familia</option>
              </select>
            </div>
            <div className="field">
              <label>¿Madruga mucho?</label>
              <select name="madruga">
                <option value="">Seleccione</option>
                <option>Sí</option>
                <option>No</option>
              </select>
            </div>
            <div className="field">
              <label>¿Qué disfruta más de su vida en el campo?</label>
              <textarea name="disfruta_campo" rows="3"></textarea>
            </div>
            <div className="field">
              <label>¿Cómo empezó en el rubro agrícola?</label>
              <textarea name="inicio_agricola" rows="3"></textarea>
            </div>
            <div className="field">
              <label>¿Qué es lo que más le relaja en campañas difíciles?</label>
              <textarea name="relaja_campana" rows="3"></textarea>
            </div>
            <div className="field">
              <label>Logro personal o familiar del que más se enorgullece</label>
              <textarea name="logro" rows="3"></textarea>
            </div>
          </section>

          <section className="form-section">
            <h2>Relación con el Asesor de Negocios</h2>
            <div className="field">
              <label>Horario preferido para la visita del ADN</label>
              <select name="horario_adn">
                <option value="">Seleccione</option>
                <option>Mañana temprano</option>
                <option>Mediodía</option>
                <option>Tarde</option>
              </select>
            </div>
            <div className="field">
              <label>¿Cómo prefiere que lo contacten?</label>
              <select name="contacto_adn">
                <option value="">Seleccione</option>
                <option>Llamada directa</option>
                <option>WhatsApp</option>
                <option>Audios</option>
              </select>
            </div>
            <div className="field">
              <label>Tema del que más le gusta hablar con su ADN</label>
              <input name="tema_adn" />
            </div>
            <div className="field">
              <label>Anécdota o recuerdo con su ADN</label>
              <textarea name="anecdota_adn" rows="3"></textarea>
            </div>
          </section>

          <div className="form-actions">
            <button className="button primary" type="submit">Enviar información</button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from '../__root';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/f/$formId',
  component: PublicFormComponent,
});

function PublicFormComponent() {
  return (
    <div className="login-wrap">
      <form className="login-card">
        <h1 className="login-title">Formulario público</h1>
        <div className="empty">Formulario compartido.</div>
      </form>
    </div>
  );
}

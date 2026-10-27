import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import LoginPage from '~/components/LoginPage';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPageComponent,
});

function LoginPageComponent() {
  return <LoginPage />;
}

import { createRoute, Outlet, redirect } from '@tanstack/react-router';
import { Route as rootRoute } from '../__root';
import { getSession } from '~/lib/auth';
import Layout from '~/components/Layout';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/_authenticated',
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) throw redirect({ to: '/login' });
    return { isAuthenticated: true };
  },
  component: function AuthenticatedLayout() {
    return <Layout><Outlet /></Layout>;
  },
});

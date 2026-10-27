import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
export interface RouterContext { isAuthenticated: boolean; }
export const Route = createRootRouteWithContext<RouterContext>()({ component: RootComponent });
function RootComponent() { return <Outlet />; }

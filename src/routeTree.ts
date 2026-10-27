import { Route as rootRoute } from './routes/__root';
import { Route as indexRoute } from './routes/index';
import { Route as loginRoute } from './routes/login';
import { Route as authenticatedRoute } from './routes/_authenticated/_layout';
import { Route as dashboardRoute } from './routes/_authenticated/dashboard';
import { Route as customersRoute } from './routes/_authenticated/customers';
import { Route as customerProfileRoute } from './routes/_authenticated/customers/$customerId';
import { Route as formsRoute } from './routes/_authenticated/forms';
import { Route as followUpsRoute } from './routes/_authenticated/follow-ups';
import { Route as inboxRoute } from './routes/_authenticated/inbox';
import { Route as publicFormRoute } from './routes/f/$formId';

export const routeTree = (rootRoute as any).addChildren([
  indexRoute,
  loginRoute,
  publicFormRoute,
  (authenticatedRoute as any).addChildren([
    dashboardRoute,
    customersRoute,
    customerProfileRoute,
    formsRoute,
    followUpsRoute,
    inboxRoute,
  ]),
]);

import { PartialRouteObject } from 'react-router';
import { isAdmin } from 'src/config';
import { adminRoute } from 'src/routers/admin';
import { baseRoute } from 'src/routers/base';
import { clientRoute } from 'src/routers/client';
import { commonRoute } from 'src/routers/common';

const routes: PartialRouteObject[] = [...baseRoute, ...commonRoute];

if (isAdmin) {
  routes.push(...adminRoute);
} else {
  routes.push(...clientRoute);
}

export default routes;

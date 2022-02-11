import { lazy, Suspense } from 'react';
import { PartialRouteObject } from 'react-router';
import RequireAuth from 'src/components/RequireAuth';
import SuspenseLoader from 'src/components/SuspenseLoader';
import SidebarLayout from 'src/layouts/SidebarLayout';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const ProgressTxtTable = Loader(lazy(() => import('src/pages/ProgressTable')));
const App = Loader(lazy(() => import('src/pages/App')));

export const adminRoute: PartialRouteObject[] = [
  {
    path: 'progress-approval',
    element: <RequireAuth children={<SidebarLayout />} />,
    children: [
      {
        path: '/',
        element: <ProgressTxtTable />
      }
    ]
  },
  {
    path: 'app',
    element: <RequireAuth children={<SidebarLayout />} />,
    children: [
      {
        path: '/',
        element: <App />
      }
    ]
  }
];

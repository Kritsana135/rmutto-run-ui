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

const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UpdateProgress = Loader(
  lazy(() => import('src/pages/Progress/UpdateProgress'))
);

export const clientRoute: PartialRouteObject[] = [
  {
    path: 'progress',
    element: <RequireAuth children={<SidebarLayout />} />,
    children: [
      {
        path: '/',
        element: <UpdateProgress />
      }
    ]
  },
  {
    path: 'profile',
    element: <RequireAuth children={<SidebarLayout />} />,
    children: [
      {
        path: '/',
        element: <UserProfile />
      }
    ]
  }
];

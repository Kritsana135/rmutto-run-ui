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
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);
const LeaderboardTable = Loader(
  lazy(() => import('src/pages/LeaderboardTable'))
);
const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);

export const commonRoute: PartialRouteObject[] = [
  {
    path: 'profile',
    element: <RequireAuth children={<SidebarLayout />} />,
    children: [
      {
        path: '/',
        element: <UserProfile />
      }
    ]
  },
  {
    path: 'settings',
    element: <RequireAuth children={<SidebarLayout />} />,
    children: [
      {
        path: '/',
        element: <UserSettings />
      }
    ]
  },
  {
    path: 'leaderboard',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <LeaderboardTable />
      }
    ]
  },
  {
    path: 'message',
    element: <RequireAuth children={<SidebarLayout />} />,
    children: [
      {
        path: '/',
        element: <Messenger />
      }
    ]
  }
];

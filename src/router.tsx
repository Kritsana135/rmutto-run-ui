import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import Login from './pages/Login';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

// Pages
const App = Loader(lazy(() => import('src/pages/App')));
const ForgotPassword = Loader(lazy(() => import('src/pages/ForgotPassword')));
const Verify = Loader(lazy(() => import('src/pages/Verify')));
const LeaderboardTable = Loader(
  lazy(() => import('src/pages/LeaderboardTable'))
);
const ProgressTxtTable = Loader(lazy(() => import('src/pages/ProgressTable')));

export const notRequireAuth = [
  '/',
  '/login',
  '/status',
  '/forgot-password',
  '/signup',
  '/verify'
];

const baseRoute: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: 'login',
        element: <Navigate to="/" replace />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      },
      {
        path: 'verify/:token',
        element: <Verify />
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  }
];

const routes: PartialRouteObject[] = [
  ...baseRoute,
  {
    path: 'profile',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="details" replace />
      },
      {
        path: 'details',
        element: <UserProfile />
      }
    ]
  },
  {
    path: 'settings',
    element: <SidebarLayout />,
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
    path: 'progress-approval',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <ProgressTxtTable />
      }
    ]
  },
  {
    path: 'message',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Messenger />
      }
    ]
  }
];

export default routes;

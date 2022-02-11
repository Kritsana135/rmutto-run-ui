import { element } from 'prop-types';
import { lazy, Suspense } from 'react';
import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { isAdmin } from 'src/config';
import BaseLayout from 'src/layouts/BaseLayout';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const ForgotPassword = Loader(lazy(() => import('src/pages/ForgotPassword')));
const Verify = Loader(lazy(() => import('src/pages/Verify')));
const ChangePassword = Loader(lazy(() => import('src/pages/ChangePassword')));
const LoginAdmin = Loader(lazy(() => import('src/pages/LoginAdmin')));
const LoginClient = Loader(lazy(() => import('src/pages/LoginClient')));
const Signout = Loader(lazy(() => import('src/pages/Signout')));
const ResendVerify = Loader(lazy(() => import('src/pages/ResendVerify')));

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

export const baseRoute: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: isAdmin ? <LoginAdmin /> : <LoginClient />
      },
      {
        path: 'login',
        element: <Navigate to="/" replace />
      },
      {
        path: 'sign-out',
        element: <Signout />
      },
      {
        path: 'resend-verify',
        element: <ResendVerify />
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
        path: 'reset/:token',
        element: <ChangePassword />
      },
      {
        path: 'change-password',
        element: <ChangePassword isChangePassword />
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

if (!isAdmin) {
  const SignUp = Loader(lazy(() => import('src/pages/SignUp')));

  baseRoute[0].children.push({
    path: 'signup',
    element: <SignUp />
  });
}

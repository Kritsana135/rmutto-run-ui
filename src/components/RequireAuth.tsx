import { Navigate, useLocation } from 'react-router';
import { getAccessToken } from '../utils/accessToken';

function RequireAuth({ children }: { children: JSX.Element }) {
  let accessToken = getAccessToken();
  let location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;

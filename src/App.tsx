import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRoutes } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { express_path } from 'src/config';
import { setAccessToken, setUserId } from 'src/utils/accessToken';
import routes from './router';
import ThemeProvider from './theme/ThemeProvider';

const App = () => {
  const content = useRoutes(routes);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${express_path}/refresh_token`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(async (x) => {
        const { accessToken, userId } = await x.json();
        setAccessToken(accessToken);
        setUserId(userId);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        navigate('/');
      });
  }, []);

  if (loading) {
    return <SuspenseLoader />;
  }

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
};
export default App;

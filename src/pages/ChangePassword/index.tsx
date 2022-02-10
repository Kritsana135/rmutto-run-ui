import { Box, Card, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { useRoutes } from 'react-router';
import Logo from 'src/components/LogoSign';
import ChangePassword from './ChangePasswordForm';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

interface ChangPasswordProps {
  isChangePassword?: boolean;
}

function ChangPassword({ isChangePassword = false }: ChangPasswordProps) {
  const { token } = useParams();

  return (
    <OverviewWrapper>
      <Helmet>
        <title>Change Password - RMUTTO Run</title>
      </Helmet>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <Logo />
        </Box>
        <Card sx={{ p: 5, mb: 10 }}>
          <ChangePassword token={token} isChangePassword={isChangePassword} />
        </Card>
      </Container>
    </OverviewWrapper>
  );
}

export default ChangPassword;

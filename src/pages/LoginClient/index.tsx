import { Box, Card, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import Logo from 'src/components/LogoSign';
import LoginForm from './LoginForm';



const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Login() {
  const navigate = useNavigate();

  return (
    <OverviewWrapper>
      <Helmet>
        <title>Login - RMUTTO Run</title>
      </Helmet>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <Logo />
        </Box>
        <Card sx={{ p: 5, mb: 10 }}>
          <LoginForm />
        </Card>
      </Container>
    </OverviewWrapper>
  );
}

export default Login;

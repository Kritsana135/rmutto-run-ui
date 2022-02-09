import { Box, Card, Container, Link } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as ReactLink } from 'react-router-dom';
import { AuthWrapper } from 'src/components/AuthWrapper';
import Logo from 'src/components/LogoSign';
import ForgotForm from './SignUpForm';


function SignUp() {
  return (
    <AuthWrapper>
      <Helmet>
        <title>Sign Up - RMUTTO Run</title>
      </Helmet>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <Logo />
        </Box>
        <Card sx={{ p: 5, mb: 2 }}>
          <ForgotForm />
        </Card>
        <Box p={1} display={'flex'} justifyContent={'flex-end'}>
          <span>ต้องการลองลงชื่อเข้าใช้อีกครั้งหรือไม่ </span>
          <Link
            to="/login"
            underline="hover"
            color="primary"
            ml={1}
            component={ReactLink}
          >
            <b> คลิกที่นี่</b>
          </Link>
        </Box>
      </Container>
    </AuthWrapper>
  );
}

export default SignUp;

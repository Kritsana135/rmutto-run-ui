import { Box, Container, Card, Link } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import ForgotForm from './ForgotForm';
import { Link as ReactLink } from 'react-router-dom';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function FotgotPassword() {
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Fotgot Password - RMUTTO Run</title>
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
    </OverviewWrapper>
  );
}

export default FotgotPassword;

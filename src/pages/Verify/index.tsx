import { Box, Card, Container, Link } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as ReactLink } from 'react-router-dom';
import { AuthWrapper } from 'src/components/AuthWrapper';
import Logo from 'src/components/LogoSign';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useParams } from 'react-router';
import {
  IVerifyUserReq,
  IVerifyUserRes,
  VERIFY_USER_DOCUMENT
} from 'src/graphql/verify/verifyUser';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useLoaderContext } from 'src/contexts/LoaderProvider';
import { useAlertContext } from 'src/contexts/AlertProvider';
import DangerousIcon from '@mui/icons-material/Dangerous';

const succesVerify = {
  success: true,
  to: '/login',
  messageTo: 'ลงชื่อเข้าใช้',
  messageStatus: 'ยืนยันอีเมลสำเร็จ'
};

// TODO: add fail route
const failVerify = {
  success: false,
  to: '/resend-verify',
  messageTo: 'ส่งอีเมลยืนยันอีกครั้ง',
  messageStatus: 'ยืนยันอีเมลไม่สำเร็จ'
};

function Verify() {
  const { token } = useParams();
  const [Verify] = useMutation<IVerifyUserRes, IVerifyUserReq>(
    VERIFY_USER_DOCUMENT
  );

  const { openLoader, closeLoader } = useLoaderContext();
  const { openAlert } = useAlertContext();

  const [verify, setVerify] = useState(succesVerify);

  useEffect(() => {
    if (token) {
      openLoader();
      Verify({
        variables: { token },
        onCompleted: (data) => {
          closeLoader();
          if (data?.verifyUser.code !== 'OK') {
            openAlert({
              message: data?.verifyUser.message || '',
              severity: 'error'
            });
            setVerify(failVerify);
          } else if (data.verifyUser.code === 'OK') {
            setVerify(succesVerify);
          }
        },
        onError: (err) => {
          closeLoader();
          setVerify(failVerify);
          openAlert({ message: err.message, severity: 'error' });
        }
      });
    }
  }, [token]);

  return (
    <AuthWrapper>
      <Helmet>
        <title>Verify - RMUTTO Run</title>
      </Helmet>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <Logo />
        </Box>
        <Card sx={{ p: 5, mb: 2 }}>
          {/* TODO: change verify path in server */}
          <Box display="flex" justifyContent={'space-between'}>
            {verify.success ? (
              <CheckCircleOutlineIcon
                style={{ fontSize: 82 }}
                color="primary"
              />
            ) : (
              <DangerousIcon style={{ fontSize: 82 }} color="primary" />
            )}

            <h1>{verify.messageStatus}</h1>
          </Box>
        </Card>
        <Box p={1} display={'flex'} justifyContent={'flex-end'}>
          <span>{verify.messageTo} </span>
          <Link
            to={verify.to}
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

export default Verify;

import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useAlertContext } from 'src/contexts/AlertProvider';
import { useLoaderContext } from 'src/contexts/LoaderProvider';
import {
  ILoginInput,
  ILoginReq,
  ILoginRes,
  LOGIN_DOCUMENT
} from 'src/graphql/auth/signin';
import { setAccessToken, setUserId } from 'src/utils/accessToken';
import ValidateUtils from 'src/utils/ValidateUtils';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
      font-size: ${theme.typography.pxToRem(40)};
  `
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
      font-size: ${theme.typography.pxToRem(17)};
  `
);

// const TR = styled(RouterLink)(Link)

function LoginForm() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ILoginInput>({ defaultValues: defaultForm });

  const [Login] = useMutation<ILoginRes, ILoginReq>(LOGIN_DOCUMENT);

  const navigate = useNavigate();

  const onLogin = (input: ILoginInput) => {
    openLoader();
    Login({
      variables: { input },
      onCompleted: (res) => {
        console.log(res);
        closeLoader();
        if (res.login.code === 'OK') {
          setAccessToken(res.login.payload?.accessToken || '');
          setUserId(res.login.payload?.userId || '');
          navigate('/profile');
        } else {
          openAlert({ message: res.login.message, severity: 'warning' });
        }
      }
    });
  };

  const { openLoader, closeLoader } = useLoaderContext();
  const { openAlert } = useAlertContext();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Grid justifyContent="center" alignItems="center" container>
        <Grid item>
          <TypographyH1 sx={{ mb: 2 }} variant="h2">
            Sign in
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            Fill in the fields below to sign into your account.
          </TypographyH2>
        </Grid>

        <form onSubmit={handleSubmit(onLogin)}>
          <Grid item>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  type="email"
                  error={!!errors.email}
                  fullWidth
                  helperText={errors.email?.message}
                />
              )}
              name="email"
              control={control}
              rules={{
                ...defaultRule,
                validate: (value) =>
                  ValidateUtils.validateEmail(value) ||
                  'รูปแบบของEmailไม่ถูกต้อง'
              }}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"
                  style={{ marginTop: 9 }}
                  error={!!errors.password}
                  fullWidth
                  helperText={errors.password?.message}
                />
              )}
              name="password"
              control={control}
              rules={{
                ...defaultRule,
                minLength: {
                  value: 8,
                  message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร'
                }
              }}
            />
          </Grid>
          <Grid item>
            <Box p={1} display={'flex'} justifyContent={'flex-end'}>
              <Link
                underline="hover"
                color="primary"
                component={RouterLink}
                to="/forgot-password"
              >
                <b>forgot password</b>
              </Link>
            </Box>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Sign in
            </Button>
          </Grid>
          <Grid item mt={1}>
            <Box display={'flex'} justifyContent={'flex-start'}>
              <span>Don’t have an account, yet?</span>
              <Link
                component={RouterLink}
                to="/signup"
                underline="hover"
                color="primary"
                ml={1}
              >
                <b> Sign up here</b>
              </Link>
            </Box>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

const defaultForm: ILoginInput = {
  email: '',
  password: ''
};

const defaultRule = {
  required: 'ต้องกรอกฟิลด์นี้'
};

export default LoginForm;

import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAlertContext } from 'src/contexts/AlertProvider';
import { useLoaderContext } from 'src/contexts/LoaderProvider';
import {
  ILoginInput,
  ILoginReq,
  ILoginRes,
  LOGIN_DOCUMENT
} from 'src/graphql/signin';
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

function ForgotForm() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ILoginInput>({ defaultValues: defaultForm });

  const [Login] = useMutation<ILoginRes, ILoginReq>(LOGIN_DOCUMENT);

  const navigate = useNavigate();

  const onLogin = (input: ILoginInput) => {
    console.log(input);
    openLoader();
    Login({
      variables: { input },
      onCompleted: (res) => {
        console.log(res);
        closeLoader();
        if (res.login.code === 'OK') {
          setAccessToken(res.login.payload?.accessToken || '');
          setUserId(res.login.payload?.userId || '');
          navigate('/management/app');
        } else {
          openAlert({ message: res.login.message, severity: 'warning' });
        }
      }
    });
  };

  const { openLoader, closeLoader } = useLoaderContext();
  const { openAlert } = useAlertContext();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'left' }}>
      <Grid justifyContent="flex-start" alignItems="center" container>
        <Grid item>
          <TypographyH1 sx={{ mb: 2 }} variant="h3">
            Password Recovery
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.2, pb: 3 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            Enter your registered email to reset your password.
          </TypographyH2>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onLogin)}>
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
                  ValidateUtils.validateEmail(value) || 'Invalid email format'
              }}
            />
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                send recovery email
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

const defaultForm: ILoginInput = {
  email: '',
  password: ''
};

const defaultRule = {
  required: 'This field is required.'
};

export default ForgotForm;

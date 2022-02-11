import { useMutation } from '@apollo/client';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAlertContext } from 'src/contexts/AlertProvider';
import { useLoaderContext } from 'src/contexts/LoaderProvider';
import { RESEND_VERIFY_DOCUMENT } from 'src/graphql/auth/resendVerify';

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

interface IResendForm {
  email: string;
}

function ResendVerify() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IResendForm>({ defaultValues: defaultForm });

  const [Resend] = useMutation(RESEND_VERIFY_DOCUMENT);

  const navigate = useNavigate();

  const { openLoader, closeLoader } = useLoaderContext();
  const { openAlert } = useAlertContext();

  const onResend = (input: IResendForm) => {
    openLoader();
    Resend({
      variables: {
        email: input.email
      },
      onCompleted: (res) => {
        closeLoader();
        openAlert({
          message: res.resetPass,
          severity: 'success',
          duration: 6000
        });
        setTimeout(() => {
          navigate('/');
        }, 6000);
      },
      onError: (res) => {
        closeLoader();
        openAlert({
          message: res.message,
          severity: 'error'
        });
      }
    });
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Grid justifyContent="center" alignItems="center" container>
        <Grid item>
          <TypographyH1 sx={{ mb: 2 }} variant="h2">
            Change Password
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            Fill in the fields below to change your password.
          </TypographyH2>
        </Grid>

        <form onSubmit={handleSubmit(onResend)}>
          <Grid item>
            {/* email */}
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  variant="outlined"
                  style={{ marginTop: 9 }}
                  error={!!errors.email}
                  fullWidth
                  helperText={errors.email?.message}
                  inputProps={{
                    maxLength: 30
                  }}
                />
              )}
              name="email"
              control={control}
              rules={{
                ...defaultRule
              }}
            />
          </Grid>
          <Grid item mt={2}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Send email
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

const defaultForm: IResendForm = {
  email: ''
};

const defaultRule = {
  required: 'This field is required.'
};

export default ResendVerify;

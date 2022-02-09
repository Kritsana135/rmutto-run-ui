import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAlertContext } from 'src/contexts/AlertProvider';
import { useLoaderContext } from 'src/contexts/LoaderProvider';
import { IBaseInputReq } from 'src/graphql/base';

import ValidateUtils from 'src/utils/ValidateUtils';
import _ from 'loadsh';
import {
  ISignupInputForm,
  ISignUpRes,
  SIGNUP_DOCUMENT
} from 'src/graphql/auth/signup';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
      font-size: ${theme.typography.pxToRem(40)};
  `
);

function SignUpForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setError,
    reset
  } = useForm<ISignupInputForm>({ defaultValues: defaultForm });

  const [SignUp] = useMutation<ISignUpRes, IBaseInputReq<ISignupInputForm>>(
    SIGNUP_DOCUMENT
  );

  const navigate = useNavigate();

  const onSignUp = (input: ISignupInputForm) => {
    openLoader();
    const newInput = _.omit(input, 'confirmPassword');
    SignUp({
      variables: { input: newInput },
      onCompleted: (data) => {
        closeLoader();
        if (data?.signup.code !== 'OK') {
          openAlert({ message: data?.signup.message || '', severity: 'error' });
        } else if (data.signup.code === 'OK') {
          openAlert({
            message: data?.signup.message || '',
            severity: 'success',
            duration: 6000
          });
          reset();
          setTimeout(() => {
            navigate('/login');
          }, 6000);
        }
      },
      onError: (err) => {
        closeLoader();
        openAlert({ message: err.message, severity: 'error' });
      }
    });
  };

  // watch form value
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const isMatchPassword = () => {
    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'pattern',
        message: 'Passwords do not match'
      });
      return false;
    }
    return true;
  };

  const { openLoader, closeLoader } = useLoaderContext();
  const { openAlert } = useAlertContext();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'left' }}>
      <Grid justifyContent="flex-start" alignItems="center" container>
        <Grid item>
          <TypographyH1 sx={{ mb: 2 }} variant="h2">
            Sign up
          </TypographyH1>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSignUp)}>
            {/* firstName */}
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fist name"
                  variant="outlined"
                  type="string"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  fullWidth
                  inputProps={{
                    maxLength: 30
                  }}
                />
              )}
              name="firstName"
              control={control}
              rules={{
                ...defaultRule,
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters long.'
                }
              }}
            />
            {/* lastName */}
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last name"
                  type="string"
                  variant="outlined"
                  style={{ marginTop: 9 }}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  fullWidth
                  inputProps={{
                    maxLength: 30
                  }}
                />
              )}
              name="lastName"
              control={control}
              rules={{
                ...defaultRule,
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters long.'
                }
              }}
            />
            {/* address */}
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  type="string"
                  variant="outlined"
                  style={{ marginTop: 9 }}
                  error={!!errors.address}
                  fullWidth
                  helperText={errors.address?.message}
                />
              )}
              name="address"
              control={control}
              rules={defaultRule}
            />
            {/* phoneNo */}
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone number"
                  type="string"
                  variant="outlined"
                  style={{ marginTop: 9 }}
                  error={!!errors.phoneNumber}
                  fullWidth
                  helperText={errors.phoneNumber?.message}
                  inputProps={{
                    maxLength: 15
                  }}
                />
              )}
              name="phoneNumber"
              control={control}
              rules={{
                ...defaultRule,
                minLength: {
                  value: 9,
                  message: 'Phone number must be at least 9 characters long.'
                }
              }}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="string"
                  variant="outlined"
                  style={{ marginTop: 9 }}
                  error={!!errors.email}
                  fullWidth
                  helperText={errors.email?.message}
                />
              )}
              name="email"
              control={control}
              rules={{
                ...defaultRule,
                validate: (email) =>
                  ValidateUtils.validateEmail(email) || 'Invalid email format'
              }}
            />
            {/* password */}
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
                  inputProps={{
                    maxLength: 30
                  }}
                />
              )}
              name="password"
              control={control}
              rules={{
                ...defaultRule,
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long.'
                }
              }}
            />
            {/* confirm password */}
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm password"
                  type="password"
                  variant="outlined"
                  style={{ marginTop: 9 }}
                  error={!!errors.confirmPassword}
                  fullWidth
                  helperText={errors.confirmPassword?.message}
                  onBlur={isMatchPassword}
                  inputProps={{
                    maxLength: 30
                  }}
                />
              )}
              name="confirmPassword"
              control={control}
              rules={{
                ...defaultRule,
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long.'
                },
                validate: (confirmPassword) =>
                  password === confirmPassword || 'Passwords do not match'
              }}
            />
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Sign up
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

const defaultForm: ISignupInputForm = {
  address: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  phoneNumber: '',
  confirmPassword: ''
};

const defaultRule = {
  required: 'This field is required.'
};

export default SignUpForm;

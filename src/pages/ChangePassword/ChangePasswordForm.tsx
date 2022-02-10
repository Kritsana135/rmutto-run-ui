import { useMutation } from '@apollo/client';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAlertContext } from 'src/contexts/AlertProvider';
import { useLoaderContext } from 'src/contexts/LoaderProvider';
import {
  IChangePassReq,
  CHANGE_PASS_DOCUMENT
} from 'src/graphql/auth/changePassword';
import {
  IResetPassInput,
  RESET_PASS_DOCUMENT
} from '../../graphql/auth/resetPassword';

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

interface ChangePasswordProps {
  token: string;
  isChangePassword?: boolean;
}
interface IResetPassForm {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

function ChangePassword({ token, isChangePassword }: ChangePasswordProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    watch
  } = useForm<IResetPassForm>({ defaultValues: defaultForm });

  const [ResetPass] = useMutation<any, IResetPassInput>(RESET_PASS_DOCUMENT);
  const [ChangePass] = useMutation<any, IChangePassReq>(CHANGE_PASS_DOCUMENT);

  const navigate = useNavigate();

  const { openLoader, closeLoader } = useLoaderContext();
  const { openAlert } = useAlertContext();

  const onResetPass = (input: IResetPassForm) => {
    openLoader();
    ResetPass({
      variables: {
        input: {
          newPass: input.password,
          token
        }
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

  const onChangePassword = (input: IResetPassForm) => {
    openLoader();
    ChangePass({
      variables: {
        oldPassword: input.oldPassword,
        newPassword: input.password
      },
      onCompleted: (res) => {
        closeLoader();
        openAlert({
          message: res.changePassword,
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

        <form
          onSubmit={handleSubmit(
            isChangePassword ? onChangePassword : onResetPass
          )}
        >
          <Grid item>
            {/* old password */}
            {isChangePassword && (
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Old Password"
                    type="password"
                    variant="outlined"
                    style={{ marginTop: 9 }}
                    error={!!errors.oldPassword}
                    fullWidth
                    helperText={errors.oldPassword?.message}
                    inputProps={{
                      maxLength: 30
                    }}
                  />
                )}
                name="oldPassword"
                control={control}
                rules={{
                  ...defaultRule,
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long.'
                  }
                }}
              />
            )}

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
                  label="Confirm Password"
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
          </Grid>
          <Grid item mt={2}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Change Password
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

const defaultForm: IResetPassForm = {
  password: '',
  confirmPassword: '',
  oldPassword: ''
};

const defaultRule = {
  required: 'This field is required.'
};

export default ChangePassword;

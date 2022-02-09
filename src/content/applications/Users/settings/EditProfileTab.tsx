import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Text from 'src/components/Text';
import CheckIcon from '@mui/icons-material/Check';
import { useMutation, useQuery } from '@apollo/client';
import {
  IUpdateMeReq,
  UPDATE_PROFILE_DOCUMENT
} from 'src/graphql/profile/updateMe';
import { IProfile } from 'src/graphql/profile';
import { ProfileRes, PROFILE_DOCUMENT } from 'src/graphql/profile/me';
import _ from 'loadsh';

const defaultProfile: IProfile = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
  bio: ''
};

function EditProfileTab() {
  const [SaveMe] = useMutation<any, IUpdateMeReq>(UPDATE_PROFILE_DOCUMENT);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<IProfile>({ defaultValues: defaultProfile });
  const [edit, setEdit] = useState(false);

  useQuery<ProfileRes>(PROFILE_DOCUMENT, {
    onCompleted: (data: ProfileRes) => {
      if (data?.me) {
        reset(data?.me);
      }
    }
  });

  const handleEdit = () => {
    setEdit(!edit);
  };

  const saveMe = (input: IProfile) => {
    handleEdit();
    const newInput = _.omit(input, ['__typename', 'id', 'email']);
    SaveMe({
      variables: { input: newInput }
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Personal Details
              </Typography>
              <Typography variant="subtitle2">
                Manage informations related to your personal details
              </Typography>
            </Box>
            {edit ? (
              <Button
                variant="contained"
                startIcon={<CheckIcon />}
                onClick={handleSubmit(saveMe)}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="text"
                startIcon={<EditTwoToneIcon />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    First Name:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Controller
                    render={({ field }) => (
                      <EditAbleWrapper value={field.value} edit={edit}>
                        <TextField
                          {...field}
                          variant="standard"
                          type="string"
                          error={!!errors.firstName}
                          helperText={errors.firstName?.message}
                          inputProps={{
                            maxLength: 30
                          }}
                        />
                      </EditAbleWrapper>
                    )}
                    name="firstName"
                    control={control}
                    rules={{
                      ...defaultRule,
                      minLength: {
                        value: 2,
                        message: 'ชื่อต้องมีความยาวตั้งแต่ 2 ตัวอักษรขึ้นไป'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Last Name:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Controller
                    render={({ field }) => (
                      <EditAbleWrapper value={field.value} edit={edit}>
                        <TextField
                          {...field}
                          type="string"
                          variant="standard"
                          style={{ marginTop: 9 }}
                          error={!!errors.lastName}
                          helperText={errors.lastName?.message}
                          inputProps={{
                            maxLength: 30
                          }}
                        />
                      </EditAbleWrapper>
                    )}
                    name="lastName"
                    control={control}
                    rules={{
                      ...defaultRule,
                      minLength: {
                        value: 2,
                        message: 'นามสกุลต้องมีความยาวตั้งแต่ 2 ตัวอักษรขึ้นไป'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Address:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Controller
                      render={({ field }) => (
                        <EditAbleWrapper value={field.value} edit={edit}>
                          <TextField
                            {...field}
                            type="string"
                            variant="standard"
                            style={{ marginTop: 9 }}
                            error={!!errors.address}
                            fullWidth
                            helperText={errors.address?.message}
                          />
                        </EditAbleWrapper>
                      )}
                      name="address"
                      control={control}
                      rules={defaultRule}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Phone Number:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Controller
                    render={({ field }) => (
                      <EditAbleWrapper value={field.value} edit={edit}>
                        <TextField
                          {...field}
                          type="string"
                          variant="standard"
                          style={{ marginTop: 9 }}
                          error={!!errors.phoneNumber}
                          helperText={errors.phoneNumber?.message}
                          inputProps={{
                            maxLength: 15
                          }}
                        />
                      </EditAbleWrapper>
                    )}
                    name="phoneNumber"
                    control={control}
                    rules={{
                      ...defaultRule,
                      minLength: {
                        value: 9,
                        message:
                          'เบอร์โทรศัพท์ต้องมีความยาวตั้งแต่ 9 ตัวอักษรขึ้นไป'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Bio:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Controller
                      render={({ field }) => (
                        <EditAbleWrapper value={field.value} edit={edit}>
                          <TextField
                            {...field}
                            type="string"
                            variant="standard"
                            style={{ marginTop: 9 }}
                            error={!!errors.bio}
                            fullWidth
                            helperText={errors.bio?.message}
                          />
                        </EditAbleWrapper>
                      )}
                      name="bio"
                      control={control}
                      rules={defaultRule}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

interface IEditableProps {
  edit: boolean;
  value: string;
}

const EditAbleWrapper: FC<IEditableProps> = ({ value, edit, children }) => {
  if (edit) {
    return <>{children}</>;
  } else {
    return <Text color="black">{value}</Text>;
  }
};

const defaultRule = {
  required: 'This field is required.'
};

export default EditProfileTab;

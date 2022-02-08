import { useQuery } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ProfileRes, PROFILE_DOCUMENT } from 'src/graphql/profile/me';
import { IUser } from 'src/models/userModel';
import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';

const defaultUser: IUser = {
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
  km: 0,
  id: '',
  bio: ''
};

function ManagementUserProfile() {
  const [user, setUser] = useState<IUser>(defaultUser);

  useQuery<ProfileRes>(PROFILE_DOCUMENT, {
    onCompleted: (data: ProfileRes) => {
      if (data?.me) {
        setUser({ ...defaultUser, ...data.me });
      }
    }
  });

  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity user={user} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ManagementUserProfile;

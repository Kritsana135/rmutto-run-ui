import { useMutation } from '@apollo/client';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';
import { UPLOAD_PROFILE_DOCUMENT } from 'src/graphql/profile/imageUpload';
import { IUserProps } from 'src/models/userModel';
import { getUserId } from 'src/utils/accessToken';
import { resizeFile } from 'src/utils/image';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { NavLink } from 'react-router-dom';
import { express_path } from '../../../../config';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const ProfileCover: FC<IUserProps> = ({ user }) => {
  const [imageProfile, setImageProfile] = useState<string | null>(null);

  const [UploadProfile] = useMutation(UPLOAD_PROFILE_DOCUMENT);

  const handleSelectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    resizeFile(files[0])
      .then((resFile: File) => {
        UploadProfile({
          variables: { picture: resFile },
          onCompleted: handleProfile
        });
      })
      .catch(() => {
        UploadProfile({
          variables: { picture: files[0] },
          onCompleted: handleProfile
        });
      });
  };

  const handleProfile = () => {
    const userId = getUserId();
    if (userId) {
      console.log(userId);
      setImageProfile(
        `${express_path}/profile/${userId}-.png?t=${new Date().getTime()}`
      );
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <>
      <Box display="flex" mb={3}>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Profile for {`${user.firstName} ${user.lastName}`}
          </Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia image="static/images/cover.jpg" />
      </CardCover>
      <AvatarWrapper>
        <Avatar
          variant="rounded"
          alt={`${user.firstName} ${user.lastName}`}
          src={imageProfile}
        />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
            onChange={handleSelectedFile}
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box
        py={2}
        pl={2}
        mb={3}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Box>
          <Typography gutterBottom variant="h4">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography variant="subtitle2">{user.bio}</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<AccountTreeTwoToneIcon fontSize="small" />}
            to="/settings"
            component={NavLink}
          >
            Account Settings
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProfileCover;

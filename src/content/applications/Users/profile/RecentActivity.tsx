import { useQuery } from '@apollo/client';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import TimerIcon from '@mui/icons-material/Timer';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, useState } from 'react';
import Countdown from 'react-countdown';
import { IApp, IAppRes } from 'src/graphql/app/createApp';
import { APP_DOCUMENT, IAppReq } from 'src/graphql/app/getApp';
import {
  IMyProgressRes,
  MY_PROGRESS_DOCUMENT
} from 'src/graphql/progress/myProgress';
import { IUserProps } from 'src/models/userModel';
import { eventKey } from '../../../../config';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

const StyleCountDown = styled(Countdown)(
  () => `
    font-size: 1.5rem;
  `
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
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

const RecentActivity: FC<IUserProps> = ({ user }) => {
  const theme = useTheme();

  const [app, setApp] = useState<IApp>({
    endDate: null,
    eventName: '',
    goalKm: 0,
    startDate: null
  });

  const [progress, setProgress] = useState(0);

  useQuery<IAppRes, IAppReq>(APP_DOCUMENT, {
    variables: { eventKey },
    onCompleted: (res) => {
      setApp(res.app);
    }
  });

  useQuery<IMyProgressRes>(MY_PROGRESS_DOCUMENT, {
    onCompleted: (res) => {
      setProgress(parseFloat(res?.myProgress?.km) || 0);
    }
  });

  return (
    <Card>
      <CardHeader title="Recent Activity" />
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <DirectionsRunIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="h3" style={{ display: 'inline' }}>
              Progress (km)
            </Typography>
          </Box>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Total
              </Typography>
              <Typography variant="h2">{user.km}</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                remaining
              </Typography>
              <Typography variant="h2">{app.goalKm}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <MilitaryTechIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Ranking</Typography>

          <Box pt={2} display="flex">
            <Box>
              <Typography variant="h1">{progress}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <TimerIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Time Left</Typography>

          <Box pt={2} display="flex">
            <StyleCountDown date={app.endDate} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default RecentActivity;

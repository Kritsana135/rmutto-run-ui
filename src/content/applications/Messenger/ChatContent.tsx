import { Box, Avatar, Typography, Card, Divider } from '@mui/material';

import { styled } from '@mui/material/styles';
import {
  formatDistance,
  format,
  subDays,
  subHours,
  subMinutes
} from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import { getUserId } from '../../../utils/accessToken';
import { getProfileUrl } from '../../../utils/image';
import { ChatModel } from '../../../graphql/message/message';

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
      .MuiDivider-wrapper {
        text-transform: none;
        background: ${theme.palette.background.default};
        font-size: ${theme.typography.pxToRem(13)};
        color: ${theme.colors.alpha.black[50]};
      }
`
);

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

interface ChatContentProps {
  chatList: ChatModel[];
}

function ChatContent({ chatList }: ChatContentProps) {
  const myId = getUserId();
  const renderMessage = () => {
    return chatList
      .slice(0)
      .reverse()
      .map(({ content, createdAt, reciver, sender }, index) => {
        console.log('reciver', reciver);
        const avatarImage = getProfileUrl(sender.id);
        if (sender.id === myId) {
          return (
            <Me
              avatarImage={avatarImage}
              content={content}
              createdAt={createdAt}
              key={index + content}
            />
          );
        } else {
          return (
            <Other
              avatarImage={avatarImage}
              content={content}
              createdAt={createdAt}
              key={index + content}
            />
          );
        }
      });
  };

  return <Box p={3}>{renderMessage()}</Box>;
}

interface ChatSideProps {
  avatarImage: string;
  content: string;
  createdAt: Date;
}

function Other({ avatarImage, content, createdAt }: ChatSideProps) {
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-start"
      py={3}
    >
      <Avatar
        variant="rounded"
        sx={{ width: 50, height: 50 }}
        src={avatarImage}
      />
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="flex-start"
        ml={2}
      >
        <CardWrapperSecondary>{content}</CardWrapperSecondary>
        <Typography
          variant="subtitle1"
          sx={{ pt: 1, display: 'flex', alignItems: 'center' }}
        >
          <ScheduleTwoToneIcon sx={{ mr: 0.5 }} fontSize="small" />
          {formatDistance(new Date(createdAt), new Date(), {
            addSuffix: true
          })}
        </Typography>
      </Box>
    </Box>
  );
}

function Me({ avatarImage, content, createdAt }: ChatSideProps) {
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-end"
      py={3}
    >
      <Box
        display="flex"
        alignItems="flex-end"
        flexDirection="column"
        justifyContent="flex-end"
        mr={2}
      >
        <CardWrapperPrimary>{content}</CardWrapperPrimary>
        <Typography
          variant="subtitle1"
          sx={{ pt: 1, display: 'flex', alignItems: 'center' }}
        >
          <ScheduleTwoToneIcon sx={{ mr: 0.5 }} fontSize="small" />
          {formatDistance(new Date(createdAt), new Date(), {
            addSuffix: true
          })}
        </Typography>
      </Box>
      <Avatar
        variant="rounded"
        sx={{ width: 50, height: 50 }}
        src={avatarImage}
      />
    </Box>
  );
}

export default ChatContent;

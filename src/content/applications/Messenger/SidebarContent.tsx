import { useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { InboxRes, INBOX_DOCUMENT } from '../../../graphql/message/inbox';
import { getProfileUrl } from '../../../utils/image';
import AddCommentIcon from '@mui/icons-material/AddComment';
import SendNewMessage, { NewMessageForm } from './SendNewMessage';
import { useState } from 'react';
import { MessageForm } from './BottomBarContent';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
        width: 100%;
  `
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

interface SidebarContentProps {
  handleSelectChat: (id: string, fullName: string) => void;
  selectedChat: string;
  handleSendChatWithId: (reciverId: string, content: string) => void;
}

function SidebarContent({
  handleSelectChat,
  selectedChat,
  handleSendChatWithId
}: SidebarContentProps) {
  const { data } = useQuery<InboxRes>(INBOX_DOCUMENT);

  const [openNewChat, setOpenNewChat] = useState(false);

  const handleCloseNewChat = () => {
    setOpenNewChat(false);
  };

  const renderInboxList = () => {
    return data?.inbox.map(({ user, lastMessage }) => {
      const image = getProfileUrl(user.id);
      return (
        <InBoxChat
          content={lastMessage?.content}
          fullName={`${user.firstName} ${user.lastName}`}
          image={image}
          key={user.id}
          selected={user.id === selectedChat}
          handleSelectChat={handleSelectChat}
          otherId={user.id}
        />
      );
    });
  };

  const handleSendNewChat = (data: NewMessageForm) => {
    const { fullName, id } = data.reciver;
    handleCloseNewChat();
    handleSendChatWithId(id, data.content);
    handleSelectChat(id, fullName);
    console.log(data);
  };

  return (
    <RootWrapper>
      {/* TODO: add search */}
      {/* <TextField
        sx={{ mt: 2, mb: 1 }}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          )
        }}
        placeholder="Search..."
      /> */}

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography sx={{ mb: 1, mt: 2 }} variant="h3">
          Chats
        </Typography>
        <Box>
          <IconButton
            color="primary"
            aria-label="Send New Message"
            component="span"
            onClick={() => setOpenNewChat(true)}
          >
            <AddCommentIcon />
          </IconButton>
        </Box>
      </Box>

      <Box mt={2}>
        <List disablePadding component="div">
          {/* selected */}
          {renderInboxList()}
        </List>
      </Box>
      <SendNewMessage
        open={openNewChat}
        handleClose={handleCloseNewChat}
        handleSendNewChat={handleSendNewChat}
      />
    </RootWrapper>
  );
}

interface InBoxChatProps {
  image: string;
  fullName: string;
  content: string;
  selected: boolean;
  handleSelectChat: (id: string, fullName: string) => void;
  otherId: string;
}

const InBoxChat = ({
  content,
  fullName,
  image,
  selected,
  handleSelectChat,
  otherId
}: InBoxChatProps) => {
  return (
    <ListItemWrapper
      selected={selected}
      onClick={() => handleSelectChat(otherId, fullName)}
    >
      <ListItemAvatar>
        <Avatar src={image} />
      </ListItemAvatar>
      <ListItemText
        sx={{ mr: 1 }}
        primaryTypographyProps={{
          color: 'textPrimary',
          variant: 'h5',
          noWrap: true
        }}
        secondaryTypographyProps={{
          color: 'textSecondary',
          noWrap: true
        }}
        primary={fullName}
        secondary={content}
      />
      {/* <Label color="primary">
        <b>8</b>
      </Label> */}
    </ListItemWrapper>
  );
};

export default SidebarContent;

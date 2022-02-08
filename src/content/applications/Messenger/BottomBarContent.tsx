import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Hidden,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { getUserId } from '../../../utils/accessToken';
import { getProfileUrl } from '../../../utils/image';

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
        height: 40px !important;
        margin: 0 ${theme.spacing(2)};
        align-self: center;
`
);

export interface MessageForm {
  content: string;
}

interface BottomBarContentProps {
  handleSendChat: (item: MessageForm) => void;
}

function BottomBarContent({ handleSendChat }: BottomBarContentProps) {
  const profileImage = getProfileUrl(getUserId());
  const { control, handleSubmit, watch } = useForm<MessageForm>();

  const disableSend = watch('content') ? false : true;
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Hidden mdDown>
        <Avatar src={profileImage} />
        <DividerWrapper orientation="vertical" flexItem />
      </Hidden>
      <Box sx={{ flex: 1, mr: 2 }}>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <TextField
              {...field}
              hiddenLabel
              fullWidth
              placeholder="Write here your message..."
            />
          )}
        />
      </Box>
      {/* TODO: can send image */}
      {/* <Input accept="image/*" id="messenger-upload-file" type="file" /> */}
      {/* <Tooltip arrow placement="top" title="Attach a file">
        <label htmlFor="messenger-upload-file">
          <IconButton color="primary" component="span">
            <AttachFileTwoToneIcon />
          </IconButton>
        </label>
      </Tooltip> */}
      <DividerWrapper orientation="vertical" flexItem />
      <Button
        startIcon={<SendTwoToneIcon />}
        variant="contained"
        type="submit"
        disabled={disableSend}
        onClick={handleSubmit(handleSendChat)}
      >
        Send
      </Button>
    </Card>
  );
}

export default BottomBarContent;

import { useLazyQuery, useQuery } from '@apollo/client';
import { Avatar, Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import {
  ListOfUserRes,
  LIST_OF_USER_DOCUMENT
} from '../../../graphql/message/getUserList';
import { getProfileUrl } from '../../../utils/image';

interface SendNewMessageProps {
  open: boolean;
  handleClose: () => void;
  handleSendNewChat: (data: NewMessageForm) => void;
}

export interface NewMessageForm {
  content: string;
  reciver: {
    id: string;
    fullName: string;
  };
}

export default function SendNewMessage({
  open,
  handleClose,
  handleSendNewChat
}: SendNewMessageProps) {
  const [UserList, { data }] = useLazyQuery<ListOfUserRes>(
    LIST_OF_USER_DOCUMENT
  );

  const { control, handleSubmit, watch } = useForm<NewMessageForm>({
    defaultValues: {
      content: ''
    }
  });

  const fetchUserList = (input: string, cb: any) => {
    return UserList({
      variables: {
        name: input
      }
    }).then(() => {
      if (data?.getListOfUser) {
        return data?.getListOfUser.map(({ bio, firstName, lastName, id }) => {
          const image = getProfileUrl(id);
          console.log({
            bio,
            fullName: `${firstName} ${lastName}`,
            id,
            image
          });
          return {
            bio,
            fullName: `${firstName} ${lastName}`,
            id,
            image
          };
        });
      }
      return [];
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Send New Message</DialogTitle>
      <DialogContent>
        <Box padding={3} display="flex" alignItems={'center'}>
          <Box>Send to : </Box>
          <Box sx={{ flexGrow: 1 }} ml={1}>
            <Controller
              name="reciver"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <AsyncSelect
                    getOptionValue={(options) => `${options.id}`}
                    name="id"
                    cacheOptions
                    defaultOptions
                    onChange={(e) => {
                      field.onChange({ id: e.id, fullName: e.fullName });
                    }}
                    loadOptions={fetchUserList}
                    formatOptionLabel={formatOptionLabel}
                    placeholder="search"
                  />
                );
              }}
            />
          </Box>
        </Box>
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                fullWidth
                variant="standard"
                inputProps={{ maxLength: 50 }}
              />
            );
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(handleSendNewChat)}>Send</Button>
      </DialogActions>
    </Dialog>
  );
}

const formatOptionLabel = ({ image, fullName, bio, id }) => (
  <div style={{ display: 'flex' }} key={id}>
    <Box>
      <Avatar sx={{ width: 48, height: 48 }} src={image} />
    </Box>
    <Box width={'40%'} ml={'1rem'}>
      <Typography variant="h4">{fullName}</Typography>
      <Typography variant="subtitle1">{bio}</Typography>
    </Box>
  </div>
);

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IRejectDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function RejectDialog({
  handleClose,
  open
}: IRejectDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'xs'} fullWidth>
      <DialogTitle>Reject this transaction</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter reason for reject</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Reject Reason"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

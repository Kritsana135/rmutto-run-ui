import { Alert, AlertColor, Snackbar, SnackbarOrigin } from '@mui/material';

export interface IAlertProps {
  open: boolean;
  duration?: number;
  message: string;
  onClose: () => void;
  anchorOrigin?: SnackbarOrigin;
  severity: AlertColor;
}

const AlertComponent = ({
  open,
  duration = 6000,
  onClose,
  anchorOrigin = { horizontal: 'center', vertical: 'top' },
  message,
  severity
}: IAlertProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;

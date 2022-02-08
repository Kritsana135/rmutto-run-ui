import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

interface IImageModalProps {
  open: boolean;
  onClose: () => void;
}

function ImageModal({ open, onClose }: IImageModalProps) {
  return (
    <Dialog onClose={onClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>Set backup account</DialogTitle>
      <img
        src={
          'https://skp.samsungcsportal.com/upload/namo/FAQ/ca/20160428/images/000001/capture-12.png?$ORIGIN_PNG$'
        }
        alt={'test'}
        loading="lazy"
      />
    </Dialog>
  );
}

export default ImageModal;

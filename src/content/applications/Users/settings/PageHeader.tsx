import { Typography } from '@mui/material';

function PageHeader({ name }: { name: string }) {
  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        User Settings
      </Typography>
      <Typography variant="subtitle2">
        {name}, this could be your user settings panel.
      </Typography>
    </>
  );
}

export default PageHeader;

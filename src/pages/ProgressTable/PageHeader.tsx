import { Grid, Typography } from '@mui/material';


function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Progress Transactions
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;

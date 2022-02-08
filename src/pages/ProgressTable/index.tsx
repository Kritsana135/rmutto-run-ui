import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from 'src/pages/ProgressTable/PageHeader';
import ProgressTable from 'src/pages/ProgressTable/Table';

function index() {
  return (
    <>
      <Helmet>
        <title>Progress</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} mt={'1rem'}>
            <ProgressTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default index;

import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import BoardTable from 'src/pages/LeaderboardTable/Table';

function LeaderBoardTable() {
  return (
    <>
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} mt={'1rem'}>
            <BoardTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default LeaderBoardTable;

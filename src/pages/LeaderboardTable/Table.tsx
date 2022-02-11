import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import {
  Avatar,
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import ProgressBar from 'src/components/ProgressBar';
import { IApp, IAppRes } from 'src/graphql/app/createApp';
import { APP_DOCUMENT, IAppReq } from 'src/graphql/app/getApp';
import {
  LeaderboardReq,
  LeaderboardRes,
  LEADERBOARD_DOCUMENT
} from 'src/graphql/progress/leaderboard';
import { getProfileUrl } from 'src/utils/image';
import { eventKey } from '../../config';

const BoardTable: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(5);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [app, setApp] = useState<IApp>({
    endDate: null,
    eventName: '',
    goalKm: 0,
    startDate: null
  });

  useQuery<IAppRes, IAppReq>(APP_DOCUMENT, {
    variables: { eventKey },
    onCompleted: (res) => {
      setApp(res.app);
    }
  });

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPerPage(parseInt(event.target.value));
  };

  const { data } = useQuery<LeaderboardRes, LeaderboardReq>(
    LEADERBOARD_DOCUMENT,
    {
      variables: {
        input: {
          page: page + 1,
          perPage
        }
      },
      onCompleted: (res) => {
        const { perPage, totalItems, page } = res.leaderBoard.pagination;
        setPage(page - 1);
        setPerPage(perPage);
        setTotalItem(totalItems);
      }
    }
  );

  const mapRow = () => {
    return data?.leaderBoard.payload.map(({ displayName, id, km, no, bio }) => {
      return (
        <AvatarProgress
          fullName={displayName}
          key={id}
          avatarImg={getProfileUrl(id)}
          no={no}
          progress={(km / app.goalKm) * 100}
          bio={bio}
        />
      );
    });
  };

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <Box padding={'1.125rem'}>
                <Typography variant="h3">Leader Board</Typography>
              </Box>
            </TableRow>
          </TableHead>
          <Divider />
          <TableBody>{mapRow()}</TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={totalItem}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={perPage}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

const TableCellRank = styled(TableCell)(
  () => `
    display:flex;
    align-items: center;
    & > div {
      padding-right: 1.5rem; 
    }
`
);

interface IAvatarProgressProps {
  fullName?: string;
  avatarImg?: string;
  bio?: string;
  progress?: number;
  no?: number;
}

function AvatarProgress({
  fullName = '',
  avatarImg = '',
  bio = '',
  progress = 0,
  no = 0
}: IAvatarProgressProps) {
  return (
    <TableCellRank>
      <Box p={'1rem'}>
        <Typography variant="h3">{no}</Typography>
      </Box>
      <Box>
        <Avatar sx={{ width: 48, height: 48 }} src={avatarImg} />
      </Box>
      <Box width={'40%'}>
        <Typography variant="h4">{fullName}</Typography>
        <Typography variant="subtitle1">{bio}</Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <ProgressBar
          variant="determinate"
          value={progress > 100 ? 100 : progress}
        />
      </Box>
      <Box>{progress.toFixed(2)}%</Box>
    </TableCellRank>
  );
}

export default BoardTable;

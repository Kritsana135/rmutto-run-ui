import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import { ChangeEvent, FC, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RejectDialog from 'src/pages/ProgressTable/RejectDialog';
import { useMutation, useQuery } from '@apollo/client';
import {
  PROGRESS_TRANSACTION_DOCUMENT,
  IProgressTransactionRes,
  IProgressTransactionReq,
  Status
} from '../../graphql/progress/progressTransaction';
import Label from 'src/components/Label';
import { Image } from 'antd';
import { getProgressUrl } from 'src/utils/image';
import {
  ApprovalProgressReq,
  APPROVAL_PROGRESS_DOCUMENT
} from 'src/graphql/progress/approvalProgress';
import { useLoaderContext } from 'src/contexts/LoaderProvider';

const statusOptions = [
  {
    id: 'ALL',
    name: 'All'
  },
  {
    id: 'REJECT',
    name: 'Reject'
  },
  {
    id: 'PENDING',
    name: 'Pending'
  },
  {
    id: 'APPROVE',
    name: 'Approve'
  }
];

const ProgressTable: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(5);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [openReject, setOpenReject] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>('PENDING');

  const { data, refetch } = useQuery<
    IProgressTransactionRes,
    IProgressTransactionReq
  >(PROGRESS_TRANSACTION_DOCUMENT, {
    variables: {
      input: {
        displayName: '',
        page: page + 1,
        perPage,
        status
      }
    },
    onCompleted: (res) => {
      const { perPage, totalItems, page } = res.progressTransaction.pagination;
      setPage(page - 1);
      setPerPage(perPage);
      setTotalItem(totalItems);
    }
  });

  const { openLoader, closeLoader } = useLoaderContext();
  const [Appoval] = useMutation<any, ApprovalProgressReq>(
    APPROVAL_PROGRESS_DOCUMENT
  );

  const handleApproval = (
    id: string,
    isApprove: boolean,
    rejectReason?: string
  ) => {
    openLoader();
    Appoval({
      variables: {
        input: {
          id,
          isApprove,
          rejectReason
        }
      },
      onCompleted: () => {
        closeLoader();
        refetch();
      },
      onError: () => closeLoader()
    });
  };

  const handlePageChange = (_: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPerPage(parseInt(event.target.value));
  };

  const handleOpenReject = () => {
    setOpenReject(true);
  };

  const handleCloseReject = () => {
    setOpenReject(false);
  };

  const mapRow = () => {
    return data?.progressTransaction.payload.map(
      ({ createdAt, km, user, id, isApprove, image }) => {
        const imageUrl = getProgressUrl(image);
        const status: Status =
          isApprove === null ? 'PENDING' : isApprove ? 'APPROVE' : 'REJECT';
        return (
          <BodyTable
            isApprove={isApprove}
            handleOpenReject={handleOpenReject}
            uploadDate={createdAt}
            distance={km}
            fullName={`${user.firstName} ${user.lastName}`}
            key={id}
            status={status}
            image={imageUrl}
            handleApproval={handleApproval}
            id={id}
          />
        );
      }
    );
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setStatus(value);
  };

  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="Recent Progress"
      />
      <Divider />
      <TableContainer>
        <Table>
          <HeaderTable />
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
      {/* <RejectDialog open={openReject} handleClose={handleCloseReject} /> */}
    </Card>
  );
};

function HeaderTable() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Full Name</TableCell>
        <TableCell>Upload Date</TableCell>
        <TableCell>Distance</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Image</TableCell>
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

interface IBodyTable {
  handleOpenReject: () => void;
  fullName?: string;
  uploadDate: Date;
  distance?: number;
  status?: Status;
  image?: string;
  isApprove?: boolean | null;
  id: string;
  handleApproval: (
    id: string,
    isApprove: boolean,
    rejectReason?: string
  ) => void;
}

type DisplayMode = 'ALL' | 'APPROVE' | 'REJECT';

function BodyTable({
  handleOpenReject,
  fullName = '',
  uploadDate,
  distance,
  status,
  image,
  isApprove = null,
  handleApproval,
  id
}: IBodyTable) {
  const [visible, setVisible] = useState(false);
  console.warn(isApprove);
  const displayMode: DisplayMode =
    isApprove === null ? 'ALL' : isApprove ? 'REJECT' : 'APPROVE';
  console.warn(displayMode);

  return (
    <>
      <TableRow>
        <TableCell>
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {fullName}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" color="text.secondary" noWrap>
            {format(new Date(uploadDate), 'MMMM dd yyyy hh:mm')}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {distance} km
          </Typography>
        </TableCell>
        <TableCell>
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {getStatusLabel(status)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            <Button onClick={() => setVisible(true)}>show image</Button>
          </Typography>
        </TableCell>
        <TableCell align="right">
          {(displayMode === 'ALL' || displayMode === 'APPROVE') && (
            <Button
              variant="text"
              startIcon={<CheckCircleIcon />}
              onClick={() => handleApproval(id, true)}
            >
              Aprove
            </Button>
          )}
          {(displayMode === 'ALL' || displayMode === 'REJECT') && (
            <Button
              variant="text"
              startIcon={<CancelIcon />}
              onClick={() => handleApproval(id, false)}
            >
              Reject
            </Button>
          )}
        </TableCell>
      </TableRow>
      <Image
        width={200}
        style={{ display: 'none' }}
        src={image}
        preview={{
          visible,
          src: image,
          onVisibleChange: (value) => {
            setVisible(value);
          }
        }}
      />
    </>
  );
}

const getStatusLabel = (status: Status): JSX.Element => {
  const map = {
    REJECT: {
      text: 'Rejected',
      color: 'error'
    },
    APPROVE: {
      text: 'Approved',
      color: 'success'
    },
    PENDING: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[status];

  return <Label color={color}>{text}</Label>;
};

export default ProgressTable;

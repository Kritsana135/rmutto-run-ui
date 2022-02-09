import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { resizeFile } from 'src/utils/image';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client';
import {
  IUpdateProgressRes,
  UPDATE_PROGRESS_DOCUMENT
} from 'src/graphql/progress/updateProgress';
import { useLoaderContext } from 'src/contexts/LoaderProvider';
import { useAlertContext } from 'src/contexts/AlertProvider';

const useStyles = makeStyles(() => ({
  root: {
    margin: '0 1.25rem',
    width: 339,
    borderRadius: '12px',
    boxShadow:
      '0px 3px 6px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 1px 12px rgba(0, 0, 0, 0.04)',
    '& .MuiTypography-h5': {
      fontSize: '24px',
      fontWeight: 600,
      color: '#263238'
    },
    '& .MuiCardContent-root:last-child': {
      paddingBottom: 16
    }
  },
  insideBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 180
  },
  bgRoot: {
    height: '100vh',
    width: '100%',
    backgroundColor: '#EDE9E9',
    whiteSpace: 'pre-line',
    paddingTop: '1.5rem'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '24px',
    color: '#263238'
  },
  rootForm: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  btnStyle: {
    height: 44
  },
  errorMessage: {
    color: 'red'
  }
}));

type progressForm = {
  km: number;
};

const UpdateProgress: FC = () => {
  const classes = useStyles();
  const [file, setFile] = useState<File | null>(null);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors }
  } = useForm<progressForm>();

  const [UpdateProgress] = useMutation<IUpdateProgressRes>(
    UPDATE_PROGRESS_DOCUMENT
  );

  const handleSelectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const imageProgress = files[0];
      resizeFile(imageProgress)
        .then((compressedFile: File) => {
          setFile(compressedFile);
        })
        .catch(() => {
          setFile(imageProgress);
        });
    }
  };

  const { openLoader, closeLoader } = useLoaderContext();
  const { openAlert } = useAlertContext();

  const handleClose = (
    _: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenAlert(false);
  };

  const onUpload = (data: progressForm) => {
    if (file) {
      openLoader();
      let km: number = 0;
      if (typeof data.km === 'string') {
        km = parseFloat(data.km);
      } else {
        km = data.km;
      }
      UpdateProgress({
        variables: {
          picture: file,
          km
        },
        onCompleted: (res) => {
          closeLoader();
          openAlert({
            message: res.uploadProgress.message,
            severity: 'success'
          });
          setFile(null);
          reset();
        },
        onError: (res) => {
          closeLoader();
          openAlert({
            message: res.message,
            severity: 'error'
          });
        }
      });
    } else {
      setError('km', {
        type: 'required',
        message: 'ต้องเลือกรูปภาพ'
      });
      setIsOpenAlert(true);
    }
  };

  return (
    <div className={classes.bgRoot}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpenAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            {/* <CloseIcon fontSize="small" /> */}
          </IconButton>
        }
      >
        <Alert onClose={handleClose} severity="warning">
          โปรดเลือกรูปก่อนส่งผล
        </Alert>
      </Snackbar>
      <Grid container alignItems="center" direction="column" spacing={2}>
        <Grid item className={classes.title}>
          Update Progress
        </Grid>
        {/* Uploader */}
        <Grid item>
          <Card className={classes.root}>
            <CardContent>
              <Box className={classes.insideBox}>
                <Box>
                  {file ? (
                    <>
                      <img src={URL.createObjectURL(file)} alt="" />
                    </>
                  ) : (
                    <SVGUpload />
                  )}
                </Box>
                {file && (
                  <Box
                    style={{
                      overflow: 'hidden',
                      width: 300,
                      textAlign: 'center'
                    }}
                  >
                    {file.name}
                  </Box>
                )}
                <Box>
                  <input
                    type="file"
                    alt="progress-img"
                    accept="image/*"
                    hidden
                    id="raised-button-file"
                    onChange={handleSelectedFile}
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      className="btnStyle"
                      variant="contained"
                      color={file ? 'secondary' : 'primary'}
                      component="span"
                    >
                      {file ? 'Select New Picture' : 'Select Picture'}
                    </Button>
                  </label>
                  {file && (
                    <IconButton color="primary" onClick={() => setFile(null)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* Input field */}
        <Grid item>
          <Card className={classes.root}>
            <CardContent className={classes.rootForm}>
              <Box>
                <Controller
                  name="km"
                  control={control}
                  rules={{
                    required: 'This field is required.',
                    validate: (value) => value > 0 || 'ต้องมีค่ามากกว่า 0'
                  }}
                  defaultValue={0}
                  render={({ field }) => (
                    <>
                      <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">
                          distance
                        </InputLabel>
                        <OutlinedInput
                          {...field}
                          id="outlined-adornment-amount"
                          type="number"
                          style={{ width: 171 }}
                          error={!!errors.km}
                          endAdornment={
                            <InputAdornment
                              position="end"
                              style={{ marginRight: '1rem' }}
                            >
                              km
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </>
                  )}
                />
              </Box>
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.btnStyle}
                  onClick={handleSubmit(onUpload)}
                >
                  send
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

function SVGUpload() {
  return (
    <svg
      width="87"
      height="87"
      viewBox="0 0 87 87"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34 50.2857H53V53H34V50.2857ZM43.5 34L34.4479 47.5714H52.5521L43.5 34Z"
        fill="#6238FE"
      />
      <circle cx="43.5" cy="43.5" r="42" stroke="#C4C4C4" strokeWidth="3" />
    </svg>
  );
}

export default UpdateProgress;

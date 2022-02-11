import { useMutation, useQuery } from '@apollo/client';
import { DatePicker } from '@mui/lab';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  InputAdornment
} from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useAlertContext } from 'src/contexts/AlertProvider';
import { useLoaderContext } from 'src/contexts/LoaderProvider';
import {
  CREATE_APP_DOCUMENT,
  IAppInput,
  IAppRes
} from 'src/graphql/app/createApp';
import { APP_DOCUMENT, IAppReq } from 'src/graphql/app/getApp';
import { IBaseInputReq } from 'src/graphql/base';

function Forms() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm<IAppInput>({ defaultValues: defaultForm });

  const [SaveApp] = useMutation<IAppRes, IBaseInputReq<IAppInput>>(
    CREATE_APP_DOCUMENT
  );
  useQuery<IAppRes, IAppReq>(APP_DOCUMENT, {
    variables: { eventKey: 'run' },
    onCompleted: (res) => {
      const { endDate, goalKm, eventName, startDate } = res.app;
      reset({ endDate, goalKm, eventName, startDate });
    }
  });

  const { openLoader, closeLoader } = useLoaderContext();
  const { openAlert } = useAlertContext();

  const onSave = (input: IAppInput) => {
    openLoader();
    SaveApp({
      variables: {
        input: { ...input, eventKey: 'run' }
      },
      onCompleted: () => {
        openAlert({ message: 'บันทึกสำเร็จ', severity: 'success' });
        closeLoader();
      },
      onError: (err) => {
        openAlert({ message: err.message, severity: 'error' });
        closeLoader();
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Activity Setting</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle heading="ตั้งค่ากิจกรรม" />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Input Fields" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1 }
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSave)}
                >
                  {/* <div>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          label="ชื่อรายการวิ่ง"
                          variant="outlined"
                          error={!!errors.eventName}
                          fullWidth
                          helperText={errors.eventName?.message}
                        />
                      )}
                      name="eventName"
                      control={control}
                      rules={{
                        ...defaultRule
                      }}
                    />
                  </div> */}
                  <div>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          label="ระยะทาง"
                          type="number"
                          variant="outlined"
                          error={!!errors.goalKm}
                          helperText={errors.goalKm?.message}
                          onChange={(e) =>
                            setValue('goalKm', parseFloat(e.target.value))
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">km</InputAdornment>
                            )
                          }}
                        />
                      )}
                      name="goalKm"
                      control={control}
                      rules={{
                        ...defaultRule
                      }}
                    />
                    <Controller
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="วันที่เริ่มกิจกรรม"
                          renderInput={(params) => <TextField {...params} />}
                        />
                      )}
                      name="startDate"
                      control={control}
                    />
                    <Controller
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="วันที่จบกิจกรรม"
                          renderInput={(params) => <TextField {...params} />}
                        />
                      )}
                      name="endDate"
                      control={control}
                    />
                  </div>
                  <ButtonWrapper>
                    <Button variant="contained" type="submit">
                      บันทึก
                    </Button>
                  </ButtonWrapper>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const ButtonWrapper = styled('div')(
  () => `
     margin: 8px
  `
);

const defaultForm: IAppInput = {
  eventKey: 'run',
  eventName: '',
  startDate: null,
  endDate: null,
  goalKm: 0
};

const defaultRule = {
  required: 'This field is required.'
};

export default Forms;

import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Box, TextField, Grid, Alert, Stack, Card, Tab, Divider, Grow } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchClientData } from 'redux/actions/clientsAction';
import { useTheme } from '@mui/material/styles';
import FormClient from './FormClient';
import { TabContext, TabList } from '@mui/lab';
import TabPanel from '@mui/lab/TabPanel';

interface propsForm {
  setClientId?: (id: string | null) => void,
  registerEvent: () => void,
  searchAndRegisterEvent: (values: any) => void,
  isSubmitting?: boolean
  isClient?: boolean
  dataFormClient?: any
  loadingForm: boolean,
  errorSaveTurn: string | null
}

// const saveClientAndTurn = async (values: any) => {
//   console.log('Saving client and turn:', values);
// };

const validationSchema = Yup.object({
  dni: Yup.string().required('El dni es obligatorio'),
  firstName: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('El Apellido es obligatorio'),
  email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
  phone: Yup.string().required('El teléfono es obligatorio'),
});

const CompleteFormClient = (props: propsForm) => {
  const { setClientId, registerEvent, searchAndRegisterEvent, dataFormClient, loadingForm, errorSaveTurn } = props
  const dispatch = useDispatch()
  const [existClient, setExistClient] = useState(false)
  const [showWarning, setShowWarning] = useState(false);
  const [dni, setDni] = useState('');

  const [formValues, setFormValues] = useState({
    dni: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [value, setValue] = React.useState("1");



  const searchClient = async () => {
    if (dni !== '') {
      const clientData = await dispatch(fetchClientData({ dni }) as any);
      if (clientData && clientData.length > 0) {
        const data = clientData[0];
        setFormValues({
          dni: data.dni,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.telefono,
        });
        if (setClientId) {
          setClientId(data.id);
        }
        setExistClient(true);
        setShowWarning(false);
      } else {
        setExistClient(false);
        setFormValues({
          dni: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        });
        setShowWarning(true);
      }
    } else {
      setShowWarning(true);
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    event.preventDefault()
    setValue(newValue);
    // searchClient();
    console.log("e", newValue)
    setFormValues({
      dni: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
    setClientId?.(null);
    if (newValue === "1") {
      console.log("1 en")
      setShowWarning(false);
    }
  };

  useEffect(() => {
    if (value === "1") {
      setFormValues({
        dni: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      });
      setShowWarning(false);
    } else if (value === "0") {
      setShowWarning(false);
    }
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchClient();
    }
  };

  useEffect(() => {
    if (dataFormClient) {
      dataFormClient.email = formValues.email;
    }
  }, [formValues.email, dataFormClient]);

  const theme = useTheme();

  return (
    <>

      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (value === "1") {
            registerEvent();
          } else {
            searchAndRegisterEvent(values);
          }
        }}
        enableReinitialize
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Card sx={{ width: '100%' }}>
              <TabContext value={value}>
                <Box sx={{ bgcolor: '#6a6969' }} mb={2}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList variant="fullWidth"
                      onChange={handleChange} aria-label="lab API tabs example">
                      <Tab sx={{
                        flex: 1,
                        color: value === "1" ? "#b79536 !important" : "#fff",
                        bgcolor: value === "1" ? '#1c1c1c' : 'inherit',
                      }} label="Soy Cliente" value="1" />
                      <Tab sx={{
                        flex: 1,
                        color: value === "2" ? "#b79536 !important" : "#fff",
                        bgcolor: value === "2" ? '#1c1c1c' : 'inherit',
                      }} label="Nuevo Cliente" value="2" />
                    </TabList>
                  </Box>
                </Box>
                <Grid container >
                  <Grid item md={12} sx={{ width: "100%" }}>
                    <Grow
                      in={value === "1"}
                      {...(value === "1" ? { timeout: 500 } : {})}>
                      <TabPanel value="1" dir={theme.direction}>
                        <Box >
                          <Grid container spacing={1}>
                            <Grid item xs={12} md={8} >
                              <TextField
                                value={dni}
                                label="DNI"
                                variant="outlined"
                                fullWidth
                                onChange={(e: any) => setDni(e.target.value)}
                                onKeyDown={handleKeyDown}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Button variant='contained' sx={{ height: "100%" }} className="btn_next_button" fullWidth onClick={searchClient}>Buscar</Button>
                            </Grid>
                          </Grid>
                          {showWarning && !existClient && <Stack sx={{ width: '100%', border: "1px solid #edcda2", borderRadius: "4px" }} spacing={2} mt={1}>
                            <Alert severity="warning">Cliente no encontrado, si no esta registrado reserve desde la seccion &#39;&#39;NUEVO CLIENTE&#39;&#39;.</Alert>
                          </Stack>}
                          {existClient &&
                            <Divider sx={{ mt: 3 }} />
                          }
                          {existClient && (
                            <Stack sx={{ mt: 3 }}> <FormClient isSubmitting={isSubmitting} isClient={true} loadingForm={loadingForm} errorSaveTurn={errorSaveTurn} /></Stack>
                          )}
                        </Box>
                      </TabPanel>
                    </Grow>
                    <Grow
                      in={value === "2"}
                      {...(value === "2" ? { timeout: 500 } : {})}
                    >
                      <TabPanel value="2" dir={theme.direction}>
                        <FormClient isSubmitting={isSubmitting} isClient={false} loadingForm={loadingForm} errorSaveTurn={errorSaveTurn} />
                      </TabPanel>
                    </Grow>
                  </Grid>
                </Grid>
              </TabContext>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CompleteFormClient;

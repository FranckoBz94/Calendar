import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Box, TextField, Grid, Alert, Stack, Card, Tabs, Tab } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchClientData } from 'redux/actions/clientsAction';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { TabPanel } from 'contants';

interface propsForm {
  setClientId: (id: string | null) => void,
  registerEvent: () => void
}

const saveClientAndTurn = async (values: any) => {
  console.log('Saving client and turn:', values);
};

const validationSchema = Yup.object({
  dni: Yup.string().required('El dni es obligatorio'),
  firstName: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('El Apellido es obligatorio'),
  email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
  phone: Yup.string().required('El teléfono es obligatorio'),
});

const CompleteFormClient = (props: propsForm) => {
  const { setClientId, registerEvent } = props
  const dispatch = useDispatch()
  const [existClient, setExistClient] = useState(false)
  const [initialValues, setInitialValues] = useState({
    dni: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: any) => {
    setValue(index);
  };


  const searchClient = async () => {
    const dni = initialValues.dni;
    if (dni) {
      const clientData = await dispatch(fetchClientData({ dni }) as any);
      if (clientData && clientData.length > 0) {
        const data = clientData[0];
        setInitialValues((prevValues) => ({
          ...prevValues,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.telefono,
        }));
        setClientId(data.id);
        setExistClient(false)
      } else {
        // Cliente no encontrado, resetea los campos del cliente
        setExistClient(true)
        setInitialValues((prevValues) => ({
          ...prevValues,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        }));
      }
    }
  };

  const handleSubmit = async (values: any) => {
    console.log("no")
    setExistClient(false)
    await saveClientAndTurn(values);
    // Aquí se podría agregar un redirect o reset del formulario
  };

  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const theme = useTheme();

  return (
    <>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // Permite que los valores iniciales se actualicen
      >
        {({ isSubmitting }) => (
          <Form>
            <Card sx={{ width: '100%' }}>
              <Box sx={{ bgcolor: '#272727' }} mb={2}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  sx={{ width: '100%', display: 'flex' }}
                >
                  <Tab label="Soy Cliente" style={{ flex: 1, color: "#fff" }} {...a11yProps(0)} />
                  <Tab label="Nuevo Cliente" style={{ flex: 1, color: "#fff" }} {...a11yProps(1)} />
                </Tabs>
              </Box>
              <Grid container >
                <Grid item md={12}>
                  <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                  >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                      <Box >
                        <Box m={1}>
                          <Field
                            as={TextField}
                            name="dni"
                            label="DNI"
                            variant="outlined"
                            fullWidth
                            onChange={(e: any) => setInitialValues({ ...initialValues, dni: e.target.value })}
                          />
                          <Button variant='contained' sx={{ px: 5, mt: 2 }} fullWidth onClick={() => searchClient()}>Buscar</Button>
                        </Box>
                        <ErrorMessage name="dni" >{msg => <span style={{ color: "red", fontSize: "12px" }}>{msg}</span>}</ErrorMessage>
                        {existClient && <Stack sx={{ width: '100%', border: "1px solid #edcda2", borderRadius: "4px" }} spacing={2} mt={1}>
                          <Alert severity="warning">Cliente no encontrado, complete los datos para reservar.</Alert>
                        </Stack>}
                      </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <Box mb={2}>
                            <Field
                              as={TextField}
                              name="firstName"
                              label="Nombre"
                              variant="outlined"
                              fullWidth
                            />
                            <ErrorMessage name="firstName" component="div">{msg => <span style={{ color: "red", fontSize: "12px" }}>{msg}</span>}</ErrorMessage>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box mb={2}>
                            <Field
                              as={TextField}
                              name="lastName"
                              label="Apellido"
                              variant="outlined"
                              fullWidth
                            />
                            <ErrorMessage name="lastName" component="div">{msg => <span style={{ color: "red", fontSize: "12px" }}>{msg}</span>}</ErrorMessage>
                          </Box>
                        </Grid>
                      </Grid>
                      <Box mb={2}>
                        <Field
                          as={TextField}
                          name="email"
                          label="Email"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage name="email" component="div" >{msg => <span style={{ color: "red", fontSize: "12px" }}>{msg}</span>}</ErrorMessage>
                      </Box>

                      <Box mb={2}>
                        <Field
                          as={TextField}
                          name="phone"
                          label="Teléfono"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage name="phone" component="div" >{msg => <span style={{ color: "red", fontSize: "12px" }}>{msg}</span>}</ErrorMessage>
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isSubmitting}
                        onClick={registerEvent}
                      >
                        {isSubmitting ? 'Guardando...' : 'Guardar turno'}
                      </Button>
                    </TabPanel>
                  </SwipeableViews>
                </Grid>
              </Grid>
            </Card>

          </Form>
        )}
      </Formik>
    </>
  );
};

export default CompleteFormClient;

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
  isSubmitting?: boolean
  isClient?: boolean
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
  const [showWarning, setShowWarning] = useState(false);
  const [dni, setDni] = useState('');

  const [initialValues, setInitialValues] = useState({
    dni: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    event.preventDefault()
    setValue(newValue);
    console.log(newValue)
    if (newValue === 1) {
      console.log("1 en")
      setInitialValues({
        dni: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      });
      setExistClient(false);
      setShowWarning(false);
    }
  };

  const searchClient = async () => {
    if (dni !== '') {
      console.log("si", dni)
    } else {
      console.log("no", dni)
    }
    if (dni !== '') {
      const clientData = await dispatch(fetchClientData({ dni }) as any);
      if (clientData && clientData.length > 0) {
        const data = clientData[0];
        setInitialValues({
          dni: data.dni,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.telefono,
        });
        if (setClientId) {
          setClientId(data.id);  // Verifica si setClientId está definido antes de llamarlo
        }
        setExistClient(true);
        setShowWarning(false);
      } else {
        // Cliente no encontrado, resetea los campos del cliente
        setExistClient(false);
        setInitialValues({
          dni: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        });
        setShowWarning(true);
      }
    } else {
      console.log("cambie")
      setShowWarning(true);
    }
  }

  const handleSubmit = async (values: any) => {
    console.log("no")
    setExistClient(false)
    await saveClientAndTurn(values);
  };

  useEffect(() => {
    if (value === "1") {
      // Limpia los valores cuando cambias a la pestaña "Nuevo Cliente"
      setInitialValues({
        dni: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      });
      setExistClient(false);
      setShowWarning(false);
    } else if (value === "0") {
      // Oculta la advertencia si no se ha realizado una búsqueda
      setShowWarning(false);
    }
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Previene el comportamiento predeterminado del Enter
      searchClient();
    }
  };

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
              <TabContext value={value}>

                <Box sx={{ bgcolor: '#6a6969' }} mb={2}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList variant="fullWidth"
                      onChange={handleChange} aria-label="lab API tabs example">
                      <Tab sx={{
                        flex: 1,
                        color: "#fff",
                        bgcolor: value === "1" ? '#272727' : 'inherit',
                      }} label="Soy Cliente" value="1" />
                      <Tab sx={{
                        flex: 1,
                        color: "#fff",
                        bgcolor: value === "2" ? '#272727' : 'inherit',
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
                        <Box m={1}>
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
                              <Button variant='contained' sx={{ height: "100%" }} fullWidth onClick={searchClient}>Buscar</Button>
                            </Grid>
                          </Grid>
                          {showWarning && !existClient && <Stack sx={{ width: '100%', border: "1px solid #edcda2", borderRadius: "4px" }} spacing={2} mt={1}>
                            <Alert severity="warning">Cliente no encontrado, si no esta registrado reserve desde la seccion &#39;&#39;NUEVO CLIENTE&#39;&#39;.</Alert>
                          </Stack>}
                          {existClient &&
                            <Divider sx={{ mt: 3 }} />
                          }
                          {existClient && (
                            <Stack sx={{ mt: 3 }}> <FormClient registerEvent={registerEvent} isSubmitting={isSubmitting} isClient={true} /></Stack>
                          )}
                        </Box>
                      </TabPanel>
                    </Grow>
                    <Grow
                      in={value === "2"}
                      {...(value === "2" ? { timeout: 500 } : {})}
                    >
                      <TabPanel value="2" dir={theme.direction}>
                        <FormClient registerEvent={registerEvent} isSubmitting={isSubmitting} />
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

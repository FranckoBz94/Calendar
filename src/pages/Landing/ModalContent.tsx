import React, { useEffect, useState } from "react"
import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Divider, Grid, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { ColorlibConnector, ColorlibStepIcon } from "contants";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CardBarber from "./CardBarber";
import { useDispatch, useSelector } from "react-redux";
import store from "redux/store";
import { getAllBarbers } from "redux/actions/barbersAction";
import SelectDateHours from "./SelectDateHours";
import FormDataClient from "./FormDataClient";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from "moment";

dayjs.locale('es');


const ModalContent = () => {
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const [stepAddTurn, setStepAddTurn] = useState(0)
  const steps = ['Barbero', 'Fecha', 'Datos personales', 'Estado reserva'];
  const [barberId, setBarberId] = React.useState<string | number | null>(null);
  const [dataBarberSelected, setDataBarberSelected] = React.useState<any>({});
  const [dataFormClient] = useState<any>({})
  const [dataService, setDataService] = React.useState({
    idService: 0,
    start_date: "",
    minutes_services: "",
    time_turn: "",
  });

  const { barbers } = useSelector((state: RootState) => storeComplete.barbers)
  const dispatch = useDispatch()

  const handleClick = (id: string | number | null, dataBarber: {}) => {
    setBarberId(id);
    setDataBarberSelected(dataBarber)
    console.log("dataBarber", dataBarber)
  };

  const selectedDataService = (data: any) => {
    console.log("data modal content", data)
    setDataService(prev => ({ ...prev, ...data }));
  };

  const handleBack = () => {
    setStepAddTurn(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStepAddTurn(prev => Math.min(prev + 1, steps.length - 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllBarbers() as any);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  const resetForm = () => {
    setStepAddTurn(0);
    setBarberId(null);
    setDataBarberSelected({});
    setDataService({
      idService: 0,
      start_date: "",
      minutes_services: "",
      time_turn: "",
    });
  };

  return (
    <>
      <CardContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack sx={{ width: '100%' }} spacing={4}>

            <Stepper alternativeLabel activeStep={stepAddTurn} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {stepAddTurn > 0 && stepAddTurn < 3 && (
              <Stack direction="row" spacing={1}>
                <Box>
                  <Button onClick={handleBack} style={{ color: "#000" }} startIcon={<ArrowBackIcon />}>
                    Volver
                  </Button>
                </Box>
                <Box sx={{ paddingLeft: 5 }}>
                  <Chip
                    avatar={<Avatar alt="Avatar" src={`${process.env.REACT_APP_URL_BASE}${dataBarberSelected.imagen}`} />}
                    label={dataBarberSelected && `${dataBarberSelected?.firstName} ${dataBarberSelected?.lastName}`}
                    style={{ marginRight: 5 }}
                  />
                  {stepAddTurn > 1 && (
                    <>
                      <Chip
                        label={dataService && `${dataService?.start_date} `}
                        style={{ marginRight: 5 }}
                      />
                      <Chip
                        label={dataService && `${dataService?.time_turn} Hs`}
                      />
                    </>
                  )}
                </Box>
              </Stack>
            )}
            {stepAddTurn === 0 && (
              <Box>
                <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                  Seleccionar barbero
                </Typography>
                <Grid container spacing={2}>
                  {barbers && barbers.length > 0 && barbers.map((barber: any) => (
                    <Grid item xs={6} sm={4} md={4} key={barber.id}>
                      <CardBarber id={barber.id} selectedId={barberId} handleClick={handleClick} dataBarber={barber} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            {stepAddTurn === 1 && (
              <SelectDateHours barberId={barberId} selectedDataService={selectedDataService} />
            )}
            {stepAddTurn === 2 && (
              <FormDataClient dataService={dataService} barberId={barberId} handleNext={handleNext} dataFormClient={dataFormClient} />
            )}
            {stepAddTurn === 3 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', bgcolor: '#f7f7f7', p: 3 }}>
                <Card sx={{ width: { xs: '90%', md: '60%' }, textAlign: 'center', boxShadow: 5, p: 4, borderRadius: 2 }}>
                  <CardContent>
                    <CheckCircleIcon sx={{ fontSize: 80, mb: 3 }} color="success" />
                    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                      ¡Reserva exitosa!
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph sx={{ mb: 4 }}>
                      Tu turno ha sido guardado exitosamente. Gracias por reservar con nosotros.
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph sx={{ mb: 4 }}>
                      Hemos enviado un mail con los datos de la reserva a: {dataFormClient?.email}
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="body1" color="textPrimary" sx={{ mb: 2 }}>
                      <strong>Día:</strong> {moment(dataService?.start_date).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" sx={{ mb: 4 }}>
                      <strong>Horario:</strong> {dataService?.time_turn}Hs
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pt: 3 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={resetForm}
                      size="large"
                      sx={{ borderRadius: 20, textTransform: 'none', px: 5 }}
                    >
                      Agendar nuevo turno
                    </Button>
                  </CardActions>
                </Card>
              </Box>

            )}
          </Stack >
        </LocalizationProvider >
      </CardContent >
      <CardActions>
        <Box my={2} mx={1} display="flex" justifyContent="flex-end" width="100%">
          {(barberId && stepAddTurn === 0) || (dataService.time_turn && stepAddTurn === 1) ? (
            <Button
              onClick={handleNext}
              variant="contained"
              endIcon={<KeyboardTabIcon />}
              className="btn_next_button"
              style={{ fontWeight: "bold" }}
            >
              Continuar
            </Button>
          ) : null}
        </Box>
      </CardActions>
    </>
  )
}

export default ModalContent
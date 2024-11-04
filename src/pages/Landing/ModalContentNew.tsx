import React, { useCallback, useEffect, useState } from "react"
import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Divider, Grid, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { ColorlibConnector, ColorlibStepIcon } from "contants";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CardBarber from "./CardBarber";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import store from "redux/store";
import { getAllBarbers } from "redux/actions/barbersAction";
import FormDataClient from "./FormDataClient";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from "moment";
import { getAllServices } from "redux/actions/servicesAction";
import { turnsDayAvailable } from 'redux/actions/turnsAction';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'react-calendar/dist/Calendar.css';
import SelectDateHoursNew from "./SelectDateHoursNew";
import SelectService from "./SelectService";

dayjs.locale('es');
dayjs.extend(utc);
dayjs.extend(timezone);

interface ModalProps {
  dates: any[];
}

const ModalContentNew = (props: ModalProps) => {
  const { dates } = props
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const [stepAddTurn, setStepAddTurn] = useState(0)
  const steps = ['Barbero', 'Fecha', 'Datos personales', 'Estado reserva'];
  const [barberId, setBarberId] = React.useState<string | number | null>(null);
  const [errorGetHours, setErrorGetHours] = useState(false)
  const [dataBarberSelected, setDataBarberSelected] = React.useState<any>({});
  const [dataFormClient] = useState<any>({})
  const [dataService, setDataService] = React.useState({
    idService: 0,
    start_date: "",
    minutes_services: "",
    time_turn: "",
  });
  const [dateFrom, setDateFrom] = useState<string | undefined>(undefined);
  const [selection, setSelection] = useState(false)
  const [allTimes, setAllTimes] = useState([])
  const [availableTurns, setAvailableTurns] = useState(true)
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [datesAvailableTurn, setDatesAvailableTurn] = useState<any[]>([]);
  const [loadingDatesCalendar, setLoadingDatesCalendar] = useState(false)
  const [selectedService, setSelectedService] = useState(null);

  const { barbers } = useSelector((state: RootState) => storeComplete.barbers, shallowEqual);
  const { services } = useSelector((state: RootState) => storeComplete.services, shallowEqual);
  const dispatch = useDispatch()

  const selectedDataService = (data: any) => {
    setDataService(prev => ({ ...prev, ...data }));
  };

  const handleChangeSelectService = async (e: any) => {
    const dataTurn = e;

    if (dataTurn !== null) {
      setLoadingDatesCalendar(true);
      setSelectedService(dataTurn);

      const day = dayjs().tz("America/Argentina/Buenos_Aires").format('YYYY-MM-DD');
      const formattedDate = dayjs(dateFrom).format('YYYY-MM-DD');

      selectedDataService({
        idService: dataTurn.id,
        minutes_services: dataTurn.minutes_service,
        start_date: formattedDate
      });

      setDateFrom(day);
      setAllTimes([]);
      setDatesAvailableTurn([]);
      let firstDayProcessed = false;
      for (const date of dates) {
        const formattedDay = dayjs(date).format('YYYY-MM-DD');
        const requestData = {
          idBarber: barberId,
          start_date: date,
          minutes_services: parseInt(dataTurn.minutes_service, 10),
          time_turn: dataTurn.time_turn
        };

        try {
          const response = await dispatch(turnsDayAvailable(requestData) as any);
          const dataResponse = response.data;

          let availability: any = [];

          if (dataResponse.length > 0) {
            availability = dataResponse.map((slot: any) => ({
              start: dayjs(slot.slot_start).format('HH:mm'),
              end: dayjs(slot.slot_end).format('HH:mm'),
            }));
            setErrorGetHours(false);
          } else {
            setErrorGetHours(true);
          }

          setDatesAvailableTurn(prevDays => [
            ...prevDays,
            {
              date: formattedDay,
              availability
            }
          ]);
          if (!firstDayProcessed) {
            setLoadingDatesCalendar(false);
            firstDayProcessed = true;
          }
        } catch (error) {
          console.error(`Error al obtener datos para ${formattedDay}:`, error);
          setErrorGetHours(true);

          setDatesAvailableTurn(prevDays => [
            ...prevDays,
            {
              date: formattedDay,
              availability: []
            }
          ]);
          if (!firstDayProcessed) {
            setLoadingDatesCalendar(false);
            firstDayProcessed = true;
          }
        }
      }
      setLoadingDatesCalendar(false);

    } else {
      setSelectedService(null);
      setAllTimes([]);
      selectedDataService({ idService: 0, time_turn: "" });
      setSelection(false);
    }
  };

  const handleClick = useCallback((id: string | number | null, dataBarber: {}) => {
    selectedDataService({ idService: 0 });
    setBarberId(id);
    setDataBarberSelected(dataBarber)
    handleChangeSelectService(null)
  }, []);

  const handleBack = () => {
    setStepAddTurn(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStepAddTurn(prev => Math.min(prev + 1, steps.length - 1));
  };

  const getTimeSelected = (time: string | null) => {
    if (time !== null) {
      setSelectedTime(time);
      selectedDataService({ time_turn: time });
    }
  }

  const fetchTurnsDayAvailable = async (dataSearch: any) => {
    setAllTimes([])
    getTimeSelected(null)
    try {
      const response = await dispatch(turnsDayAvailable(dataSearch) as any);
      const data = response.data;
      if (data.length > 0) {
        const formattedTimes = data.map((slot: any) => {
          return {
            start: dayjs(slot.slot_start).format('HH:mm'),
            end: dayjs(slot.slot_end).format('HH:mm'),
          };
        });
        setAvailableTurns(true)
        setAllTimes(formattedTimes);
        console.log(formattedTimes);
      } else {
        setAvailableTurns(false)
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const selectDay = async (newValue: Date | undefined) => {
    setAllTimes([])
    setSelection(true)
    const formattedDate = dayjs(newValue).tz("America/Argentina/Buenos_Aires").format('YYYY-MM-DD');
    setDateFrom(formattedDate)
    selectedDataService({ start_date: formattedDate, time_turn: "" });
    setSelectedTime(null)
    setAvailableTurns(true)
    const data = {
      idBarber: barberId,
      start_date: formattedDate,
      minutes_services: parseInt(dataService?.minutes_services, 10),
      time_turn: dataService.time_turn
    }
    console.log("data", data)
    await fetchTurnsDayAvailable(data)
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllBarbers() as any);
        await dispatch(getAllServices() as any);
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
    setAllTimes([])
    getTimeSelected(null)
    setSelection(false)
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
              <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                  <Button onClick={handleBack} style={{ color: "#000" }} startIcon={<ArrowBackIcon />}>
                    Volver
                  </Button>
                </Grid>
                <Grid item md={6} xs={12} sx={{ paddingLeft: 5 }}>
                  <Box display="flex" justifyContent="flex-end" sx={{ pr: 1 }}>
                    {stepAddTurn > 1 && (
                      <Chip
                        avatar={<Avatar alt="Avatar" src={`${process.env.REACT_APP_URL_BASE}${dataBarberSelected.imagen}`} />}
                        label={dataBarberSelected && `${dataBarberSelected?.firstName} ${dataBarberSelected?.lastName}`}
                        style={{ marginRight: 5 }}
                        sx={{
                          height: 'auto',
                          '& .MuiChip-label': {
                            display: 'block',
                            whiteSpace: 'normal',
                          },
                        }}
                      />
                    )}
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
                </Grid>
              </Grid>
            )}
            {stepAddTurn === 0 && (
              <Box>
                <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                  Seleccionar barbero
                </Typography>
                <Grid container spacing={2}>
                  {barbers && barbers.length > 0 && barbers.map((barber: any) => (
                    <Grid item xs={6} sm={4} md={4} key={barber.id} style={{ height: "auto" }}>
                      <CardBarber id={barber.id} selectedId={barberId} handleClick={handleClick} dataBarber={barber} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            {stepAddTurn === 1 && (
              <>
                <SelectService services={services} selectedService={selectedService} onChangeSelectService={handleChangeSelectService} dataBarber={dataBarberSelected} />
                {dataService.idService !== 0 && (
                  <SelectDateHoursNew
                    allTimes={allTimes}
                    selectedTime={selectedTime}
                    onSelectTime={getTimeSelected}
                    dateFrom={dateFrom}
                    selectDay={selectDay}
                    selection={selection}
                    availableTurns={availableTurns}
                    datesAvailableTurn={datesAvailableTurn}
                    loadingDatesCalendar={loadingDatesCalendar}
                    errorGetHours={errorGetHours}
                  />
                )}
              </>
            )}
            {stepAddTurn === 2 && (
              <FormDataClient dataService={dataService} barberId={barberId} handleNext={handleNext} dataFormClient={dataFormClient} dataBarber={dataBarberSelected} selectedService={selectedService} />
            )}
            {stepAddTurn === 3 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', bgcolor: '#f7f7f7', p: { xs: 0, md: 3 } }}>
                <Card sx={{ width: { xs: '100%', md: '60%' }, textAlign: 'center', boxShadow: 5, p: { xs: 0, md: 3 }, borderRadius: 2 }}>
                  <CardContent >
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
                      <strong>Barbero seleccionado:</strong> {dataBarberSelected.firstName} {dataBarberSelected.lastName}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" sx={{ mb: 2 }}>
                      <strong>Día:</strong> {moment(dataService?.start_date).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" sx={{ mb: 4 }}>
                      <strong>Horario:</strong> {dataService?.time_turn}Hs
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 4 }}>
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
      {(barberId && stepAddTurn === 0) || (dataService.time_turn && stepAddTurn === 1) ? (
        <CardActions>
          <Box my={2} mx={1} display="flex" justifyContent="flex-end" width="100%">
            <Button
              onClick={handleNext}
              variant="contained"
              endIcon={<KeyboardTabIcon />}
              className="btn_next_button"
              style={{ fontWeight: "bold" }}
            >
              Continuar
            </Button>
          </Box>
        </CardActions>
      ) : null}
    </>
  )
}

// export default ModalContentNew
export default React.memo(ModalContentNew);

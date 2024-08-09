import MotionComponent from "components/MotionComponent"
import { useStyles } from "./styles"
import "react-toastify/dist/ReactToastify.css"
import { Box, Card, Grid, TextField, Tooltip, Typography } from "@mui/material"
import { useFormik } from "formik"
import { LoadingButton } from "@mui/lab"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useEffect, useState } from "react"
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import store from "redux/store"
import { useDispatch, useSelector } from "react-redux"
import Select, { components } from "react-select"
import { getAllBarbers } from "redux/actions/barbersAction"
import { getAllHours } from "redux/actions/hoursAction"
import { es } from 'date-fns/locale'; // Importa el idioma español
import { addTurn, availableDate } from "redux/actions/turnsAction"
import { NotifyHelper } from "contants"
import moment from "moment"
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import MainComponent from "pages/AppBar/MainComponent"

const InactivePeriod = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState('');
  const [selectedOptionBarber, setSelectedOptionBarber] = useState(Number)
  const [isLoading, setIsLoading] = useState(false)

  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const { barbers } = useSelector((state: RootState) => storeComplete.barbers)
  const { hours } = useSelector((state: RootState) => storeComplete.hours)
  const classes: any = useStyles()
  const dispatch = useDispatch()

  const initialValues = {
    title: null,
    idClient: null,
    dateBooking: null,
    start: null,
    end: null,
    idService: null
  }

  const isAvailableDate = async () => {
    try {
      const dataSearch = {
        idBarber: selectedOptionBarber,
        start_date: moment(startDate).format("YYYY-MM-DD 08:00:00"),
        end_date: moment(endDate).format("YYYY-MM-DD 23:59:59"),
      }
      const { message } = await dispatch(availableDate(dataSearch) as any)
      console.log("rtaAvailableTurn", message[0].count_turns)
      return message[0].count_turns
    } catch (err) {
      console.error(err)
    }
  }

  const registerEvent = async (data: any) => {
    setIsLoading(true)
    const idBarber = selectedOptionBarber || undefined
    if (!selectedOptionBarber) {
      setError('Debes seleccionar un barbero.');
      setIsLoading(false)
      return;
    }
    const fechaOriginal = new Date();
    const start = startDate ? moment(startDate).format("YYYY-MM-DD") + " " + hours?.min_hour_calendar : undefined;
    const end = endDate ? moment(endDate).format("YYYY-MM-DD") + " " + hours?.max_hour_calendar : undefined;
    const idService = 1
    const dataComplete = {
      dateBooking: moment(fechaOriginal).format("YYYY-MM-DD"),
      start,
      end,
      idBarber,
      idService,
      idClient: 1,
      title: "Inactvo",
      price: 0
    }
    try {
      const countTurns = await isAvailableDate();

      if (countTurns === 0) {
        const rtaAddTurn = await dispatch(addTurn(dataComplete) as any);

        if (rtaAddTurn.rta === 1) {
          NotifyHelper.notifySuccess("Fecha inactiva guardada con éxito");
        } else {
          NotifyHelper.notifyError(rtaAddTurn.message);
        }
      } else {
        NotifyHelper.notifyError(`Actualmente hay turnos registrados en ese rango de fecha.`);
      }
    } catch (err) {
      NotifyHelper.notifyError(`Ocurrió un error, intente nuevamente.`);
      console.error("Error en registerEvent:", err);
    } finally {
      setIsLoading(false);
    }
    setError('');
  }

  const handleChangeSelectBarber = (e: any) => {
    console.log(e)
    setSelectedOptionBarber(JSON.parse(e.value))
    setError('');
  };


  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <div dangerouslySetInnerHTML={{ __html: props.label }} />
      </components.Option>
    );
  }

  const SingleValue = (props: any) => (
    <components.SingleValue {...props}>
      <div dangerouslySetInnerHTML={{ __html: props.data.label }} />
    </components.SingleValue>
  );

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: registerEvent
  })

  const { handleSubmit } = formik

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllBarbers() as any);
        await dispatch(getAllHours() as any);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const longText = `No se podrán guardar dias de vacaciones en periodos con turnos registrados.`;

  return (
    <MainComponent>
      <MotionComponent>
        <Box>
          <Card variant="outlined" className={classes.colorCard}>
            <Box px={2}>
              <p className={classes.card_title}>Periodo de Vacaciones / Inactivo</p>
            </Box>
          </Card>
          <Box my={3}>
            <Card>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3, px: 5 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} my={2}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography textAlign="center" variant="h5">Periodo de vacaciones - inactivo</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box position="relative">
                          <Select
                            isSearchable={true}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={barbers?.map((barber: any) => ({
                              label: barber.firstName + " " + barber.lastName,
                              value: barber.id
                            }))}
                            placeholder="Barbero"
                            menuPlacement="auto"
                            // value={selectedOptionBarber}
                            menuPortalTarget={document.body} // Esta línea permite que el menú desplegable se superponga al resto del contenido
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            onChange={handleChangeSelectBarber}
                            components={{ Option: Option, SingleValue: SingleValue }}
                            required
                          />
                          {error && <small style={{ color: 'red' }}>{error}</small>}

                        </Box>
                      </Grid>
                      <Grid item md={8} xs={12} className="d-flex justify-content-center">
                        <DatePicker
                          selected={startDate}
                          dateFormat="dd/MM/yyyy"
                          icon={<CalendarTodayIcon />}
                          onChange={(date: any) => setStartDate(date)}
                          dayClassName={(date: any) =>
                            date.toDateString() === (startDate && startDate.toDateString())
                              ? "custom-selected-day"
                              : null
                          }

                          locale={es}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          minDate={new Date()}
                          className="input-datepicker react-datepicker-wrapper "
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          id="outlined-controlled"
                          label="Hora Inicio"
                          disabled
                          value={hours?.min_hour_calendar ?? ""}
                        />
                      </Grid>
                      <Grid item md={8} xs={12} className="d-flex justify-content-center">
                        <DatePicker
                          selected={endDate}
                          dateFormat="dd/MM/yyyy"
                          icon="fa fa-calendar"
                          onChange={(date: any) => setEndDate(date)}
                          dayClassName={(date: any) =>
                            date.toDateString() === (endDate && endDate.toDateString())
                              ? "custom-selected-day"
                              : null
                          }
                          selectsEnd
                          locale={es}
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          className="input-datepicker react-datepicker-wrapper"
                          popperPlacement="bottom"
                        />

                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          id="outlined-controlled"
                          label="Hora Fin"
                          disabled
                          value={hours?.max_hour_calendar ?? ""}
                        />
                      </Grid>
                      <Grid item xs={12} my={3}>
                        <Box display="flex" justifyContent="center">
                          <LoadingButton
                            size="small"
                            type="submit"
                            className="btnSubmitOption2 w-50"
                            loading={isLoading}
                            disabled={isLoading}
                            variant="contained"
                            sx={{ py: 2, px: 4 }}
                          >
                            {isLoading ? 'Procesando solicitud...' : 'Guardar'}
                          </LoadingButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>

                    <Box pb={2} sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                        <h4 >Dias seleccionados</h4>
                        <Tooltip title={longText}>
                          <LiveHelpOutlinedIcon fontSize="large" />
                        </Tooltip>
                      </Box>
                      <DatePicker
                        selected={startDate}
                        dateFormat="dd/MM/yyyy"
                        icon={<CalendarTodayIcon />}
                        onChange={(date: any) => setStartDate(date)}
                        dayClassName={(date: any) =>
                          date.toDateString() === (startDate && startDate.toDateString())
                            ? "custom-selected-day"
                            : null
                        }
                        locale={es}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        inline
                        disabled
                        className="input-datepicker react-datepicker-wrapper "
                      />


                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Box>
        </Box>
      </MotionComponent>
    </MainComponent >
  )
}

export default InactivePeriod

import React, { useRef, useState, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import { Alert, Avatar, Box, Button, Card, CardContent, Container, InputLabel, Stack, Tooltip, Typography } from "@mui/material"
import esLocale from "@fullcalendar/core/locales/es"
import { Tabs, TabsModal, Tab, Content, TabModal } from "../../components/Tabs/tabs"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { getAllBarbers } from "redux/actions/barbersAction"
import store from "redux/store"
import interactionPlugin from "@fullcalendar/interaction"
import MotionModal from "components/Modal/Modal"
import FormAddTurn from "./FormAddTurn"
import { getAllClients } from "redux/actions/clientsAction"
import { getAllServices } from "redux/actions/servicesAction"
import { getAllTurns, nextTurnAvailable } from "redux/actions/turnsAction"
import FormEditTurn from "./FormEditTurn"
import { Barber, NotifyHelper, newArrayServices, socket, transformarTurno } from "contants"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import moment from "moment"
import FormHoursCalendar from "./FormHoursCalendar"
import { getAllDays, getAllHours } from "redux/actions/hoursAction"
import SkeletonCalendar from "./SkeletonCalendar"
import MainComponent from "pages/AppBar/MainComponent"
import DaySwitch from "./DaySwitch"

const Calendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null)
  const isDesktop = window.innerWidth >= 768;
  const [openModal, setOpenModal] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalHours, setOpenModalHours] = useState(false)
  const [openingTime, setOpeningTime] = useState("")
  const [idHoursCalendar, setIdHoursCalendar] = useState(0)
  const [closingTime, setClosingTime] = useState("")
  const [barbersActive, setBarbersActive] = useState<Barber[]>([]);
  const [barberSelected, setBarberSelected] = useState<Barber | null>(null);
  const [loadingTurns, setLoadingTurns] = useState(true)
  const [dataSelected, setDataSelected] = useState({})
  const [filteredServices, setFilteredServices] = useState([])
  const [user, setUser] = React.useState<Barber | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number, y: number } | null>(null);
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | null>(null);
  const [loadBarbers, setLoadBarbers] = useState(false)
  const [events, setEvents] = useState([{}])
  const [active, setActive] = useState<string | null>(null);
  const [value, setValue] = useState(1);
  const [hiddenDays, setHiddenDays] = useState<number[]>([]);
  console.log("se monta el componente")
  const dispatch = useDispatch()

  const getDataCalendar = async () => {
    dispatch(getAllHours() as any)
    dispatch(getAllDays() as any)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false)
  }

  const handleCloseModalHours = () => {
    setOpenModalHours(false)
  }

  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)

  const hours = useSelector((state: RootState) => storeComplete.hours, shallowEqual);
  const days = useSelector((state: RootState) => storeComplete.days, shallowEqual);
  const barbers = useSelector((state: RootState) => storeComplete.barbers, shallowEqual);
  const turns = useSelector((state: RootState) => storeComplete.turns, shallowEqual);
  const clients = useSelector((state: RootState) => storeComplete.clients, shallowEqual);
  const services = useSelector((state: RootState) => storeComplete.services, shallowEqual);


  const [allServices, setAllServices] = useState([])
  const turnsLoadedRef = useRef(false);
  const updateCalendarData = (
    newOpeningTime: string,
    newClosingTime: string
  ) => {
    console.log(newOpeningTime)
    setOpeningTime(newOpeningTime)
    setClosingTime(newClosingTime)
    localStorage.setItem("newOpeningTime", newOpeningTime)
    localStorage.setItem("newClosingTime", newClosingTime)
  }

  const fetchTurns = async () => {
    try {
      console.log("turns", turns)
      if (turns && barbersActive.length > 0 && turns.length > 0) {
        const turnosTransformados = await Promise.all(turns.map(transformarTurno));
        setEvents(turnosTransformados);
        console.log("tyertmiino", turnosTransformados)
        setLoadingTurns(false);
      } else {
        console.log("entro aca")
        setEvents([]);
      }
    } catch (e) {
      console.error(e);
      setLoadingTurns(false);
    }
  };

  const handleClick = async (e: any) => {
    const index = e.id;
    setLoadingTurns(true);
    console.log("e", index)
    console.log("inde", index)
    console.log("active", active)
    try {
      if (index !== active && index !== undefined && index !== null) {
        turnsLoadedRef.current = false
        setActive(index);
        setBarberSelected(e);
        await dispatch(getAllTurns(e.id) as any);
        setLoadingTurns(false);
      }
      if (index === active) {
        console.log("llego aca a erste")
        setLoadingTurns(false);
      }
    } catch (error) {
      console.error("Error fetching turns:", error);
    }
  };

  const handleEventMouseEnter = (info: any) => {
    if (isDesktop) {
      const event = info.event;
      const eventEl = info.el;
      const rect = eventEl.getBoundingClientRect();
      const tooltipText = (
        <Box sx={{ margin: 0, padding: 0, boxShadow: 'none', border: 'none', borderRadius: 5 }}>
          <div style={{ padding: 8 }}>
            <Typography variant="h6" color="white">{event.title}</Typography>
            <Typography variant="body2" color="white">Turno: {event.extendedProps.description}</Typography>
            <Typography variant="body2" color="white">Inicio: {event.start.toLocaleString()}</Typography>
            <Typography variant="body2" color="white">Fin: {event.end.toLocaleString()}</Typography>
          </div>
        </Box>
      );
      setTooltipContent(tooltipText);
      setTooltipPosition({ x: rect.left + window.scrollX + 100, y: rect.top });
    }
  };

  const handleEventMouseLeave = () => {
    setTooltipContent(null);
  };


  const calculateNewArrayServices = async (dataTurn: any) => {
    let rtaAvailableTurn
    try {
      console.log("dataTurn", dataTurn)
      rtaAvailableTurn = await dispatch(nextTurnAvailable(dataTurn) as any)
      console.log("rtaAvailableTurn", rtaAvailableTurn)
      if (rtaAvailableTurn.rta === 1) {
        let startDate
        let endHoutTime
        if (rtaAvailableTurn.message.length > 0) {
          startDate = new Date(rtaAvailableTurn.message[0].start_date)
          endHoutTime = moment(startDate).format("YYYY-MM-DD HH:mm:ss")
        } else {
          startDate = moment(dataTurn.start_date).format("YYYY-MM-DD")
          const nextEndHours = moment(dataTurn.start_date).format("YYYY-MM-DD")
          endHoutTime =
            nextEndHours + " " + localStorage.getItem("newClosingTime")
        }
        const newServices = await newArrayServices(
          allServices,
          endHoutTime,
          dataTurn.start_date
        )
        setFilteredServices(newServices)
      }
    } catch (e) {
      NotifyHelper.notifyError(rtaAvailableTurn.message)
    }
  }

  const handleEventClick = async (clickInfo: any) => {
    await dispatch(getAllClients() as any);
    console.log("clickInfo", clickInfo)
    const { event } = clickInfo
    const eventData = event.extendedProps
    const start = event.start ? event.start.toISOString() : null
    const end = event.end ? event.end.toISOString() : null
    const { title } = event._def
    const nameService = event.nameService;
    const transformarTurno = async (turno: any) => {
      console.log("turno", turno)
      return {
        idTurn: turno.idTurn,
        idBarber: barberSelected?.id,
        dateBooking: turno.dateBooking,
        endTurn: new Date(end),
        idClient: turno.idClient,
        idService: turno.idService,
        startTurn: new Date(start),
        titleTurn: title,
        description: nameService
      }
    }
    const turnoSeleccionado = await transformarTurno(eventData)
    const dataTurn = {
      idBarber: barberSelected?.id,
      dateBooking: moment(turnoSeleccionado.dateBooking).format("YYYY-MM-DD"),
      start_date: moment(turnoSeleccionado.startTurn).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      endTimeCalendar: localStorage.getItem("newClosingTime")
    }
    await calculateNewArrayServices(dataTurn)
    setDataSelected(turnoSeleccionado)
    setOpenModalEdit(true)
  }

  const click = async (info: any) => {
    console.log("info", info)
    setOpenModal(true)
    const data = { start: info.date }
    setDataSelected(data)
    const dataTurn = {
      idBarber: barberSelected?.id,
      dateBooking: moment(info.date).format("YYYY-MM-DD"),
      start_date: moment(info.date).format("YYYY-MM-DD HH:mm:ss"),
      endTimeCalendar: localStorage.getItem("newClosingTime")
    }
    await calculateNewArrayServices(dataTurn)
  }

  const handleDateSelect = async (event: any) => {
    console.log("event", event)
    if (barbersActive.length > 0) {
      const currentView = calendarRef.current?.getApi().view.type
      if (currentView !== "dayGridMonth") {
        setOpenModal(true)
        setDataSelected(event)
      }
      const dataTurn = {
        idBarber: barberSelected?.id,
        dateBooking: moment(event.start).format("YYYY-MM-DD"),
        start_date: moment(event.start).format("YYYY-MM-DD HH:mm:ss"),
        endTimeCalendar: localStorage.getItem("newClosingTime")
      }
      await calculateNewArrayServices(dataTurn)
    } else {
      NotifyHelper.notifyWarning("Debe agregar un barbero para agregar un turno.")
    }
  }

  const selectBarber = (barbers: Barber[]) => {
    if (barbers.length > 0) {
      setBarberSelected(barbers[0]);
      setActive(barbers[0].id);
      dispatch(getAllTurns(barbers[0].id) as any);
    }
  };



  useEffect(() => {
    if (hours?.min_hour_calendar && hours?.max_hour_calendar) {
      setOpeningTime(hours.min_hour_calendar);
      setClosingTime(hours.max_hour_calendar);
      setIdHoursCalendar(hours.id);
      if (!localStorage.getItem("newOpeningTime")) {
        localStorage.setItem("newOpeningTime", hours.min_hour_calendar);
        localStorage.setItem("newClosingTime", hours.max_hour_calendar);
      }
    }
  }, [hours]);

  useEffect(() => {
    if (days?.length) {
      const calculatedHiddenDays = days.reduce((acc: number[], day: any) => {
        if (!day.is_open) acc.push(day.id);
        return acc;
      }, []);
      setHiddenDays(calculatedHiddenDays);
    }
  }, [days]);

  useEffect(() => {
    console.log("barberSelected", barberSelected)
    if (barberSelected?.id) { dispatch(getAllTurns(barberSelected.id) as any); }
    const handleSocketTurn = (barberId: any) => {
      if (barberSelected?.id === barberId) {
        dispatch(getAllTurns(barberId) as any);
      }
    };
    socket.on("turn", handleSocketTurn);
    return () => {
      socket.off("turn", handleSocketTurn);
    };
  }, [barberSelected, dispatch]);

  useEffect(() => {
    const loadData = async () => {
      const userFromLocalStorage = localStorage.getItem('user');
      if (userFromLocalStorage) {
        setUser(JSON.parse(userFromLocalStorage));
      }
      await getDataCalendar();
      console.log("viene a cargar")
      fetchTurns();
    };

    loadData();
  }, []);

  console.log("afuera baebreros", barbers)
  useEffect(() => {
    setLoadBarbers(false);
    console.log("cargo baebreros", barbers)
    if (barbers && barbers.length > 0) {
      console.log("entras o no", barbers)
      const activeBarbers = barbers.filter((barber: any) => {
        if (user?.is_admin === 1) {
          return barber.is_active === 1;
        } else {
          return user?.id && barber.id_user === parseInt(user.id) && barber.is_active === 1;
        }
      });
      setLoadingTurns(false);
      console.log("activeBarbers", activeBarbers)
      setLoadBarbers(true);
      setBarbersActive(activeBarbers);
      selectBarber(activeBarbers);
    }
  }, [barbers, user]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Entrando a fetchData");
      console.log("turnsLoadedRef.current", turnsLoadedRef.current);
      if (turns && !turnsLoadedRef.current) {
        console.log("entroo");
        setLoadingTurns(true);
        console.log("Cargando turnos...");
        await fetchTurns();
        turnsLoadedRef.current = true;
      }
    };
    fetchData();
  }, [turns]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllBarbers() as any);
        dispatch(getAllClients() as any);
        dispatch(getAllServices() as any);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setAllServices(services)
  }, [services])

  return (
    <MainComponent>
      <>
        <Box mt={2}>
          <Card variant="outlined">
            <Box sx={{ md: { p: 4 }, sm: { p: 1 } }} >
              <Tabs>
                {barbersActive && loadBarbers && barbersActive
                  .filter((barber: any) => barber.is_active === 1)
                  .map((barber: any, index: number) => (
                    <Tab
                      key={index}
                      onClick={() => handleClick(barber)}
                      active={active === barber.id}
                      disabled={loadingTurns}
                      id={barber.id}
                      style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                      sx={{ padding: "10px" }}
                    >
                      <Box display="flex" alignItems="center" justifyContent="center" sx={{
                        p: { xs: 1, sm: 2, md: 2 }
                      }}>
                        <Avatar
                          alt="Imagen"
                          src={`${process.env.REACT_APP_URL_BASE}${barber.imagen}`}
                          sx={{ width: 40, height: 40, marginRight: "10px", objectFit: "cover" }}
                        />
                        <p style={{
                          margin: 0,
                          ...(active === barber.id && { color: "#fff", fontWeight: "bold", fontSize: "1.2rem" })
                        }}>
                          {barber.firstName} {barber.lastName}
                        </p>
                      </Box>
                    </Tab>
                  ))}
              </Tabs>
              <Content active>
                <Card className="cardCalendar" variant="outlined" sx={{ border: "none" }}>
                  <Box sx={{ md: { p: 4 }, sm: { p: 3 } }}>
                    <Card
                      style={{
                        marginBottom: "20px",
                        padding: "0px 10px",
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: 0,
                        borderRight: 0,
                        borderLeft: 0
                      }}
                      variant="outlined"
                    >
                      <Box sx={{ width: 1, marginTop: 1 }}>
                        {!loadBarbers ? (
                          <Box mt={1}>
                            <Stack sx={{ width: "100%" }} spacing={2}>
                              <Alert
                                variant="outlined"
                                severity="warning"
                                style={{ justifyContent: "center" }}
                              >
                                Cargando Barberos
                              </Alert>
                            </Stack>
                          </Box>
                        ) : (loadBarbers && barbersActive.length === 0) ? (
                          <Box mt={1}>
                            <Stack sx={{ width: "100%" }} spacing={2}>
                              <Alert
                                variant="outlined"
                                severity="warning"
                                style={{ justifyContent: "center" }}
                              >
                                Aún no hay barberos cargados en el sistema.
                              </Alert>
                            </Stack>
                          </Box>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginTop: "15px",
                            }}
                          >
                            <InputLabel htmlFor="my-input" sx={{ mr: 1 }}>
                              Agenda de:
                            </InputLabel>
                            <h4>
                              {barberSelected
                                ? barberSelected.firstName +
                                " " +
                                barberSelected.lastName
                                : ""}
                            </h4>
                          </div>
                        )}

                        <Box display="flex" alignItems={"center"} sx={{ width: 1 }} my={1}>
                          <Button
                            variant="contained"
                            className="fc-button"
                            endIcon={<CalendarMonthIcon />}
                            onClick={() => setOpenModalHours(true)}
                            sx={{ width: 1 }}
                          >
                            Horarios Calendario
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                    <div id="calendar-container">
                      {/* <p>load {firstLoad ? "true" : "false"}</p> */}
                      <p>loadingTurns {loadingTurns ? "true" : "false"}</p>
                      {loadingTurns ? (
                        <SkeletonCalendar />
                      ) : (barbersActive.length > 0 && (
                        <FullCalendar
                          ref={calendarRef}
                          plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin
                          ]}
                          initialView="timeGridWeek"
                          headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay"
                          }}
                          slotLabelFormat={{
                            hour: "numeric",
                            minute: "2-digit",
                            omitZeroMinute: false,
                            hour12: false
                          }}
                          slotDuration="00:30:00"
                          slotLabelInterval="01:00:00"
                          slotMinTime={openingTime || "08:00:00"}
                          slotMaxTime={closingTime || "16:00:00"}
                          allDaySlot={false}
                          locales={[esLocale]}
                          events={events}
                          eventMouseEnter={handleEventMouseEnter}
                          eventMouseLeave={handleEventMouseLeave}
                          eventClick={handleEventClick}
                          height={"auto"}
                          selectable={true}
                          select={handleDateSelect}
                          dateClick={click}
                          hiddenDays={hiddenDays}
                        />
                      )
                      )}
                    </div>
                    {tooltipContent && tooltipPosition && (
                      <Tooltip
                        title={tooltipContent}
                        placement="top"
                        open={true}
                        arrow
                        style={{ padding: 0 }}
                        PopperProps={{
                          anchorEl: {
                            getBoundingClientRect: (): DOMRect => ({
                              top: tooltipPosition.y,
                              left: tooltipPosition.x,
                              right: tooltipPosition.x,
                              bottom: tooltipPosition.y,
                              width: 0,
                              height: 0,
                              toJSON: () => ({})
                            } as DOMRect),
                          },
                        }}
                      >
                        <div style={{ position: 'absolute', top: tooltipPosition.y, left: tooltipPosition.x, pointerEvents: 'none', padding: 0 }} />
                      </Tooltip>
                    )}
                  </Box>
                </Card>
              </Content>
            </Box>
          </Card>
        </Box>
        <MotionModal
          isOpen={openModal}
          handleClose={handleCloseModal}
        >
          <Box mt={1} >
            {filteredServices && (
              <FormAddTurn
                dataFormEvent={dataSelected}
                setOpenModal={setOpenModal}
                allClients={clients}
                allServices={filteredServices}
                barberSelected={barberSelected}
                turnsLoadedRef={turnsLoadedRef}
              />
            )}
          </Box>
        </MotionModal>

        <MotionModal
          isOpen={openModalEdit}
          handleClose={handleCloseModalEdit}
        >
          <Box mt={1}>
            <FormEditTurn
              dataFormEvent={dataSelected}
              setOpenModalEdit={setOpenModalEdit}
              allClients={clients}
              allServices={filteredServices}
              barberSelected={barberSelected}
            />
          </Box>
        </MotionModal>
        <MotionModal isOpen={openModalHours} handleClose={handleCloseModalHours}>
          <Box mt={1} position="relative" sx={{ my: 5 }}>
            <Container component="main" maxWidth="md">
              <Card>
                <TabsModal >
                  <TabModal
                    key="1"
                    onClick={() => setValue(1)}
                    active={value === 1}
                  >
                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: "20px" }}>
                      Horarios de atención
                    </Box>
                  </TabModal>
                  <TabModal
                    key="2"
                    onClick={() => setValue(2)}
                    active={value === 2}
                  >
                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: "20px" }}>
                      Dias disponibles
                    </Box>
                  </TabModal>

                </TabsModal>
                <CardContent>
                  <Content active={value === 1}>
                    <FormHoursCalendar
                      openingTime={openingTime}
                      closingTime={closingTime}
                      idHoursCalendar={idHoursCalendar}
                      setOpenModalHours={setOpenModalHours}
                      updateCalendarData={updateCalendarData}
                    />
                  </Content>
                  <Content active={value === 2}>
                    <DaySwitch setOpenModalHours={setOpenModalHours} days={days} />
                  </Content>
                </CardContent>
              </Card>
            </Container>
          </Box>
        </MotionModal>

      </>
    </MainComponent>
  )
}

export default Calendar
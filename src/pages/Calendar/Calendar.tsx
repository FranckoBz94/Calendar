import React, { useRef, useState, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import { Alert, Avatar, Box, Button, Card, InputLabel, Stack, Tooltip, Typography } from "@mui/material"
import esLocale from "@fullcalendar/core/locales/es"
import { Tabs, Tab, Content } from "../../components/Tabs/tabs"
import { useDispatch, useSelector } from "react-redux"
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
import { getAllHours } from "redux/actions/hoursAction"
import SkeletonCalendar from "./SkeletonCalendar"
import MainComponent from "pages/AppBar/MainComponent"


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
  const [loadingTurns, setLoadingTurns] = useState(false)
  const [dataSelected, setDataSelected] = useState({})
  const [filteredServices, setFilteredServices] = useState([])
  const [user, setUser] = React.useState<Barber | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number, y: number } | null>(null);
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | null>(null);
  const [loadBarbers, setLoadBarbers] = useState(false)
  const [events, setEvents] = useState([{}])
  const [active, setActive] = useState<string | null>(null);

  const dispatch = useDispatch()
  const getHoursCalendar = async () => {
    dispatch(getAllHours() as any)
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
  const { hours } = useSelector((state: RootState) => storeComplete.hours)
  const { barbers } = useSelector((state: RootState) => storeComplete.barbers)
  const { turns } = useSelector((state: RootState) => storeComplete.turns)
  const { clients } = useSelector((state: RootState) => storeComplete.clients)
  const { services } = useSelector((state: RootState) => storeComplete.services)
  const [allServices, setAllServices] = useState([])
  useEffect(() => {
    setOpeningTime(hours?.min_hour_calendar)
    setClosingTime(hours?.max_hour_calendar)
    setIdHoursCalendar(hours?.id)
    localStorage.setItem("newOpeningTime", hours?.min_hour_calendar)
    localStorage.setItem("newClosingTime", hours?.max_hour_calendar)
  }, [hours])

  useEffect(() => {
    socket.on("turn", (barberId) => {
      console.log("barberSelected", barberSelected?.id);
      console.log("barberId", barberId);
      if (barberSelected?.id === barberId) {
        dispatch(getAllTurns(barberId) as any);
      }
    });

    return () => {
      socket.off("turn");
    };
  }, [barberSelected, dispatch]);

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

  const handleClick = async (e: any) => {
    const index = e.id;
    setLoadingTurns(true);
    try {
      if (index !== active && index !== undefined && index !== null) {
        setActive(index);
        setBarberSelected(e);
        await dispatch(getAllTurns(e.id) as any);
      }
      if (index === active) {
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
    getHoursCalendar()
  }, [])



  useEffect(() => {
    setLoadBarbers(false)
    if (Array.isArray(barbers) && barbers.length > 0) {
      let activeBarbers: any
      if (user?.is_admin === 1) {
        activeBarbers = barbers.filter((barber: Barber) => barber.is_active === 1);
      } else {
        activeBarbers = barbers.filter((barber: Barber) => parseInt(barber.id) === user?.id_barbero && barber?.is_active === 1);
      }
      setLoadBarbers(true)
      setBarbersActive(activeBarbers);
      selectBarber(activeBarbers);
      console.log("user", user)
    }
  }, [barbers]);

  const fetchTurns = async () => {
    try {
      if (turns && barbersActive.length > 0 && turns.length > 0) {
        const turnosTransformados = await Promise.all(turns.map(transformarTurno));
        setEvents(turnosTransformados);
      } else {
        setEvents([]);
      }
    } catch (e) {
      console.error(e);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      await fetchTurns();
      setLoadingTurns(false);
    };

    fetchData();
  }, [turns]);


  useEffect(() => {
    fetchTurns();
  }, []);

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

  React.useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

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
                      id={barber.id}
                    >
                      <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: "10px" }}>
                        <Avatar
                          alt="Imagen"
                          src={`${process.env.REACT_APP_URL_BASE}${barber.imagen}`}
                          sx={{ width: 30, height: 30, marginRight: "10px", objectFit: "cover" }}
                        />
                        <p style={{ margin: 0 }}>
                          {barber.firstName} {barber.lastName}
                        </p>
                      </Box>
                    </Tab>
                  ))}
              </Tabs>
              <Content active>
                <Card className="cardCalendar" variant="outlined">
                  <Box sx={{ md: { p: 4 }, sm: { p: 3 } }}>
                    <Card
                      style={{
                        marginBottom: "20px",
                        padding: "0px 10px",
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-between"
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
                              marginTop: "15px"
                            }}
                          >
                            <InputLabel htmlFor="my-input">
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
                      <p>{loadingTurns ? "true" : "false"}</p>
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
                          hiddenDays={[0, 6]}
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
        <MotionModal
          isOpen={openModalHours}
          handleClose={handleCloseModalHours}
        >
          <Box mt={1} position="relative">
            <FormHoursCalendar
              openingTime={openingTime}
              closingTime={closingTime}
              idHoursCalendar={idHoursCalendar}
              setOpenModalHours={setOpenModalHours}
              updateCalendarData={updateCalendarData}
            />
          </Box>
        </MotionModal>
      </>
    </MainComponent>
  )
}

export default Calendar

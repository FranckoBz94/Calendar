import React, { useRef, useState, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import MotionComponent from "components/MotionComponent"
import { Alert, Box, Button, Card, InputLabel, Stack, Tooltip } from "@mui/material"
import { AppBarComponent } from "pages/AppBar/AppBar"
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
import { NotifyHelper, newArrayServices, transformarTurno } from "contants"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import moment from "moment"
import FormHoursCalendar from "./FormHoursCalendar"
import { getAllHours } from "redux/actions/hoursAction"
import { EventApi } from "@fullcalendar/core"

const Calendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalHours, setOpenModalHours] = useState(false)
  const [openingTime, setOpeningTime] = useState("")
  const [idHoursCalendar, setIdHoursCalendar] = useState(0)
  const [closingTime, setClosingTime] = useState("")
  const [barberSelected, setBarberSelected] = useState({
    id: "",
    firstName: "",
    lastName: ""
  })
  const [dataSelected, setDataSelected] = useState({})
  const [filteredServices, setFilteredServices] = useState([])

  const [events, setEvents] = useState([{}])
  const [active, setActive] = useState(0)

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

  const handleClick = (e: any) => {
    const index = parseInt(e.id, 0)
    if (index !== active) {
      setActive(index)
      setBarberSelected(e)
      dispatch(getAllTurns(e.id) as any)
    }
  }

  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | null>(null);

  const handleEventMouseEnter = (mouseEnterInfo: any) => {
    const event = mouseEnterInfo.event as EventApi;
    if (event) {
      const eventData = event.extendedProps;
      const content = (
        <div>
          <small style={{ margin: 0 }}>ddd</small>
          <h5 style={{ margin: 0 }}>{event.title}</h5>
          <small style={{ margin: 0 }}>Turno: {eventData.description}</small>
        </div>
      );
      setTooltipContent(content);
    }
  };

  const handleEventMouseLeave = () => {
    setTooltipContent(null);
  };

  const calculateNewArrayServices = async (dataTurn: any) => {
    let rtaAvailableTurn
    try {
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
    const { event } = clickInfo
    console.log("erv", event)
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

  const handleDateSelect = async (event: any) => {
    console.log("e", event)
    if (barbers.length > 0) {
      const currentView = calendarRef.current?.getApi().view.type
      if (currentView === "timeGridWeek") {
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

  const selectBarber = async () => {
    if (barbers) {
      setBarberSelected(barbers[0])
      setActive(barbers[0]?.id)
      dispatch(getAllTurns(barbers[0]?.id) as any)
    }
  }

  useEffect(() => {
    getHoursCalendar()
  }, [])

  useEffect(() => {
    if (Array.isArray(barbers) && barbers.length > 0) {
      selectBarber()
    }
  }, [barbers])

  useEffect(() => {
    const fetchTurns = async () => {
      try {
        if (turns && turns.length > 0) {
          const turnosTransformados = await Promise.all(
            turns.map(transformarTurno)
          )
          setEvents(turnosTransformados)
        } else {
          setEvents([])
        }
      } catch (e) {
        console.error(e)
      }
    }

    fetchTurns()
  }, [turns])

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAllBarbers() as any)
        dispatch(getAllClients() as any)
        dispatch(getAllServices() as any)
      } catch (error) {
        console.error("Error al obtener los datos:", error)
      }
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    setAllServices(services)
  }, [services])

  return (
    <AppBarComponent>
      <>
        <MotionComponent>
          <>
            <Box mt={2}>
              <Card variant="outlined">
                <Box p={4}>
                  <Tabs>
                    {barbers &&
                      barbers?.map((barber: any, index: number) => {
                        return (
                          <Tab
                            key={index}
                            onClick={() => handleClick(barber)}
                            active={active === barber.id}
                            id={barber.id}
                          >
                            {barber.firstName} {barber.lastName}
                          </Tab>
                        )
                      })}
                  </Tabs>
                  <Content active>
                    <Card className="cardCalendar" variant="outlined">
                      <Box p={4}>
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
                          <Box sx={{ width: 1 }}>
                            {barbers && barbers.length === 0 ? (
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
                                  alignItems: "center"
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
                          eventContent={(eventInfo) => {
                            const eventData = eventInfo.event.extendedProps;
                            return (
                              <div style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                <small style={{ margin: 0 }}>{eventInfo.timeText}</small>
                                <h5 style={{ margin: 0 }}>{eventInfo.event.title}</h5>
                                <small style={{ margin: 0 }}>Turno: {eventData.description}</small>
                              </div>
                            );
                          }}
                          eventMouseEnter={handleEventMouseEnter}
                          eventMouseLeave={handleEventMouseLeave}
                          eventClick={handleEventClick}
                          height={"auto"}
                          selectable={true}
                          select={handleDateSelect}
                        />
                        {tooltipContent && (
                          <Tooltip title={tooltipContent} placement="top" arrow>
                            <div style={{ display: "none" }}></div>
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
              <Box mt={1} position="relative">
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
        </MotionComponent>
      </>
    </AppBarComponent>
  )
}

export default Calendar

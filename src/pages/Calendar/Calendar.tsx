import React, { useRef, useState, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import MotionComponent from "components/MotionComponent"
import { Box, Card, InputLabel } from "@mui/material"
import { AppBarComponent } from "pages/AppBar/AppBar"
import esLocale from "@fullcalendar/core/locales/es"
import { Tabs, Tab, Content } from "../../components/Tabs/tabs"
import { useDispatch, useSelector } from "react-redux"
import { getAllBarbers } from "redux/actions/barbersAction"
import store from "redux/store"
import interactionPlugin from "@fullcalendar/interaction"
import MotionModal from "components/Modal/Modal"
import { useStyles } from "./styles"
import CloseIcon from "@mui/icons-material/Close"
import FormAddEdit from "./FormAddEdit"
import { getAllClients } from "redux/actions/clientsAction"

const Calendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null)
  const classes: any = useStyles()

  const [view] = useState("dayGridMonth")
  const [openModal, setOpenModal] = useState(false)
  const [optionSelected, setOptionSelected] = useState("")
  const [barberSelected, setBarberSelected] = useState({
    firstName: "",
    lastName: ""
  })
  const [dataSelected, setDataSelected] = useState({})

  const [events] = useState([
    {
      title: "Event 1",
      start: "2023-04-08T10:00:00",
      end: "2023-04-08T12:00:00"
    },
    {
      title: "Event 2",
      start: "2022-03-10T14:00:00",
      end: "2022-03-10T16:00:00"
    }
  ])
  const [active, setActive] = useState(0)

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const dispatch = useDispatch()

  type RootState = ReturnType<typeof store.getState>
  const { barbers } = useSelector((state: RootState) => state.barbers)
  const { clients } = useSelector((state: RootState) => state.clients)
  console.log(clients)
  const handleClick = (e: any) => {
    console.log(e)
    const index = parseInt(e.id, 0)
    if (index !== active) {
      setActive(index)
      setBarberSelected(e)
    }
  }

  const handleDateSelect = (arg: any) => {
    // setEvents([...events, { title: "title", start: arg.start, end: arg.end }])
    console.log(arg)
    setDataSelected(arg)
    setOptionSelected("Editar")
    setOpenModal(true)
    console.log("dateClick", arg)
  }

  const handleEventClick = (clickInfo: any) => {
    const { event } = clickInfo
    setDataSelected(event)
    console.log("handleEventClick")
  }

  useEffect(() => {
    dispatch(getAllBarbers() as any)
    dispatch(getAllClients() as any)
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(view)
    }
  }, [view])

  useEffect(() => {
    setBarberSelected(barbers[0])
    setActive(barbers[0]?.id)
    console.log(barbers[0])
  }, [barbers])

  console.log(barberSelected)

  return (
    <AppBarComponent>
      <MotionComponent>
        <>
          <Box mt={2}>
            <Card variant="outlined">
              <Box p={4}>
                <Tabs>
                  {barbers.map((barber: any, index: number) => {
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

                <MotionComponent>
                  <Content active>
                    <Card className="cardCalendar" variant="outlined">
                      <Box p={4}>
                        <Card
                          style={{ marginBottom: "20px" }}
                          variant="outlined"
                        >
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
                          slotMinTime="09:00"
                          slotMaxTime="20:00"
                          allDaySlot={false}
                          locales={[esLocale]}
                          events={events}
                          eventClick={handleEventClick}
                          height={600}
                          selectable={true}
                          select={handleDateSelect}
                        />
                      </Box>
                    </Card>
                  </Content>
                </MotionComponent>
              </Box>
            </Card>
          </Box>
          <MotionModal open={openModal} handleClose={handleCloseModal}>
            <Box mt={1} position="relative">
              <Box
                position="absolute"
                className={classes.close}
                onClick={handleCloseModal}
              >
                <CloseIcon />
              </Box>
              <FormAddEdit
                dataFormEvent={dataSelected}
                optionSelected={optionSelected}
                setOpenModal={setOpenModal}
                allClients={clients}
              />
            </Box>
          </MotionModal>
        </>
      </MotionComponent>
    </AppBarComponent>
  )
}

export default Calendar

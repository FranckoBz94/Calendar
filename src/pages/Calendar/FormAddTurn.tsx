import React, { useEffect, useState } from "react"
import { ThemeProvider } from "@mui/styles"
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField
} from "@mui/material"
import { useFormik } from "formik"
import { LoadingButton } from "@mui/lab"
import Select, { components } from "react-select"
import { DateContants } from "utils/DateContants"
import { addTurn, getAllTurns, hoursAvailableOnSave } from "redux/actions/turnsAction"
import { useDispatch } from "react-redux"
import { NotifyHelper, socket } from "contants"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import moment from "moment"
import FormClient from "pages/Clients/FormClient"

interface FormCalendarProps {
  dataFormEvent: any
  setOpenModal: (send: boolean) => void
  allClients: []
  allServices: any
  barberSelected: any
}

const FormAddTurn = (props: FormCalendarProps) => {
  const [selectedOptionClient, setSelectedOptionClient] = useState(null)
  const [value, setValue] = React.useState("1")
  const [isLoading, setIsLoading] = React.useState(false)
  const {
    dataFormEvent,
    allClients,
    allServices,
    setOpenModal,
    barberSelected
  } = props
  console.log("allServices", allServices)
  const [selectedOptionService, setSelectedOptionService] = useState({
    id: allServices[0]?.id,
    minutes_service: allServices[0]?.minutes_service,
    price: allServices[0]?.price
  })
  const theme = createTheme()
  const dispatch = useDispatch()
  const endTime = DateContants.calculateEndTime(
    dataFormEvent.start,
    selectedOptionService.minutes_service
  )
  const initialValues = {
    title: null,
    idClient: null,
    dateBooking: DateContants.formatDate(dataFormEvent.start) || "",
    start: new Date(dataFormEvent.start) || "",
    end: endTime,
    idService: null
  }

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const registerEvent = async (data: any) => {
    setIsLoading(true);
    const idService = selectedOptionService.id || undefined
    console.log("dataFormEvent.start", dataFormEvent.start)
    const endTime = DateContants.calculateEndTime(
      dataFormEvent.start,
      selectedOptionService.minutes_service
    )
    console.log("dataFormEvent.start", dataFormEvent.start)
    console.log("endTime", moment(moment(endTime).toDate()).format(
      "YYYY-MM-DD HH:mm:ss"
    ))
    const dataComplete = {
      ...data,
      end: moment(endTime).toDate(),
      idBarber: barberSelected.id,
      price: selectedOptionService.price,
      idService,
      end_date: moment(moment(endTime).toDate()).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      start_date: moment(moment(data.start).toDate()).format(
        "YYYY-MM-DD HH:mm:ss"
      )
    }
    let rtaAddTurn
    let stillAvailable
    try {
      console.log("dataComplete", dataComplete)
      stillAvailable = await dispatch(hoursAvailableOnSave(dataComplete) as any)
      if (stillAvailable.message.length === 0) {
        rtaAddTurn = await dispatch(addTurn(dataComplete) as any)
        if (rtaAddTurn.rta === 1) {
          dispatch(getAllTurns(barberSelected.id) as any)
          NotifyHelper.notifySuccess(rtaAddTurn.message)
          socket.emit("turn", barberSelected.id);
          setOpenModal(false)
        } else {
          NotifyHelper.notifyError(rtaAddTurn.message)
        }
      } else {
        NotifyHelper.notifyWarning("Ya hay un turno registrado en este horario.")
      }
    } catch (err) {
      NotifyHelper.notifyError(`Ocurrio un error, intente nuvamente.`)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (allServices && allServices.length > 0) {
      setSelectedOptionService({
        id: allServices[0]?.id,
        minutes_service: allServices[0]?.minutes_service,
        price: allServices[0].price
      });
    }
  }, [allServices]);



  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: registerEvent
  })

  const { handleSubmit, handleChange, values } = formik

  const handleChangeSelectClient = (selectedOption: any) => {
    values.idClient = selectedOption.value
    values.title = selectedOption.label
    setSelectedOptionClient(selectedOption)
  }

  const handleChangeSelectService = (e: any) => {
    const dataTurn = JSON.parse(e.value)
    values.idService = dataTurn.id
    setSelectedOptionService(JSON.parse(e.value))
  }

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

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChangeTab}
              >
                <Tab label="Nuevo Turno" value="1" />
                <Tab label="Nuevo Cliente" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <form onSubmit={handleSubmit} >
                <Grid container spacing={2} sx={{ flex: 1, overflowY: 'auto' }}>
                  <Grid item xs={12} mb={2}>
                    <small style={{ marginLeft: "15px", marginBottom: "-4px", color: "rgb(158 158 158)" }}>Cliente</small>
                    <Select
                      isSearchable={true}
                      options={allClients.map((client: any) => ({
                        label: client.firstName + " " + client.lastName,
                        value: client.id
                      }))}
                      value={selectedOptionClient}
                      onChange={handleChangeSelectClient}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Seleccione un cliente"
                      required
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      id="date"
                      type="date"
                      label="Día"
                      disabled
                      value={values.dateBooking}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="time"
                      label="Hora"
                      disabled
                      type="time"
                      value={DateContants.formatDateTime(values.start)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="text"
                      name="note"
                      placeholder="Agregar Nota"
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      multiline
                      rows={3}
                    />
                  </Grid>

                  <Grid item xs={12} mb={2} pb={1}>
                    <Select
                      isSearchable={false}
                      options={allServices.map((service: any) => ({
                        label: service.name_service + " <small>(" + service.minutes_service + " minutos)</small>",
                        value: JSON.stringify({
                          id: service.id,
                          minutes_service: service.minutes_service,
                          price: service.price_service
                        })
                      }))}
                      isMulti={false}
                      onChange={handleChangeSelectService}
                      className="basic-single select-modal"
                      classNamePrefix="select"
                      placeholder="Seleccione un servicio"
                      required
                      components={{ Option: Option, SingleValue: SingleValue }}
                      styles={{
                        menu: provided => ({
                          ...provided,
                          height: 'auto',
                          maxHeight: '200px', // Ajusta esta altura según tus necesidades
                          overflowY: 'auto',
                          borderRadius: '5px',
                          border: "1px solid #ddd"
                        }),
                        container: provided => ({
                          ...provided,
                          flex: 1,
                          marginBottom: 3,
                        }),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                      <LoadingButton
                        size="small"
                        type="submit"
                        className="btnSubmitOption2"
                        loadingPosition="start"
                        loading={isLoading}
                        variant="contained"
                        sx={{ py: 2, px: 4 }}
                      >
                        <span>Guardar</span>
                      </LoadingButton>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </TabPanel>
            <TabPanel value="2">
              <FormClient
                dataFormClient=""
                optionSelected="NewClient"
                setOpenModal={setOpenModal}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default FormAddTurn

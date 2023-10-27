import React, { useState } from "react"
import { ThemeProvider } from "@mui/styles"
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from "@mui/material"
import { useFormik } from "formik"
import { LoadingButton } from "@mui/lab"
import Select from "react-select"
import { DateContants } from "utils/DateContants"
import { addTurn, getAllTurns } from "redux/actions/turnsAction"
import { useDispatch } from "react-redux"
import { NotifyHelper } from "contants"
import moment from "moment"

interface FormCalendarProps {
  dataFormEvent: any
  setOpenModal: (send: boolean) => void
  allClients: []
  allServices: any
  // addEvent: (event: {}) => void
  barberSelected: any
}

const FormAddEdit = (props: FormCalendarProps) => {
  const [selectedOptionClient, setSelectedOptionClient] = useState(null)
  const [selectedOptionService, setSelectedOptionService] = useState({
    label: "",
    value: 0
  })
  const {
    dataFormEvent,
    allClients,
    allServices,
    setOpenModal,
    barberSelected
  } = props
  const theme = createTheme()
  const dispatch = useDispatch()

  const endTime = DateContants.calculateEndTime(
    dataFormEvent.start,
    selectedOptionService
  )
  const initialValues = {
    title: null,
    idClient: null,
    dateBooking: DateContants.formatDate(dataFormEvent.start) || "",
    start: new Date(dataFormEvent.start) || "",
    end: endTime,
    idService: null
  }

  const registerEvent = async (data: any) => {
    const idService = selectedOptionService
      ? selectedOptionService.value
      : undefined
    const dataComplete = {
      ...data,
      end: moment(endTime).toDate(),
      idBarber: barberSelected.id,
      idService
    }
    let rtaAddTurn
    try {
      rtaAddTurn = await dispatch(addTurn(dataComplete) as any)
      if (rtaAddTurn.rta === 1) {
        setOpenModal(false)
        dispatch(getAllTurns(barberSelected.id) as any)
        NotifyHelper.notifySuccess(rtaAddTurn.message)
      } else {
        NotifyHelper.notifyError(rtaAddTurn.message)
      }
    } catch (err) {
      NotifyHelper.notifyError(`Ocurrio un error, intente nuvamente.`)
    }
    // addEvent(dataComplete)
  }

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

  const handleChangeSelectService = (selectedOption: any) => {
    values.idService = selectedOption.value
    setSelectedOptionService(selectedOption)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Box mb={4}>
            <Typography component="h1" variant="h5">
              Nuevo Turno
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} mb={2}>
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

              <Grid item xs={6}>
                <TextField
                  id="date"
                  type="date"
                  label="Día"
                  disabled
                  value={values.dateBooking}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
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
                  label="Agregar Nota"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <Select
                  isSearchable={true}
                  options={allServices.map((service: any) => ({
                    label: service.name_service,
                    value: service.id,
                    minutes: service.minutes_service
                  }))}
                  value={selectedOptionService}
                  onChange={handleChangeSelectService}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Seleccione un servicio"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <LoadingButton
                    size="small"
                    type="submit"
                    className="btnSubmitOption2"
                    // loading={isLoading}
                    variant="contained"
                    sx={{ mt: 5, mb: 5, py: 2, px: 4 }}
                  >
                    <span>Guardar</span>
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default FormAddEdit

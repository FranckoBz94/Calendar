import React, { useState } from "react"
import { Box, Container, Grid, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { LoadingButton } from "@mui/lab"
import Select from "react-select"
import { DateContants } from "utils/DateContants"
import { HelperContants } from "utils/HelperContants"
import { NotifyHelper } from "contants"
import { useDispatch } from "react-redux"
import { getAllTurns, removeTurn, updateTurn } from "redux/actions/turnsAction"
import moment from "moment"

interface FormCalendarProps {
  dataFormEvent: any
  allServices: any
  allClients: []
  setOpenModalEdit: (send: boolean) => void
  barberSelected: any
}

const FormEditTurn = (props: FormCalendarProps) => {
  const {
    dataFormEvent,
    allServices,
    allClients,
    barberSelected,
    setOpenModalEdit
  } = props
  const {
    title,
    idClient,
    idBarber,
    dateBooking,
    startTurn,
    idService,
    idTurn
  } = dataFormEvent
  const [selectedOptionService, setSelectedOptionService] = useState(
    dataFormEvent?.idService
  )
  const dispatch = useDispatch()

  const endTime = DateContants.calculateEndTime(
    dataFormEvent.startTurn,
    selectedOptionService
  )

  const initialValues = {
    title,
    idClient,
    dateBooking: dateBooking || "",
    start: startTurn || "",
    end: endTime,
    idService
  }
  // console.log("dataFormEvent", dataFormEvent.idService)

  const updateEvent = async (data: any) => {
    const idService = selectedOptionService || undefined
    const dataComplete = {
      ...data,
      end: moment(endTime).toDate(),
      idBarber: barberSelected.id,
      idService
    }
    let rtaAddTurn
    try {
      rtaAddTurn = await dispatch(updateTurn(dataComplete, idTurn) as any)
      if (rtaAddTurn.rta === 1) {
        setOpenModalEdit(false)
        dispatch(getAllTurns(barberSelected.id) as any)
        NotifyHelper.notifySuccess(rtaAddTurn.message)
      } else {
        NotifyHelper.notifyError(rtaAddTurn.message)
      }
    } catch (err) {
      NotifyHelper.notifyError(`Ocurrio un error, intente nuvamente.`)
    }
  }

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: updateEvent
  })

  const { handleSubmit, handleChange, values } = formik

  // console.log("dataFormEvent", dataFormEvent)
  const deleteTurn = async () => {
    const { idTurn, rtaDelete } = await HelperContants.SwalDeleteTurn(
      dataFormEvent
    )

    if (rtaDelete) {
      const rtaRemoveTurn = await dispatch(removeTurn(idTurn) as any)
      if (rtaRemoveTurn.rta === 1) {
        dispatch(getAllTurns(idBarber) as any)
        NotifyHelper.notifySuccess(rtaRemoveTurn.message)
      } else {
        NotifyHelper.notifyError(rtaRemoveTurn.message)
      }
      setOpenModalEdit(false)
    }
  }

  const handleChangeSelectService = (event: any) => {
    console.log(event.target.value)
    values.idService = event.target.value
    setSelectedOptionService(event.target.value)
  }

  const selectedClient: any = allClients.find(
    (client: any) => client.id === values.idClient
  )

  // const selectedService: any = allServices.find(
  //   (service: any) => service.id === values.idService
  // )

  // console.log("values", values)
  // console.log("selectData", selectedClient)
  console.log("dataFormEvent", dataFormEvent)

  return (
    <>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} mb={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="h5">Editar turno</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Select
                  isSearchable={true}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  options={allClients.map((client: any) => ({
                    label: client.firstName + " " + client.lastName,
                    value: client.id
                  }))}
                  defaultValue={
                    selectedClient
                      ? {
                          label:
                            selectedClient?.firstName +
                            " " +
                            selectedClient?.lastName,
                          value: selectedClient?.id
                        }
                      : null
                  }
                  placeholder="Cliente"
                  onChange={handleChangeSelectService}
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="date"
                  type="date"
                  label="Día"
                  disabled
                  // value={values.dateBooking}
                  value={moment(values.dateBooking).format("YYYY-MM-DD")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="time"
                  label="Hora"
                  disabled
                  type="time"
                  value={DateContants.formatDateToTimeInput(values.start)}
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
                <select
                  className="form-control custom_select"
                  onChange={handleChangeSelectService}
                >
                  {allServices.map((service: any) => (
                    <option
                      value={service.id}
                      key={service.id}
                      defaultValue={dataFormEvent?.idService}
                      onChange={handleChangeSelectService}
                    >
                      {service.name_service}
                    </option>
                  ))}
                </select>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <LoadingButton
                    size="small"
                    type="submit"
                    className="btnSubmitOption2"
                    // loading={isLoading}
                    variant="contained"
                    sx={{ mt: 5, mb: 5, py: 2, px: 4, mx: 3 }}
                  >
                    <span>Actualizar</span>
                  </LoadingButton>
                  <LoadingButton
                    size="small"
                    variant="contained"
                    color="error"
                    sx={{ mt: 5, mb: 5, py: 2, px: 4, mx: 3 }}
                    onClick={deleteTurn}
                  >
                    <span>Eliminar</span>
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  )
}

export default FormEditTurn

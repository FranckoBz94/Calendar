import React from "react"
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

interface FormCalendarProps {
  dataFormEvent: any
  optionSelected: string
  setOpenModal: (send: boolean) => void
  allClients: []
}

const FormAddEdit = (props: FormCalendarProps) => {
  const { dataFormEvent, optionSelected, allClients } = props
  const theme = createTheme()

  const formatDateTime = (fecha: any) => {
    const hora = fecha.getHours()
    const minutos = fecha.getMinutes()
    const horaMinutos = `${hora < 10 ? "0" + hora : hora}:${
      minutos < 10 ? "0" + minutos : minutos
    }`
    return horaMinutos
  }

  const formatDate = (fecha: any) => {
    const dia = fecha.getDate().toString().padStart(2, "0")
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0")
    const anio = fecha.getFullYear().toString()
    const fechaFormateada = `${anio}-${mes}-${dia}`
    console.log(fechaFormateada)
    return fechaFormateada
  }

  const initialValues = {
    title: "title" || "",
    dateBooking: formatDate(dataFormEvent.start) || "",
    start: formatDateTime(dataFormEvent.start) || ""
  }

  const registerEvent = async (data: any) => {
    console.log(data)
  }

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: registerEvent
  })

  const { handleSubmit, handleChange, values } = formik

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
              {optionSelected === "Editar" ? "Datos Turno" : "Nuevo Turno"}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  isMulti
                  name="colors"
                  isSearchable={true}
                  options={allClients.map((client: any) => ({
                    label: client.firstName + " " + client.lastName,
                    value: client.id
                  }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="time"
                  type="date"
                  label="Hora Desde"
                  value={values.dateBooking}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="time"
                  label="Hora"
                  type="time"
                  value={values.start.toLocaleString()}
                  fullWidth
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
                    <span>
                      {optionSelected === "Editar" ? "Actualizar" : "Guardar"}
                    </span>
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

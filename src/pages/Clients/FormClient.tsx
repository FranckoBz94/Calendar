import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from "@mui/material"
import { ThemeProvider } from "@mui/styles"
import { LoadingButton } from "@mui/lab"
import { NotifyHelper } from "contants"
import { useDispatch } from "react-redux"
import { addClient, updateClient } from "redux/actions/clientsAction"

interface FormClientProps {
  dataFormClient: any
  optionSelected: string
  setOpenModal: (send: boolean) => void
}

const FormClient = (props: FormClientProps) => {
  const { dataFormClient, optionSelected, setOpenModal } = props
  const [isLoading, setIsLoading] = React.useState(false)
  const dispatch = useDispatch()
  console.log("formdata", dataFormClient)
  const initialValues = {
    firstName: dataFormClient.firstName || "",
    lastName: dataFormClient.lastName || "",
    email: dataFormClient.email || "",
    telefono: dataFormClient.telefono || "",
    dni: dataFormClient.dni || ""
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required("El nombre es requerido"),
    lastName: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("El email no es válido")
      .required("El email es requerido"),
    telefono: Yup.string().required("El teléfono es requerido"),
    dni: Yup.string()
  })

  const registerClient = async (data: any) => {
    console.log("optionSelected", optionSelected)
    setIsLoading(true)
    let rtaUpdateClient
    if (optionSelected === "Editar") {
      try {
        rtaUpdateClient = await dispatch(
          updateClient(data, dataFormClient.id) as any
        )
        if (rtaUpdateClient.rta === 1) {
          NotifyHelper.notifySuccess(`Cliente actualizado correctamente.`)
          setOpenModal(false)
          setIsLoading(false)
        } else {
          NotifyHelper.notifyError(`Ocurrio un error, intente nuvamente.`)
          setIsLoading(false)
        }
      } catch (err) {
        NotifyHelper.notifyError(`Ocurrio un error, intente nuvamente.`)
        setIsLoading(false)
      }
    } else {
      let rtaAddClient
      try {
        console.log("data", data)
        rtaAddClient = await dispatch(addClient(data) as any)
        console.log("rtaAddClient", rtaAddClient)
        if (rtaAddClient.rta === 1) {
          NotifyHelper.notifySuccess(rtaAddClient.message)
          setOpenModal(false)
          setIsLoading(false)
        } else {
          NotifyHelper.notifyError(rtaAddClient.message)
          setIsLoading(false)
        }
      } catch (err) {
        NotifyHelper.notifyError(`Ocurrio un error, intente nuvamente.`)
        setIsLoading(false)
      }
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: registerClient
  })

  const { handleSubmit, handleChange, values, errors } = formik
  const theme = createTheme()

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
          <Typography component="h1" variant="h5">
            {optionSelected === "Editar" ? "Datos Cliente" : "Nuevo Cliente"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="nombre"
                  name="firstName"
                  label="Nombre"
                  value={values.firstName}
                  onChange={handleChange}
                  error={Boolean(errors.firstName)}
                  helperText={
                    String(errors.firstName) !== "undefined"
                      ? String(errors.firstName)
                      : ""
                  }
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="apellido"
                  name="lastName"
                  label="Apellido"
                  onChange={handleChange}
                  value={values.lastName}
                  error={Boolean(errors.lastName)}
                  helperText={
                    String(errors.lastName) !== "undefined"
                      ? String(errors.lastName)
                      : ""
                  }
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  value={values.email}
                  error={Boolean(errors.email)}
                  helperText={
                    String(errors.email) !== "undefined"
                      ? String(errors.email)
                      : ""
                  }
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="telefono"
                  name="telefono"
                  label="Teléfono"
                  onChange={handleChange}
                  value={values.telefono}
                  error={Boolean(errors.telefono)}
                  helperText={
                    String(errors.telefono) !== "undefined"
                      ? String(errors.telefono)
                      : ""
                  }
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="DNI"
                  name="dni"
                  onChange={handleChange}
                  value={values.dni}
                  error={Boolean(errors.dni)}
                  helperText={
                    String(errors.dni) !== "undefined" ? String(errors.dni) : ""
                  }
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <LoadingButton
                    size="small"
                    type="submit"
                    className="btnSubmitOption2"
                    loading={isLoading}
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

export default FormClient

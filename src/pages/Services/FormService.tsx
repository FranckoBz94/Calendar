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
import { addService, updateService } from "redux/actions/servicesAction"

interface FormServiceProps {
  dataFormService: any
  optionSelected: string
  setOpenModal: (send: boolean) => void
}

const FormService = (props: FormServiceProps) => {
  const { dataFormService, optionSelected, setOpenModal } = props
  const [isLoading, setIsLoading] = React.useState(false)
  const dispatch = useDispatch()
  console.log("formdata", dataFormService)
  const initialValues = {
    name_service: dataFormService.name_service || "",
    price_service: dataFormService.price_service || "",
    minutes_service: dataFormService.minutes_service || ""
  }

  const validationSchema = Yup.object({
    name_service: Yup.string().required("El nombre es requerido"),
    price_service: Yup.string().required("El precio es requerido"),
    minutes_service: Yup.string().required("Los minutos son requeridos")
  })

  const registerClient = async (data: any) => {
    console.log("optionSelected", optionSelected)
    setIsLoading(true)
    let rtaUpdateClient
    if (optionSelected === "Editar") {
      try {
        rtaUpdateClient = await dispatch(
          updateService(data, dataFormService.id) as any
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
        rtaAddClient = await dispatch(addService(data) as any)
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
            {optionSelected === "Editar"
              ? "Actualizar Servicio"
              : "Nuevo Servicio"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name_service"
                  name="name_service"
                  label="Nombre"
                  value={values.name_service}
                  onChange={handleChange}
                  error={Boolean(errors.name_service)}
                  helperText={
                    String(errors.name_service) !== "undefined"
                      ? String(errors.name_service)
                      : ""
                  }
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="minutes_service"
                  name="minutes_service"
                  label="Minutos"
                  onChange={handleChange}
                  value={values.minutes_service}
                  error={Boolean(errors.minutes_service)}
                  helperText={
                    String(errors.minutes_service) !== "undefined"
                      ? String(errors.minutes_service)
                      : ""
                  }
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="price_service"
                  type="number"
                  name="price_service"
                  label="Precio"
                  onChange={handleChange}
                  value={values.price_service}
                  error={Boolean(errors.price_service)}
                  helperText={
                    String(errors.price_service) !== "undefined"
                      ? String(errors.price_service)
                      : ""
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

export default FormService

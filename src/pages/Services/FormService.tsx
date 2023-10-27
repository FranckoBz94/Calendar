import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  Alert,
  Box,
  Container,
  createTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography
} from "@mui/material"

import { ThemeProvider } from "@mui/styles"
import { LoadingButton } from "@mui/lab"
import { NotifyHelper } from "contants"
import { useDispatch } from "react-redux"
import { addService, updateService } from "redux/actions/servicesAction"
import Select from "@mui/material/Select"

interface FormValues {
  name_service: string
  price_service: string
  minutes_service?: number
  event_color?: string
}

interface FormServiceProps {
  dataFormService: any
  optionSelected: string
  setOpenModal: (send: boolean) => void
}
const minuteInitialSelect: number = 30

const FormService: React.FC<FormServiceProps> = (props) => {
  const { dataFormService, optionSelected, setOpenModal } = props
  const [isLoading, setIsLoading] = React.useState(false)
  const [minutes, setMinutes] = useState(minuteInitialSelect)
  const [selectedColor, setSelectedColor] = useState("#000000") // Initial color

  const handleColorChange = (event: any) => {
    setSelectedColor(event.target.value)
  }

  const dispatch = useDispatch()
  const initialValues: FormValues = {
    name_service: dataFormService.name_service || "",
    price_service: dataFormService.price_service || ""
  }

  const validationSchema = Yup.object({
    name_service: Yup.string().required("El nombre es requerido"),
    price_service: Yup.string().required("El precio es requerido")
  })

  const defaultValues: () => void = () => {
    if (optionSelected === "Editar") {
      initialValues.name_service = dataFormService.name_service
      initialValues.price_service = dataFormService.price_service
      setSelectedColor(dataFormService.event_color)
      setMinutes(dataFormService.minutes_service)
    } else {
      setMinutes(minuteInitialSelect)
    }
  }

  useEffect(() => {
    defaultValues()
  }, [])

  const registerService = async (data: FormValues) => {
    data.minutes_service = minutes
    data.event_color = selectedColor
    setIsLoading(true)
    try {
      if (optionSelected === "Editar") {
        const response = await dispatch(
          updateService(data, dataFormService.id) as any
        )
        if (response.rta === 1) {
          NotifyHelper.notifySuccess(`Servicio actualizado correctamente.`)
          setOpenModal(false)
        } else {
          NotifyHelper.notifyError(`Ocurrió un error, inténtelo nuevamente.`)
        }
      } else {
        const response = await dispatch(addService(data) as any)
        if (response.rta === 1) {
          NotifyHelper.notifySuccess(response.message)
          setOpenModal(false)
        } else {
          NotifyHelper.notifyError(response.message)
        }
      }
    } catch (error) {
      NotifyHelper.notifyError(`Ocurrió un error, inténtelo nuevamente.`)
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: registerService
  })

  const { handleSubmit, handleChange, values, errors } = formik
  const theme = createTheme()

  const handleChangeSelect = (e: any) => {
    setMinutes(e.target.value)
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
                  helperText={errors.name_service}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Minutos</InputLabel>
                  <Select
                    label="Minutos"
                    inputProps={{
                      id: "outlined-age-native-simple",
                      name: "minutos"
                    }}
                    value={minutes}
                    onChange={handleChangeSelect}
                    required
                  >
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={60}>60</MenuItem>
                    <MenuItem value={90}>90</MenuItem>
                    <MenuItem value={120}>120</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    id="price_service"
                    type="number"
                    name="price_service"
                    label="Precio"
                    onChange={handleChange}
                    value={values.price_service}
                    error={Boolean(errors.price_service)}
                    helperText={errors.price_service}
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="event_color"
                    type="color"
                    name="event_color"
                    label="Color del evento"
                    value={selectedColor}
                    onChange={handleColorChange}
                    fullWidth
                  />
                </FormControl>
              </Grid>
              {optionSelected === "Editar" && (
                <Grid item xs={12}>
                  <Alert variant="filled" severity="warning">
                    La actualizacion del tiempo de los servicios no se vera
                    reflejada en turnos anteriores
                  </Alert>
                </Grid>
              )}
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

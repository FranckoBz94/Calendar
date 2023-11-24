import * as React from "react"
// import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useFormik } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import { Card, Checkbox, FormControlLabel } from "@mui/material"
import { useDispatch } from "react-redux"
import { NotifyHelper } from "contants"
import LoadingButton from "@mui/lab/LoadingButton"
import { addBarber, updateBarber } from "redux/actions/barbersAction"

const theme = createTheme()

interface FormUserProps {
  dataForm: any
  optionSelected: string
  setOpenModal: (send: boolean) => void
}

const FormUser = (props: FormUserProps) => {
  const [isAdminChecked, setIsAdminChecked] = React.useState(false)
  const [isActiveChecked, setIsActiveChecked] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const dispatch = useDispatch()

  const { dataForm, optionSelected, setOpenModal } = props
  const initialValues = {
    firstName: dataForm.firstName || "",
    lastName: dataForm.lastName || "",
    email: dataForm.email || "",
    telefono: dataForm.telefono || "",
    imagen: "",
    is_active: !(false || dataForm.is_active === 0),
    is_admin: !(false || dataForm.is_admin === 0)
  }

  const registerBarber = async (data: any) => {
    console.log(data)
    setIsLoading(true)
    let rtaUpdateUser
    if (optionSelected === "Editar") {
      try {
        rtaUpdateUser = await dispatch(updateBarber(data, dataForm.id) as any)
        if (rtaUpdateUser.rta === 1) {
          NotifyHelper.notifySuccess(rtaUpdateUser.message)
          setOpenModal(false)
          setIsLoading(false)
        } else {
          NotifyHelper.notifyError(rtaUpdateUser.message)
          setIsLoading(false)
        }
      } catch (err) {
        NotifyHelper.notifyError(`Ocurrio un error, intente nuvamente.`)
        setIsLoading(false)
      }
    } else {
      let rtaAddUser
      try {
        rtaAddUser = await dispatch(addBarber(data) as any)
        if (rtaAddUser.rta === 1) {
          NotifyHelper.notifySuccess(rtaAddUser.message)
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
    }
  }

  const { handleSubmit, handleChange, values, errors, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        firstName: Yup.string().required("Debes ingresar un nombre"),
        lastName: Yup.string().required("Debes ingresar un apellido"),
        email: Yup.string().required("Debes ingresar un email")
      }),
      validateOnChange: false,
      onSubmit: registerBarber
    })

  const isAdminClick = () => {
    values.is_admin = !values.is_admin
    setIsAdminChecked(!isAdminChecked)
  }

  const isActiveClick = () => {
    values.is_active = !values.is_active
    setIsActiveChecked(!isActiveChecked)
  }

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target
    handleChange({ target: { name, value: checked } })
  }

  const handleInputChange = (field: any, value: any) => {
    setFieldValue(field, value)
  }

  React.useEffect(() => {}, [])

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
            {optionSelected === "Editar" ? "Datos Barbero" : "Nuevo Barbero"}
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <motion.div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="firstName"
                    required
                    fullWidth
                    label="Nombre"
                    type="text"
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    value={values.firstName}
                    error={Boolean(errors.firstName)}
                    helperText={
                      String(errors.firstName) !== "undefined"
                        ? String(errors.firstName)
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="Apellido"
                    name="lastName"
                    type="text"
                    onChange={handleChange}
                    value={values.lastName}
                    error={Boolean(errors.lastName)}
                    helperText={
                      String(errors.lastName) !== "undefined"
                        ? String(errors.lastName)
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={values.email}
                    error={Boolean(errors.email)}
                    helperText={
                      String(errors.email) !== "undefined"
                        ? String(errors.email)
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Teléfono"
                    name="telefono"
                    type="telefono"
                    onChange={handleChange}
                    value={values.telefono}
                    error={Boolean(errors.telefono)}
                    helperText={
                      String(errors.email) !== "undefined"
                        ? String(errors.email)
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={6} m={0}>
                  <Card
                    variant="outlined"
                    style={{
                      backgroundColor: values.is_active ? "#bbe1fa" : "",
                      cursor: "pointer"
                    }}
                    onClick={isActiveClick}
                  >
                    <FormControlLabel
                      name="is_active"
                      onClick={isActiveClick}
                      id="is_active"
                      control={
                        <Checkbox
                          checked={values.is_active}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Usuario activo"
                      labelPlacement="start"
                    />
                  </Card>
                </Grid>
                <Grid item xs={6} m={0}>
                  <Card
                    style={{
                      backgroundColor: values.is_admin ? "#bbe1fa" : "",
                      cursor: "pointer"
                    }}
                    variant="outlined"
                    onClick={isAdminClick}
                  >
                    <FormControlLabel
                      value={values.is_admin}
                      onClick={isAdminClick}
                      name="is_admin"
                      id="is_admin"
                      control={
                        <Checkbox
                          checked={values.is_admin}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Es administrador"
                      labelPlacement="start"
                    />
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default FormUser
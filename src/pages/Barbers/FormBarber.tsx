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
import { Card, Checkbox, FormControlLabel, Paper } from "@mui/material"
import { useDispatch } from "react-redux"
import { NotifyHelper } from "contants"
import LoadingButton from "@mui/lab/LoadingButton"
import { addBarber, updateBarber } from "redux/actions/barbersAction"

const theme = createTheme()

interface FormBarberProps {
  dataForm: any
  optionSelected: string
  setOpenModal: (send: boolean) => void
}

const urlBase = process.env.REACT_APP_URL_BASE

const FormBarber = (props: FormBarberProps) => {
  const [isAdminChecked, setIsAdminChecked] = React.useState(false)
  const [isActiveChecked, setIsActiveChecked] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [profileImage, setProfileImage] = React.useState<File | null>(null)

  const dispatch = useDispatch()

  const { dataForm, optionSelected, setOpenModal } = props
  const initialValues = {
    firstName: dataForm.firstName || "",
    lastName: dataForm.lastName || "",
    email: dataForm.email || "",
    telefono: dataForm.telefono || "",
    imageProfile:
      dataForm.imagen === undefined
        ? (dataForm.imagen = "uploads/imageBarbers/profile.png")
        : dataForm.imagen,
    is_active: !(false || dataForm.is_active === 0),
    is_admin: !(false || dataForm.is_admin === 0)
  }

  const registerBarber = async (data: any) => {
    console.log(data)
    setIsLoading(true)
    const formData = new FormData()
    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    formData.append("email", data.email)
    formData.append("telefono", data.telefono)
    formData.append("is_active", data.is_active)
    formData.append("is_admin", data.is_admin)
    if (profileImage) {
      formData.append("imageProfile", profileImage)
    }
    let rtaUpdateUser
    if (optionSelected === "Editar") {
      try {
        rtaUpdateUser = await dispatch(updateBarber(formData, dataForm.id) as any)
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
      let rtaAddBarber
      try {
        console.log(formData)
        rtaAddBarber = await dispatch(addBarber(formData) as any)
        if (rtaAddBarber.rta === 1) {
          NotifyHelper.notifySuccess(rtaAddBarber.message)
          setOpenModal(false)
          setIsLoading(false)
        } else {
          NotifyHelper.notifyError(`Ocurrio un error, intente nuvamente.` + rtaAddBarber.message)
          setIsLoading(false)
        }
      } catch (err) {
        NotifyHelper.notifyError(`Ocurrio un error, intente nuvamentee.` + err)
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

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0])
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" >
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
                <Grid item md={4} xs={12}>
                  <Paper style={{ width: "auto", height: "200px", border: "1px solid #ddd" }}
                  >
                    <label htmlFor="file" style={{ cursor: "pointer", display: "flex", height: "100%" }}>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          id="file"
                          onChange={loadFile}
                          style={{ display: "none" }}
                        />


                        {optionSelected === "Editar" ? (
                          <img
                            src={urlBase + dataForm.imagen}
                            id="output"
                            width="200"
                          />
                        ) : (
                          <img
                            src={profileImage ? URL.createObjectURL(profileImage) : urlBase + "uploads/profile.png"}
                            id="output"
                            width="200"
                            style={{ padding: "1px" }}
                            alt="Vista previa"
                          />
                        )}
                      </Box>
                    </label>
                    {/* <Box
                      display="flex"
                      justifyContent="flex-end"
                      padding="10px 20px"
                    >
                      <label htmlFor="file" style={{ cursor: "pointer" }}>
                        <CameraAltIcon />
                      </label>
                    </Box> */}
                  </Paper>
                </Grid>
                <Grid item md={8} xs={12}>
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

export default FormBarber

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
import { addUser, updateUser } from "redux/actions/usersAction"
import { NotifyHelper } from "contants"
import LoadingButton from "@mui/lab/LoadingButton"

const theme = createTheme()

interface FormUserProps {
  dataForm: any
  optionSelected: string
  setOpenModal: (send: boolean) => void
}

const urlBase = process.env.REACT_APP_URL_BASE

const FormUser = (props: FormUserProps) => {
  const [isAdminChecked, setIsAdminChecked] = React.useState(false)
  const [profileImage, setProfileImage] = React.useState<File | null>(null)

  const [isLoading, setIsLoading] = React.useState(false)
  const dispatch = useDispatch()

  const { dataForm, optionSelected, setOpenModal } = props
  console.log("dataForm", dataForm)
  const initialValues = {
    firstName: dataForm.firstName || "",
    lastName: dataForm.lastName || "",
    telefono: dataForm.telefono || "",
    email: dataForm.email || "",
    is_admin: !(false || dataForm.is_admin === 0),
    imageProfile:
      dataForm.url_image ? dataForm.url_image : "uploads/profile.png"
  }

  const registerUser = async (data: any) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    formData.append("email", data.email)
    formData.append("is_admin", data.is_admin)
    if (profileImage) {
      console.log("imnagen", profileImage)
      formData.append("imageProfile", profileImage); // Enviamos la nueva imagen
    } else {
      console.log("data.imageProfile", data.imageProfile)
      formData.append("imageProfile", data.imageProfile); // Enviamos la imagen existente
    } let rtaUpdateUser
    if (optionSelected === "Editar") {
      try {
        rtaUpdateUser = await dispatch(updateUser(formData, dataForm.id) as any)
        if (rtaUpdateUser.rta === 1) {
          NotifyHelper.notifySuccess(rtaUpdateUser.message)
          setOpenModal(false)
          setIsLoading(false)
        } else {
          NotifyHelper.notifyError(rtaUpdateUser.message)
          setIsLoading(false)
        }
      } catch (err) {
        NotifyHelper.notifyError(`Ocurrio un error, intente nuevamente.`)
        setIsLoading(false)
      }
    } else {
      let rtaAddUser
      formData.append("password", data.password)
      formData.append("id_barbero", "0")
      try {
        rtaAddUser = await dispatch(addUser(formData) as any)
        if (rtaAddUser.rta === 1) {
          NotifyHelper.notifySuccess(rtaAddUser.message)
          setOpenModal(false)
        } if (rtaAddUser.rta === -2) {
          NotifyHelper.notifyWarning(rtaAddUser.message)
        } else if (rtaAddUser.rta === -1) {
          NotifyHelper.notifyError(rtaAddUser.message)
        }
        setIsLoading(false)
      } catch (err) {
        NotifyHelper.notifyError(`Ocurrio un error, intente nuevamente.`)
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
      onSubmit: registerUser
    })

  const isAdminClick = () => {
    values.is_admin = !values.is_admin
    setIsAdminChecked(!isAdminChecked)
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
      console.log("event.target.files[0]", event.target.files[0])
      setProfileImage(event.target.files[0])
    }
  }

  const imageUrl = profileImage ? URL.createObjectURL(profileImage) : '';

  React.useEffect(() => {
    return () => {
      if (profileImage) URL.revokeObjectURL(imageUrl); // Liberar el ObjectURL
    };
  }, [profileImage]);


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
            {optionSelected === "Editar" ? "Datos Usuario" : "Nuevo Usuario"}
          </Typography>

          <Box
            component="form"
            encType="multipart/form-data"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <motion.div>
              <Grid container spacing={2} alignItems="stretch">
                <Grid item md={4} xs={12} style={{ display: 'flex' }}>
                  <Paper elevation={5} style={{ padding: "20px", textAlign: "center", width: "100%" }}
                  >
                    <label htmlFor="file" style={{ cursor: "pointer", display: "flex", height: "100%" }}>
                      <Box
                        width="100%"
                        height="100%"
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
                        {profileImage ? (
                          <img
                            src={imageUrl}
                            id="output"
                            style={{
                              padding: "1px",
                              width: "100%",
                              height: "auto",
                              maxWidth: "250px",
                              maxHeight: "250px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "1px solid #ddd",
                              aspectRatio: "1/1",
                            }}
                            alt="Vista previa"
                          />
                        ) : (
                          /* Si no hay nueva imagen seleccionada, mostrar la imagen del usuario o la predeterminada */
                          <img
                            src={optionSelected === "Editar" ? urlBase + dataForm.url_image : urlBase + "uploads/profile.png"}
                            id="output"
                            style={{
                              padding: "1px",
                              width: "100%",
                              height: "auto",
                              maxWidth: "250px",
                              maxHeight: "250px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "1px solid #ddd",
                              aspectRatio: "1/1",
                            }}
                            alt="Imagen del usuario"
                          />
                        )}
                        <p style={{ marginTop: "10px" }}>
                          Allowed *.jpeg, *.jpg, *.png, *.gif <br />
                          Max size of 3MB
                        </p>
                      </Box>
                    </label>
                  </Paper>
                </Grid>
                <Grid item md={8} xs={12} style={{ display: 'flex' }}>
                  <Paper elevation={5} style={{ padding: "20px", textAlign: "center" }}>
                    <Grid container spacing={1} height="100%">
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
                          label="Teléfono"
                          name="telefono"
                          type="telefono"
                          onChange={handleChange}
                          value={values.telefono}
                          error={Boolean(errors.telefono)}

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
                      <Grid item xs={12} m={0}>
                        <Card
                          style={{
                            backgroundColor: values.is_admin ? "#bbe1fa" : "",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            paddingRight: "17px",
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
                                style={{ marginLeft: "auto" }}
                              />
                            }
                            label="Es administrador"
                            labelPlacement="start"
                            style={{ flexGrow: 1, marginBottom: 5, marginTop: 5 }}
                          />
                        </Card>
                      </Grid>
                    </Grid>
                  </Paper>
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
    </ThemeProvider >
  )
}

export default FormUser

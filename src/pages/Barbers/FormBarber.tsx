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
import { Alert, Card, CardContent, Checkbox, FormControlLabel, Paper } from "@mui/material"
import { useDispatch } from "react-redux"
import { createFormData, NotifyHelper, Option, SingleValue } from "contants"
import LoadingButton from "@mui/lab/LoadingButton"
import { addBarber, updateBarber } from "redux/actions/barbersAction"
import Select from "react-select"
import { updateStateUser } from "redux/actions/usersAction"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ButtonDelete from "components/ButtonDelete"
import { HelperContants } from "utils/HelperContants"

const theme = createTheme()

interface FormBarberProps {
  dataForm: any
  optionSelected: string
  setOpenModal: (send: boolean) => void
  users: any[]
}

const urlBase = process.env.REACT_APP_URL_BASE

const FormBarber = (props: FormBarberProps) => {
  const [isActiveChecked, setIsActiveChecked] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [profileImage, setProfileImage] = React.useState<File | null>(null)
  const { dataForm, optionSelected, setOpenModal, users } = props
  const [selectedOptionUser, setSelectedOptionUser] = React.useState(dataForm.id_user || 0)
  const dispatch = useDispatch()

  const usersAvailable = users?.filter((user: any) => user.is_barber === 0)


  const initialValues = {
    firstName: dataForm.firstName || "",
    lastName: dataForm.lastName || "",
    email: dataForm.email || "",
    telefono: dataForm.telefono || "",
    imageProfile:
      dataForm.imagen ? dataForm.imagen : "uploads/imageBarbers/profile.png",
    is_active: !(false || dataForm.is_active === 0),
    id_user: selectedOptionUser,
  }

  const registerBarber = async (data: any) => {
    setIsLoading(true);
    const isBarber: any = selectedOptionUser !== 0 ? 1 : 0
    try {
      const formData = createFormData(data, profileImage, selectedOptionUser, isBarber);
      let rta;
      if (optionSelected === "Editar") {
        rta = await dispatch(updateBarber(formData, dataForm.id) as any);
      } else {
        rta = await dispatch(addBarber(formData) as any);
      }
      console.log("rta", rta)
      if (rta.rta === 1) {
        if (selectedOptionUser !== 0) {
          const dataUpdateState = {
            isBarber
          }
          console.log("selectedOptionUser", selectedOptionUser)
          console.log("dataUpdateState", dataUpdateState)
          const stateIsBarber = await dispatch(updateStateUser(selectedOptionUser, dataUpdateState) as any)
          console.log("stateIsBarber", stateIsBarber)
        }
        NotifyHelper.notifySuccess(rta.message);
        setOpenModal(false);
      } else {
        NotifyHelper.notifyError(`Ocurrió un error: ${rta.message}`);
      }
    } catch (err: any) {
      NotifyHelper.notifyError(`Ocurrió un error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };



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

  const handleChangeSelectUser = (e: any) => {
    const dataUser = JSON.parse(e.value)
    console.log(dataUser.id)
    values.id_user = dataUser.id
    setSelectedOptionUser(dataUser.id)
  }

  const existUser: any = users?.find((user: any) => user.id === dataForm?.id_user)

  const deleteUserFromBarber = async () => {
    try {
      console.log("selectedOptionUser", selectedOptionUser)
      const { rtaDelete } = await HelperContants.SwalDeleteUserAsosiate(existUser)
      const isBarber: any = selectedOptionUser !== 0 ? 1 : 0

      console.log("dataForm", dataForm)

      if (rtaDelete) {
        dataForm.is_active = !(false || dataForm.is_active === 0)
        const formData = createFormData(dataForm, profileImage, 0, isBarber);
        const rta = await dispatch(updateBarber(formData, dataForm.id) as any);
        const stateIsBarber = await dispatch(updateStateUser(selectedOptionUser, 0) as any)
        if (rta.rta === 1) {
          console.log("stateIsBarber", stateIsBarber)
          NotifyHelper.notifySuccess(rta.message);
        }
        setOpenModal(false);
      }
    } catch (err) {
      console.log(err)
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
              <Grid container spacing={2} className="container_barber">
                <Grid item md={4} width="100%">
                  <Paper style={{ width: "auto", height: "200px", border: "1px solid #ddd" }}>
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
                            src={profileImage ? URL.createObjectURL(profileImage) : urlBase + dataForm.imagen}
                            id="edit-output"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                            alt="Imagen de perfil"
                          />
                        ) : (
                          <img
                            src={profileImage ? URL.createObjectURL(profileImage) : urlBase + "uploads/profile.png"}
                            id="preview-output"
                            style={{ maxWidth: "100%", maxHeight: "100%", padding: "1px" }}
                            alt="Vista previa"
                          />
                        )}
                      </Box>
                    </label>
                  </Paper>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        label="Teléfono"
                        name="telefono"
                        type="telefono"
                        onChange={handleChange}
                        value={values.telefono}
                      />
                    </Grid>
                    <Grid item xs={12} m={0}>
                      <Card
                        variant="outlined"
                        style={{
                          backgroundColor: values.is_active ? "#376c3e" : "rgb(255 128 128)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "7px",
                          color: values.is_active ? "#fff" : "",
                        }}
                        className=""
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
                              style={{ marginLeft: "auto", color: "#fff" }}
                            />
                          }
                          label={values.is_active ? "Barbero activo" : "Barbero inactivo"}
                          labelPlacement="start"
                          style={{ flexGrow: 1, marginBottom: 0, marginRight: 6 }}
                        />
                      </Card>
                    </Grid>

                  </Grid>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Card style={{ position: 'relative', overflow: 'visible' }}>
                    {existUser ? (
                      <CardContent>
                        <small style={{ marginBottom: "-4px", color: "rgb(158 158 158)" }}>Usuario asociado</small>
                        <Alert
                          sx={{ padding: 1, alignItems: "center" }}
                          icon={<AccountCircleIcon fontSize="inherit" />}
                          severity="info"
                          action={
                            <ButtonDelete onClick={deleteUserFromBarber} />
                          }
                        >
                          <span>{existUser?.firstName} {existUser?.lastName}</span>
                        </Alert>
                      </CardContent>
                    ) : (
                      <CardContent>
                        <Box display="flex" justifyContent="space-between">
                          <small style={{ marginLeft: "15px", marginBottom: "5px", color: "rgb(158 158 158)" }}>Usuario asociado</small>
                        </Box>

                        <Select
                          className="basic-multi-select"
                          classNamePrefix="select"
                          options={usersAvailable?.map((user: any) => ({
                            label: user.firstName + " " + user.lastName,
                            value: JSON.stringify({
                              id: user.id,
                            })
                          }))}
                          defaultValue={existUser
                            ? { label: `${existUser.firstName}  ${existUser.lastName}`, value: existUser.id }
                            : null}
                          components={{ Option: Option, SingleValue: SingleValue }}
                          placeholder="Selecciona un usuario"
                          onChange={handleChangeSelectUser}
                        />
                      </CardContent>
                    )}
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

export default FormBarber

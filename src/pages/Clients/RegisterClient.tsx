import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from "@mui/material"
import { ThemeProvider } from "@mui/styles"

const RegisterClient = () => {
  const initialValues = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: ""
  }

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("El email no es válido")
      .required("El email es requerido"),
    telefono: Yup.string().required("El teléfono es requerido"),
    dni: Yup.string().required("El DNI es requerido")
  })

  const onSubmit = (values: any) => {
    console.log(values)
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  const { handleSubmit, handleChange, values, touched, errors } = formik
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
            Nuevo Cliente
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="nombre"
                  name="nombre"
                  label="Nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  error={touched.nombre && Boolean(errors.nombre)}
                  helperText={touched.nombre && errors.nombre}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="apellido"
                  name="apellido"
                  label="Apellido"
                  value={values.apellido}
                  onChange={handleChange}
                  error={touched.apellido && Boolean(errors.apellido)}
                  helperText={touched.apellido && errors.apellido}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="telefono"
                  name="telefono"
                  label="Teléfono"
                  value={values.telefono}
                  onChange={handleChange}
                  error={touched.telefono && Boolean(errors.telefono)}
                  helperText={touched.telefono && errors.telefono}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="DNI"
                  name="dni"
                  value={values.dni}
                  onChange={handleChange}
                  error={touched.dni && Boolean(errors.dni)}
                  helperText={touched.dni && errors.dni}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    className="btnSubmitOption2"
                    sx={{ mb: 5, py: 2, px: 4 }}
                  >
                    Guardar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default RegisterClient

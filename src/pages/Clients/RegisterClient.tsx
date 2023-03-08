import * as React from "react"
import Button from "@mui/material/Button"
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

const theme = createTheme()

export default function RegisterClient() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dni: ""
  }

  const registerClient = (data: any) => {
    console.log(data)
  }

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required("Debes ingresar un nombre"),
      lastName: Yup.string().required("Debes ingresar un apellido"),
      email: Yup.string().required("Debes ingresar un email"),
      phone: Yup.string().required("Debes ingresar una teléfono")
    }),
    onSubmit: registerClient
  })

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
                    onChange={handleChange}
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
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Teléfono"
                    type="text"
                    id="phone"
                    onChange={handleChange}
                    value={values.phone}
                    error={Boolean(errors.phone)}
                    helperText={
                      String(errors.phone) !== "undefined"
                        ? String(errors.phone)
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="dni"
                    label="DNI"
                    type="dni"
                    id="dni"
                    onChange={handleChange}
                    value={values.dni}
                  />
                </Grid>
              </Grid>
            </motion.div>
            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                className="btnSubmitOption2"
                sx={{ mt: 5, mb: 5, py: 2, px: 4 }}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

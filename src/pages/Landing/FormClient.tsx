import { Alert, Box, Button, CircularProgress, Grid, TextField } from "@mui/material"
import { ErrorMessage, Field } from "formik"

interface propsForm {
  setClientId?: (id: string | null) => void,
  isSubmitting?: boolean
  isClient?: boolean
  loadingForm: boolean,
  errorSaveTurn: string | null
}

const FormClient = ({ isSubmitting, isClient, loadingForm, errorSaveTurn }: propsForm) => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Box mb={2}>
            <Field
              as={TextField}
              name="firstName"
              label="Nombre"
              variant="outlined"
              fullWidth
              disabled={isClient}
            />
            <ErrorMessage name="firstName" component="div">{msg => <span style={{ color: "red", fontSize: "12px" }}>{msg}</span>}</ErrorMessage>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mb={2}>
            <Field
              as={TextField}
              name="lastName"
              label="Apellido"
              variant="outlined"
              fullWidth
              disabled={isClient}
            />
            <ErrorMessage name="lastName" component="div">{msg => <span style={{ color: "red", fontSize: "12px" }}>{msg}</span>}</ErrorMessage>
          </Box>
        </Grid>
      </Grid>
      <Box mb={2}>
        <Field
          as={TextField}
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          disabled={isClient}
        />
        <ErrorMessage name="email" component="div" >{msg => <span style={{ color: "red", fontSize: "12px" }}>{msg}</span>}</ErrorMessage>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Box mb={2}>
            <Field
              as={TextField}
              name="phone"
              label="Teléfono"
              variant="outlined"
              fullWidth
              disabled={isClient}
            />
            <ErrorMessage name="phone" component="div" >{msg => <span style={{ color: "red", fontSize: "12px" }}>{msg}</span>}</ErrorMessage>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mb={2}>
            <Field
              as={TextField}
              name="dni"
              label="Dni"
              variant="outlined"
              fullWidth
              disabled={isClient}
            />
            <ErrorMessage name="dni" component="div" >{msg => <span style={{ color: "red", fontSize: "12px" }}>{msg}</span>}</ErrorMessage>
          </Box>
        </Grid>
      </Grid>

      {isClient ? (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loadingForm}
          // onClick={registerEvent}
          startIcon={loadingForm ? <CircularProgress size={24} color="inherit" /> : undefined}
        >
          {loadingForm ? 'Guardando...' : 'Guardar turno'}
        </Button>
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loadingForm}
          // onClick={searchAndRegisterEvent}
          startIcon={loadingForm ? <CircularProgress size={24} color="inherit" /> : undefined}
        >
          {loadingForm ? 'Guardando...' : 'Guardar turnoo'}
        </Button>
      )}
      {errorSaveTurn !== null &&
        <Alert sx={{ mt: 2 }} severity="warning">{errorSaveTurn}</Alert >
      }
    </>
  )
}

export default FormClient
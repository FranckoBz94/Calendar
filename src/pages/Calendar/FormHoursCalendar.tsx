import React, { useState } from "react"
import { ThemeProvider } from "@mui/styles"
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Typography
} from "@mui/material"
import { useFormik } from "formik"
import { LoadingButton } from "@mui/lab"
import { useDispatch } from "react-redux"
import { availableEndHours, availableStartHours, NotifyHelper } from "contants"
import { useStyles } from "./styles"
import { updateHours } from "redux/actions/hoursAction"

interface FormHoursProps {
  openingTime: string
  closingTime: string
  idHoursCalendar: number
  setOpenModalHours: (send: boolean) => void
  updateCalendarData: (openingTime: string, closingTime: string) => void
}

const FormHoursCalendar = (props: FormHoursProps) => {
  const {
    openingTime,
    closingTime,
    idHoursCalendar,
    setOpenModalHours,
    updateCalendarData
  } = props
  const [closeHours, setCloseHours] = useState(availableEndHours)

  const theme = createTheme()
  const dispatch = useDispatch()

  const initialValues = {
    openingTime,
    closingTime
  }

  const classes = useStyles()

  const registerEvent = async (data: any) => {
    const dataUpdate = {
      min_hour_calendar: data.openingTime,
      max_hour_calendar: data.closingTime
    }
    let rtaAddTurn
    try {
      rtaAddTurn = await dispatch(
        updateHours(dataUpdate, idHoursCalendar) as any
      )
      if (rtaAddTurn.rta === 1) {
        updateCalendarData(openingTime, closingTime)
        setOpenModalHours(false)
        NotifyHelper.notifySuccess(rtaAddTurn.message)
      } else {
        NotifyHelper.notifyError(rtaAddTurn.message)
      }
    } catch (err) {
      NotifyHelper.notifyError(`Ocurrió un error, inténtelo nuevamente.`)
    }
  }

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: registerEvent
  })

  const { handleSubmit, setFieldValue, values } = formik

  const handleOpeningTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    values.openingTime = e.target.value
    setFieldValue("openingTime", e.target.value)
    const newHoursClosing = availableStartHours.filter(
      (hour: any) => hour > e.target.value
    )
    setCloseHours(newHoursClosing)
  }

  const handleClosingTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)

    setFieldValue("closingTime", e.target.value)
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
          <Box mb={4} borderBottom={1} width={"100%"} justifyContent="center" display="flex">
            <Typography component="h1" variant="h5"  >
              Establecer horario de reservas
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6} >
                <Box borderRight={1}>
                  <Typography component="h2" variant="h6" sx={{
                    display: { xs: "flex" },
                    justifyContent: { xs: "center" },
                    mb: 1,
                  }}>
                    Hora de Apertura
                  </Typography>
                  <Grid container spacing={0}>
                    {availableStartHours.map((hour: string) => (
                      <Grid item xs={12} sm={6} md={4} key={hour} sx={{
                        display: { xs: "flex" },
                        justifyContent: { xs: "center" },
                      }}>
                        <label
                          key={hour}
                          className={
                            values.openingTime === hour
                              ? classes.inputChecked
                              : classes.customRadioLabel
                          }
                        >
                          <input
                            type="radio"
                            value={hour}
                            hidden
                            checked={values.openingTime === hour}
                            onChange={handleOpeningTimeChange}
                          />
                          {hour}
                        </label>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: 0 }}>
                <Box>
                  <Typography component="h2" variant="h6" sx={{
                    display: { xs: "flex" },
                    justifyContent: { xs: "center" },
                    mb: 1,
                  }}>
                    Hora de Cierre
                  </Typography>
                  <Grid container spacing={0}>
                    {closeHours.map((hour: string) => (
                      <Grid item xs={12} sm={6} md={4} key={hour} sx={{
                        display: { xs: "flex" },
                        justifyContent: { xs: "center" },
                      }}>
                        <label
                          key={hour}
                          className={
                            values.closingTime === hour
                              ? classes.inputChecked
                              : classes.customRadioLabel
                          }
                        >
                          <input
                            type="radio"
                            value={hour}
                            hidden
                            checked={values.closingTime === hour}
                            onChange={handleClosingTimeChange}
                          />
                          {hour}
                        </label>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <LoadingButton
                    size="small"
                    type="submit"
                    className="btnSubmitOption2"
                    variant="contained"
                    sx={{ mt: 5, mb: 5, py: 2, px: 4 }}
                  >
                    <span>Guardar</span>
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

export default FormHoursCalendar

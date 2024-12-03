import MotionComponent from "components/MotionComponent"
import Loader from "components/Loader"
import { useStyles } from "./styles"
import "react-toastify/dist/ReactToastify.css"
import { Box, Card, FormHelperText, Grid, Typography } from "@mui/material"
import { useFormik } from "formik"
import { LoadingButton } from "@mui/lab"
import "react-datepicker/dist/react-datepicker.css"
import { useEffect, useState } from "react"
import store from "redux/store"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { getAllBarbers } from "redux/actions/barbersAction"
import { getAllHours } from "redux/actions/hoursAction"
import { searchTurnsProfits } from "redux/actions/turnsAction"
import "react-data-table-component-extensions/dist/index.css"
import { formatter, getMuiTheme, Label, Option, optionsTable, SingleValue } from "contants"
import moment from "moment"
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from '@mui/material/styles'
import MainComponent from "pages/AppBar/MainComponent"
import { DemoItem } from "@mui/x-date-pickers/internals/demo"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const formProfits = () => {
  const [selectedOptionBarber, setSelectedOptionBarber] = useState({
    value: null,
    label: ""
  })
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().startOf('year'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [dataProfit, setDataProfit] = useState([])
  const [amountSearch, setAmountSearch] = useState("0")
  const [nameBarber, setNameBarber] = useState("")
  const [isSearch, setIsSearch] = useState(false)
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const barbers = useSelector((state: RootState) => storeComplete.barbers)
  const classes: any = useStyles()
  const dispatch = useDispatch()

  const initialValues = {
    idBarber: null
  }

  const formatDateTime = (date: Dayjs | null): string | null => {
    return date ? date.format('YYYY-MM-DD') : null;
  };

  const formatDateTimeView = (date: Dayjs | null): string | null => {
    return date ? date.format('DD/MM/YYYY') : null;
  };

  const searchProfits = async (values: any) => {
    setIsLoading(true);
    const newErrors: { [key: string]: string } = {};
    if (selectedOptionBarber.value === null) newErrors.barber = 'Debes seleccionar un barbero.'
    if (!startDate) newErrors.dateFrom = 'La fecha de inicio es requerida.';
    if (!endDate) newErrors.dateTo = 'La fecha de fin es requerida.';
    if (startDate && endDate && endDate.isBefore(startDate, 'day')) {
      newErrors.dateTo = 'La fecha de fin no puede ser anterior a la fecha de inicio.';
    }
    setIsLoading(false);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setNameBarber(selectedOptionBarber?.label)
      setIsSearch(true)
      values.idBarber = selectedOptionBarber?.value
      try {
        const formattedStartDate = formatDateTime(startDate);
        const formattedEndDate = formatDateTime(endDate);
        const dataSearch = {
          idBarber: selectedOptionBarber?.value,
          formattedStartDate,
          formattedEndDate,
        }
        const { dataProfit } = await dispatch(searchTurnsProfits(dataSearch) as any)

        const pricesWithoutCurrency = dataProfit.map((turn: any) => {
          return Number(turn.price_service.replace(/[^\d.-]/g, ''));
        });

        const totalPrices = pricesWithoutCurrency.reduce((accumulator: number, currentPrice: number) => {
          return accumulator + currentPrice;
        }, 0);
        setAmountSearch(formatter.format(parseInt(totalPrices)))
        setDataProfit(dataProfit)
      } catch (err) {
        console.error(err)
      }
    }
    setIsLoading(false);
  }

  const handleChangeSelectBarber = (e: any) => {
    setSelectedOptionBarber(e)
  }

  const { handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: searchProfits
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllBarbers() as any);
        await dispatch(getAllHours() as any);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const columns = [
    {
      name: "fecha_reserva",
      label: "Fecha turno",
      options: {
        customBodyRender: (value: string) => moment(value).format("DD/MM/YYYY"), // Formatea la fecha usando moment.js
      },
    },
    {
      name: "nameBarber",
      label: "Barbero",
    },
    {
      name: "firstName",
      label: "Cliente",
    },
    {
      name: "name_service",
      label: "Servicio",
    },
    {
      name: "price_service",
      label: "Costo",
    }
  ];

  const modifiedData = dataProfit?.map((row: any) => ({
    ...row,
    nameBarber: `${row.nameBarber} ${row.lastNameBarber}`,
    firstName: `${row.firstName} ${row.lastName}`
  }));

  return (
    <MainComponent>
      <>
        {isLoading && <Loader />}
        <MotionComponent>
          <Box>
            <Card variant="outlined" className={classes.colorCard}>
              <Box px={2}>
                <p className={classes.card_title}>Periodo de Vacaciones / Inactivo</p>
              </Box>
            </Card>
            <Box my={3}>
              <Card>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3, px: 5 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12} mb={5}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} my={2}>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Typography textAlign="center" variant="h5">Registro de ganancias</Typography>
                            </Box>
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <Box position="relative">
                              <DemoItem label={<Label componentName="Barbero" />}>
                                <Select
                                  isSearchable={true}
                                  // className="basic-multi-select"
                                  className={`basic-multi-select ${errors?.barber ? "error" : ""}`}
                                  classNamePrefix="select"
                                  options={barbers?.map((barber: any) => ({
                                    label: barber.firstName + " " + barber.lastName,
                                    value: barber.id
                                  }))}
                                  placeholder="Barbero"
                                  menuPlacement="auto"
                                  menuPortalTarget={document.body}
                                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                  onChange={handleChangeSelectBarber}
                                  components={{ Option: Option, SingleValue: SingleValue }}
                                />
                                {errors.barber && <FormHelperText error>{errors.barber}</FormHelperText>}
                              </DemoItem>
                            </Box>
                          </Grid>
                          <Grid item md={4} xs={12} >
                            <DemoItem label={<Label componentName="Desde" />}>
                              <DatePicker
                                disableFuture
                                value={startDate}
                                onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
                                format="DD/MM/YYYY"
                                className={classes.w_100}
                              />
                              {errors.startDate && <FormHelperText error>{errors.startDate}</FormHelperText>}
                            </DemoItem>
                          </Grid>
                          <Grid item md={4} xs={12} >
                            <DemoItem label={<Label componentName="Hasta" />}>
                              <DatePicker
                                disableFuture
                                value={endDate}
                                minDate={startDate ?? undefined}
                                onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
                                format="DD/MM/YYYY"
                              />
                              {errors.endDate && <FormHelperText error>{errors.endDate}</FormHelperText>}
                            </DemoItem>
                          </Grid>
                          <Grid item xs={12} my={3}>
                            <Box display="flex" justifyContent="center">
                              <LoadingButton
                                size="small"
                                type="submit"
                                className="btnSubmitOption2 w-50"
                                variant="contained"
                                sx={{ py: 2, px: 4 }}
                              >
                                <span>Buscar</span>
                              </LoadingButton>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Card>
                      <Grid >
                        <Box>
                          {isSearch && (
                            <ThemeProvider theme={getMuiTheme("#0f4c75")}>
                              <MUIDataTable
                                title={nameBarber ? <Typography variant="h6" component="div" >
                                  Ganancias de <span style={{ fontFamily: 'Arial', fontWeight: 'bold', margin: 0 }}>{nameBarber}</span>
                                </Typography> : ""}
                                data={modifiedData}
                                columns={columns}
                                options={optionsTable}
                              />
                            </ThemeProvider>
                          )}
                        </Box>
                      </Grid>
                    </Card>
                    {isSearch && (
                      <Box my={3}>
                        <Card variant="outlined">
                          <Grid p={2}>
                            <Box sx={{ display: { xs: 'block', md: 'flex' }, justifyContent: "space-between" }}>
                              <Box display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography variant="body1" style={{ marginRight: 10 }}>
                                  Total de turnos:
                                </Typography>
                                <Typography fontWeight="bold" style={{ marginRight: 10 }} >
                                  {modifiedData.length}
                                </Typography>
                              </Box>
                              <Box display="flex" alignItems="center">
                                <Typography variant="body1" style={{ marginRight: 10 }}>
                                  Total desde {formatDateTimeView(startDate)} al {formatDateTimeView(endDate)}:
                                </Typography>
                                <Typography variant="h5" component="span" >
                                  {`${amountSearch}`}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Card>
                      </Box>
                    )}
                  </Box>
                </LocalizationProvider>
              </Card>
            </Box>
          </Box>
        </MotionComponent>
      </>
    </MainComponent >
  )
}

export default formProfits

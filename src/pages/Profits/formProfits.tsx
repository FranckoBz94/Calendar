import { AppBarComponent } from "pages/AppBar/AppBar"
import MotionComponent from "components/MotionComponent"
import Loader from "components/Loader"
import { useStyles } from "./styles"
import "react-toastify/dist/ReactToastify.css"
import { Box, Card, Grid, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { LoadingButton } from "@mui/lab"
import "react-datepicker/dist/react-datepicker.css"
import { useEffect, useState } from "react"
import store from "redux/store"
import { useDispatch, useSelector } from "react-redux"
import Select, { components } from "react-select"
import { getAllBarbers } from "redux/actions/barbersAction"
import { getAllHours } from "redux/actions/hoursAction"
import { searchTurnsProfits } from "redux/actions/turnsAction"
import "react-data-table-component-extensions/dist/index.css"
import { formatter, getMuiTheme, optionsTable } from "contants"
import moment from "moment"
import * as Yup from "yup"
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from '@mui/material/styles'

const formProfits = () => {
  const [selectedOptionBarber, setSelectedOptionBarber] = useState({
    value: null,
    label: ""
  })
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataProfit, setDataProfit] = useState([])
  const [amountSearch, setAmountSearch] = useState("0")
  const [nameBarber, setNameBarber] = useState("")
  const [isSearch, setIsSearch] = useState(false)
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const { barbers } = useSelector((state: RootState) => storeComplete.barbers)
  const classes: any = useStyles()
  const dispatch = useDispatch()

  const initialValues = {
    idBarber: null,
    start_date: moment(new Date()).format("YYYY-MM-DD"),
    end_date: moment(new Date()).format("YYYY-MM-DD")
  }

  const searchProfits = async (values: any) => {
    setIsLoading(true);
    if (!selectedOptionBarber.value) {
      setError('Debes seleccionar un barbero.');
      setIsLoading(false); // Detiene la carga si hay un error
      return;
    }
    setNameBarber(selectedOptionBarber?.label)
    values.idBarber = selectedOptionBarber?.value
    try {
      const dataSearch = {
        idBarber: selectedOptionBarber?.value,
        start_date: moment(values.start_date).format("YYYY-MM-DD 06:00:00"),
        end_date: moment(values.end_date).format("YYYY-MM-DD 23:00:00"),
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
    setError('');
    setTimeout(() => {
      setIsSearch(true)
      setIsLoading(false);
    }, 3000);
  }

  const handleChangeSelectBarber = (e: any) => {
    setSelectedOptionBarber(e)
    setError('');
  };

  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <div dangerouslySetInnerHTML={{ __html: props.label }} />
      </components.Option>
    );
  }

  const SingleValue = (props: any) => (
    <components.SingleValue {...props}>
      <div dangerouslySetInnerHTML={{ __html: props.data.label }} />
    </components.SingleValue>
  );



  const { handleSubmit, values, errors, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        start_date: Yup.string().required("Debes ingresar un nombre"),
        end_date: Yup.string().required("Debes ingresar un apellido"),
      }),
      onSubmit: searchProfits
    })

  const handleInputChange = (field: any, value: any) => {
    setFieldValue(field, value)
  }

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

  const modifiedData = dataProfit.map((row: any) => ({
    ...row,
    nameBarber: `${row.nameBarber} ${row.lastNameBarber}`,
    firstName: `${row.firstName} ${row.lastName}`
  }));


  return (
    <AppBarComponent>
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
                            <Select
                              isSearchable={true}
                              className={`basic-multi-select ${error ? "error" : ""}`}
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
                            {error && <small style={{ color: 'red' }}>{error}</small>}
                          </Box>
                        </Grid>
                        <Grid item md={4} xs={12} className="d-flex justify-content-center">
                          <TextField
                            name="start_date"
                            value={values.start_date || ""}
                            type="date"
                            label="Desde"
                            variant="outlined"
                            onChange={(e) =>
                              handleInputChange("start_date", e.target.value)
                            }
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={Boolean(errors.start_date)}
                          />
                        </Grid>
                        <Grid item md={4} xs={12} className="d-flex justify-content-center">
                          <TextField
                            name="end_date"
                            type="date"
                            label="Hasta"
                            variant="outlined"
                            value={values.end_date || ""}
                            fullWidth
                            onChange={(e) =>
                              handleInputChange("end_date", e.target.value)
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={Boolean(errors.end_date)}
                          />

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
                              title={nameBarber ? `Ganancias de ${nameBarber}` : ""}
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
                          <Box display="flex" justifyContent="flex-end" alignItems="center">
                            <Typography variant="body1" style={{ marginRight: 10 }}>
                              Total desde {moment(values.start_date).format("DD/MM/YYYY")} al {moment(values.end_date).format("DD/MM/YYYY")}:
                            </Typography>
                            <Typography variant="h5" component="span" >
                              {`${amountSearch}`}
                            </Typography>
                          </Box>
                        </Grid>
                      </Card>
                    </Box>
                  )}
                </Box>
              </Card>
            </Box>
          </Box>
        </MotionComponent>
      </>
    </AppBarComponent >
  )
}

export default formProfits

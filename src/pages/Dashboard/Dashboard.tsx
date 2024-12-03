import MotionComponent from "components/MotionComponent"
import MainComponent from "pages/AppBar/MainComponent"
import { Card, CardContent, Grid, Typography } from "@mui/material";
import store from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getAllBarbers } from "redux/actions/barbersAction";
import { useUser } from "components/UserProvider";
import { countTurnsGraphics, dataGraphics, getTurnsDayWeek } from "redux/actions/usersAction";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PieChartGraphic from "components/Graphics/PieChartGraphic";
import BarChartReChart from "components/Graphics/BarChartReChart";
import BarChartDayWeek from "components/Graphics/BarChartDayWeek";
import Filter from "components/FilteredBarber/Filter"
import dayjs, { Dayjs } from "dayjs";


const Dashboard = () => {
  const [selectedOptionBarber, setSelectedOptionBarber] = useState(0);
  const [barberDefault, setBarberDefault] = useState({} as any);
  const [chartData, setChartData] = useState([]);
  const [countTurns, setCountTurns] = useState([]);
  const [countTurnsDayWeek, setCountTurnsDayWeek] = useState([]);
  const [dateRange, setDateRange] = useState<{ startDate: Dayjs | null, endDate: Dayjs | null }>({
    startDate: dayjs().startOf('year'),
    endDate: dayjs()
  });


  const dispatch = useDispatch();
  type RootState = ReturnType<typeof store.getState>;
  const storeComplete: any = useSelector((state: RootState) => state);
  const barbers = useSelector((state: RootState) => storeComplete.barbers);
  const { user } = useUser();

  const formatDateTime = (date: Dayjs | null): string | null => {
    return date ? date.format('YYYY-MM-DD') : null;
  };

  const getDataGraphics = useCallback(async (dataBarber: any, startDate: Dayjs | null, endDate: Dayjs | null) => {
    try {
      const formattedStartDate = formatDateTime(startDate);
      const formattedEndDate = formatDateTime(endDate);

      const data = await dispatch(dataGraphics(dataBarber, formattedStartDate, formattedEndDate) as any);
      const transformedData = data.map((item: any) => ({
        id: item.service_id,
        value: item.cantidad_turnos,
        label: `${item.name_service} (${item.cantidad_turnos})`,
      }));
      setChartData(transformedData);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  }, [dispatch]);

  const getDataTurnsGraphics = useCallback(async (idBarber: any, startDate: Dayjs | null, endDate: Dayjs | null) => {
    try {
      const formattedStartDate = formatDateTime(startDate);
      const formattedEndDate = formatDateTime(endDate);
      const data = await dispatch(countTurnsGraphics(idBarber, formattedStartDate, formattedEndDate) as any);
      setCountTurns(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  }, [dispatch]);

  const getTurnsDayWeekGraphics = useCallback(async (idBarber: any, startDate: Dayjs | null, endDate: Dayjs | null) => {
    try {
      const formattedStartDate = formatDateTime(startDate);
      const formattedEndDate = formatDateTime(endDate);
      const data = await dispatch(getTurnsDayWeek(idBarber, formattedStartDate, formattedEndDate) as any);
      setCountTurnsDayWeek(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  }, [dispatch]);

  const handleChangeSelectBarber = useCallback((e: any) => {
    const idBarber = JSON.parse(e.value)
    if (idBarber === 0) {
      setSelectedOptionBarber(0)
    } else {
      setSelectedOptionBarber(JSON.parse(e.value));
    }
  }, []);

  const selectedBarber = useCallback((user: any) => {
    const barberSelected = barbers?.find((barber: any) => barber.id_user === user?.id);
    return barberSelected || null;
  }, [barbers]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllBarbers() as any);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleFiltersChange = async (filters: { startDate: Dayjs | null, endDate: Dayjs | null, selectedIdBarber: any }) => {
    setDateRange({ startDate: filters.startDate, endDate: filters.endDate });
    const idBarber = filters.selectedIdBarber.value
    try {
      await getDataGraphics(idBarber, filters.startDate, filters.endDate);
      await getTurnsDayWeekGraphics(idBarber, filters.startDate, filters.endDate)
      await getDataTurnsGraphics(idBarber, filters.startDate, filters.endDate);
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const barber = selectedBarber(user);

      if (user?.is_admin) {
        setSelectedOptionBarber(0);
        setBarberDefault({ firstName: 'Todos', lastName: 'los barberos', id: 0 });
      } else {
        setSelectedOptionBarber(barber?.id || null);
        setBarberDefault(barber);
      }

      try {
        await getDataGraphics(selectedOptionBarber, dateRange.startDate, dateRange.endDate);
        await getDataTurnsGraphics(selectedOptionBarber, dateRange.startDate, dateRange.endDate);
        await getTurnsDayWeekGraphics(selectedOptionBarber, dateRange.startDate, dateRange.endDate);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user, barbers, selectedBarber, getDataGraphics, getDataTurnsGraphics]);

  return (
    <MainComponent>
      <MotionComponent>
        <>
          <Card>
            <Grid container>
              <Grid item xs={12}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xl={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Filter barbers={barbers} barberDefault={barberDefault} handleChangeSelectBarber={handleChangeSelectBarber} onFiltersChange={handleFiltersChange} />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
          <Grid container sx={{ mt: 2, mb: 3 }} spacing={2}>
            <Grid item xs={12} >
              <Card>
                <CardContent >
                  <Typography variant="h5" gutterBottom>
                    Cantidad de cortes por barbero
                  </Typography>
                  <BarChartReChart chartData={countTurns} startDate={dateRange.startDate ? dateRange.startDate.toDate() : null}
                    endDate={dateRange.endDate ? dateRange.endDate.toDate() : null} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={7}>
              <Card>
                <CardContent >
                  <Typography variant="h5" gutterBottom>
                    Cortes segun los dias
                  </Typography>
                  <BarChartDayWeek chartData={countTurnsDayWeek} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card>
                <CardContent >
                  <PieChartGraphic chartData={chartData} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      </MotionComponent>
    </MainComponent >
  )
}

export default Dashboard
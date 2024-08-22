import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import ListHoursAvailability from "./ListHoursAvailability";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Box, Grid } from '@mui/material';
import { Label, Option, SingleValue } from 'contants';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import store from 'redux/store';
import { getAllServices } from 'redux/actions/servicesAction';
import dayjs from 'dayjs';
import { turnsDayAvailable } from 'redux/actions/turnsAction';

interface dataBarberProps {
  barberId: string | number | null;
  selectedDataService: (data: any) => void;
}

const SelectDateHours = (props: dataBarberProps) => {
  const { barberId, selectedDataService } = props
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [selection, setSelection] = useState(false)
  const [allTimes, setAllTimes] = useState([])
  const dispatch = useDispatch()

  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const { services } = useSelector((state: RootState) => storeComplete.services)
  const selectDay = (newValue: Date | undefined) => {
    setSelection(true)
    setDateFrom(newValue)
  }

  const getTimeSelected = (time: string | null) => {
    setSelectedTime(time);
    selectedDataService({ time_turn: time });
  }

  const fetchTurnsDayAvailable = async (dataSearch: any) => {
    setAllTimes([])
    getTimeSelected(null)
    try {
      const response = await dispatch(turnsDayAvailable(dataSearch) as any);
      const data = response.data;
      const formattedTimes = data.map((slot: any) => {
        return {
          start: dayjs(slot.slot_start).format('HH:mm'),
          end: dayjs(slot.slot_end).format('HH:mm'),
        };
      });
      setAllTimes(formattedTimes);
      console.log(formattedTimes);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const handleChangeSelectService = async (e: any) => {
    const dataTurn = JSON.parse(e.value)
    const formattedDate = dayjs(dateFrom).format('YYYY-MM-DD');
    const data = {
      idBarber: barberId,
      start_date: formattedDate,
      minutes_services: parseInt(dataTurn.minutes_service, 10),
      time_turn: selectedTime
    }
    selectedDataService({ idService: dataTurn.id });
    selectedDataService(data)
    fetchTurnsDayAvailable(data)
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllServices() as any);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <DemoItem label={<Label componentName="Seleccione una fecha" />}>
            <Box className="calendar" display="grid" justifyContent="center" paddingBottom={3}>
              <Calendar
                className="calendar_landing"
                minDate={moment().toDate()}
                onChange={(date: any) => selectDay(date)}
                value={dateFrom || undefined}
              />
            </Box>
          </DemoItem>
        </Grid>
        {selection && (
          <Grid item xs={12} md={6}>
            <DemoItem label={<Label componentName="Seleccione una horario" />}>
              <Box mt={1}>
                <Select
                  isSearchable={true}
                  options={services.map((service: any) => ({
                    label: service.name_service + " <small>(" + service.minutes_service + " minutos)</small>",
                    value: JSON.stringify({
                      id: service.id,
                      minutes_service: service.minutes_service,
                      price: service.price_service
                    })
                  }))}
                  isMulti={false}
                  onChange={handleChangeSelectService}
                  className="basic-single select-modal"
                  classNamePrefix="select"
                  placeholder="Seleccione un servicio"
                  required
                  components={{ Option: Option, SingleValue: SingleValue }}
                  styles={{
                    menu: provided => ({
                      ...provided,
                      height: 'auto',
                      maxHeight: '200px', // Ajusta esta altura según tus necesidades
                      overflowY: 'auto',
                      borderRadius: '5px'
                    }),
                  }}
                />
                <ListHoursAvailability availableTimes={allTimes} selectedTime={selectedTime} onSelectTime={getTimeSelected} />
              </Box>
            </DemoItem>
          </Grid>
        )}
      </Grid>
    </Box >
  )
}

export default SelectDateHours
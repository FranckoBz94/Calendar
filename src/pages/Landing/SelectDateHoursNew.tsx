import React, { useEffect, useState } from 'react';
import { Alert, Box, Grid, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import ListHoursAvailability from "./ListHoursAvailability";
import { Label } from "contants";
import moment from 'moment';
import CalendarSkeleton from './AllSkeleton/CalendarSkeleton';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import store from 'redux/store';
import { getAllDays } from 'redux/actions/hoursAction';
import HourSkeleton from './AllSkeleton/HourSkeleton';

interface SelectServiceStepProps {
  allTimes: any[];
  selectedTime: string | null;
  onSelectTime: (time: string | null) => void;
  dateFrom: string | undefined;
  selectDay: (date: Date | undefined) => void;
  selection: boolean;
  availableTurns: boolean
  datesAvailableTurn: any[],
  loadingDatesCalendar: boolean,
  loadingHoursCalendar: boolean,
  errorGetHours: boolean
}

const SelectDateHoursNew: React.FC<SelectServiceStepProps> = ({
  allTimes,
  selectedTime,
  onSelectTime,
  dateFrom,
  selectDay,
  selection,
  availableTurns,
  datesAvailableTurn,
  loadingDatesCalendar,
  loadingHoursCalendar,
  errorGetHours
}) => {
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const days = useSelector((state: RootState) => storeComplete.days, shallowEqual);
  const dispatch = useDispatch()

  const [hiddenDays, setHiddenDays] = useState<number[]>([]);

  const calendarKey = dateFrom ? moment(dateFrom).format('YYYY-MM-DD') : 'calendar';
  useEffect(() => {
    if (days && days.length > 0) {
      const calculatedHiddenDays = days.reduce((acc: number[], day: any, index: number) => {
        if (!day.is_open) {
          acc.push(day.id); // Usa el índice para los días de la semana
        }
        return acc;
      }, []);
      setHiddenDays(calculatedHiddenDays);
    }
  }, [days]);

  useEffect(() => {
    dispatch(getAllDays() as any)
  }, [])

  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const today = moment().startOf('day').format('YYYY-MM-DD');
    const endDate = moment().add(19, 'days').format('YYYY-MM-DD');
    const dayIndex = date.getDay();
    if (hiddenDays.includes(dayIndex)) {
      return 'unabailable-day';
    }
    if (formattedDate < today || formattedDate > endDate) {
      return '';
    }
    const foundDate = datesAvailableTurn.find(day => day.date === formattedDate);
    if (!foundDate) {
      return 'pending-date';
    }
    return foundDate.availability.length > 0 ? 'available-date' : 'no-available-date';
  };


  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} style={{ display: 'flex' }}>
          <DemoItem sx={{ width: "100%" }} label={<Label componentName="Seleccione una fecha" />}>
            <Box className="calendar" display="grid" paddingBottom={3}>
              {loadingDatesCalendar ? (
                <CalendarSkeleton />
              ) : (
                <Calendar
                  key={calendarKey}
                  className="calendar_landing"
                  minDate={moment().toDate()}
                  onChange={(date: any) => selectDay(date)}
                  value={dateFrom ? new Date(`${dateFrom}T00:00:00`) : undefined}
                  tileClassName={tileClassName}
                />
              )}
              <Box sx={{ display: { md: 'flex', sm: "block" }, justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Box sx={{ backgroundColor: 'rgba(15, 143, 15, 0.5)', color: 'white', width: 15, height: 15 }} />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    Turnos disponibles
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Box sx={{ backgroundColor: '#ffd9d6', color: 'white', width: 15, height: 15 }} />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    Sin turnos disponibles
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Box sx={{ backgroundColor: '#f0f0f0', border: "1px solid #8f8f8f", color: 'white', width: 15, height: 15 }} />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    Días cerrado
                  </Typography>
                </Box>
              </Box>
            </Box>
          </DemoItem>
        </Grid>
        {selection && (
          <Grid item xs={12} md={6}>
            <DemoItem label={<Label componentName={availableTurns ? "Seleccione un horario" : ""} />}>
              {errorGetHours ? (
                <Alert severity="warning">
                  Ocurrio un error al obtener los horarios disponibles
                </Alert>
              ) : (
                <Box >
                  {
                    loadingHoursCalendar ? (
                      <HourSkeleton />
                    ) : availableTurns ? (
                      <ListHoursAvailability
                        availableTimes={allTimes}
                        selectedTime={selectedTime}
                        onSelectTime={onSelectTime}
                      />
                    ) : (
                      <Alert severity="warning" sx={{ mt: 3, border: "1px solid" }}>
                        No hay disponibilidad de este servicio para el {moment(dateFrom).format('DD/MM/YYYY')}.
                      </Alert>
                    )
                  }
                </Box>
              )}
            </DemoItem>
          </Grid>
        )}
      </Grid >
    </Box >
  );
};

export default SelectDateHoursNew;

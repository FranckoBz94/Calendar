import React from 'react';
import { Alert, Box, Grid, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import ListHoursAvailability from "./ListHoursAvailability";
import { Label } from "contants";
import moment from 'moment';
import CalendarSkeleton from './AllSkeleton/CalendarSkeleton';

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
  errorGetHours
}) => {

  const calendarKey = dateFrom ? moment(dateFrom).format('YYYY-MM-DD') : 'calendar';

  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const today = moment().startOf('day').format('YYYY-MM-DD');
    const endDate = moment().add(15, 'days').format('YYYY-MM-DD');
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
              </Box>
            </Box>
          </DemoItem>
        </Grid>
        {selection && (
          <Grid item xs={12} md={6}>
            <DemoItem label={<Label componentName={availableTurns ? "Seleccione una horario" : ""} />}>
              {errorGetHours ? (
                <Alert severity="warning">
                  Ocurrio un error al obtener los horarios disponibles
                </Alert>
              ) : (
                <Box >
                  {availableTurns ? (
                    <ListHoursAvailability availableTimes={allTimes} selectedTime={selectedTime} onSelectTime={onSelectTime} />
                  ) : (
                    <Alert severity="warning" sx={{ mt: 3, border: "1px solid" }}>
                      No hay disponibilidad de este servicio para el {moment(dateFrom).format('DD/MM/YYYY')}.
                    </Alert>)}
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

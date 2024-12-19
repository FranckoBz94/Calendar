import { CardContent, Grid, Box, Typography, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import Select from "react-select"
import dayjs, { Dayjs } from 'dayjs';
import { LoadingButton } from '@mui/lab';
import { Label, Option, SingleValue } from 'contants';



interface Barber {
  id: number;
  firstName: string;
  lastName: string;
}

interface DataProps {
  barbers: Barber[];
  barberDefault: Barber | null;
  handleChangeSelectBarber: (selected: any) => void;
  onFiltersChange: (filters: { startDate: Dayjs | null, endDate: Dayjs | null, selectedIdBarber: any }) => Promise<void>;
}

const Filter: React.FC<DataProps> = ({ barbers, barberDefault, handleChangeSelectBarber, onFiltersChange }) => {
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(dayjs().startOf('year'));
  const [dateTo, setDateTo] = useState<Dayjs | null>(dayjs());
  const [isLoading, setIsLoading] = useState(false)

  const user = React.useMemo(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
  }, []);

  const [selectedBarber, setSelectedBarber] = useState<any>(null);


  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = useCallback(async () => {
    setIsLoading(true)
    const newErrors: { [key: string]: string } = {};
    if (!dateFrom) newErrors.dateFrom = 'La fecha de inicio es requerida.';
    if (!dateTo) newErrors.dateTo = 'La fecha de fin es requerida.';
    if (dateFrom && dateTo && dateTo.isBefore(dateFrom, 'day')) {
      newErrors.dateTo = 'La fecha de fin no puede ser anterior a la fecha de inicio.';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        await onFiltersChange({ startDate: dateFrom, endDate: dateTo, selectedIdBarber: selectedBarber });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [dateFrom, dateTo, selectedBarber, onFiltersChange]);

  const options = useMemo(() => [
    ...(user?.is_admin ? [{ label: 'Todos los barberos', value: 0 }] : []),
    ...(Array.isArray(barbers) ? barbers.map((barber: any) => ({
      label: `${barber.firstName} ${barber.lastName}`,
      value: barber.id,
      data: barber
    })) : [])
  ], [barbers, user]);

  useEffect(() => {
    if (user?.is_admin && selectedBarber === null) {
      setSelectedBarber({ label: 'Todos los barberos', value: 0 });
    } else if (!user?.is_admin && barbers.length > 0 && selectedBarber === null) {
      const firstBarber = barbers[0];
      setSelectedBarber({ label: `${firstBarber.firstName} ${firstBarber.lastName}`, value: firstBarber.id });
    }
  }, [user, barbers, selectedBarber]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Filtrar datos por barberos
            </Typography>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xl={3} md={12} xs={12}>
                <Box position="relative"  >
                  <DemoItem label={<Label componentName="Barbero" />}>
                    <Select
                      isSearchable={true}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      options={options}
                      placeholder="Barbero"
                      menuPlacement="auto"
                      value={selectedBarber}
                      menuPortalTarget={document.body}
                      styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                      onChange={(option) => {
                        setSelectedBarber(option);
                        handleChangeSelectBarber(option);
                      }}
                      components={{ Option: Option, SingleValue: SingleValue }}
                      required
                    />
                    {errors.selectedBarber && <FormHelperText error>{errors.selectedBarber}</FormHelperText>}
                  </DemoItem>
                </Box>
              </Grid>
              <Grid item xl={3} md={6} xs={12}>
                <DemoItem label={<Label componentName="Desde" />}>
                  <DatePicker
                    disableFuture
                    value={dateFrom}
                    onChange={(newValue: Dayjs | null) => setDateFrom(newValue)}
                    format="DD/MM/YYYY"
                  />
                  {errors.dateFrom && <FormHelperText error>{errors.dateFrom}</FormHelperText>}
                </DemoItem>
              </Grid>
              <Grid item xl={3} md={6} xs={12}>
                <DemoItem label={<Label componentName="Hasta" />}>
                  <DatePicker
                    minDate={dateFrom ?? undefined}
                    value={dateTo}
                    onChange={(newValue: Dayjs | null) => { console.log("n", newValue); setDateTo(newValue) }}
                    format="DD/MM/YYYY"
                  />
                  {errors.dateTo && <FormHelperText error>{errors.dateTo}</FormHelperText>}
                </DemoItem>
              </Grid>
              <Grid item xl={3} md={12} xs={12}>
                <Box display="flex" justifyContent="center">
                  <LoadingButton
                    size="small"
                    type="submit"
                    className="btnSubmitOption2"
                    loading={isLoading}
                    disabled={isLoading}
                    onClick={handleSubmit}
                    style={{ width: "100%" }}
                    variant="contained"
                    sx={{ mt: 3, py: 2, px: 4 }}
                  >
                    {isLoading ? 'Buscando...' : 'Buscar'}
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Filter;

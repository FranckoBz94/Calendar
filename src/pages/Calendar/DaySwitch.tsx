import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateDataDays } from 'redux/actions/hoursAction';
import { NotifyHelper } from 'contants';
import { LoadingButton } from '@mui/lab';

interface Day {
  id: number;
  day_of_week: string;
  is_open: number;
}

interface FormHoursProps {
  setOpenModalHours: (send: boolean) => void
  days: Day[];
}

const DaySwitch: React.FC<FormHoursProps> = ({ days, setOpenModalHours }) => {
  const dispatch = useDispatch();

  const [localDays, setLocalDays] = useState<Day[]>(days);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setLocalDays(days);
  }, [days]);

  const handleSwitchChange = (index: number) => {
    setLocalDays(prevDays =>
      prevDays.map((day, i) => (i === index ? { ...day, is_open: day.is_open === 0 ? 1 : 0 } : day))
    );
  };

  const handleSaveChanges = async () => {
    console.log('Días actualizados:', localDays);
    setIsLoading(true)
    try {
      const rtaDays = await dispatch(updateDataDays(localDays) as any);
      console.log("rtaDays", rtaDays);
      if (rtaDays.rta === 1) {
        setOpenModalHours(false)
        NotifyHelper.notifySuccess(rtaDays.message);
      } else {
        NotifyHelper.notifyError(rtaDays.message);
      }
    } catch (err) {
      NotifyHelper.notifyError(`Ocurrió un error, inténtelo nuevamente.`);
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <Container component="main" maxWidth="sm" style={{ marginTop: '20px' }}>
      <List style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h6" gutterBottom align="center" style={{ borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '16px' }}>
          Configuración de Días Abiertos
        </Typography>
        {localDays.map((day, index) => (
          <ListItem key={day.id} style={{ borderBottom: '1px solid #ddd' }}>
            <ListItemText primary={day.day_of_week} style={{ fontWeight: '500', color: '#333' }} />
            <ListItemSecondaryAction>
              <input
                type="checkbox"
                id={`day-switch-${day.id}`}
                checked={day.is_open !== 0}
                onChange={() => handleSwitchChange(index)}
                hidden
              />
              <label htmlFor={`day-switch-${day.id}`} className="toggle">
                <div className={`toggle__switch ${day.is_open === 0 ? 'off' : 'on'}`}>
                  <div className="toggle__circle"></div>
                  <span className="toggle__text">{day.is_open === 0 ? 'Cerrado' : 'Abierto'}</span>
                </div>
              </label>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {/* <SaveButton variant="contained" onClick={handleSaveChanges}>
        Guardar Cambios
      </SaveButton> */}
      <LoadingButton
        size="small"
        type="submit"
        className="btnSubmitOption2"
        variant="contained"
        fullWidth
        sx={{ mt: 5, mb: 5, py: 2, px: 4, w: 100 }}
        onClick={handleSaveChanges}
        loading={isLoading}
        disabled={isLoading}
      >
        <span>{isLoading ? "Guardando" : "Guardar Cambios"}</span>
      </LoadingButton>
    </Container>
  );
};

export default DaySwitch;

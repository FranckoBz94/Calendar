import React, { useEffect, useState } from "react"
import { Box, Button, CardActions, CardContent, Chip, Grid, Stack, Step, StepIconProps, StepLabel, Stepper } from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { ColorlibConnector, ColorlibStepIconRoot } from "contants";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CardBarber from "./CardBarber";
import { useDispatch, useSelector } from "react-redux";
import store from "redux/store";
import { getAllBarbers } from "redux/actions/barbersAction";
import SelectDateHours from "./SelectDateHours";
import FormDataClient from "./FormDataClient";

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;
  const icons: { [index: string]: React.ReactElement } = {
    1: <ContentCutIcon />,
    2: <CalendarMonthIcon />,
    3: <GroupAddIcon />,
    4: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

dayjs.locale('es');


const ModalContent = () => {
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const [stepAddTurn, setStepAddTurn] = useState(0)
  const steps = ['Barbero', 'Fecha', 'Datos personales', 'Estado reserva'];
  const [barberId, setBarberId] = React.useState<string | number | null>(null);
  const [dataBarberSelected, setDataBarberSelected] = React.useState<any>({});
  const [dataService, setDataService] = React.useState({
    idService: 0,
    start_date: "",
    minutes_services: "",
    time_turn: "",
  });

  const { barbers } = useSelector((state: RootState) => storeComplete.barbers)
  const dispatch = useDispatch()

  const handleClick = (id: string | number | null, dataBarber: {}) => {
    setBarberId(id);
    setDataBarberSelected(dataBarber)
    console.log("dataBarber", dataBarber)
  };

  const selectedDataService = (data: any) => {
    console.log("data modal content", data)
    setDataService(prev => ({ ...prev, ...data }));
  };

  const handleBack = () => {
    setStepAddTurn(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStepAddTurn(prev => Math.min(prev + 1, steps.length - 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllBarbers() as any);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);


  const handleClickChip = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <CardContent>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack sx={{ width: '100%' }} spacing={4}>
          <Stepper alternativeLabel activeStep={stepAddTurn} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {stepAddTurn === 0 && (
            <Box>
              <Grid container spacing={2}>
                {barbers && barbers.length > 0 && barbers.map((barber: any) => (
                  <Grid item xs={6} sm={4} md={4} key={barber.id}>
                    <CardBarber id={barber.id} selectedId={barberId} handleClick={handleClick} dataBarber={barber} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          {stepAddTurn === 1 && (
            <SelectDateHours barberId={barberId} selectedDataService={selectedDataService} />
          )}
          {stepAddTurn === 2 && (
            <Stack direction="row" spacing={1}>
              <Chip
                label={dataBarberSelected && `${dataBarberSelected?.firstName} ${dataBarberSelected?.lastName}`}
                onClick={handleClickChip}
                onDelete={handleDelete}
              />
              <Chip
                label={dataService && `${dataService?.time_turn} Hs`}
                onClick={handleClickChip}
                onDelete={handleDelete}
              />
            </Stack>
          )}
          {stepAddTurn === 2 && (
            <FormDataClient dataService={dataService} barberId={barberId} handleNext={handleNext} />
          )}
          {stepAddTurn === 3 && (
            <div>
              <h2>Turno guardado exitosamente</h2>
              <p>¡Gracias por reservar con nosotros!</p>
              {/* Puedes agregar más detalles de la reserva si es necesario */}
            </div>
          )}
        </Stack >
      </LocalizationProvider >
      <CardActions>
        <Box mr={1} my={2} display="flex" justifyContent="space-between" width="100%">
          <Button onClick={handleBack} variant="outlined" style={{ fontWeight: "bold" }}>
            Atras
          </Button>
          <Button onClick={handleNext} variant="contained" style={{ fontWeight: "bold" }}>
            Continuar
          </Button>
        </Box>
      </CardActions>
    </CardContent >
  )
}

export default ModalContent
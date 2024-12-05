import { Barber, socket } from 'contants';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getAllBarbers } from 'redux/actions/barbersAction';
import { getAllClients } from 'redux/actions/clientsAction';
import { getAllDays, getAllHours } from 'redux/actions/hoursAction';
import { getAllServices } from 'redux/actions/servicesAction';
import { getAllTurns } from 'redux/actions/turnsAction';
import store from 'redux/store';

const useLoadData = () => {
  const dispatch = useDispatch();

  type RootState = ReturnType<typeof store.getState>;
  const storeComplete: any = useSelector((state: RootState) => state);

  const [barbersActive, setBarbersActive] = useState<Barber[]>([]);
  const [barberSelected, setBarberSelected] = useState<Barber | null>(null);
  const turnsLoadedRef = useRef(false);
  const [loadingTurns, setLoadingTurns] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false); // Estado para controlar si los datos iniciales han sido cargados

  const barbers = useSelector((state: RootState) => storeComplete.barbers, shallowEqual);
  const turns = useSelector((state: RootState) => storeComplete.turns, shallowEqual);
  const clients = useSelector((state: RootState) => storeComplete.clients, shallowEqual);
  const services = useSelector((state: RootState) => storeComplete.services, shallowEqual);
  const hours = useSelector((state: RootState) => storeComplete.hours, shallowEqual);
  const days = useSelector((state: RootState) => storeComplete.days, shallowEqual);

  console.log("barbers", barbers);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getAllBarbers() as any);
      await dispatch(getAllClients() as any);
      await dispatch(getAllServices() as any);
      await dispatch(getAllHours() as any);
      await dispatch(getAllDays() as any);
      setDataLoaded(true);
    };

    loadData();
  }, [dispatch]);

  // Manejar la selección del primer barbero una vez que los datos estén cargados
  useEffect(() => {
    if (dataLoaded && barbers?.length > 0) {
      console.log("Setting active barbers and selecting the first one");
      setBarbersActive(barbers);
      setBarberSelected(barbers[0]); // Seleccionar el primer barbero por defecto
      dispatch(getAllTurns(barbers[0].id) as any);
    }
  }, [dataLoaded, barbers, dispatch]);

  // Manejar eventos de socket
  useEffect(() => {
    const handleSocketTurn = (barberId: any) => {
      if (barberSelected?.id === barberId) {
        dispatch(getAllTurns(barberId) as any);
      }
    };
    socket.on('turn', handleSocketTurn);
    return () => {
      socket.off('turn', handleSocketTurn);
    };
  }, [barberSelected, dispatch]);

  return {
    barbers,
    barbersActive,
    setBarbersActive,
    barberSelected,
    setBarberSelected,
    turns,
    clients,
    services,
    hours,
    days,
    loadingTurns,
    setLoadingTurns,
    turnsLoadedRef,
  };
};

export default useLoadData;

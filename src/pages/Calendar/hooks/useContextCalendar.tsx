import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import store from 'redux/store';
import { Barber, socket } from 'contants';
import { getAllBarbers } from 'redux/actions/barbersAction';
import { getAllClients } from 'redux/actions/clientsAction';
import { getAllServices } from 'redux/actions/servicesAction';
import { getAllDays, getAllHours } from 'redux/actions/hoursAction';
import { getAllTurns } from 'redux/actions/turnsAction';

type DataContextType = {
  barbers: Barber[];
  barbersActive: Barber[];
  setBarbersActive: React.Dispatch<React.SetStateAction<Barber[]>>;
  barberSelected: Barber | null;
  setBarberSelected: React.Dispatch<React.SetStateAction<Barber | null>>;
  turns: any[];
  clients: any;
  services: any[];
  hours: any;
  days: any[];
  loadingTurns: boolean;
  setLoadingTurns: React.Dispatch<React.SetStateAction<boolean>>;
  turnsLoadedRef: React.MutableRefObject<boolean>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

type DataProviderProps = {
  children: ReactNode;
};

export const DataProviderCalendar = ({ children }: DataProviderProps) => {
  const dispatch = useDispatch();

  type RootState = ReturnType<typeof store.getState>;

  const storeComplete: any = useSelector((state: RootState) => state);

  const [barbersActive, setBarbersActive] = useState<Barber[]>([]);
  const [barberSelected, setBarberSelected] = useState<Barber | null>(null);
  const turnsLoadedRef = useRef(false);
  const [loadingTurns, setLoadingTurns] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  const barbers = useSelector((state: RootState) => storeComplete.barbers, shallowEqual);
  const turns = useSelector((state: RootState) => storeComplete.turns, shallowEqual);
  const clients = useSelector((state: RootState) => storeComplete.clients, shallowEqual);
  const services = useSelector((state: RootState) => storeComplete.services, shallowEqual);
  const hours = useSelector((state: RootState) => storeComplete.hours, shallowEqual);
  const days = useSelector((state: RootState) => storeComplete.days, shallowEqual);

  useEffect(() => {
    const loadData = async () => {
      if (!dataLoaded) {
        await dispatch(getAllBarbers() as any);
        await dispatch(getAllClients() as any);
        await dispatch(getAllServices() as any);
        await dispatch(getAllHours() as any);
        await dispatch(getAllDays() as any);
        setDataLoaded(true);
      }
    };

    loadData();
  }, [dispatch, dataLoaded]);

  useEffect(() => {
    if (dataLoaded && barbers?.length > 0 && barbersActive.length === 0) {
      setBarbersActive(barbers);
      setBarberSelected(barbers[0]);
      dispatch(getAllTurns(barbers[0].id) as any);
    }
  }, [dataLoaded, barbers, barbersActive, dispatch]);

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

  return (
    <DataContext.Provider value={{
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
      turnsLoadedRef
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

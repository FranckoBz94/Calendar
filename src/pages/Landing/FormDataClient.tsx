import { combineAndFormatToISO, formatDate, socket } from "contants";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addTurn, hoursAvailableOnSave, sendMail } from "redux/actions/turnsAction";
import { DateContants } from "utils/DateContants";
import CompleteFormClient from "./CompleteFormClient";
import { useState } from "react";
import { addClient, fetchClientData } from "redux/actions/clientsAction";
// import { addClient } from "redux/actions/clientsAction";

interface dataAddTurnProps {
  dataService: { idService: number; start_date: string; minutes_services: string, time_turn: string };
  barberId: string | number | null;
  handleNext: () => void;
  dataFormClient: any;
  dataBarber: any;
  selectedService: any;
}

const FormDataClient = (props: dataAddTurnProps) => {
  const { barberId, handleNext, dataFormClient, dataBarber, selectedService } = props
  const { idService, start_date: startDate, minutes_services: minuteServices, time_turn: timeTurn } = props.dataService;
  const [idClient, setClientId] = useState<string | null>(null);
  const [errorSaveTurn, setErrorSaveTurn] = useState<string | null>(null)
  const [loadingForm, setLoadingForm] = useState(false)
  const dispatch = useDispatch()

  const registerEvent = async (clientId?: any) => {
    setLoadingForm(true)
    console.log("idClient", idClient)
    const formattedDate = formatDate(startDate + " " + timeTurn);
    console.log("formattedDate", formattedDate)

    const endTime = DateContants.calculateEndTime(
      formattedDate,
      minuteServices
    )
    const newClientId = idClient !== null ? idClient : clientId

    console.log("minuteServices", minuteServices)
    const startTimeHour = combineAndFormatToISO(startDate, timeTurn);
    const dataComplete = {
      title: "titulo",
      idClient: newClientId,
      dateBooking: startDate,
      end: moment(endTime).toDate(),
      idBarber: barberId,
      price: 0,
      idService,
      end_date: moment(moment(endTime).toDate()).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      start: startTimeHour,
      start_date: startDate + " " + timeTurn + ":00"
    }
    let rtaAddTurn
    let stillAvailable
    try {
      console.log("dataComplete", dataComplete)
      stillAvailable = await dispatch(hoursAvailableOnSave(dataComplete) as any)
      if (stillAvailable.message.length === 0) {
        rtaAddTurn = await dispatch(addTurn(dataComplete) as any)
        if (rtaAddTurn.rta === 1) {
          const requestData = { dataComplete, dataFormClient, dataBarber, selectedService }
          const response = await dispatch(sendMail(requestData) as any);
          console.log("response", response)
          socket.emit("turn", barberId);
          setLoadingForm(false)
          handleNext();
          setErrorSaveTurn(null)
          setTimeout(() => {
          }, 2000);
        } else {
          setErrorSaveTurn(rtaAddTurn.message)
        }
      } else {
        setLoadingForm(false)
        setErrorSaveTurn("Ya hay un turno registrado en este horario.")
      }
    } catch (err) {
      setErrorSaveTurn("Ocurrio un error, intente nuvamente.")
    }
  }

  const searchAndRegisterEvent = async (formValues: any) => {
    console.log("formValues", formValues)
    const data = {
      firstName: formValues?.firstName || "",
      lastName: formValues?.lastName || "",
      email: formValues?.email || "",
      telefono: formValues?.phone || "",
      dni: formValues?.dni || ""
    }
    let rtaAddClient
    try {
      rtaAddClient = await dispatch(addClient(data) as any)
      console.log("rtaAddClient", rtaAddClient)
      if (rtaAddClient.rta === 1) {
        // setErrorSaveTurn(rtaAddClient.message)
        const clientData = await dispatch(fetchClientData({ dni: formValues?.dni }) as any);
        if (clientData && clientData.length > 0) {
          const data = clientData[0];
          dataFormClient.email = data.email
          setClientId(data.id)
          console.log("data", data)
          registerEvent(data.id)
        } else {
          setErrorSaveTurn("No se encontraron datos del cliente.");
        }
      } else if (rtaAddClient.rta === -2) {
        setErrorSaveTurn(rtaAddClient.message)
      } else {
        setErrorSaveTurn(rtaAddClient.message)
      }
    } catch (err) {
      setErrorSaveTurn(`Ocurrio un error, intente nuvamente.`)
    }
  }

  return (
    <>
      <CompleteFormClient setClientId={setClientId} registerEvent={registerEvent} searchAndRegisterEvent={searchAndRegisterEvent} dataFormClient={dataFormClient} loadingForm={loadingForm} errorSaveTurn={errorSaveTurn} />
    </>
  )
}

export default FormDataClient

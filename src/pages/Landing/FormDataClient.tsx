import { combineAndFormatToISO, formatDate, NotifyHelper, socket } from "contants";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addTurn, hoursAvailableOnSave } from "redux/actions/turnsAction";
import { DateContants } from "utils/DateContants";
import CompleteFormClient from "./CompleteFormClient";
import { useState } from "react";

interface dataAddTurnProps {
  dataService: { idService: number; start_date: string; minutes_services: string, time_turn: string };
  barberId: string | number | null;
  handleNext: () => void;
  dataFormClient: {}
}

const FormDataClient = (props: dataAddTurnProps) => {
  const { barberId, handleNext, dataFormClient } = props
  const { idService, start_date: startDate, minutes_services: minuteServices, time_turn: timeTurn } = props.dataService;
  const [idClient, setClientId] = useState<string | null>(null); // Estado para idClient
  const [loadingForm, setLoadingForm] = useState(false)
  const dispatch = useDispatch()

  const registerEvent = async () => {
    setLoadingForm(true)

    const formattedDate = formatDate(startDate + " " + timeTurn);
    const endTime = DateContants.calculateEndTime(
      formattedDate,
      minuteServices
    )
    const startTimeHour = combineAndFormatToISO(startDate, timeTurn);
    const dataComplete = {
      title: "titulo",
      idClient: idClient,
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
          NotifyHelper.notifySuccess(rtaAddTurn.message)
          socket.emit("turn", barberId);
          setTimeout(() => {
            setLoadingForm(false)
            handleNext();
          }, 2000);
        } else {
          NotifyHelper.notifyError(rtaAddTurn.message)
        }
      } else {
        NotifyHelper.notifyWarning("Ya hay un turno registrado en este horario.")
      }
    } catch (err) {
      NotifyHelper.notifyError(`Ocurrio un error, intente nuvamente.`)
    }
  }

  return (
    <>
      <CompleteFormClient setClientId={setClientId} registerEvent={registerEvent} dataFormClient={dataFormClient} loadingForm={loadingForm} />
    </>
  )
}

export default FormDataClient

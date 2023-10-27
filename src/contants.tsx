import { toast } from "react-toastify"

export const options = {
  actionsCellStyle: {
    backgroundColor: "#fadb5761",
    color: "#000"
  },
  actionsColumnIndex: -1,
  headerStyle: {
    backgroundColor: "rgb(3 101 36)",
    color: "white"
  }
}
export const localization = {
  toolbar: {
    searchPlaceholder: "Buscar"
  },
  header: {
    actions: "Accion"
  },
  pagination: {
    firstTooltip: "Primera Página",
    previousTooltip: "Página Anterior",
    nextTooltip: "Página Siguiente",
    lastTooltip: "Última Página",
    labelRowsSelect: "Filas"
  }
}

export const paginationOption = {
  rowsPerPageText: "Filas por página:",
  rangeSeparatorText: "de",
  noRowsPerPage: false,
  selectAllRowsItem: false,
  selectAllRowsItemText: "Todos"
}

export class NotifyHelper {
  static notifySuccess: (text: string) => void = (text: string) => {
    if (text) {
      toast.success(text, {
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: "bottom-right",
        progress: undefined,
        theme: "light"
      })
    }
  }

  static notifyError: (text: string) => void = (text: string) => {
    toast.error(text, {
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: "bottom-right",
      progress: undefined,
      theme: "light"
    })
  }
}

export const availableStartHours: any = [
  "08:00:00",
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
  "19:00:00",
  "20:00:00"
]

export const availableEndHours: any = [
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
  "19:00:00",
  "20:00:00"
]

export const transformarTurno = async (turn: any) => {
  console.log(turn)
  return {
    idTurn: turn.id,
    dateBooking: new Date(turn.fecha_reserva),
    end: new Date(turn.end_date),
    idClient: turn.cliente_id,
    idService: turn.service_id,
    start: new Date(turn.start_date),
    title: turn.nameClient + " " + turn.lastNameClient,
    backgroundColor: turn.colorEvent
  }
}

export const newArrayServices = async (
  services: any,
  dateNextTurn: any,
  dateTurnSelected: any
) => {
  const fechaInicioNextTurn: any = new Date(dateNextTurn)
  const fechaTurnSelected: any = new Date(dateTurnSelected)
  const diferenciaEnMilisegundos = fechaInicioNextTurn - fechaTurnSelected
  const diferenciaEnMinutos = diferenciaEnMilisegundos / (1000 * 60)
  return services.filter(
    (itemService: any) => itemService.minutes_service <= diferenciaEnMinutos
  )
}

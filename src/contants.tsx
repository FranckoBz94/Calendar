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
    toast.success(text, {
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: "top-center",
      progress: undefined,
      theme: "colored"
    })
  }

  static notifyError: (text: string) => void = (text: string) => {
    toast.error(text, {
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: "top-center",
      progress: undefined,
      theme: "colored"
    })
  }
}

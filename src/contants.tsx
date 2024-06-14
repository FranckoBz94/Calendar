import { Alert, ThemeOptions } from "@mui/material";
import { MUIDataTableOptions } from "mui-datatables";
import { toast } from "react-toastify"
import { styled } from '@mui/material/styles';
import io from 'socket.io-client';
import { components } from "react-select"

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
export const socket = io(`${process.env.REACT_APP_URL_BASE}`);


export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const optionsTable: Partial<MUIDataTableOptions> = {
  selectableRows: "none",
  responsive: 'standard',
  textLabels: {
    body: {
      noMatch: "No se encontraron registros",
      toolTip: "Ordenar",
    },
    pagination: {
      next: "Siguiente",
      previous: "Anterior",
      rowsPerPage: "Filas por página:",
      displayRows: "de",
    },
    toolbar: {
      search: "Buscar",
      downloadCsv: "Descargar CSV",
      print: "Imprimir",
      viewColumns: "Ver columnas",
      filterTable: "Filtrar tabla",
    },
    filter: {
      all: "Todos",
      title: "FILTROS",
      reset: "RESETEAR",
    },
    viewColumns: {
      title: "Mostrar",
      titleAria: "Mostrar/Ocultar columnas",
    },
    selectedRows: {
      text: "fila(s) seleccionada(s)",
      delete: "Eliminar",
      deleteAria: "Eliminar filas seleccionadas",
    },
  },
};

export const Option = (props: any) => {
  return (
    <components.Option {...props}>
      <div dangerouslySetInnerHTML={{ __html: props.label }} />
    </components.Option>
  );
}

export const SingleValue = (props: any) => (
  <components.SingleValue {...props}>
    <div dangerouslySetInnerHTML={{ __html: props.data.label }} />
  </components.SingleValue>
);

export const getMuiTheme = (color: string): ThemeOptions => ({
  components: {
    MUIDataTableHeadCell: {
      styleOverrides: {
        fixedHeader: { backgroundColor: color + "!important", color: "#fff" },
        sortActive: { color: "#ddd" },
        sortAction: { color: "#ddd !important", alignItems: "center" },
        sortLabelRoot: { color: "#ddd !important" },
        hintIconWithSortIcon: { color: "#ddd !important" },
      },
    },
  }
})

export class NotifyHelper {
  static notifySuccess: (text: string) => void = (text: string) => {
    toast.success(text, {
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: "bottom-right",
      progress: undefined,
      theme: "dark"
    })

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
      theme: "dark"
    })
  }

  static notifyWarning: (text: string) => void = (text: string) => {
    toast.warning(text, {
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: "bottom-right",
      progress: undefined,
      theme: "dark"
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
  return {
    idTurn: turn.id,
    dateBooking: new Date(turn.fecha_reserva),
    end: new Date(turn.end_date),
    idClient: turn.cliente_id,
    idService: turn.service_id,
    start: new Date(turn.start_date),
    title: turn.nameClient + " " + turn.lastNameClient,
    description: turn.nameService,
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

export const CustomAlert = styled(Alert)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0',
  '& .MuiAlert-icon': {
    margin: 2,
    fontSize: 15
  },
}));

export const switchStyles = {
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: 'green',
    '&:hover': {
      backgroundColor: 'rgba(0, 255, 0, 0.08) !important',
    },
  },
  '& .MuiSwitch-switchBase': {
    color: 'red',
    '&:hover': {
      backgroundColor: 'rgba(255, 0, 0, 0.08) !important',
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: 'green !important',
  }
};

export const createFormData = (
  data: any,
  profileImage: File | null,
  selectedOptionUser: number,
  isBarber: number
): FormData => {
  console.log("data", data)
  const formData = new FormData();
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("email", data.email);
  formData.append("telefono", data.telefono);
  formData.append("is_active", data.is_active);
  formData.append("imageProfile", profileImage || data.imageProfile);
  formData.append("id_user", selectedOptionUser.toString());
  formData.append("is_barber", isBarber.toString());
  return formData;
};
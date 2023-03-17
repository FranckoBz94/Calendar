import Button from "@mui/material/Button"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { dataRow } from "pages/Users/Users"

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

export const columnsTableUsers = [
  {
    name: "Nombre",
    selector: (row: any) => row.nombre,
    sortable: true
  },
  {
    name: "Apellido",
    selector: (row: any) => row.apellido,
    sortable: true
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
    sortable: true
  },
  {
    name: "Usuario Creado",
    selector: (row: any) => new Date(row.fecha_creacion).toLocaleString(),
    sortable: true
  },
  {
    name: "Activo",
    selector: (row: any) => (row.is_active === 1 ? "Si" : "No"),
    sortable: true,
    center: true
  },
  {
    name: "Administrador",
    selector: (row: any) => (row.is_admin === 1 ? "Si" : "No"),
    sortable: true,
    center: true
  },
  {
    name: "Acción",
    sortable: false,
    cell: (d: any) => [
      <Button
        key={1}
        style={{ marginLeft: "3px", marginRight: "3px" }}
        variant="contained"
        type="button"
        className="btnTable"
        title="Editar Jugador"
        startIcon={<EditIcon />}
        color="primary"
        onClick={() => dataRow(d)}
      ></Button>,
      <Button
        key={2}
        variant="contained"
        color="error"
        style={{ marginLeft: "3px", marginRight: "3px" }}
        className="btnTable"
        type="button"
        title="Eliminar Jugador"
        startIcon={<DeleteIcon />}
        onClick={() => dataRow(d)}
      ></Button>
    ],
    grow: 2,
    center: true
  }
]

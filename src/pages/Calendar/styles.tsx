import { type Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import createStyles from "@mui/styles/createStyles"

export const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    card_title: {
      paddingX: "5px",
      paddingY: "10px",
      color: "#fff",
      fontWeight: "bold"
    },
    colorCard: {
      background: "#404258 !important"
    },
    cardTable: {
      display: "flex",
      flexDirection: "column",
      height: "auto",
      width: "100%",
      boxShadow: "none !important"
    },
    dataGrid: {
      flexGrow: 1
    },
    close: {
      cursor: "pointer",
      right: "25px",
      top: "0"
    },
    btnAddClient: {
      borderRadius: "70px !important",
      paddingLeft: "20px !important",
      paddingRight: "20px !important",
      paddingTop: "10px !important",
      paddingBottom: "10px !important"
    },
    dataHoursCalendar: {
      position: "absolute",
      top: "4px",
      right: "10px"
    },
    customRadioLabel: {
      display: "inline-flex",
      alignItems: "center",
      padding: "5px",
      background: "bisque",
      border: "2px solid #000", // Color del borde personalizable
      borderRadius: "5px", // Ajusta el radio para hacer un círculo
      margin: "3px", // Espacio entre radio buttons
      cursor: "pointer", // Cambia el cursor al pasar el mouse
      "&:hover": {
        backgroundColor: "#2196F3" // Cambia el color de fondo al hacer hover (personalizable)
      }
    },
    inputChecked: {
      display: "inline-flex",
      alignItems: "center",
      padding: "5px",
      background: "#2196F3",
      border: "2px solid #000",
      borderRadius: "5px",
      margin: "3px",
      cursor: "pointer",
      color: "#fff",
      fontWeight: "bold"
    }
  })
)

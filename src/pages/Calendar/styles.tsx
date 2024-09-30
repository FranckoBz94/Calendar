import { type Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import createStyles from "@mui/styles/createStyles"

export const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    card_title: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      margin: 0,
      fontSize: "17px",
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

    inputChecked: {
      display: "inline-flex",
      alignItems: "center",
      padding: '10px 20px',
      background: "#2196F3",
      border: "2px solid #000",
      borderRadius: "5px",
      margin: "3px",
      cursor: "pointer",
      color: "#fff",
      fontWeight: "bold"
    },

    customRadioLabel: {
      display: 'inline-block',
      padding: '10px 20px',
      margin: '5px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      cursor: 'pointer',
      backgroundColor: '#f5f5f5',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        backgroundColor: '#e0e0e0',
      },
    },


  })
)

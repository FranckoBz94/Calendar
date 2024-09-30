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
    }
  })
)

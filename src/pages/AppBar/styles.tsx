import { type Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import createStyles from "@mui/styles/createStyles"

export const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    iconBurger: {
      borderRadius: "5px !important",
      border: "1px solid #fff !important"
    }
  })
)

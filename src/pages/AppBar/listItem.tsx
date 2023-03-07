import * as React from "react"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import GroupIcon from "@mui/icons-material/Group"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart"
import EditRoadIcon from "@mui/icons-material/EditRoad"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/clients">
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItemButton>
    <motion.div>
      <ListItemButton component={Link} to="/services">
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Servicios" />
      </ListItemButton>
    </motion.div>
    <ListItemButton component={Link} to="/users">
      <ListItemIcon>
        <GroupAddIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItemButton>
    <ListItemButton component={Link} to="/ganancias">
      <ListItemIcon>
        <WaterfallChartIcon />
      </ListItemIcon>
      <ListItemText primary="Ganancias" />
    </ListItemButton>
    <ListItemButton component={Link} to="/vacaciones">
      <ListItemIcon>
        <EditRoadIcon />
      </ListItemIcon>
      <ListItemText primary="Vacaciones" />
    </ListItemButton>
  </React.Fragment>
)

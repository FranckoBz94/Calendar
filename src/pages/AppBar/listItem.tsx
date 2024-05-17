import * as React from "react"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import GroupIcon from "@mui/icons-material/Group"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import EventNoteIcon from "@mui/icons-material/EventNote"
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart"
import EditRoadIcon from "@mui/icons-material/EditRoad"
import ContentCutIcon from "@mui/icons-material/ContentCut"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Box } from "@mui/material"

interface User {
  is_admin: number;
  firstName: string;
  lastName: string;
}

export const mainListItems = () => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <React.Fragment>
      <Box mx={1}>
        <ListItemButton component={Link} to="/" selected={isActive("/")}>
          <ListItemIcon>
            <EventNoteIcon />
          </ListItemIcon>
          <ListItemText primary="Agenda" />
        </ListItemButton>

        {user?.is_admin === 1 && (
          <>
            <ListItemButton component={Link} to="/clients" selected={isActive("/clients")}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Clientes" />
            </ListItemButton>

            <motion.div>
              <ListItemButton component={Link} to="/services" selected={isActive("/services")}>
                <ListItemIcon>
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary="Servicios" />
              </ListItemButton>
            </motion.div>

            <ListItemButton component={Link} to="/barbers" selected={isActive("/barbers")}>
              <ListItemIcon>
                <ContentCutIcon />
              </ListItemIcon>
              <ListItemText primary="Barberos" />
            </ListItemButton>
            <ListItemButton component={Link} to="/usuarios" selected={isActive("/usuarios")}>
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
            <ListItemButton component={Link} to="/profits" selected={isActive("/profits")}>
              <ListItemIcon>
                <WaterfallChartIcon />
              </ListItemIcon>
              <ListItemText primary="Ganancias" />
            </ListItemButton>
          </>
        )}
        <ListItemButton component={Link} to="/inactive" selected={isActive("/inactive")}>
          <ListItemIcon>
            <EditRoadIcon />
          </ListItemIcon>
          <ListItemText primary="Vacaciones" />
        </ListItemButton>

      </Box>
    </React.Fragment>
  )
}


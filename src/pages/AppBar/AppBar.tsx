import * as React from "react"
import { type ReactElement } from "react"

import { styled } from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps
} from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import { mainListItems } from "./listItem"
import PersonIcon from "@mui/icons-material/Person"
import Brightness4Icon from "@mui/icons-material/Brightness4" // Icono de modo oscuro
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { useTheme, ThemeProvider } from "@mui/system"
import { CssBaseline } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { toggleDarkMode } from "redux/actions/themeAction"

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open === true && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: "border-box",
    ...(!(open ?? false) && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9)
      }
    })
  }
}))

interface Props {
  window?: () => Window
  children?: ReactElement
}

export function AppBarComponent(props: Props) {
  const { window, children } = props
  const dispatch = useDispatch()

  interface ThemeState {
    darkMode: boolean
  }

  // Estado global de la aplicación
  interface RootState {
    theme: ThemeState
    // Otros reducers...
  }

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const [localDarkMode, setLocalDarkMode] = React.useState(darkMode)

  console.log(darkMode)
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const theme = useTheme()

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode())
  }

  React.useEffect(() => {
    setLocalDarkMode(darkMode)
  }, [darkMode])

  const container: any =
    window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px" // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" })
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <IconButton color="inherit" onClick={handleDarkModeToggle}>
                {!localDarkMode ? (
                  <Brightness4Icon /> // Icono de modo oscuro
                ) : (
                  <Brightness7Icon /> // Icono de modo claro
                )}
              </IconButton>
              <IconButton color="inherit">
                <Badge color="secondary">
                  <PersonIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open} container={container}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1]
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto"
            }}
            className="background_page"
          >
            {/* <Toolbar /> */}
            <Box mt={11} mx={3}>
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </Box>
    </>
  )
}

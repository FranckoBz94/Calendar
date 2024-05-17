import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { type ReactElement } from "react"
import { Avatar, List, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { mainListItems } from './listItem';
import { Link, useNavigate } from "react-router-dom"
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { useUser } from '../../components/UserProvider';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  marginTop: 65,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface Props {
  window?: () => Window
  children?: ReactElement
}

// interface User {
//   firstName: string;
//   lastName: string;
//   url_image: string
//   email: string
// }

export function AppBarComponent(props: Props) {
  const theme = useTheme();
  const { children } = props

  const [open, setOpen] = React.useState(true);
  // const [user, setUser] = React.useState<User | null>(null);
  const { user } = useUser();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // React.useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className="appBar" position="fixed" open={open}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon sx={{ color: "#000" }} />
          </IconButton>
          <Typography variant="h6" component="div" color="black" sx={{ flexGrow: 1 }}>
            Calendar
          </Typography>
          <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Account settings">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                  <Avatar sx={{ width: 32, height: 32 }} src={`${process.env.REACT_APP_URL_BASE}${user?.url_image}`}></Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

              <Box sx={{ my: 1.5, px: 2 }}>
                <Typography variant="subtitle2" noWrap>
                  <b> {user?.firstName} {user?.lastName}</b>
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {user?.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleClose} component={Link} to="/profile">
                <Avatar sx={{ width: 24, height: 24 }} /> Perfil
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon >
                  <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar sesión
              </MenuItem>
            </Menu>
          </React.Fragment>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: "none"
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Box mt={2}>
          <List component="nav">
            {mainListItems()}
          </List>
        </Box>
      </Drawer>
      <Main open={open} className="background_page">
        <Box >
          {children}
        </Box>
      </Main >
    </Box >
  );
}
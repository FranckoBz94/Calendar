import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'redux/actions/usersAction';
import { NotifyHelper } from 'contants';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'components/UserProvider';
import { Card, CardContent } from '@mui/material';
import ForgotPassword from './ForgotPassword';
import store from 'redux/store';
import { getAllServices } from 'redux/actions/servicesAction';

const defaultTheme = createTheme();

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [isForgotPassword, setIsForgotPassword] = React.useState(false)
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const services = useSelector((state: RootState) => storeComplete.services, shallowEqual);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUser } = useUser()
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const dataLogin = {
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
      const isLogged = await dispatch(loginUser(dataLogin) as any);
      if (isLogged.rta === 1) {
        localStorage.setItem("token", isLogged.token);
        localStorage.setItem("user", JSON.stringify(isLogged.message));
        setUser(isLogged.message)
        NotifyHelper.notifySuccess("Bienvenido " + isLogged.message.firstName + " " + isLogged.message.lastName);
        navigate('/');
      } else {
        NotifyHelper.notifyError(isLogged.message);
      }
    } catch (error) {
      NotifyHelper.notifyError("Ocurrió un error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  // React.useEffect(() => {
  //   dispatch(getAllServices() as any);

  // }, [])

  const getServices = () => {
    dispatch(getAllServices() as any);

  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <p>{JSON.stringify(services)}</p>
      <button onClick={getServices}>Click</button>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          xl={7}
          sx={{
            display: { xs: 'none', sm: 'flex' }, // Oculta en pantallas extra pequeñas (menos de 600px)
            alignItems: 'center',
            justifyContent: 'center',
            height: "100%"
          }}
        >
          <Box style={{ height: "100%", width: "100%" }}>
            <img src={`${process.env.REACT_APP_URL_BASE}uploads/img_login.jpg`} alt="" style={{
              height: "100%", opacity: "0.8", width: "100%", objectFit: "cover"
            }} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={7} xl={5} component={Paper} elevation={6} square sx={{
          position: 'relative',
        }}>
          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
            }}
          >
            <img
              src={`${process.env.REACT_APP_URL_BASE}uploads/img_login.jpg`}
              alt="background"
              style={{
                height: "100%",
                width: "100%",
                opacity: 0.8,
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            sx={{
              my: 15,
              mx: { xs: 2, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 1,
            }}
          >
            <Card variant="outlined" sx={{ width: { xs: "100%", md: "80%" }, zIndex: 999, borderRadius: 5, py: 3 }}>
              {!isForgotPassword ? (
                <CardContent >
                  <Box display="flex" alignItems="center" flexDirection="column">
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" alignItems="center" variant="h5">
                      Iniciar Sesión
                    </Typography>
                  </Box>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Contraseña"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {loading ? 'Cargando' : 'Ingresar'}
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link onClick={() => setIsForgotPassword(true)} component="button" variant="body2">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              ) : (
                <ForgotPassword isForgotPassword={isForgotPassword} setIsForgotPassword={setIsForgotPassword} />
              )}
            </Card>

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;

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
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/actions/usersAction';
import { NotifyHelper } from 'contants';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const Login = () => {
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true)
        const data = new FormData(event.currentTarget);
        const dataLogin = {
            email: data.get('email'),
            password: data.get('password'),
        }
        const isLogged = await dispatch(loginUser(dataLogin) as any)
        if (isLogged.rta === 1) {
            localStorage.setItem("token", isLogged.token)
            localStorage.setItem("user", JSON.stringify(isLogged.message))
            NotifyHelper.notifySuccess("Bienvenido " + isLogged.message.firstName + " " + isLogged.message.lastName)

            setLoading(false)
            navigate('/');

        } else {
            NotifyHelper.notifyError(isLogged.message)
            setLoading(false)
        }

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        display: { xs: 'none', sm: 'flex' }, // Oculta en pantallas extra pequeñas (menos de 600px)
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: "100%"
                    }}
                >
                    <Box style={{ height: "100%" }}>
                        <img src={`${process.env.REACT_APP_URL_BASE}uploads/img_login.jpg`} alt="" style={{
                            height: "100%", opacity: "0.8", width: "100%", objectFit: "cover"
                        }} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 9,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Iniciar Sesión
                        </Typography>
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
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading ? 'Cargando' : 'Ingresar'}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Login
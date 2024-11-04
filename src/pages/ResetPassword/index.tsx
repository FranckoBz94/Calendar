import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetPassword } from 'redux/actions/usersAction';

const ResetPassword = () => {
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [typeMessage, setTypeMessage] = useState<'error' | 'success' | 'warning' | 'info'>('info');
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log("params", params)
    const tokenFromUrl: string | null = params.get('token') || '';
    setToken(tokenFromUrl);
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        setMessage('Las contraseñas no coinciden');
        setTypeMessage("warning")
        return;
      }
      const dataPass = {
        token,
        password,
      };

      const response = await dispatch(resetPassword(dataPass) as any);
      console.log("response", response)
      if (response.success) {
        setMessage('Contraseña actualizada correctamente.');
        setTypeMessage("success")
      } else {
        setMessage('Error al actualizar la contraseña.');
        setTypeMessage("error")
      }
    } catch (error) {
      setMessage('Ocurrió un error. Inténtalo más tarde.');
      setTypeMessage("error")
    }
    finally {
      setLoading(false);
    }
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <Grid container mt={9}>
      <Grid item md={12} display="flex" justifyContent="center">
        <Card>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h5" display="flex" justifyContent="center" mb={3} mt={2}>Restablecer Contraseña</Typography>
              <TextField
                label="Nueva contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Confirmar nueva contraseña"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
                sx={{ mt: 2 }}
              />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} disabled={loading}>
                {loading ? "Cargando..." : "Restablecer"}
              </Button>
              {message && <Alert sx={{ mt: 2 }} severity={typeMessage}>{message}</Alert>}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;

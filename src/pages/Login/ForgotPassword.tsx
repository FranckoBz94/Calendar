import * as React from 'react';
import { Alert, Box, Button, CardContent, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from 'react-redux';
import { forgotPassword } from 'redux/actions/usersAction';

interface propsPassword {
  isForgotPassword: boolean,
  setIsForgotPassword: (send: boolean) => void
}

const ForgotPassword = (props: propsPassword) => {
  const { setIsForgotPassword, isForgotPassword } = props
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [typeMessage, setTypeMessage] = React.useState<'error' | 'success' | 'warning' | 'info'>('info');

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const dataPass = {
      email
    };
    try {
      const response = await dispatch(forgotPassword(dataPass) as any);
      console.log("res", response);
      if (response && response.success !== undefined) {
        if (!response.success) {
          setTypeMessage("error")
          setMessage(response.message);
        } else {
          setTypeMessage("success")
          setMessage("Correo de restablecimiento enviado.");
        }
      } else {
        setMessage("Respuesta inesperada del servidor.");
      }
    } catch (error) {
      setMessage("Ocurrió un error. Inténtalo de nuevo más tarde.");
    }
    finally {
      setLoading(false); // Desactiva el estado de carga
    }
    setTimeout(() => {
      setMessage("")
    }, 3000);
  };

  return (
    <CardContent>
      <Box display="flex" alignItems="center">
        {isForgotPassword && <ArrowBackIcon sx={{ mr: 2 }} onClick={() => setIsForgotPassword(false)} />}
        <Typography variant="h5">Recuperar Contraseña</Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Typography sx={{ py: 2 }}>Ingrese su direccion de email con la que esta registrado</Typography>
        <TextField
          fullWidth
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }} disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </Box>
      {message && <Alert sx={{ mt: 2 }} severity={typeMessage}>{message}</Alert>}
    </CardContent >
  );
};

export default ForgotPassword;

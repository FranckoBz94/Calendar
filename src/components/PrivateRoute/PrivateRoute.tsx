import React, { useEffect, ReactElement, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "components/UserProvider";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import ResetPassword from "pages/ResetPassword";

function parseJwt(token: string): any {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
	return JSON.parse(jsonPayload);
}

interface PrivateRouteProps {
	element: ReactElement;
}

const CardComponentView = ({ children }: { children: React.ReactNode }) => (
	<Grid container>
		<Grid item xs={12}>
			<Card>
				<CardContent>
					{children}
				</CardContent>
			</Card>
		</Grid>
	</Grid>
);

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const tokenFromLocalStorage = localStorage.getItem('token');
	const tokenExistAndStillValid = tokenFromLocalStorage && parseJwt(tokenFromLocalStorage).exp * 1000 > Date.now();
	const isLoginRoute = location.pathname === '/login';
	const isResetPasswordRoute = location.pathname === '/reset-password';
	const { setUser } = useUser();

	const [message, setMessage] = useState('');

	useEffect(() => {
		if (!tokenExistAndStillValid) {
			// Si no hay token válido y no estamos en la ruta de login
			if (!isLoginRoute && !isResetPasswordRoute) {
				alert("Sesión expirada, inicie sesión nuevamente.");
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				setUser(null);
				navigate('/login');
			}
		} else if (tokenExistAndStillValid && isLoginRoute) {
			// Si estamos autenticados y en la ruta de login, redirigir a la home
			navigate('/');
		} else if (tokenExistAndStillValid && isResetPasswordRoute) {
			// Si estamos autenticados y en la ruta de reset, mostrar mensaje
			setMessage('Debes cerrar sesión y volver a entrar al link para restablecer tu contraseña.');
		}
	}, [tokenExistAndStillValid, isLoginRoute, isResetPasswordRoute, navigate, setUser]);

	// Si estamos en la ruta de reset y hay un token válido, mostrar solo el mensaje
	if (isResetPasswordRoute) {
		return (
			<CardComponentView>
				<Typography display="flex" justifyContent="center" variant="body2" color="error" sx={{ m: 0 }}>
					{message}
				</Typography>
				{!tokenExistAndStillValid && isResetPasswordRoute && (
					<ResetPassword />
				)
				}
			</CardComponentView>
		);
	}

	// Si no hay token válido y no estamos en login, no renderizar nada
	if (!tokenExistAndStillValid && !isLoginRoute) {
		return null;
	}

	// Renderizar el componente normalmente
	return element;
};

export default PrivateRoute;

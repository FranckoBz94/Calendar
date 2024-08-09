import React, { useEffect, ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "components/UserProvider";

function parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

interface PrivateRouteProps {
    element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const tokenFromLocalStorage = localStorage.getItem('token');
    const tokenExistAndStillValid = tokenFromLocalStorage && parseJwt(tokenFromLocalStorage).exp * 1000 > Date.now();
    const isLoginRoute = location.pathname === '/login';
    const { setUser } = useUser();

    useEffect(() => {
        if (!tokenExistAndStillValid && !isLoginRoute) {
            alert("Sesión expirada, inicie sesión nuevamente.");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            navigate('/login');
        } else if (tokenExistAndStillValid && isLoginRoute) {
            navigate('/');
        }
    }, [tokenExistAndStillValid, isLoginRoute, navigate, setUser]);

    if (!tokenExistAndStillValid && !isLoginRoute) {
        return null;
    }

    return element;
};

export default PrivateRoute;

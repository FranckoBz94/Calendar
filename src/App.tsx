import { Provider } from "react-redux"
import store from "redux/store"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Clients from "pages/Clients"
import Users from "pages/Users"
import Services from "pages/Services"
import MyCalendar from "pages/Calendar"
import Barbers from "pages/Barbers"
import InactivePeriod from "pages/InactivePeriod"
import Profits from "pages/Profits"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "pages/Profile"
import Login from "pages/Login"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from "react"

function parseJwt(token: any) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}



const PrivateRoute = ({ element, ...rest }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tokenFromLocalStorage = localStorage.getItem('token');
  const tokenExistAndStillValid = tokenFromLocalStorage && parseJwt(tokenFromLocalStorage).exp * 1000 > Date.now();
  const isLoginRoute = location.pathname === '/login';
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!tokenExistAndStillValid && !isLoginRoute) {
      setShouldRedirect(true);
      navigate('/login');
      alert("Sesión expirada, inicie sesión nuevamente.");
    } else if (tokenExistAndStillValid && isLoginRoute) {
      navigate('/');
    }
  }, [tokenExistAndStillValid, isLoginRoute, navigate]);

  return !shouldRedirect && element;
}

const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute element={<MyCalendar />} />
            }
          />
          <Route
            path="/clients"
            element={
              <PrivateRoute element={<Clients />} />
            }
          />
          <Route
            path="/services"
            element={
              <PrivateRoute element={<Services />} />
            }
          />
          <Route
            path="/usuarios"
            element={
              <PrivateRoute element={<Users />} />
            }
          />
          <Route
            path="/barbers"
            element={
              <PrivateRoute element={<Barbers />} />
            }
          />
          <Route
            path="/profits"
            element={
              <PrivateRoute element={<Profits />} />
            }
          />
          <Route
            path="/inactive"
            element={
              <PrivateRoute element={<InactivePeriod />} />
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute element={<Profile />} />
            }
          />
          <Route path="/login" element={
            <PrivateRoute element={<Login />} />
          } />
        </Routes>
      </ThemeProvider>
    </Provider>
  )
}

export default App

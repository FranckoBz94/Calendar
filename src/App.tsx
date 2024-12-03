import { Provider } from "react-redux"
import store from "redux/store"
import { Route, Routes } from "react-router-dom"
import Clients from "pages/Clients"
import Users from "pages/Users"
import Services from "pages/Services"
import MyCalendar from "pages/Calendar"
import CalendarCopy from "pages/Calendar/CalendarCopy"
import Barbers from "pages/Barbers"
import InactivePeriod from "pages/InactivePeriod"
import Profits from "pages/Profits"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "pages/Profile"
import Login from "pages/Login"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dashboard from "pages/Dashboard"
import PrivateRoute from "components/PrivateRoute"
import ResetPassword from "pages/ResetPassword"

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
            path="/CalendarCopy"
            element={
              <PrivateRoute element={<CalendarCopy />} />
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
          <Route
            path="/data"
            element={
              <PrivateRoute element={<Dashboard />} />
            }
          />
          <Route path="/login" element={
            <PrivateRoute element={<Login />} />
          } />
          <Route path="/reset-password" element={
            <PrivateRoute element={<ResetPassword />} />
          } />
          {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        </Routes>
      </ThemeProvider>
    </Provider>
  )
}

export default App

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useUser, UserProvider } from "components/UserProvider"
import { AppBarComponent } from "pages/AppBar/AppBar"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import 'dayjs/locale/es';
import dayjs from "dayjs"
import { Provider } from "react-redux"
import store from "redux/store"
import Landing from "pages/Landing"
// import { UserProvider } from "components/UserProvider"

dayjs.locale('es');


const darkTheme = createTheme({
  palette: {
    mode: "light"
  }
})

const RootComponent = () => {
  const { user } = useUser();
  const location = useLocation();

  const isLandingPage = location.pathname === "/landing";

  return (
    <>
      {!isLandingPage && user ? (
        <AppBarComponent>
          <App />
        </AppBarComponent>
      ) : (
        <App />
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// const landing = false

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/landing" element={<Landing />} />
              <Route path="*" element={<RootComponent />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

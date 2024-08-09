import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { UserProvider, useUser } from "components/UserProvider"
import { AppBarComponent } from "pages/AppBar/AppBar"
import { BrowserRouter } from "react-router-dom"
import 'dayjs/locale/es'; // Importa el locale en español
import dayjs from "dayjs"
import Landing from "pages/Landing"

dayjs.locale('es');


const darkTheme = createTheme({
  palette: {
    mode: "light"
  }
})

const RootComponent = () => {
  const { user } = useUser();
  return (
    <BrowserRouter>
      {user ? (
        <AppBarComponent>
          <App />
        </AppBarComponent>
      ) : (
        <App />
      )}
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const landing = true
root.render(
  <React.StrictMode>
    {landing ? (
      <div>
        <Landing />
      </div>
    ) : (

      <UserProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <RootComponent />
        </ThemeProvider>
      </UserProvider>
    )}
  </React.StrictMode>
);

reportWebVitals();

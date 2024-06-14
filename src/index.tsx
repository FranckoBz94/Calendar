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

const darkTheme = createTheme({
  palette: {
    mode: "light"
  }
})

const RootComponent = () => {
  const { user } = useUser();
  console.log("u", user)
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

root.render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RootComponent />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();

import React from "react"
import { Provider } from "react-redux"
import store, { persistor } from "redux/store"
import { PersistGate } from "redux-persist/lib/integration/react"
import MuiThemeProvider from "theme"
import Home from "pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Clients from "pages/Clients"
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/clients" element={<Clients />}></Route>
              <Route path="/services" element={<Home />}></Route>
            </Routes>
          </BrowserRouter>
        </MuiThemeProvider>
        {/* <Home /> */}
      </PersistGate>
    </Provider>
  )
}

export default App

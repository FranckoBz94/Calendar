import React from "react"
import { Provider } from "react-redux"
import store from "redux/store"
import Home from "pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Clients from "pages/Clients"
import Users from "pages/Users"
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/clients" element={<Clients />}></Route>
          <Route path="/services" element={<Home />}></Route>
          <Route path="/usuarios" element={<Users />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App

import React from "react"
import { Provider } from "react-redux"
import store from "redux/store"
// import Home from "pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Clients from "pages/Clients"
import Users from "pages/Users"
import Services from "pages/Services"
import MyCalendar from "pages/Calendar"

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyCalendar />}></Route>
          <Route path="/clients" element={<Clients />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/usuarios" element={<Users />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App

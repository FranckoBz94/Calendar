import React from "react"
import { Provider } from "react-redux"
import store from "redux/store"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Clients from "pages/Clients"
import Users from "pages/Users"
import Services from "pages/Services"
import MyCalendar from "pages/Calendar"
import Barbers from "pages/Barbers"
import InactivePeriod from "pages/InactivePeriod"

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyCalendar />}></Route>
          <Route path="/clients" element={<Clients />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/usuarios" element={<Users />}></Route>
          <Route path="/barbers" element={<Barbers />}></Route>
          <Route path="/inactive" element={<InactivePeriod />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App

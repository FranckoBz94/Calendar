import React from "react"
import { Provider } from "react-redux"
import Home from "pages/Home"
import store, { persistor } from "redux/store"
import { PersistGate } from "redux-persist/lib/integration/react"

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  )
}

export default App

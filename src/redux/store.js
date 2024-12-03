// import { applyMiddleware } from "redux"
// import reducers from "./reducers/index"
// import reduxThunk from "redux-thunk"
// import { composeWithDevTools } from "redux-devtools-extension"
// import { configureStore } from "@reduxjs/toolkit"

// const middlewares = [reduxThunk]
// const store = configureStore(
//   { reducer: reducers },
//   composeWithDevTools(applyMiddleware(...middlewares))
// )

// export default store

import { configureStore } from "@reduxjs/toolkit"
import reducers from "./reducers/index"
import reduxThunk from "redux-thunk"

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxThunk),
  devTools: process.env.NODE_ENV !== "production"
})

export default store

import { applyMiddleware } from "redux"
import reducer from "./reducers/index"
import reduxThunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { configureStore } from "@reduxjs/toolkit"

const middlewares = [reduxThunk]
const store = configureStore(
  { reducer },
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store

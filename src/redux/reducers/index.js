import { combineReducers } from "redux"
import {
  berberReducer,
  clientsReducer,
  hoursReducer,
  serviceReducer,
  turnReducer,
  usersReducer
} from "./appReducers"
import themeReducer from "./themeReducer"

const reducers = combineReducers({
  theme: themeReducer,
  users: usersReducer,
  clients: clientsReducer,
  services: serviceReducer,
  barbers: berberReducer,
  turns: turnReducer,
  hours: hoursReducer
})

export default reducers

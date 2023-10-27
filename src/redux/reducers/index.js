import { combineReducers } from "redux"
import {
  berberReducer,
  clientsReducer,
  hoursReducer,
  serviceReducer,
  turnReducer,
  usersReducer
} from "./appReducers"

const reducers = combineReducers({
  users: usersReducer,
  clients: clientsReducer,
  services: serviceReducer,
  barbers: berberReducer,
  turns: turnReducer,
  hours: hoursReducer
})

export default reducers

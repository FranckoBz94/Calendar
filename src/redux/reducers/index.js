import { combineReducers } from "redux"
import {
  berberReducer,
  clientsReducer,
  serviceReducer,
  usersReducer
} from "./appReducers"

const reducers = combineReducers({
  users: usersReducer,
  clients: clientsReducer,
  services: serviceReducer,
  barbers: berberReducer
})

export default reducers

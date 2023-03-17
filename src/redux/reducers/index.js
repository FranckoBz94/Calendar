import { combineReducers } from "redux"
import { usersReducer } from "./appReducers"

const reducer = combineReducers({
  accessToken: null,
  users: usersReducer
})

export default reducer

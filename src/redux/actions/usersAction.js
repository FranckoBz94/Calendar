import axios from "axios"
import { usersTypes } from "../contants/action-types"

const ruta = "http://localhost:4000/api/"
export const getUsers = (users) => {
  return {
    type: usersTypes.GET_USERS,
    payload: users
  }
}

export const getAllUsers = () => {
  return function (dispatch) {
    try {
      axios
        .get(ruta + "users/")
        .then((response) => {
          dispatch(getUsers(response.data))
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }
}

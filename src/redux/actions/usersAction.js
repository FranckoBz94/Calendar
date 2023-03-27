import axios from "axios"
import { usersTypes } from "../contants/action-types"

const ruta = "http://localhost:4000/api/"

export const getUsers = (users) => {
  return {
    type: usersTypes.GET_USERS,
    payload: users
  }
}

export const setAddUser = () => {
  return {
    type: usersTypes.ADD_USER
  }
}

export const setUpdateUser = () => {
  return {
    type: usersTypes.UPDATE_USER
  }
}

export const setRemoveUser = () => {
  return {
    type: usersTypes.REMOVE_SELECTED_USER
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

export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post(ruta + "users/", user)
      .then((response) => {
        if (response.data.message === "1") {
          dispatch(setAddUser())
          dispatch(getAllUsers())
        }
      })
      .catch((error) => console.error(error))
  }
}

export const updateUser = (data, id) => {
  console.log(ruta + "users/" + id)
  return function (dispatch) {
    try {
      axios
        .put(ruta + "users/" + id, data)
        .then((response) => {
          dispatch(setUpdateUser())
          dispatch(getAllUsers())
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeUser = (id) => {
   async function (dispatch) {
    await axios
      .delete(ruta + "users/" + id)
      .then((response) => {
        dispatch(setRemoveUser())
        dispatch(getAllUsers())
        return response
        // if (response.data.affectedRows === 1) {
        //   console.log("true")
        //   return true
        // } else {
        //   console.log("false")
        //   return false
        // }
      })
      .catch((error) => console.error(error))
  }
}

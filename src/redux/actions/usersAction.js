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

export const addUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post(ruta + "users/", user)
    dispatch(setAddUser())
    dispatch(getAllUsers())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const updateUser = (data, id) => async (dispatch) => {
  try {
    const response = await axios.put(ruta + "users/" + id, data)
    dispatch(setUpdateUser())
    dispatch(getAllUsers())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const removeUser = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${ruta}users/${id}`)
    dispatch(setRemoveUser())
    dispatch(getAllUsers())
    return response.data
  } catch (error) {
    console.error(error)
  }
}

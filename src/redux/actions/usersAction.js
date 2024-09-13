import axios from "axios"
import { usersTypes } from "../contants/action-types"

// const ruta = "http://localhost:4000/api/"
const ruta = process.env.REACT_APP_URL_API + "/"

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

export const getMyUser = (id) => {
  return async function () {
    try {
      const response = await axios.get(`${ruta}users/myprofile/${id}`)
      return response.data[0]
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export const addUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(ruta + "users/", formData, {
      headers: {
        "Content-Type": "multipart/form-data" // Importante para la carga de archivos
      }
    })
    dispatch(setAddUser())
    dispatch(getAllUsers())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const updateUser = (formData, id) => async (dispatch) => {
  try {
    const response = await axios.put(ruta + "users/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    dispatch(setUpdateUser())
    dispatch(getAllUsers())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const updateStateUser = (id, data) => async (dispatch) => {
  try {
    const response = await axios.put(
      ruta + "users/updateStateBarber/" + id,
      data
    )
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

export const loginUser = (dataUser) => async () => {
  console.log(dataUser)
  try {
    const response = await axios.post(ruta + "users/login", dataUser)
    return response.data
  } catch (err) {
    return { rta: -1, message: "Ocurrio un errorrr." + err }
    // console.log(err)
  }
}

export const dataGraphics =
  (idBarber, formattedStartDate, formattedEndDate) => async () => {
    try {
      const response = await axios.post(ruta + "users/dataGraphics", {
        id: idBarber,
        formattedStartDate,
        formattedEndDate
      })
      return response.data
    } catch (err) {
      return { rta: -1, message: "Ocurrio un errorrr." + err }
    }
  }

export const countTurnsGraphics =
  (idBarber, formattedStartDate, formattedEndDate) => async () => {
    try {
      const response = await axios.post(ruta + "users/countTurnsGraphics", {
        id: idBarber,
        formattedStartDate,
        formattedEndDate
      })
      return response.data
    } catch (err) {
      return { rta: -1, message: "Ocurrio un errorrr." + err }
    }
  }

export const getTurnsDayWeek =
  (idBarber, formattedStartDate, formattedEndDate) => async () => {
    try {
      const response = await axios.post(ruta + "users/getTurnsDayWeek", {
        id: idBarber,
        formattedStartDate,
        formattedEndDate
      })
      return response.data
    } catch (err) {
      return { rta: -1, message: "Ocurrio un errorrr." + err }
    }
  }

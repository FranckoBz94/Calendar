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

export const setUpdateUser = (idUser) => {
  return {
    type: usersTypes.UPDATE_USER,
    payload: idUser
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
  console.log("formData", formData)
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
    dispatch(setUpdateUser(id))
    dispatch(getAllUsers())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const updateStateUser = (id, isBarber) => async (dispatch) => {
  console.log("data deberia venir 0 es:", isBarber)
  console.log("id deberia venir 0 es:", id)
  try {
    const response = await axios.put(ruta + "users/updateStateBarber/" + id, {
      isBarber
    })
    dispatch(setUpdateUser(id))
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
  console.log("dataUser", dataUser)
  try {
    const response = await axios.post(ruta + "users/login", dataUser)
    console.log("res", response)
    return response.data
  } catch (err) {
    return { rta: -1, message: "Ocurrio un errorrr." + err }
    // console.log(err)
  }
}

export const forgotPassword = (email) => async () => {
  console.log(email)
  try {
    const response = await axios.post(ruta + "users/forgot-password", email)
    if (response.status === 200) {
      return response.data // Retorna los datos en caso de éxito
    } else {
      return {
        success: false,
        message: response.data.message || "Error desconocido."
      }
    }
  } catch (err) {
    // Captura errores de la solicitud (no códigos de estado)
    return {
      success: false,
      message:
        "Ocurrió un error: " +
        (err.response ? err.response.data.message : err.message)
    }
  }
}

export const resetPassword = (dataPassword) => async () => {
  try {
    const response = await axios.post(
      ruta + "users/reset-password",
      dataPassword
    )
    return response.data
  } catch (err) {
    return { rta: -1, message: "Ocurrio un errorrr." + err }
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

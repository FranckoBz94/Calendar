import axios from "axios"
import { clientsTypes } from "../contants/action-types"

const ruta = "http://localhost:4000/api/"

export const getClients = (clients) => {
  return {
    type: clientsTypes.GET_CLIENTS,
    payload: clients
  }
}

export const setAddClient = () => {
  return {
    type: clientsTypes.ADD_CLIENT
  }
}

export const setUpdateClient = () => {
  return {
    type: clientsTypes.UPDATE_CLIENT
  }
}

export const setRemoveClient = () => {
  return {
    type: clientsTypes.REMOVE_SELECTED_CLIENT
  }
}

export const getAllClients = () => {
  return function (dispatch) {
    try {
      axios
        .get(ruta + "clients/")
        .then((response) => {
          dispatch(getClients(response.data))
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addClient = (user) => async (dispatch) => {
  try {
    console.log(user)
    const response = await axios.post(ruta + "clients/", user)
    dispatch(setAddClient())
    dispatch(getAllClients())
    return response.data
  } catch (err) {
    return { rta: -1, message: "Ocurrio un errorrr." }
    // console.log(err)
  }
}

export const updateClient = (data, id) => async (dispatch) => {
  try {
    const response = await axios.put(ruta + "clients/" + id, data)
    dispatch(setUpdateClient())
    dispatch(getAllClients())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const removeClient = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${ruta}clients/${id}`)
    dispatch(setRemoveClient())
    dispatch(getAllClients())
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const fetchClientData = (dni) => async (dispatch) => {
  try {
    console.log(dni)
    const response = await axios.post(ruta + "clients/fetchClientData", dni)
    return response.data
  } catch (err) {
    return { rta: -1, message: "Ocurrio un errorrr." }
    // console.log(err)
  }
}

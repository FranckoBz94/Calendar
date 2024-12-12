import axios from "axios"
import { servicesTypes } from "../contants/action-types"

// const ruta = "http://localhost:4000/api/services/"
const ruta = process.env.REACT_APP_URL_API + "/services/"

export const getServices = (service) => {
  return {
    type: servicesTypes.GET_SERVICES,
    payload: service
  }
}

export const setAddService = () => {
  return {
    type: servicesTypes.ADD_SERVICE
  }
}

export const setUpdateService = (service) => {
  return {
    type: servicesTypes.UPDATE_SERVICE,
    payload: service
  }
}

export const setRemoveService = (id) => {
  return {
    type: servicesTypes.REMOVE_SELECTED_SERVICE,
    payload: id
  }
}

export const getAllServices = () => {
  return function (dispatch) {
    try {
      axios
        .get(ruta)
        .then((response) => {
          dispatch(getServices(response.data))
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addService = (user) => async (dispatch) => {
  try {
    const response = await axios.post(ruta, user)
    dispatch(setAddService())
    dispatch(getAllServices())
    return response.data
  } catch (err) {
    return { rta: -1, message: "Ocurrio un errorrr." }
    // console.log(err)
  }
}

export const updateService = (data, id) => async (dispatch) => {
  try {
    const response = await axios.put(ruta + id, data)
    dispatch(setUpdateService(data))
    dispatch(getAllServices())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const removeService = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${ruta}${id}`)
    dispatch(setRemoveService(id))
    dispatch(getAllServices())
    return response.data
  } catch (error) {
    console.error(error)
  }
}

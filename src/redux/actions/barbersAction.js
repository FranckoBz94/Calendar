import axios from "axios"
import { barbersTypes } from "../contants/action-types"

// const ruta = "http://localhost:4000/api/"
const ruta = process.env.REACT_APP_URL_API + "/"

export const getBarbers = (barber) => {
  return {
    type: barbersTypes.GET_BARBERS,
    payload: barber
  }
}

export const setAddBarber = () => {
  return {
    type: barbersTypes.ADD_BARBER
  }
}

export const setUpdateBarber = (idBarber) => {
  return {
    type: barbersTypes.UPDATE_BARBER,
    payload: idBarber
  }
}

export const setRemoveBarber = (id) => {
  return {
    type: barbersTypes.REMOVE_SELECTED_BERBER,
    payload: id
  }
}

export const getAllBarbers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(ruta + "barbers/")
      dispatch(getBarbers(response.data))
    } catch (error) {
      console.error("Error fetching barbers:", error)
    }
  }
}

export const addBarber = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(ruta + "barbers/", formData, {
      headers: {
        "Content-Type": "multipart/form-data" // Importante para la carga de archivos
      }
    })
    dispatch(setAddBarber())
    dispatch(getAllBarbers())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const updateBarber = (formData, id) => async (dispatch) => {
  try {
    const response = await axios.put(ruta + "barbers/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data" // Importante para la carga de archivos
      }
    })
    dispatch(setUpdateBarber(id))
    dispatch(getAllBarbers())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const removeBarber = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${ruta}barbers/${id}`)
    dispatch(setRemoveBarber(id))
    dispatch(getAllBarbers())
    return response.data
  } catch (error) {
    console.error(error)
  }
}

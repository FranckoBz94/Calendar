import axios from "axios"
import { barbersTypes } from "../contants/action-types"

const ruta = "http://localhost:4000/api/"

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

export const setUpdateBarber = () => {
  return {
    type: barbersTypes.UPDATE_BARBER
  }
}

export const setRemoveBarber = () => {
  return {
    type: barbersTypes.REMOVE_SELECTED_BERBER
  }
}

export const getAllBarbers = () => {
  return function (dispatch) {
    try {
      axios
        .get(ruta + "barbers/")
        .then((response) => {
          dispatch(getBarbers(response.data))
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addBarber = (barber) => async (dispatch) => {
  try {
    const response = await axios.post(ruta + "barbers/", barber)
    dispatch(setAddBarber())
    dispatch(getAllBarbers())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const updateBarber = (data, id) => async (dispatch) => {
  try {
    const response = await axios.put(ruta + "barbers/" + id, data)
    dispatch(setUpdateBarber())
    dispatch(getAllBarbers())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const removeBarber = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${ruta}barbers/${id}`)
    dispatch(setRemoveBarber())
    dispatch(getAllBarbers())
    return response.data
  } catch (error) {
    console.error(error)
  }
}

import axios from "axios"
import { hoursTypes, daysTypes } from "../contants/action-types"

// const ruta = "http://localhost:4000/api/"
const ruta = process.env.REACT_APP_URL_API + "/"

export const getHours = (hours) => {
  return {
    type: hoursTypes.GET_HOURS,
    payload: hours
  }
}

export const setUpdatHours = (data) => {
  return {
    type: hoursTypes.UPDATE_HOURS,
    payload: data
  }
}

export const getDays = (days) => {
  return {
    type: daysTypes.GET_DAYS,
    payload: days
  }
}

export const setUpdatDays = () => {
  return {
    type: daysTypes.UPDATE_DAYS
  }
}

export const getAllHours = () => {
  return function (dispatch) {
    try {
      axios
        .get(ruta + "hours/")
        .then((response) => {
          dispatch(getHours(response.data[0]))
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getAllDays = () => {
  return function (dispatch) {
    try {
      axios
        .get(ruta + "hours/days")
        .then((response) => {
          dispatch(getDays(response.data))
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateHours = (data, id) => async (dispatch) => {
  try {
    console.log("action id", id)
    console.log("action data", data)
    const response = await axios.put(ruta + "hours/" + id, data)
    dispatch(setUpdatHours(data))
    dispatch(getAllHours())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const updateDataDays = (data) => async (dispatch) => {
  try {
    console.log("da", data)
    const response = await axios.post(ruta + "hours/update-days", data)
    dispatch(setUpdatDays())
    dispatch(getAllDays())
    console.log("response", response)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

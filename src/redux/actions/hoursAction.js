import axios from "axios"
import { hoursTypes } from "../contants/action-types"

// const ruta = "http://localhost:4000/api/"
const ruta = process.env.REACT_APP_URL_API + "/"

export const getHours = (hours) => {
  return {
    type: hoursTypes.GET_HOURS,
    payload: hours
  }
}

export const setUpdatHours = () => {
  return {
    type: hoursTypes.UPDATE_HOURS
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

export const updateHours = (data, id) => async (dispatch) => {
  try {
    const response = await axios.put(ruta + "hours/" + id, data)
    dispatch(setUpdatHours())
    dispatch(getAllHours())
    return response.data
  } catch (err) {
    console.log(err)
  }
}

import axios from "axios"
import { turnsTypes } from "../contants/action-types"

const ruta = "http://localhost:4000/api/"

export const getTurns = (turns) => {
  return {
    type: turnsTypes.GET_TURNS,
    payload: turns
  }
}

export const setAddTurn = () => {
  return {
    type: turnsTypes.ADD_TURN
  }
}

export const setUpdateTurn = () => {
  return {
    type: turnsTypes.UPDATE_TURN
  }
}

export const setRemoveTurn = () => {
  return {
    type: turnsTypes.REMOVE_SELECTED_TURN
  }
}

export const getAllTurns = (idBarber) => async (dispatch) => {
  try {
    axios
      .get(ruta + "turns/" + idBarber)
      .then((response) => {
        dispatch(getTurns(response.data))
      })
      .catch((error) => console.error(error))
  } catch (err) {
    console.log(err)
  }
}

export const addTurn = (dataTurn) => async (dispatch) => {
  try {
    const response = await axios.post(ruta + "turns/", dataTurn)
    dispatch(setAddTurn())
    dispatch(getAllTurns(dataTurn.idBarber))
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const updateTurn = (data, id) => async (dispatch) => {
  try {
    const response = await axios.put(ruta + "turns/" + id, data)
    dispatch(setUpdateTurn())
    dispatch(getAllTurns(data.idBarber))
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const removeTurn = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${ruta}turns/${id}`)
    dispatch(setRemoveTurn())
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const nextTurnAvailable = (data) => async () => {
  try {
    const response = await axios.post(ruta + "turns/availableTurn", data)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

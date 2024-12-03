import axios from "axios"
import { turnsTypes } from "../contants/action-types"

// const ruta = "http://localhost:4000/api/"
const ruta = process.env.REACT_APP_URL_API + "/"

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

export const setUpdateTurn = (idTurn) => {
  return {
    type: turnsTypes.UPDATE_TURN,
    payload: idTurn
  }
}

export const setRemoveTurn = (id) => {
  return {
    type: turnsTypes.REMOVE_SELECTED_TURN,
    payload: id
  }
}

export const getAllTurns = (idBarber) => async (dispatch) => {
  try {
    const response = await axios.get(ruta + "turns/" + idBarber)
    console.log("turnos action", response)
    dispatch(getTurns(response.data))
  } catch (error) {
    console.error("Error fetching turns:", error)
    throw new Error(error.response ? error.response.data : "Error de conexión") // Propagate the error with a message
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
    dispatch(setUpdateTurn(id))
    dispatch(getAllTurns(data.idBarber))
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const removeTurn = (id) => async (dispatch) => {
  console.log("id turnoooo", id)
  try {
    const response = await axios.delete(`${ruta}turns/${id}`)
    dispatch(setRemoveTurn(id))
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

export const hoursAvailableOnSave = (data) => async () => {
  try {
    const response = await axios.post(ruta + "turns/availableHoursOnSave", data)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const availableDate = (data) => async () => {
  try {
    const response = await axios.post(ruta + "turns/availableDate", data)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const searchTurnsProfits = (data) => async () => {
  try {
    const response = await axios.post(ruta + "turns/searchTurnsProfits", data)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const turnsDayAvailable = (data) => async () => {
  try {
    const response = await axios.post(ruta + "turns/turnsDayAvailable", data)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const sendMail = (data) => async () => {
  try {
    const response = await axios.post(ruta + "turns/sendEmailForClient", data)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

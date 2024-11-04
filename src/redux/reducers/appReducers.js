import {
  clientsTypes,
  usersTypes,
  servicesTypes,
  barbersTypes,
  turnsTypes,
  hoursTypes,
  daysTypes
} from "../contants/action-types"

const initialState = {
  users: [],
  dataGraphics: [],
  clients: [],
  services: [],
  barbers: [],
  turns: [],
  hours: [],
  days: [],
  isLoadingUsers: false
}

export const usersReducer = (state = initialState.users, { type, payload }) => {
  switch (type) {
    case usersTypes.GET_USERS:
      return { ...state, users: payload }
    case usersTypes.REMOVE_SELECTED_USER:
      return { ...state }
    case usersTypes.ADD_USER:
      return { ...state }
    case usersTypes.UPDATE_USER:
      return { ...state, users: payload }
    default:
      return state
  }
}

export const clientsReducer = (
  state = initialState.clients,
  { type, payload }
) => {
  switch (type) {
    case clientsTypes.GET_CLIENTS:
      return { ...state, clients: payload }
    case clientsTypes.REMOVE_SELECTED_CLIENT:
      return { ...state }
    case clientsTypes.ADD_CLIENT:
      return { ...state }
    case clientsTypes.UPDATE_CLIENT:
      return { ...state, clients: payload }
    default:
      return state
  }
}

export const serviceReducer = (
  state = initialState.services,
  { type, payload }
) => {
  switch (type) {
    case servicesTypes.GET_SERVICES:
      return { ...state, services: payload }
    case servicesTypes.REMOVE_SELECTED_SERVICE:
      return { ...state }
    case servicesTypes.ADD_SERVICE:
      return { ...state }
    case servicesTypes.UPDATE_SERVICE:
      return { ...state, services: payload }
    default:
      return state
  }
}

export const berberReducer = (
  state = initialState.barbers,
  { type, payload }
) => {
  switch (type) {
    case barbersTypes.GET_BARBERS:
      return { ...state, barbers: payload }
    case barbersTypes.REMOVE_SELECTED_BERBER:
      return { ...state }
    case barbersTypes.ADD_BARBER:
      return { ...state }
    case barbersTypes.UPDATE_BARBER:
      return { ...state, barbers: payload }
    default:
      return state
  }
}

export const turnReducer = (state = initialState.turns, { type, payload }) => {
  switch (type) {
    case turnsTypes.GET_TURNS:
      return { ...state, turns: payload }
    case turnsTypes.REMOVE_SELECTED_TURN:
      return { ...state }
    case turnsTypes.ADD_TURN:
      return { ...state }
    case turnsTypes.UPDATE_TURN:
      return { ...state, turns: payload }
    default:
      return state
  }
}

export const hoursReducer = (state = initialState.hours, { type, payload }) => {
  switch (type) {
    case hoursTypes.GET_HOURS:
      return { ...state, hours: payload }
    case hoursTypes.UPDATE_HOURS:
      return { ...state, hours: payload }
    default:
      return state
  }
}

export const daysReducer = (state = initialState.days, { type, payload }) => {
  switch (type) {
    case daysTypes.GET_DAYS:
      return { ...state, days: payload }
    case daysTypes.UPDATE_DAYS:
      return { ...state, days: payload }
    default:
      return state
  }
}

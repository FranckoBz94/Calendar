import {
  clientsTypes,
  usersTypes,
  servicesTypes,
  barbersTypes
} from "../contants/action-types"

const initialState = {
  users: [],
  clients: [],
  services: [],
  barbers: [],
  isLoadingUsers: false
}

export const usersReducer = (state = initialState, { type, payload }) => {
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

export const clientsReducer = (state = initialState, { type, payload }) => {
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

export const serviceReducer = (state = initialState, { type, payload }) => {
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

export const berberReducer = (state = initialState, { type, payload }) => {
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

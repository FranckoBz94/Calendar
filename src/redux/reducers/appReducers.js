// import {
//   clientsTypes,
//   usersTypes,
//   servicesTypes,
//   barbersTypes,
//   turnsTypes,
//   hoursTypes,
//   daysTypes
// } from "../contants/action-types"

// const initialState = {
//   users: [],
//   dataGraphics: [],
//   clients: [],
//   services: [],
//   barbers: [],
//   turns: [],
//   hours: [],
//   days: [],
//   isLoadingUsers: false
// }

// export const usersReducer = (state = initialState.users, { type, payload }) => {
//   switch (type) {
//     case usersTypes.GET_USERS:
//       return { ...state, users: payload }
//     case usersTypes.REMOVE_SELECTED_USER:
//       return { ...state }
//     case usersTypes.ADD_USER:
//       return { ...state }
//     case usersTypes.UPDATE_USER:
//       return { ...state, users: payload }
//     default:
//       return state
//   }
// }

// export const clientsReducer = (
//   state = initialState.clients,
//   { type, payload }
// ) => {
//   switch (type) {
//     case clientsTypes.GET_CLIENTS:
//       return { ...state, clients: payload }
//     case clientsTypes.REMOVE_SELECTED_CLIENT:
//       return { ...state }
//     case clientsTypes.ADD_CLIENT:
//       return { ...state }
//     case clientsTypes.UPDATE_CLIENT:
//       return { ...state, clients: payload }
//     default:
//       return state
//   }
// }

// export const serviceReducer = (
//   state = initialState.services,
//   { type, payload }
// ) => {
//   switch (type) {
//     case servicesTypes.GET_SERVICES:
//       return { ...state, services: payload }
//     case servicesTypes.REMOVE_SELECTED_SERVICE:
//       return { ...state }
//     case servicesTypes.ADD_SERVICE:
//       return { ...state }
//     case servicesTypes.UPDATE_SERVICE:
//       return { ...state, services: payload }
//     default:
//       return state
//   }
// }

// export const berberReducer = (
//   state = initialState.barbers,
//   { type, payload }
// ) => {
//   switch (type) {
//     case barbersTypes.GET_BARBERS:
//       return { ...state, barbers: payload }
//     case barbersTypes.REMOVE_SELECTED_BERBER:
//       return { ...state }
//     case barbersTypes.ADD_BARBER:
//       return { ...state }
//     case barbersTypes.UPDATE_BARBER:
//       return { ...state, barbers: payload }
//     default:
//       return state
//   }
// }

// export const turnReducer = (state = initialState.turns, { type, payload }) => {
//   switch (type) {
//     case turnsTypes.GET_TURNS:
//       return { ...state, turns: payload }
//     case turnsTypes.REMOVE_SELECTED_TURN:
//       return { ...state }
//     case turnsTypes.ADD_TURN:
//       return { ...state }
//     case turnsTypes.UPDATE_TURN:
//       return { ...state, turns: payload }
//     default:
//       return state
//   }
// }

// export const hoursReducer = (state = initialState.hours, { type, payload }) => {
//   switch (type) {
//     case hoursTypes.GET_HOURS:
//       return { ...state, hours: payload }
//     case hoursTypes.UPDATE_HOURS:
//       return { ...state, hours: payload }
//     default:
//       return state
//   }
// }

// export const daysReducer = (state = initialState.days, { type, payload }) => {
//   switch (type) {
//     case daysTypes.GET_DAYS:
//       return { ...state, days: payload }
//     case daysTypes.UPDATE_DAYS:
//       return { ...state, days: payload }
//     default:
//       return state
//   }
// }

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
      return payload
    case usersTypes.REMOVE_SELECTED_USER:
      return state.filter((user) => user.id !== payload)
    case usersTypes.ADD_USER:
      return [...state, payload]
    case usersTypes.UPDATE_USER:
      return state.map((user) => (user.id === payload.id ? payload : user))
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
      return payload
    case clientsTypes.REMOVE_SELECTED_CLIENT:
      return state.filter((client) => client.id !== payload)
    case clientsTypes.ADD_CLIENT:
      return [...state, payload]
    case clientsTypes.UPDATE_CLIENT:
      return state.map((client) =>
        client?.id === payload.id ? payload : client
      )
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
      return payload
    case servicesTypes.REMOVE_SELECTED_SERVICE:
      return state.filter((service) => service.id !== payload.id)
    case servicesTypes.ADD_SERVICE:
      return [...state, payload]
    case servicesTypes.UPDATE_SERVICE:
      return state.map((service) =>
        service.id === payload.id ? payload : service
      )
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
      return payload
    case barbersTypes.REMOVE_SELECTED_BERBER:
      return state.filter((barber) => barber.id !== payload)
    case barbersTypes.ADD_BARBER:
      return [...state]
    case barbersTypes.UPDATE_BARBER:
      return state.map((barber) => (barber.id === payload ? payload : barber))
    default:
      return state
  }
}

export const turnReducer = (state = initialState.turns, { type, payload }) => {
  switch (type) {
    case turnsTypes.GET_TURNS:
      return payload
    case turnsTypes.REMOVE_SELECTED_TURN:
      return state.filter((turn) => turn.id !== payload.id)
    case turnsTypes.ADD_TURN:
      return [...state, payload]
    case turnsTypes.UPDATE_TURN:
      return state.map((turn) => (turn.id === payload.id ? payload : turn))
    default:
      return state
  }
}

export const hoursReducer = (state = initialState.hours, { type, payload }) => {
  switch (type) {
    case hoursTypes.GET_HOURS:
      return payload
    case hoursTypes.UPDATE_HOURS:
      // return state.map((hours) => (hours.id === payload.id ? payload : hours))
      return { ...state, payload }
    default:
      return state
  }
}

export const daysReducer = (state = initialState.days, { type, payload }) => {
  switch (type) {
    case daysTypes.GET_DAYS:
      return payload
    case daysTypes.UPDATE_DAYS:
      return state.map((day) => (day.id === payload.id ? payload : day))
    default:
      return state
  }
}

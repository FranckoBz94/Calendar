import { usersTypes } from "../contants/action-types"

const initialState = {
  users: [],
  isLoadingUsers: false
}

export const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case usersTypes.GET_USERS:
      return { ...state, users: payload }
    // case ActionTypes.REMOVE_SELECTED_PLAYER:
    //   return { ...state }
    // case ActionTypes.ADD_PLAYER:
    //   return { ...state }
    // case ActionTypes.UPDATE_PLAYER:
    //   return { ...state, players: payload }
    default:
      return state
  }
}

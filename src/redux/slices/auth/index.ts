import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import axios from "utils/axios"
import { type AxiosResponse, type AxiosError } from "axios"
import { type Thunk } from "redux/store"

export interface Login {
  email: string
  password: string
}

export interface AuthState {
  accessToken: string | null
  isLoading: boolean
}

const initialState: AuthState = {
  accessToken: null,
  isLoading: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export const { setAccessToken, setIsLoading } = authSlice.actions

export default authSlice.reducer

export const login =
  (data: Login): Thunk =>
  async (dispatch): Promise<AxiosResponse | AxiosError> => {
    dispatch(setIsLoading(true))
    try {
      const response: AxiosResponse = await axios.post("/login", data)
      dispatch(setAccessToken(response.data.token))
      return response
    } catch (err) {
      return err as AxiosError
    } finally {
      dispatch(setIsLoading(false))
    }
  }

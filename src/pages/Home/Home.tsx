import React from "react"
import { useCustomSelector, useCustomDispatch } from "hooks/redux"
import { setAccessToken } from "redux/slices/auth"
const Home = () => {
  const auth = useCustomSelector((state) => state)
  const dispatch = useCustomDispatch()

  console.log(auth)

  const handleLogin = () => {
    dispatch(setAccessToken("addwadwad21d122dd21d212d2d1dd"))
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Home

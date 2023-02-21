import React from "react"
import { useCustomSelector, useCustomDispatch } from "hooks/redux"
import { login } from "redux/slices/auth"

const Home = () => {
  const {
    auth: { accessToken, isLoading }
  } = useCustomSelector((state) => state)
  const dispatch = useCustomDispatch()
  console.log(accessToken)
  console.log(isLoading)

  const handleLogin = (): void => {
    dispatch(
      login({
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      })
    )
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      {isLoading && "Ingresando..."}
    </div>
  )
}

export default Home

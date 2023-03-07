import React from "react"
import { useCustomSelector, useCustomDispatch } from "hooks/redux"
import { login } from "redux/slices/auth"
import { Button, Switch } from "@mui/material"
import { setThemeMode } from "redux/slices/settings"
import { AppBarComponent } from "pages/AppBar/AppBar"
import MotionComponent from "components/MotionComponent"

const Home = () => {
  const {
    auth: { accessToken, isLoading },
    settings: { themeMode }
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

  const handleChangeTheme = () => {
    dispatch(setThemeMode(themeMode === "dark" ? "light" : "dark"))
  }

  return (
    <AppBarComponent>
      <MotionComponent>
        <>
          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Login"}
          </Button>
          <div>
            <p>diivv</p>
            <Switch onChange={handleChangeTheme} />
          </div>
        </>
      </MotionComponent>
    </AppBarComponent>
  )
}

export default Home

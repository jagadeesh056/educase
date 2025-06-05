import { useState, useEffect } from "react"
import styled from "styled-components"
import WelcomeScreen from "./components/WelcomeScreen"
import LoginScreen from "./components/LoginScreen"
import RegisterScreen from "./components/RegisterScreen"
import AccountSettings from "./components/AccountSettings"
import axios from "axios"

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`

const MobileContainer = styled.div`
  width: 100%;
  max-width: 375px;
  min-height: 600px;
  background-color: #F7F8F9;
  border: 1px solid rgb(213, 215, 218);
  overflow: hidden;
  position: relative;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: #666;
`

function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome")
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("popx_token")

    if (token) {
      verifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  let url = "http://localhost:5000/"

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`${url}/api/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        setUser(response.data.user)
        setCurrentScreen("settings")
      } else {
        localStorage.removeItem("popx_token")
        localStorage.removeItem("popx_user")
      }
    } catch (error) {
      localStorage.removeItem("popx_token",error)
      localStorage.removeItem("popx_user")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (userData, token) => {
    setUser(userData)
    localStorage.setItem("popx_token", token)
    localStorage.setItem("popx_user", JSON.stringify(userData))
    setCurrentScreen("settings")
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("popx_token")
    localStorage.removeItem("popx_user")
    setCurrentScreen("welcome")
  }

  if (loading) {
    return (
      <AppContainer>
        <MobileContainer>
          <LoadingContainer>Loading...</LoadingContainer>
        </MobileContainer>
      </AppContainer>
    )
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onNavigate={setCurrentScreen} />
      case "login":
        return <LoginScreen onNavigate={setCurrentScreen} onLogin={handleLogin} />
      case "register":
        return <RegisterScreen onNavigate={setCurrentScreen} onLogin={handleLogin} />
      case "settings":
        return <AccountSettings onNavigate={setCurrentScreen} user={user} onLogout={handleLogout} />
      default:
        return <WelcomeScreen onNavigate={setCurrentScreen} />
    }
  }

  return (
    <AppContainer>
      <MobileContainer>{renderScreen()}</MobileContainer>
    </AppContainer>
  )
}

export default App

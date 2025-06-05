import { useState } from "react"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
  padding: 40px;
  height: 100%;
  min-height: 600px;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.2;
`

const Description = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 40px;
`

const FormGroup = styled.div`
  margin-bottom: 24px;
`

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #6c5ce7;
  margin-bottom: 8px;
  font-weight: 500;
`

const Input = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
  color: #333;
  background: #f8f9fa;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #6c5ce7;
    background: white;
  }

  &::placeholder {
    color: #999;
  }
`

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  background: ${(props) => (props.disabled ? "#b0b0b0" : "linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)")};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.disabled ? "#b0b0b0" : "linear-gradient(135deg, #5a4fcf 0%, #8b7df8 100%)")};
  }
`

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: #6c5ce7;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    text-decoration: underline;
  }
`

function LoginScreen({ onNavigate, onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  let url = "http://localhost:5000"

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await axios.post(`${url}/api/auth/login`, {
        email,
        password,
      })

      if (response.data.success) {
        onLogin(response.data.user, response.data.token)
      } else {
        setError(response.data.error || "Login failed")
      }
    } catch (error) {
      setError(error.response?.data?.error || "Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <BackButton onClick={() => onNavigate("welcome")}>← Back</BackButton>

      <Title>Signin to your PopX account</Title>
      <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Description>

      <FormGroup>
        <Label>Email Address</Label>
        <Input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>

      <LoginButton onClick={handleLogin} disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </LoginButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  )
}

export default LoginScreen

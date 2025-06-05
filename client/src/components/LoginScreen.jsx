import { useState } from "react"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
  padding: 40px 20px;
  height: 100%;
  min-height: 600px;
`

const Title = styled.h1`
  height: 69px;
  width: 188px;
  font-size: 28px;
  font-weight: bold;
  text-align: left;
  font: normal normal medium 28px/36px Rubik;
  letter-spacing: 0px;
  color: #1D2226;
  opacity: 1;
  margin-bottom: 14px;
`

const Description = styled.p`
  height: 48px;
  width: 232pxpx;
  text-align: left;
  font-size: 18px;
  font: normal normal normal 18px/26px Rubik;
  letter-spacing: 0px;
  color: #1D2226;
  opacity: 0.6;
  margin-bottom: 40px;
`

const FormGroup = styled.div`
  margin-bottom: 23px;
`
const InputWrapper = styled.div`
  position: relative;
  width: 335px;
  margin-bottom: 24px;
`

const StyledLabel = styled.label`
  position: absolute;
  top: -8px;
  left: 12px;
  background-color: #f8f9fa;
  padding: 0 4px;
  font-size: 13px;
  color: #6C25FF;
  font-weight: 500;
  z-index: 1;
`

const StyledInput = styled.input`
  width: 335px;
  height: 40px;
  border: 1px solid #CBCBCB;
  border-radius: 6px;
  opacity: 1;
  padding: 0 16px;
  font-size: 16px;
  background: #f8f9fa;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background: white;
  }

  &::placeholder {
    color: #999;
  }
`;


const LoginButton = styled.button`
  width: 335px;
  height: 46px;
  background: #CBCBCB 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: 10px;
`

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`

function LoginScreen({onLogin }) {
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
      <Title>Signin to your <br /> PopX account</Title>
      <Description>Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.</Description>

      <FormGroup>
        <InputWrapper>
        <StyledLabel>Email Address</StyledLabel>
        <StyledInput
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
       />
        </InputWrapper>
      </FormGroup>
      <FormGroup>  
        <InputWrapper>
          <StyledLabel>Password</StyledLabel>
          <StyledInput 
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </InputWrapper>
      </FormGroup>

      <LoginButton onClick={handleLogin} disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </LoginButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  )
}

export default LoginScreen

"use client"

import { useState } from "react"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
  padding: 40px 20px;
  height: 100%;
  min-height: 600px;
  overflow-y: auto;
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
  margin-bottom: 25px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
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


const RadioGroup = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
`

const RadioLabel = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
  display: block;
`

const RadioContainer = styled.div`
  display: flex;
  gap: 20px;
`

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #333;
`

const RadioInput = styled.input`
  margin-right: 8px;
  accent-color: #6c5ce7;
`

const CreateButton = styled.button`
  width: 335px;
  height: 46px;
 background: #6C25FF 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "translateY(-1px)")};
  }

  &:active {
    transform: translateY(0);
  }
`

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`

function RegisterScreen({ onLogin }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    companyName: "",
    isAgency: "yes",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  let url = "http://localhost:5000"

  const handleCreateAccount = async () => {
    if (!formData.fullName || !formData.phoneNumber || !formData.email || !formData.password) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await axios.post(`${url}/api/auth/register`, formData)

      if (response.data.success) {
        onLogin(response.data.user, response.data.token)
      } else {
        setError(response.data.error || "Registration failed")
      }
    } catch (error) {
      setError(error.response?.data?.error || "Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Title>Create your <br /> PopX account</Title>
      <FormGroup>
        <InputWrapper>
          <StyledLabel>Full Name<span style={{color: "red"}}>*</span></StyledLabel>
          <StyledInput
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
          />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <InputWrapper>
          <StyledLabel>Phone number<span style={{color: "red"}}>*</span></StyledLabel>
          <StyledInput
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <InputWrapper>  
          <StyledLabel>Email address<span style={{color: "red"}}>*</span></StyledLabel>
          <StyledInput
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <InputWrapper>                         
          <StyledLabel>Password <span style={{color: "red"}}>*</span></StyledLabel>
          <StyledInput
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
         </InputWrapper>
      </FormGroup>

      <FormGroup>
        <InputWrapper>
          <StyledLabel>Company name<span style={{color: "red"}}>*</span></StyledLabel>
          <StyledInput
            type="text"
            placeholder="Enter your company name"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
          />
        </InputWrapper>
      </FormGroup>

      <RadioGroup>
        <RadioLabel>Are you an Agency?<span style={{color: "red"}}>*</span></RadioLabel>
        <RadioContainer>
          <RadioOption>
            <RadioInput
              type="radio"
              name="agency"
              value="yes"
              checked={formData.isAgency === "yes"}
              onChange={(e) => handleInputChange("isAgency", e.target.value)}
            />
            Yes
          </RadioOption>
          <RadioOption>
            <RadioInput
              type="radio"
              name="agency"
              value="no"
              checked={formData.isAgency === "no"}
              onChange={(e) => handleInputChange("isAgency", e.target.value)}
            />
            No
          </RadioOption>
        </RadioContainer>
      </RadioGroup>

      <CreateButton onClick={handleCreateAccount} disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </CreateButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  )
}

export default RegisterScreen

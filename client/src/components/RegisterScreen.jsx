"use client"

import { useState } from "react"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
  padding: 40px;
  height: 100%;
  min-height: 600px;
  overflow-y: auto;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
  line-height: 1.2;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
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
  width: 100%;
  height: 50px;
  background: ${(props) => (props.disabled ? "#b0b0b0" : "linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)")};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "translateY(-1px)")};
    box-shadow: ${(props) => (props.disabled ? "none" : "0 4px 12px rgba(108, 92, 231, 0.3)")};
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

function RegisterScreen({ onNavigate, onLogin }) {
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
      <BackButton onClick={() => onNavigate("welcome")}>← Back</BackButton>

      <Title>Create your PopX account</Title>

      <FormGroup>
        <Label>Full Name*</Label>
        <Input
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>Phone number*</Label>
        <Input
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>Email address*</Label>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>Password *</Label>
        <Input
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>Company name</Label>
        <Input
          type="text"
          placeholder="Enter your company name"
          value={formData.companyName}
          onChange={(e) => handleInputChange("companyName", e.target.value)}
        />
      </FormGroup>

      <RadioGroup>
        <RadioLabel>Are you an Agency?*</RadioLabel>
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

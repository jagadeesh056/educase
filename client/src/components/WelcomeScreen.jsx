"use client"
import styled from "styled-components"

const Container = styled.div`
  padding: 60px 40px;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 600px;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.2;
`

const Description = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 60px;
  max-width: 280px;
`

const PrimaryButton = styled.button`
  width: 100%;
  max-width: 280px;
  height: 50px;
  background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`

const SecondaryButton = styled.button`
  width: 100%;
  max-width: 280px;
  height: 50px;
  background: #e8e6ff;
  color: #6c5ce7;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ddd6fe;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

function WelcomeScreen({ onNavigate }) {
  return (
    <Container>
      <Title>Welcome to PopX</Title>
      <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Description>
      <PrimaryButton onClick={() => onNavigate("register")}>Create Account</PrimaryButton>
      <SecondaryButton onClick={() => onNavigate("login")}>Already Registered? Login</SecondaryButton>
    </Container>
  )
}

export default WelcomeScreen

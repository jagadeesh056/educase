"use client"
import styled from "styled-components"

const Container = styled.div`
  padding: 20px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  min-height: 600px;
  font: normal normal medium 28px/36px Rubik;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #1D2226;
  margin-bottom: 16px;
  line-height: 1.2;
  opacity: 1;
  text-align: left;
`

const Description = styled.p`
  font-size: 16px;
  color: #1D2226;
  margin-bottom: 15px;
  max-width: 280px;
  opacity: 0.6;
  text-align: left;
`

const PrimaryButton = styled.button`
  width: 335px;
  height: 46px;
  background-color: #6C25FF;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  opacity: 1;
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
  width: 335px;
  height: 46px;
  background: #6C25FF4B;
  color: #1D2226;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
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

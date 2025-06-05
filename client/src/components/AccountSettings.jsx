import styled from "styled-components"

const Container = styled.div`
  padding: 40px;
  height: 100%;
  min-height: 600px;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin-bottom: 30px;
  text-align: left;
`

const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 30px;
`

const ProfileImageContainer = styled.div`
  position: relative;
`

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-image: url("/cover.png");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
`

const OnlineIndicator = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("/online.svg");
  background-size: cover;
  background-position: center;
  border: 2px solid white;
  border-radius: 50%;
  position: absolute;
  bottom: 2px;
  right: 2px;
`;


const ProfileInfo = styled.div`
  flex: 1;
`

const ProfileName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`

const ProfileEmail = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`

const UserDetails = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`

function AccountSettings({user }) {
  if (!user) {
    return (
      <Container>
        <Header>
          <Title>Account Settings</Title>
        </Header>
        <div style={{ textAlign: "center", color: "#666" }}>No user data available</div>
      </Container>
    )
  }


  return (
    <Container>
      <Header>
        <Title>Account Settings</Title>
      </Header>

      <ProfileSection>
        <ProfileImageContainer>
          <ProfileImage></ProfileImage>
          <OnlineIndicator />
        </ProfileImageContainer>
        <ProfileInfo>
          <ProfileName>{user.fullName}</ProfileName>
          <ProfileEmail>{user.email}</ProfileEmail>
        </ProfileInfo>
      </ProfileSection>
      <UserDetails>
        Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
      </UserDetails>
    </Container>
  )
}

export default AccountSettings

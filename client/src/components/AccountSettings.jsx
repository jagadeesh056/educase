import styled from "styled-components"

const Container = styled.div`
  height: 100%;
  min-height: 600px;
`

const Header = styled.div`
  width: 375px;
  height: 68px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000007;
  opacity: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Title = styled.h1`
  font: normal normal normal 18px/21px Rubik;
  letter-spacing: 0px;
  color: #1D2226;
  opacity: 1;
  font-size: 20px;
  font-weight: 500;
  padding-left: 15px
`

const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 0px;
  padding: 16px;
`

const ProfileImageContainer = styled.div`
  position: relative;
  padding: 5px
`

const ProfileImage = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: transparent url("/cover.png") 0% 0% no-repeat padding-box;
  opacity: 1;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

const OnlineIndicator = styled.div`
  width: 23px;
  height: 21px;
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
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
  text-align: left;
  font: normal normal medium 15px/19px Rubik;
  letter-spacing: 0px;
  color: #1D2226;
  text-transform: capitalize;
  opacity: 1;
`

const ProfileEmail = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  text-transform: capitalize;
  text-align: left;
  font: normal normal normal 14px/19px Rubik;
  letter-spacing: 0px;
  color: #1D2226;
`

const UserDetails = styled.div`
  background: #f8f9fa;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 16px;
  text-align: left;
  font: normal normal normal 14px/22px Rubik;
  letter-spacing: 0px;
  color: #1D2226;
  text-transform: capitalize;
  opacity: 1;
  width: 337px;
  height: 63px;
`

const DashedLine = styled.div`
  border-top: 2px dashed rgb(217, 218, 219);
  margin: 10px 0;
`;

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
      <DashedLine />
    </Container>
  )
}

export default AccountSettings

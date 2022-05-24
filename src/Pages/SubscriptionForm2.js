import React from 'react';
import PostForm2 from '../components/PostForm2/PostForm2'
import styled from 'styled-components';
import HomeID from '../components/HomeID/HomeID';
import { render } from 'react-dom';
import Logo from "../Logo.svg";
/* import Icon from "../components/Icon";
import { FaFacebookF, FaInstagram, FaTwitter} from 'react-icons/fa'; */

function SubscriptionForm2() {

  /* const homeId = this.props.homeId */

    /* const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)"; */

    /* render(){
      const {data} = this.props.location
      return(

      )
    } */

    var userHomeId = localStorage.getItem('userHomeId');
    var userSensorId = localStorage.getItem('userSensorId');

    return (
        <div>
        <MainContainer>
        <figure
            className="image"
            style={{ position: 'absolute', top: '5%', left:'50%', transform:'translate(-50%, -50%)', fontWeight:'bold' }}>
          <img src={Logo} />
        </figure>
        <WelcomeText>ENTER YOUR PERSONAL DETAILS</WelcomeText>
        <p style={{fontSize:'12px',fontStyle:'italic', color:'white', textAlign:'center'}}>Your sensor Id is : <div style={{color:'lightgreen', fontSize:'13px', fontStyle:'normal'}}>{userSensorId}</div></p>
        <HorizontalRule />
        <PostForm2 />
        {/* <LoginWith>FOLLOW US ON</LoginWith>
        <IconsContainer>
        <Icon color={FacebookBackground}>
          <FaFacebookF />
        </Icon>
        <Icon color={InstagramBackground}>
          <FaInstagram />
        </Icon>
        <Icon color={TwitterBackground}>
          <FaTwitter />
        </Icon>
      </IconsContainer> */}
      </MainContainer>
        </div>
    );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  letter-spacing: 0.4rem
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 95vh;
  }
`;

const WelcomeText = styled.h2`
margin: 4rem 0 1rem 0;
`;

/* const LoginWith = styled.h5`
  cursor: pointer;
  margin: 5px;
`; */

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 0.5rem;
  backdrop-filter: blur(25px);
`;

/* const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
  margin: 8px;
`; */

export default SubscriptionForm2;
import React from "react";
import styled from "styled-components";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import Logo from "../Logo.svg";

function Forgot() {
  return (
    <div>
      <MainContainer>
        <figure
          className="image"
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
          }}
        >
          <img src={Logo} />
        </figure>
        <WelcomeText>FORGOTTEN PASSWORD ?</WelcomeText>
        <p
          style={{
            fontSize: "12px",
            fontStyle: "italic",
            color: "white",
            textAlign: "center",
          }}
        >
          Enter your email to retrieve your password
        </p>
        <HorizontalRule />
        <ForgotPassword />
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
  letter-spacing: 0.4rem @media only screen and (max-width: 320px) {
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

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

export default Forgot;

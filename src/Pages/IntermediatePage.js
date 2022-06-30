import React from "react";
import styled from "styled-components";
import Logo from "../Logo.svg";
import Button from "../components/Button";

function IntermediatePage() {
  return (
    <div>
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
          <WelcomeText>WHICH ID DO YOU HAVE ?</WelcomeText>
          <HorizontalRule />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <ButtonContainer>
            <a href="/HomeID">
              <Button content="I have a Home ID" />
            </a>
          </ButtonContainer>
          <br></br>
          <ButtonContainer>
            <a href="/SensorID">
              <Button content="I have a Sensor ID" />
            </a>
          </ButtonContainer>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              color: "white",
              textAlign: "center",
            }}
          >
            If you have purchased one of our products in the shop, then you have
            received an email from us with the Home ID.
            <br /> If not, you will find a sensor ID number on our product
            leaflet.
          </p>
        </MainContainer>
      </div>
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

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  right: 38px;
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

export default IntermediatePage;

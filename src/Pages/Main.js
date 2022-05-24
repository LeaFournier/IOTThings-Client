import React, {useState} from 'react';
import styled from 'styled-components';
import MainForm from '../components/MainForm/MainForm'
import Button from "../components/Button";
import Input from "../components/Input";
import Logo from "../Logo.svg";
import Axios from 'axios';
import ReactDOM from 'react-dom';

function Main() {

    //var userHomeId = localStorage.getItem('userHomeId');

    /* const url="http://35.176.229.91:8080/api/clientIndex/login/"
    const [data, setData] = useState({
        email:"",
        password:"",

    })

    function submit(e){
      e.preventDefault();
      Axios.post(url,{
          email: data.email,
          password: data.password,
      })
      .then(res=>{
          console.log(res.data); */
          /* if (res.data === "New end user created."){
              //alert('Correct house ID !');
              window.location.replace(`http://localhost:3000`);
          }else if (res.data === "Error creating new end user."){ 
              console.log('error')
              ReactDOM.render(<p>This username/email already exists, please choose a new one.</p>, document.getElementById('Err'));
              //alert('Wrong house ID !');
              //ReactDOM.render(<p>This home Id doesn't exist ! Try again</p>, document.getElementById('HomeNotfound'));
          } */
 /*      })
  }

    function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
} */

    return (
        <div>
        <MainContainer>
        <WelcomeText style={{textTransform:'uppercase'}}>Welcome to IOTThings</WelcomeText> 
        <figure
            className="image"
            style={{ position: 'absolute', top: '5%', left:'50%', transform:'translate(-50%, -50%)', fontWeight:'bold' }}>
          <img src={Logo} />
        </figure>
        {/* <InputContainer>
          <Input type="text" placeholder="Email*" required/>
          <Input  type="password" placeholder="Password*" required/>
        </InputContainer>
        <HorizontalRule />
        <ButtonContainer>
        <a href="/Dashboard"> 
          <Button content="Log in"/>
        </a>
        </ButtonContainer>  */}
        <HorizontalRule/>
        <MainForm />
        {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <a href="/SelectID" style={{fontSize:'14px',fontWeight:'bold', cursor:'pointer', color:'white', textDecoration:'none', textTransform:'uppercase'}}> Sign Up </a>
        <br />
        <a href="/ForgottenPassword" style={{fontSize:'12px',fontWeight:'normal', cursor:'pointer', color:'white', textDecoration:'none'}}> Forgotten password ?</a> */}
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 80%;
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

export default Main;
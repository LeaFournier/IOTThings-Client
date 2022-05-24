import React, {useState} from 'react';
import './ResetPassword.css'
import Axios from 'axios';
import ReactDOM from 'react-dom';
import OpenEye from '../../Eye.svg'
import ClosedEye from '../../ClosedEye.svg'

function ResetPassword() {

    var userId = localStorage.getItem("userId");

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [confirmationPasswordIsVisible, setConfirmationPasswordIsVisible] = useState(false);

    const url="http://35.176.229.91:8080/api/endusers/resetPassword/"
    const [data, setData] = useState({
        newPassword:"",
        confirmPassword:"",
    })

    const passwordHasValidLength = data.newPassword.length >= 8;
    const passwordHasUppercaseLetter = /[A-Z]/.test(data.newPassword);
    const passwordHasNumber = /[0-9]/.test(data.newPassword);

    function submit(e){
        e.preventDefault();
        if(data.newPassword === data.confirmPassword){
            Axios.post(url + userId,{
                newPassword: data.newPassword,
            })
        }else{
            ReactDOM.render(<p>These passwords are not identical, please try again</p>, document.getElementById('ResetMsg'));
        }
    } 

    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    const handleNewPassword = () => {
    if(data.newPassword === data.confirmPassword){
        window.localStorage.removeItem("userId");
        window.location.replace(`http://localhost:3000`);
    }};

    return (
        <div className="form">
            <form onSubmit={(e)=> submit(e)}>

                <input onChange={(e)=>handle(e)} id="newPassword" value={data.newPassword} placeholder="New Password" type={passwordIsVisible ? 'text' : 'password'} required style={{marginBottom:'5px'}}></input>
                <span onClick={() => setPasswordIsVisible((prevState) => !prevState)} style={{position:'absolute', top:'6%', left:'110%', transform:'translate (-50%, -50%)'}}>
                   <img src={passwordIsVisible ? ClosedEye : OpenEye}  width="25"/>
                </span>
                <div className='conditions'>
                <ul className='Reset'>
                    <li style={{color: passwordHasUppercaseLetter ? '#003c39' : 'rgba(246, 246, 246, 0.908)'}}><span>One uppercase letter</span></li>
                    <li style={{color: passwordHasNumber ? '#003c39' : 'rgba(246, 246, 246, 0.908)'}}><span>One number</span></li>
                    <li style={{color: passwordHasValidLength ? '#003c39' : 'rgba(246, 246, 246, 0.908)'}}><span>Minimum 8 characters</span></li>
                </ul>
                </div>
                <input onChange={(e)=>handle(e)} id="confirmPassword" value={data.confirmPassword} placeholder="Confirm New Password" type={confirmationPasswordIsVisible ? 'text' : 'password'} required style={{marginTop:'80px'}}></input>
                <span onClick={() => setConfirmationPasswordIsVisible((prevState) => !prevState)} style={{position:'absolute', top:'65%', left:'110%', transform:'translate (-50%, -50%)'}}>
                   <img src={confirmationPasswordIsVisible ? ClosedEye : OpenEye}  width="25"/>
                </span>

                <br /> <br />

                <div id="buttonContainer">
                    <button onClick={handleNewPassword}>Submit</button>
                </div>

            </form>
            <div id='ResetMsg'></div>
        </div>
    );
}

export default ResetPassword;
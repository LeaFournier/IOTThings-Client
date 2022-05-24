import React, {useState} from 'react';
import './ForgotPassword.css'
import Axios from 'axios';
import ReactDOM from 'react-dom';

function ForgotPassword() {

    const url="http://35.176.229.91:8080/api/endusers/forgottenpassword/" 
    const [data, setData] = useState({
        email:"",

    })

    function submit(e){
        e.preventDefault();
        Axios.get(url + data.email,{
            email: data.email,
        })
        .then(res=>{
            console.log(res.data)
            localStorage.setItem('userId', res.data);
            if (res.data === "Email not found"){
                ReactDOM.render(<p>This email doesn't exist! Try again</p>, document.getElementById('EmailSend'));
            }
            else { 
                ReactDOM.render(<p className="emailMsg">You have just received an email! <br></br>Check your mailbox </p>, document.getElementById('EmailSend'));
            }
        })
    }

    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    return (
        <div>
            <form onSubmit={(e)=> submit(e)}>
                <input onChange={(e)=>handle(e)} value={data.email} placeholder="Email" type="email" id="email"></input>
                <br /> <br />
                <div id="buttonContainer">
                    <button>Confirm</button>
                </div>
                <br /><br /><br />
                <div id='EmailSend'></div>
            </form>
        </div>
    );
}

export default ForgotPassword;
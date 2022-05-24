import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import './PostForm2.css';
import OpenEye from '../../Eye.svg'
import ClosedEye from '../../ClosedEye.svg'

function PostForm2() {

    var userFirstName = localStorage.getItem("userFirstName");

    var userHomeId = localStorage.getItem('userHomeId');

    var myvalue = {userFirstName};

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const url="http://35.176.229.91:8080/api/endusers/bySensor/"
    const [data, setData] = useState({
        name:"",
        firstname:"",
        lastname:"",
        date:"",
        password:"",
        email:"",
        phone:"",

    })

    const passwordHasValidLength = data.password.length >= 8;
    const passwordHasUppercaseLetter = /[A-Z]/.test(data.password);
    const passwordHasNumber = /[0-9]/.test(data.password);

    function submit(e){
        e.preventDefault();
        Axios.post(url + userHomeId,{
            name: data.name,
            firstname: data.firstname,
            lastname: data.lastname,
            date: data.date,
            password: data.password,
            email: data.email,
            phone: parseInt(data.phone)
        })
        .then(res=>{
            console.log(res.data);
            if (res.data === "New end user created."){
                //alert('Correct house ID !');
                window.location.replace(`http://localhost:3000`);
            }else if (res.data === "Error creating new end user."){ 
                console.log('error')
                ReactDOM.render(<p>This username/email already exists, please choose a new one.</p>, document.getElementById('Err'));
                //alert('Wrong house ID !');
                //ReactDOM.render(<p>This home Id doesn't exist ! Try again</p>, document.getElementById('HomeNotfound'));
            }
        })
    }

    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    /* const handleReturnMain = () => { */

    /* var inputs = document.getElementsByTagName('input');
    if (inputs.required=true) {
        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].value == "") {
                console.log("pas bon")
                return false
            }
        }
        console.log("ok")
        window.location.replace(`http://localhost:3000`);
        return true
    }}; */

    return (
        <div className="form">
            <form onSubmit={(e)=> submit(e)}>
            <br /><br /><br /><br /><br />
               <input onChange={(e)=>handle(e)} id="name" value={data.name} placeholder="Username*" type="text" autoComplete="on" required></input>
               <input onChange={(e)=>handle(e)} id="firstname" value={data.firstname} placeholder="First name" type="text"></input>
               <input onChange={(e)=>handle(e)} id="lastname" value={data.lastname} placeholder="Last name" type="text"></input>
               <input onChange={(e)=>handle(e)} id="date" value={data.date} placeholder="Date of Birth" type="date"></input>
               <input onChange={(e)=>handle(e)} id="password" value={data.password} placeholder="Password*" type={passwordIsVisible ? 'text' : 'password'} required style={{marginBottom:'10px'}}></input>

                    <span onClick={() => setPasswordIsVisible((prevState) => !prevState)} style={{position:'absolute', top:'54.5%', left:'110%', transform:'translate (-50%, -50%)'}}>
                        <img src={passwordIsVisible ? ClosedEye : OpenEye}  width="25"/>
                    </span>

                    <ul>
                        <li style={{color: passwordHasUppercaseLetter ? '#003c39' : 'rgba(246, 246, 246, 0.908)'}}><span>One uppercase letter</span></li>
                        <li style={{color: passwordHasNumber ? '#003c39' : 'rgba(246, 246, 246, 0.908)'}}><span>One number</span></li>
                        <li style={{color: passwordHasValidLength ? '#003c39' : 'rgba(246, 246, 246, 0.908)'}}><span>Minimum 8 characters</span></li>
                    </ul>

               <input onChange={(e)=>handle(e)} id="email" value={data.email} placeholder="Email*" type="email" required style={{marginTop:'100px'}}></input>
               <input onChange={(e)=>handle(e)} id="phone" value={data.phone} placeholder="Phone" type="tel" pattern="[0-9]{11}" required></input>

               <div id='Err'></div>

               <br /><br />

               <div id="buttonContainer">
                <button /* onClick={handleReturnMain} */>Submit</button>
               </div>
            </form>
        </div>
    );
}

export default PostForm2;
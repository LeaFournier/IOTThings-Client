import React, {useState} from 'react';
import './MainForm.css'
import Axios from 'axios';
import ReactDOM from 'react-dom';
import OpenEye from '../../Eye.svg'
import ClosedEye from '../../ClosedEye.svg'
import LoadingSpinner from '../Spinner/LoadingSpinner';

function MainForm() {

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const token = localStorage.getItem("token");

    const [isLoading, setIsLoading] = useState()

    const url="http://35.176.229.91:8080/api/clientIndex/login/" 
    const [data, setData] = useState({
        email:"",
        password:"",
    })

    function submit(e){
        setIsLoading(true)
        e.preventDefault();
        Axios.post(url,{
            email: data.email,
            password: data.password,
        })
        .then(res=>{
            setIsLoading(false)
            console.log(res.data);
            if (res.data === "Email incorrect"){
                ReactDOM.render(<p>Wrong email or password ! Please try again</p>, document.getElementById('WrongLogin'));
            }
            else if (res.data === "Password incorrect"){ 
                ReactDOM.render(<p>Wrong email or password ! Please try again</p>, document.getElementById('WrongLogin'));
            }
            else { 
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("id", res.data.userId);
                localStorage.setItem("userHomeId", res.data.home_RW_key);
                if (res.data.avatarUrl != null) {
                    localStorage.setItem("avatarUrl", res.data.avatarUrl);
                }
                window.location.replace(`http://localhost:3000/Dashboard`);
            }
        })
    }

    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

/*     const sendEmail = () => {
        ReactDOM.render(<p className="emailMsg">You have just received an email! <br></br>Check your mailbox </p>, document.getElementById('EmailSend'));
    }; */

    if(token) {
        window.location.replace(`http://localhost:3000/Dashboard`);
    }
    else {
        return (
        
        <div className='bodyMain'>
            {isLoading ? <LoadingSpinner /> : 
            <form onSubmit={(e)=> submit(e)}>
                <input onChange={(e)=>handle(e)} value={data.email} placeholder="Email*" type="email" id="email"></input>
                <input onChange={(e)=>handle(e)} value={data.password} placeholder="Password*" type={passwordIsVisible ? 'text' : 'password'} id="password"></input>
                <span onClick={() => setPasswordIsVisible((prevState) => !prevState)} style={{position:'absolute', top:'21.5%', left:'110%', transform:'translate (-50%, -50%)'}}>
                   <img src={passwordIsVisible ? ClosedEye : OpenEye}  width="25"/>
                </span>
                <br /> <br />
                <div id="buttonContainer">
                    <button>log in</button>
                </div>
                <br /><br /><br />
                <a href="/SelectID" style={{fontSize:'14px',fontWeight:'bold', cursor:'pointer', color:'white', textDecoration:'none', textTransform:'uppercase', position:'absolute', top:'70%',left:'50%',transform:'translate(-50%, -50%)'}}> Sign Up </a>
                <br /><br />
                <a href="/ForgottenPassword" style={{fontSize:'12px',fontWeight:'normal', cursor:'pointer', color:'white', textDecoration:'none', position:'absolute', top:'80%',left:'50%',transform:'translate(-50%, -50%)'}}> Forgotten password ?</a>
                <br /><br /><br />
                <div id='WrongLogin'></div>
            </form>
    }
        </div>
    );
        }
}

export default MainForm;
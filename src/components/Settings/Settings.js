import React, {useState, useEffect, Fragment} from 'react';
import  ReactDOM  from 'react-dom';
import './Settings.css';
import SideBar from '../../components/SideBar/SideBar'
import { MainContext } from '../../App';
import Bulb from '../../components/Bulb/Bulb'
import userImg from "../../userImg.png";
import Axios from 'axios';

function Settings() {

    var userId = localStorage.getItem('id')

    var barOpened = localStorage.getItem('barOpened')

    const url = "http://35.176.229.91:8080/api/endUsers/" + userId

    // USED FOR AVATAR
    const [file, setFile] = useState('');

    const onChangeAvatar = e => {
        setFile(e.target.files[0]);
    }

    const onSubmitAvatar = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            await Axios.post('http://35.176.229.91:8080/api/endUsers/avatar/'+userId, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            window.location.reload(true)
        }catch(err) {
            console.log(err);
        }
    }


    // USED FOR USER FORM
    const [navbarOpen, setNavbarOpen] = useState(JSON.parse(barOpened))

    const [username, setUsername] = useState([]);

    const [firstName, setFirstName] = useState([]);

    const [lastName, setLastName] = useState([]);

    const [email, setEmail] = useState([]);

    const [phone, setPhone] = useState([]);

    const [avatar, setAvatar] = useState([]);

    var headers = {authorization: localStorage.getItem('token')}

    useEffect(() => {
        const asyncFn = async () =>{
        let result = await fetch(url, {headers: headers})
        result = await result.json();
        if(result==="Error") {
            window.location.replace(`http://localhost:3000`);
        }
        setUsername(result[0].endUser.pseudo)
        setFirstName(result[0].endUser.first_name)
        setLastName(result[0].endUser.last_name)
        setPhone(result[0].endUser.phone)
        setEmail(result[0].endUser.email)
        setAvatar(result[0].avatar)
        }
        asyncFn();
    }, [])

    function updateUser(e){
        e.preventDefault();
        Axios.put(url, {
            headers: headers,
            pseudo : username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone
        })
        .then(res=>{
            if(res.data==="Error") {
                window.location.replace(`http://localhost:3000`);
            }
            console.log("Changement effectué")
            localStorage.setItem('username', username)
            ReactDOM.render(<p id='success'>Update Successful</p>, document.getElementById('success'));
        })
    }

        return (
            <div>
                <MainContext.Provider value={{navbarOpen, setNavbarOpen}}>
                <SideBar />
                    <div className='page_content' style = {{width: !navbarOpen ? 'calc(100% - 78px);' : 'calc(100% - 240px);', left: !navbarOpen ? '78px' : '240px'}} >
                        <div className='text'>
                            SETTINGS
                        </div>
                        <div className='subtitle'>EDIT YOUR PROFILE</div>
                        <div id="col1">
                      
                        <div id="settingsUsername">
                            <label for="username">Username</label>
                            <input onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" id="username" name="username"/>
                        </div>
                        <div id="settingsFirstName">
                            <label for="firstname">First Name</label>
                            <input onChange={(e)=>{setFirstName(e.target.value)}} value={firstName} type="text" id="firstname" name="firstname"/>
                        </div>
                        <div id="settingsLastName">
                            <label for="lastname">Last Name</label>
                            <input onChange={(e)=>{setLastName(e.target.value)}} value={lastName} type="text" id="lastname" name="lastname"/>
                        </div>
                        <div id="settingsEmail">
                            <label for="email">Email</label>
                            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="text" id="email" name="email"/>
                        </div>
                        <div id="settingsPhone">
                            <label for="phone">Phone</label>
                            <input onChange={(e)=>{setPhone(e.target.value)}} value={phone} type="text" id="phone" name="phone"/>
                        </div>
                        <br/>

                        <div id="success"></div>
                        <button className='SettingsProfile' onClick={updateUser}>Submit</button>

                        </div>
 
                        
                        <div id="col2">
                            <form onSubmit={onSubmitAvatar}>
                             <div className="userPicture">
                                <label for="userPic">
                                    <img style={{width:'auto', maxHeight:'300px'}} src={avatar} className='user'/>
                                </label>
                                <span id='picText'>Click to change your profile picture</span>
                                <input id="userPic" type="file" onChange={onChangeAvatar} />
                                <button className='SettingsPicture'> Submit</button>
                            </div>
                            </form>
                        </div>

                    </div> 

                </MainContext.Provider>
                <Bulb />
            </div>
        )
    }

export default Settings;
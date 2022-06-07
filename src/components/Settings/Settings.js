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
    const [filename, setFileName] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChangeAvatar = e => {
        setFile(e.target.files[0]);
        //console.log(filename);
        //console.log(file)
        setFileName(e.target.files[0].name);
    }

    const onSubmitAvatar = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await Axios.post('http://35.176.229.91:8080/api/endUsers/avatar/'+userId, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const {fileName, filePath} = res.data;

            setUploadedFile({fileName, filePath});

            //console.log(filePath);
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
        setUsername(result.pseudo)
        setFirstName(result.first_name)
        setLastName(result.last_name)
        setPhone(result.phone)
        setEmail(result.email)
        }
        asyncFn();
    }, [])

    useEffect(() => {
        const asyncFn2 = async () =>{
        let result = await fetch('http://35.176.229.91:8080/api/endUsers/avatar/'+userId, {headers: headers})
        result = await result.json();
        if(result==="Error") {
            window.location.replace(`http://localhost:3000`);
        }
        console.log("Salut salut")
        setAvatar(result)
        }
        asyncFn2();
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
                            <div className="avatarRecupere">
                                <img style={{width:'auto',maxHeight:'300px'}} src={avatar} />
                            </div>
                            <form onSubmit={onSubmitAvatar}>
{/*                              <div className="userPicture">
                                <label for="userPic">
                                    <img src={uploadedFile} className='user'/>
                                </label>
                                <span id='picText'>Click to change your profile picture</span>
                                <input id="userPic" type="file" onChange={onChangeAvatar} />
                                <button className='SettingsPicture'> Submit</button>
                            </div> */}



                            <div className="userPictureContainer">
                                <input type='file' className='userPicture'onChange={onChangeAvatar} />
                                <label className="filename">{filename}</label>
                                <input type='submit' value='Upload' />
                            </div>

                            {uploadedFile ? (
                                <div className='uploadedFileContainer'>
                                    <h3>{uploadedFile.fileName}</h3>
                                    <img style={{width:'auto',maxHeight:'300px'}} src={uploadedFile.filePath} />
                                </div>
                            ) : null}
                            </form>
                        </div>

                    </div> 

                </MainContext.Provider>
                <Bulb />
            </div>
        )
    }

export default Settings;
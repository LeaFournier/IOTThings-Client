import React, {useState, useEffect} from 'react';
import  ReactDOM  from 'react-dom';
import Axios from 'axios';
import './MyHome.css';
import SideBar from '../../components/SideBar/SideBar'
import { MainContext } from '../../App';
import Bulb from '../../components/Bulb/Bulb'

function MyHome() {

    var barOpened = localStorage.getItem('barOpened')

    const [navbarOpen, setNavbarOpen] = useState(JSON.parse(barOpened))

    const[id, setId] = useState([]);

    const [name, setName] = useState([]);

    const [street, setStreet] = useState([]);

    const [city, setCity] = useState([]);

    const [region, setRegion] = useState([]);

    const [postCode, setPostCode] = useState([]);

    const url = "http://35.176.229.91:8080/api/homes/"+localStorage.getItem('userHomeId')

    var headers = {authorization: localStorage.getItem('token')}

    const item = {id: id, name: name, street: street, city: city, region: region, post_code: postCode}

    useEffect(() => {
        const asyncFn = async () =>{
        let result = await fetch(url, {headers: headers})
        result = await result.json();
        if(result==="Error") {
            window.location.replace(`http://localhost:3000`);
        }
        setId(result.home_RW_key)
        setName(result.name)
        setStreet(result.home_address.street)
        setCity(result.home_address.city)
        setRegion(result.home_address.region)
        setPostCode(result.home_address.post_code)
        }
        asyncFn();
    }, [])

    function updateHome(e){
        e.preventDefault();
        Axios.put(url, item, {headers})
        .then(res=>{
            console.log(res)
            if(res==="Error") {
                window.location.replace(`http://localhost:3000`);
            }
            console.log("Changement effectué")
            ReactDOM.render(<p id='success'>Update Successful</p>, document.getElementById('success'));
        })
    }

        return  (
            <div>
                <MainContext.Provider value={{navbarOpen, setNavbarOpen}}>
                <SideBar />
                    <div className='page_content' style = {{width: !navbarOpen ? 'calc(100% - 78px);' : 'calc(100% - 240px);', left: !navbarOpen ? '78px' : '240px'}} >
                        <div className='text'>
                            MY HOME
                        </div>
                        <div className='subtitle'>EDIT YOUR HOME INFORMATION</div>
                        <div id="col3">
                        <div id="homeHomeID">
                            <label for="homeID">Your Home Id</label>
                            <input onChange={(e)=>{setId(e.target.value)}} style={{backgroundColor:"#ccc5b9", cursor:"no-drop"}}value={id} type="text" id="homeID" name="homeID" disabled="disabled" placeholder='Automatically Generated'/>
                        </div>
                        <div id="homeHomeName">
                            <label for="homeName">Your Home Name</label>
                            <input onChange={(e)=>{setName(e.target.value)}} value={name}type="text" id="homeName" name="homeName"/>
                        </div>
                        <div id="homeStreet">
                            <label for="street">Street</label>
                            <input onChange={(e)=>{setStreet(e.target.value)}} value={street} type="text" id="street" name="street"/>
                        </div>
                        <div id="homeCity">
                            <label for="city">City</label>
                            <input onChange={(e)=>{setCity(e.target.value)}} value={city}type="text" id="city" name="city"/>
                        </div>
                        <div id="homeRegion">
                            <label for="region">Region</label>
                            <input onChange={(e)=>{setRegion(e.target.value)}} value={region} type="text" id="region" name="region"/>
                        </div>
                        <div id="homePostCode">
                            <label for="postCode">Post Code</label>
                            <input onChange={(e)=>{setPostCode(e.target.value)}} value={postCode} type="text" id="postCode" name="postCode"/>
                        </div>
                        <div id="success"></div>
                        <button className='HomeSubmit' onClick={updateHome}>Submit</button>

                        </div>
 
                    </div>
                </MainContext.Provider>
                <Bulb />
            </div>
        )
}
export default MyHome;
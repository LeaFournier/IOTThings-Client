import React, {useState} from 'react';
import './MySensors.css';
import SideBar from '../../components/SideBar/SideBar'
import { MainContext } from '../../App';
import Bulb from '../../components/Bulb/Bulb'

function MySensors() {

    var barOpened = localStorage.getItem('barOpened')

    const [navbarOpen, setNavbarOpen] = useState(JSON.parse(barOpened))

        return  (
            <div>
                <MainContext.Provider value={{navbarOpen, setNavbarOpen}}>
                <SideBar />
                    <div className='page_content' style = {{width: !navbarOpen ? 'calc(100% - 78px);' : 'calc(100% - 240px);', left: !navbarOpen ? '78px' : '240px'}} >
                        <div className='text'>
                            MY SENSORS
                        </div>
                        <div className='subtitle'>EDIT YOUR SENSORS INFORMATION</div>
                        <div id="col3">

                        <div id="settingsUsername">
                            <label for="totalNbS">Total Number Of Sensors</label>
                            <input /* onChange={(e)=>handle(e)} */ type="text" id="totalNbS" name="totalNbS" />
                        </div>
                        <div id="settingsFirstName">
                            <label for="firstname">First Name</label>
                            <input /* onChange={(e)=>handle(e)} */ type="text" id="firstname" name="firstname" />
                        </div>
                        <div id="settingsLastName">
                            <label for="lastname">Last Name</label>
                            <input /* onChange={(e)=>handle(e)} */ type="text" id="lastname" name="lastname" />
                        </div>
                        <div id="settingsEmail">
                            <label for="email">Email</label>
                            <input /* onChange={(e)=>handle(e)} */ type="text" id="email" name="email" />
                        </div>
                        <div id="settingsPhone">
                            <label for="phone">Phone</label>
                            <input /* onChange={(e)=>handle(e)} */ type="text" id="phone" name="phone" />
                        </div>

                        <button className='SettingsProfile'>Submit</button>

                        </div>
 
                    </div>
                </MainContext.Provider>
                <Bulb />
            </div>
        )
}
export default MySensors;
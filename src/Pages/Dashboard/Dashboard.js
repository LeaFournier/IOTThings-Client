import React, {useState} from 'react';
import './Dashboard.css';
import SideBar from '../../components/SideBar/SideBar'
import { MainContext } from '../../App';
import Bulb from '../../components/Bulb/Bulb'

function Dashboard() {

    var barOpened = localStorage.getItem('barOpened')

    const [navbarOpen, setNavbarOpen] = useState(JSON.parse(barOpened))

        return  (
            <div>
                <MainContext.Provider value={{navbarOpen, setNavbarOpen}}>
                <SideBar />
                    <div className='page_content' style = {{width: !navbarOpen ? 'calc(100% - 78px);' : 'calc(100% - 240px);', left: !navbarOpen ? '78px' : '240px'}} >
                        <div className='text'>
                            DASHBOARD
                        </div>
                    </div>
                </MainContext.Provider>
                <Bulb />
            </div>
        )
}
export default Dashboard;
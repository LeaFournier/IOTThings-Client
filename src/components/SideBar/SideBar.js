import React, {useState} from 'react';
import './SideBar.css';
import Axios from 'axios';
import Logo from "../../Logo.svg";
import bulb from "../../bulb1.png";
import { MainContext } from '../../App';
import user from "../../user.svg";

export default (props) => {

    const url="http://35.176.229.91:8080/api/clientIndex/logout/"

    var barOpened = localStorage.getItem('barOpened')

    var token = localStorage.getItem('token');

    var username = localStorage.getItem('username')

    const [isActive, setisActive] = useState(JSON.parse(barOpened));

    const menuActive=()=>{
        setisActive(!isActive)
        /* console.log('active'); */
    }

    if (isActive) {
        localStorage.setItem('barOpened', 'true')
    }
    else {
        localStorage.setItem('barOpened', 'false')
    }

    const handleLogOut = () => {
        Axios.get(url, { headers: {
                authorization:localStorage.getItem('token')
            }})
            .then(res=>{
                console.log(res.data);
                window.localStorage.clear();
                window.location.replace(`http://localhost:3000`);     
    })};

    if (!token) {
        window.location.replace(`http://localhost:3000`);
    }

    if (token) {
        return (
     <div>
                <div  className={isActive ? 'sidebar active': 'sidebar'} id='sidebar'>
                    <div className='logo_content'>
                        <div className='logo'>
                            <div className='imglogo'>
                                <img src={Logo}/>
                            </div>
                        <div className='logo_name' style={{marginLeft:'2px'}}>IOTThings</div>        
                        </div>
                    <div className='menu'>

                    <MainContext.Consumer>
                    {({NavbarOpen, setNavbarOpen}) => (
                        <i className='bx bx-menu' id="btn" onClick={function(event){setNavbarOpen(NavbarOpen => !NavbarOpen);menuActive()}}></i> ) }
                    </MainContext.Consumer>
                    </div>
                    </div>
                    <ul className="nav_list">
                    <li>
                        <a href="/Dashboard">
                        <i class='bx bx-line-chart'></i>
                        <span className="links_name"> |  Analytics</span>
                        </a>
                        <span className="tooltip">Analytics</span> 
                    </li>
                    <li>
                        <a href="/myHome">
                        <i className='bx bx-home-alt-2' ></i>
                        <span className="links_name">  |  My Home</span>
                        </a>
                        <span className="tooltip">My Home</span> 
                    </li>
                    <li>
                        <a href="/myRooms">
                        <i class='bx bx-bed'></i>
                        <span className="links_name"> |  My Rooms</span>
                        </a>
                        <span className="tooltip">My Rooms</span> 
                    </li>
                    <li>
                        <a href="/mySensors">
                        <i class='bx bx-bulb'></i>
                        <span className="links_name"> |  My Sensors</span>
                        </a>
                        <span className="tooltip">My Sensors</span> 
                    </li>
                    <li>
                        <a href="/settings">
                        <i class='bx bx-cog'></i>
                        <span className="links_name"> |  Settings</span>
                        </a>
                        <span className="tooltip">Settings</span> 
                    </li>
                </ul>
                <div className="profile_content">
                    <div className="profile">
                        <div className="profile_details">
                            <img src={user} alt=""></img>
                            <div className="username">
                            {username}
                            </div>
                        </div>
                        <i class='bx bx-log-out' id="log_out" onClick={handleLogOut} style={{cursor:"pointer"}}></i>
                    </div>
                </div>
            </div>
        </div>  
        )
        }
} 
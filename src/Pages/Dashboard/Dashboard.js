import React, {useState} from 'react';
import './Dashboard.css';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import Main from '../Main';

function Dashboard() {

    const url="http://35.176.229.91:8080/api/clientIndex/logout/"

    var token = localStorage.getItem('token');

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
        return  (
            <div>
                <h1 className='dashboard'>DASHBOARD</h1>
                <div className='buttonContain'>
                    <button className='buttondash' onClick={handleLogOut} >Log Out</button>
                </div>
            </div>
        );
    }
}

export default Dashboard;
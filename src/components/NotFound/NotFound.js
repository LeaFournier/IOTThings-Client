import React from 'react';
import './NotFound.css';
import Logo from "../../Logo.svg";

function NotFound() {
    return (
        <div>
            <figure
                className="image"
                style={{ position: 'absolute', top: '8%', left:'50%', transform:'translate(-50%, -50%)', fontWeight:'bold' }}>
                <img src={Logo} />
            </figure>
            <h1 className='Err'>404</h1>
            <h2 className='NotFound'>Page Not Found</h2>
        </div>
    );
}

export default NotFound;
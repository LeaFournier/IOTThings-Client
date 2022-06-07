import React,{useState} from 'react';
import bulb from "../../bulb1.png";
import './Bulb.css';

function Bulb() {

    var light = localStorage.getItem('bulb');
    
    const [isDark, setisDark] = useState(JSON.parse(light));

if (isDark) {
    document.body.id = 'dark';
    localStorage.setItem('bulb', 'false')
}
else {
    document.body.id = 'white';
    localStorage.setItem('bulb', 'true')
}

const darkMode=()=>{
    setisDark(!isDark)
}
    return (
        <div>
            <img className='bulb' src={bulb} onClick={darkMode}/>
        </div>
    );
}

export default Bulb;
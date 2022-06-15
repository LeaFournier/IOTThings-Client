import React, {useState} from 'react';
import './Dropdown.css';

function Dropdown({selected, setSelected}) {

    const [isActive, setIsActive] = useState(false)
    const options = ['Bedroom','Kitchen','Bathroom','Toilet','Living room']

    return (
        <div className="dropdown">
            <div className='dropdown-btn' onClick={e => setIsActive(!isActive)}>
                {selected}
                <i class='bx bxs-chevron-down' style={{fontSize:'23px'}}></i>
            </div>
            {isActive && (
            <div className="dropdown-content">
                {options.map((option) =>(
                <div className="dropdown-item" onClick={(e) => {
                    setSelected(option) 
                    setIsActive(false)
                    }}>
                    {option}
                </div>
                ))}
            </div>
            )}
        </div>
    );
}

export default Dropdown;
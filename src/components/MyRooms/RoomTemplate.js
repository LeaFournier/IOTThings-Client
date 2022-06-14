import React from 'react';

function RoomTemplate(props) {
    const roomName = props.roomName 
    return (
        <div>
            Room name : {roomName}    
        </div>
    );
}

export default RoomTemplate;
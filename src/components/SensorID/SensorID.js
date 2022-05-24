import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './SensorID.css'
import Axios from 'axios';

function SensorID() {

    var userSensorId = localStorage.getItem('userSensorId');

    const url="http://35.176.229.91:8080/api/endusers/sensorId/"
    const [data, setData] = useState({
        sensorId:"",
    })

    async function waitReplace() {
        await localStorage.getItem('userSensorId');
        var userSensorId = localStorage.getItem('userSensorId');
    }

    function submit(e){
        e.preventDefault();
        //console.log(data);
        Axios.get(url + data.sensorId,{
            sensorId: data.sensorId,
        })
        .then(res=>{
            console.log(res.data);
        if (res.data[0].found === "Sensor found"){
            e.preventDefault();
            //alert('Correct house ID !');
            localStorage.setItem('userSensorId', data.sensorId);
            window.location.replace(`http://localhost:3000/${data.sensorId}/signupForm`);
        }
        else if (res.data === "Sensor not found"){ 
            //alert('Wrong house ID !');
            ReactDOM.render(<p>This sensor Id doesn't exist ! Try again</p>, document.getElementById('SensorNotfound'));
        }
        })
    }

    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    return (
        <div>
            <form onSubmit={(e)=> submit(e)}>
               <input onChange={(e)=>handle(e)} value={data.sensorId} placeholder="Sensor ID" type="text" id="sensorId"></input>
               <div id='SensorNotfound'></div>
               <br /> <br /><br />
                <div id="buttonContainer">
                    <button>Confirm</button>
                </div>
            </form>
        </div>
    );
}

export default SensorID;
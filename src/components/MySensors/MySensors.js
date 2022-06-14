import React, {useState} from 'react';
import './MySensors.css';
import SideBar from '../../components/SideBar/SideBar'
import { MainContext } from '../../App';
import Bulb from '../../components/Bulb/Bulb'
import LoadingSpinner from '../Spinner/LoadingSpinner';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Dropdown from '../Dropdown/Dropdown';

function MySensors() {

    var barOpened = localStorage.getItem('barOpened')

    var headers = {authorization: localStorage.getItem('token')}

    const [navbarOpen, setNavbarOpen] = useState(JSON.parse(barOpened))

    const [isActive, setIsActive] = useState(false)

    const [options, setOptions] = useState([{"name": "", "id": ""}])

    const [data, setData] = useState({
        sensorId:"",
    })

    const [selected, setSelected] = useState("Which room ?")

    const [sensorName, setSensorName] = useState();

    const [sensorType, setSensorType] = useState();

    const [sensorId, setSensorId] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const [sensors, setSensors] = useState([]);

    const [modal, setModal] = useState(false);



    const toggleModal = () => {
        setModal(!modal);
      };
    
      if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }

      const [modalEdit, setModalEdit] = useState(false);

      const toggleModalEdit = () => {
          setModalEdit(!modalEdit);
        };
      
        if(modalEdit) {
          document.body.classList.add('active-modalEdit')
        } else {
          document.body.classList.remove('active-modalEdit')
        }

        const getMyRooms = async () =>{
            let result = await fetch(`http://35.176.229.91:8080/api/rooms/roomsNames/homeId/` + localStorage.getItem('userHomeId'), {headers: headers})
            result = await result.json(); 
            console.log(result)
            setOptions.name(result)

            console.log(options)
            /* catch {
              localStorage.clear()
              window.location.replace(`http://localhost:3000`)
          } */
            }

      function checkSensor(e){
        e.preventDefault();
        //console.log(data);
        Axios.get(`http://35.176.229.91:8080/api/sensors/sensorvalidator/` + data.sensorId,{
            sensorId: data.sensorId,
        })
        .then(res=>{
        if (res.data[0].found === "Sensor found"){
            e.preventDefault();
            getMyRooms();
            getOneSensor();
            toggleModalEdit();
            //alert('Correct house ID !');
        }
        else if (res.data === "Sensor not found"){ 
            //alert('Wrong house ID !');
            ReactDOM.render(<p>This sensor Id doesn't exist ! Try again</p>, document.getElementById('SensorNotfound'));
        }
        })
    }

    const getOneSensor = () => {
        setIsLoading(true)
        Axios.get(`http://35.176.229.91:8080/api/sensors/sensorId/` + data.sensorId ,{headers})
        .then(res=>{
            setSensorName(res.data.sensor_name)
            setSensorType(res.data.sensor_type)
            setSensorId(res.data.sensor_RW_key)
            setIsLoading(false)
        })
      }

    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    const createSensor = (e) => {
        setIsLoading(true)
        e.preventDefault();
        Axios.put(`http://35.176.229.91:8080/api/sensors/` + data.sensorId ,{
          sensor_name: sensorName,
          home_RW_key: localStorage.getItem('userHomeId'),
          room_RW_key: selected
        }, {headers})
        .then(res=>{
            setIsLoading(false)
            console.log(res.data);
            window.location.reload(true);
        })
      }


        return  (
            <div>
                <MainContext.Provider value={{navbarOpen, setNavbarOpen}}>
                <SideBar />
                {isLoading ? <LoadingSpinner /> : 
                    <div className='page_content' style = {{width: !navbarOpen ? 'calc(100% - 78px);' : 'calc(100% - 240px);', left: !navbarOpen ? '78px' : '240px'}} >
                        <div className='text'>
                            MY SENSORS
                        </div>
                        <div className='subtitle'>EDIT YOUR SENSORS INFORMATION</div>

                        <div id="sensorsTotalNb">
                            <label for="totalNbS">Total Number Of Sensors</label>
                            <input /* onChange={(e)=>handle(e)} */ type="text" id="totalNbS" name="totalNbS" />
                        </div>
                        <div className='rooms-list'>
                         
                         <ul>
                           <li style={{textAlign:'center'}}>Sensor's name</li>
                           <li style={{textAlign:'center'}}>Sensor's type</li>
                           <li style={{textAlign:'center'}}>Room name</li>
                           <li style={{textAlign:'center'}}>Delete a sensor</li>
                           <li style={{textAlign:'center'}}>Update a sensor</li>
                         </ul>
                         {
                           sensors.map((item,index)=>
                           <ul key={item._id}>
                           <li style={{textAlign:'center'}}>{item.sensor_name}</li>
                           <li style={{textAlign:'center'}}>{item.sensor_type}</li>
                           <li style={{textAlign:'center'}}>{item.room_name}</li>
                           <li><button id="deleteButton" /* onClick={()=>deleteRoom(item.room_RW_key)} */ style={{marginLeft:'45px', marginTop:'35px'}}>Delete</button></li>
                           <li><button id="updateButton" /* onClick={() => {toggleModalUpdate(); getOneRoom(item.room_RW_key); setRoomKey(item.room_RW_key)}} */ style={{marginLeft:'50px', marginTop:'35px'}}>Update</button></li>
                         </ul>
                           )
                         }
                      
                       </div>
                       <br />
                       <div className='roomsInfo'>
                         <br />
                         <br />
                         <div className='add-room'>
                           <i class='bx bx-plus-circle' onClick={toggleModal} style={{fontSize:'30px',width:'30px',justifyContent:'center',cursor:'pointer'}}></i>
                           <span className='add-text'>Add a sensor</span>
                         </div>
                       </div>
                   </div>}

                   {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Add a new sensor</h2>
            <br />
               <label for="sensorId">Add your sensor ID</label>
               <input onChange={(e)=>handle(e)} placeholder="Sensor ID" type="text" id="sensorId"></input>
               <div id='SensorNotfound'></div>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <button onClick={checkSensor} style={{width:'50%',position:'center'}}>Submit</button>
          </div>
        </div>
      )}

{modalEdit && (
        <div className="modal">
          <div onClick={toggleModalEdit} className="overlay"></div>
          <div className="modal-content-sensor">
            <h2>Edit this sensor</h2>
            <br />
            <div id="settingsFirstName">
                <label for="sensorID">Sensor's ID</label>
                <input type="text" id="sensorID" name="sensorID" value={sensorId} disabled="disabled" placeholder='Automatically Generated' style={{backgroundColor:"#ccc5b9", cursor:"no-drop"}}/>
            </div>
            <div id="settingsFirstName">
                <label for="sensorType">Sensor's type</label>
                <input type="text" id="sensorType" name="sensorType" value={sensorType} disabled="disabled" placeholder='Automatically Generated' style={{backgroundColor:"#ccc5b9", cursor:"no-drop"}}/>
            </div>
            <div id="settingsLastName">
                <label for="nbSensorsRoom">Room</label>

                
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



            </div>
            <br />
            <div id="settingsFirstName">
                <label for="sensorName">Sensor's name</label>
                <input type="text" id="sensorName" name="sensorName"/>
            </div>
            <br /><br />
            <button onClick={createSensor} style={{width:'50%',position:'center'}}>Submit</button>
          </div>
        </div>
      )}

                </MainContext.Provider>
                <Bulb />
            </div>
        )
}
export default MySensors;
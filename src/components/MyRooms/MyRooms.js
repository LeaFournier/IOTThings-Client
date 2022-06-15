import React, {useState, useEffect} from 'react';
import './MyRooms.css';
import SideBar from '../../components/SideBar/SideBar'
import { MainContext } from '../../App';
import Bulb from '../../components/Bulb/Bulb'
import bed from '../../bed.svg'; 
import fridge from '../../fridge.svg'; 
import roomTemplate from './RoomTemplate';
import RoomTemplate from './RoomTemplate';
import Dropdown from '../Dropdown/Dropdown';
import Axios from 'axios';
import LoadingSpinner from '../Spinner/LoadingSpinner';

function MyRooms() {

    var barOpened = localStorage.getItem('barOpened')

var token = localStorage.getItem('token')

    const [navbarOpen, setNavbarOpen] = useState(JSON.parse(barOpened))

    const url = "http://35.176.229.91:8080/api/rooms/homeId/" + localStorage.getItem('userHomeId')

    var headers = {authorization: localStorage.getItem('token')}

    const [rooms, setRooms] = useState([])

    const [roomName, setRoomName] = useState();

    const [roomType, setRoomType] = useState();

    const [roomKey, setRoomKey] = useState();

    const [newRoomName, setNewRoomName] = useState();

    const [modal, setModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

    const [modalUpdate, setModalUpdate] = useState(false);

    const toggleModalUpdate = () => {
      setModalUpdate(!modalUpdate);
    };
  
    if(modalUpdate) {
      document.body.classList.add('active-modalUpdate')
    } else {
      document.body.classList.remove('active-modalUpdate')
    }


    useEffect(() => {
      getRooms();
  }, [])

  const getRooms = async () =>{
    setIsLoading(true)
    try {
    let result = await fetch(url, {headers: headers})
    result = await result.json(); 
    console.log(result)
    setRooms(result)
    setIsLoading(false)
  }
    catch {
      localStorage.clear()
      window.location.replace(`http://localhost:3000`)
  }
    }

  const [selected, setSelected] = useState("Room type ?")

  const deleteRoom = async(id) =>{
    setIsLoading(true)
    const reqOptions = {
      method: 'DELETE',
      headers: { 
          'Authorization': localStorage.getItem('token')
      }
    };
    let result = await fetch(`http://35.176.229.91:8080/api/rooms/${id}`, reqOptions);
    //result = await result.json();
    if (result.data==="Error"){
      window.location.replace(`http://localhost:3000`)
    }
    else {
      getRooms();
    }
  }

 const submitRoom = (e) => {
    setIsLoading(true)
    e.preventDefault();
    Axios.post(`http://35.176.229.91:8080/api/rooms`,{
      room_name: roomName,
      room_type: selected,
      home_RW_key: localStorage.getItem('userHomeId')
    })
    .then(res=>{
      if(res.data === "Error") {
        window.location.replace(`http://localhost:3000`);
      }
      else {
        setIsLoading(false)
        console.log(res.data);
        window.location.reload(true);
      }
    })
}

const editRoom = (e) => {
  setIsLoading(true)
  e.preventDefault();
  Axios.put(`http://35.176.229.91:8080/api/rooms/roomId/${roomKey}`,{
    room_name: newRoomName,
    room_type: selected
  }, {headers})
  .then(res=>{
      setIsLoading(false)
      console.log(res.data);
      window.location.reload(true);
  })
}

const getOneRoom = (id) => {
  setIsLoading(true)
  console.log(id)
  Axios.get(`http://35.176.229.91:8080/api/rooms/roomId/${id}`,{headers})
  .then(res=>{
      console.log(res.data)
      setNewRoomName(res.data.room_name)
      setRoomType(res.data.room_type)
      setIsLoading(false)
  })
}

if (!token) {
  window.location.replace(`http://localhost:3000`);
}

if (token) {

        return  (
            <div>
                <MainContext.Provider value={{navbarOpen, setNavbarOpen}}>
                <SideBar />
                {isLoading ? <LoadingSpinner /> : 
                    <div className='page_content' style = {{width: !navbarOpen ? 'calc(100% - 78px);' : 'calc(100% - 240px);', left: !navbarOpen ? '78px' : '240px'}} >
                        <div className='text'>
                            MY ROOMS
                        </div>
                        <div className='subtitle'>EDIT YOUR ROOMS INFORMATION</div>
                        <br />
                        <div className='rooms-list'>
                         
                          <ul style={{fontWeight:'bold'}}>
                            <li style={{textAlign:'center'}}>Room name</li>
                            <li style={{textAlign:'center'}}>Room type</li>
                            <li style={{textAlign:'center'}}>Total number of sensors</li>
                            <li style={{textAlign:'center'}}>Delete a room</li>
                            <li style={{textAlign:'center'}}>Update a room</li>
                          </ul>
                          {
                            rooms.map((item,index)=>
                            <ul key={item._id}>
                            <li style={{textAlign:'center'}}>{item.room_name}</li>
                            <li style={{textAlign:'center'}}>{item.room_type}</li>
                            <li style={{textAlign:'center'}}>{item.total_sensors}</li>
                            <li><button id="deleteButton" onClick={()=>deleteRoom(item.room_RW_key)} style={{marginLeft:'45px', marginTop:'35px'}}>Delete</button></li>
                            <li><button id="updateButton" onClick={() => {toggleModalUpdate(); getOneRoom(item.room_RW_key); setRoomKey(item.room_RW_key)}} style={{marginLeft:'50px', marginTop:'35px'}}>Update</button></li>
                          </ul>
                            )
                          }
                       
                        </div>
                        <br />
                        <div className='roomsInfo'>
                          {/* {rooms.map(item => {
                            <p>name : {item}</p>
                          })} */}
                         {/*  <RoomTemplate  roomName={""} /> */}
                          <br />
                          <br />
                          <div className='add-room'>
                            <i class='bx bx-plus-circle' onClick={toggleModal} style={{fontSize:'30px',width:'30px',justifyContent:'center',cursor:'pointer'}}></i>
                            <span className='add-text'>Add a room</span>
                          </div>
                        </div>
                    </div> }

                    {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Add a new room</h2>
            <br />
            <div id="settingsLastName">
                <label for="nbSensorsRoom">Room type</label>
                <Dropdown selected={selected} setSelected={setSelected}/>
            </div>
            <br />
            <div id="settingsFirstName">
                <label for="roomName">Room name</label>
                <input type="text" id="roomName" name="roomName" onChange={(e)=>{setRoomName(e.target.value)}}/>
            </div>
            <br /><br /><br /><br />
            <button onClick={submitRoom} style={{width:'50%',position:'center'}}>Submit</button>
          </div>
        </div>
      )}

{modalUpdate && (
        <div className="modal">
          <div onClick={toggleModalUpdate} className="overlay"></div>
          <div className="modal-content">
            <h2>Edit this room</h2>
            <br />
            <div id="settingsLastName">
                <label for="nbSensorsRoom">Room type</label>
                <Dropdown selected={selected} setSelected={setSelected}/>
            </div>
            <br />
            <div id="settingsFirstName">
                <label for="roomName">Room name</label>
                <input type="text" id="roomName" name="roomName" onChange={(e)=>{setNewRoomName(e.target.value)}} value={newRoomName}/>
            </div>
            <br /><br /><br /><br />
            <button onClick={editRoom} style={{width:'50%',position:'center'}}>Submit</button>
          </div>
        </div>
      )}
                </MainContext.Provider>
                <Bulb />
            </div>
        )
}
}
export default MyRooms;
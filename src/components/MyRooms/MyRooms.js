import React, { useState, useEffect } from "react";
import "./MyRooms.css";
import SideBar from "../../components/SideBar/SideBar";
import { MainContext } from "../../App";
import Bulb from "../../components/Bulb/Bulb";
import Bedroom from "../../Icon/bed.svg";
import LivingRoom from "../../Icon/couch.svg";
import Kitchen from "../../Icon/fridge.svg";
import Toilet from "../../Icon/toilet.svg";
import Bathroom from "../../Icon/bath.svg";
import RoomTemplate from "./RoomTemplate";
import Dropdown from "../Dropdown/Dropdown";
import Axios from "axios";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import ReactDOM from "react-dom";

function MyRooms() {
  var barOpened = localStorage.getItem("barOpened");

  var token = localStorage.getItem("token");

  const [navbarOpen, setNavbarOpen] = useState(JSON.parse(barOpened));

  const url =
    "http://35.176.229.91:8080/api/rooms/homeId/" +
    localStorage.getItem("userHomeId");

  var headers = { authorization: localStorage.getItem("token") };

  const [rooms, setRooms] = useState([]);

  const [roomName, setRoomName] = useState();

  const [roomType, setRoomType] = useState();

  const [roomKey, setRoomKey] = useState();

  const [newRoomName, setNewRoomName] = useState();

  const [selected, setSelected] = useState("Room type ?");

  const [modal, setModal] = useState(false);

  const [modalUpdate, setModalUpdate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  //Toogle to display the modal for add a room
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  //Toogle to display the modal for update/delete
  const toggleModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  };

  if (modalUpdate) {
    document.body.classList.add("active-modalUpdate");
  } else {
    document.body.classList.remove("active-modalUpdate");
  }

  //Function to activate the "getRooms" function at each page launch
  useEffect(() => {
    getRooms();
  }, []);

  //Function to check and display the user's home rooms
  const getRooms = async () => {
    setIsLoading(true);
    try {
      let result = await fetch(url, { headers: headers });
      result = await result.json();
      console.log(result);
      setRooms(result);
      setIsLoading(false);
    } catch {
      localStorage.clear();
      window.location.replace(`http://localhost:3000`);
    }
  };

  //Function to add a new room to the database
  const submitRoom = (e) => {
    setIsLoading(true);
    e.preventDefault();
    Axios.post(`http://35.176.229.91:8080/api/rooms`, {
      room_name: roomName,
      room_type: selected,
      home_RW_key: localStorage.getItem("userHomeId"),
    }).then((res) => {
      if (res.data === "Error") {
        ReactDOM.render(
          <p>Please choose your room type</p>,
          document.getElementById("noRoomChosen")
        );
        setIsLoading(false);
        // window.location.replace(`http://localhost:3000`);
      } else {
        setIsLoading(false);
        console.log(res.data);
        window.location.reload(true);
      }
    });
  };

  //Function to modify a room 
  const editRoom = (e) => {
    setIsLoading(true);
    e.preventDefault();
    Axios.put(
      `http://35.176.229.91:8080/api/rooms/roomId/${roomKey}`,
      {
        room_name: newRoomName,
        room_type: selected,
      },
      { headers }
    ).then((res) => {
      setIsLoading(false);
      console.log(res.data);
      window.location.reload(true);
    });
  };

  //Function to link an image with a room type
  const getImage = (roomType) => {
    switch (roomType) {
      case "Bedroom":
        return Bedroom;
        break;
      case "Bathroom":
        return Bathroom;
        break;
      case "Kitchen":
        return Kitchen;
        break;
      case "Toilet":
        return Toilet;
        break;
      case "Living room":
        return LivingRoom;
        break;
    }
  };

  //If the token is no longer valid then the user is redirected to the login page
  if (!token) {
    window.location.replace(`http://localhost:3000`);
  }

  if (token) {
    return (
      <div>
        <MainContext.Provider value={{ navbarOpen, setNavbarOpen }}>
          <SideBar />
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div
              className="page_content"
              style={{
                width: !navbarOpen
                  ? "calc(100% - 78px);"
                  : "calc(100% - 240px);",
                left: !navbarOpen ? "78px" : "240px",
                overflowY: "auto",
              }}
            >
              <div className="text">MY ROOMS</div>
              <div className="subtitle">EDIT YOUR ROOMS INFORMATION</div>
              <br />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "calc(100% - 240px)",
                  marginLeft: "5%",
                }}
              >
                {rooms.map((item, index) => (
                  <RoomTemplate
                    roomName={item.room_name}
                    type={item.room_type}
                    imgSrc={getImage(item.room_type)}
                    totalNbSensor={item.total_sensors}
                    roomId={item.room_RW_key}
                  />
                ))}
              </div>
              <br />
              <div className="roomsInfo">
                <br />
                <br />
                <div className="add-room">
                  <i
                    class="bx bx-plus-circle"
                    onClick={toggleModal}
                    style={{
                      fontSize: "30px",
                      width: "30px",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  ></i>
                  <span className="add-text">Add a room</span>
                </div>
              </div>
            </div>
          )}

          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h2>Add a new room</h2>
                <br />
                <div id="settingsLastName">
                  <label for="nbSensorsRoom">Room type</label>
                  <Dropdown selected={selected} setSelected={setSelected} />
                </div>
                <br />
                <div id="settingsFirstName">
                  <label for="roomName">Room name</label>
                  <input
                    type="text"
                    id="roomName"
                    name="roomName"
                    onChange={(e) => {
                      setRoomName(e.target.value);
                    }}
                  />
                </div>
                <br />
                <br />
                <div id="noRoomChosen"></div>
                <br />
                <br />
                <button
                  onClick={submitRoom}
                  style={{ width: "50%", position: "center" }}
                >
                  Submit
                </button>
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
                  <Dropdown selected={selected} setSelected={setSelected} />
                </div>
                <br />
                <div id="settingsFirstName">
                  <label for="roomName">Room name</label>
                  <input
                    type="text"
                    id="roomName"
                    name="roomName"
                    onChange={(e) => {
                      setNewRoomName(e.target.value);
                    }}
                    value={newRoomName}
                  />
                </div>
                <br />
                <br />
                <br />
                <br />
                <button
                  onClick={editRoom}
                  style={{ width: "50%", position: "center" }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </MainContext.Provider>
        <Bulb />
      </div>
    );
  }
}
export default MyRooms;

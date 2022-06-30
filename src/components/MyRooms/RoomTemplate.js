import React, { useState } from "react";
import Axios from "axios";
import Dropdown from "../Dropdown/Dropdown";
import ReactDOM from "react-dom";

function RoomTemplate(props) {
  console.log("props", props);
  const roomName = props.roomName;
  const type = props.type;
  const imgSrc = props.imgSrc;
  const totalNbSensor = props.totalNbSensor;
  const roomId = props.roomId;

  const url =
    "http://35.176.229.91:8080/api/rooms/homeId/" +
    localStorage.getItem("userHomeId");

  const [rooms, setRooms] = useState([]);

  const [roomKey, setRoomKey] = useState();

  const [selected, setSelected] = useState("Room type ?");

  const [newRoomName, setNewRoomName] = useState();

  const [roomType, setRoomType] = useState();

  const [modalUpdate, setModalUpdate] = useState(false);
  
  const [modalEdit, setModalEdit] = useState(false);

  var headers = { authorization: localStorage.getItem("token") };

  const [isLoading, setIsLoading] = useState(false);

  //Toogle to display the modal when the user click on his room
  const toggleModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  };

  if (modalUpdate) {
    document.body.classList.add("active-modalUpdate");
  } else {
    document.body.classList.remove("active-modalUpdate");
  }

  //Toogle to display the modal when the user choose to edit his room
  const toggleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  if (modalEdit) {
    document.body.classList.add("active-modalEdit");
  } else {
    document.body.classList.remove("active-modalEdit");
  }

  //Function to delete a room
  const deleteRoom = async (id) => {
    setIsLoading(true);
    const reqOptions = {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    let result = await fetch(
      `http://35.176.229.91:8080/api/rooms/${id}`,
      reqOptions
    );
    if (result.data === "Error") {
      window.location.replace(`http://localhost:3000`);
    } else {
      window.location.reload(true);
    }
  };

  //Function that allows to retrieve a room according to its id
  const getOneRoom = (id) => {
    setIsLoading(true);
    console.log(id);
    Axios.get(`http://35.176.229.91:8080/api/rooms/roomId/${id}`, {
      headers,
    }).then((res) => {
      console.log(res.data);
      setNewRoomName(res.data.room_name);
      setRoomType(res.data.room_type);
      setIsLoading(false);
    });
  };

  //Function to edit a room
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

  return (
    <>
      <div
        className="columns is-multiline is-mobile is-centered"
        style={{ textAlign: "center", margin: "0 auto", display: "flex" }}
      >
        <div
          className="box"
          onClick={toggleModalUpdate}
          style={{ marginTop: "20px" }}
        >
          <img
            style={{ alignItems: "center" }}
            src={imgSrc}
            width="150px"
            height="150px"
          />
          <h2
            id="TitleRoom"
            style={{
              alignItems: "center",
              marginRight: "15%",
              marginLeft: "15%",
            }}
          >
            {roomName}
          </h2>
        </div>
      </div>

      {modalUpdate && (
        <div className="modal">
          <div onClick={toggleModalUpdate} className="overlay"></div>
          <div className="modal-content-small">
            <h2>{roomName}</h2>
            <br />
            <div className="itemsCentered">
              <img
                style={{ alignItems: "center" }}
                src={imgSrc}
                width="150px"
                height="150px"
              />

              {totalNbSensor > 1 ? (
                <div>{totalNbSensor} sensors in this room</div>
              ) : (
                <div>{totalNbSensor} sensor in this room</div>
              )}
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div style={{ display: "flex", marginTop: "40%" }}>
              <button
                onClick={() => {
                  toggleModalEdit();
                  getOneRoom(roomId);
                  setRoomKey(roomId);
                  toggleModalUpdate();
                }}
                style={{ width: "40%", position: "center" }}
              >
                Edit
              </button>
              <br />
              <br />
              <br />
              <button
                onClick={() => deleteRoom(roomId)}
                style={{ width: "40%", position: "center", marginLeft: "50%" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {modalEdit && (
        <div className="modal">
          <div onClick={toggleModalEdit} className="overlay"></div>
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
            <div id="noRoomChosen"></div>
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
    </>
  );
}

export default RoomTemplate;

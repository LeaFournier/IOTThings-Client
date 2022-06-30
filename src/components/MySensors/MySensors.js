import React, { useState, useEffect } from "react";
import "./MySensors.css";
import SideBar from "../../components/SideBar/SideBar";
import { MainContext } from "../../App";
import Bulb from "../../components/Bulb/Bulb";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import ReactDOM from "react-dom";
import Axios from "axios";

function MySensors() {
  var barOpened = localStorage.getItem("barOpened");

  var token = localStorage.getItem("token");

  var headers = { authorization: localStorage.getItem("token") };

  const [navbarOpen, setNavbarOpen] = useState(JSON.parse(barOpened));

  const [isActive, setIsActive] = useState(false);

  const [options, setOptions] = useState([]);

  const [modalMessage, setModalMessage] = useState("Add a new sensor");

  const [data, setData] = useState({
    sensorId: "",
  });

  const [selected, setSelected] = useState("Which room ? *");

  const [sensorName, setSensorName] = useState();

  const [sensorType, setSensorType] = useState();

  const [sensorId, setSensorId] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [sensors, setSensors] = useState([]);

  const [modal, setModal] = useState(false);

  const [modalEdit, setModalEdit] = useState(false);

  //Toogle to display the modal for add a sensor
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  //Toogle to display the modal for edit a sensor
  const toggleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  if (modalEdit) {
    document.body.classList.add("active-modalEdit");
  } else {
    document.body.classList.remove("active-modalEdit");
  }

  //Function to activate the "getMyRooms" and "getSensors" functions at each page launch
  useEffect(() => {
    getSensors();
    getMyRooms();
  }, []);

  //Function to check and display the user's home sensors
  const getSensors = async () => {
    setIsLoading(true);
    try {
      let result = await fetch(
        `http://35.176.229.91:8080/api/sensors/homeId/` +
          localStorage.getItem("userHomeId"),
        { headers: headers }
      );
      result = await result.json();
      console.log(result);
      setSensors(result);
      setIsLoading(false);
    } catch {
      localStorage.clear();
      window.location.replace(`http://localhost:3000`);
    }
  };

  //Function to delete a sensor
  const deleteSensor = async (id) => {
    setIsLoading(true);
    const reqOptions = {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: { home_RW_key: localStorage.getItem("userHomeId") },
    };
    let result = await fetch(
      `http://35.176.229.91:8080/api/sensors/sensorId/${id}`,
      reqOptions
    );
    if (result.data === "Error") {
      window.location.replace(`http://localhost:3000`);
    } else {
      getSensors();
    }
  };

  //Function that displays the rooms of the user's home
  const getMyRooms = async () => {
    let result = await fetch(
      `http://35.176.229.91:8080/api/rooms/roomsNames/homeId/` +
        localStorage.getItem("userHomeId"),
      { headers: headers }
    );
    result = await result.json();
    setOptions(result);
  };

  //Function to check if a sensor exists in the database
  function checkSensor(e) {
    e.preventDefault();
    Axios.get(
      `http://35.176.229.91:8080/api/sensors/sensorvalidator/${sensorId}`,
      {
        sensorId: data.sensorId,
      }
    ).then((res) => {
      if (res.data[0].found === "Sensor found") {
        e.preventDefault();
        getOneSensor();
        toggleModalEdit();
      } else if (res.data === "Sensor not found") {
        ReactDOM.render(
          <p>This sensor Id doesn't exist ! Try again</p>,
          document.getElementById("SensorNotfound")
        );
      }
    });
  }

  //Function to add a sensor in the database
  const createSensor = (e) => {
    setIsLoading(true);
    e.preventDefault();
    Axios.post(
      `http://35.176.229.91:8080/api/sensors/${sensorId}`,
      {
        sensor_name: sensorName,
        home_RW_key: localStorage.getItem("userHomeId"),
        room_name: selected,
      },
      { headers }
    ).then((res) => {
      if (res.data === "Error") {
        ReactDOM.render(
          <p>Please choose your room</p>,
          document.getElementById("noRoomChosen")
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log(res.data);
        window.location.reload(true);
      }
    });
  };

  //Function that allows to retrieve a sensor according to its id
  const getOneSensor = () => {
    setIsLoading(true);
    Axios.get(`http://35.176.229.91:8080/api/sensors/sensorId/${sensorId}`, {
      headers,
    }).then((res) => {
      setSensorName(null);
      setModalMessage("Add a new sensor");
      setSensorName(res.data.sensor_name);
      setSensorType(res.data.sensor_type);
      setSensorId(res.data.sensor_RW_key);
      setIsLoading(false);
    });
  };

  //Function that allows to retrieve a sensor according to its id for update
  const getOneSensorToUpdate = (id) => {
    setIsLoading(true);
    Axios.get(`http://35.176.229.91:8080/api/sensors/sensorId/${id}`, {
      headers,
    }).then((res) => {
      setSensorName(res.data.sensor_name);
      setSensorType(res.data.sensor_type);
      setSensorId(res.data.sensor_RW_key);
      setIsLoading(false);
    });
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
              <div className="text">MY SENSORS</div>
              <div className="subtitle">EDIT YOUR SENSORS INFORMATION</div>

              <br />
              <div className="rooms-list">
                <ul className="titleSensor">
                  <li style={{ textAlign: "center" }}>Sensor name</li>
                  <li style={{ textAlign: "center" }}>Sensor type</li>
                  <li style={{ textAlign: "center" }}>Room</li>
                  <li style={{ textAlign: "center" }}>Delete a sensor</li>
                  <li style={{ textAlign: "center" }}>Update a sensor</li>
                </ul>
                {sensors.map((item, index) => (
                  <ul key={item._id}>
                    <li style={{ textAlign: "center" }}>{item.sensor_name}</li>
                    <li style={{ textAlign: "center" }}>{item.sensor_type}</li>
                    <li style={{ textAlign: "center" }}>{item.room_name}</li>
                    <li>
                      <button
                        id="deleteButton"
                        onClick={() => deleteSensor(item.sensor_RW_key)}
                        style={{ marginLeft: "45px", marginTop: "35px" }}
                      >
                        Delete
                      </button>
                    </li>
                    <li>
                      <button
                        id="updateButton"
                        onClick={() => {
                          toggleModalEdit();
                          getOneSensorToUpdate(item.sensor_RW_key);
                          setModalMessage("Edit this sensor");
                          setSensorId(item.sensor_RW_key);
                        }}
                        style={{ marginLeft: "50px", marginTop: "35px" }}
                      >
                        Update
                      </button>
                    </li>
                  </ul>
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
                  <span className="add-text">Add a sensor</span>
                </div>
              </div>
            </div>
          )}

          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h2>Add a new sensor</h2>
                <br />
                <label for="sensorId">Add your sensor ID</label>
                <input
                  onChange={(e) => setSensorId(e.target.value)}
                  placeholder="Sensor ID"
                  type="text"
                  id="sensorId"
                ></input>
                <div id="SensorNotfound"></div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <button
                  onClick={checkSensor}
                  style={{ width: "50%", position: "center" }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {modalEdit && (
            <div className="modal">
              <div onClick={toggleModalEdit} className="overlay"></div>
              <div className="modal-content-sensor">
                <h2>{modalMessage}</h2>
                <br />
                <div id="settingsFirstName">
                  <label for="sensorID">Sensor ID</label>
                  <input
                    type="text"
                    id="sensorID"
                    name="sensorID"
                    value={sensorId}
                    disabled="disabled"
                    placeholder="Automatically Generated"
                    style={{ backgroundColor: "#ccc5b9", cursor: "no-drop" }}
                  />
                </div>
                <div id="settingsFirstName">
                  <label for="sensorType">Sensor type</label>
                  <input
                    type="text"
                    id="sensorType"
                    name="sensorType"
                    value={sensorType}
                    disabled="disabled"
                    placeholder="Automatically Generated"
                    style={{ backgroundColor: "#ccc5b9", cursor: "no-drop" }}
                  />
                </div>
                <div id="settingsLastName">
                  <label for="nbSensorsRoom">Room</label>

                  <div className="dropdown">
                    <div
                      className="dropdown-btn"
                      onClick={(e) => setIsActive(!isActive)}
                    >
                      {selected}
                      <i
                        class="bx bxs-chevron-down"
                        style={{ fontSize: "23px" }}
                      ></i>
                    </div>
                    {isActive && (
                      <div className="dropdown-content">
                        {options.map((option) => (
                          <div
                            className="dropdown-item"
                            required
                            onClick={(e) => {
                              setSelected(option);
                              setIsActive(false);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <br />
                <div id="settingsFirstName">
                  <label for="sensorName">Sensor name</label>
                  <input
                    type="text"
                    id="sensorName"
                    name="sensorName"
                    placeholder="Sensor name"
                    value={sensorName}
                    onChange={(e) => {
                      setSensorName(e.target.value);
                    }}
                  />
                </div>
                <div id="noRoomChosen"></div>
                <br />
                <br />
                <button
                  onClick={createSensor}
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
export default MySensors;

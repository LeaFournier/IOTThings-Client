import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import "./Settings.css";
import SideBar from "../../components/SideBar/SideBar";
import { MainContext } from "../../App";
import Bulb from "../../components/Bulb/Bulb";
import userImg from "../../userImg.png";
import Axios from "axios";
import LoadingSpinner from "../Spinner/LoadingSpinner";

function Settings() {
  var userId = localStorage.getItem("id");

  var barOpened = localStorage.getItem("barOpened");

  const url = "http://35.176.229.91:8080/api/endUsers/" + userId;

  const [isLoading, setIsLoading] = useState(false);

  var token = localStorage.getItem("token");

  // USED FOR AVATAR
  const [file, setFile] = useState("");

  const [newAvatar, setNewAvatar] = useState();

  //Function to send the new avatar to the database
  const onSubmitAvatar = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    await Axios.post(
      "http://35.176.229.91:8080/api/endUsers/avatar/" + userId,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: localStorage.getItem("token"),
        },
      }
    ).then((res) => {
      if (res.data === "Error") {
        localStorage.clear();
        window.alert("Update failed, please reconnect");
        window.location.replace(`http://localhost:3000`);
      } else {
        localStorage.setItem("avatarUrl", res.data);
        window.location.reload(true);
      }
    });
  };

  //Function that displays the new selected avatar to ask for a confirmation of the change 
  const onNewAvatar = (e) => {
    setNewAvatar(true);
    var output = document.getElementById("newImage");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
    ReactDOM.render(
      <label for="newAvatarToUpload">New Avatar :</label>,
      document.getElementById("newAvatarToUpload")
    );
    setFile(e.target.files[0]);
    console.log("Hello");
  };

  // USED FOR USER FORM
  const [navbarOpen, setNavbarOpen] = useState(JSON.parse(barOpened));

  const [username, setUsername] = useState([]);

  const [firstName, setFirstName] = useState([]);

  const [lastName, setLastName] = useState([]);

  const [email, setEmail] = useState([]);

  const [phone, setPhone] = useState([]);

  const [avatar, setAvatar] = useState([]);

  var headers = { authorization: localStorage.getItem("token") };

  const user = {
    pseudo: username,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
  };

  //Function that displays data each time the page is launched
  useEffect(() => {
    setIsLoading(true);
    const asyncFn = async () => {
      try {
        let result = await fetch(url, { headers: headers });
        result = await result.json();
        setUsername(result[0].endUser.pseudo);
        setFirstName(result[0].endUser.first_name);
        setLastName(result[0].endUser.last_name);
        setPhone(result[0].endUser.phone);
        setEmail(result[0].endUser.email);
        setAvatar(result[0].avatar);
        setIsLoading(false);
      } catch {
        localStorage.clear();
        window.location.replace(`http://localhost:3000`);
      }
    };
    asyncFn();
  }, []);

  //Function that allows you to change the information displayed
  function updateUser(e) {
    setIsLoading(true);
    e.preventDefault();
    Axios.put(url, user, { headers }).then((res) => {
      if (res.data === "Error") {
        localStorage.clear();
        window.alert("Update failed, please reconnect");
        window.location.replace(`http://localhost:3000`);
      } else {
        setIsLoading(false);
        console.log("Changement effectué");
        localStorage.setItem("username", username);
      }
    });
  }

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
              }}
            >
              <div className="text">SETTINGS</div>
              <div className="subtitle">EDIT YOUR PROFILE</div>
              <div
                className="columns is-multiline is-mobile is-centered"
                style={{
                  margin: "0 auto",
                  display: "flex",
                  columnWidth: "300px",
                }}
              >
                <div
                  className="column is-narrow is-flex-direction-column settingsBox"
                  style={{
                    marginLeft: "5%",
                    marginTop: "5%",
                    marginRight: "3%",
                    width: "20%",
                  }}
                >
                  <div id="settingsUsername">
                    <label for="username">Username</label>
                    <input
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      value={username}
                      type="text"
                      id="username"
                      name="username"
                    />
                  </div>
                  <div id="settingsFirstName">
                    <label for="firstname">First Name</label>
                    <input
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                      type="text"
                      id="firstname"
                      name="firstname"
                    />
                  </div>
                  <div id="settingsLastName">
                    <label for="lastname">Last Name</label>
                    <input
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      value={lastName}
                      type="text"
                      id="lastname"
                      name="lastname"
                    />
                  </div>
                  <div id="settingsEmail">
                    <label for="email">Email</label>
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      type="text"
                      id="email"
                      name="email"
                    />
                  </div>
                  <div id="settingsPhone">
                    <label for="phone">Phone</label>
                    <input
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      value={phone}
                      type="text"
                      id="phone"
                      name="phone"
                    />
                  </div>
                  <br />
                  <div id="successForm"></div>
                  <button
                    className="SettingsProfile"
                    onClick={updateUser}
                    disabled={isLoading}
                  >
                    Submit
                  </button>
                </div>

                <div
                  className="column is-narrow is-flex-direction-column settingsBox"
                  style={{
                    marginRight: "5%",
                    marginLeft: "3%",
                    marginTop: "5%",
                  }}
                >
                  <div>
                    <label id="labelAvatar" for="settingsUserPic">
                      Avatar
                    </label>
                  </div>
                  <div className="userPicture">
                    <br />
                    <label for="userPic">
                      <img
                        style={{
                          width: "auto",
                          maxHeight: "300px",
                          maxWidth: "350px",
                          borderRadius: "8px",
                          boxShadow: "5px 10px 8px #888888",
                          border: "solid rgba(17, 23, 93, 0.75) 2px",
                        }}
                        src={avatar || userImg}
                        className="user"
                        id="settingsUserPic"
                      />
                    </label>
                    <input id="userPic" type="file" onChange={onNewAvatar} />
                    <div id="successAvatar"></div>
                  </div>
                </div>

                <div
                  className="column is-narrow is-flex-direction-column settingsBox"
                  style={{
                    marginRight: "5%",
                    marginLeft: "3%",
                    marginTop: "5%",
                    alignItems: "center",
                  }}
                >
                  <div className="newUserPicture">
                    <div id="newAvatarToUpload"></div>
                    <br />
                    <div>
                      <img
                        id="newImage"
                        style={{
                          width: "auto",
                          maxHeight: "400px",
                          maxWidth: "350px",
                        }}
                      />
                    </div>
                    <br />
                    {newAvatar ? (
                      <button
                        className="SettingsPicture"
                        disabled={isLoading}
                        onClick={onSubmitAvatar}
                        style={{
                          width: "16%",
                          height: "5%",
                          marginTop: "5px",
                          alignItems: "center",
                        }}
                      >
                        Confirm
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}
        </MainContext.Provider>
        <Bulb />
      </div>
    );
  }
}

export default Settings;

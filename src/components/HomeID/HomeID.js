import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./HomeID.css";
import Axios from "axios";

function HomeID() {
  var userHomeId = localStorage.getItem("userHomeId");

  const url = "http://35.176.229.91:8080/api/endusers/homeId/";
  const [data, setData] = useState({
    homeId: "",
    ownerName: "",
    sensorId: "",
  });

  //Function to check if the home id exists in the server side database + redirect
  function submit(e) {
    e.preventDefault();
    Axios.get(url + data.homeId, {
      homeId: data.homeId,
    }).then((res) => {
      console.log(res.data);
      if (res.data[0].found === "Home found") {
        e.preventDefault();
        localStorage.setItem("userHomeId", data.homeId);
        window.location.replace(
          `http://localhost:3000/${data.homeId}/signupForm`
        );
      } else if (res.data === "Home not found") {
        ReactDOM.render(
          <p>This home Id doesn't exist ! Try again</p>,
          document.getElementById("HomeNotfound")
        );
      }
    });
  }

  //Function to store the user's input in value
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }
  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <input
          onChange={(e) => handle(e)}
          value={data.homeId}
          placeholder="Home ID"
          type="text"
          id="homeId"
        ></input>
        <div id="HomeNotfound"></div>
        <br /> <br /><br />
        <div id="buttonContainer">
          <button>Confirm</button>
        </div>
      </form>
    </div>
  );
}

export default HomeID;

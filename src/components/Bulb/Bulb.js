import React, { useState } from "react";
import bulb from "../../bulb1.png";
import "./Bulb.css";

function Bulb() {
  var light = localStorage.getItem("bulb");

  const [isDark, setisDark] = useState(JSON.parse(light));

  if (isDark) {
    //Defines a body id in dark mode
    document.body.id = "dark";
    localStorage.setItem("bulb", "false");
  } else {
    //Defines a body id in light mode
    document.body.id = "white";
    localStorage.setItem("bulb", "true");
  }

  //Toogle to activate the dark mode
  const darkMode = () => {
    setisDark(!isDark);
  };

  return (
    <div>
      <img className="bulb" src={bulb} onClick={darkMode} />
    </div>
  );
}

export default Bulb;

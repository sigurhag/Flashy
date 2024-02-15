import React, { useState } from "react";
import LogInButton from "./Button";
import { Link } from "react-router-dom";
import axios from "axios";

const LogInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress = async () => {
    try {
      const response = await axios.post("", { //Link to spring 
        username: username,
        password: password,
      });

      if (response.data.success) {
        console.log("approved login");
        // Might want to use token or cookies here to remember logged in user
      } else {
        console.log("error login in");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className='vh-100 flex flex-column justify-center items-center'>
      <h1 className="f1 mb3">FLASHY</h1>
      <label className="mb3">
        <input 
          style={{borderRadius: '90px'}}
          type="text" 
          className="grow pa2 font-color" 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="mb3">
        <input 
          style={{borderRadius: '90px'}}
          type="password" 
          className="grow pa2 font-color" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
        <Link to="/home">
          <LogInButton onClick={handleLoginPress}/>
        </Link>
    </div>
  );
};

export default LogInForm;

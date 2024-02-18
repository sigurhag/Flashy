import React, { useState } from "react";
import LogInButton from "./Button";
import { Link } from "react-router-dom";
import BackButton from "../registration/BackButton";
import axios from "axios";

const LogInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginPress = async () => {  
      try {
      const response = await axios.post("http://localhost:3500/flash/verify", username, password);
      if (response.data) {
          console.log("Log in successful!");
          //Save information about logged in user
      } else {
          console.log("error with loggin in")
      } 
  } catch(error) {
          console.error("unexpected error: ", error);
      }
  }

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
                    onChange ={(e) => {setUsername(e.target.value)}}
                />
            </label>
            <label className="mb3">
                <input 
                        style={{borderRadius: '90px'}}
                        type="password" 
                        className="grow pa2 font-color" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
            </label>
            <Link to="/home"><LogInButton onClick={handleLoginPress} /></Link>
            <Link to="/"><BackButton /></Link>
        </div>
    );
}

export default LogInForm
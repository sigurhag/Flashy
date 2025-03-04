import React, { useState } from "react";
import LogInButton from "./Button";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../registration/BackButton";
import axios from "axios";

const LogInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLoginPress = async () => {  

      try {
      const response = await axios.post("http://localhost:3500/flash/verify", {
        username: username,
        password: password
      })
      if (response.data) {
        navigate("/home");
        console.log("Log in successful!");
        //Save information about logged in user
      } else {
            setErrorMessage("Wrong username and/or password"); // Update UI with error message
          } 
        } catch(error) {
            console.error("unexpected error: ", error);
            setErrorMessage("Wrong username and/or password");
        }
    }
    
    return (
        <div className='vh-100 flex flex-column justify-center items-center'>
            <h1 className="f1 mb3">FLASHY</h1>
            {errorMessage && <div style={{color: 'red', marginBottom: '10px'}}>{errorMessage}</div>}
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
            <LogInButton onClick={handleLoginPress} />
            <Link to="/"><BackButton /></Link>
        </div>
    );
}

export default LogInForm
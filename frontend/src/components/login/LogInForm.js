import React from "react";
import LogInButton from "./Button";
import { Link } from "react-router-dom";
import BackButton from "../registration/BackButton";

const LogInForm = () => {
    return (
        <div className='vh-100 flex flex-column justify-center items-center'>
            <h1 className="f1 mb3">FLASHY</h1>
            <label className="mb3">
                <input 
                    style={{borderRadius: '90px'}}
                    type="text" 
                    className="grow pa2 font-color" 
                    placeholder="Username" 
                />
            </label>
            <label className="mb3">
                <input 
                        style={{borderRadius: '90px'}}
                        type="password" 
                        className="grow pa2 font-color" 
                        placeholder="Password" 
                    />
            </label>
            <div className="flex flex-column justify-center items-center">
                <Link to="/home"><LogInButton /></Link>
                <Link to="/"><BackButton /></Link>
            </div>    
        </div>
    );
}

export default LogInForm
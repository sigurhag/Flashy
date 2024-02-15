import React from "react";
import RegisterButton from "./Button";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";

const RegisterForm = () => {
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
                    type="text" 
                    className="grow pa2 font-color" 
                    placeholder="E-mail" 
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
            <label className="mb3">
                <input 
                        style={{borderRadius: '90px'}}
                        type="password" 
                        className="grow pa2 font-color" 
                        placeholder="Repeat Password" 
                    />
            </label>
            <Link to="/home"><RegisterButton /></Link>
            <Link to="/"><BackButton /></Link>
        </div>
    );
}

export default RegisterForm;
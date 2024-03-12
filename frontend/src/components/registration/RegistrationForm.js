import React, { useState } from "react";
import RegisterButton from "./Button";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import axios from "axios";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    const handleRegisterPress = async () => {
        try {
        const response = await axios.post("http://localhost:3500/flash/register", {
            username: username,
            email: email,
            password: password,
            password2: password2
        })
        console.log(response);
        navigate("/home");
        if (response.data.success) {
            console.log("Registration successful!");
        } else {
            console.log("error with registration")
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
                    onChange= {(e) => setUsername(e.target.value)}
                />
            </label>
            <label className="mb3">
                <input 
                    style={{borderRadius: '90px'}}
                    type="text" 
                    className="grow pa2 font-color" 
                    placeholder="E-mail" 
                    value={email}
                    onChange= {(e) => setEmail(e.target.value)}
                />
            </label>
            <label className="mb3">
                <input 
                        style={{borderRadius: '90px'}}
                        type="password" 
                        className="grow pa2 font-color" 
                        placeholder="Password" 
                        value={password}
                        onChange= {(e) => setPassword(e.target.value)}
                    />
            </label>
            <label className="mb3">
                <input 
                        style={{borderRadius: '90px'}}
                        type="password" 
                        className="grow pa2 font-color" 
                        placeholder="Repeat Password" 
                        value={password2}
                        onChange= {(e) => setPassword2(e.target.value)}
                    />
            </label>
            <RegisterButton onClick={handleRegisterPress} />
            <Link to="/"><BackButton/></Link>
        </div>
    );
}

export default RegisterForm;
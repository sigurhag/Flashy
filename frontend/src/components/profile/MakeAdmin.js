import axios from "axios";
import React from "react";
import GeneralButton from "../GeneralButton";

const MakeAdmin = ({ username, email, password, userID }) => {
    const handleClick = async () => {
        try {
            const response = await axios.post("http://localhost:3500/flash/updateAdmin", {params: {userID: userID}});
            if(response.data) {
                console.log("Updated admin rights successfully")
            } else{
                console.log("error updating admin rights")
            }
        } catch (error) {
            console.error("unexpected error occured: ", error)
        }
    };
    
    return (
        <div className="flex flex-row justify-between items-center bg-color-card pa2 ma3" style={{borderRadius: '90px'}}>
            <div className="pl4">
                <h2 className="mb1">{username}</h2>
                <h3 className="mt1">{email}</h3>
            </div>
            <div className="mr3">
                <GeneralButton text={"Make admin"} onClick={handleClick}/>
            </div>
        </div>
    );
}

export default MakeAdmin

import React, {useState} from "react";
import GeneralButton from "../GeneralButton";

const MakeAdmin = ({ username, email }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const handleClick = () => {
        setIsAdmin(!isAdmin);
        /* fix backed */ 
    };
    return (
        <div className="flex flex-row justify-between items-center bg-color-card pa2 ma3" style={{borderRadius: '90px'}}>
            <div className="pl4">
                <h2 className="mb1">{username}</h2>
                <h3 className="mt1">{email}</h3>
            </div>
            <div className="mr3">
                <GeneralButton text={isAdmin ? "Undo admin" : "Make admin"} onclick={handleClick}/>
            </div>
        </div>
    );
}

export default MakeAdmin

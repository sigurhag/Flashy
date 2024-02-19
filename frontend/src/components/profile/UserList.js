import React from "react";
import MakeAdmin from "./MakeAdmin";
import { users } from "./Users"; 

const UserList = () => {
    return (
        <div>
            {users.map((user, index) => (
                <MakeAdmin key={index} username={user.username} email={user.email}/>
            ))}
        </div>
    );
}

export default UserList;
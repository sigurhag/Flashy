import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import GeneralButton from '../components/GeneralButton';
import axios from "axios";
import Searchbar from '../components/Searchbar';
import UserList from '../components/profile/UserList';
import { users } from '../components/profile/Users';

const Profile = ({ user = {} }) => {
  const { username, email } = user;
  const [userInfo, setUserInfo] = useState([]);
  const [allUsers, setAllUsers] = useState(users); // Use fetched user list if dynamic
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const getUSerData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/flash/profile", {
          params: {username, email}
        });
        if (response.data) {
          setUserInfo(response.data);
          console.log("fetched data successfully!");
        } else {
          console.log("error fetching userdata")
        } 
      } catch (error) {
        console.error("Error fetching user info: ", error);
      }
    };
    getUSerData();
  }, [username, email])
  
  const handleSearch = (searchQuery) => {
    if (!searchQuery) {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleChangeUsername = async () => {
    const newUsername = prompt("Enter your new username (between 5 and 20 characters):");
    if (newUsername && newUsername.length >= 5 && newUsername.length <= 20) {
      try {
        await axios.post("http://localhost:3500/flash/changeUsername", {
          newUsername
        });
        alert("Username changed successfully!");
      } catch (error) {
        alert("Error changing username. Please try again later.");
      }
    } else if (newUsername !== null){
      alert("Username must be between 5 and 20 characters.");
    }
  };

  const handleChangeEmail = async () => {
    const newEmail = prompt("Enter your new email:");
    if (newEmail !== null) {
      if (newEmail.endsWith("@gmail.com") || newEmail.endsWith("@stud.ntnu.no") || newEmail.endsWith("@hotmail.com")) {
        try {
          await axios.post("http://localhost:3500/flash/changeEmail", {
            newEmail
          });
          alert("Email changed successfully!");
        } catch (error) {
          alert("Error changing email. Please try again later.");
        }
      } else if (newEmail !== null){
        alert("Email must be valid");
      }
    }
    else{
      
    }
  };

  const handleChangePassword = async () => {
    const newPassword = prompt("Enter your new password (between 7 and 20 characters):");
    if (newPassword && newPassword.length >= 7 && newPassword.length <= 20) {
      try {
        await axios.post("http://localhost:3500/flash/changePassword", {
          newPassword
        });
        alert("Password changed successfully!");
      } catch (error) {
        alert("Error changing password. Please try again later.");
      }
    } else if (newPassword !== null){
      alert("Password must be between 7 and 20 characters.");
    }
  };

  return (
    <div className='flex flex-column justify-center items-center'>   
      <UserProfileIcon />
      <Sidebar />
      <div className='tc mb4 fixed-top-middle'>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>My profile</h2>      
      </div>
      <div className="flex flex-column  pa3 bg-color-card" style={{ width: "500px", marginTop: '15%', padding:'5% 5% 2% 5%', borderRadius: '70px' }}>
        <h2 className="f3 ">Username: {userInfo[0]}</h2>
        <h2 className="f3 mb5 ">E-mail: {userInfo[1]}</h2>  
        <GeneralButton text={"Change username"} onClick={handleChangeUsername}/>
        <GeneralButton text={"Change email"} onClick={handleChangeEmail}/>
        <GeneralButton text={"Change password"} onClick={handleChangePassword}/>
      </div>
      <div className='mt4'>
        <h2 style={{marginBottom: '1%'}}>Handle admin access</h2>
        <UserList users={filteredUsers}/>   
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import GeneralButton from '../components/GeneralButton';
import axios from "axios";
import UserList from '../components/profile/UserList';

const Profile = ({ user = {}, isDarkMode }) => {
  const { username, email } = user;
  const [userInfo, setUserInfo] = useState([]);
  const [AdminRights, setAdminRights] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const UserResponse = await axios.get("http://localhost:3500/flash/profile", {
          params: {username, email}
        });
        console.log(UserResponse)
        if (UserResponse.data) {
          setUserInfo(UserResponse.data);
          console.log("fetched data successfully!");
        } else {
          console.log("error fetching userdata")
        } 
        const AdminResponse = await axios.get("http://localhost:3500/flash/adminRights");
        if(AdminResponse.data) {
          setAdminRights(true);
          setUserInfo(UserResponse.data)
          console.log("Fetched admin rights successfully!");
        } else {
          console.log("this user does not have admin rights!");
        }
      } catch (error) {
        console.error("Error fetching user info: ", error);
      }
    };
    fetchData();
  }, [username, email])

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
    <div className={isDarkMode ? 'dark-mode' : ''}>
    <div className='flex flex-column justify-center items-center'>   
      <UserProfileIcon isDarkMode={isDarkMode}/>
      <Sidebar isDarkMode={isDarkMode}/>
      <div className={'flex flex-column items-center fixed-top-middle ' + (isDarkMode ? 'dark-mode' : '')}>

        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>My profile</h2>      
      </div>
      <div className="flex flex-column  pa3" style={{ width: "500px", marginTop: '15%', padding:'5% 5% 2% 5%', borderRadius: '70px', backgroundColor: isDarkMode ? "#124a8b" : "#FFEFC5"}}>
        <h2 className="f3 ">Username: {userInfo[0]}</h2>
        <h2 className="f3 mb4 ">E-mail: {userInfo[1]}</h2>   
        <GeneralButton text={"Change username"} onClick={handleChangeUsername}/>
        <GeneralButton text={"Change email"} onClick={handleChangeEmail}/>
        <GeneralButton text={"Change password"} onClick={handleChangePassword}/>
      </div>
      {AdminRights && (
      <div className='mt4'>
        <h2 style={{marginBottom: '1%'}}>Handle admin access</h2>
          <UserList />  
      </div>
      )}
    </div>
    </div>
  );
};

export default Profile;

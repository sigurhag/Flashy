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
        <GeneralButton text={"Change password"}/>
      </div>
      <div className='mt4'>
        <h2 style={{marginBottom: '1%'}}>Handle admin access</h2>
        <UserList users={filteredUsers}/>   
      </div>
    </div>
  );
};

export default Profile;

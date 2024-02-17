import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import GeneralButton from '../components/GeneralButton';
import { user } from '../components/profile/User';

const Profile = (props) => {
  const { user } = props;
  const { username, email } = user;
  return (
    <div className='flex flex-column justify-center items-center'>   
      <UserProfileIcon />
      <Sidebar />
      <div className='tc mb4 fixed-top-middle'>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>My profile</h2>      
      </div>
      <div className="flex flex-column  pa3 bg-color-card" style={{ width: "500px", marginTop: '16%', padding:'5% 5% 2% 5%', borderRadius: '70px' }}>
        <h2 className="f3 ">Username: {username}</h2>
        <h2 className="f3 mb5 ">E-mail: {email}</h2>
        <GeneralButton name="Change Password" />
      </div>
    </div>
  );
};

export default Profile;

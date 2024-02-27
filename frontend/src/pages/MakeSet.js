import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import CreateSet from '../components/makeset/CreateSet';



const MakeSetPage = ({ cards }) => {
  return (
    <div>
      <UserProfileIcon />
      <Sidebar />
      <div className='flex flex-column items-center fixed-top-middle'>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>Create set</h2>      
      </div>
      <div className='flex flex-column items-center' style={{marginTop: '25vh'}}>
          <CreateSet />
      </div>
    </div>

  );
};

export default MakeSetPage;

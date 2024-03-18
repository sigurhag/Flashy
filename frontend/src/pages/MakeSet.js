import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import CreateSet from '../components/makeset/CreateSet';



const MakeSetPage = ({isDarkMode}) => {
  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <UserProfileIcon isDarkMode={isDarkMode}/>
      <Sidebar isDarkMode={isDarkMode}/>
      <div className={'flex flex-column items-center fixed-top-middle ' + (isDarkMode ? 'dark-mode' : '')}>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>Create set</h2>      
      </div>
      <div className='flex flex-column items-center' style={{ marginTop: '27vh' }}>
        <CreateSet isDarkMode={isDarkMode}/>
      </div>
    </div>

  );
};

export default MakeSetPage;

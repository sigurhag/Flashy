import React from 'react';
import CardList from '../components/cards/CardList';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import MakeSet from '../components/cards/MakeSet';



const MySetspage = ({ cards }) => {
  return (
    <div>
      <UserProfileIcon />
      <Sidebar />
      <MakeSet />
      <div className='flex flex-column items-center fixed-top-middle'>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>My sets</h2>      
      </div>
      <div className='flex flex-column items-center'
      style={{marginTop: '25vh'}}>
        <div className='w-70'>
          <CardList cards={cards}/>
        </div>
      </div>
    </div>

  );
};

export default MySetspage;

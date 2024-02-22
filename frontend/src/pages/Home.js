import React from 'react';
import CardList from '../components/cards/CardList';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import FavouritesButton from '../components/cards/icons/Favourites';
import RemoveButton from '../components/cards/icons/Remove';
import EditButton from '../components/cards/icons/Edit';

const Homepage = ({ cards }) => {
  return (
    <div>
      <Sidebar />
      <UserProfileIcon />
      <div className='flex flex-column items-center fixed-top-middle'>
        <h2 className='f2  mt3 mb1'>Welcome to</h2>      
        <h1 className='f1 mt1 mb3 '>FLASHY</h1>
      </div>
      <div className='flex flex-column items-center'
      style={{marginTop: '25vh'}}>
        <h1>Today's topic: Science</h1>
        <div className='w-70'>
          <CardList favourite={FavouritesButton} remove={RemoveButton} edit={EditButton} />  
        </div>
      </div>
    </div>
  );
};

export default Homepage;

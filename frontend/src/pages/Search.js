import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import CardList from '../components/cards/CardList';
import FavouritesButton from '../components/cards/icons/Favourites';
import RemoveButton from '../components/cards/icons/Remove';
import EditButton from '../components/cards/icons/Edit';


const Searchpage = () => {
  return (
    <div>
      <UserProfileIcon />
      <Sidebar />
      <div className='flex flex-column items-center fixed-top-middle'>
        	<h1 className='f1 mt3 mb1'>FLASHY</h1>
    	  <h2 className='f2 mt1'>Search</h2>    
    </div>
    <div 
      className='flex flex-column justify-center items-center'
      style={{marginTop: '25vh'}}
    >
      	<div className='w-70 '>
          <CardList favourite={FavouritesButton} remove={RemoveButton} edit={EditButton} />  
        </div>
    </div>
  </div>
  );
};

export default Searchpage;

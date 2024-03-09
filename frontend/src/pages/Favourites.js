import React, { useEffect, useState }from 'react';
import CardList from '../components/cards/CardList';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import FavouritesButton from '../components/cards/icons/Favourites';
import RemoveButton from '../components/cards/icons/Remove';
import EditButton from '../components/cards/icons/Edit';
import axios from 'axios';


const Favouritespage = ({ sets }) => {
  const[set, setSet] = useState([]);

  useEffect(() => {
    const getSets = async() => {
      try {
        const response = await axios.get("");
        if(response.data) {
          setSet(response.data);
          console.log("Fetched cards sucessfully!");
        } else {
          console.log("Failed to fetch cards");
        }
      } catch (error) {
        console.error("An unexpected error occured: ", error);
      };
    }
    getSets();
  }, [sets])
  


  return (
    <div>
      <UserProfileIcon />
      <Sidebar />
      <div className='flex flex-column items-center fixed-top-middle'>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>Favourites</h2>      
      </div>
      <div className='flex flex-column items-center'
      style={{marginTop: '25vh'}}>
        <div className='w-70'>
        <CardList set={set} favourite={FavouritesButton} remove={RemoveButton} edit={EditButton} />  
        </div>
      </div>
    </div>

  );
};

export default Favouritespage;

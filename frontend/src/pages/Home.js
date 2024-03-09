import React, { useEffect, useState } from 'react';
import CardList from '../components/cards/CardList';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import FavouritesButton from '../components/cards/icons/Favourites';
import RemoveButton from '../components/cards/icons/Remove';
import EditButton from '../components/cards/icons/Edit';
import axios from 'axios';

const Homepage = ({ sets }) => {
  const[set, setSet] = useState([]);

  useEffect(() => {
    const getSets = async() => {
      try {
        const response = await axios.get("http://localhost:3500/flash/mostpopular");
        if(response.data) {
            const setInfo = response.data.map((set) => ({
              setID: set.setID,
              setname: set.setname,
              category: set.theme,
              length: set.size,
              creator: set.userID,
            }))
          setSet(setInfo);
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
          <CardList set={set} favourite={FavouritesButton} remove={RemoveButton} edit={EditButton} />  
        </div>
      </div>
    </div>
  );
};

export default Homepage;

import React, { useEffect, useState }from 'react';
import CardList from '../components/cards/CardList';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import axios from 'axios';
import Icon from '../components/cards/Icon';
import { faHeart, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Favouritespage = ({ sets }) => {
  const favouriteBtn = <Icon icon={faHeart} color={'white'} onHoverColor={'#FFA5A5'}/>
	const removeBtn = <Icon icon={faTrash} color={'white'} onHoverColor={'grey'}/> /* Delete skal kun komme opp for admin */
	const editBtn = <Icon icon={faPenToSquare} color={'white'} onHoverColor={'#34B8F0'}/> 

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
        <CardList favourite={favouriteBtn} remove={removeBtn} edit={editBtn} />  
        </div>
      </div>
    </div>

  );
};

export default Favouritespage;

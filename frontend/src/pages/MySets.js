import React, { useEffect, useState } from 'react';
import CardList from '../components/cards/CardList';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import SetBtn from '../components/cards/MakeSet';
import axios from 'axios';
import Icon from '../components/cards/Icon';
import { faHeart, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';



const MySetspage = ({sets, isDarkMode}) => {
  const favouriteBtn = <Icon icon={faHeart} color={'white'} onHoverColor={'#FFA5A5'}/>
	const removeBtn = <Icon icon={faTrash} color={'white'} onHoverColor={'grey'}/> /* Delete skal kun komme opp for admin */
	const editBtn = <Icon icon={faPenToSquare} color={'white'} onHoverColor={'#34B8F0'}/>
  const likeBtn = <Icon icon={faHeart} color={'white'} onHoverColor={'red'}/>

  const[set, setSet] = useState([]);

  useEffect(() => {
    const getSets = async () => {
      try {
        const response = await axios.get("http://localhost:3500/flash/mysets");
        if (response.data) {
          
          const userInfo = response.data.map((set) => ({
            setname: set.setName,
            theme: set.theme, 
            size : set.size,
            like : set.likes,
            setID : set.setID,
            userID : set.userID,
            owner: set.setOwner,
          }));
          
          setSet(userInfo)
        
        } else {
          console.log('Error fetching my sets');
        }
      } catch (error) {
        console.error("An unexpected error occurred: ", error);
      }
    };
  
    getSets();
  }, [sets]);

  
  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <UserProfileIcon isDarkMode={isDarkMode}/>
      <Sidebar isDarkMode={isDarkMode}/>
      <SetBtn isDarkMode={isDarkMode}  text={"Create set"}/>
      <div className={'flex flex-column items-center fixed-top-middle ' + (isDarkMode ? 'dark-mode' : '')}>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>My sets</h2>      
      </div>
      <div className='flex flex-column items-center'
      style={{marginTop: '27vh'}}>
        <div className='w-70'>
          <CardList set={set} edit={editBtn} favourite={favouriteBtn} remove={removeBtn} like={likeBtn} isDarkMode={isDarkMode}/>
        </div>
      </div>
    </div>

  );
};

export default MySetspage;

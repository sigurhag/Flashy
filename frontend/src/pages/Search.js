import React, {useState, useEffect} from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Icon from '../components/cards/Icon';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import CardList from '../components/cards/CardList';
import axios from 'axios';

const Searchpage = ({isDarkMode}) => {
  const favouriteBtn = <Icon icon={faHeart} color={'white'} onHoverColor={'#FFA5A5'}/>
	const removeBtn = <Icon icon={faTrash} color={'white'} onHoverColor={'grey'}/> /* Delete skal kun komme opp for admin */

  const[set, setSet] = useState([])
  
  const getSets = async() => {
    try {
      const response = await axios.get("http://localhost:3500/flash/mostpopular");
      if (response.data) {
        const setInfo = response.data.map((set) => ({
          setID: set.setID,
          setname: set.setName,
          theme: set.theme, 
          user: set.userID,
          size: set.size,
          likes: set.likes,
          owner: set.owner
        }));
        setSet(setInfo)
      } else {
        console.log('Error fetching users');
      }
    } catch (error) {
      console.error("An unexpected error occured: ", error);
    };
  };

  useEffect(() => {
    getSets();
    
  }, []);

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
		<UserProfileIcon isDarkMode={isDarkMode}/>
		<Sidebar isDarkMode={isDarkMode} />
    <div className={'flex flex-column items-center fixed-top-middle ' + (isDarkMode ? 'dark-mode' : '')}>

			<h1 className='f1 mt3 mb1'>FLASHY</h1>
			<h2 className='f2 mt1'>Search</h2>    
    	</div>
    <div className='flex flex-column justify-center items-center' style={{marginTop: '25vh'}}>
      	<div className='w-70 '>
          <CardList 
              set={set} 
              remove={removeBtn} 
              favourite={favouriteBtn}
              isDarkMode={isDarkMode}
            />
        </div>
    </div>
  </div>
  );
};

export default Searchpage;

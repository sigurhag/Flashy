import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Icon from '../components/cards/Icon';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import CardList from '../components/cards/CardList';

const Searchpage = () => {
  const favouriteBtn = <Icon icon={faHeart} color={'white'} onHoverColor={'#FFA5A5'}/>
	const removeBtn = <Icon icon={faTrash} color={'white'} onHoverColor={'grey'}/> /* Delete skal kun komme opp for admin */

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
        <CardList favourite={favouriteBtn} remove={removeBtn} />  
        </div>
    </div>
  </div>
  );
};

export default Searchpage;

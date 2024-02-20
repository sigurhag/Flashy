import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import FlippableCard from '../components/cards/FlippableCard.js';
import ArrowButton from '../components/cards/ArrowButton.js';


const CardViewPage = () => {
  return (
    <div className='flex justify-center items-center '>
      <UserProfileIcon />
      <Sidebar />
      <div className='flex flex-column items-center fixed-top-middle'>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>Title</h2>   {/* Title needs to be collected from CardSet.title*/}  
      </div>
      <div className='flex flex-row  justify-center items-center' style={{marginTop: '30vh'}} >
        <ArrowButton type={faChevronLeft} />
        <FlippableCard />
        <ArrowButton type={faChevronRight} />
      </div>
    </div>
  )
}

export default CardViewPage;
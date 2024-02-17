import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import QuestionCard from '../components/cards/QuestionCard';



const CardViewPage = ({ cards }) => {
  return (
    <div>
      <UserProfileIcon />
      <Sidebar />
      <div className='flex flex-column items-center fixed-top-middle'>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>Title</h2>   {/* Title needs to be collected from CardSet.title*/}   
      </div>
      <div className='flex flex-column items-center'
      style={{marginTop: '32vh'}}>
        <div>
          <QuestionCard/>
        </div>
      </div>
    </div>

  );
};

export default CardViewPage;
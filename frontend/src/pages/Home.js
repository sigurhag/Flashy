import React from 'react';
import CardList from '../components/cards/CardList';
import Searchbar from '../components/Searchbar';
import Sidebar from '../components/sidebar/Sidebar';


const Homepage = ({ cards }) => {
  return (
    <div>
      <Sidebar />
      <div className='flex flex-column items-center'>
        <h2 className='f2  mt3 mb1'>Welcome to</h2>      
        <h1 className='f1 mt1 mb3 '>FLASHY</h1>
      </div>
      <div className='flex flex-column items-center'>
        <Searchbar />
        <h1>Today's topic: Science</h1>
        <div className='w-60'>
          <CardList cards={cards}/>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

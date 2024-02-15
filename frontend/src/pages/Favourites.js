import React from 'react';
import CardList from '../components/cards/CardList';
import Sidebar from '../components/sidebar/Sidebar';



const Favouritespage = ({ cards }) => {
  return (
    <div>
      <Sidebar />
      <div className='flex flex-column items-center'>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>Favourites</h2>      
      </div>
      <div className='flex flex-column items-center w-60'>
        <CardList cards={cards}/>
      </div>
    </div>
  );
};

export default Favouritespage;

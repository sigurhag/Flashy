import React from 'react';
import CardList from '../components/cards/CardList';



const MySetspage = ({ cards }) => {
  return (
    <div>
      <CardList cards={cards} />
    </div>
  );
};

export default MySetspage;

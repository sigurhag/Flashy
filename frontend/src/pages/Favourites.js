import React from 'react';
import CardList from '../components/cards/CardList';

const Favouritespage = ({ cards }) => {
  return (
    <div>
      <CardList cards={cards} />
    </div>
  );
};

export default Favouritespage;

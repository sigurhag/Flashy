import React from 'react';
import CardList from '../components/cards/CardList';

const Homepage = ({ cards }) => {
  return (
    <div>
      <CardList cards={cards} />
    </div>
  );
};

export default Homepage;

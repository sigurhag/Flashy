import React, { useState, useEffect } from 'react';
import Card from './Card';
import Searchbar from '../Searchbar';

const CardList = ({ set, edit, favourite, remove, category, like }) => {
    

    const handleOnClick = () => {
        
    }

    return (
        <div className='flex flex-column justify-center '>
          <div style={{ width: '100%', maxWidth: '1000px' }}>
          </div>
          <div className="card-list">
          {set.map((set, i) => (
                <Card
                  key={i}
                  name={set.setname}
                  creator={set.userID}
                  theme={set.theme}
                  edit={edit}
                  favourite={favourite}
                  remove={remove}
                  like={like}
                />
              ))}
          </div>
        </div>
      );
}
export default CardList;

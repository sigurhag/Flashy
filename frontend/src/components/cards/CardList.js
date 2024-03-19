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
          {set.map((item, i) => (
                <Card
                  key={item.setid}
                  id={item.setid}
                  name={item.setname}
                  creator={item.userID}
                  theme={item.theme}
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

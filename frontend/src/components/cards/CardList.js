import React, { useState, useEffect } from 'react';
import Card from './Card';
import Searchbar from '../Searchbar';

const CardList = ({ set, edit, favourite, remove, category, like }) => {
    

    const handleOnClick = () => {
        
    }
    console.log(set.setname)
    return (
        <div className='flex flex-column justify-center '>
          <div>
          </div>
          <div className="card-list">
          {set.map((set, i) => (
                <Card
                  key={i}
                  name={set.setname}
                  creator={set.userID}
                  length={set.size}
                  theme={set.theme}
                  edit={edit}
                  favourite={favourite}
                  remove={remove}
                  like={set.likes}
                />
                
              ))}
          </div>
        </div>
      );
}
export default CardList;

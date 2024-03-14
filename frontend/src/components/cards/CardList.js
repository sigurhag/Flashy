import React, { useState, useEffect } from 'react';
import Card from './Card';
import Searchbar from '../Searchbar';

const CardList = ({ set, edit, favourite, remove}) => {
    

    const handleOnClick = () => {
        
    }
    console.log(set)
    return (
        <div className='flex flex-column justify-center '>
          <div>
          </div>
          <div className="card-list">
          {set.map((item, i) => (
            
                <Card
                  key={i}
                  name={item.setname}
                  owner={item.owner}
                  size={item.size}
                  theme={item.theme}
                  edit={edit}
                  favourite={favourite}
                  remove={remove}
                />
                
              ))}
              
          </div>
        </div>
      );
}
export default CardList;

import React, { useState, useEffect } from 'react';
import Card from './Card';
import Searchbar from '../Searchbar';
import axios from 'axios';


const CardList = ({ set, edit, favourite, remove }) => {
    const [admin, setAdmin] = useState(false);

   
    useEffect(() => {
      const fetchData = async() => {
        try {
          const adminResponse = await axios.get("http://localhost:3500/flash/adminRights");
          if(adminResponse.data) {
            setAdmin(true)
          }
          
        } catch (error) {
          console.error("An unexpected error occured: ", error);
        };
      };
      fetchData();
    },)
    
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
                  favourite={favourite}
                  {...admin && {remove, edit}}
                />
                
              ))}
              
          </div>
        </div>
      );
}
export default CardList;

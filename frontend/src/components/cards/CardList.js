import React, { useState, useEffect } from 'react';
import Card from './Card';
import Searchbar from '../Searchbar';
import axios from 'axios';


const CardList = ({ set, edit, favourite, remove, category }) => {
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
          <div style={{ width: '1000%', maxWidth: '1000px' }}>
          </div>
          <div className="card-list">
          {set.map((set, i) => (
                <Card
                  key={i}
                  setID={set.setID}
                  name={set.setname}
                  creator={set.userID}
                  theme={set.theme}
                  favourite={favourite}
                  {...admin && {remove, edit}}
                />
              ))}
          </div>
        </div>
      );
}
export default CardList;

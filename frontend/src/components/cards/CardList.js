import React, { useState, useEffect } from 'react';
import Card from './Card';
import Searchbar from '../Searchbar';
import axios from 'axios';
import Icon from './Icon';
import { faHeart, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const CardList = ({ set }) => {
    const removeBtn = <Icon icon={faTrash} color={'white'} onHoverColor={'grey'}/> /* Delete skal kun komme opp for admin */
    const [favoriteColor, setFavouriteColor] = useState('white');
    const favouriteBtn = <Icon icon={faHeart} color={favoriteColor} onHoverColor={'#FFA5A5'}/>
    const editBtn = <Icon icon={faPenToSquare} color={'white'} onHoverColor={'#34B8F0'}/> /* Må fikse sånn at edit kun kommer opp på egne sett */
    
    const [admin, setAdmin] = useState(false);

   
    useEffect(() => {
      const fetchData = async() => {
        try {
          const adminResponse = await axios.get("http://localhost:3500/flash/adminRights");
          if(adminResponse.data) {
            setAdmin(true)
          } 
          const likedResponse = await axios.post("http://localhost:3500/flash/isFavourited", {params: {setID : set.setID}});
          if(likedResponse.data) {
            setFavouriteColor('#FFA5A5');
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
                  favourite={favouriteBtn}
                  remove={admin && removeBtn}
                  edit={admin && editBtn}
                />
              ))}
          </div>
        </div>
      );
}
export default CardList;

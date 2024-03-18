import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import Searchbar from '../Searchbar';
import axios from 'axios';
import Icon from './Icon';
import { faHeart, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const CardList = ({ set, isDarkMode, category }) => {
    const removeBtn = <Icon icon={faTrash} color={'white'} onHoverColor={'grey'}/> /* Delete skal kun komme opp for admin */
    const [favoriteColor, setFavouriteColor] = useState('white');
    const favouriteBtn = <Icon icon={faHeart} color={favoriteColor} onHoverColor={'#FFA5A5'}/>
    const editBtn = <Icon icon={faPenToSquare} color={'white'} onHoverColor={'#34B8F0'}/> /* Må fikse sånn at edit kun kommer opp på egne sett */
    
    const [admin, setAdmin] = useState(false);
    const [filteredSets, setFilteredSets] = useState(set); // Adjusted for "set" data
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    useEffect(() => {
        const filtered = set.filter(item =>
            (item.setname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.owner?.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (!category || category === 'all' || item.category?.toLowerCase() === category.toLowerCase()) 
        );
        setFilteredSets(filtered);
    }, [searchQuery, category, set]);

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
        }
      };
      fetchData();
    }, []);

    
    return (
      <div className='flex flex-column items-center'>
      {location.pathname !== "/favourites" && (
        <Searchbar text="What do you want to learn today?" onSearch={setSearchQuery} isDarkMode={isDarkMode}/>
      )}
      <div className="card-list">
      {filteredSets.map((item, i) => {
        const ownerDisplay = item.owner ? item.owner : 'Unknown';
        return (
            <Card
              key={i}
              name={item.setname}
              owner={ownerDisplay}
              size={item.size}
              theme={item.theme}
              favourite={!admin && favouriteBtn}
              isDarkMode={isDarkMode}
              remove={admin && removeBtn}
                  edit={admin && editBtn}
            />
        );
      })}
      </div>
  </div>
);
    
};

export default CardList;

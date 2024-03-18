import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import Searchbar from '../Searchbar';
import axios from 'axios';

const CardList = ({ set, edit, favourite, remove, category, isDarkMode }) => {
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
            setAdmin(true);
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
            category={item.category} 
            favourite={favourite}
            {...admin && {edit, remove}} 
            isDarkMode={isDarkMode}
          />
        );
      })}
      </div>
  </div>
);
    
};

export default CardList;

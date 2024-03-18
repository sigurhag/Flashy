import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import Searchbar from '../Searchbar';
import axios from 'axios';

const CardList = ({ set, edit, favourite, remove, category, isDarkMode }) => {
    const [admin, setAdmin] = useState(false);
    const [filteredSets, setFilteredSets] = useState(set); 
    const [searchQuery, setSearchQuery] = useState('');
    const [userInfo, setUserInfo] = useState(null); 
    const location = useLocation();

    const userID = userInfo ? userInfo[2] : null;

    useEffect(() => {
      const getUserData = async () => {
          try {
              const response = await axios.get("http://localhost:3500/flash/profile", {
                  params: { userID }
              });
              if (response.data) {
                  setUserInfo(response.data);
                  console.log("Fetched data successfully!");
              } else {
                  console.log("Error fetching user data");
              }
          } catch (error) {
              console.error("Error fetching user info: ", error);
          }
      };
      getUserData();
  }, [userID]);

  useEffect(() => {
    const filtered = set.filter(item =>
        (item.setname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.owner?.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!category || category === 'all' || item.theme?.toLowerCase() === category.toLowerCase()) 
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

    const loggedInUserId = userInfo ? userInfo[2] : null;

    return (
      <div className='flex flex-column items-center'>
      {location.pathname !== "/favourites" && (
        <Searchbar text="What do you want to learn today?" onSearch={setSearchQuery} isDarkMode={isDarkMode}/>
      )}
      <div className="card-list">
      {filteredSets.map((item, i) => {
        const ownerDisplay = item.owner ? item.owner : 'unknown';
        const showEditOptions = admin || item.userID === loggedInUserId;
        return (
            <Card
              key={i}
              name={item.setname}
              owner={ownerDisplay}
              size={item.size}
              theme={item.theme}
              favourite={favourite}
              isDarkMode={isDarkMode}
              {...showEditOptions && {remove}}
              {...showEditOptions && {edit}}
            />
        );
      })}
      </div>
  </div>
);
    
};

export default CardList;

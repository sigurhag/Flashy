import React, { useEffect, useState } from 'react';
import CardList from '../components/cards/CardList';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import Dropdown from '../components/makeset/Dropdown';
import axios from 'axios';

const Homepage = () => {
  const [category, setCategory] = useState('all');
  
  const categories = [
    {label: 'All', value: 'all'},
    {label: 'Art', value: 'art'},
    {label: 'Culture', value: 'culture'},
    {label: 'Fun', value: 'fun'},
    {label: 'Geography', value: 'geography'},
    {label: 'Health', value: 'health'},
    {label: 'History', value: 'history'},
    {label: 'Language', value: 'language'},
    {label: 'Literature', value: 'literature'},
    {label: 'Math', value: 'math'},
    {label: 'Music', value: 'music'},
    {label: 'Science', value: 'science'},
    {label: 'Sports', value: 'sports'},
    {label: 'Technology', value: 'technology'},
    {label: 'Other', value: 'other'},
  ]

  const handleCategoryChange = value => setCategory(value);
  const[set, setSet] = useState([])

  useEffect(() => {
    const getSets = async() => {
      try {
        const response = await axios.get("http://localhost:3500/flash/mostpopular");
        if (response.data) {
          const setInfo = response.data.map((set) => ({
            setID: set.setID,
            setname: set.setName,
            theme: set.theme, 
            user: set.userID,
          }));
          setSet(setInfo)
        } else {
          console.log('Error fetching users');
        }
      } catch (error) {
        console.error("An unexpected error occured: ", error);
      };
    };
    getSets();
  },[set])
  return (
    <div>
      <Sidebar />
      <UserProfileIcon />
      <div className='flex flex-column items-center fixed-top-middle'>
        <h2 className='f2  mt3 mb1'>Welcome to</h2>      
        <h1 className='f1 mt1 mb3 '>FLASHY</h1>
      </div>
      <div className='flex flex-column items-center'
      style={{marginTop: '25vh'}}>
        <h1><Dropdown label="Filter: " options={categories} value={category} onChange={handleCategoryChange} backgroundColor={'#FFEFC5'}/></h1>
        <div className='w-70'>
        </div>
        <CardList set={set}/>
      </div>
    </div>
  );
};

export default Homepage;
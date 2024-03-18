import React, { useEffect, useState } from 'react';
import CardList from '../components/cards/CardList';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import Dropdown from '../components/makeset/Dropdown';
import axios from 'axios';

const Homepage = () => {
  const [category, setCategory] = useState('all');
  const [todaysTheme, setTodaysTheme] = useState('');
  
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

  const handleCategoryChange = async (value) => {
    setCategory(value);
    if (value !== 'all') {
      await getSetsFromTheme(value);
    } else {
      await getSets();
    }
  };
  const[set, setSet] = useState([])

  const getSets = async() => {
    try {
      const response = await axios.get("http://localhost:3500/flash/mostpopular");
      if (response.data) {
        const setInfo = response.data.map((set) => ({
          setID: set.setID,
          setname: set.setName,
          theme: set.theme, 
          user: set.userID,
          size: set.size,
          likes: set.likes,
          owner: set.owner
        }));
        setSet(setInfo)
      } else {
        console.log('Error fetching users');
      }
    } catch (error) {
      console.error("An unexpected error occured: ", error);
    };
  };
  
  const getSetsFromTheme = async(theme) => {
    try {
        const response = await axios.get("http://localhost:3500/flash/mostpopular");
        if (response.data) {
          const filteredSets = response.data.filter(set => set.theme === theme);
          const setInfo = filteredSets.map((set) => ({
            setID: set.setID,
            setname: set.setName,
            theme: set.theme, 
            user: set.userID,
            size: set.size,
            likes: set.likes,
            owner: set.owner
          }));
          setSet(setInfo)
        } else {
          console.log('Error fetching users');
        }
      } catch (error) {
        console.error("An unexpected error occured: ", error);
      };
    };

  const getTodaysTheme = () => {
    const dayOfWeek = new Date().getDay();
    return categories[dayOfWeek + 1].label;
  };

  useEffect(() => {
    setTodaysTheme(getTodaysTheme());
  }, []);

  useEffect(() => {
    getSets();
  }, []);

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Sidebar isDarkMode={isDarkMode}/>
      <UserProfileIcon isDarkMode={isDarkMode}/>
      <div className={'flex flex-column items-center fixed-top-middle ' + (isDarkMode ? 'dark-mode' : '')}>
        <h2 className='f2  mt3 mb1'>Welcome to</h2>      
        <h1 className='f1 mt1 mb3 '>FLASHY</h1>
      </div>
      <div className='flex flex-column items-center' style={{marginTop: '25vh'}}>
        <h1>Todays theme: {todaysTheme}</h1>
        <h1><Dropdown label="Filter: " options={categories} value={category} onChange={handleCategoryChange} backgroundColor={'#FFEFC5'} backgroundColorDark={'#124a8b'} isDarkMode={isDarkMode}/></h1>
        <div className='w-70'>
          <CardList 
            set={set} 
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}



export default Homepage;

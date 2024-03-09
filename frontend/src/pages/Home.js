import React, { useEffect, useState } from 'react';
import CardList from '../components/cards/CardList';
import Sidebar from '../components/sidebar/Sidebar';
import Icon from '../components/cards/Icon';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import { faHeart, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../components/makeset/Dropdown';
import axios from 'axios';

const Homepage = ({ sets }) => {
  const favouriteBtn = <Icon icon={faHeart} color={'white'} onHoverColor={'#FFA5A5'}/>
	const removeBtn = <Icon icon={faTrash} color={'white'} onHoverColor={'grey'}/> /* Delete skal kun komme opp for admin */
	const editBtn = <Icon icon={faPenToSquare} color={'white'} onHoverColor={'#34B8F0'}/> /* Må fikse sånn at edit kun kommer opp på egne sett */
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
  console.log("Selected category:", category);
  const[set, setSet] = useState([]);

  useEffect(() => {
    const getSets = async() => {
      try {
        const response = await axios.get("http://localhost:3500/flash/mostpopular");
        if(response.data) {
            const setInfo = response.data.map((set) => ({
              setID: set.setID,
              setname: set.setname,
              category: set.theme,
              length: set.size,
              creator: set.userID,
            }))
          setSet(setInfo);
          console.log("Fetched cards sucessfully!");
        } else {
          console.log("Failed to fetch cards");
        }
      } catch (error) {
        console.error("An unexpected error occured: ", error);
      };
    }
    getSets();
  }, [sets])
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
          <CardList set={set} favourite={favouriteBtn} remove={removeBtn} edit={editBtn} />  
        </div>
      </div>
    </div>
  );
};

export default Homepage;
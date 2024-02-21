import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import FlippableCard from '../components/cards/FlippableCard.js';
import ArrowButton from '../components/cards/ArrowButton.js';



const CardViewPage = () => {

  const cardSet =   
    {
    id: 1,
    name: 'Midterm',
    theme: 'Science',
    length: 34,
    creator: 'Geir',
    questions: [
      ["Q1", "A1"], 
      ['Q2', 'A2'], 
      ['Q3', 'A3'], 
      ['Q4', 'A4'], 
      ['Q5', 'A5'], 
      ['Q6', 'A6']]
    }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardSet.questions.length);
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cardSet.questions.length) % cardSet.questions.length)
  }
  
  return (
    <div className='flex justify-center items-center '>
      <UserProfileIcon />
      <Sidebar />
      <div className='flex flex-column items-center fixed-top-middle'>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>Title</h2>   {/* Title needs to be collected from CardSet.title*/}  
      </div>
      <div className='flex flex-row  justify-center items-center' style={{marginTop: '30vh'}} >
        <ArrowButton onClick={handlePrev} type={faChevronLeft} />
        <FlippableCard front={cardSet.questions[currentIndex][0]}  back={cardSet.questions[currentIndex][1]} />
        <ArrowButton onClick={handleNext} type={faChevronRight} />
      </div>
    </div>
  )
}

export default CardViewPage;
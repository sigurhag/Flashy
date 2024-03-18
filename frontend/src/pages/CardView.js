import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FlippableCard from '../components/cards/FlippableCard.js';
import ArrowButton from '../components/cards/ArrowButton.js';
import ProgressBar from '../components/cards/ProgressBar.js';
import GeneralButton from '../components/GeneralButton.js';

const CardViewPage = ({ isDarkMode }) => {
  const cardSet = {
    id: 1,
    name: 'Midterm',
    theme: 'Science',
    length: 34,
    creator: 'Geir',
    questions: [
      ["Q1 hard", "A1"],
      ['Q2', 'A2'],
      ['Q3 hard', 'A3'],
      ['Q4', 'A4'],
      ['Q5', 'A5'],
      ['Q6', 'A6']
    ]
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hardQuestions, setHardQuestions] = useState([]);
  const [completedCards, setCompletedCards] = useState(new Array(cardSet.questions.length).fill(false));
  const [initialPassCompleted, setInitialPassCompleted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showFront, setShowFront] = useState(true);
  const [isHard, setIsHard] = useState(false);

  const length = cardSet.questions.length;
  const steplength = 100 / length;

  const calculateProgress = () => {
    const completedCount = completedCards.filter(isCompleted => isCompleted).length;
    const progress = (completedCount / cardSet.questions.length) * 100;
    return progress;
  };
  
  

const handleNext = () => {
    setIsHard(false);
    const nextIndex = currentIndex + 1;
    if (!initialPassCompleted) {
      if (nextIndex < cardSet.questions.length) {
        setCurrentIndex(nextIndex);
      } else {
        setInitialPassCompleted(true);
        if (hardQuestions.length === 0) {
          setIsFinished(true);
        } else {
          setCurrentIndex(hardQuestions[0]);
        }
      } 
    } else {
      const nextHardIndex = hardQuestions.indexOf(currentIndex) + 1;
      if (nextHardIndex < hardQuestions.length) {
        setCurrentIndex(hardQuestions[nextHardIndex]);
      } else {
        setIsFinished(true);
      }
    }
  
    if (!hardQuestions.includes(currentIndex)) {
      const updatedCompletedCards = [...completedCards];
      updatedCompletedCards[currentIndex] = true;
      setCompletedCards(updatedCompletedCards);
    }
  };

  const onClickHard = () => {
    if (!hardQuestions.includes(currentIndex) && !initialPassCompleted) {
      setHardQuestions((prevHardQuestions) => [...prevHardQuestions, currentIndex]);
      setIsHard(true);
    }
  };

  const handlePrev = () => {
    if (initialPassCompleted && hardQuestions.length > 0) {
      const currentHardIndex = hardQuestions.indexOf(currentIndex);
      if (currentHardIndex > 0) {
        setCurrentIndex(hardQuestions[currentHardIndex - 1]);
      } else {
        if (currentHardIndex === 0 || hardQuestions.length === 0) {
          setCurrentIndex(cardSet.questions.length - 1);
        }
      }
    } else {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
      }
    }
  };
  

  const handleGoAgain = () => {
    setCurrentIndex(0);
    setHardQuestions([]);
    setCompletedCards(new Array(cardSet.questions.length).fill(false));
    setInitialPassCompleted(false);
    setIsFinished(false);
    setShowFront(true);
  };

    console.log('currentIndex', currentIndex);
    console.log('hardQuestions', hardQuestions);
    console.log('completedCards', completedCards);
    console.log('initialPassCompleted', initialPassCompleted);
    console.log('isFinished', isFinished);

    return (
        <div className={isDarkMode ? 'dark-mode' : ''}>
            <div className='flex justify-center items-center '>
            <UserProfileIcon isDarkMode={isDarkMode} />
            <Sidebar isDarkMode={isDarkMode} />
            <div className={'flex flex-column items-center fixed-top-middle ' + (isDarkMode ? 'dark-mode' : '')}>
                <h1 className='f1 mt3 mb1'>FLASHY</h1>
                <h2 className='f2 mt1'>{cardSet.name}</h2>   {/* Title needs to be collected from CardSet.title*/}  
            </div>
            <div className='flex flex-column items-center' style={{marginTop: '30vh'}}>
                        <ProgressBar progress={isFinished ? 100 : calculateProgress()} isDarkMode={isDarkMode}/>
                        {!isFinished ? (
                            <div className='flex flex-row justify-center items-center'>
                                <ArrowButton onClick={handlePrev} type={faChevronLeft} isDarkMode={isDarkMode} />
                                <FlippableCard 
                                key={`card-${currentIndex}-${hardQuestions.includes(currentIndex)}`}
                                front={cardSet.questions[currentIndex][0]}
                                back={cardSet.questions[currentIndex][1]}
                                showFront={showFront}
                                onClickHard={onClickHard}
                                isDarkMode={isDarkMode}
                                />
                                <ArrowButton onClick={handleNext} type={faChevronRight} isDarkMode={isDarkMode}/>
                            </div>
                        ) : (
                            <div className='flex flex-column justify-center items-center'>
                                <h2 className='f1 mb1'>Congrats!</h2>
                                <h2 className='f2'>You have finished the set</h2>
                                <GeneralButton text={"Go again"} onClick={handleGoAgain} />
                            </div>
                        )}
                </div>
            </div>
    </div>
  )
}

export default CardViewPage;
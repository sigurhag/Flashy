import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FlippableCard from '../components/cards/FlippableCard.js';
import ArrowButton from '../components/cards/ArrowButton.js';
import ProgressBar from '../components/cards/ProgressBar.js';
import GeneralButton from '../components/GeneralButton.js'
import { useParams } from 'react-router-dom';
import axios from "axios";


const CardViewPage = ( { isDarkMode } ) => {

    //const { setID } = useParams()
    const [cardSet, setCardSet] = useState(null);
    const location = useLocation();
    const { name, setID } = location.state || {}

  useEffect(() => {
    console.log("PLEASE WORK")
    console.log(setID)
    const fetchCardData = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/flash/getset/${setID}`);
        const cardInfo = response.data.map((card) => ({
            question: card.question,
            answer: card.answer,
            cardid: card.cardID,
            setid: card.setID,
            isdifficult: card.isDifficult
        }));
        setCardSet(cardInfo);
      } catch (error) {
        console.error(error);
      }
    };
    if (setID) fetchCardData();
  }, [setID]);

    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hardQuestions, setHardQuestions] = useState([]);
    const [completedCards, setCompletedCards] = useState(new Array(cardSet?.length).fill(false)); //useState([]);
    const [showFront, setShowFront] = useState(true);
    const [initialPassCompleted, setInitialPassCompleted] = useState(false);
    const [isHard, setIsHard] = useState(false);

    const progress = ((completedCards.filter(Boolean).length + (initialPassCompleted ? hardQuestions.length : 0)) / (cardSet?.length + hardQuestions.length)) * 100;

	const [isFinished, setIsFinished] = useState(false); // New state to track completion

    const updateInitialPassCompletion = () => {
        const allSeen = completedCards.every(Boolean);
        setInitialPassCompleted(allSeen);
        if (allSeen && hardQuestions.length === 0) {
            setIsFinished(true);
        }
    };

    const calculateProgress = () => {
        const completedCount = completedCards.filter(completed => completed).length;
        const progress = (completedCount / cardSet?.length) * 100;
        return progress;
      };
    

  const handleNext = () => {
    setIsHard(false);
    let nextIndex = currentIndex + 1;

    if (!hardQuestions.includes(currentIndex) || initialPassCompleted) {
      const updatedCompletedCards = completedCards.slice(); 
      updatedCompletedCards[currentIndex] = true; 
      setCompletedCards(updatedCompletedCards); 
    }

    if (!initialPassCompleted) {
      if (nextIndex < cardSet?.length) {
        setCurrentIndex(nextIndex);
      } else {
        setInitialPassCompleted(true);
        if (hardQuestions.length === 0) {
          setIsFinished(true);
        } else {
          setCurrentIndex(hardQuestions[0]);
        }
      } 
    } 
    else {
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
          setCurrentIndex(cardSet?.length - 1);
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
        setCompletedCards(new Array(cardSet?.length).fill(false));
        setInitialPassCompleted(false);
        setIsFinished(false);
        setShowFront(true);
      };
    
    return (
        <div className={isDarkMode ? 'dark-mode' : ''}>
            <div className='flex justify-center items-center '>
            <UserProfileIcon isDarkMode={isDarkMode} />
            <Sidebar isDarkMode={isDarkMode} />
            <div className={'flex flex-column items-center fixed-top-middle ' + (isDarkMode ? 'dark-mode' : '')}>
                <h1 className='f1 mt3 mb1'>FLASHY</h1>
                <h2 className='f2 mt1'>{name || "Title"}</h2> 
            </div>
            <div className='flex flex-column items-center' style={{marginTop: '30vh'}}>
                        <ProgressBar progress={isFinished ? 100 : calculateProgress()} isDarkMode={isDarkMode}/>
                        {!isFinished ? (
                            <div className='flex flex-row justify-center items-center'>
                                <ArrowButton onClick={handlePrev} type={faChevronLeft} isDarkMode={isDarkMode} />
                                <FlippableCard 
                                key={`card-${currentIndex}-${hardQuestions.includes(currentIndex)}`}
                                front={cardSet?.[currentIndex]?.question}
                                back={cardSet?.[currentIndex]?.answer}
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
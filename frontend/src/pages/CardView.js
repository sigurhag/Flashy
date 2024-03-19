import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import {faChevronLeft, faChevronRight, faL} from '@fortawesome/free-solid-svg-icons'
import FlippableCard from '../components/cards/FlippableCard.js';
import ArrowButton from '../components/cards/ArrowButton.js';
import ProgressBar from '../components/cards/ProgressBar.js';
import GeneralButton from '../components/GeneralButton.js'
import { useParams } from 'react-router-dom';
import axios from "axios";


const CardViewPage = () => {

    const { cardID } = useParams()
    const [cardSet, setCardSet] = useState(null);
    const location = useLocation();
    const { name } = location.state || {};

  useEffect(() => {
    console.log("PLEASE WORK")
    const fetchCardData = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/flash/getset/${cardID}`);
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
    if (cardID) fetchCardData();
  }, [cardID]);

    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hardQuestions, setHardQuestions] = useState([]);
    const [completedCards, setCompletedCards] = useState(new Array(cardSet?.length).fill(false)); //useState([]);
    const [showFront, setShowFront] = useState(true);
    const [initialPassCompleted, setInitialPassCompleted] = useState(false);

    const progress = ((completedCards.filter(Boolean).length + (initialPassCompleted ? hardQuestions.length : 0)) / (cardSet?.length + hardQuestions.length)) * 100;

	const [isFinished, setIsFinished] = useState(false); // New state to track completion

    const updateInitialPassCompletion = () => {
        const allSeen = completedCards.every(Boolean);
        setInitialPassCompleted(allSeen);
        if (allSeen && hardQuestions.length === 0) {
            setIsFinished(true);
        }
    };

    const handleNext = () => {
        if (isFinished) return;

        let nextIndex = currentIndex + 1;

        if (initialPassCompleted && hardQuestions.length > 0) {

            const nextHardIndex = hardQuestions.shift();
            setCurrentIndex(nextHardIndex);
            setHardQuestions([...hardQuestions]);
        } else {

            if (nextIndex >= cardSet.length) {
                nextIndex = 0;
                if (!hardQuestions.length) {
                    setIsFinished(true); 
                    return; 
                }
            }
            setCurrentIndex(nextIndex);
        }
        
		if (!completedCards[currentIndex]) {
            const updatedCompletedCards = [...completedCards];
            updatedCompletedCards[currentIndex] = true;
            setCompletedCards(updatedCompletedCards);
        }

        setShowFront(true);

        updateInitialPassCompletion();
    };

	const onClickHard = () => {
        if (!hardQuestions.includes(currentIndex) && !completedCards[currentIndex]) {
            setHardQuestions(prev => [...prev, currentIndex]);
        }
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cardSet.length) % cardSet.length);
        setShowFront(true);
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
      <div className='flex justify-center items-center '>
      <UserProfileIcon />
      <Sidebar />
      <div className='flex flex-column items-center fixed-top-middle'>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>{name || "Title"}</h2>   {/* Title needs to be collected from CardSet.title*/}  
      </div>
	  <div className='flex flex-column items-center' style={{marginTop: '30vh'}}>
                <ProgressBar progress={isFinished ? 100 : progress} />
                {!isFinished ? (
                    <div className='flex flex-row justify-center items-center'>
						<ArrowButton onClick={handlePrev} type={faChevronLeft} />
					<FlippableCard
                    key={`card-${currentIndex}-${hardQuestions.includes(currentIndex)}`}
                    front={cardSet?.[currentIndex]?.question}
                    back={cardSet?.[currentIndex]?.answer}
                    showFront={showFront}
                    onClickHard={onClickHard}
                    
                    /*
					key={`card-${currentIndex}-${hardQuestions.includes(currentIndex)}`}
					front={cardSet.questions[currentIndex][0]}
					back={cardSet.questions[currentIndex][1]}
					showFront={showFront}
					onClickHard={onClickHard}*/
					/>
					<ArrowButton onClick={handleNext} type={faChevronRight} />
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
  )
}

export default CardViewPage;



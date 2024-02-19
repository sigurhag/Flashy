import React from "react";

function QuestionCard({onClick}) {
    return(
        <div className="question-card br4" style={{backgroundColor:"#FFEFC5"}}onClick={onClick}>
            <div className="card-back">Back</div>
            <div className="card-front">Front</div>
        </div>

    )
}


/*
import { cards } from './Cards'; /*Need correct import from db*//*
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'

const QuestionCard = (props, {onClick}) => {
    const {question, answer} = props;
    return (
        <div className='bg-color-card' onClick={onClick} style={{borderRadius:'40px', height: '370px', width: '600px'}}>
            <div className="card-back">
                <h2>{answer}Answer</h2>
            </div>
            <div className="card-front"> 
                <h2 >{question}</h2>Question 
                <button className="absolute bottom-2 right-2" onClick={onClick} style={{ color: '#00489C', backgroundColor: '#FFEFC5', borderRadius: '90px'}}> See answer<FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
        </div>
    );

*/

export default QuestionCard;
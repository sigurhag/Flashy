import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { cards } from './Cards';{/*Need correct import from db*/}



const QuestionCard = (props) => {
    const { question, answer} = props;
    return (
        <div className='bg-color-card pa1 ma2 relative' style={{borderRadius:'40px', height: '370px', width: '600px'}}>
            <h2 className='absolute top-10 left-10' style={{marginBottom: '7%', marginTop: '10%', marginLeft: '10%'}}>{question} Question</h2> 
            <button className="absolute bottom-2 right-2" style={{ color: '#00489C', backgroundColor: '#FFEFC5', borderRadius: '90px'}}> See answer<FontAwesomeIcon icon={faChevronRight} /></button>
            <h2 style={{marginBottom: '7%', marginTop: '10%'}}>{answer}</h2> 
        </div>
    );
}


export default QuestionCard;
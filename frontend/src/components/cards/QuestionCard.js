import React from "react";
import { cards } from './Cards';{/*Need correct import from db*/}


const QuestionCard = (props) => {
    const { question, answer} = props;
    return (
        <div className='bg-color-card pa1 ma2 tc item-center justify-center' style={{borderRadius:'40px', height: '370px', width: '600px'}}>
            <h3 style={{marginBottom: '13%', marginTop: '1%'}}>{question}</h3> 
            <h3 style={{marginBottom: '13%', marginTop: '1%'}}>{answer}</h3> 
        </div>
    );
}


export default QuestionCard;
import React from "react";
import HardButton from "./Hard";

function QuestionCard({front, back, onClick, onClickHard}) {

    const handleHardButtonClick = (e) => {
        e.stopPropagation(); 
        if (onClickHard) {
            onClickHard();
        }
    };

    return(
        <div className="question-card br4 f2" style={{backgroundColor:"#FFEFC5"}}onClick={onClick}>
            <div className="card-back flex flex-column">
                <h3 className="tc absolute top-0 left-2">Answer: </h3>{back}
                <div className='absolute bottom-1 right-1 pa2'><HardButton onClickHard={handleHardButtonClick} /></div>
            </div>
            <div className="card-front ">
                <h3 className="tc absolute top-0 left-2">Question: </h3>{front}
                <h4></h4>
            </div>
        </div>

    )
}

export default QuestionCard;
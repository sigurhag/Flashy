import React from "react";
import HardButton from "./Hard";

function QuestionCard({front, back, onClick, onClickHard, isDarkMode}) {

    const handleHardButtonClick = (e) => {
        e.stopPropagation(); 
        if (onClickHard) {
        console.log('stoppropagation');
            onClickHard();
        }
    };

    const cardStyle = {
        backgroundColor: isDarkMode ? "#124a8b" : "#FFEFC5"
    };

    return(
        <div className="question-card br4 f2" style={cardStyle}onClick={onClick}>
            <div className="card-back flex flex-column pa5">
                <h3 className="tc absolute top-0 left-2">Answer: </h3>{back}
                <div className='absolute bottom-1 right-1 pa2'><HardButton onClickHard={handleHardButtonClick} /></div>
            </div>
            <div className="card-front pa5">
                <h3 className="tc absolute top-0 left-2">Question: </h3>{front}
            </div>
        </div>

    )
}

export default QuestionCard;

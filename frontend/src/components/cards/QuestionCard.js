import React from "react";
import HardButton from "./icons/Hard";

function QuestionCard({front, back, onClick}) {
    return(
        <div className="question-card br4 f2" style={{backgroundColor:"#FFEFC5"}}onClick={onClick}>
            <div className="card-back flex flex-column">
                <h3 className="tc absolute top-0 left-2">Answer: </h3>{back}
                <div className='absolute bottom-1 right-1 pa2'><HardButton /></div>
            </div>
            <div className="card-front ">
                <h3 className="tc absolute top-0 left-2">Question: </h3>{front}
            </div>
        </div>

    )
}

export default QuestionCard;
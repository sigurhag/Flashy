import React from "react";

function QuestionCard({onClick}) {
    return(
        <div className="question-card br4" style={{backgroundColor:"#FFEFC5"}}onClick={onClick}>
            <div className="card-back">Back</div>
            <div className="card-front">Front</div>
        </div>

    )
}

export default QuestionCard;
import QuestionCard from "./QuestionCard";
import {CSSTransition} from 'react-transition-group';
import {useEffect, useState} from "react";


function FlippableCard({ front, back, showFront: propShowFront, onClickHard }) {
    const [showFront, setShowFront] = useState(propShowFront);

    useEffect(() => {
        setShowFront(propShowFront);
    }, [propShowFront]);

    return (
        <div className="flippable-card-container">
            <CSSTransition
                in={showFront}
                timeout={300}
                classNames={'flip'}
            >
                <QuestionCard 
                    front={front} 
                    back={back} 
                    onClick={() => setShowFront((v) => !v)}
                    onClickHard={onClickHard}
                />
            </CSSTransition>
        </div>
    );
}

export default FlippableCard;

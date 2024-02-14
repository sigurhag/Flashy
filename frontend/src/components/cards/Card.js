import React from "react";
import { cards } from './Cards';


const Card = (props) => {
    const { name, length, theme } = props;
    return (
        <div className="bg-color-card dib br4 w5 pa3 ma2 grow tc">
            <div>
                <h2>{name}</h2>
                <p>{theme}</p>
                <p>{length} cards</p>
            </div>
        </div>
    );
}


export default Card;
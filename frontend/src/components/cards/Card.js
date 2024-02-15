import React from "react";
import { cards } from './Cards';


const Card = (props) => {
    const { name, creator, length, theme } = props;
    return (
        <div className='bg-color-card br4 w5 pa1 ma2 grow tc flex flex-column items-center justify-center' style={{height: '100%'}}>
            <h2>{name}</h2>
            <h3>{creator}</h3>
            <h3>{theme}</h3>
            <h3>{length} cards</h3>
        </div>
    );
}


export default Card;
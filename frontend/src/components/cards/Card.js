import React from "react";
import { cards } from './Cards';


const Card = (props) => {
    const { name, length, theme } = props;
    return (
        <div className="bg-color-card dib br4 w5 pa3 ma2 grow tc">
            <div className='flex items-center justify-center' style={{height: '100%'}}>
                <h2>{name}</h2>
            </div>
        </div>
    );
}


export default Card;
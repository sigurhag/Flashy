import React from "react";
import Card from './Card'

const CardList = ( { cards } ) => {
    return(
        <div className="flex justify-content flex-column">
            { 
            cards.map((card, i) => {
                return (
                    <div className="flex flex-row" key={i}>
                    <Card
                        name = {cards[i].name} 
                        />
                        <div className='pl4'>
                        <h2>{cards[i].creator}</h2>
                        <h3>{cards[i].theme}</h3>
                        <h3>{cards[i].length} cards</h3>
                        </div>
                    </div>
                );
            })
        }
        </div>
    );
}

export default CardList
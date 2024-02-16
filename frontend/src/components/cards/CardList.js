import React from "react";
import Card from './Card'

const CardList = ( { cards } ) => {
    return(
        <div className="flex justify-content flex-column">
            { 
            cards.map((card, i) => {
                return (
                    <Card 
                        name = {cards[i].name}
                        creator = {cards[i].creator}
                        theme = {cards[i].theme}
                        length = {cards[i].length}
                     />
                );
            })
        }
        </div>
    );
}

export default CardList
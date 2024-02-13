import React from "react";
import Card from './Card'

const CardList = ( { cards } ) => {
    return(
        <div className="flex justify-content flex-column">
            { 
            cards.map((set, i) => {
                return (
                    <Card
                        id={cards[i].id} 
                        name = {cards[i].name} 
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
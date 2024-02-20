import React, { useState, useEffect } from 'react';
import Card from './Card';
import Searchbar from '../Searchbar';
import { cards } from "./Cards";

const CardList = () => {
    const [filteredCards, setFilteredCards] = useState(cards);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const filtered = cards.filter(card =>
            card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.theme.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCards(filtered);
    }, [searchQuery]);

    return (
        <div className='flex flex-column justify-center '>
            <div className='flex flex-column justify-center'>
            <Searchbar className="flex flex-column justify-center align-center" text="What do you want to learn today?" onSearch={setSearchQuery} />
            </div>
            <div className="card-list">
                {filteredCards.map((card, i) => (
                    <Card 
                        key={i}
                        name={card.name}
                        creator={card.creator}
                        theme={card.theme}
                        length={card.length}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardList;

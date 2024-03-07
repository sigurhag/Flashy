import React, { useState, useEffect } from 'react';
import Card from './Card';
import Searchbar from '../Searchbar';
import { cards } from "./Cards";

const CardList = ({ edit, favourite, remove, category }) => {
    
    const [filteredCards, setFilteredCards] = useState(cards);
    const [searchQuery, setSearchQuery] = useState('');

    const handleOnClick = () => {}

    useEffect(() => {
        const filtered = cards.filter(card =>
            (card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (card.theme && card.theme.toLowerCase().includes(searchQuery.toLowerCase()))) &&
            (category === '' || category === 'all' || card.category.toLowerCase() == category.toLowerCase())
        );

        console.log('Filtered cards:', filtered);
        setFilteredCards(filtered);
    }, [searchQuery, category]); 

    return (
        <div className='flex flex-column justify-center '>
            <div style={{ width: '100%', maxWidth: '1000px' }}>
            <Searchbar text="What do you want to learn today?" onSearch={setSearchQuery} />
            </div>
            <div className="card-list">
                {filteredCards.map((card, i) => (
                        <Card
                        key={i}
                        name={card.name}
                        creator={card.creator}
                        category={card.category}
                        length={card.length} 
                        onClick={handleOnClick}
                        edit={edit}
                        favourite={favourite}
                        remove={remove}
                        />

                ))}
            </div>
        </div>
    );
};

export default CardList;

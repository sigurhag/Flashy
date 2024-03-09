import React, { useState, useEffect } from 'react';
import Card from './Card';
import Searchbar from '../Searchbar';

const CardList = ({ set, edit, favourite, remove, category }) => {
    
    const [filteredCards, setFilteredCards] = useState(set);
    const [searchQuery, setSearchQuery] = useState('');

    const handleOnClick = () => {}

    useEffect(() => {
        console.log(set)
        const filtered = set.filter(card =>
            card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (card.theme && card.theme.toLowerCase().includes(searchQuery.toLowerCase()))) &&
            (category === '' || category === 'all' || set.category.toLowerCase() === category.toLowerCase())

        console.log('Filtered cards:', filtered);
        setFilteredCards(filtered);
}
    , [searchQuery, category]); 

    return (
        <div className='flex flex-column justify-center '>
            <div style={{ width: '100%', maxWidth: '1000px' }}>
            
            </div>
            <div className="card-list">
                {set.map((card, i) => (
                        <Card
                        key={i}
                        name={card.setname}
                        creator={card.userID}
                        theme={card.theme}
                        length={card.size} 
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

import React from 'react';
import FavouritesButton from './icons/Favourites';
import EditButton from './icons/Edit';

const Card = (props) => {
    const { name, creator, length, theme } = props;
    return (
        <div className='bg-color-card br4 pa1 ma2 grow tc flex flex-column items-center justify-center relative' style={{ height: '150%', width: '30%' }}>
            <div className='absolute top-0 right-0 pa2'> 
                <FavouritesButton /> {/* Endre fargen når settet er favorisert */}
            </div>
            <div className='absolute bottom-0 right-0 pa2'> 
                <EditButton /> {/* Må fikse sånn at edit kun kommer opp på egne sett */}
            </div>
            <h2 style={{ marginBottom: '1%', marginTop: '13%' }}>{name}</h2>
            <h3 style={{ marginBottom: '1%', marginTop: '1%' }}>{creator}</h3>
            <h3 style={{ marginBottom: '1%', marginTop: '1%' }}>{theme}</h3>
            <h3 style={{ marginBottom: '13%', marginTop: '1%' }}>{length} cards</h3>
        </div>
    );
}

export default Card;

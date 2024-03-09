import React from 'react';
import { Link } from 'react-router-dom';


const Card = (props) => {
    const { name, creator, length, theme, onClick, edit: EditButton, favourite: FavouritesButton, remove: RemoveButton} = props;

    return (
        <Link  to={"/cardview"} onClick={onClick} className='bg-color-card br4 pa1 ma2 grow tc flex flex-column items-center justify-center relative' style={{ height: '150%', width: '30%', textDecoration: 'none', color: 'inherit' }}>
            <div className='absolute top-0 right-0 pa2'> 
                {FavouritesButton && <FavouritesButton/>} {/* Endre fargen når settet er favorisert */}
            </div>
            <div className='flex flex-row absolute bottom-0 right-0 pa2'> 
                {RemoveButton && <RemoveButton />} {/* Delete skal kun komme opp for admin */}
                {EditButton && <EditButton />} {/* Må fikse sånn at edit kun kommer opp på egne sett */}
            </div>
            <h2 style={{ marginBottom: '1%', marginTop: '13%' }}>{name}</h2>
            <h3 style={{ marginBottom: '1%', marginTop: '1%' }}>{creator}</h3>
            <h3 style={{ marginBottom: '1%', marginTop: '1%' }}>{theme}</h3>
            <h3 style={{ marginBottom: '13%', marginTop: '1%' }}>{length}</h3>
        </Link>
    );
}

export default Card;

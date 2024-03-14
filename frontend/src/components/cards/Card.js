import React from 'react';
import { Link } from 'react-router-dom';


const Card = (props) => {
    const { name, owner, size, theme, onClick, edit, favourite, remove} = props;
    console.log(props);

    return (
        <Link  to={"/cardview"} onClick={onClick} className='bg-color-card br4 pa1 ma2 grow tc flex flex-column items-center justify-center relative' style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='absolute top-0 right-0 pa2'> 
                {favourite} {/* Endre fargen når settet er favorisert */}
            </div>
            <div className='flex flex-row absolute bottom-0 right-0 pa2'> 
                {remove}
                {edit}
            </div>
            <h2 style={{ marginBottom: '1%', marginTop: '13%' }}>{name}</h2>
            <h3 style={{ marginBottom: '1%', marginTop: '1%' }}>{owner}</h3>
            <h3 style={{ marginBottom: '1%', marginTop: '1%' }}>{theme}</h3>
            <h3 style={{ marginBottom: '13%', marginTop: '1%' }}>{size} cards</h3>
        </Link>
    );
}

export default Card;

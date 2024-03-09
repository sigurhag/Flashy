import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';



const Favourites = () => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        color: '#00489C',
        transform: 'scale(1.05)',
        transition: 'transform 0.4s, color 0.4s'
    };
    return (
        <Link 
            to="/favourites"
            className="flex flex-column items-center pb3 nav-links"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={isHovered ? hoverStyle : {}}
        >
            <FontAwesomeIcon
                icon={faHeart}
                color="#FFFFFF"
                size="3x"
                style={isHovered ? hoverStyle : {}}

            />
            <p className='f4'>Favourites</p>
        </Link>
    );
};

export default Favourites;

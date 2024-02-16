import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        color: '#00489C',
        transform: 'scale(1.05)',
        transition: 'transform 0.4s, color 0.4s'
    };
    return (
        <Link
            to="/search"
            className="flex flex-column items-center pb3 nav-links"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={isHovered ? hoverStyle : {}}
        >
            <FontAwesomeIcon icon={faMagnifyingGlass} color="#FFFFFF" size="3x" style={isHovered ? hoverStyle : {}} />
            <p className='f4'>Search</p>
        </Link>
    );
};


export default Search;

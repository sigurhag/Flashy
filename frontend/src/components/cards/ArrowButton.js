import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'

const ArrowButton= ({type}) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        transform: 'scale(1.2)',
        transition: 'transform 0.4s, color 0.4s'
    };
    return (
        <Link
            to="/"
            className="flex flex-column items-center pb3 nav-links"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={isHovered ? hoverStyle : {}}
        >
            <FontAwesomeIcon
                icon={type}
                color='#00489C'
                size="2x"
                style={isHovered ? hoverStyle : {}}

            />
        </Link>
    );
};

export default ArrowButton;




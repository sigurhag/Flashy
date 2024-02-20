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
            <FontAwesomeIcon
                icon={type}
                color='#00489C'
                size="2x"
                style={isHovered ? hoverStyle : {}}

            />
    );
};

export default ArrowButton;




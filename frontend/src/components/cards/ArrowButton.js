import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const ArrowButton= ({ type, onClick, isDarkMode }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        transform: 'scale(1.3)',
        transition: 'transform 0.4s'
    };
    return (
            <FontAwesomeIcon
                icon={type}
                color={isDarkMode ? '#FCD060' : '#00489C'}
                size="2x"
                style={isHovered ? hoverStyle : {}}
                className='pa3'
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
    );
};

export default ArrowButton;




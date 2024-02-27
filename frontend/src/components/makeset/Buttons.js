import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const Button = ({ text, icon, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        color: '#00489C',
        transform: 'scale(1.05)',
        transition: 'transform 0.4s, color 0.4s'
    };

    const textStyle = {
        transition: 'transform 0.4s, color 0.4s',
        color: isHovered ? '#00489C' : '#FFFFFF' 
    };

    return (
        <div className='flex justify-center ma2' onClick={onClick}>
        <div className='bg-color-sidebar flex flex-column items-center nav-links add-question pa3'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <FontAwesomeIcon
                icon={icon}
                color="#FFFFFF"
                size="3x"
                style={isHovered ? hoverStyle : {}}
            />
            <p className='f4 tc' style={textStyle}>{text}</p> 
        </div>
        </div>
    );
};

export default Button;

import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';



const FavouritesButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        color: '#FFC7C7',
        transform: 'scale(1.05)',
        transition: 'transform 0.4s, color 0.4s'
    }
    const containerStyle = {
        padding: '5px',
        display: 'inline-block'
    };

    return (
        <div style={containerStyle}>
            <FontAwesomeIcon
                icon={faHeart}
                color="#FFFFFF"
                size="2x"
                style={isHovered ? hoverStyle : {}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} 
            />
        </div>
    );
}
export default FavouritesButton


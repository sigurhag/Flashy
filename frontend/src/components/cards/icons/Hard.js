import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull } from '@fortawesome/free-solid-svg-icons';



const HardButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        color: '#FFA5A5',
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
                icon={faSkull}
                color="#FFFFFF"
                size="2x"
                style={isHovered ? hoverStyle : {}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} 
            />
        </div>
    );
}
export default HardButton


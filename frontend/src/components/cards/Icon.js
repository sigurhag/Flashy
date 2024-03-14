import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Icon = ({icon, onClick, color, onHoverColor }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        color: onHoverColor,
        transform: 'scale(1.1)',
        transition: 'transform 0.4s, color 0.4s'
    }
    const containerStyle = {
        padding: '5px',
        display: 'inline-block'
    };

    return (
        <div style={containerStyle} onClick={onClick}>
            <FontAwesomeIcon
                icon={icon}
                color={isHovered ? onHoverColor : color}
                size="2x"
                style={isHovered ? hoverStyle : {}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} 
            />
        </div>
    );
}
export default Icon


import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



const RemoveButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        color: 'grey',
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
                icon={faTrash}
                color="#FFFFFF"
                size="2x"
                style={isHovered ? hoverStyle : {}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} 
            />
        </div>
    );
}
export default RemoveButton


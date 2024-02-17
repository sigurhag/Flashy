import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';



const EditButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        color: '#34B8F0',
        transform: 'scale(1.1)',
        transition: 'transform 0.4s, color 0.4s'
    }
    const containerStyle = {
        padding: '5px',
        display: 'inline-block'
    };

    return (
        <div style={containerStyle}>
            <FontAwesomeIcon
                icon={faPenToSquare}
                color="#FFFFFF"
                size="2x"
                style={isHovered ? hoverStyle : {}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} 
            />
        </div>
    );
}
export default EditButton


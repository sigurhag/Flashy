import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull } from '@fortawesome/free-solid-svg-icons';

const HardButton = ({onClickHard}) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        color: '#00489C',
        transform: 'scale(1.05)',
        transition: 'transform 0.4s, color 0.4s'
    }
    const containerStyle = {
        borderRadius: '90px',
        display: 'inline-block',
        position: 'relative',
        zIndex: '100'
    };

    return (
        <div 
            style={containerStyle}    
            onClick={onClickHard}
        >
            <FontAwesomeIcon
                icon={faSkull}
                color="grey"
                size="1x"
                style={{padding: '10px', ...isHovered ? hoverStyle : {}}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} 
            />
        </div>
    );
}
export default HardButton




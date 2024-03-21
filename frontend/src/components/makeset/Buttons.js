import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

const Button = ({ text, icon, onClick, isDarkMode }) => {
    const [isHovered, setIsHovered] = useState(false);

    const hoverStyle = {
        color: isDarkMode ? '#f6c42e' : '#00489C',
        transform: 'scale(1.05)', 
        transition: 'transform 0.4s, color 0.4s' 
    };

    const textStyle = {
        color: "#FFFFFF", 
        ...(isHovered ? hoverStyle : {}) 
    };

    return (
        <div className='flex justify-center ma2' onClick={onClick}>
            <div style={{backgroundColor: isDarkMode ? "#1163c1" : "#34B8F0"}} className='flex flex-column items-center nav-links add-question pa3'
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

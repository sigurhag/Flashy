import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const DarkMode = ({isDarkMode={isDarkMode}, toggleDarkMode={toggleDarkMode}}) => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverStyle = {
    color: isDarkMode ? 'f6c42e' : '#00489C',
    transform: 'scale(1.05)',
    transition: 'transform 0.4s, color 0.4s'
  };

  return (
    <div style={{backgroundColor: isDarkMode ? "#1163c1" : "#34B8F0"}}  className=' dark-mode-fixed flex justify-center'>
        <FontAwesomeIcon
            icon={isDarkMode ? faSun : faMoon}
            color="#FFFFFF"
            size="3x"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={toggleDarkMode}
            style={{...(isHovered ? hoverStyle : {}), paddingTop: '10px', paddingBottom: '15px'}}
        />
    </div>
  );
};

export default DarkMode;

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const SetBtn = ({text, isDarkMode}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverStyle = {
    color: isDarkMode ? '#f6c42e' : '#00489C',
    transform: 'scale(1.05)',
    transition: 'transform 0.4s, color 0.4s'
  };
  return (
      <div style={{backgroundColor: isDarkMode ? "#155daf" : "#34B8F0"}} className=' make-set-fixed'>
        <Link
            to="/makeSet"
            className=" flex flex-column items-center nav-links"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={isHovered ? hoverStyle : {}}
        >
            <FontAwesomeIcon
                icon={faPlus}
                color="#FFFFFF"
                size="3x"
                style={isHovered ? hoverStyle : {}}
            />
            <p className='f4 tc'>{text}</p>
        </Link>
      </div>
  );
};

export default SetBtn;

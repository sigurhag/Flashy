import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserProfileIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverStyle = {
      color: '#00489C',
      transform: 'scale(1.05)',
      transition: 'transform 0.4s, color 0.4s'

  };
  return (
      <div className='bg-color-sidebar user-icon-fixed'>
        <Link
            to="/profile"
            className=" flex flex-column items-center nav-links"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={isHovered ? hoverStyle : {}}
        >
            <FontAwesomeIcon
                icon={faUser}
                color="#FFFFFF"
                size="3x"
                style={isHovered ? hoverStyle : {}}
            />
            <p className='f4'>User</p>
        </Link>
      </div>
  );
};

export default UserProfileIcon;

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';



const Home = ({isDarkMode}) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        color: isDarkMode ? '#f6c42e' : '#00489C',
        transform: 'scale(1.05)',
        transition: 'transform 0.4s, color 0.4s'

    };
    return (
        <Link
            to="/home"
            className="flex flex-column items-center pb3 nav-links"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={isHovered ? hoverStyle : {}}
        >
            <FontAwesomeIcon
                icon={faBolt}
                color="#FFFFFF"
                size="3x"
                style={isHovered ? hoverStyle : {}}

            />
            <p className='f4'>Home</p>
        </Link>
    );
};

export default Home;

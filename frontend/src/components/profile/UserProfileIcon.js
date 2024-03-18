import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const UserProfileIcon = ({ user = {}, isDarkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { username, email } = user;
  const [userInfo, setUserInfo] = useState([]);

  const hoverStyle = {
    color: isDarkMode ? '#f6c42e' : '#00489C',
      transform: 'scale(1.05)',
      transition: 'transform 0.4s, color 0.4s'
  };
      useEffect(() => {
      const getUserData = async () => {
        try {
          const response = await axios.get("http://localhost:3500/flash/profile", {
            params: {username, email}
          });
          if (response.data) {
            setUserInfo(response.data);
            console.log("fetched data successfully!");
          } else {
            console.log("error fetching userdata")
        } 
        } catch (error) {
          console.error("Error fetching user info: ", error);
        }
      };
      getUserData();
    }, [username])
  return (
    <div style={{backgroundColor: isDarkMode ? "#1163c1" : "#34B8F0"}}  className=' user-icon-fixed'>
      <Link
          to="/profile"
          className="flex flex-column items-center nav-links"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={isHovered ? hoverStyle : {}}
      >
          <FontAwesomeIcon
              icon={faUser}
              color= "#FFFFFF"
              size="3x"
              style={isHovered ? hoverStyle : {}}
          />
          <p className='f4'>{userInfo[0]}</p> 
      </Link>
    </div>
  );
};

export default UserProfileIcon;

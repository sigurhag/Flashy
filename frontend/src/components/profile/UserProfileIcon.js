import React from 'react';
import { Link } from 'react-router-dom';


const UserProfileIcon = ({ users }) => {
  return (
    <Link to="/profile" className="bg-color-navbar" style={{ cursor: 'pointer', display: 'inline-block', width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: '100%', height: '100%' }}>
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
      </svg>
      <div style={{ marginTop: '5px', textAlign: 'center' }}>User</div>
    </Link>
  );
};

export default UserProfileIcon;



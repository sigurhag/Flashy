import React from 'react';
import { Link } from 'react-router-dom';
import LogInButton from '../components/login/Button'
import RegisterButton from '../components/registration/Button';

const Welcome = () => {
  return (
    <div className='vh-100 flex flex-column justify-center items-center'>
        <h1 className='f1 mb3 '>WELCOME TO FLASHY</h1>
        <h2 className='f2  mt2 mb4'>World's best flashcard app!</h2>
        <div className='flex flex-row'>
          <Link to="/login"><LogInButton/></Link>
          <Link to="/register"><RegisterButton/></Link>
        </div>
    </div>

  );
};

export default Welcome;

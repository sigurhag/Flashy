import 'tachyons';
import { users } from './components/profile/Users';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DarkMode from './components/Darkmode';
import Homepage from './pages/Home';
import Searchpage from './pages/Search';
import MySetspage from './pages/MySets';
import Favouritespage from './pages/Favourites';
import Welcome from './pages/Welcome';
import CardViewPage from './pages/CardView';
import Profile from './pages/Profile';
import LogIn from './pages/LogIn';
import MakeSetPage from './pages/MakeSet';
import UserRegister from './pages/UserRegister';
import EditPage from './pages/Edit';

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
        const element = document.body;
        element.classList.toggle("dark-mode");
    };

    return (
        <BrowserRouter>
            <div>
                <DarkMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <Routes>
                    <Route path="/home" element={<Homepage isDarkMode={isDarkMode} />} />
                    <Route path="/search" element={<Searchpage isDarkMode={isDarkMode} />} />
                    <Route path="/mySets" element={<MySetspage isDarkMode={isDarkMode} />} />
                    <Route path="/favourites" element={<Favouritespage isDarkMode={isDarkMode} />} />
                    <Route path="/edit" element={<EditPage isDarkMode={isDarkMode} />} />
                    <Route path="/" element={<Welcome isDarkMode={isDarkMode} />} />
                    <Route path="/cardview/:cardID" element={<CardViewPage isDarkMode={isDarkMode} />} />
                    <Route path="/profile" element={<Profile user={users} isDarkMode={isDarkMode} />} />
                    <Route path="/login" element={<LogIn isDarkMode={isDarkMode} />} />
                    <Route path="/makeSet" element={<MakeSetPage isDarkMode={isDarkMode} />} />
                    <Route path="/register" element={<UserRegister isDarkMode={isDarkMode} />} />
                    <Route path='/edit' element={<EditPage isDarkMode={isDarkMode} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};


export default App

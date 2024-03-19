import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import 'tachyons';
import CardList from './components/cards/CardList';
import { cards } from './components/cards/Cards';


import UserProfileIcon from './components/profile/UserProfileIcon';

import Homepage from './pages/Home';
import Searchpage from './pages/Search';
import Favouritespage from './pages/Favourites';
import MySetspage from './pages/MySets';
import Profile from './pages/Profile';
import LogIn from './pages/LogIn';
import UserRegister from './pages/UserRegister';
import Welcome from './pages/Welcome';
import CardViewPage from './pages/CardView';
import { users } from './components/profile/Users';
import MakeSetPage from './pages/MakeSet';

const App = () => {
    return (
    <BrowserRouter>
        <div>
                <Routes>
                    <Route path="/home" element={<Homepage cards={cards} />} />
                    <Route path="/search" element={<Searchpage />} />
                    <Route path="/mySets" element={<MySetspage cards={cards}/>} />
                    <Route path="/favourites" element={<Favouritespage cards={cards}/>} />
                    <Route path="/" element={<Welcome />} />
                    <Route path="/cardview/:cardID" element={<CardViewPage />}/>
                    <Route path="/profile" element={<Profile user={users} />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/makeSet" element={<MakeSetPage />} />
                    <Route path="/register" element={<UserRegister />} />
                </Routes>

        </div>
    </BrowserRouter>
    )
};

export default App

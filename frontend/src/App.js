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
import LogOutpage from './pages/Welcome';
import Profile from './pages/Profile';
import LogIn from './pages/LogIn';
import Welcome from './pages/Welcome';


const App = () => {
    const PageName = () => {
        const location = useLocation();
        const [pageName, setPageName] = useState('');

        useEffect(() => {
            const mapPathnameToPageName = (pathname) => {
                switch (pathname) {
                    case '/':
                        return 'Home';
                    case '/search':
                        return 'Search';
                    case '/mySets':
                        return 'My sets';
                    case '/favourites':
                        return 'Favourites';
                    case '/welcomePage':
                        return 'Log Out';
                    default:
                        return 'Page';
                }
            };

            setPageName(mapPathnameToPageName(location.pathname));
        }, [location]);

        return <h2>{pageName}</h2>;
    };
    return (
    <BrowserRouter>
        <div>
                <Routes>
                    <Route path="/home" element={<Homepage cards={cards} />} />
                    <Route path="/search" element={<Searchpage />} />
                    <Route path="/mySets" element={<MySetspage cards={cards}/>} />
                    <Route path="/favourites" element={<Favouritespage cards={cards}/>} />
                    <Route path="/" element={<Welcome />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<LogIn />} />
                </Routes>

        </div>
    </BrowserRouter>
    )
};

export default App

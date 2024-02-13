import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import 'tachyons';
import CardList from './components/cards/CardList';
import { cards } from './components/cards/Cards';
import Sidebar from './components/sidebar/Sidebar';
import Homepage from './pages/Home';
import Searchpage from './pages/Search';
import Favouritespage from './pages/Favourites';
import MySetspage from './pages/MySets';
import LogOutpage from './pages/LogOut';

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
            <div className="fixed-top-middle">
                <h1>FLASHY</h1>
                <PageName />
            </div>
            <Sidebar />
            <div className='main-content'>
                <Routes>
                    <Route path="/pages/home" element={<Homepage cards={cards} />} />
                    <Route path="/search" element={<Searchpage />} />
                    <Route path="/mySets" element={<MySetspage cards={cards}/>} />
                    <Route path="/favourites" element={<Favouritespage cards={cards}/>} />
                    <Route path="/welcomePage" element={<LogOutpage />} />
                </Routes>
            </div>
        </div>
    </BrowserRouter>
    )
};

export default App

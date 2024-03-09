import { Link } from "react-router-dom";
import Home from "./Home";
import Search from "./Search"
import MySets from "./MySets"
import Favourites from "./Favourites"
import LogOut from "./LogOut"

const Sidebar = () => {
    return (
        <div className="bg-color-sidebar white flex flex-column items-center sidebar-fixed">
            <Home />
            <Search />
            <MySets />
            <Favourites />
            <LogOut />
        </div>
    ); 
}

export default Sidebar
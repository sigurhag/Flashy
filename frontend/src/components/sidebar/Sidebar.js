import Home from "./Home";
import Search from "./Search"
import MySets from "./MySets"
import Favourites from "./Favourites"
import LogOut from "./LogOut"

const Sidebar = ({ isDarkMode }) => {

    const sidebarStyle = {backgroundColor: isDarkMode ? "#1163c1" : "#34B8F0" }
    return (
        <div style={sidebarStyle} className={"white flex flex-column items-center sidebar-fixed"}>
            <Home isDarkMode={isDarkMode}/>
            <Search isDarkMode={isDarkMode}/>
            <MySets isDarkMode={isDarkMode}/>
            <Favourites isDarkMode={isDarkMode}/>
            <LogOut isDarkMode={isDarkMode}/>
        </div>
    ); 
}

export default Sidebar
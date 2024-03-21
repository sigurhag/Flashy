import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const Card = (props) => {
    const { name, owner, setID, size, likes, theme, edit, favourite, favouriteColor, remove, isDarkMode } = props;

    const navigate = useNavigate();

    const handleFavourite = async() => {
        console.log("Favourite was pressed!");
        try {
            const response = await axios.post("http://localhost:3500/flash/favouriteSet",{setID})
        if(response.data) {
            console.log("liked set successfully")
            } 
        } catch (error) {
            console.log(error)
        } 
    }

    const handleRemove = async () => {
        console.log("Removed pressed")
        try {
            const response = await axios.post("http://localhost:3500/flash/removeSet", 
               {setID}
            )
            if(response.data) {
                console.log("set removed successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = () => {
        console.log("Edit was pressed!")
        console.log(setID);
        navigate("/edit", {state: { setID }})
    }

    const handleCardPressed = () => {
        console.log(setID)
        navigate(`/cardview/${setID}`, { state: { name, setID } });
    }

    return (
        <div className={'br4 pa1 ma2 grow tc flex flex-column items-center justify-center relative'} style={{ height: '200px', width: '300px', textDecoration: 'none', color: 'inherit', backgroundColor: isDarkMode ? '#124a8b' : '#FFEFC5', paddingTop: '20px', paddingBottom: '20px'}}>           
            <div onClick={handleCardPressed} >
                <h2 style={{ marginBottom: '1%', marginTop: '20px' }}>{name}</h2>
                <h3 style={{ marginBottom: '1%', marginTop: '1%' }}>{owner}</h3>
                <h3 style={{ marginBottom: '1%', marginTop: '1%' }}>{theme}</h3>
                <h3 style={{ marginBottom: '1%', marginTop: '1%' }}>{likes} likes</h3>
                <h3 style={{ marginBottom: '20px', marginTop: '1%' }}>{size} cards</h3>
            </div>
            <div className='absolute top-0 right-0 pa2'>
                <span onClick={handleFavourite} style={{ color: favouriteColor }}>{favourite}</span>
            </div>
            <div className='flex flex-row absolute bottom-0 right-0 pa2'>
                <span onClick={handleRemove}>{remove}</span>
                <span onClick={handleEdit}>{edit}</span>
            </div>
        </div>
    );
}

export default Card;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Card = (props) => {
    const { name, owner, setID, size, theme, onClick, edit, favourite, remove} = props;
    console.log(props);


    const navigate = useNavigate();

    const handleFavourite = (event) => {
        console.log("Favourite was pressed!");
    }

    const handleRemove = async () => {
        console.log("Removed pressed")
        console.log(setID)
        try {
            const response = await axios.post("http://localhost:3500/flash/removeSet", 
               {setID}
            )
            if(response.data) {
                console.log("set removed successfully")
                window.location.reload()
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
        navigate("/cardview")
    }


    return (
        <div  to={"/cardview"} onClick={onClick} className='bg-color-card br4 pa1 ma2 grow tc flex flex-column items-center justify-center relative' style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='absolute top-0 right-0 pa2'> 
                {favourite} {/* Endre fargen når settet er favorisert */} </div>
        <div className='bg-color-card br4 pa1 ma2 grow tc flex flex-column items-center justify-center relative' style={{ height: '150%', width: '30%', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
            <div onClick={handleCardPressed} style={{ width: '70%', float: 'left', textAlign: 'left' }}>
                <h2 style={{ marginBottom: '1%', marginTop: '13%' }}>{name}</h2>
                <h3 style={{ marginBottom: '1%', marginTop: '1%' }}>{owner}</h3>
                <h3 style={{ marginBottom: '1%', marginTop: '1%' }}>{theme}</h3>
                <h3 style={{ marginBottom: '13%', marginTop: '1%' }}>{size} cards</h3>
            </div>
            <div style={{ width: '30%', float: 'left', textAlign: 'right' }}>
                <div className='absolute top-0 right-0 pa2'>
                    <span onClick={handleFavourite}>{favourite}</span>
                </div>
                <div className='flex flex-row absolute bottom-0 right-0 pa2'>
                    <span onClick={handleRemove}>{remove}</span>
                    <span onClick={handleEdit}>{edit}</span>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Card;

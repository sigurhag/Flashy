import React, { useState } from "react";
import axios from "axios";

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Searching for: ${searchQuery}`);
        try{
            const response = await axios.get("API_ENDPOINT?query=${searchquery}");
            console.log("Result from search: ", response.data);
            //Display search information
        } catch (error) {
            console.error("Unexpected error: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pa3">
            <div>
                <input
                    type="text"
                    size={32}
                    className="input-reset ba pa3 mb2 grow font-color"
                    style={{borderRadius: '90px', backgroundColor: '#FFEFC5', fontSize: '1.4rem' }}
                    placeholder="What do you want to learn today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="bg-transparent bn f4 pointer">
                </button>
                </div>
        </form>
    );
}

export default Searchbar;

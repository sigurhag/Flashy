import React, { useState } from "react";

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Searching for: ${searchQuery}`);
    };

    return (
        <form onSubmit={handleSubmit} className="pa3">
            <div className="flex flex-wrap items-center">
                <input
                    type="text"
                    className="input-reset ba pa3 mb2 grow font-color"
                    style={{borderRadius: '90px', backgroundColor: '#FFEFC5', fontSize: '1.4rem'}}
                    placeholder="What do you want to learn today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="bg-transparent bn f4 pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h1 w1">
                        <path fill="#00489C" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                </button>
            </div>
        </form>
    );
}

export default Searchbar;


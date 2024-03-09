import React, { useState } from 'react';

const Searchbar = ({ text, onSearch }) => {
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    if (onSearch) {
      onSearch(query);
    }
  };
  
  return (
    <div className='ma4 flex justify-center'>
    <input
        type="text"
        size={32}
        className="input-reset ba pa3 mb2 grow font-color bg-transparent ba b--transparent"
        style={{borderRadius: '90px', backgroundColor: '#FFEFC5', fontSize: '1.4rem', color: "#00489C" }}
        placeholder={text}
        onChange={handleChange}
    />
    <button type="submit" className="bg-transparent bn f4 pointer">
    </button>
    </div>

  );
};


export default Searchbar;

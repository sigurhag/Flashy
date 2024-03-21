import React, { useState } from 'react';

const Searchbar = ({ text, onSearch, isDarkMode }) => {
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    if (onSearch) {
      onSearch(query);
    }
  };

  const placeholderClass = isDarkMode ? 'input-placeholder-dark' : 'input-placeholder-light';

  return (
    <input
        type="text"
        size={40}
        className={`input-reset ba pa3 mb2 grow bg-transparent ba b--transparent ${placeholderClass}`}
        style={{borderRadius: '90px', backgroundColor: isDarkMode ? '#124a8b' : '#FFEFC5', color: isDarkMode ? '#f6c42e' : "#00489C",  fontSize: '1.4rem'}}
        placeholder={text}
        onChange={handleChange}
    />
  );
};

export default Searchbar;


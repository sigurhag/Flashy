import React from 'react';

const TextBox = ({ label, value, onChange, isDarkMode }) => {
  return (
    <div className="pa2 flex flex-column justify-center">
      <label className='f3 mb1'>{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className=" f3  white bg-transparent ba b--transparent " 
        style={{color: isDarkMode ? '#f6c42e' : "#00489C", backgroundColor: isDarkMode ? '#175aa6' : '#EFD593', borderRadius: '80px', width:'100%'}}
      />
    </div>
  );
};

export default TextBox;

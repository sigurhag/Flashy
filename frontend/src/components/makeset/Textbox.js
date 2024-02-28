import React from 'react';

const TextBox = ({ label, value, onChange }) => {
  return (
    <div className="pa3 flex flex-column">
      <label className='f3'>{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className=" f3  white bg-transparent ba b--transparent " 
        style={{color: "#00489C", backgroundColor: '#EFD593', borderRadius: '80px', width:'100%'}}
      />
    </div>
  );
};

export default TextBox;

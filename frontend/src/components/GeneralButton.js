import React from "react";

const GeneralButton = ({ text, onClick }) => {
    return (
        <button 
            className="f3 grow ph3 pv2 mb2 white bg-blue" 
            style={{ backgroundColor: '#34B8F0', borderRadius: '90px' }}
            onClick={onClick}>
                { text }
        </button>
    );
}

export default GeneralButton;
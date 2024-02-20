import React from "react";

const RegisterButton = ({ onClick }) => {
    return (
        <button 
            className="f3 grow ph3 pv2 mb2 dib white bg-blue" 
            style={{ backgroundColor: '#34B8F0', borderRadius: '90px' }}
            onClick={onClick}>
                REGISTER
        </button>
    );
}

export default RegisterButton;
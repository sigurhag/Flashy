import React from "react";

const ProgressBar = ({progress}) => {
    return (
        <div className="mb4 progress-bar" style={{backgroundColor: '#FFEFC5', borderRadius: '40px', overflow: 'hidden', width: '550px', height:'8%'}}>
            <div className="active-progress"
                style={{
                backgroundColor: '#34B8F0',
                borderRadius: '40px',
                height: '100%',
                width: `${progress}%`, 
                padding: '1.5%'
            }}></div></div> 
    );
}

export default ProgressBar;

import React from 'react';
import './XMessages.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import logo_icon from '../Assets/BlueLogo.png';


const ControlNumber = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(`home/`)
    };

    return (
        <div className='messages-all-container'>
            <div className='messages-container'>
                <div className="messages-logo">
                    <img src={logo_icon} alt="Logo" />
                </div>
                <div className="messages-text">
                    <p className="es-text">Control Number:</p><br></br>
                    <p className="bigger-text">PLACEHOLDER</p>
                </div>

                <div className="messages-button">
                    <button className="messages-button-text" onClick={handleBack}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ControlNumber;
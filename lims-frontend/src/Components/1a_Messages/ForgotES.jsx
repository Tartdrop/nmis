import React from 'react';
import './XMessages.css';
import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import logo_icon from '../Assets/BlueLogo.png';
import back_button from '../Assets/BackButton.png';

Userfront.init("jb7ywq8b");

const ForgotES = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/login")
    };

    return (
        <div className='messages-all-container'>
            <div className='messages-container'>
                <div className="messages-logo">
                    <img src={logo_icon} alt="Logo" />
                </div>
                <div className="messages-text">
                    <p className="es-text">An email</p>
                    <p className="es-text">has been sent</p>
                    <p className="es-text">to the provided email</p>
                </div>

                <div className="messages-button">
                    <button className="messages-button-text" onClick={handleBack}>
                        <img src={back_button} alt='back'/>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotES;
import React, { useState } from 'react';
import './Forget.css';
import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for API calls

Userfront.init("jb7ywq8b");

const Forget = () => {
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState(""); // New state for old password
    const [newPassword, setNewPassword] = useState(""); // New state for new password
    const navigate = useNavigate();

    const handleBackToLogin = () => {
        navigate("/login")
    };

    const handleRegister = () => {
        navigate("/register")
    };

    const handleVerifyEmail = () => {
        navigate("/tfa-forgot-pass")
    };

    return (
        <div className='forget-all-container'>
            <div className='forget-all-left'>
                <div className='forget-container'>
                    <div className='f-c-container'>
                        <p className="f-c-c-forgetyourpassword">
                            Forget your
                        </p>
                        <p className="f-c-c-forgetyourpassword">
                            Password?
                        </p>
                        <p className="f-c-c-text">
                            Enter your email to reset your account's password.
                        </p>
                    </div>
                    <div className="email-forget">               
                        <div className="forget-input">
                            <input 
                                className="font-link"
                                type="email" 
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
    
                    <div className="login-button">
                        <button 
                            className="text-button" 
                            onClick={handleVerifyEmail}
                        >
                            Verify Email
                        </button>
                    </div>
    
                    <div className="forget-last-row-text">
                        <button className="center button-text" onClick={handleBackToLogin}>Back To Log In</button>
                        <button className="center button-text" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );    
}

export default Forget;
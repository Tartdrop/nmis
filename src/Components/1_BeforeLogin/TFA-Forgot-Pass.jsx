import React, { useState, useEffect } from 'react';
import './TFA.css';
// import Userfront from "@userfront/core";
import { useNavigate, useParams } from 'react-router-dom';

// Userfront.init("jb7ywq8b");

const TFAForgot = ({ onLogin }) => {
    console.log("onLogin is detected:", onLogin)
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState(null);
    const { username } = useParams();

    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleVerifyOTP = () => {
        navigate("/change-pass", { replace: true })
    };

    return (
        <div className='tfa-all-container'>
            <div className='tfa-all-left'>
            <form className="verification" onSubmit={handleVerifyOTP}>
                <div className='tfa-container'>
                    <div className='t-c-container'>
                        <p className="t-c-c-title">
                            Two-Factor
                        </p>
                        <p className="t-c-c-title">
                            Authentication
                        </p>
                        <p className="t-c-c-text">
                            Enter the code from your provided email below.
                        </p>
                        
                    </div>
                    <div className="tfa-email">                              
                        <div className="tfa-input">
                            <input 
                                className="font-link"
                                type="text" 
                                value={verificationCode}
                                placeholder="Authentication Code"
                                onChange={handleVerificationCodeChange}
                            />
                        </div>
                    </div>

                    <div className="login-button">
                        <button className="text-button" value="Verify OTP">Verify OTP</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
}

export default TFAForgot;
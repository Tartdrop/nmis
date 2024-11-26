import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

import logo_icon from '../Assets/BlueLogo.png';
import eyeOpen from '../Assets/EyeOpen.png';
import eyeClose from '../Assets/EyeClose.png';

const Login = () => {
    //console.log("onLogin is detected: ", onLogin)
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [visible, setVisible] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const url = new URL(`${process.env.REACT_APP_API_URL}login`);
            url.searchParams.append('identifier', identifier);
            url.searchParams.append('password', password);
    
            const response = await fetch(url, {
                method: 'POST',
            });
    
            if (response.ok) {
                setSuccessMessage("Login successful!");
                setError(null);
                navigate(`/tfa/${identifier}`);
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || "Login failed. Please check if your email or password is correct.");
                setSuccessMessage(null);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login');
            setSuccessMessage(null);
        }
    };
    
    const handleForgetPassword = () => {
        navigate("/forget")
    };

    const handleRegister = () => {
        navigate("/register")
    };

    return (
        <div className='login-all-container'>
            <div className='login-all-left'>
                <div className='login-container'>
                    <div className="logo">
                        <img src={logo_icon} alt="Logo" />
                    </div>
                    <div className="login-em-pass">               
                        <div className="login-input">
                            <input 
                                className="font-link"
                                type="email" 
                                value={identifier}
                                placeholder="Email"
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>

                        <div className="login-input">
                            <input 
                                className="font-link"
                                type={visible ? "text" : "password"}
                                value={password} 
                                id="password"
                                placeholder="Password" 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="eyecon" onClick={() => setVisible(!visible)}>
                                <button>
                                    {visible ? <img src={eyeOpen} alt="Show Password" /> 
                                            : <img src={eyeClose} alt="Hide Password" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {error && <div className="error-message">{error}</div>}

                    <div className="login-button" onClick={handleLogin}>
                        <button className="text-button">Log In</button>
                    </div>

                    <div className="login-last-row-text">
                        <button className="forget center button-text" onClick={handleForgetPassword}>Forget Password?</button>
                        <button className="register center button-text" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import logo_icon from '../Assets/BlueLogo.png';
import eyeOpen from '../Assets/EyeOpen.png';
import eyeClose from '../Assets/EyeClose.png';

const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false);
  
    const handleLogin = async (event) => {
        event.preventDefault(); 
        try {
            const url = new URL('http://localhost:8080/login');
            url.searchParams.append('identifier', identifier);
            url.searchParams.append('password', password);
    
            const response = await fetch(url, {
                method: 'POST',
            });
    
            if (response.ok) {
                // Login successful
                const responseData = await response.text();
                console.log('Login successful');
                navigate(`/home/${responseData}`);
            } else {
                // Login failed
                const errorMessage = await response.text();
                setError(errorMessage);
                console.log('Login failed:', errorMessage);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login');
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

                    <div className="login-button" onClick={handleLogin}>
                        <button className="text-button">Log In</button>
                    </div>

                    <div className="login-last-row-text">
                        <button className="forget center button-text" onClick={handleForgetPassword}>Forget Password?</button>
                        <button className="register center button-text" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </div>
            {/*
            <div className='all-right'>
                <p className="all-right-first-row">
                    Welcome to the
                </p>
                <div className="all-right-second-row">
                    <p className="N">N</p>
                    <p className="M">M</p>
                    <p className="I">I</p>
                    <p className="S">S</p>
                    <p className="spacing">.</p>
                    <p className="laboratory">Laboratory</p>
                    <p className="services">Services</p>
                </div>
                <div className="all-right-third-row">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Vivamus metus arcu, molestie ac tempor at, fringilla eget ligula. 
                        Vestibulum scelerisque viverra tempor. Sed efficitur risus id cursus viverra. 
                        Proin ullamcorper nulla sed nisi ultricies molestie. Ut posuere pulvinar ornare. 
                        Nunc sit amet est sit amet justo mollis fermentum. Fusce sollicitudin eleifend gravida. 
                        Donec non mattis nunc. Mauris sollicitudin viverra elit, eu pretium diam blandit id. 
                        Aenean dolor ipsum, gravida a neque varius, pulvinar pharetra metus. 
                        Donec auctor arcu at malesuada hendrerit. Nunc luctus, magna sed efficitur ornare, 
                        mauris tellus sagittis lacus, sed fermentum tortor leo et tellus. Aliquam erat volutpat. 
                        Ut sapien sem, viverra vel sapien ut, lobortis sollicitudin lacus.
                    </p>
                </div>
            </div>
            */}
        </div>
    );
}

/*
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const navigateAfterLogin = () => {
        navigate("/");
    }

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            alert("Email and password cannot be blank.");
            return;
        }
    
        try {
    
            const response = await Userfront.login({
                method: "password",
                email: email,
                password: password,
            });
    
            console.log("Login Response:", response);
    
            if (response?.success === true) {
                navigateAfterLogin();
            }
        } catch (error) {
            alert("Incorrect username and password.");
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
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
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

                    <div className="login-button" onClick={handleLogin}>
                        <button className="text-button">Log In</button>
                    </div>

                    <div className="login-last-row-text">
                        <button className="forget center button-text" onClick={handleForgetPassword}>Forget Password?</button>
                        <button className="register center button-text" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </div>
            {
            <div className='all-right'>
                <p className="all-right-first-row">
                    Welcome to the
                </p>
                <div className="all-right-second-row">
                    <p className="N">N</p>
                    <p className="M">M</p>
                    <p className="I">I</p>
                    <p className="S">S</p>
                    <p className="spacing">.</p>
                    <p className="laboratory">Laboratory</p>
                    <p className="services">Services</p>
                </div>
                <div className="all-right-third-row">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Vivamus metus arcu, molestie ac tempor at, fringilla eget ligula. 
                        Vestibulum scelerisque viverra tempor. Sed efficitur risus id cursus viverra. 
                        Proin ullamcorper nulla sed nisi ultricies molestie. Ut posuere pulvinar ornare. 
                        Nunc sit amet est sit amet justo mollis fermentum. Fusce sollicitudin eleifend gravida. 
                        Donec non mattis nunc. Mauris sollicitudin viverra elit, eu pretium diam blandit id. 
                        Aenean dolor ipsum, gravida a neque varius, pulvinar pharetra metus. 
                        Donec auctor arcu at malesuada hendrerit. Nunc luctus, magna sed efficitur ornare, 
                        mauris tellus sagittis lacus, sed fermentum tortor leo et tellus. Aliquam erat volutpat. 
                        Ut sapien sem, viverra vel sapien ut, lobortis sollicitudin lacus.
                    </p>
                </div>
            </div>
            }
        </div>
    );
}
*/

export default Login;
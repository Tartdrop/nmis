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

    const handleResetPassword = async () => {  // Added function to handle password reset
        try {
            const response = await axios.post("http://localhost:8080/changePass/client", null, {
                params: {
                    username: email,  // Assuming email is used as username
                    oldPassword: oldPassword,   // Use the old password from state
                    newPassword: newPassword // Use the new password from state
                },
                headers: {
                    'Content-Type': 'application/json' // Ensure the content type is set to JSON
                }
            });
            alert(response.data); // Show success message
        } catch (error) {
            console.error("Error resetting password:", error);
            if (error.response) {
                console.error("Response data:", error.response.data); // Log the response data for debugging
                alert("Failed to reset password: " + error.response.data.message); // Show server error message
            } else {
                alert("Failed to reset password. Please try again.");
            }
        }
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
                    <div className="forget-input">
                        <input 
                            className="font-link"
                            type="password" 
                            value={oldPassword}
                            placeholder="Old Password"
                            onChange={(e) => setOldPassword(e.target.value)} // Handle old password input
                        />
                    </div>
                    <div className="forget-input">
                        <input 
                            className="font-link"
                            type="password" 
                            value={newPassword}
                            placeholder="New Password"
                            onChange={(e) => setNewPassword(e.target.value)} // Handle new password input
                        />
                    </div>
    
                    <div className="login-button">
                        <button 
                            className="text-button" 
                            onClick={handleResetPassword} // Updated to call the reset function
                        >
                            Reset Your Password
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
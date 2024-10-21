import React, { useState } from 'react';
import './Register.css';
import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import eyeOpen from '../Assets/EyeOpen.png';
import eyeClose from '../Assets/EyeClose.png';

Userfront.init("jb7ywq8b");

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState("");
    const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleInitial, setMiddleInitial] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [ltoNumber, setLtoNumber] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [clientClassification, setClientClassification] = useState("");
    const [otherClientClassification, setOtherClientClassification] = useState("");


    const navigateAfterLogin = () => {
        navigate("/tfaverify");
    }

    const handleRegister = async () => {
        if (!email.trim() || !password.trim() || !firstName.trim() || !lastName.trim() || !companyName.trim() || !ltoNumber.trim() || !contactNumber.trim()) {
            alert("Please fill in all required fields.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:8080/clients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        username: username,  // Add username to the user object
                        firstName: firstName,
                        middleName: middleInitial,  // Include middle initial
                        lastName: lastName,
                        contactNumber: contactNumber,
                        email: email,
                        password: password,
                        userType: "CLIENT",
                        deletionStatus: "ACTIVE"
                    },
                    client: {
                        companyName: companyName,
                        ltoNo: ltoNumber,
                        classification: clientClassification,  // Include the selected classification
                        // Add otherClientClassification if needed based on your backend logic
                    }
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed.");
            }
    
            const data = await response.json();
            alert("Registration successful!");
            navigateAfterLogin();
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };
    
    const handleForgetPassword = () => {
        navigate("/forget")
    };

    const handleBackToLogin = () => {
        navigate("/login")
    };

    return (
        <div className='register-all-container'>
            <div className='register-container'>
                <div className="registration">Registration</div>
                <div className="register-form">
                    <div className='register-all-left'>
                        <div className="inputs">
                            <div className='label-container-left'>
                                <div className='l-c-label'>Username</div>
                                <div className="username">
                                    <input 
                                        className="font-link"
                                        type="text" 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="register-input-first-row">
                                <div className='label-container-left'>
                                    <div className='l-c-label'>First Name</div>
                                    <div className='first-name'>
                                        <input 
                                            className="font-link"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='label-container-left'>
                                    <div className='l-c-label'>M.I.</div>
                                    <div className='mi'>
                                        <input 
                                            className="font-link"
                                            type="text"
                                            value={middleInitial}
                                            maxLength={1}
                                            onChange={(e) => setMiddleInitial(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='label-container-left'>
                                    <div className='l-c-label'>Last Name</div>
                                    <div className='last-name'>
                                        <input 
                                            className="font-link"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>     
                            </div>

                            <div className='label-container-left'>
                                <div className='l-c-label'>Company Name</div>
                                <div className="company-name">
                                    <input 
                                        className="font-link"
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="register-input-third-row">
                                <div className='label-container-left'>
                                    <div className='l-c-label'>LTO Number</div>
                                    <div className='lto-number'>
                                        <input 
                                            className="font-link"
                                            type="text"
                                            value={ltoNumber}
                                            maxLength={11}
                                            onChange={(e) => setLtoNumber(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='label-container-left'>
                                <div className='l-c-label'>Contact Number</div>
                                    <div className='contact-number'>
                                        <input 
                                            className="font-link"
                                            type="text"
                                            value={contactNumber}
                                            maxLength={13}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='label-container-left'>
                                <div className='l-c-label'>Email</div>
                                <div className="email">
                                    <input 
                                        className="font-link"
                                        type="text" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='label-container-left'>
                                <div className='l-c-label'>Password</div>
                                <div className="password">
                                    <input 
                                        className="font-link"
                                        type={visible ? "text" : "password"}
                                        value={password} 
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <div className="eyecon-register" onClick={() => setVisible(!visible)}>
                                        <button>
                                            {visible ? <img src={eyeOpen} alt="Show Password" /> 
                                                    : <img src={eyeClose} alt="Hide Password" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='label-container-left'>
                                <div className='l-c-label'>Repeat Password</div>
                                <div className="retype-password">
                                    <input
                                        className="font-link"
                                        type={repeatPasswordVisible ? "text" : "password"}
                                        value={repeatPassword}
                                        id="repeat-password"
                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                    />

                                <div className="eyecon-register" onClick={() => setRepeatPasswordVisible(!repeatPasswordVisible)}>
                                    <button>
                                        {repeatPasswordVisible ? <img src={eyeOpen} alt="Show Password" /> : <img src={eyeClose} alt="Hide Password" />}
                                    </button>
                                </div>
                                </div>
                            </div>

                        </div>
                    </div>    

                    <div className="register-all-right">
                        <div className='label-container-right'>
                            <div className='l-c-label'>Client Classification</div>
                                <div className="cli-class">
                                    <div className="cli-class-both">
                                        <div className="cli-class-left">
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value={clientClassification} onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Importer
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value={clientClassification} onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Exporter
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value={clientClassification} onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Slaughterhouse
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value={clientClassification} onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Poultry Dressing Plant
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value={clientClassification} onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Meat Dealer
                                            </label>
                                        </div>

                                        <div className="cli-class-right">
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value={clientClassification} onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Meat Processing Plant
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value={clientClassification} onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Meat Cutting Plant
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value={clientClassification} onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Consumer
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value={clientClassification} onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Plant Officer
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value={clientClassification} onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Cold Storage Warehouse
                                            </label>
                                        </div>
                                    </div>

                                    <div className="cli-class-others">
                                        <label class="cli-class-container">
                                            <input type="radio" name="cli-class"/>
                                            <span class="checkmark"></span>
                                            Others:
                                            <input 
                                                type="text"
                                                value={otherClientClassification}
                                                onChange={(e) => setOtherClientClassification(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                </div>
                        </div>
                        <div className="register-button" onClick={handleRegister}>
                            <button className="text-button">Register</button>
                        </div>

                        <div className="register-last-row-text">
                            <button className="center button-text" onClick={handleBackToLogin}>Back To Log In</button>
                            <button className="center button-text" onClick={handleForgetPassword}>Forget Password?</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
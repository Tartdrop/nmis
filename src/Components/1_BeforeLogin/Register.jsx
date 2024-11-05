import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom'; 
import eyeOpen from '../Assets/EyeOpen.png';
import eyeClose from '../Assets/EyeClose.png';

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
    const [ltoNumber, setLtoNumber] = useState("PDP-"); // Default to "PDP-"
    const [contactNumber, setContactNumber] = useState("+63");
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
                        username: username,
                        firstName: firstName,
                        middleName: middleInitial,
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
                        classification: clientClassification,
                    }
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed.");
            }
    
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

    // LTO Number mask with "PDP-" prefix
    const handleLtoNumberChange = (e) => {
        let input = e.target.value.toUpperCase().replace(/^PDP-/, ""); // Remove existing PDP- for easier parsing
    
        // Extract numbers and letters based on expected format (DDDD-LL)
        const numbers = input.replace(/[^0-9]/g, "").slice(0, 4); // Only allow up to 4 numbers
        const letters = input.replace(/[^A-Z]/g, "").slice(0, 2); // Only allow up to 2 letters
    
        // Format as PDP-DDDD-LL
        let formattedInput = `PDP-${numbers}`;
        if (numbers.length === 4) {
            formattedInput += `-${letters}`;
        }
    
        setLtoNumber(formattedInput);
    };
    
    // Contact Number mask
    const handleContactNumberChange = (e) => {
        // Strip out any non-numeric characters except for the initial "+63" prefix
        let value = e.target.value.replace(/^\+63/, "").replace(/[^0-9]/g, "");
        
        // Format the number as +63XXX-XXX-XXXX
        if (value.length > 3) value = value.slice(0, 3) + "-" + value.slice(3);
        if (value.length > 7) value = value.slice(0, 7) + "-" + value.slice(7, 11);
    
        // Set the contact number with "+63" as the prefix
        setContactNumber(`+63${value}`);
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
                                        onChange={handleLtoNumberChange}
                                        placeholder="PDP-DDDD-LL"
                                        maxLength={11}
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
                                        onChange={handleContactNumberChange}
                                        placeholder="+63XXX-XXX-XXXX"
                                        maxLength={16}
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

                        <div className="register-note">
                            <div className="register-note-text">
                                * Make sure to fill in all the fields
                                before pressing the register button down below *
                            </div>
                            <div className="register-note-text-down"> ↓ </div>
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
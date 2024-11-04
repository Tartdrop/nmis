import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css';
import home_icon from '../Assets/Home.png';
import logo from '../Assets/NMISLogo.png';

const Header = ({ onLogout }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        // Function to retrieve responseData from local storage
        const retrieveUserData = () => {
            const responseData = localStorage.getItem('responseData');
            if (responseData) {
                const [type, id] = responseData.split('/'); // Assuming responseData is like "client/8"
                setUserType(type);
                setUserId(id);
            }
        };

        // Call the function to set user data
        retrieveUserData();
    }, []);

    const handleLogout = () => {
        // Clear local storage and reset user state
        localStorage.removeItem('responseData');
        setUserId(null);
        setUserType(null);
        onLogout(); // Call the onLogout prop to update the app state
        navigate('/login'); // Redirect to login page
    };

    const navigateHome = () => {
        if (userType && userId) {
            // Navigate to the home URL once userType and userId are available
            console.log('Navigating to: ', `/home/${userType}/${userId}`);
            navigate(`/home/${userType}/${userId}`);
        } else {
            console.log('UserType or UserId is missing. Redirecting to login.');
            navigate('/login');
        }
    };

    return (
        <div className='header'>
            <div className="left-stuff">
                <img src={logo} alt="Logo" />
                <div className="title">National Meat Inspection Service</div>
            </div>

            <div className="right-stuff">
                {userId && userType ? (
                    <div className="l-o">
                        <button onClick={handleLogout} className="logout-button">
                            <span><p className='logout-button-text center'>Log out</p></span>
                        </button>
                    </div>
                ) : (
                    <div className="login-prompt">
                        <p>Please log in.</p>
                    </div>
                )}

                <div className="navhome" onClick={navigateHome}>
                    <button className="home">
                        <span><img src={home_icon} alt="Home" /></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;

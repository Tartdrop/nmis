import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css';
import home_icon from '../Assets/Home.png';
import white_logo_icon from '../Assets/WhiteLogo.png';
import Userfront from "@userfront/core";

Userfront.init("jb7ywq8b");

const Header = ({ onLogout }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        // Retrieve responseData from local storage
        const responseData = localStorage.getItem('responseData');
        
        // If responseData exists, parse it to get userType and userId
        if (responseData) {
            const [type, id] = responseData.split('/'); // Assuming responseData is like "client/8"
            setUserType(type);
            setUserId(id);
        }
    }, []);

    const handleLogout = useCallback(async () => {
        try {
            await Userfront.logout({ redirect: false });
            localStorage.removeItem('responseData'); // Clear responseData on logout
            onLogout(); // Call the onLogout prop to update the app state
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, [navigate, onLogout]);

    const navigateHome = useCallback(() => {
        if (userType && userId) {
            // Navigate to the home URL once userType and userId are available
            console.log('Navigating to: ', `/home/${userType}/${userId}`);
            navigate(`/home/${userType}/${userId}`);
        } else {
            console.log('UserType or UserId is missing. Redirecting to login.');
            navigate('/login');
        }
    }, [navigate, userId, userType]);

    return (
        <div className='header'>
            <div className="left-stuff">
                <img src={white_logo_icon} alt="Logo" />
                <div className="title">NMIS</div>
            </div>

            <div className="right-stuff">
                {Userfront.accessToken() && (
                    <div className="l-o">
                        <button onClick={handleLogout} className="logout-button">
                            <span><p className='logout-button-text center'>Log out</p></span>
                        </button>
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

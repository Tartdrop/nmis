import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './Header.css';

import home_icon from '../Assets/Home.png';
import white_logo_icon from '../Assets/WhiteLogo.png';

import Userfront from "@userfront/core";

Userfront.init("jb7ywq8b");

const Header = ({ onLogout }) => {
    const navigate = useNavigate();
    const { userId } = useParams(); // Only get userId from params, no change to route paths
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        // Get user details from Userfront
        const userData = Userfront.user;
        
        if (userData && userData.data) {
            // Assume userType is stored in custom attributes or roles
            const userTypeFromSession = userData.data.userType || userData.data.role || "client"; // Fallback to 'client'
            setUserType(userTypeFromSession);
        }
    }, []);

    const handleLogout = useCallback(async () => {
        try {
            await Userfront.logout({ redirect: false });
            onLogout(); // Call the onLogout prop to update the app state
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, [navigate, onLogout]);

    const navigateHome = useCallback(() => {
        if (userType && userId) { //NOT WORKING PROPERLY. laging undefined HAHAHAH
            navigate(`/home/${userType}/${userId}`);
        }
        else{
            navigate('/login')
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

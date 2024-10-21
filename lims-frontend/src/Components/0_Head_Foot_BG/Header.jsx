import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css';

import home_icon from '../Assets/Home.png';
import white_logo_icon from '../Assets/WhiteLogo.png';

import Userfront from "@userfront/core";

const Header = ({ onLogout }) => {
    const navigate = useNavigate();

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
        if (Userfront.accessToken()) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className='header'>
            <div className="left-stuff">
                <img src={white_logo_icon} alt="Logo" />
                <div className="title">NIMS</div>
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
}

export default Header;
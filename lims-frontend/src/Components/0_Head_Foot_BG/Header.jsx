import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css';

import home_icon from '../Assets/Home.png';
import white_logo_icon from '../Assets/WhiteLogo.png';


const Header = ({ onLogout, userId, user_type }) => {
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        try {
            onLogout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, [navigate, onLogout]);


    const navigateHome = useCallback(() => {
        if (userId) {
            switch (user_type) {
                case 'client':
                    navigate(`/home/client/${userId}`);
                    break;
                case 'staff':
                    navigate(`/home/staff/${userId}`);
                    break;
                case 'tester':
                    navigate(`/home/tester/${userId}`);
                    break;
                default:
                    navigate('/login');
            }
        }
        else{
            navigate ('/login');
        }
    }, [navigate, userId, user_type]);

    return (
        <div className='header'>
            <div className="left-stuff" onClick={navigateHome}>
                <img src={white_logo_icon} alt="Logo" />
                <div className="title">NIMS</div>
            </div>

            <div className="right-stuff">
                {userId && (
                    <div className="l-o">
                        <button onClick={handleLogout} className="logout-button">
                            <span className="logout-button-text">Log out</span>
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

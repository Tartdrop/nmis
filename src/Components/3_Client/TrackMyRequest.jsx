import React from 'react';
import './TrackMyRequest.css';
import Userfront from "@userfront/core";

import blue_logo_icon from '../Assets/BlueLogo.png';

Userfront.init("jb7ywq8b");

const Register = () => {
    return (
        <div className="request-all-container">
            <div className='request-container'>
                <div className='request-title'>Track My Request</div>
                <div className="request-1st-container">
                    <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />

                    <h1 className='msg-noreqres1'>
                            You have no ongoing requests and results.
                    </h1>
                    <h1 className='msg-noreqres2'>
                            Request through the "Submit a Request" page.
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Register;
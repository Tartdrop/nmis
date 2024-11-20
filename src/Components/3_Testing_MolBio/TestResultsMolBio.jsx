import React from 'react';
import './TestResultsMolBio.css';
import Userfront from "@userfront/core";

import blue_logo_icon from '../Assets/BlueLogo.png';

Userfront.init("jb7ywq8b");

const TestingList = () => {
    return (
        <div className="request-all-container">
            <div className='request-container'>
                <div className='request-title'>Test Results</div>
                <div className="request-1st-container">
                    <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />

                    <h1 className='msg-noreqres1'>
                            All work is done! Great job!
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default TestingList;
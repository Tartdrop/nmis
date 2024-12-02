import React, { useState, useEffect } from 'react';
import './XMessages.css';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate

import logo_icon from '../Assets/BlueLogo.png';

const ControlNumber = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [requests, setRequests] = useState([]);
    const [testResults, setTestResults] = useState({}); 

    const handleBack = () => {
        navigate(`/home/staff/${userId}`);
        window.location.reload();
    };

    useEffect(() => {
        fetch(`http://localhost:8080/requests/clientrequest/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRequests(data);
            })
            .catch(error => {
                console.error('Error fetching pending requests:', error);
            });
    }, [userId]);

    return (
        <div className='messages-all-container'>
            <div className='messages-container'>
                <div className="messages-logo">
                    <img src={logo_icon} alt="Logo" />
                </div>
                <div className="messages-text">
                    <p className="es-text">Control Number:</p><br></br>
                    {requests.map((request, index) => (
                        <div key={index} className="request-item">
                            <p className="bigger-text">{request.controlNumber}</p>
                        </div>
                    ))};
                </div>

                <div className="messages-button">
                    <button className="messages-button-text" onClick={handleBack}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ControlNumber;
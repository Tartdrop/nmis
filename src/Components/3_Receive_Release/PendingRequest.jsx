import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PendingRequest.css';
import blue_logo_icon from '../Assets/BlueLogo.png';

const PendingRequest = () => {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from backend on component mount
        fetch('http://localhost:8080/requests/pending')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Update state with fetched data
                setRequests(data);
            })
            .catch(error => {
                console.error('Error fetching pending requests:', error);
            });
    }, []);

    return (
        <div className="request-all-container">
            <div className='request-container'>
                <div className='request-title'>Pending Requests</div>
                {requests.length > 0 ? (
                    requests.map((request, index) => (
                        <button 
                            key={index} 
                            className="request-button"
                            onClick={() => navigate(`/request-details/${request.requestId}`)}
                        >
                            {request.representativeName} {request.submissionDate}
                        </button>
                    ))
                ) : (
                    <div className="request-1st-container">
                        <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                        <h1 className='msg-noreqres1'>
                            There are no pending requests as of the moment.
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PendingRequest;

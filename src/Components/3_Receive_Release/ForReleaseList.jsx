import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PendingRequest.css';
import blue_logo_icon from '../Assets/BlueLogo.png';

const ForReleasing = () => {
    const {userId} = useParams();
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from backend on component mount
        fetch('http://localhost:8080/requests/for-release')
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
        <div className="pendingrequest-all-container">
            <div className='pendingrequest-container'>
                <div className='pendingrequest-title'>For Releasing</div>
                <div className="pendingrequest-1st-container">
                    <div className="pendingrequest-1st-container-header">
                        <div className="pendingrequest-1st-container-header-title">
                            Control Number
                        </div>
                        <div className="lineseparator">
                            |
                        </div>
                        <div className="pendingrequest-1st-container-header-title-middle">
                            Type of Tests
                        </div>
                        <div className="lineseparator">
                            |
                        </div>
                        <div className="pendingrequest-1st-container-header-title">
                            Submission Date
                        </div>
                    </div>
                    {requests.length > 0 ? (
                        requests.map((request, index) => (
                            <button 
                                key={index} 
                                className="my-requests"
                                onClick={() => navigate(`/request-details/${userId}/${request.requestId}`)}
                            >
                                <div className="req-side">{request.representativeName}</div>
                                <p className="req-lineseparator">|</p>
                                <div className="req-middle">{request.emailAddress}</div>
                                <p className="req-lineseparator">|</p>
                                <div className="req-side">{request.submissionDate}</div>
                            </button>
                        ))
                    ) : (
                        <div className="pendingrequest-2nd-container">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className='msg-noreqres1'>
                                There are no pending requests as of the moment.
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForReleasing;

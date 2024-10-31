import React, { useState, useEffect } from 'react';
import './TrackMyRequest.css';
import Userfront from "@userfront/core";
import blue_logo_icon from '../Assets/BlueLogo.png';

Userfront.init("jb7ywq8b");

const TrackMyRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserRequests = async () => {
            try {
                const userId = Userfront.user.userId;
                const response = await fetch(`/requests/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch requests');
                }
                const data = await response.json();
                console.log("Fetched Requests:", data); // Add this line
                setRequests(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchUserRequests();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getSampleDescription = (samples) => {
        if (!samples || samples.length === 0) return 'No samples';
        return samples.map((sample, index) => (
            <div key={index}>
                {sample.sampleType || sample.description || 'Sample ' + (index + 1)}
            </div>
        ));
    };

    return (
        <div className="request-all-container">
            <div className="request-container">
                <div className="request-title">Track My Request</div>
                <div className="request-1st-container">
                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : requests.length === 0 ? (
                        <>
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className="msg-noreqres1">
                                You have no ongoing requests and results.
                            </h1>
                            <h1 className="msg-noreqres2">
                                Request through the "Submit a Request" page.
                            </h1>
                        </>
                    ) : (
                        <div className="requests-table-container">
                            <table className="requests-table">
                                <thead>
                                    <tr>
                                        <th>Control Number</th>
                                        <th>Representative Name</th>
                                        <th>Sample Type/Description</th>
                                        <th>Date Requested</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((request) => (
                                        <tr key={request.requestId}>
                                            <td>{request.controlNumber}</td>
                                            <td>{request.representativeName}</td>
                                            <td>{getSampleDescription(request.sample)}</td>
                                            <td>{formatDate(request.createdAt)}</td>
                                            <td>
                                                <span className={`status-badge ${request.requestStatus.toLowerCase()}`}>
                                                    {request.requestStatus.replace(/_/g, ' ')}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackMyRequest;
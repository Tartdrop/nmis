import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TrackMyRequest.css';

import blue_logo_icon from '../Assets/BlueLogo.png';

const TrackRequest = () => {
    const {userId} = useParams();
    const [requests, setRequests] = useState([]);
    const [testResults, setTestResults] = useState({});
    const [expandedRequest, setExpandedRequest] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from backend on component mount
        fetch(`http://localhost:8080/requests/clientrequest/${userId}`)
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

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Only fetch results for RELEASED requests
                const releasedRequests = requests.filter(req => req.requestStatus === "RELEASED");
                
                // Fetch results for each released request
                const resultsPromises = releasedRequests.map(request => 
                    fetch(`http://localhost:8080/getResult/${request.requestId}`)
                        .then(res => res.json())
                );
                
                const results = await Promise.all(resultsPromises);
                
                // Map results to request IDs
                const mappedResults = {};
                results.forEach(result => {
                    mappedResults[result.requestId] = result;
                });
                setTestResults(mappedResults);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        if (requests.some(req => req.requestStatus === "RELEASED")) {
            fetchResults();
        }
    }, [requests]);

    const formatRequestStatus = (status) => {
        const statusMap = {
            REJECTED: "REJECTED",
            FOR_TESTING: "FOR TESTING",
            FOR_RELEASE: "FOR RELEASE",
            PENDING_REVIEW: "PENDING REVIEW"
        };
        return statusMap[status] || status; // Fallback to the original status if not mapped
    };

    const toggleRequestDetails = (requestId) => {
        setExpandedRequest(expandedRequest === requestId ? null : requestId);
    };

    return (
        <div className="trackmyrequest-all-container">
            <div className='trackmyrequest-container'>
                <div className='trackmyrequest-title'>Track My Requests</div>
                <div className="trackmyrequest-1st-container">
                    <div className="trackmyrequest-1st-container-header">
                        <div className="trackmyrequest-1st-container-header-title">
                            Control Number
                        </div>
                        <div className="lineseperator">
                            |
                        </div>
                        <div className="trackmyrequest-1st-container-header-title">
                            Submission Date
                        </div>
                        <div className="lineseperator">
                            |
                        </div>
                        <div className="trackmyrequest-1st-container-header-title">
                            Status
                        </div>
                    </div>
                    {requests.length > 0 ? (
                        <div className="requests-list">
                            {requests.map((request, index) => {
                                const result = testResults[request.requestId];
                                return (
                                    <div key={index} className="request-container-item">
                                        <button 
                                            className="request-button"
                                            onClick={() => request.requestStatus === "RELEASED" && toggleRequestDetails(request.requestId)}
                                            style={{ cursor: request.requestStatus === "RELEASED" ? 'pointer' : 'default' }}
                                        >
                                            <div className="req-side">{request.controlNumber}</div>
                                            <p className="req-lineseparator">|</p>
                                            <div className="req-side">{request.submissionDate}</div>
                                            <p className="req-lineseparator">|</p>
                                            <div className="req-side">{formatRequestStatus(request.requestStatus)}</div>
                                        </button>

                                        {/* Show test results if request is RELEASED and expanded */}
                                        {request.requestStatus === "RELEASED" && 
                                         expandedRequest === request.requestId && 
                                         result && (
                                            <div className="request-details-dropdown">
                                                <div className="test-results-details">
                                                    {/* Microbio Results */}
                                                    {request.microbio && result.microbioTestResults && result.microbioTestResults.length > 0 && (
                                                        <div className="microbio-results">
                                                            <h3>Microbiology Results</h3>
                                                            {Object.entries(result.microbioTestResults[0])
                                                                .filter(([key, value]) => 
                                                                    !key.includes('Date') && 
                                                                    !key.includes('Id') && 
                                                                    !key.includes('sample') &&
                                                                    value !== null
                                                                )
                                                                .map(([key, value]) => (
                                                                    <div key={key} className="result-item">
                                                                        <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    )}

                                                    {/* Chemical Results */}
                                                    {request.chem && (result.chemElisaTestResults?.length > 0 || result.chemMicrobialTestResults?.length > 0) && (
                                                        <div className="chemical-results">
                                                            <h3>Chemical Test Results</h3>
                                                            {result.chemElisaTestResults?.length > 0 && (
                                                                <div className="elisa-results">
                                                                    <h4>ELISA Tests</h4>
                                                                    {Object.entries(result.chemElisaTestResults[0])
                                                                        .filter(([key, value]) => 
                                                                            !key.includes('Date') && 
                                                                            !key.includes('Id') && 
                                                                            !key.includes('sample') &&
                                                                            value !== null
                                                                        )
                                                                        .map(([key, value]) => (
                                                                            <div key={key} className="result-item">
                                                                                <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
                                                                            </div>
                                                                        ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Molecular Biology Results */}
                                                    {request.molBio && result.molBioTestResults && result.molBioTestResults.length > 0 && (
                                                        <div className="molbio-results">
                                                            <h3>Molecular Biology Results</h3>
                                                            {Object.entries(result.molBioTestResults[0])
                                                                .filter(([key, value]) => 
                                                                    !key.includes('Date') && 
                                                                    !key.includes('Id') && 
                                                                    !key.includes('sample') &&
                                                                    value !== null
                                                                )
                                                                .map(([key, value]) => (
                                                                    <div key={key} className="result-item">
                                                                        <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="pendingrequest-2nd-container">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className='msg-noreqres1'>
                                You have no ongoing requests and results.
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrackRequest;
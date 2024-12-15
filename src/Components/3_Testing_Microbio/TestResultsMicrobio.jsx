import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ForReleaseList.css';
import blue_logo_icon from '../Assets/BlueLogo.png';

const TestingList = () => {
    const { userId } = useParams();
    const [forReleaseRequests, setForReleaseRequests] = useState([]);
    const [releasedRequests, setReleasedRequests] = useState([]);
    const [testResults, setTestResults] = useState({});
    const [expandedRequest, setExpandedRequest] = useState(null);
    const requestListRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch "for release" requests
                const forReleaseResponse = await fetch(`${process.env.REACT_APP_API_URL}requests/for-release`);
                if (!forReleaseResponse.ok) {
                    throw new Error('Failed to fetch for release requests');
                }
                const forReleaseData = await forReleaseResponse.json();
                setForReleaseRequests(forReleaseData);

                // Fetch "released" requests
                const releasedResponse = await fetch(`${process.env.REACT_APP_API_URL}requests/released`);
                if (!releasedResponse.ok) {
                    throw new Error('Failed to fetch released requests');
                }
                const releasedData = await releasedResponse.json();
                setReleasedRequests(releasedData);

                // Fetch test results for all requests (both "for release" and "released")
                const allRequests = [...forReleaseData, ...releasedData];
                const resultsPromises = allRequests.map(request =>
                    fetch(`${process.env.REACT_APP_API_URL}getResult/${request.requestId}`).then(res => res.json())
                );

                const results = await Promise.all(resultsPromises);
                const mappedResults = {};
                results.forEach(result => {
                    mappedResults[result.requestId] = result;
                });
                setTestResults(mappedResults);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const toggleRequestDetails = (requestId) => {
        setExpandedRequest(expandedRequest === requestId ? null : requestId);
    };

    return (
        <div className="forrelease-all-container">
            <div className="forrelease-container">
                <div className="forrelease-title">For Release & Released Requests</div>
                
                {/* For Release Section */}
                <div className="forrelease-1st-container">
                    <h2>For Release</h2>
                    {forReleaseRequests.length > 0 ? (
                        <div className="forrelease-list" ref={requestListRef}>
                            {forReleaseRequests.map((request) => {
                                const result = testResults[request.requestId];
                                return (
                                    <div key={request.requestId} className="release-request-row">
                                        <div 
                                            className={`release-request-summary ${expandedRequest === request.requestId ? 'expanded' : ''}`} 
                                            onClick={() => toggleRequestDetails(request.requestId)}
                                        >
                                            <div className="control-number">{request.controlNumber}</div>
                                            <div className="test-results-summary">
                                                {request.microbio && (
                                                    <div className="microbio-summary">
                                                        Microbiological: {result?.completeMicrobio ? 'Completed' : 'Pending'}
                                                    </div>
                                                )}
                                        
                                            </div>
                                        </div>

                                        {expandedRequest === request.requestId && result && (
                                            <div className="request-details">
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
                                                                .map(([key, value]) => {
                                                                    // Format the key for display
                                                                    const formattedKey = key
                                                                        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                                                                        .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
                                                                    return (
                                                                        <div key={key} className="result-item">
                                                                            <strong>{formattedKey}:</strong>
                                                                            <span className="result-line-1"></span>
                                                                            <span className="result-value">{value}</span>
                                                                        </div>
                                                                    );
                                                                })}
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
                        <div className="empty-3rd-container">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className="msg-noreqres1">No requests for release at the moment.</h1>
                        </div>
                    )}
                </div>

                {/* Released Section */}
                <div className="released-container">
                    <h2>Released</h2>
                    {releasedRequests.length > 0 ? (
                        <div className="released-list">
                            {releasedRequests.map((request) => {
                                const result = testResults[request.requestId];
                                return (
                                    <div key={request.requestId} className="release-request-row">
                                        <div 
                                            className={`release-request-summary ${expandedRequest === request.requestId ? 'expanded' : ''}`} 
                                            onClick={() => toggleRequestDetails(request.requestId)}
                                        >
                                            <div className="control-number">{request.controlNumber}</div>
                                            <div className="test-results-summary">
                                                {request.microbio && (
                                                    <div className="microbio-summary">
                                                        Microbiological: {result?.completeMicrobio ? 'Completed' : 'Pending'}
                                                    </div>
                                                )}
                                         
                                            </div>
                                        </div>

                                        {expandedRequest === request.requestId && result && (
                                            <div className="request-details">
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
                                                                .map(([key, value]) => {
                                                                    // Format the key for display
                                                                    const formattedKey = key
                                                                        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                                                                        .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
                                                                    return (
                                                                        <div key={key} className="result-item">
                                                                            <strong>{formattedKey}:</strong>
                                                                            <span className="result-line-1"></span>
                                                                            <span className="result-value">{value}</span>
                                                                        </div>
                                                                    );
                                                                })}
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
                        <div className="empty-3rd-container">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className="msg-noreqres1">No released requests at the moment.</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestingList;

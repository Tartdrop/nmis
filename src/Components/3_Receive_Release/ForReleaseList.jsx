import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ForReleaseList.css';
import blue_logo_icon from '../Assets/BlueLogo.png';

const ForReleasing = () => {
    const {userId} = useParams();
    const [requests, setRequests] = useState([]);
    const [testResults, setTestResults] = useState({});
    const [expandedRequest, setExpandedRequest] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch requests for release
                const requestsResponse = await fetch('http://localhost:8080/requests/for-release');
                if (!requestsResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const requestsData = await requestsResponse.json();
                setRequests(requestsData);

                // Fetch results for each request
                const resultsPromises = requestsData.map(request => 
                    fetch(`http://localhost:8080/getResult/${request.requestId}`)
                        .then(res => res.json())
                );
                
                const results = await Promise.all(resultsPromises);
                
                // Map results to request IDs
                const mappedResults = {};
                results.forEach(result => {
                    mappedResults[result.requestId] = result;
                });

                console.log('Mapped results:', mappedResults);
                setTestResults(mappedResults);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleRelease = async (requestId) => {
        // Implement release logic
        console.log('Releasing request:', requestId);
    };

    const handleReject = async (requestId) => {
        // Implement reject logic
        console.log('Rejecting request:', requestId);
    };

    const toggleRequestDetails = (requestId) => {
        setExpandedRequest(expandedRequest === requestId ? null : requestId);
    };

    return (
        <div className="pendingrequest-all-container">
            <div className='pendingrequest-container'>
                <div className='pendingrequest-title'>For Releasing</div>
                <div className="pendingrequest-1st-container">
                    {requests.length > 0 ? (
                        requests.map((request) => {
                            const result = testResults[request.requestId];
                            return (
                                <div key={request.requestId} className="release-request-row">
                                    <div className="release-request-summary" onClick={() => toggleRequestDetails(request.requestId)}>
                                        <div className="control-number">
                                            {request.controlNumber}
                                        </div>
                                        <div className="test-results-summary">
                                            {request.microbio && (
                                                <div className="microbio-summary">
                                                    Microbio: {result?.completeMicrobio ? 'Completed' : 'Pending'}
                                                </div>
                                            )}
                                            {request.chem && (
                                                <div className="chem-summary">
                                                    Chem: {(result?.completeChemElisa || result?.completeChemMicrobial) ? 'Completed' : 'Pending'}
                                                </div>
                                            )}
                                            {request.molBio && (
                                                <div className="molbio-summary">
                                                    MolBio: {result?.completeMolBio ? 'Completed' : 'Pending'}
                                                </div>
                                            )}
                                        </div>
                                        <div className="action-buttons">
                                            <button 
                                                className="release-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRelease(request.requestId);
                                                }}
                                            >
                                                Release
                                            </button>
                                            <button 
                                                className="reject-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleReject(request.requestId);
                                                }}
                                            >
                                                Reject
                                            </button>
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
                                                                        <strong>{formattedKey}:</strong> {value}
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                )}
                                                
                                                {/* Chemical Results */}
                                                {request.chem && (
                                                    <div className="chemical-results">
                                                        <h3>Chemical Test Results</h3>
                                                        {/* ELISA Results */}
                                                        {result.chemElisaTestResults && result.chemElisaTestResults.length > 0 && (
                                                            <div className="elisa-results">
                                                                <h4>ELISA Tests</h4>
                                                                {Object.entries(result.chemElisaTestResults[0])
                                                                    .filter(([key, value]) => 
                                                                        !key.includes('Date') && 
                                                                        !key.includes('Id') && 
                                                                        !key.includes('sample') &&
                                                                        value !== null
                                                                    )
                                                                    .map(([key, value]) => {
                                                                        const formattedKey = key
                                                                            .replace(/([A-Z])/g, ' $1')
                                                                            .replace(/^./, str => str.toUpperCase());
                                                                        return (
                                                                            <div key={key} className="result-item">
                                                                                <strong>{formattedKey}:</strong> {value}
                                                                            </div>
                                                                        );
                                                                    })}
                                                            </div>
                                                        )}
                                                        {/* Microbial Results */}
                                                        {result.chemMicrobialTestResults && result.chemMicrobialTestResults.length > 0 && (
                                                            <div className="microbial-results">
                                                                <h4>Microbial Tests</h4>
                                                                {Object.entries(result.chemMicrobialTestResults[0])
                                                                    .filter(([key, value]) => 
                                                                        !key.includes('Date') && 
                                                                        !key.includes('Id') && 
                                                                        !key.includes('sample') &&
                                                                        value !== null
                                                                    )
                                                                    .map(([key, value]) => {
                                                                        const formattedKey = key
                                                                            .replace(/([A-Z])/g, ' $1')
                                                                            .replace(/^./, str => str.toUpperCase());
                                                                        return (
                                                                            <div key={key} className="result-item">
                                                                                <strong>{formattedKey}:</strong> {value}
                                                                            </div>
                                                                        );
                                                                    })}
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
                                                            .map(([key, value]) => {
                                                                const formattedKey = key
                                                                    .replace(/([A-Z])/g, ' $1')
                                                                    .replace(/^./, str => str.toUpperCase());
                                                                return (
                                                                    <div key={key} className="result-item">
                                                                        <strong>{formattedKey}:</strong> {value}
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
                        })
                    ) : (
                        <div className="pendingrequest-2nd-container">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className='msg-noreqres1'>
                                There are no requests for release at the moment.
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForReleasing;

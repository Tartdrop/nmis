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

                // Fetch all test results
                const [microbioRes, chemElisaRes, chemMicrobialRes, molBioRes] = await Promise.all([
                    fetch('http://localhost:8080/microbioTestResults'),
                    fetch('http://localhost:8080/chemElisaTestResults'),
                    fetch('http://localhost:8080/chemMicrobialTestResults'),
                    fetch('http://localhost:8080/molBioTestResults')
                ]);

                const [microbioData, chemElisaData, chemMicrobialData, molBioData] = await Promise.all([
                    microbioRes.json(),
                    chemElisaRes.json(),
                    chemMicrobialRes.json(),
                    molBioRes.json()
                ]);

                // Map results to requests
                const mappedResults = {};
                
                // Map all test results similar to ForTestingChem.jsx
                [
                    { data: microbioData, type: 'microbio' },
                    { data: chemElisaData, type: 'chemElisa' },
                    { data: chemMicrobialData, type: 'chemMicrobial' },
                    { data: molBioData, type: 'molBio' }
                ].forEach(({ data, type }) => {
                    data.forEach(result => {
                        if (!mappedResults[result.result.requestId]) {
                            mappedResults[result.result.requestId] = {};
                        }
                        mappedResults[result.result.requestId][type] = result;
                    });
                });

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
                        requests.map((request) => (
                            <div key={request.requestId} className="release-request-row">
                                <div className="release-request-summary" onClick={() => toggleRequestDetails(request.requestId)}>
                                    <div className="control-number">
                                        {request.controlNumber}
                                    </div>
                                    <div className="test-results-summary">
                                        {request.microbio && (
                                            <div className="microbio-summary">
                                                Microbio: {testResults[request.requestId]?.microbio ? 'Completed' : 'Pending'}
                                            </div>
                                        )}
                                        {request.chem && (
                                            <div className="chem-summary">
                                                Chem: {(testResults[request.requestId]?.chemElisa || testResults[request.requestId]?.chemMicrobial) ? 'Completed' : 'Pending'}
                                            </div>
                                        )}
                                        {request.molBio && (
                                            <div className="molbio-summary">
                                                MolBio: {testResults[request.requestId]?.molBio ? 'Completed' : 'Pending'}
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

                                {expandedRequest === request.requestId && (
                                    <div className="request-details">
                                        {/* Test Results Details */}
                                        <div className="test-results-details">
                                            {/* Microbio Results */}
                                            {request.microbio && testResults[request.requestId]?.microbio && (
                                                <div className="microbio-results">
                                                    <h3>Microbiology Results</h3>
                                                    {/* Display microbio test results */}
                                                </div>
                                            )}
                                            
                                            {/* Chemical Results */}
                                            {request.chem && (
                                                <div className="chemical-results">
                                                    <h3>Chemical Test Results</h3>
                                                    {/* Display chemical test results */}
                                                </div>
                                            )}
                                            
                                            {/* Molecular Biology Results */}
                                            {request.molBio && testResults[request.requestId]?.molBio && (
                                                <div className="molbio-results">
                                                    <h3>Molecular Biology Results</h3>
                                                    {/* Display molecular biology test results */}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
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

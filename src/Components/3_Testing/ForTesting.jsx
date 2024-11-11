import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ForTesting.css';
import blue_logo_icon from '../Assets/BlueLogo.png';


const TestingList = () => {
    const { userId, requestId } = useParams();
    const [requests, setRequests] = useState([]);
    const [expandedSample, setExpandedSample] = useState(null);
    const [selectedRequests, setSelectedRequests] = useState([]); // {{ edit_1 }}
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from backend on component mount
        fetch('http://localhost:8080/requests/for-testing')
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
                console.error('Error fetching testing requests:', error);
            });
    }, []);

    const toggleSelectRequest = (controlNumber) => { // {{ edit_2 }}
        setSelectedRequests(prevSelected => 
            prevSelected.includes(controlNumber) 
                ? prevSelected.filter(num => num !== controlNumber) 
                : [...prevSelected, controlNumber]
        );
    };

    const toggleSample = (controlNumber) => { // {{ edit_9 }}
        setExpandedSample(prevExpanded => 
            prevExpanded === controlNumber ? null : controlNumber
        );
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/requests/reject/${requestId}`, {
                method: 'PUT'
            });
    
            if (response.ok) {
                // Handle successful rejection, e.g., show a success message, navigate to a different page
                alert('Request deleted successfully!');
            } else {
                // Handle error, e.g., show an error message
                console.error('Failed to reject request');
                alert('Error rejecting request. Please try again.');
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
            alert('Error rejecting request. Please try again.');
        }
    };

    const handleFinishTesting = async () => { // {{ edit_4 }}
        try {
            const response = await fetch(`http://localhost:8080/requests/approve/${requestId}`, {
                method: 'PUT'
            });
    
            if (response.ok) {
                // Handle successful approval, e.g., show a success message, navigate to a different page
                alert('Request approved successfully!');
            } else {
                // Handle error, e.g., show an error message
                console.error('Failed to approve request');
                alert('Error approving request. Please try again.');
            }
        } catch (error) {
            console.error('Error approving request:', error);
            alert('Error approving request. Please try again.');
        }
    };

    return (
        <div className="request-all-container">
            <div className='request-container'>
                <div className='request-title'>For Testing</div>
                
                {/* Header for the table */}
                <div className="request-1st-container-header">
                    <div className="header-item">...</div> {/* {{ edit_5 }} */}
                    <div className="header-item">Control Number</div>
                    <div className="header-item">Microbio</div>
                    <div className="header-item">Chemical</div>
                    <div className="header-item">Mol. Bio</div>
                    <div className="header-item">Sample Info </div>
                </div>

                <div className="request-1st-container">
                    {requests.length > 0 ? (
                        requests.map((request, index) => (
                            <div key={index} className="request-item">
                                <div className="request-header">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedRequests.includes(request.controlNumber)} // {{ edit_6 }}
                                        onChange={() => toggleSelectRequest(request.controlNumber)} 
                                    />
                                    <span>{request.controlNumber}</span>
                                    {request.microbial && (
                                        <button className="test-btn" onClick={() => navigate(`/test-details/microbial/${request.controlNumber}`)}>
                                            Microbio
                                        </button>
                                    )}
                                    {request.chem && (
                                        <button className="test-btn" onClick={() => navigate(`/test-details/chem/${request.controlNumber}`)}>
                                            Chemical
                                        </button>
                                    )}
                                    {request.molBio && (
                                        <button className="test-btn" onClick={() => navigate(`/test-details/molbio/${request.controlNumber}`)}>
                                            Mol Bio
                                        </button>
                                    )}
                                    <button className="test-btn" onClick={() => toggleSample(request.controlNumber)}>
                                        Sample Info
                                    </button>
                                </div>

                                {expandedSample === request.controlNumber && (
                                    <div className="sample-list">
                                        {request.sample.map(sample => (
                                            <div key={sample.sampleId} className="sample-item">
                                                <div><strong>Sample Description:</strong> {sample.sampleDescription}</div>
                                                <div><strong>Lot Batch No:</strong> {sample.lotBatchNo}</div>
                                                <div><strong>Sample Source:</strong> {sample.sampleSource}</div>
                                                <div><strong>Production Date:</strong> {sample.productionDate}</div>
                                                <div><strong>Expiry Date:</strong> {sample.expiryDate}</div>
                                                <div><strong>Sampling Date:</strong> {sample.samplingDate}</div>
                                                <div><strong>Sampler Name:</strong> {sample.samplerName}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-requests-container">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className='msg-noreqres1'>All work is done! Great job!</h1>
                        </div>
                    )}
                </div>

                <div>
                    <button onClick={handleDelete}>Delete</button> {/* {{ edit_7 }} */}
                    <button onClick={handleFinishTesting}>Finish Testing</button> {/* {{ edit_8 }} */}
                </div>
            </div>
        </div>
    );
}

export default TestingList;
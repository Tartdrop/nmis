import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ForTesting.css';
import blue_logo_icon from '../Assets/BlueLogo.png';

const TestingList = () => {
    const { userId, requestId } = useParams();
    const [requests, setRequests] = useState([]);
    const [expandedSample, setExpandedSample] = useState(null);
    const [expandedMicrobial, setExpandedMicrobial] = useState(null);
    const [expandedChem, setExpandedChem] = useState(null);
    const [expandedMolBio, setExpandedMolBio] = useState(null);
    const [selectedRequests, setSelectedRequests] = useState([]);
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');

    useEffect(() => {
        // Get user type from your auth system
        const userType = localStorage.getItem('userType'); // or however you store user data
        setUserType(userType);
        
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

    const toggleSelectRequest = (controlNumber) => {
        setSelectedRequests(prevSelected => 
            prevSelected.includes(controlNumber) 
                ? prevSelected.filter(num => num !== controlNumber) 
                : [...prevSelected, controlNumber]
        );
    };

    const toggleSample = (controlNumber) => {
        setExpandedSample(prevExpanded => 
            prevExpanded === controlNumber ? null : controlNumber
        );
    };

    const toggleMicrobial = (controlNumber) => {
        setExpandedMicrobial(prevExpanded => 
            prevExpanded === controlNumber ? null : controlNumber
        );
    };

    const toggleChem = (controlNumber) => {
        setExpandedChem(prevExpanded => 
            prevExpanded === controlNumber ? null : controlNumber
        );
    };

    const toggleMolBio = (controlNumber) => {
        setExpandedMolBio(prevExpanded => 
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

    const handleFinishTesting = async () => {
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

    // Helper functions to check permissions
    const canAccessMolBio = (userType) => {
        return ['TESTER', 'MOLBIOTESTER'].includes(userType.toUpperCase());
    };

    const canAccessChem = (userType) => {
        return ['TESTER', 'CHEMTESTER'].includes(userType.toUpperCase());
    };

    const canAccessMicrobio = (userType) => {
        return ['TESTER', 'MICROBIOTESTER'].includes(userType.toUpperCase());
    };

    return (
        <div className="request-all-container">
            <div className='request-container'>
                <div className='request-title'>For Testing</div>
                
                {/* Header for the table */}
                <div className="request-1st-container-header">
                    <div className="header-item">Select</div>
                    <div className="header-item">Control Number</div>
                    <div className="header-item">Microbio</div>
                    <div className="header-item">Chemical</div>
                    <div className="header-item">Mol. Bio</div>
                    <div className="header-item">Sample Info</div>
                </div>

                <div className="request-1st-container">
                    {requests.length > 0 ? (
                        requests.map((request, index) => (
                            <div key={index} className="request-item">
                                <div className="request-header">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedRequests.includes(request.controlNumber)}
                                        onChange={() => toggleSelectRequest(request.controlNumber)} 
                                    />
                                    <span>{request.controlNumber}</span>
                                    <span>
                                        {request.microbio ? (
                                            canAccessMicrobio(userType) ? (
                                                <button 
                                                    className="test-btn" 
                                                    onClick={() => toggleMicrobial(request.controlNumber)}
                                                >
                                                    Microbio
                                                </button>
                                            ) : (
                                                <button 
                                                    className="test-btn-disabled" 
                                                    disabled
                                                    title="You don't have permission to access this section"
                                                >
                                                    Microbio
                                                </button>
                                            )
                                        ) : (
                                            "no testing...."
                                        )}
                                        {expandedMicrobial === request.controlNumber && (
                                            <div className="microbial-list">
                                                {request.standardPlateCount && (
                                                    <div><strong>Standard/Aerobic Plate Count:</strong> Yes</div>
                                                )}
                                                {request.coliformCount && (
                                                    <div><strong>Coliform count:</strong> Yes</div>
                                                )}
                                                {request.salmonellaSp && (
                                                    <div><strong>Salmonella sp.:</strong> Yes</div>
                                                )}
                                                {request.staphylococcusAureus && (
                                                    <div><strong>Staphylococcus aureus:</strong> Yes</div>
                                                )}
                                                {request.eColi && (
                                                    <div><strong>E.Coli:</strong> Yes</div>
                                                )}
                                                {request.eColiAndeColi0O157 && (
                                                    <div><strong>E. coli and E.Coli 0157:H7:</strong> Yes</div>
                                                )}
                                                {request.campylobacter && (
                                                    <div><strong>Campylobacter:</strong> Yes</div>
                                                )}
                                                {request.yeastAndMolds && (
                                                    <div><strong>Yeast and Molds:</strong> Yes</div>
                                                )}
                                                {request.cultureAndSensitivityTest && (
                                                    <div><strong>Culture and Sensitivity Test:</strong> Yes</div>
                                                )}
                                            </div>
                                        )}
                                    </span>
                                    <span>
                                        {request.chem ? (
                                            canAccessChem(userType) ? (
                                                <button 
                                                    className="test-btn" 
                                                    onClick={() => toggleChem(request.controlNumber)}
                                                >
                                                    Chemical
                                                </button>
                                            ) : (
                                                <button 
                                                    className="test-btn-disabled" 
                                                    disabled
                                                    title="You don't have permission to access this section"
                                                >
                                                    Chemical
                                                </button>
                                            )
                                        ) : (
                                            "no testing...."
                                        )}
                                        {expandedChem === request.controlNumber && (
                                            <div className="chemical-list">
                                                {request.microbial && (
                                                    <div><strong>Microbial Inhibition Test:</strong> Yes</div>
                                                )}
                                                {request.elisa && (
                                                    <div className="elisa-section">
                                                        <div><strong>ELISA Tests:</strong></div>
                                                        <div className="elisa-tests">
                                                            {request.betaLactams && (
                                                                <div>• Beta Lactams</div>
                                                            )}
                                                            {request.tetracyclines && (
                                                                <div>• Tetracyclines</div>
                                                            )}
                                                            {request.sulfonamides && (
                                                                <div>• Sulfonamides</div>
                                                            )}
                                                            {request.aminoglycosides && (
                                                                <div>• Aminoglycosides</div>
                                                            )}
                                                            {request.macrolides && (
                                                                <div>• Macrolides</div>
                                                            )}
                                                            {request.quinolones && (
                                                                <div>• Quinolones</div>
                                                            )}
                                                            {request.chloramphenicol && (
                                                                <div>• Chloramphenicol</div>
                                                            )}
                                                            {request.nitrofuranAoz && (
                                                                <div>• Nitrofuran AOZ</div>
                                                            )}
                                                            {request.beta_agonists && (
                                                                <div>• Beta Agonists</div>
                                                            )}
                                                            {request.corticosteroids && (
                                                                <div>• Corticosteroids</div>
                                                            )}
                                                            {request.olaquindox && (
                                                                <div>• Olaquindox</div>
                                                            )}
                                                            {request.nitrufuranAmoz && (
                                                                <div>• Nitrufuran AMOZ</div>
                                                            )}
                                                            {request.stilbenes && (
                                                                <div>• Stilbenes</div>
                                                            )}
                                                            {request.ractopamine && (
                                                                <div>• Ractopamine</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                {!request.microbial && !request.elisa && (
                                                    <div>No chemical tests selected</div>
                                                )}
                                            </div>
                                        )}
                                    </span>
                                    <span>
                                        {request.molBio ? (
                                            canAccessMolBio(userType) ? (
                                                <button 
                                                    className="test-btn" 
                                                    onClick={() => toggleMolBio(request.controlNumber)}
                                                >
                                                    Mol Bio
                                                </button>
                                            ) : (
                                                <button 
                                                    className="test-btn-disabled" 
                                                    disabled
                                                    title="You don't have permission to access this section"
                                                >
                                                    Mol Bio
                                                </button>
                                            )
                                        ) : (
                                            "no testing...."
                                        )}
                                        {expandedMolBio === request.controlNumber && (
                                            <div className="molbio-list">
                                                {request.dog && (
                                                    <div><strong>Dog:</strong> Yes</div>
                                                )}
                                                {request.cat && (
                                                    <div><strong>Cat:</strong> Yes</div>
                                                )}
                                                {request.chicken && (
                                                    <div><strong>Chicken:</strong> Yes</div>
                                                )}
                                                {request.buffalo && (
                                                    <div><strong>Buffalo:</strong> Yes</div>
                                                )}
                                                {request.cattle && (
                                                    <div><strong>Cattle:</strong> Yes</div>
                                                )}
                                                {request.horse && (
                                                    <div><strong>Horse:</strong> Yes</div>
                                                )}
                                                {request.goat && (
                                                    <div><strong>Goat:</strong> Yes</div>
                                                )}
                                                {request.sheep && (
                                                    <div><strong>Sheep:</strong> Yes</div>
                                                )}
                                                {request.swine && (
                                                    <div><strong>Swine:</strong> Yes</div>
                                                )}
                                            </div>
                                        )}
                                    </span>
                                    <button className="test-btn" onClick={() => toggleSample(request.controlNumber)}>
                                        Sample Info
                                    </button>
                                </div>

                                {expandedSample === request.controlNumber && (
                                    <div className="sample-list">
                                        {request.sample.map(sample => (
                                            <div key={sample.sampleId} className="sample-item">
                                                <div><strong>Sample Description:</strong> {sample.sampleTypeDescription}</div>
                                            </div>
                                        ))}

                                        {/* Assuming these fields are common for all samples */}
                                        <div><strong>Lot Batch No:</strong> {request.lotBatchNo}</div>
                                        <div><strong>Sampler Name:</strong> {request.samplerName}</div>
                                        <div><strong>Sample Source:</strong> {request.sampleSource}</div>
                                        <div><strong>Production Date:</strong> {request.productionDate}</div>
                                        <div><strong>Expiry Date:</strong> {request.expiryDate}</div>
                                        <div><strong>Sampling Date:</strong> {request.samplingDate}</div>
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
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleFinishTesting}>Finish Testing</button>
                </div>
            </div>
        </div>
    );
}

export default TestingList;
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
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    const [testResults, setTestResults] = useState({});
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        // Get user type from your auth system
        const userType = localStorage.getItem('userType');
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
                console.log('Fetched requests:', data); // Debug log
                setRequests(data);
            })
            .catch(error => {
                console.error('Error fetching testing requests:', error);
            });
    }, []);

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

    const handleTestResultChange = (requestId, testType, value) => {
        setTestResults(prev => ({
            ...prev,
            [requestId]: {
                ...prev[requestId],
                [testType]: value
            }
        }));
    };

    const handleSaveChanges = async (request) => {
        try {
            setSaveStatus('Saving...');
            
            // Check if sample exists and has a sampleId
            if (!request.sample || !request.sample.length) {
                throw new Error('No sample ID found for this request');
            }
            
            const sampleId = request.sample[0].sampleId;
            console.log('Saving for sampleId:', sampleId); // Debug log

            // Save Microbio results if they exist
            if (request.microbio && testResults[request.requestId]) {
                const microbioData = {
                    standardPlateCount: testResults[request.requestId].standardPlateCount,
                    staphylococcusAureus: testResults[request.requestId].staphylococcusAureus,
                    salmonellaSp: testResults[request.requestId].salmonellaSp,
                    campylobacter: testResults[request.requestId].campylobacter,
                    cultureAndSensitivityTest: testResults[request.requestId].cultureAndSensitivityTest,
                    coliformCount: testResults[request.requestId].coliformCount,
                    eColi: testResults[request.requestId].eColi,
                    eColiAndeColi0O157: testResults[request.requestId].eColiAndeColi0O157,
                    yeastAndMolds: testResults[request.requestId].yeastAndMolds
                };

                await fetch(`http://localhost:8080/microbioTestResults/${sampleId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(microbioData)
                });
            }

            // Save Chemical Microbial results if they exist
            if (request.microbial && testResults[request.requestId]) {
                const chemMicrobialData = {
                    betaLactams: testResults[request.requestId].betaLactams,
                    tetracyclines: testResults[request.requestId].tetracyclines,
                    sulfonamides: testResults[request.requestId].sulfonamides,
                    aminoglycosides: testResults[request.requestId].aminoglycosides,
                    macrolides: testResults[request.requestId].macrolides,
                    quinolones: testResults[request.requestId].quinolones
                };

                await fetch(`http://localhost:8080/chemMicrobialTestResults/${sampleId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(chemMicrobialData)
                });
            }

            // Save Chemical ELISA results if they exist
            if (request.elisa && testResults[request.requestId]) {
                const chemElisaData = {
                    chloramphenicol: testResults[request.requestId].chloramphenicol,
                    nitrofuranAoz: testResults[request.requestId].nitrofuranAoz,
                    beta_agonists: testResults[request.requestId].beta_agonists,
                    corticosteroids: testResults[request.requestId].corticosteroids,
                    olaquindox: testResults[request.requestId].olaquindox,
                    nitrufuranAmoz: testResults[request.requestId].nitrufuranAmoz,
                    stilbenes: testResults[request.requestId].stilbenes,
                    ractopamine: testResults[request.requestId].ractopamine
                };

                await fetch(`http://localhost:8080/chemTestElisaResults/${sampleId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(chemElisaData)
                });
            }

            // Save Molecular Biology results if they exist
            if (request.molBio && testResults[request.requestId]) {
                const molBioData = {
                    dog: testResults[request.requestId].dog,
                    cat: testResults[request.requestId].cat,
                    chicken: testResults[request.requestId].chicken,
                    buffalo: testResults[request.requestId].buffalo,
                    cattle: testResults[request.requestId].cattle,
                    horse: testResults[request.requestId].horse,
                    goat: testResults[request.requestId].goat,
                    sheep: testResults[request.requestId].sheep,
                    swine: testResults[request.requestId].swine
                };

                await fetch(`http://localhost:8080/molBioTestResults/${sampleId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(molBioData)
                });
            }

            setSaveStatus('Changes saved successfully!');
            setTimeout(() => setSaveStatus(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error saving changes:', error);
            setSaveStatus('Error saving changes: ' + error.message);
            setTimeout(() => setSaveStatus(''), 3000);
        }
    };

    return (
        <div className="request-all-container">
            <div className='request-container'>
                <div className='request-title'>For Testing</div>
                
                {/* Header for the table */}
                <div className="request-1st-container-header">
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
                                                    <div className="test-result-item">
                                                        <strong>Standard/Aerobic Plate Count:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.standardPlateCount || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'standardPlateCount', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.coliformCount && (
                                                    <div className="test-result-item">
                                                        <strong>Coliform count:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.coliformCount || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'coliformCount', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.salmonellaSp && (
                                                    <div className="test-result-item">
                                                        <strong>Salmonella sp.:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.salmonellaSp || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'salmonellaSp', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.staphylococcusAureus && (
                                                    <div className="test-result-item">
                                                        <strong>Staphylococcus aureus:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.staphylococcusAureus || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'staphylococcusAureus', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.eColi && (
                                                    <div className="test-result-item">
                                                        <strong>E.Coli:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.eColi || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'eColi', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.eColiAndeColi0O157 && (
                                                    <div className="test-result-item">
                                                        <strong>E. coli and E.Coli 0157:H7:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.eColiAndeColi0O157 || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'eColiAndeColi0O157', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.campylobacter && (
                                                    <div className="test-result-item">
                                                        <strong>Campylobacter:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.campylobacter || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'campylobacter', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.yeastAndMolds && (
                                                    <div className="test-result-item">
                                                        <strong>Yeast and Molds:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.yeastAndMolds || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'yeastAndMolds', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.cultureAndSensitivityTest && (
                                                    <div className="test-result-item">
                                                        <strong>Culture and Sensitivity Test:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.cultureAndSensitivityTest || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'cultureAndSensitivityTest', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
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
                                                    <div className="microbial-inhibition-section">
                                                        <div><strong>Microbial Inhibition Test:</strong></div>
                                                        <div className="microbial-inhibition-tests">
                                                            {request.betaLactams && (
                                                                <div className="test-result-item">
                                                                    <strong>Beta Lactams:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.betaLactams || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'betaLactams', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                            {request.tetracyclines && (
                                                                <div className="test-result-item">
                                                                    <strong>Tetracyclines:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.tetracyclines || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'tetracyclines', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                            {request.sulfonamides && (
                                                                <div className="test-result-item">
                                                                    <strong>Sulfonamides:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.sulfonamides || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'sulfonamides', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                            {request.aminoglycosides && (
                                                                <div className="test-result-item">
                                                                    <strong>Aminoglycosides:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.aminoglycosides || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'aminoglycosides', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                            {request.macrolides && (
                                                                <div className="test-result-item">
                                                                    <strong>Macrolides:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.macrolides || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'macrolides', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                            {request.quinolones && (
                                                                <div className="test-result-item">
                                                                    <strong>Quinolones:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.quinolones || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'quinolones', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                {request.elisa && (
                                                    <div className="elisa-section">
                                                        <div><strong>ELISA Tests:</strong></div>
                                                        <div className="elisa-tests">
                                                            {request.chloramphenicol && (
                                                                <div className="test-result-item">
                                                                    <strong>Chloramphenicol:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.chloramphenicol || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'chloramphenicol', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                            {request.nitrofuranAoz && (
                                                                <div className="test-result-item">
                                                                    <strong>Nitrofuran AOZ:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.nitrofuranAoz || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'nitrofuranAoz', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                            {request.beta_agonists && (
                                                                <div className="test-result-item">
                                                                    <strong>Beta Agonists:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.beta_agonists || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'beta_agonists', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                            {request.corticosteroids && (
                                                                <div className="test-result-item">
                                                                    <strong>Corticosteroids:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.corticosteroids || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'corticosteroids', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                            {request.olaquindox && (
                                                                <div className="test-result-item">
                                                                    <strong>Olaquindox:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.olaquindox || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'olaquindox', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                            {request.nitrufuranAmoz && (
                                                                <div className="test-result-item">
                                                                    <strong>Nitrufuran AMOZ:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.nitrufuranAmoz || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'nitrufuranAmoz', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                            {request.stilbenes && (
                                                                <div className="test-result-item">
                                                                    <strong>Stilbenes:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.stilbenes || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'stilbenes', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
                                                            )}
                                                            {request.ractopamine && (
                                                                <div className="test-result-item">
                                                                    <strong>Ractopamine:</strong>
                                                                    <input
                                                                        type="text"
                                                                        value={testResults[request.requestId]?.ractopamine || ''}
                                                                        onChange={(e) => handleTestResultChange(request.requestId, 'ractopamine', e.target.value)}
                                                                        className="test-result-input"
                                                                    />
                                                                </div>
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
                                                    <div className="test-result-item">
                                                        <strong>Dog:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.dog || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'dog', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.cat && (
                                                    <div className="test-result-item">
                                                        <strong>Cat:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.cat || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'cat', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.chicken && (
                                                    <div className="test-result-item">
                                                        <strong>Chicken:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.chicken || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'chicken', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.buffalo && (
                                                    <div className="test-result-item">
                                                        <strong>Buffalo:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.buffalo || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'buffalo', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.cattle && (
                                                    <div className="test-result-item">
                                                        <strong>Cattle:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.cattle || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'cattle', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.horse && (
                                                    <div className="test-result-item">
                                                        <strong>Horse:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.horse || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'horse', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.goat && (
                                                    <div className="test-result-item">
                                                        <strong>Goat:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.goat || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'goat', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.sheep && (
                                                    <div className="test-result-item">
                                                        <strong>Sheep:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.sheep || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'sheep', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
                                                )}
                                                {request.swine && (
                                                    <div className="test-result-item">
                                                        <strong>Swine:</strong>
                                                        <input
                                                            type="text"
                                                            value={testResults[request.requestId]?.swine || ''}
                                                            onChange={(e) => handleTestResultChange(request.requestId, 'swine', e.target.value)}
                                                            className="test-result-input"
                                                        />
                                                    </div>
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
                                <div className="save-changes-section">
                                    <button 
                                        className="save-changes-btn"
                                        onClick={() => handleSaveChanges(request)}
                                    >
                                        Save Changes
                                    </button>
                                    {saveStatus && <div className="save-status">{saveStatus}</div>}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-requests-container">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className='msg-noreqres1'>All work is done! Great job!</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TestingList;
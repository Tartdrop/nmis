import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ForTestingChem.css';
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
    const [analysisDateUpdates, setAnalysisDateUpdates] = useState({});

    useEffect(() => {
        const userType = localStorage.getItem('userType');
        setUserType(userType);
        
        const fetchData = async () => {
            try {
                const requestsResponse = await fetch('http://localhost:8080/requests/for-testing');
                if (!requestsResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const requestsData = await requestsResponse.json();
                setRequests(requestsData);

                // Fetch test results
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

                // Map microbio results
                microbioData.forEach(result => {
                    mappedResults[result.result.requestId] = {
                        ...mappedResults[result.result.requestId],
                        eColi: result.eColi,
                        eColiAndeColi0O157: result.eColiAndeColi0O157,
                        standardPlateCount: result.standardPlateCount,
                        staphylococcusAureus: result.staphylococcusAureus,
                        salmonellaSp: result.salmonellaSp,
                        campylobacter: result.campylobacter,
                        cultureAndSensitivityTest: result.cultureAndSensitivityTest,
                        coliformCount: result.coliformCount,
                        yeastAndMolds: result.yeastAndMolds
                    };
                });

                // Map chem ELISA results
                chemElisaData.forEach(result => {
                    mappedResults[result.result.requestId] = {
                        ...mappedResults[result.result.requestId],
                        chloramphenicol: result.chloramphenicol,
                        nitrofuranAoz: result.nitrofuranAoz,
                        beta_agonists: result.beta_agonists,
                        corticosteroids: result.corticosteroids,
                        olaquindox: result.olaquindox,
                        nitrufuranAmoz: result.nitrufuranAmoz,
                        stilbenes: result.stilbenes,
                        ractopamine: result.ractopamine
                    };
                });

                // Map chem microbial results
                chemMicrobialData.forEach(result => {
                    mappedResults[result.result.requestId] = {
                        ...mappedResults[result.result.requestId],
                        betaLactams: result.betaLactams,
                        tetracyclines: result.tetracyclines,
                        sulfonamides: result.sulfonamides,
                        aminoglycosides: result.aminoglycosides,
                        macrolides: result.macrolides,
                        quinolones: result.quinolones
                    };
                });

                // Map mol bio results
                molBioData.forEach(result => {
                    mappedResults[result.result.requestId] = {
                        ...mappedResults[result.result.requestId],
                        dog: result.dog,
                        cat: result.cat,
                        chicken: result.chicken,
                        buffalo: result.buffalo,
                        cattle: result.cattle,
                        horse: result.horse,
                        goat: result.goat,
                        sheep: result.sheep,
                        swine: result.swine
                    };
                });

                console.log('Mapped test results:', mappedResults);
                setTestResults(mappedResults);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const toggleSample = (controlNumber) => {
        setExpandedSample(prevExpanded => 
            prevExpanded === controlNumber ? null : controlNumber
        );
    };

    const toggleChem = (controlNumber) => {
        setExpandedChem(prevExpanded => 
            prevExpanded === controlNumber ? null : controlNumber
        );
    };



    const canAccessChem = (userType) => {
        return ['TESTER', 'CHEMTESTER'].includes(userType.toUpperCase());
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

    const handleAnalysisDateChange = (requestId, testType, date) => {
        setAnalysisDateUpdates(prev => ({
            ...prev,
            [`${requestId}_${testType}_analysis_date`]: date
        }));
    };

    const handleSaveChanges = async (request) => {
        try {
            const sampleId = request.sample[0]?.sampleId;
            if (!sampleId) {
                throw new Error('Sample ID not found');
            }

            const currentResults = testResults[request.requestId] || {};

            // Chemical ELISA tests
            const elisaData = {};
            if (currentResults.chloramphenicol) {
                elisaData.chloramphenicol = currentResults.chloramphenicol;
                elisaData.chloramphenicolAnalysisDate = analysisDateUpdates[`${request.requestId}_chloramphenicol_analysis_date`] || null;
            }
            if (currentResults.nitrofuranAoz) {
                elisaData.nitrofuranAoz = currentResults.nitrofuranAoz;
                elisaData.nitrofuranAozAnalysisDate = analysisDateUpdates[`${request.requestId}_nitrofuranAoz_analysis_date`] || null;
            }
            if (currentResults.beta_agonists) {
                elisaData.beta_agonists = currentResults.beta_agonists;
                elisaData.beta_agonistsAnalysisDate = analysisDateUpdates[`${request.requestId}_beta_agonists_analysis_date`] || null;
            }
            if (currentResults.corticosteroids) {
                elisaData.corticosteroids = currentResults.corticosteroids;
                elisaData.corticosteroidsAnalysisDate = analysisDateUpdates[`${request.requestId}_corticosteroids_analysis_date`] || null;
            }
            if (currentResults.olaquindox) {
                elisaData.olaquindox = currentResults.olaquindox;
                elisaData.olaquindoxAnalysisDate = analysisDateUpdates[`${request.requestId}_olaquindox_analysis_date`] || null;
            }
            if (currentResults.nitrufuranAmoz) {
                elisaData.nitrufuranAmoz = currentResults.nitrufuranAmoz;
                elisaData.nitrufuranAmozAnalysisDate = analysisDateUpdates[`${request.requestId}_nitrufuranAmoz_analysis_date`] || null;
            }
            if (currentResults.stilbenes) {
                elisaData.stilbenes = currentResults.stilbenes;
                elisaData.stilbenesAnalysisDate = analysisDateUpdates[`${request.requestId}_stilbenes_analysis_date`] || null;
            }
            if (currentResults.ractopamine) {
                elisaData.ractopamine = currentResults.ractopamine;
                elisaData.ractopamineAnalysisDate = analysisDateUpdates[`${request.requestId}_ractopamine_analysis_date`] || null;
            }

            // Chemical Microbial tests
            const chemMicrobialData = {};
            if (currentResults.betaLactams) {
                chemMicrobialData.betaLactams = currentResults.betaLactams;
                chemMicrobialData.betaLactamsAnalysisDate = analysisDateUpdates[`${request.requestId}_betaLactams_analysis_date`] || null;
            }
            if (currentResults.tetracyclines) {
                chemMicrobialData.tetracyclines = currentResults.tetracyclines;
                chemMicrobialData.tetracyclinesAnalysisDate = analysisDateUpdates[`${request.requestId}_tetracyclines_analysis_date`] || null;
            }
            if (currentResults.sulfonamides) {
                chemMicrobialData.sulfonamides = currentResults.sulfonamides;
                chemMicrobialData.sulfonamidesAnalysisDate = analysisDateUpdates[`${request.requestId}_sulfonamides_analysis_date`] || null;
            }
            if (currentResults.aminoglycosides) {
                chemMicrobialData.aminoglycosides = currentResults.aminoglycosides;
                chemMicrobialData.aminoglycosidesAnalysisDate = analysisDateUpdates[`${request.requestId}_aminoglycosides_analysis_date`] || null;
            }
            if (currentResults.macrolides) {
                chemMicrobialData.macrolides = currentResults.macrolides;
                chemMicrobialData.macrolidesAnalysisDate = analysisDateUpdates[`${request.requestId}_macrolides_analysis_date`] || null;
            }
            if (currentResults.quinolones) {
                chemMicrobialData.quinolones = currentResults.quinolones;
                chemMicrobialData.quinolonesAnalysisDate = analysisDateUpdates[`${request.requestId}_quinolones_analysis_date`] || null;
            }

            // Send ELISA data if there are any updates
            if (Object.keys(elisaData).length > 0) {
                const response = await fetch(`http://localhost:8080/chemTestElisaResults/${sampleId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(elisaData)
                });

                if (!response.ok) {
                    throw new Error('Failed to save ELISA results');
                }
            }

            // Send Chemical Microbial data if there are any updates
            if (Object.keys(chemMicrobialData).length > 0) {
                const response = await fetch(`http://localhost:8080/chemTestMicrobialResults/${sampleId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(chemMicrobialData)
                });

                if (!response.ok) {
                    throw new Error('Failed to save Chemical Microbial results');
                }
            }

            setSaveStatus('Changes saved successfully!');
            setTimeout(() => setSaveStatus(''), 3000);
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_betaLactams_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'betaLactams', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_tetracyclines_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'tetracyclines', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_sulfonamides_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'sulfonamides', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_aminoglycosides_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'aminoglycosides', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_macrolides_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'macrolides', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_quinolones_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'quinolones', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_chloramphenicol_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'chloramphenicol', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_nitrofuranAoz_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'nitrofuranAoz', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_beta_agonists_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'beta_agonists', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_corticosteroids_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'corticosteroids', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_olaquindox_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'olaquindox', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_nitrufuranAmoz_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'nitrufuranAmoz', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_stilbenes_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'stilbenes', e.target.value)}
                                                                        className="date-picker"
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
                                                                    <input
                                                                        type="date"
                                                                        value={analysisDateUpdates[`${request.requestId}_ractopamine_analysis_date`] || ''}
                                                                        onChange={(e) => handleAnalysisDateChange(request.requestId, 'ractopamine', e.target.value)}
                                                                        className="date-picker"
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
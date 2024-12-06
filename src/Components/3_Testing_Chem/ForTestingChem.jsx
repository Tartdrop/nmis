import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../3A_Testing/ForTesting.css';
import './ForTestingChem.css';
import blue_logo_icon from '../Assets/BlueLogo.png';

const ForTestingChem = () => {
    const { userId, requestId } = useParams();
    const [requests, setRequests] = useState([]);
    const [expandedSample, setExpandedSample] = useState(null);
    const [expandedChem, setExpandedChem] = useState(null);
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    const [testResults, setTestResults] = useState({});
    const [testRemarks, setTestRemarks] = useState({});
    const [saveStatus, setSaveStatus] = useState('');
    const [analysisDateUpdates, setAnalysisDateUpdates] = useState({});
    const [showPopup] = useState(false);
    const requestListRef = useRef(null);

    useEffect(() => {
        const requestList = requestListRef.current;
        if (!requestList) return;
    
        let isDown = false;
        let startY;
        let scrollTop;
    
        const handleMouseDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
    
            e.preventDefault();
            isDown = true;
            requestList.classList.add('grabbing');
            startY = e.pageY - requestList.offsetTop;
            scrollTop = requestList.scrollTop;
        };
    
        const handleMouseLeave = (e) => {
            e.preventDefault();
            isDown = false;
            requestList.classList.remove('grabbing');
        };
    
        const handleMouseUp = (e) => {
            e.preventDefault();
            isDown = false;
            requestList.classList.remove('grabbing');
        };
    
        const handleMouseMove = (e) => {
            if (!isDown) return;
    
            e.preventDefault();
            const y = e.pageY - requestList.offsetTop;
            const walk = (y - startY) * 2;
            requestList.scrollTop = scrollTop - walk;
        };
    
        requestList.addEventListener('mousedown', handleMouseDown);
        requestList.addEventListener('mouseleave', handleMouseLeave);
        requestList.addEventListener('mouseup', handleMouseUp);
        requestList.addEventListener('mousemove', handleMouseMove);
    
        return () => {
            requestList.removeEventListener('mousedown', handleMouseDown);
            requestList.removeEventListener('mouseleave', handleMouseLeave);
            requestList.removeEventListener('mouseup', handleMouseUp);
            requestList.removeEventListener('mousemove', handleMouseMove);
        };
    }, [requests.length]);

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

                const mappedResults = {};

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

    const handleRemarkChange = (requestId, testType, value) => {
        setTestRemarks(prev => ({
            ...prev,
            [requestId]: {
                ...prev[requestId],
                [`${testType}Remarks`]: value
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
            if (!request.sample || !request.sample.length) {
                throw new Error('No sample ID found for this request');
            }
    
            const sampleId = request.sample[0].sampleId;
            const currentResults = testResults[request.requestId] || {};
            const currentRemarks = testRemarks[request.requestId] || {};
    
            if (request.chem) {
                const elisaData = {};
                Object.keys(currentResults).forEach(testType => {
                    if (currentResults[testType]) {
                        elisaData[testType] = currentResults[testType];
                        elisaData[`${testType}Remarks`] = currentRemarks[`${testType}Remarks`] || '';
                        elisaData[`${testType}AnalysisDate`] = analysisDateUpdates[`${request.requestId}_${testType}_analysis_date`] || null;
                    }
                });

                if (Object.keys(elisaData).length > 0) {
                    console.log('Sending ELISA data:', elisaData);
                    const response = await fetch(`http://localhost:8080/chemTestElisaResults/${sampleId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(elisaData),
                    });
    
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Failed to save ELISA results: ${errorText}`);
                    }
                }
    
                const chemMicrobialData = {};
                Object.keys(currentResults).forEach(testType => {
                    if (currentResults[testType]) {
                        chemMicrobialData[testType] = currentResults[testType];
                        chemMicrobialData[`${testType}Remarks`] = currentRemarks[`${testType}Remarks`] || '';
                        chemMicrobialData[`${testType}AnalysisDate`] = analysisDateUpdates[`${request.requestId}_${testType}_analysis_date`] || null;
                    }
                });

                if (Object.keys(chemMicrobialData).length > 0) {
                    console.log('Sending chemical microbial data:', chemMicrobialData);
                    const response = await fetch(`http://localhost:8080/chemMicrobialTestResults/${sampleId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(chemMicrobialData),
                    });
    
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Failed to save chemical microbial results: ${errorText}`);
                    }
                }
            }
    
            alert('Changes saved successfully!');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Error saving changes: ' + error.message);
            setTimeout(() => setSaveStatus(''), 3000);
        }
    };

    const handlePositiveClick = (requestId, testType) => {
        handleTestResultChange(requestId, testType, 'Positive');
    };

    const handleNegativeClick = (requestId, testType) => {
        handleTestResultChange(requestId, testType, 'Negative');
    };

    return (
        <div className="fortesting-all-container">
            <div className='fortesting-container'>
                <div className="fortesting-title">
                    For Testing
                    <div className="fortesting-popup">
                        ⓘ
                        <div className="popup-container">Drag the sides of the container to scroll!</div>
                    </div>
                </div>
                {showPopup && (
                    <div className="popup-container">
                        <p>Drag the page to scroll.</p>
                    </div>
                )}
                <div className="fortesting-1st-container">
                    <div className="fortesting-1st-container-header">
                        <div className="fortesting-1st-container-header-title-left">
                            Control Number
                        </div>
                        <div className="lineseparator">|</div>
                        <div className="fortesting-1st-container-header-title">
                            Chemical Tests
                        </div>
                        <div className="lineseparator">|</div>
                        <div className="fortesting-1st-container-header-title">
                            Sample Information
                        </div>
                        <div className="lineseparator">|</div>
                        <div className="fortesting-1st-container-header-title-right">
                            Save Changes
                        </div>
                    </div>
                    {requests.length > 0 ? (
                        <div className="fortesting-list" ref={requestListRef}>
                            {requests.map((request, index) => (
                                <div key={index} className="request-item">
                                    <div className="fortesting-header">
                                        <span className="fortesting-controlnumber">{request.controlNumber}</span>
                                        <div className="lineseparator-left">|</div>
                                        <span className="fortesting-tests">
                                            {request.chem ? (
                                                canAccessChem(userType) ? (
                                                    <button 
                                                        className="test-btn" 
                                                        onClick={() => toggleChem(request.controlNumber)}
                                                    >
                                                        Show Chemical Tests
                                                    </button>
                                                ) : (
                                                    <div>
                                                        <button 
                                                            className="test-btn-disabled" 
                                                            disabled
                                                            title="You don't have permission to access this section"
                                                        >
                                                            Show Chemical Tests
                                                        </button>
                                                    </div>
                                                )
                                            ) : (
                                                "no testing...."
                                            )}
                                            {expandedChem === request.controlNumber && (
                                                <div className="chemical-list">
                                                    {request.microbial && (
                                                        <div className="microbial-inhibition-section">
                                                            <div className="microbial-inhibition-title"><strong>· <u>Microbial Inhibition Test</u>:</strong></div>
                                                            <div className="microbial-inhibition-tests">
                                                                {request.betaLactams && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Beta Lactams:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.betaLactamsRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'betaLactams', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'betaLactams')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'betaLactams')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_betaLactams_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'betaLactams', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {request.tetracyclines && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Tetracyclines:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.tetracyclinesRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'tetracyclines', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'tetracyclines')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'tetracyclines')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_tetracyclines_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'tetracyclines', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {request.sulfonamides && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Sulfonamides:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.sulfonamidesRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'sulfonamides', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'sulfonamides')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'sulfonamides')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_sulfonamides_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'sulfonamides', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>    
                                                                    </div>
                                                                )}
                                                                {request.aminoglycosides && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Aminoglycosides:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.aminoglycosidesRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'aminoglycosides', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'aminoglycosides')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'aminoglycosides')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_aminoglycosides_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'aminoglycosides', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {request.macrolides && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Macrolides:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.macrolidesRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'macrolides', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'macrolides')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'macrolides')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_macrolides_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'macrolides', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {request.quinolones && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Quinolones:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.quinolonesRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'quinolones', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'quinolones')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'quinolones')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_quinolones_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'quinolones', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {request.elisa && (
                                                        <div className="elisa-section">
                                                            <div className="elisa-title"><strong>· <u>ELISA Tests</u>:</strong></div>
                                                            <div className="elisa-tests">
                                                                {request.chloramphenicol && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Chloramphenicol:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.chloramphenicolRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'chloramphenicol', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'chloramphenicol')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'chloramphenicol')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_chloramphenicol_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'chloramphenicol', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {request.nitrofuranAoz && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Nitrofuran AOZ:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.nitrofuranAozRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'nitrofuranAoz', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'nitrofuranAoz')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'nitrofuranAoz')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_nitrofuranAoz_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'nitrofuranAoz', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {request.beta_agonists && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Beta Agonists:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.beta_agonistsRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'beta_agonists', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'beta_agonists')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'beta_agonists')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_beta_agonists_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'beta_agonists', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {request.corticosteroids && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Corticosteroids:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.corticosteroidsRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'corticosteroids', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'corticosteroids')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'corticosteroids')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_corticosteroids_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'corticosteroids', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {request.olaquindox && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Olaquindox:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.olaquindoxRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'olaquindox', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'olaquindox')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'olaquindox')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_olaquindox_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'olaquindox', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {request.nitrufuranAmoz && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Nitrufuran AMOZ:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.nitrufuranAmozRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'nitrufuranAmoz', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'nitrufuranAmoz')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'nitrufuranAmoz')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_nitrufuranAmoz_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'nitrufuranAmoz', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {request.stilbenes && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Stilbenes:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.stilbenesRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'stilbenes', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'stilbenes')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'stilbenes')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_stilbenes_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'stilbenes', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {request.ractopamine && (
                                                                    <div className="test-result-item-1">
                                                                        <strong>Ractopamine:</strong>
                                                                        <br/>
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                value={testRemarks[request.requestId]?.ractopamineRemarks || ''}
                                                                                onChange={(e) => handleRemarkChange(request.requestId, 'ractopamine', e.target.value)}
                                                                                className="test-result-input"
                                                                            />
                                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'ractopamine')}>+</button> 
                                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'ractopamine')}>-</button> 
                                                                            <input
                                                                                type="date"
                                                                                value={analysisDateUpdates[`${request.requestId}_ractopamine_analysis_date`] || ''}
                                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'ractopamine', e.target.value)}
                                                                                className="date-picker"
                                                                            />
                                                                        </div>
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
                                        <div className="lineseparator">|</div>
                                        <span className="fortesting-sampleinfo">
                                            <button className="test-btn" onClick={() => toggleSample(request.controlNumber)}>
                                                View Sample Information
                                            </button>
                                            {expandedSample === request.controlNumber && (
                                                <div className="sample-list">
                                                    {request.sample.map((sample, index) => (
                                                        <div key={sample.sampleId} className="sample-item">
                                                            <div>
                                                                <strong><u>Sample Type Description {index + 1}</u>:</strong>
                                                                <br />
                                                                <span>→ {sample.sampleTypeDescription}</span>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <div><strong><u>Lot Batch No</u>:</strong> <br /> <span>→ {request.lotBatchNo}</span></div>
                                                    <div><strong><u>Sampler Name</u>:</strong> <br /> <span>→ {request.samplerName}</span></div>
                                                    <div><strong><u>Sample Source</u>:</strong> <br /> <span>→ {request.sampleSource}</span></div>
                                                    <div><strong><u>Production Date</u>:</strong> <br /> <span>→ {request.productionDate}</span></div>
                                                    <div><strong><u>Expiry Date</u>:</strong> <br /> <span>→ {request.expiryDate}</span></div>
                                                    <div><strong><u>Sampling Date</u>:</strong> <br /> <span>→ {request.samplingDate}</span></div>
                                                </div>
                                            )}
                                        </span>
                                        <div className="lineseparator-right">|</div>
                                        <span className="fortesting-save">
                                            <button
                                                className="save-changes-btn"
                                                onClick={() => handleSaveChanges(request)}
                                            >
                                                Save
                                            </button>
                                            {saveStatus && <div className="save-status">{saveStatus}</div>}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-2nd-container-1">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className='msg-noreqres1'>There are no ongoing Chemistry tests. </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForTestingChem;
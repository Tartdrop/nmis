import React, { useState, useEffect } from 'react';
import './ForTesting.css';
import Userfront from "@userfront/core";
import blue_logo_icon from '../Assets/BlueLogo.png';

Userfront.init("jb7ywq8b");

const ForTesting = () => {
    const [testRequests, setTestRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTests, setSelectedTests] = useState({});

    useEffect(() => {
        const fetchTestRequests = async () => {
            try {
                // Assuming you have a similar endpoint for fetching test requests
                const response = await fetch('/requests/testing');
                if (!response.ok) {
                    throw new Error('Failed to fetch test requests');
                }
                const data = await response.json();
                // Group the data by control number
                const groupedData = data.reduce((acc, request) => {
                    if (!acc[request.controlNumber]) {
                        acc[request.controlNumber] = [];
                    }
                    request.sample.forEach(sample => {
                        acc[request.controlNumber].push({
                            sampleTypeDescription: sample.sampleTypeDescription || sample.description,
                            tested: false
                        });
                    });
                    return acc;
                }, {});
                setTestRequests(groupedData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchTestRequests();
    }, []);

    const handleCheckboxChange = (controlNumber, index) => {
        setTestRequests(prev => {
            const updated = { ...prev };
            updated[controlNumber][index].tested = !updated[controlNumber][index].tested;
            return updated;
        });
    };

    return (
        <div className="request-all-container">
            <div className="request-container">
                <div className="request-title">For Testing</div>
                <div className="request-1st-container">
                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : Object.keys(testRequests).length === 0 ? (
                        <>
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className="msg-noreqres1">
                                There are no test requests available.
                            </h1>
                            <h1 className="msg-noreqres2">
                                New requests will appear here when submitted.
                            </h1>
                        </>
                    ) : (
                        <div className="requests-table-container">
                            <table className="requests-table">
                                <thead>
                                    <tr>
                                        <th>Control Number</th>
                                        <th>Test Requests</th>
                                        <th>Testing Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(testRequests).map(([controlNumber, tests]) => (
                                        tests.map((test, index) => (
                                            <tr key={`${controlNumber}-${index}`}>
                                                {index === 0 ? (
                                                    <td rowSpan={tests.length}>{controlNumber}</td>
                                                ) : null}
                                                <td>{test.sampleTypeDescription}</td>
                                                <td>
                                                    <label className="checkbox-container">
                                                        <input
                                                            type="checkbox"
                                                            checked={test.tested}
                                                            onChange={() => handleCheckboxChange(controlNumber, index)}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </td>
                                            </tr>
                                        ))
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

export default ForTesting;
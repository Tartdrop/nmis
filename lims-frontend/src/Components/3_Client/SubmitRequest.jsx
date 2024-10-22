import React, { useState, useEffect } from 'react';
import './Submit.css';
import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom'; 
import blue_line_icon from '../Assets/BlueLine.png';
import dropdown_icon from '../Assets/DropDown.png';
import axios from 'axios';


Userfront.init("jb7ywq8b");

const Submit = () => {
    const [dropdownPurpose, setDropdownPurpose] = useState(false);
    const [dropdownTest, setDropdownTest] = useState(false);
    const [dropdownSample, setDropdownSample] = useState(false);
    const [dropdownSampleInfo, setDropdownSampleInfo] = useState(false);
    const [purposeTesting, setPurposeTesting] = useState('');
    const [sampleCategory, setSampleCategory] = useState('');
    const [otherPurposeTesting, setOtherPurposeTesting] = useState('');

    const handlePurposeToggle = () => {
        setDropdownPurpose(!dropdownPurpose);
        if (!dropdownPurpose) {
            setDropdownTest(false);
        }
        resetStates();
    };

    const handleTestToggle = () => {
        setDropdownTest(!dropdownTest);
        if (!dropdownTest) {
            setDropdownPurpose(false);
        }
        resetStates();
    };

    const handleSampleToggle = () => {
        setDropdownSample(!dropdownSample);
        if (!dropdownSample) {
            setDropdownSampleInfo(false);
        }
        resetStates();
    };

    const handleSampleInfoToggle = () => {
        setDropdownSampleInfo(!dropdownSampleInfo);
        if (!dropdownSampleInfo) {
            setDropdownSample(false);
        }
        resetStates();
    };

    const resetStates = () => {
        setPurposeTesting('');
        setOtherPurposeTesting('');
    };

    const navigate = useNavigate();
    // State for client details
    const [clientDetails, setClientDetails] = useState({
        username: '',
        contactNumber: '',
        email: '',
        companyName: '',
        ltoNumber: '',  // Define the missing fields here
        classification: ''
    });

    // Other form fields
    const [sampleTypeDescription, setSampleTypeDescription] = useState("");
    const [lotBatchNo, setLotBatchNo] = useState("");
    const [sampleSource, setSampleSource] = useState("");
    const [productionDate, setProductionDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [samplingDate, setSamplingDate] = useState("");
    const [samplerName, setSamplerName] = useState("");
    const [testingPurpose, setTestingPurpose] = useState(""); // Define testing purpose
    const [testSelections, setTestSelections] = useState([]); // Define test selections

    useEffect(() => {
        const clientId = localStorage.getItem('clientId');
        if (clientId) { // Check if clientId exists
            axios.get(`http://localhost:8080/api/clients/${clientId}`)
                .then(response => {
                    setClientDetails(response.data);
                })
                .catch(error => {
                    console.error("Error fetching client data:", error);
                    // Optionally, you can also handle errors here, e.g., show an alert or set error state
                });
        }
    }, []);

    const handleRequest = async () => {
        if (!clientDetails.username || !clientDetails.contactNumber || !clientDetails.email || !clientDetails.companyName || !sampleTypeDescription) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/submitrequest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client: {
                        companyName: clientDetails.companyName,
                        ltoNo: clientDetails.ltoNumber,
                        classification: clientDetails.classification,
                    },
                    username: clientDetails.username,
                    contactNumber: clientDetails.contactNumber,
                    email: clientDetails.email,
                    sampleTypeDescription,
                    lotBatchNo,
                    sampleSource,
                    productionDate,
                    expiryDate,
                    samplingDate,
                    samplerName,
                    testingPurpose,
                    testSelections,
                    requestStatus: "PENDING_REVIEW",
                    submissionDate: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Request submission failed.");
            }

            alert("Request submitted successfully!");
            navigate('/client-dashboard');  // Correct navigation logic here
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    const handleSubmitRequest = (e) => {
        e.preventDefault();
        handleRequest();
    };

    const handleTestSelectionChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        setTestSelections((prevSelections) => {
            if (isChecked) {
                // Add the test if it's checked
                return [...prevSelections, value];
            } else {
                // Remove the test if it's unchecked
                return prevSelections.filter((test) => test !== value);
            }
        });
    };


    return (
        <div className="submit-all-container">
        <div className='submit-container'>
            <div className='submit-title'>Submit a Request</div>
            <div className="submit-1st-container">
                <div className='submit-1st-container-column'>
                    <div className='submit-1st-container-column-row'>
                        <div className='submit-1st-container-column-row-column-1'>
                            Username
                            <input type="text" 
                                   value={clientDetails.username} 
                                   readOnly />
                        </div>
                        <div className='submit-1st-container-column-row-column-2'>
                            Contact Number
                            <input type="text" 
                                   value={clientDetails.contactNumber} 
                                   readOnly />
                        </div>
                        <div className='submit-1st-container-column-row-column-3'>
                            Email Address
                            <input type="text" 
                                   value={clientDetails.email} 
                                   readOnly />
                        </div>
                        <div className='submit-1st-container-column-row-column-4'>
                            Company Name
                            <input type="text" 
                                   value={clientDetails.companyName} 
                                   readOnly />
                        </div>
                    </div>
                </div>
            </div>
            <div className="submit-column">
                <div className='submit-row'>
                    <div className='submit-column'>
                        <div className='samplecategory' open={dropdownSample}>
                            <div className='sample-category-title' onClick={handleSampleToggle}>
                                Sample Category
                                <img 
                                    src={dropdown_icon} 
                                    alt='dropdown icon'
                                    className={dropdownSample ? 'rotate-up' : 'rotate-down'}
                                />
                            </div>
                            {dropdownSample && (
                                <div className="tmp-cont">
                                    <img src={blue_line_icon} alt="blue line" />
                                    <div className="spacer-top">.</div>
                                    <div className="submit-show">
                                        <label className="samplecategory_choices">
                                            <input type="radio" name="sample-category-choices" value="Walk-in" onChange={(e) => setSampleCategory(e.target.value)} />
                                            <span className="checkmark"></span>
                                            Walk-in
                                        </label>
                                        <label className="samplecategory_choices">
                                            <input type="radio" name="sample-category-choices" value="Monitoring" onChange={(e) => setSampleCategory(e.target.value)} />
                                            <span className="checkmark"></span>
                                            Monitoring
                                        </label>
                                    </div>
                                    <div className="spacer">.</div>
                                </div>
                            )}
                        </div>
                        <div className='sampleinfo' open={dropdownSampleInfo}>
                            <div className='sample-info-title' onClick={handleSampleInfoToggle}>
                                Sample Information
                                <img 
                                    src={dropdown_icon} 
                                    alt='dropdown icon'
                                    className={dropdownSampleInfo ? 'rotate-up' : 'rotate-down'}
                                />
                            </div>
                            {dropdownSampleInfo && (
                                <div className="tmp-cont">
                                    <img src={blue_line_icon} alt="blue line" />
                                    <div className="spacer-top">.</div>
                                    <div className="submit-show">
                                        <div className='sample-rows'>
                                            <div className='sample-row'>
                                                <div>Sample Type/Description :</div>
                                                <input type="text" value={sampleTypeDescription} onChange={(e) => setSampleTypeDescription(e.target.value)} />
                                            </div>
                                            <div className='sample-row'>
                                                <div>Lot/Batch Number :</div>
                                                <input type="text" value={lotBatchNo} onChange={(e) => setLotBatchNo(e.target.value)} />
                                            </div>
                                            <div className='sample-row'>
                                                <div>Sample Source :</div>
                                                <input type="text" value={sampleSource} onChange={(e) => setSampleSource(e.target.value)} />
                                            </div>
                                            <div className='sample-row'>
                                                <div>Production Date :</div>
                                                <input type="date" value={productionDate} onChange={(e) => setProductionDate(e.target.value)} />
                                            </div>
                                            <div className='sample-row'>
                                                <div>Expiry Date :</div>
                                                <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                                            </div>
                                            <div className='sample-row'>
                                                <div>Sampling Date :</div>
                                                <input type="date" value={samplingDate} onChange={(e) => setSamplingDate(e.target.value)} />
                                            </div>
                                            <div className='sample-row'>
                                                <div>Sampler Name :</div>
                                                <input type="text" value={samplerName} onChange={(e) => setSamplerName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="spacer">.</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='submit-column'>
                        <div className='purposeoftesting' open={dropdownPurpose}>
                            <div className='purpose-title' onClick={handlePurposeToggle}>
                                Purpose of Testing
                                <img 
                                    src={dropdown_icon} 
                                    alt='dropdown icon'
                                    className={dropdownPurpose ? 'rotate-up' : 'rotate-down'}
                                />
                            </div>
                            {dropdownPurpose && (
                                <div className="tmp-cont">
                                    <img src={blue_line_icon} alt="blue line" />
                                    <div className="spacer-top">.</div>
                                    <div className="submit-show">
                                        <label className="purposeoftesting_choices">
                                            <input type="radio" name="purpose-choices" value="Monitoring" onChange={(e) => setPurposeTesting(e.target.value)} />
                                            <span className="checkmark"></span>
                                            Monitoring
                                        </label>
                                        <label className="purposeoftesting_choices">
                                            <input type="radio" name="purpose-choices" value="Local Trade" onChange={(e) => setPurposeTesting(e.target.value)} />
                                            <span className="checkmark"></span>
                                            Local Trade
                                        </label>
                                        <label className="purposeoftesting_choices">
                                            <input type="radio" name="purpose-choices" value="Imported" onChange={(e) => setPurposeTesting(e.target.value)} />
                                            <span className="checkmark"></span>
                                            Imported
                                        </label>
                                        <label className="purposeoftesting_choices">
                                            <input type="radio" name="purpose-choices" value="Export" onChange={(e) => setPurposeTesting(e.target.value)} />
                                            <span className="checkmark"></span>
                                            Export
                                        </label>
                                        <label className="purposeoftesting_choices">
                                            <input type="radio" name="purpose-choices" value="Complaint" onChange={(e) => setPurposeTesting(e.target.value)} />
                                            <span className="checkmark"></span>
                                            Complaint
                                        </label>
                                        <label className="purposeoftesting_choices">
                                            <input type="radio" name="purpose-choices" value="Others" onChange={(e) => setPurposeTesting(e.target.value)} />
                                            <span className="checkmark"></span>
                                            Others:
                                            <input 
                                                type="text"
                                                value={otherPurposeTesting}
                                                onChange={(e) => setOtherPurposeTesting(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <div className="spacer">.</div>
                                </div>
                            )}
                        </div>

                        <div className='testselection' open={dropdownTest}>
                            <div className='test-title' onClick={handleTestToggle}>
                                Test Selection
                                <img 
                                    src={dropdown_icon} 
                                    alt='dropdown icon'
                                    className={dropdownTest ? 'rotate-up' : 'rotate-down'}
                                />
                            </div>
                            {dropdownTest && (
                                <main className="tmp-cont">
                                    <img src={blue_line_icon} alt="blue line" />
                                    <div className="spacer-top">.</div>
                                    <div className="submit-show">
                                        {/* Add inputs for test selection here */}
                                        <label className="test-selection-choice">
                                            <input type="checkbox" value="Test 1" onChange={handleTestSelectionChange} />
                                            Test 1
                                        </label>
                                        <label className="test-selection-choice">
                                            <input type="checkbox" value="Test 2" onChange={handleTestSelectionChange} />
                                            Test 2
                                        </label>
                                        {/* Repeat for other tests */}
                                    </div>
                                    <div className="spacer">.</div>
                                </main>
                            )}
                        </div>
                    </div>
                </div>
                <div className='submit-button' onClick={handleSubmitRequest}>
                    <button className="submit-text-button">Submit</button>
                </div>
            </div>
        </div>
    </div> 
    );
};

export default Submit;

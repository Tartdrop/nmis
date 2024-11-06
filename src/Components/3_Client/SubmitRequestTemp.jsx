import React, { useState, useEffect } from 'react';
import './SubmitTMP.css';
import { useNavigate, useParams } from 'react-router-dom'; 
import blue_line_icon from '../Assets/BlueLine.png';
import white_line_submit from '../Assets/WhiteLineSubmit.png';

const Submit = () => {
    const { userId } = useParams();
    const [sampleCategory, setSampleCategory] = useState('');
    const [otherPurposeTesting, setOtherPurposeTesting] = useState('');

    const navigate = useNavigate();
    const [sampleTypeDescription, setSampleTypeDescription] = useState([""]); // Change to an array
    const [lotBatchNo, setLotBatchNo] = useState("");
    const [sampleSource, setSampleSource] = useState("");
    const [productionDate, setProductionDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [samplingDate, setSamplingDate] = useState("");
    const [samplerName, setSamplerName] = useState("");
    const [testingPurpose, setTestingPurpose] = useState("");
    const [testSelections, setTestSelections] = useState([]);

    const [clientDetails, setClientDetails] = useState({
        username: '',
        contactNumber: '',
        email: '',
        companyName: '',
        ltoNumber: '',  
        classification: ''
    });

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/clientview/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setClientDetails(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching consents:', error);
            }
        };
        fetchClientDetails();
    }, [userId]);

    const handleRequest = async () => {
        if (!clientDetails.username || !clientDetails.contactNumber || !clientDetails.email || !clientDetails.companyName || sampleTypeDescription.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!testingPurpose || testingPurpose === "") {
            alert("Please select a valid Testing Purpose.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8080/requests/submitrequest/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    representativeName: clientDetails.username,
                    contactNumber: clientDetails.contactNumber,
                    emailAddress: clientDetails.email,
                    companyName: clientDetails.companyName,
                    clientClassification: clientDetails.classification,
                    ltoNumber: clientDetails.ltoNumber,
    
                    sampleTypeDescription,
                    lotBatchNo,
                    sampleSource,
                    productionDate,
                    expiryDate,
                    samplingDate,
                    samplerName,
    
                    testingPurpose,
                    testSelections,
    
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
            navigate(`/home/client/${userId}`);
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
                return [...prevSelections, value];
            } else {
                return prevSelections.filter((test) => test !== value);
            }
        });
    };

    // Add new sample description input
    const addSampleDescription = () => {
        setSampleTypeDescription([...sampleTypeDescription, ""]);
    };

    // Remove the most recent sample description input
    const removeSampleDescription = () => {
        if (sampleTypeDescription.length > 1) {
            setSampleTypeDescription(sampleTypeDescription.slice(0, -1));
        }
    };

    // Update individual sample descriptions
    const handleSampleDescriptionChange = (index, value) => {
        const updatedDescriptions = [...sampleTypeDescription];
        updatedDescriptions[index] = value;
        setSampleTypeDescription(updatedDescriptions);
    };

    return (
        <div className="submit-container-all">
            <div className="s-c-a-left">
                <div className="s-c-a-l-epithet">
                    <div className="s-c-a-l-e-text">Your</div>
                    <div className="s-c-a-l-e-text">Information</div>
                </div>
                <img className="s-c-a-l-whiteline" src={white_line_submit} alt="white line submit"/>
                <div className="s-c-a-l-information">
                    <div className='s-c-a-l-i-text'>
                        Username
                        <input type="text" 
                            value={clientDetails.username} 
                            readOnly />
                    </div>
                    <div className='s-c-a-l-i-text'>
                        Contact Number
                        <input type="text" 
                            value={clientDetails.contactNumber} 
                            readOnly />
                    </div>
                    <div className='s-c-a-l-i-text'>
                        Email Address
                        <input type="text" 
                            value={clientDetails.email} 
                            readOnly />
                    </div>
                    <div className='s-c-a-l-i-text'>
                        Company Name
                        <input type="text" 
                            value={clientDetails.companyName} 
                            readOnly />
                    </div>
                    <div className='s-c-a-l-i-text'>
                        Client Classification
                        <input type="text" 
                            value={clientDetails.classification} 
                            readOnly />
                    </div>
                    <div className='s-c-a-l-i-text'>
                        LTO Number
                        <input type="text" 
                            value={clientDetails.ltoNumber} 
                            readOnly />
                    </div>
                    <div className='s-c-a-l-i-additionalinfo'>
                        <div>* these information are prefilled with</div>
                        <div>your logged-in details</div>
                    </div>
                </div>
            </div>

            <div className="s-c-a-right">
                <div className='s-c-a-r-title'>Submit a Request</div>
                <div className='s-c-a-r-container-everything'>
                    <div className='s-c-a-r-c-e-scroll'>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">1. Purpose of Testing</div>
                            <div className="s-c-a-r-c-e-s-n-container">
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Monitoring" onChange={(e) => setTestingPurpose(e.target.value)} />
                                    <span className="checkmark">NMIS Monitoring Program</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Local_Trade" onChange={(e) => setTestingPurpose(e.target.value)} />
                                    <span className="checkmark">For Local Trade</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Imported" onChange={(e) => setTestingPurpose(e.target.value)} />
                                    <span className="checkmark">Imported (COMI Issuance)</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Export" onChange={(e) => setTestingPurpose(e.target.value)} />
                                    <span className="checkmark">Export (OMIC Issuance)</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Complaint" onChange={(e) => setTestingPurpose(e.target.value)} />
                                    <span className="checkmark">Complaint</span>
                                </label>
                                <div className="s-c-a-r-c-e-s-n-co-others">
                                    <label className="s-c-a-r-c-e-s-n-co-o-choices">
                                        <input 
                                            type="radio" 
                                            name="purpose-choices" 
                                            value="Others" 
                                            onChange={(e) => setTestingPurpose(e.target.value)} 
                                        />
                                        <span className="checkmark">Others</span>
                                    </label>
                                    <div className={`s-c-a-r-c-e-s-n-co-o-input ${testingPurpose === "Others" ? "show" : ""}`}>
                                        →
                                        <input 
                                            type="text"
                                            value={otherPurposeTesting}
                                            onChange={(e) => setOtherPurposeTesting(e.target.value)}
                                            placeholder="Specify other purpose"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">2. Sample Category</div>
                            <div className="s-c-a-r-c-e-s-n-container">
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="sample-category-choices" value="Walk-in" onChange={(e) => setSampleCategory(e.target.value)} />
                                    <span className="checkmark">Walk-in</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="sample-category-choices" value="Monitoring" onChange={(e) => setSampleCategory(e.target.value)} />
                                    <span className="checkmark">Monitoring</span>
                                </label>
                            </div>
                        </div>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">3. Sample Information</div>
                            <div className="s-c-a-r-c-e-s-n-container">
                                <div className='s-c-a-r-c-e-s-n-co-input-samples'>
                                    <div className='s-c-a-r-c-e-s-n-co-i-s-buttons'>
                                        <button className="s-c-a-r-c-e-s-n-co-i-s-b-add" type="button" onClick={addSampleDescription}>+</button>
                                        <button className="s-c-a-r-c-e-s-n-co-i-s-b-delete" type="button" onClick={removeSampleDescription} disabled={sampleTypeDescription.length <= 1}>-</button>
                                    </div>
                                    a. Sample Type/Description
                                    <div className="s-c-a-r-c-e-s-n-co-i-samples">
                                        {sampleTypeDescription.map((desc, index) => (
                                            <div key={index}>
                                                <input
                                                    type="text"
                                                    value={desc}
                                                    onChange={(e) => handleSampleDescriptionChange(index, e.target.value)}
                                                    placeholder={`Input Sample Type/Description ${index + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>b. Lot/Batch Number</div>
                                    <input type="text" value={lotBatchNo} onChange={(e) => setLotBatchNo(e.target.value)} />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>c. Sample Source</div>
                                    <input type="text" value={sampleSource} onChange={(e) => setSampleSource(e.target.value)} />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>d. Production Date</div>
                                    <input type="date" value={productionDate} onChange={(e) => setProductionDate(e.target.value)} />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>e. Expiry Date</div>
                                    <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>f. Sampling Date</div>
                                    <input type="date" value={samplingDate} onChange={(e) => setSamplingDate(e.target.value)} />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>g. Sampler Name</div>
                                    <input type="text" value={samplerName} onChange={(e) => setSamplerName(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">4. Test Selection</div>
                        </div>
                        <div className='s-c-a-r-c-e-sc-submit' onClick={handleSubmitRequest}>
                            <button className="s-c-a-r-c-e-sc-su-button">Submit</button>
                        </div>
                    </div>
                </div>
            </div>         
        </div> 
    );
};

export default Submit;

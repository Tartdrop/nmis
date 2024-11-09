import React, { useState, useEffect } from 'react';
import './SubmitRequestNew.css';
import { useNavigate, useParams } from 'react-router-dom'; 
import white_line_submit from '../Assets/WhiteLineSubmit.png';

const Submit = () => {
    const navigate = useNavigate();

    const { userId } = useParams();
    const [sampleCategory, setSampleCategory] = useState("");
    const [sampleTypeDescription, setSampleTypeDescription] = useState([""]);
    const [lotBatchNo, setLotBatchNo] = useState("");
    const [sampleSource, setSampleSource] = useState("");
    const [productionDate, setProductionDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [samplingDate, setSamplingDate] = useState("");
    const [samplerName, setSamplerName] = useState("");
    const [testingPurpose, setTestingPurpose] = useState("");
    const [otherTestingPurpose, setOtherTestingPurpose] = useState('');
    const [testSelections, setTestSelections] = useState([""]);
        const [microbial, setMicrobial] = useState(false);
        const [chem, setChem] = useState(false);
        const [molBio, setMolBio] = useState(false);
            const [isMicrobiologicalChecked, setIsMicrobiologicalChecked] = useState(false);
                const [isCSTChecked, setIsCSTChecked] = useState(false);
            const [isChemicalChecked, setIsChemicalChecked] = useState(false);
                const [isMITChecked, setIsMITChecked] = useState(false);
                const [isELISAChecked, setIsELISAChecked] = useState(false);
            const [isMolBioChecked, setIsMolBioChecked] = useState(false);
                const [isSIChecked, setIsSIChecked] = useState(false);

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
        // Validation Checks
        if (!clientDetails.username || !clientDetails.contactNumber || !clientDetails.email || !clientDetails.companyName || sampleTypeDescription.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!testingPurpose || testingPurpose === "") {
            alert("Please select a valid Testing Purpose.");
            return;
        }

        if (!sampleCategory || sampleCategory === "") {
            alert("Please select a valid Sample Category.");
            return;
        }

        // Additional check for 'Other' testing purpose
        if (testingPurpose === "Others" && (!otherTestingPurpose || otherTestingPurpose.trim() === "")) {
            alert("Please provide a description for the 'Other' testing purpose.");
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

                    lotBatchNo,
                    sampleSource,
                    productionDate,
                    expiryDate,
                    samplingDate,
                    samplerName,
                    
                    testingPurpose,
                    otherTestingPurpose: testingPurpose === "Others" ? otherTestingPurpose : null,
                    sampleCategory,
                    testSelections,

                    microbial,
                    chem,
                    molBio,
    
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

    const addSampleTypeDescription = () => {
        setSampleTypeDescription([...sampleTypeDescription, ""]);
    };

    const removeSampleTypeDescription = () => {
        if (sampleTypeDescription.length > 1) {
            setSampleTypeDescription(sampleTypeDescription.slice(0, -1));
        }
    };

    const handleSampleTypeDescriptionChange = (index, value) => {
        const updatedDescriptions = [...sampleTypeDescription];
        updatedDescriptions[index] = value;
        setSampleTypeDescription(updatedDescriptions);
    };
    
    const handleMicrobiologicalCheckboxChange = (e) => {
        setIsMicrobiologicalChecked(e.target.checked);
        setMicrobial(true);
    };

        const handleCSTCheckboxChange = (e) => {
            setIsCSTChecked(e.target.checked);
        };

    const handleChemicalCheckboxChange = (e) => {
        setIsChemicalChecked(e.target.checked);
        setChem(true);
    };

        const handleMITCheckboxChange = (e) => {
            setIsMITChecked(e.target.checked);
        };

        const handleELISACheckboxChange = (e) => {
            setIsELISAChecked(e.target.checked);
        };

    const handleMolBioCheckboxChange = (e) => {
        setIsMolBioChecked(e.target.checked);
        setMolBio(true);
    };

        const handleSICheckboxChange = (e) => {
            setIsSIChecked(e.target.checked);
        };

    const handleSubmitRequest = (e) => {
        e.preventDefault();
        handleRequest();
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
                                            value={otherTestingPurpose}
                                            onChange={(e) => setOtherTestingPurpose(e.target.value)}
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
                                        <button className="s-c-a-r-c-e-s-n-co-i-s-b-add" type="button" onClick={addSampleTypeDescription}>+</button>
                                        <button className="s-c-a-r-c-e-s-n-co-i-s-b-delete" type="button" onClick={removeSampleTypeDescription} disabled={sampleTypeDescription.length <= 1}>-</button>
                                    </div>
                                    a. Sample Type/Description
                                    <div className="s-c-a-r-c-e-s-n-co-i-samples">
                                        {sampleTypeDescription.map((desc, index) => (
                                            <div key={index}>
                                                <input
                                                    type="text"
                                                    value={desc}
                                                    onChange={(e) => handleSampleTypeDescriptionChange(index, e.target.value)}
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
                            <div className="s-c-a-r-c-e-s-n-container">
                                <label className="s-c-a-r-c-e-s-n-co-choices-test">
                                    <input 
                                        type="checkbox" 
                                        name="test-selection" 
                                        onChange={handleMicrobiologicalCheckboxChange}
                                    />
                                    <span className="checkmark"><b>Microbiological Tests</b> (7 - 16 Days)</span>
                                </label>
                                    {isMicrobiologicalChecked && (
                                        <>
                                            <div className="s-c-a-r-c-e-s-n-c-notes">
                                                <div className="s-c-a-r-c-e-s-n-c-note"> → Average sample temperature must be 10°C or below
                                                </div>
                                                <div className="s-c-a-r-c-e-s-n-c-note"> → Average sample weight must be 250g for meat, minimum
                                                </div>
                                                <div className="s-c-a-r-c-e-s-n-c-note"> → Average sample weight must be 50g for cecal content or intact ceccum, minimum;
                                                </div>
                                            </div>
                                        
                                            <div className="s-c-a-r-c-e-s-n-co-tests">
                                                <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                    <input 
                                                        type="checkbox" 
                                                        name="microbiological-choices" 
                                                        value="" 
                                                    />
                                                    <span className="checkmark">Standard Plate Count/ Aerobic Plate Count (Php 150.00)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                    <input 
                                                        type="checkbox" 
                                                        name="microbiological-choices" 
                                                        value="" 
                                                    />
                                                    <span className="checkmark">Staphylococcus aureus (Php 350.00)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                    <input 
                                                        type="checkbox" 
                                                        name="microbiological-choices" 
                                                        value="" 
                                                    />
                                                    <span className="checkmark">Salmonella sp. (Php 350.00)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                    <input 
                                                        type="checkbox" 
                                                        name="microbiological-choices" 
                                                        value="" 
                                                    />
                                                    <span className="checkmark">Campylobacter (Php 1,500.00)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-choices-cst">
                                                    <input 
                                                        type="checkbox" 
                                                        name="microbiological-choices" 
                                                        onChange={handleCSTCheckboxChange}
                                                    />
                                                    <span className="checkmark">Culture and Sensitivity Test (Php1,500/panel)</span>
                                                </label>
                                                <div className="s-c-a-r-c-e-s-n-co-t-subchoices">
                                                    {isCSTChecked && (
                                                        <>
                                                            <div className="s-c-a-r-c-e-s-n-co-t-s-container">
                                                                <div className="s-c-a-r-c-e-s-n-co-t-s-c-text">
                                                                    <p>→</p>
                                                                    <p>Gram Positive AST</p>
                                                                </div>
                                                                <input 
                                                                    type="text"
                                                                    value={otherTestingPurpose}
                                                                    onChange={(e) => setOtherTestingPurpose(e.target.value)}
                                                                    placeholder="Specify Gram Positive AST"
                                                                />
                                                            </div>
                                                            <div className="s-c-a-r-c-e-s-n-co-t-s-container">
                                                                <div className="s-c-a-r-c-e-s-n-co-t-s-c-text">
                                                                    <p>→</p>
                                                                    <p>Gram Negative AST</p>
                                                                </div>
                                                                <input 
                                                                    type="text"
                                                                    value={otherTestingPurpose}
                                                                    onChange={(e) => setOtherTestingPurpose(e.target.value)}
                                                                    placeholder="Specify Gram Negative AST"
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                    </div>
                                                <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                    <input 
                                                        type="checkbox" 
                                                        name="microbiological-choices" 
                                                        value="" 
                                                    />
                                                    <span className="checkmark">Coliform Count (Php 150.00)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                    <input 
                                                        type="checkbox" 
                                                        name="microbiological-choices" 
                                                        value="" 
                                                    />
                                                    <span className="checkmark">E. Coli (Php 350.00)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                    <input 
                                                        type="checkbox" 
                                                        name="microbiological-choices" 
                                                        value="" 
                                                    />
                                                    <span className="checkmark">E. Coli & E. Coli O157;H7 (Php 700.00)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                    <input 
                                                        type="checkbox" 
                                                        name="microbiological-choices" 
                                                        value="" 
                                                    />
                                                    <span className="checkmark">Yeast and Molds (Php 300.00)</span>
                                                </label>
                                            </div>
                                        </>
                                    )}
                                    
                                <label className="s-c-a-r-c-e-s-n-co-choices-test">
                                    <input 
                                        type="checkbox" 
                                        name="test-selection" 
                                        onChange={handleChemicalCheckboxChange}
                                    />
                                    <span className="checkmark"><b>Chemical/Veterinary Drug Residue Tests</b> (5 - 6 Days)</span>
                                </label>
                                    {isChemicalChecked && (
                                        <>
                                            <div className="s-c-a-r-c-e-s-n-c-notes">
                                                <div className="s-c-a-r-c-e-s-n-c-note"> → Samples should not include fat tissues
                                                </div>
                                                <div className="s-c-a-r-c-e-s-n-c-note"> → Average sample weight must be 250g, minimum
                                                </div>
                                            </div>

                                            <div className="s-c-a-r-c-e-s-n-co-tests">
                                                <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-container-choices" 
                                                        onChange={handleMITCheckboxChange}
                                                    />
                                                    <span className="checkmark"><b>Microbial Inhibition Test</b> (5 Days)</span>
                                                </label>
                                                {isMITChecked && (
                                                    <>
                                                        <div className="s-c-a-r-c-e-s-n-co-tests">
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Beta-lactams (Php 375.00)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Tetracyclines (Php 375.00)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Sulfonamides (Php 375.00)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Aminoglycosides (Php 375.00)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Macrolides (Php 375.00)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Quinolones (Php 375.00)</span>
                                                            </label>
                                                        </div>
                                                    </>
                                                )}
                                                <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-container-choices" 
                                                        onChange={handleELISACheckboxChange} 
                                                    />
                                                    <span className="checkmark"><b>ELISA: Enzyme-Linked ImmunoSorbent Assay</b> (6 Days)</span>
                                                </label>
                                                {isELISAChecked && (
                                                    <>
                                                        <div className="s-c-a-r-c-e-s-n-co-tests">
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Chloramphenicol (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Nitrofuran AOZ (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Beta-agonists (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Corticosteroids (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Olaquindox (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Nitrofuran AMOZ (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Stilbenes (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Ractopamine (Php1,500)</span>
                                                            </label>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}

                                <label className="s-c-a-r-c-e-s-n-co-choices-test">
                                    <input 
                                        type="checkbox" 
                                        name="test-selection" 
                                        onChange={handleMolBioCheckboxChange}
                                    />
                                    <span className="checkmark"><b>Molecular Biology Tests</b> (5 Days)</span>
                                </label>
                                    {isMolBioChecked && (
                                        <>
                                            <div className="s-c-a-r-c-e-s-n-c-notes">
                                                <div className="s-c-a-r-c-e-s-n-c-note"> → Average sample weight is 5g at minimum
                                                </div>
                                            </div>

                                            <div className="s-c-a-r-c-e-s-n-co-tests">
                                                <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                    <input 
                                                        type="checkbox" 
                                                        name="molbio-container-choices" 
                                                        onChange={handleSICheckboxChange} 
                                                    />
                                                    <span className="checkmark"><b>Species Identification</b></span>
                                                </label>
                                                {isSIChecked && (
                                                    <>
                                                        <div className="s-c-a-r-c-e-s-n-co-tests">
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Dog (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Cat (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Chicken (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Buffalo (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Cattle (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Horse (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Goat (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Sheep (Php1,500)</span>
                                                            </label>
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    value="" 
                                                                />
                                                                <span className="checkmark">Swine (Php1,500)</span>
                                                            </label>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}
                            </div>
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

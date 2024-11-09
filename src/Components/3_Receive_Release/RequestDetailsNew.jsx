import React, { useState, useEffect } from 'react';
import './RequestDetails.css';
import { useNavigate, useParams } from 'react-router-dom'; 
import white_line_submit from '../Assets/WhiteLineSubmit.png';

const RequestDetails = () => {
    const { userId, requestId } = useParams();
    const [sampleCategory, setSampleCategory] = useState('');
    const [otherPurposeTesting, setOtherPurposeTesting] = useState('');
    const [sampleTypeDescription, setSampleTypeDescription] = useState([""]);
    const [lotBatchNo, setLotBatchNo] = useState("");
    const [sampleSource, setSampleSource] = useState("");
    const [productionDate, setProductionDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [samplingDate, setSamplingDate] = useState("");
    const [samplerName, setSamplerName] = useState("");
    const [testingPurpose, setTestingPurpose] = useState("");
    const [testSelections, setTestSelections] = useState([]);
        const [microbial, setMicrobial] = useState(false);
        const [chem, setChem] = useState(false);
        const [molBio, setMolBio] = useState(false);
    const [requestData, setRequestData] = useState(null);

    useEffect(() => {
        const fetchRequestData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/requests/trackrequest/${requestId}`);
                if (response.ok) {
                    const data = await response.json();
                    setRequestData(data);
                    setSampleCategory(data.sampleCategory || '');
                    setLotBatchNo(data.lotBatchNo || '');
                    setSampleSource(data.sampleSource || '');
                    setProductionDate(data.productionDate || '');
                    setExpiryDate(data.expiryDate || '');
                    setSamplingDate(data.samplingDate || '');
                    setSamplerName(data.samplerName || '');
                    setTestingPurpose(data.testingPurpose || '');
                    setOtherPurposeTesting(data.otherTestingPurpose || '');
                    setTestSelections(data.testSelections || []);
                    setMicrobial(data.microbial || '');
                    setChem(data.chem || '');
                    setMolBio(data.molBio || '');
                } else {
                    console.error('Failed to fetch request data');
                }
            } catch (error) {
                console.error('Error fetching request data:', error);
            }
        };

        fetchRequestData();
    }, [requestId]);

    const navigate = useNavigate();

    const handleApprove = async () => {
        try {
            const response = await fetch(`http://localhost:8080/requests/approve/${requestId}`, {
                method: 'PUT'
            });
    
            if (response.ok) {
                // Handle successful approval, e.g., show a success message, navigate to a different page
                alert('Request approved successfully!');
                navigate(`/home/staff/${userId}`); // Navigate to the staff dashboard
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
    
    const handleReject = async () => {
        try {
            const response = await fetch(`http://localhost:8080/requests/reject/${requestId}`, {
                method: 'PUT'
            });
    
            if (response.ok) {
                // Handle successful rejection, e.g., show a success message, navigate to a different page
                alert('Request rejected successfully!');
                navigate(`/home/staff/${userId}`); // Navigate to the staff dashboard
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
    
    const handleRequestAdditionalInformation = () => {
        navigate("/request-additional-info");
    };

    const addSampleDescription = () => {
        setSampleTypeDescription([...sampleTypeDescription, ""]);
    };

    const removeSampleDescription = () => {
        if (sampleTypeDescription.length > 1) {
            setSampleTypeDescription(sampleTypeDescription.slice(0, -1));
        }
    };

    const handleSampleDescriptionChange = (index, value) => {
        const updatedDescriptions = [...sampleTypeDescription];
        updatedDescriptions[index] = value;
        setSampleTypeDescription(updatedDescriptions);
    };

    return (
        <div className="submit-container-all">
            <div className="s-c-a-left">
                <div className="s-c-a-l-epithet">
                    <div className="s-c-a-l-e-text">Their</div>
                    <div className="s-c-a-l-e-text">Information</div>
                </div>
                <img className="s-c-a-l-whiteline" src={white_line_submit} alt="white line submit"/>
                <div className="s-c-a-l-information">
                    <div className='s-c-a-l-i-text'>
                        Username
                        <input type="text" 
                            value={requestData?.representativeName || ''}
                            readOnly />
                    </div>
                    <div className='s-c-a-l-i-text'>
                        Contact Number
                        <input type="text" 
                            value={requestData?.contactNumber || ''} 
                            readOnly />
                    </div>
                    <div className='s-c-a-l-i-text'>
                        Email Address
                        <input type="text" 
                            value={requestData?.emailAddress || ''} 
                            readOnly />
                    </div>
                    <div className='s-c-a-l-i-text'>
                        Company Name
                        <input type="text" 
                            value={requestData?.companyName || ''}
                            readOnly />
                    </div>
                    <div className='s-c-a-l-i-text'>
                        Client Classification
                        <input type="text" 
                            value={requestData?.clientClassification || ''}
                            readOnly />
                    </div>
                    <div className='s-c-a-l-i-text'>
                        LTO Number
                        <input type="text" 
                            value={requestData?.ltoNumber || ''}
                            readOnly />
                    </div>
                    <div className='s-c-a-l-i-additionalinfo'>
                        <div>* these information were prefilled with</div>
                        <div>their logged-in details</div>
                    </div>
                </div>
            </div>

            <div className="s-c-a-right">
                <div className='s-c-a-r-title'>Request Details</div>
                <div className='s-c-a-r-container-everything'>
                    <div className='s-c-a-r-c-e-scroll'>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">1. Purpose of Testing</div>
                            <div className="s-c-a-r-c-e-s-n-container">
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Monitoring" checked={testingPurpose === 'Monitoring'} readOnly/>
                                    <span className="checkmark">NMIS Monitoring Program</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Local_Trade" checked={testingPurpose === 'Local_Trade'} readOnly/>
                                    <span className="checkmark">For Local Trade</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Imported" checked={testingPurpose === 'Imported'} readOnly/>
                                    <span className="checkmark">Imported (COMI Issuance)</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Export" checked={testingPurpose === 'Export'} readOnly/>
                                    <span className="checkmark">Export (OMIC Issuance)</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Complaint" checked={testingPurpose === 'Complaint'} readOnly/>
                                    <span className="checkmark">Complaint</span>
                                </label>
                                <div className="s-c-a-r-c-e-s-n-co-others">
                                    <label className="s-c-a-r-c-e-s-n-co-o-choices">
                                        <input 
                                            type="radio" 
                                            name="purpose-choices" 
                                            value="Others" 
                                            checked={testingPurpose === 'Others'}
                                            readOnly
                                        />
                                        <span className="checkmark">Others</span>
                                    </label>
                                    <div className={`s-c-a-r-c-e-s-n-co-o-input ${testingPurpose === "Others" ? "show" : ""}`}>
                                        →
                                        <input 
                                            type="text"
                                            value={otherPurposeTesting}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">2. Sample Category</div>
                            <div className="s-c-a-r-c-e-s-n-container">
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="sample-category-choices" value="Walk-in" checked={sampleCategory === 'Walk-in'} />
                                    <span className="checkmark">Walk-in</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="sample-category-choices" value="Monitoring" checked={sampleCategory === 'Monitoring'} />
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
                                    <input type="text" value={lotBatchNo} readOnly />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>c. Sample Source</div>
                                    <input type="text" value={sampleSource} readOnly />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>d. Production Date</div>
                                    <input type="date" value={productionDate} readOnly />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>e. Expiry Date</div>
                                    <input type="date" value={expiryDate} readOnly />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>f. Sampling Date</div>
                                    <input type="date" value={samplingDate} readOnly />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>g. Sampler Name</div>
                                    <input type="text" value={samplerName} readOnly />
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
                                        checked={microbial === true}
                                        disabled
                                    />
                                    <span className="checkmark"><b>Microbiological Tests</b> (7 - 16 Days)</span>
                                </label>
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
                                                disabled
                                            />
                                            <span className="checkmark">Standard Plate Count/ Aerobic Plate Count (Php 150.00)</span>
                                        </label>
                                        <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                            <input 
                                                type="checkbox" 
                                                name="microbiological-choices" 
                                                value="" 
                                                disabled
                                            />
                                            <span className="checkmark">Staphylococcus aureus (Php 350.00)</span>
                                        </label>
                                        <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                            <input 
                                                type="checkbox" 
                                                name="microbiological-choices" 
                                                value="" 
                                                disabled
                                            />
                                            <span className="checkmark">Salmonella sp. (Php 350.00)</span>
                                        </label>
                                        <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                            <input 
                                                type="checkbox" 
                                                name="microbiological-choices" 
                                                value="" 
                                                disabled
                                            />
                                            <span className="checkmark">Campylobacter (Php 1,500.00)</span>
                                        </label>
                                        <label className="s-c-a-r-c-e-s-n-co-t-choices-cst">
                                            <input 
                                                type="checkbox" 
                                                name="microbiological-choices" 
                                                disabled
                                            />
                                            <span className="checkmark">Culture and Sensitivity Test (Php1,500/panel)</span>
                                        </label>
                                        <div className="s-c-a-r-c-e-s-n-co-t-subchoices">
                                            <div className="s-c-a-r-c-e-s-n-co-t-s-container">
                                                <div className="s-c-a-r-c-e-s-n-co-t-s-c-text">
                                                    <p>→</p>
                                                    <p>Gram Positive AST</p>
                                                </div>
                                                <input 
                                                    type="text"
                                                    /*
                                                    value={otherPurposeTesting}
                                                    onChange={(e) => setOtherPurposeTesting(e.target.value)}
                                                    placeholder="Specify Gram Positive AST"
                                                    */
                                                    disabled
                                                />
                                            </div>
                                            <div className="s-c-a-r-c-e-s-n-co-t-s-container">
                                                <div className="s-c-a-r-c-e-s-n-co-t-s-c-text">
                                                    <p>→</p>
                                                    <p>Gram Negative AST</p>
                                                </div>
                                                <input 
                                                    type="text"
                                                    /*
                                                    value={otherPurposeTesting}
                                                    onChange={(e) => setOtherPurposeTesting(e.target.value)}
                                                    placeholder="Specify Gram Negative AST"
                                                    */
                                                    disabled
                                                />
                                            </div>
                                            </div>
                                        <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                            <input 
                                                type="checkbox" 
                                                name="microbiological-choices" 
                                                value="" 
                                                disabled
                                            />
                                            <span className="checkmark">Coliform Count (Php 150.00)</span>
                                        </label>
                                        <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                            <input 
                                                type="checkbox" 
                                                name="microbiological-choices" 
                                                value="" 
                                                disabled 
                                            />
                                            <span className="checkmark">E. Coli (Php 350.00)</span>
                                        </label>
                                        <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                            <input 
                                                type="checkbox" 
                                                name="microbiological-choices" 
                                                value="" 
                                                disabled
                                            />
                                            <span className="checkmark">E. Coli & E. Coli O157;H7 (Php 700.00)</span>
                                        </label>
                                        <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                            <input 
                                                type="checkbox" 
                                                name="microbiological-choices" 
                                                value="" 
                                                disabled
                                            />
                                            <span className="checkmark">Yeast and Molds (Php 300.00)</span>
                                        </label>
                                    </div>
                                    
                                <label className="s-c-a-r-c-e-s-n-co-choices-test">
                                    <input 
                                        type="checkbox" 
                                        name="test-selection" 
                                        checked={chem === true}
                                        disabled
                                    />
                                    <span className="checkmark" ><b>Chemical/Veterinary Drug Residue Tests</b> (5 - 6 Days)</span>
                                </label>
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
                                                disabled 
                                            />
                                            <span className="checkmark"><b>Microbial Inhibition Test</b> (5 Days)</span>
                                        </label>
                                            <div className="s-c-a-r-c-e-s-n-co-tests">
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Beta-lactams (Php 375.00)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Tetracyclines (Php 375.00)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Sulfonamides (Php 375.00)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Aminoglycosides (Php 375.00)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Macrolides (Php 375.00)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Quinolones (Php 375.00)</span>
                                                </label>
                                            </div>
                                        <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                            <input 
                                                type="checkbox" 
                                                name="chemical-container-choices" 
                                                disabled
                                            />
                                            <span className="checkmark"><b>ELISA: Enzyme-Linked ImmunoSorbent Assay</b> (6 Days)</span>
                                        </label>
                                            <div className="s-c-a-r-c-e-s-n-co-tests">
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Chloramphenicol (Php1,500)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Nitrofuran AOZ (Php1,500)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Beta-agonists (Php1,500)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Corticosteroids (Php1,500)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Olaquindox (Php1,500)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Nitrofuran AMOZ (Php1,500)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Stilbenes (Php1,500)</span>
                                                </label>
                                                <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                    <input 
                                                        type="checkbox" 
                                                        name="chemical-choices" 
                                                        value="" 
                                                        disabled
                                                    />
                                                    <span className="checkmark">Ractopamine (Php1,500)</span>
                                                </label>
                                            </div>
                                    </div>

                                <label className="s-c-a-r-c-e-s-n-co-choices-test">
                                    <input 
                                        type="checkbox" 
                                        name="test-selection" 
                                        checked={molBio === true}
                                        disabled
                                    />
                                    <span className="checkmark"><b>Molecular Biology Tests</b> (5 Days)</span>
                                </label>
                                    <div className="s-c-a-r-c-e-s-n-c-notes">
                                        <div className="s-c-a-r-c-e-s-n-c-note"> → Average sample weight is 5g at minimum
                                        </div>
                                    </div>

                                    <div className="s-c-a-r-c-e-s-n-co-tests">
                                        <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                            <input 
                                                type="checkbox" 
                                                name="molbio-container-choices" 
                                                disabled
                                            />
                                            <span className="checkmark"><b>Species Identification</b></span>
                                        </label>
                                        <div className="s-c-a-r-c-e-s-n-co-tests">
                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                <input 
                                                    type="checkbox" 
                                                    name="molbio-choices" 
                                                    value="" 
                                                    disabled
                                                />
                                                <span className="checkmark">Dog (Php1,500)</span>
                                            </label>
                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                <input 
                                                    type="checkbox" 
                                                    name="molbio-choices" 
                                                    value="" 
                                                    disabled
                                                />
                                                <span className="checkmark">Cat (Php1,500)</span>
                                            </label>
                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                <input 
                                                    type="checkbox" 
                                                    name="molbio-choices" 
                                                    value="" 
                                                    disabled
                                                />
                                                <span className="checkmark">Chicken (Php1,500)</span>
                                            </label>
                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                <input 
                                                    type="checkbox" 
                                                    name="molbio-choices" 
                                                    value="" 
                                                    disabled
                                                />
                                                <span className="checkmark">Buffalo (Php1,500)</span>
                                            </label>
                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                <input 
                                                    type="checkbox" 
                                                    name="molbio-choices" 
                                                    value="" 
                                                    disabled
                                                />
                                                <span className="checkmark">Cattle (Php1,500)</span>
                                            </label>
                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                <input 
                                                    type="checkbox" 
                                                    name="molbio-choices" 
                                                    value="" 
                                                    disabled
                                                />
                                                <span className="checkmark">Horse (Php1,500)</span>
                                            </label>
                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                <input 
                                                    type="checkbox" 
                                                    name="molbio-choices" 
                                                    value="" 
                                                    disabled
                                                />
                                                <span className="checkmark">Goat (Php1,500)</span>
                                            </label>
                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                <input 
                                                    type="checkbox" 
                                                    name="molbio-choices" 
                                                    value="" 
                                                    disabled
                                                />
                                                <span className="checkmark">Sheep (Php1,500)</span>
                                            </label>
                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                <input 
                                                    type="checkbox" 
                                                    name="molbio-choices" 
                                                    value="" 
                                                    disabled
                                                />
                                                <span className="checkmark">Swine (Php1,500)</span>
                                            </label>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className='request-details-button'>
                            <button className="approve-review-text-button" onClick={handleApprove}>
                                Approve
                            </button>
                            <button className="request-additional-information-review-text-button" onClick={handleRequestAdditionalInformation}>
                                Request Additional Information
                            </button>
                            <button className="reject-review-text-button" onClick={handleReject}>
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>         
        </div> 
    );
}

export default RequestDetails;
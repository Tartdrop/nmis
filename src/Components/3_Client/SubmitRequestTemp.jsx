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
    const [sampleTypeDescription, setSampleTypeDescription] = useState("");
    const [lotBatchNo, setLotBatchNo] = useState("");
    const [sampleSource, setSampleSource] = useState("");
    const [productionDate, setProductionDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [samplingDate, setSamplingDate] = useState("");
    const [samplerName, setSamplerName] = useState("");
    const [testingPurpose, setTestingPurpose] = useState(""); // Define testing purpose
    const [testSelections, setTestSelections] = useState([]); // Define test selections

    const [clientDetails, setClientDetails] = useState({
        username: '',
        contactNumber: '',
        email: '',
        companyName: '',
        ltoNumber: '',  // Define the missing fields here
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
        // Check if all required fields are filled
        if (!clientDetails.username || !clientDetails.contactNumber || !clientDetails.email || !clientDetails.companyName || !sampleTypeDescription) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!testingPurpose || testingPurpose === "") {
            alert("Please select a valid Testing Purpose.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8080/requests/submitrequest/${userId}`, {  // Updated endpoint to match your controller
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    // Map the request data according to the server's expected format
                    representativeName: clientDetails.username,          // Representative name
                    contactNumber: clientDetails.contactNumber,          // Contact number
                    emailAddress: clientDetails.email,                   // Email address
                    companyName: clientDetails.companyName,              // Company name
                    clientClassification: clientDetails.classification,  // Client classification
                    ltoNumber: clientDetails.ltoNumber,                  // LTO number (license to operate)
    
                    // Sample Information
                    sampleTypeDescription,  // Description of the sample type
                    lotBatchNo,             // Lot or batch number
                    sampleSource,           // Source of the sample
                    productionDate,         // Production date of the sample
                    expiryDate,             // Expiry date of the sample
                    samplingDate,           // Sampling date of the sample
                    samplerName,            // Name of the sampler
    
                    // Purpose of Testing (ENUM)
                    testingPurpose,         // Purpose of testing, matches ENUM on server side
    
                    // Test selections (list)
                    testSelections,         // List of selected tests
    
                    // The request status is automatically set to PENDING_REVIEW on the server, so no need to pass it.
    
                    submissionDate: new Date().toISOString(),  // Use the current date as submission date
                    createdAt: new Date().toISOString(),       // Created timestamp
                    updatedAt: new Date().toISOString(),       // Updated timestamp
                })
            });
    
            // Check if the response is not successful
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Request submission failed.");
            }
    
            // If successful, alert the user and navigate to the dashboard
            alert("Request submitted successfully!");
            navigate(`/home/client/${userId}`);  // Adjust navigation logic if necessary
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);  // Display the error message to the user
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
                            <div className="s-c-a-r-c-e-s-n-purposeoftesting">
                                <label className="s-c-a-r-c-e-s-n-choices">
                                    <input type="radio" name="purpose-choices" value="Monitoring" onChange={(e) => setTestingPurpose(e.target.value)} />
                                    <span className="checkmark">NMIS Monitoring Program</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-choices">
                                    <input type="radio" name="purpose-choices" value="Local_Trade" onChange={(e) => setTestingPurpose(e.target.value)} />
                                    <span className="checkmark">For Local Trade</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-choices">
                                    <input type="radio" name="purpose-choices" value="Imported" onChange={(e) => setTestingPurpose(e.target.value)} />
                                    <span className="checkmark">Imported (COMI Issuance)</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-choices">
                                    <input type="radio" name="purpose-choices" value="Export" onChange={(e) => setTestingPurpose(e.target.value)} />
                                    <span className="checkmark">Export (OMIC Issuance)</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-choices">
                                    <input type="radio" name="purpose-choices" value="Complaint" onChange={(e) => setTestingPurpose(e.target.value)} />
                                    <span className="checkmark">Complaint</span>
                                </label>
                                <div className="s-c-a-r-c-e-s-n-others">
                                    <label className="s-c-a-r-c-e-s-n-o-choices">
                                        <input 
                                            type="radio" 
                                            name="purpose-choices" 
                                            value="Others" 
                                            onChange={(e) => setTestingPurpose(e.target.value)} 
                                        />
                                        <span className="checkmark">Others</span>
                                    </label>
                                    {testingPurpose === "Others" && (
                                        <div className="s-c-a-r-c-e-s-n-pot-o-input">
                                            →
                                            <input 
                                                type="text"
                                                value={otherPurposeTesting}
                                                onChange={(e) => setOtherPurposeTesting(e.target.value)}
                                                placeholder="Specify other purpose"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">2. Sample Category</div>
                            <div className="s-c-a-r-c-e-s-n-samplecategory">
                                <label className="s-c-a-r-c-e-s-n-choices">
                                    <input type="radio" name="sample-category-choices" value="Walk-in" onChange={(e) => setSampleCategory(e.target.value)} />
                                    <span className="checkmark">Walk-in</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-choices">
                                    <input type="radio" name="sample-category-choices" value="Monitoring" onChange={(e) => setSampleCategory(e.target.value)} />
                                    <span className="checkmark">Monitoring</span>
                                </label>
                            </div>
                        </div>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">3. Sample Information</div>
                        </div>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">4. Test Selection</div>
                        </div>
                    </div>
                </div>
            </div>         
        </div> 
    );
};

export default Submit;

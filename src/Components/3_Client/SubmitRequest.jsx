import React, { useState, useEffect } from 'react';
import './Submit.css';
import { useNavigate, useParams } from 'react-router-dom'; 
import blue_line_icon from '../Assets/BlueLine.png';


const Submit = () => {
    const { userId } = useParams();
    const [sampleCategory, setSampleCategory] = useState('');
    const [otherPurposeTesting, setOtherPurposeTesting] = useState('');


    const navigate = useNavigate();
    // State for client details
    
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

    /*
    useEffect(() => {
        const clientId = localStorage.getItem('clientId');
        if (clientId) { // Check if clientId exists
            axios.get(`http://localhost:8080/clientview/${clientId}`)
                .then(response => {
                    setClientDetails(response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.error("Error fetching client data:", error);
                    // Optionally, you can also handle errors here, e.g., show an alert or set error state
                });
        }
    }, []);
    */

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
        <div className="submit-all-container">
        <div className='submit-container'>
            <div className='submit-title'>Submit a Request</div>
                <div className="submit-overflow">
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
                                <div className='samplecategory'>
                                    <div className='sample-category-title'>
                                        Sample Category
                                    </div>
                                    <div className="tmp-cont">
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
                                </div>
                                <div className='sampleinfo'>
                                    <div className='sample-info-title'>
                                        Sample Information
                                    </div>
                                        <div className="tmp-cont">
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
                                </div>
                            </div>
                            <div className='submit-column'>
                                <div className='purposeoftesting'>
                                    <div className='purpose-title'>
                                        Purpose of Testing
                                    </div>
                                        <div className="tmp-cont">
                                            <div className="spacer-top">.</div>
                                            <div className="submit-show">
                                                <label className="purposeoftesting_choices">
                                                    <input type="radio" name="purpose-choices" value="Monitoring" onChange={(e) => setTestingPurpose(e.target.value)} />
                                                    <span className="checkmark"></span>
                                                    Monitoring
                                                </label>
                                                <label className="purposeoftesting_choices">
                                                    <input type="radio" name="purpose-choices" value="Local_Trade" onChange={(e) => setTestingPurpose(e.target.value)} />
                                                    <span className="checkmark"></span>
                                                    Local Trade
                                                </label>
                                                <label className="purposeoftesting_choices">
                                                    <input type="radio" name="purpose-choices" value="Imported" onChange={(e) => setTestingPurpose(e.target.value)} />
                                                    <span className="checkmark"></span>
                                                    Imported
                                                </label>
                                                <label className="purposeoftesting_choices">
                                                    <input type="radio" name="purpose-choices" value="Export" onChange={(e) => setTestingPurpose(e.target.value)} />
                                                    <span className="checkmark"></span>
                                                    Export
                                                </label>
                                                <label className="purposeoftesting_choices">
                                                    <input type="radio" name="purpose-choices" value="Complaint" onChange={(e) => setTestingPurpose(e.target.value)} />
                                                    <span className="checkmark"></span>
                                                    Complaint
                                                </label>
                                                <label className="purposeoftesting_choices">
                                                    <input type="radio" name="purpose-choices" value="Others" onChange={(e) => setTestingPurpose(e.target.value)} />
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
                                </div>

                                <div className='testselection'>
                                    <div className='test-title'>
                                        Test Selection
                                    </div>
                                        <main className="tmp-cont">
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
                                </div>
                            </div>
                        </div>
                        <div className='submit-button' onClick={handleSubmitRequest}>
                            <button className="submit-text-button">Submit</button>
                        </div>
                    </div>
                </div>
        </div>
    </div> 
    );
};

export default Submit;

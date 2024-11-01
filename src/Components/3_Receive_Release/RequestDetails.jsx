import React, { useState, useEffect } from 'react';
import './RequestDetails.css';
import { useNavigate, useParams } from 'react-router-dom'; 
import blue_line_icon from '../Assets/BlueLine.png';

const SubmitReview = () => {
    const { userId, requestId } = useParams();
    const [sampleCategory, setSampleCategory] = useState('');
    const [otherPurposeTesting, setOtherPurposeTesting] = useState('');

    const [sampleTypeDescription, setSampleTypeDescription] = useState("");
    const [lotBatchNo, setLotBatchNo] = useState("");
    const [sampleSource, setSampleSource] = useState("");
    const [productionDate, setProductionDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [samplingDate, setSamplingDate] = useState("");
    const [samplerName, setSamplerName] = useState("");
    const [testingPurpose, setTestingPurpose] = useState("");
    const [testSelections, setTestSelections] = useState([]);
    const [requestData, setRequestData] = useState(null);

    useEffect(() => {
        const fetchRequestData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/requests/trackrequest/${requestId}`);
                if (response.ok) {
                    const data = await response.json();
                    setRequestData(data);
                    setSampleCategory(data.sampleCategory || '');
                    setSampleTypeDescription(data.sampleTypeDescription || '');
                    setLotBatchNo(data.lotBatchNo || '');
                    setSampleSource(data.sampleSource || '');
                    setProductionDate(data.productionDate || '');
                    setExpiryDate(data.expiryDate || '');
                    setSamplingDate(data.samplingDate || '');
                    setSamplerName(data.samplerName || '');
                    setTestingPurpose(data.testingPurpose || '');
                    setOtherPurposeTesting(data.otherPurposeTesting || '');
                    setTestSelections(data.testSelections || []);
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

    const handleApprove = () => {
        navigate(`/approved/${requestId}`);
    };

    const handleRequestAdditionalInformation = () => {
        navigate("/request-additional-info");
    };

    const handleReject = () => {
        navigate(`/home/staff/${userId}`);
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
                                    <input type="text" value={requestData?.representativeName || ''} readOnly />
                                </div>
                                <div className='submit-1st-container-column-row-column-2'>
                                    Contact Number
                                    <input type="text" value={requestData?.contactNumber || ''} readOnly />
                                </div>
                                <div className='submit-1st-container-column-row-column-3'>
                                    Email Address
                                    <input type="text" value={requestData?.emailAddress || ''} readOnly />
                                </div>
                                <div className='submit-1st-container-column-row-column-4'>
                                    Company Name
                                    <input type="text" value={requestData?.companyName || ''} readOnly />
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
                                        <img src={blue_line_icon} alt="blue line" />
                                        <div className="spacer-top">.</div>
                                        <div className="submit-show">
                                            <label className="samplecategory_choices">
                                                <input
                                                    type="radio"
                                                    name="sample-category-choices"
                                                    value="Walk-in"
                                                    checked={sampleCategory === 'Walk-in'}
                                                    readOnly
                                                />
                                                <span className="checkmark"></span>
                                                Walk-in
                                            </label>
                                            <label className="samplecategory_choices">
                                                <input
                                                    type="radio"
                                                    name="sample-category-choices"
                                                    value="Monitoring"
                                                    checked={sampleCategory === 'Monitoring'}
                                                    readOnly
                                                />
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
                                        <img src={blue_line_icon} alt="blue line" />
                                        <div className="spacer-top">.</div>
                                        <div className="submit-show">
                                            <div className='sample-rows'>
                                                <div className='sample-row'>
                                                    <div>Sample Type/Description :</div>
                                                    <input type="text" value={sampleTypeDescription} readOnly />
                                                </div>
                                                <div className='sample-row'>
                                                    <div>Lot/Batch Number :</div>
                                                    <input type="text" value={lotBatchNo} readOnly />
                                                </div>
                                                <div className='sample-row'>
                                                    <div>Sample Source :</div>
                                                    <input type="text" value={sampleSource} readOnly />
                                                </div>
                                                <div className='sample-row'>
                                                    <div>Production Date :</div>
                                                    <input type="date" value={productionDate} readOnly />
                                                </div>
                                                <div className='sample-row'>
                                                    <div>Expiry Date :</div>
                                                    <input type="date" value={expiryDate} readOnly />
                                                </div>
                                                <div className='sample-row'>
                                                    <div>Sampling Date :</div>
                                                    <input type="date" value={samplingDate} readOnly />
                                                </div>
                                                <div className='sample-row'>
                                                    <div>Sampler Name :</div>
                                                    <input type="text" value={samplerName} readOnly />
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
                                        <img src={blue_line_icon} alt="blue line" />
                                        <div className="spacer-top">.</div>
                                        <div className="submit-show">
                                            <label className="purposeoftesting_choices">
                                                <input
                                                    type="radio"
                                                    name="purpose-choices"
                                                    value="Monitoring"
                                                    checked={testingPurpose === 'Monitoring'}
                                                    readOnly
                                                />
                                                <span className="checkmark"></span>
                                                Monitoring
                                            </label>
                                            <label className="purposeoftesting_choices">
                                                <input
                                                    type="radio"
                                                    name="purpose-choices"
                                                    value="Local_Trade"
                                                    checked={testingPurpose === 'Local_Trade'}
                                                    readOnly
                                                />
                                                <span className="checkmark"></span>
                                                Local Trade
                                            </label>
                                            <label className="purposeoftesting_choices">
                                                <input
                                                    type="radio"
                                                    name="purpose-choices"
                                                    value="Imported"
                                                    checked={testingPurpose === 'Imported'}
                                                    readOnly
                                                />
                                                <span className="checkmark"></span>
                                                Imported
                                            </label>
                                            <label className="purposeoftesting_choices">
                                                <input
                                                    type="radio"
                                                    name="purpose-choices"
                                                    value="Export"
                                                    checked={testingPurpose === 'Export'}
                                                    readOnly
                                                />
                                                <span className="checkmark"></span>
                                                Export
                                            </label>
                                            <label className="purposeoftesting_choices">
                                                <input
                                                    type="radio"
                                                    name="purpose-choices"
                                                    value="Complaint"
                                                    checked={testingPurpose === 'Complaint'}
                                                    readOnly
                                                />
                                                <span className="checkmark"></span>
                                                Complaint
                                            </label>
                                            <label className="purposeoftesting_choices">
                                                <input
                                                    type="radio"
                                                    name="purpose-choices"
                                                    value="Others"
                                                    checked={testingPurpose === 'Others'}
                                                    readOnly
                                                />
                                                <span className="checkmark"></span>
                                                Others:
                                                <input
                                                    type="text"
                                                    value={otherPurposeTesting}
                                                    readOnly
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
                                        <img src={blue_line_icon} alt="blue line" />
                                        <div className="spacer-top">.</div>
                                        <div className="submit-show">
                                            <label className="test-selection-choice">
                                                <input
                                                    type="checkbox"
                                                    value="Test 1"
                                                    checked={testSelections.includes("Test 1")}
                                                    readOnly
                                                />
                                                Test 1
                                            </label>
                                            <label className="test-selection-choice">
                                                <input
                                                    type="checkbox"
                                                    value="Test 2"
                                                    checked={testSelections.includes("Test 2")}
                                                    readOnly
                                                />
                                                Test 2
                                            </label>
                                        </div>
                                        <div className="spacer">.</div>
                                    </main>
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

export default SubmitReview;
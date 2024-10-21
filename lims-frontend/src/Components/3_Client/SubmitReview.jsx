import React, { useState } from 'react';
import './Submit.css';
import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom'; 

import blue_line_icon from '../Assets/BlueLine.png';
import back_button from '../Assets/BackButton.png';
import dropdown_icon from '../Assets/DropDown.png';

Userfront.init("jb7ywq8b");

const SubmitReview = () => {
    const [dropdownPurpose, setDropdownPurpose] = useState(false);
    const [dropdownTest, setDropdownTest] = useState(false);
    const [dropdownSample, setDropdownSample] = useState(false);
    const [dropdownSampleInfo, setDropdownSampleInfo] = useState(false);
    const [purposeTesting, setPurposeTesting] = useState('');
    const [sampleCategory, setSampleCategory] = useState('');
    const [, setOtherPurposeTesting] = useState('');

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

    const handleBackToHome = () => {
        navigate("/");
    };

    return (
        <div className="submit-all-container">
            <div className='submit-container'>
                <div className='submit-title'>Submit a Request</div>
                <div className="submit-1st-container">
                    <div className='submit-1st-container-column'>
                        <div className='submit-1st-container-column-row'>
                            <div className='submit-1st-container-column-row-column-1'>
                                Representative Name
                                <input type="text" value="A*******r J*****n A M*******d"/>
                            </div>
                            <div className='submit-1st-container-column-row-column-2'>
                                Contact Number
                                <input type="text" value="0999 999 9999"/>
                            </div>
                            <div className='submit-1st-container-column-row-column-3'>
                                Email Address
                                <input type="text" value="sample_email123@example.com.ph"/>
                            </div>
                            <div className='submit-1st-container-column-row-column-4'>
                                Company Name
                                <input type="text" value="University of the Philippines Manila"/>
                            </div>
                        </div>
                    </div>
                    <p className='note'>
                            * these information are prefilled with your logged-in details
                    </p>
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
                                        <img src={blue_line_icon} alt="blue line"/>
                                        <div className="spacer-top">.</div>
                                        <div className="submit-show">
                                            <label class="samplecategory_choices">
                                                <input type="radio" name="sample-category-choices" value={sampleCategory} onChange={(e) => setSampleCategory(e.target.value)} checked="checked"/>
                                                <span class="checkmark"></span>
                                                Walk-in
                                            </label>
                                            <label class="samplecategory_choices">
                                                <input type="radio" name="sample-category-choices" value={sampleCategory} onChange={(e) => setSampleCategory(e.target.value)}/>
                                                <span class="checkmark"></span>
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
                                        <img src={blue_line_icon} alt="blue line"/>
                                        <div className="spacer-top">.</div>
                                        <div className="submit-show">
                                            <div className='sample-rows'>
                                                <div className='sample-row'>
                                                    <div>Sample Type/Description :</div>
                                                    <input type="text" value="filled information"/>
                                                </div>
                                                <div className='sample-row'>
                                                    <div>Lot/Batch Number :</div>
                                                    <input type="text" value="filled information"/>
                                                </div>
                                                <div className='sample-row'>
                                                    <div>Sample Source :</div>
                                                    <input type="text" value="filled information"/>
                                                </div>
                                                <div className='sample-row'>
                                                    <div>Production Date :</div>
                                                    <input type="text" value="filled information"/>
                                                </div>
                                                <div className='sample-row'>
                                                    <div>Expiry Date :</div>
                                                    <input type="text" value="filled information"/>
                                                </div>
                                                <div className='sample-row'>
                                                    <div>Sampling Date :</div>
                                                    <input type="text" value="filled information"/>
                                                </div>
                                                <div className='sample-row'>
                                                    <div>Sampler Name :</div>
                                                    <input type="text" value="filled information"/>
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
                                        <img src={blue_line_icon} alt="blue line"/>
                                        <div className="spacer-top">.</div>
                                        <div className="submit-show">
                                            <label class="purposeoftesting_choices">
                                                <input type="radio" name="purpose-choices" value={purposeTesting} onChange={(e) => setPurposeTesting(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Monitoring
                                            </label>
                                            <label class="purposeoftesting_choices">
                                                <input type="radio" name="purpose-choices" value={purposeTesting} onChange={(e) => setPurposeTesting(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Local Trade
                                            </label>
                                            <label class="purposeoftesting_choices">
                                                <input type="radio" name="purpose-choices" value={purposeTesting} onChange={(e) => setPurposeTesting(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Imported
                                            </label>
                                            <label class="purposeoftesting_choices">
                                                <input type="radio" name="purpose-choices" value={purposeTesting} onChange={(e) => setPurposeTesting(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Export
                                            </label>
                                            <label class="purposeoftesting_choices">
                                                <input type="radio" name="purpose-choices" value={purposeTesting} onChange={(e) => setPurposeTesting(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Complaint
                                            </label>
                                            <label class="purposeoftesting_choices">
                                                <input type="radio" name="purpose-choices" value={purposeTesting} onChange={(e) => setPurposeTesting(e.target.value)} checked="checked"/>
                                                <span class="checkmark"></span>
                                                Others:
                                                <input 
                                                    type="text"
                                                    //value={otherPurposeTesting}
                                                    onChange={(e) => setOtherPurposeTesting(e.target.value)}
                                                    value="filled information"
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
                                        <img src={blue_line_icon} alt="blue line"/>
                                        <div className="spacer-top">.</div>
                                        <div className="submit-show">
                                            Test selection content here<br/>
                                            Test selection content here<br/>
                                            Test selection content here<br/>
                                            Test selection content here<br/>
                                            Test selection content here<br/>
                                            Test selection content here<br/>
                                            Test selection content here<br/>
                                        </div>
                                        <div className="spacer">.</div>
                                    </main>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='submit-button' onClick={handleBackToHome}>
                        <button className="submit-review-text-button">
                            <img src={back_button} alt='back'/>
                            Home Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubmitReview;
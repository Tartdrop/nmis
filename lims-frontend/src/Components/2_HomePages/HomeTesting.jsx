import './Home.css';
import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom';
import white_logo_icon from '../Assets/WhiteLogo.png';

import testing_icon from '../Assets/TestingPage.png';
import test_icon from '../Assets/TestResults.png';
import database_icon from '../Assets/Database.png';

Userfront.init("jb7ywq8b");

const HomeTesting = () => {

  const navigate = useNavigate();
  
  const handleForTestingPage = () => {
    navigate("/for-testing")
  };
  const handleTestResults = () => {
    navigate("/test-results")
  };
  const handleDatabase = () => {
    navigate("/testing-database")
  };

  return (
    <div className="home-client">
      <main className="main-content">
        <div className='web-title'>
          <div className="web-title-container">
            <img src={white_logo_icon} alt="white logo icon"/>
            <div className="web-titles">
              <p className="N">N</p>
              <p className="ational">ational</p>
              <p className="M">M</p>
              <p className="ational">eat</p>
              <p className="I">I</p>
              <p className="nspection">nspection</p>
              <p className="S">S</p>
              <p className="ervice">ervice</p>
            </div>
          </div>
        </div>

        <div className="announcement-box">
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
        </div>

        <div className="options-container" >
          <div className="option-card" onClick={handleForTestingPage}>
            <img src={testing_icon} alt="For Testing Z" />
            <h2>For Testing</h2>
          </div>
          <div className="option-card" onClick={handleTestResults}>
            <img src={test_icon} alt="Test Results" />
            <h2>Test Results</h2>
          </div>
          <div className="option-card" onClick={handleDatabase}>
            <img src={database_icon} alt="Database" />
            <h2>Database</h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeTesting;
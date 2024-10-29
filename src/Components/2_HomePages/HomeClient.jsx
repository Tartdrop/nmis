import './Home.css';
import Userfront from "@userfront/core";
import { useNavigate, useParams } from 'react-router-dom';
import white_logo_icon from '../Assets/WhiteLogo.png';

import submit_icon from '../Assets/Submit.png';
import track_icon from '../Assets/Track.png';
import guide_icon from '../Assets/Guide.png';

Userfront.init("jb7ywq8b");

const HomeClient = () => {
  const { userId } = useParams();

  const navigate = useNavigate();
  
  const handleSubmit = () => {
    navigate(`/submit-a-request/${userId}`);
  };
  const handleTrack = () => {
    navigate("/track-my-request")
  };
  const handleGuide = () => {
    navigate("/guide")
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
          <h2>Welcome to the Client Portal!</h2>
        </div>

        <div className="options-container">
          <div className="option-card" onClick={handleSubmit}>
            <img src={submit_icon} alt="Submit Request" />
            <h2>Submit a Request</h2>
          </div>
          <div className="option-card" onClick={handleTrack}>
            <img src={track_icon} alt="Track My Request" />
            <h2>Track My Request</h2>
          </div>
          <div className="option-card" onClick={handleGuide}>
            <img src={guide_icon} alt="Guide" />
            <h2>Guide</h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeClient;
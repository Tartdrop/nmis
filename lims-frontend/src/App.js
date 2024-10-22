import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/0_Head_Foot_BG/Header"; // Make sure to import the Header component
import PageLogin from "./PageLogin";
import PageForget from "./PageForget";
import PageRegister from "./PageRegister";
import PageTFA from "./PageTFA";
import PageForgotES from "./PageEmailSent";
import PageForgotNIS from "./PageNotInSystem";
import PageRegisterTY from "./PageThankYou";
import PageHomeClient from "./PageHomeClient";
import PageHomeRecRel from "./PageHomeRecRel";
import PageHomeTesting from "./PageHomeTesting";
import PageSubmitRequest from "./PageSubmitRequest";
import PageSubmitRequestReview from "./PageSubmitRequestReview";
import PageTrackMyRequest from "./PageTrackMyRequest";
import PagePendingRequest from "./PagePendingRequest";
import PageForReleaseList from "./PageForReleaseList";
import PageShowControlNumber from "./PageShowControlNumber";
import PageRequestAddInfo from "./PageRequestAddInfo";
import PageRequestDetails from "./PageRequestDetails";
import PageViewDatabaseT from "./PageViewDatabaseT";
import PageViewDatabaseRR from "./PageViewDatabaseRR";
import PageForTesting from "./PageForTesting";
import PageGuide from "./PageGuide";
import PageTestResults from "./PageTestResults";
import PageTFAVerify from "./PageTFA-Verify-Reg";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log("handleLogin successful"); 
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Header onLogout={handleLogout} />
      <Routes>
            <Route path="/register" element={<PageRegister />} />
            <Route path="/forget" element={<PageForget />} />
            <Route path="/tfa" element={<PageTFA />} />
            <Route path="/email-sent" element={<PageForgotES />} />
            <Route path="/not-in-system" element={<PageForgotNIS />} />
            <Route path="/registered" element={<PageRegisterTY />} />
            <Route path="/login" element={<PageLogin onLogin={handleLogin} />} />
            <Route path="/tfaverify" element={<PageTFAVerify />} />

            <Route path="/home/client/:userId" element={<PageHomeClient />} />
            <Route path="/submit-a-request" element={<PageSubmitRequest />} />
            <Route path="/submit-review" element={<PageSubmitRequestReview />} />
            <Route path="/track-my-request" element={<PageTrackMyRequest />} />
            <Route path="/guide" element={<PageGuide />} />

            <Route path="/home/staff/:userId" element={<PageHomeRecRel />} />
            <Route path="/pending-requests" element={<PagePendingRequest />} />
            <Route path="/request-details" element={<PageRequestDetails />} />
            <Route path="/show-control-number" element={<PageShowControlNumber />} />
            <Route path="/request-add-info" element={<PageRequestAddInfo />} />
            <Route path="/for-release" element={<PageForReleaseList />} />
            <Route path="/receive-release-database" element={<PageViewDatabaseRR />} />

            <Route path="/home/tester/:userId" element={<PageHomeTesting />} />
            <Route path="/for-testing" element={<PageForTesting />} />
            <Route path="/test-results" element={<PageTestResults />} />
            <Route path="/testing-database" element={<PageViewDatabaseT />} />
            <Route path="*" element={<PageLogin />} />

      {/* <Route path="*" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />  */}
      </Routes>
    </>
  );

  /*
  return (
    <>
      <Header onLogout={handleLogout} />
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/register" element={<PageRegister />} />
            <Route path="/forget" element={<PageForget />} />
            <Route path="/tfa" element={<PageTFA />} />
            <Route path="/email-sent" element={<PageForgotES />} />
            <Route path="/not-in-system" element={<PageForgotNIS />} />
            <Route path="/registered" element={<PageRegisterTY />} />
            <Route path="/login" element={<PageLogin onLogin={handleLogin} />} />
            <Route path="/tfaverify" element={<PageTFAVerify />} />
          </>
        )}

        {isLoggedIn && (
            <>
              <Route path="/home-client" element={<PageHomeClient />} />
              <Route path="/submit-a-request" element={<PageSubmitRequest />} />
              <Route path="/submit-review" element={<PageSubmitRequestReview />} />
              <Route path="/track-my-request" element={<PageTrackMyRequest />} />
              <Route path="/guide" element={<PageGuide />} />


              <Route path="/home-receive-release" element={<PageHomeRecRel />} />
              <Route path="/pending-requests" element={<PagePendingRequest />} />
              <Route path="/request-details" element={<PageRequestDetails />} />
              <Route path="/show-control-number" element={<PageShowControlNumber />} />
              <Route path="/request-add-info" element={<PageRequestAddInfo />} />
              <Route path="/for-release" element={<PageForReleaseList />} />
              <Route path="/receive-release-database" element={<PageViewDatabaseRR />} />

              <Route path="/home-testing" element={<PageHomeTesting />} />
              <Route path="/for-testing" element={<PageForTesting />} />
              <Route path="/test-results" element={<PageTestResults />} />
              <Route path="/testing-database" element={<PageViewDatabaseT />} />
            </>
          )}

      <Route path="*" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );*/
}

export default App;
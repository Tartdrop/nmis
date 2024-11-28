import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./Components/0_Head_Foot_BG/Header";
import PageLogin from "./PageLogin";
import PageForget from "./PageForget";
import PageRegister from "./PageRegister";
import PageTFA from "./PageTFA";
import PageForgotES from "./PageEmailSent";
import PageForgotNIS from "./PageNotInSystem";
import PageRegisterTY from "./PageThankYou";
import PageHomeClient from "./PageHomeClient";
import PageHomeRecRel from "./PageHomeRecRel";
    import PageHomeTestingChem from "./PageHomeTestingChem";
    import PageHomeTestingMicrobio from "./PageHomeTestingMicrobio";
    import PageHomeTestingMolBio from "./PageHomeTestingMolBio";
/* import PageSubmitRequest from "./PageSubmitRequest"; */
import PageSubmitRequestNew from "./PageSubmitRequestNew";
import PageSubmitRequestReview from "./PageSubmitRequestReview";
import PageTrackMyRequest from "./PageTrackMyRequest";
import PagePendingRequest from "./PagePendingRequest";
import PageForReleaseList from "./PageForReleaseList";
import PageShowControlNumber from "./PageShowControlNumber";
import PageRequestAddInfo from "./PageRequestAddInfo";
import PageRequestDetailsNew from "./PageRequestDetailsNew";
    import PageViewDatabaseTChem from "./PageViewDatabaseTChem";
    import PageViewDatabaseTMicrobio from "./PageViewDatabaseTMicrobio";
    import PageViewDatabaseTMolBio from "./PageViewDatabaseTMolBio";
import PageViewDatabaseRR from "./PageViewDatabaseRR";
    import PageForTestingChem from "./PageForTestingChem";
    import PageForTestingMicrobio from "./PageForTestingMicrobio";
    import PageForTestingMolBio from "./PageForTestingMolBio";
import PageGuide from "./PageGuide";
    import PageTestResultsChem from "./PageTestResultsChem";
    import PageTestResultsMicrobio from "./PageTestResultsMicrobio";
    import PageTestResultsMolBio from "./PageTestResultsMolBio";
import PageTFAVerify from "./PageTFA-Verify-Reg";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { user } from "@userfront/core";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedUserType = localStorage.getItem("userType");

        if (storedUserId && storedUserType) {
            setIsLoggedIn(true);
            setUserId(storedUserId);
            setUserType(storedUserType);
        } else {
            setIsLoggedIn(false);  // Ensure isLoggedIn is set to false if no user data is found
        }
    }, []);

    const handleLogin = (id, type) => {
        setIsLoggedIn(true);
        setUserId(id);
        setUserType(type);
        localStorage.setItem("userId", id);
        localStorage.setItem("userType", type);
        navigate(`/home/${type}/${id}`);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserId(null);
        setUserType(null);
        localStorage.clear();
        navigate("/login");
    };

    return (
        <>
            <Header onLogout={handleLogout} userId={userId} userType={userType} />
            <Routes>
                {/* Public Routes - Accessible only when logged out */}
                <Route 
                    path="/login" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                           <PageLogin />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/forget" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                            <PageForget />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/register" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                            <PageRegister />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/tfa/:username" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                            <PageTFA onLogin={handleLogin} />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/email-sent" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                            <PageForgotES />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/not-in-system" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                            <PageForgotNIS />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/registered" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                            <PageRegisterTY />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/tfaverify" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                            <PageTFAVerify />
                        </PublicRoute>
                    } 
                />

                {/* Protected Routes - Accessible only when logged in */}
                <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}/>}>
                    {/* Client Routes */}
                    <Route path="/home/client/:userId" element={<PageHomeClient />} />
                    <Route path="/submit-a-request/:userId" element={<PageSubmitRequestNew />} />
                    <Route path="/submit-review/:userId" element={<PageSubmitRequestReview />} />
                    <Route path="/track-my-request/:userId" element={<PageTrackMyRequest />} />
                    <Route path="/guide/:userId" element={<PageGuide />} />
                    
                    {/* Staff Routes */}
                    <Route path="/home/staff/:userId" element={<PageHomeRecRel />} />
                    <Route path="/pending-requests/:userId" element={<PagePendingRequest />} />
                    <Route path="/request-details/:userId/:requestId" element={<PageRequestDetailsNew />} />
                    <Route path="/approved/:userId" element={<PageShowControlNumber />} />
                    <Route path="/request-additional-info/:userId/:requestId" element={<PageRequestAddInfo />} />
                    <Route path="/for-release/:userId" element={<PageForReleaseList />} />
                    <Route path="/receive-release-database/:userId" element={<PageViewDatabaseRR />} />
                    
                    {/* Chem Tester Routes */}
                    <Route path="/home/chemtester/:userId" element={<PageHomeTestingChem />} />
                    <Route path="/for-testing-chem/:userId" element={<PageForTestingChem />} />
                    <Route path="/test-results-chem/:userId" element={<PageTestResultsChem />} />
                    <Route path="/testing-database-chem/:userId" element={<PageViewDatabaseTChem />} />

                    {/* Microbio Tester Routes */}
                    <Route path="/home/microbiotester/:userId" element={<PageHomeTestingMicrobio />} />
                    <Route path="/for-testing-microbio/:userId" element={<PageForTestingMicrobio />} />
                    <Route path="/test-results-microbio/:userId" element={<PageTestResultsMicrobio />} />
                    <Route path="/testing-database-microbio/:userId" element={<PageViewDatabaseTMicrobio />} />

                    {/* MolBio Tester Routes */}
                    <Route path="/home/molbiotester/:userId" element={<PageHomeTestingMolBio />} />
                    <Route path="/for-testing-molbio/:userId" element={<PageForTestingMolBio />} />
                    <Route path="/test-results-molbio/:userId" element={<PageTestResultsMolBio />} />
                    <Route path="/testing-database-molbio/:userId" element={<PageViewDatabaseTMolBio />} />
                </Route>

                {/* Catch-all Route */}
                <Route path="*" element={<PageLogin />} />
            </Routes>
        </>
    );
}

export default App;

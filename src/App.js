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
import PageHomeTesting from "./PageHomeTesting";
import PageSubmitRequest from "./PageSubmitRequest";
import PageSubmitRequestTemp from "./PageSubmitRequestTemp";
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

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute"; // Ensure you have a ProtectedRoute component

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
            navigate("/login");
        }
    }, [navigate]);

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
                {/* Public Routes */}
                <Route 
                    path="/login" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType}>
                            <PageLogin onLogin={handleLogin} />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/forget" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType}>
                            <PageForget />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/register" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType}>
                            <PageRegister />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/tfa" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType}>
                            <PageTFA />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/email-sent" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType}>
                            <PageForgotES />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/not-in-system" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType}>
                            <PageForgotNIS />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/registered" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType}>
                            <PageRegisterTY />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/tfaverify" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType}>
                            <PageTFAVerify />
                        </PublicRoute>
                    } 
                />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}/>}>
                    {/* Client Routes */}
                    <Route path="/home/client/:userId" element={<PageHomeClient />} />
                    <Route path="/submit-a-request/:userId" element={<PageSubmitRequest />} />
                    <Route path="/submit-a-request/tmp" element={<PageSubmitRequestTemp />} />
                    <Route path="/submit-review/:userId" element={<PageSubmitRequestReview />} />
                    <Route path="/track-my-request/:userId" element={<PageTrackMyRequest />} />
                    <Route path="/guide/:userId" element={<PageGuide />} />
                    
                    {/* Staff Routes */}
                    <Route path="/home/staff/:userId" element={<PageHomeRecRel />} />
                    <Route path="/pending-requests/:userId" element={<PagePendingRequest />} />
                    <Route path="/request-details/:userId/:requestId" element={<PageRequestDetails />} />
                    <Route path="/approved/:userId" element={<PageShowControlNumber />} />
                    <Route path="/request-additional-info/:userId" element={<PageRequestAddInfo />} />
                    <Route path="/for-release/:userId" element={<PageForReleaseList />} />
                    <Route path="/receive-release-database/:userId" element={<PageViewDatabaseRR />} />
                    
                    {/* Tester Routes */}
                    <Route path="/home/tester/:userId" element={<PageHomeTesting />} />
                    <Route path="/for-testing/:userId" element={<PageForTesting />} />
                    <Route path="/test-results/:userId" element={<PageTestResults />} />
                    <Route path="/testing-database/:userId" element={<PageViewDatabaseT />} />
                </Route>

                {/* Catch-all Route */}
                <Route path="*" element={<PageLogin onLogin={handleLogin} />} />
            </Routes>
        </>
    );
}

export default App;

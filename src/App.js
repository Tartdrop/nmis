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

    const redirectToHome = () => {
        if (userType === "client") navigate(`/home/client/${userId}`);
        else if (userType === "staff") navigate(`/home/staff/${userId}`);
        else if (userType === "tester") navigate(`/home/tester/${userId}`);
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

                {/* Client Routes */}
                <Route
                    path="/home/client/:userId"
                    element={isLoggedIn && userType === "client" ? <PageHomeClient /> : redirectToHome()}
                />
                <Route
                    path="/submit-a-request/:userId"
                    element={isLoggedIn && userType === "client" ? <PageSubmitRequest /> : redirectToHome()}
                />
                <Route
                    path="/submit-a-request/tmp"
                    element={isLoggedIn && userType === "client" ? <PageSubmitRequestTemp /> : redirectToHome()}
                />
                <Route
                    path="/submit-review/:userId"
                    element={isLoggedIn && userType === "client" ? <PageSubmitRequestReview /> : redirectToHome()}
                />
                <Route
                    path="/track-my-request/:userId"
                    element={isLoggedIn && userType === "client" ? <PageTrackMyRequest /> : redirectToHome()}
                />
                <Route
                    path="/guide/:userId"
                    element={isLoggedIn && userType === "client" ? <PageGuide /> : redirectToHome()}
                />

                {/* Staff Routes */}
                <Route
                    path="/home/staff/:userId"
                    element={isLoggedIn && userType === "staff" ? <PageHomeRecRel /> : redirectToHome()}
                />
                <Route
                    path="/pending-requests/:userId"
                    element={isLoggedIn && userType === "staff" ? <PagePendingRequest /> : redirectToHome()}
                />
                <Route
                    path="/request-details/:userId/:requestId"
                    element={isLoggedIn && userType === "staff" ? <PageRequestDetails /> : redirectToHome()}
                />
                <Route
                    path="/approved/:userId"
                    element={isLoggedIn && userType === "staff" ? <PageShowControlNumber /> : redirectToHome()}
                />
                <Route
                    path="/request-additional-info/:userId"
                    element={isLoggedIn && userType === "staff" ? <PageRequestAddInfo /> : redirectToHome()}
                />
                <Route
                    path="/for-release/:userId"
                    element={isLoggedIn && userType === "staff" ? <PageForReleaseList /> : redirectToHome()}
                />
                <Route
                    path="/receive-release-database/:userId"
                    element={isLoggedIn && userType === "staff" ? <PageViewDatabaseRR /> : redirectToHome()}
                />

                {/* Tester Routes */}
                <Route
                    path="/home/tester/:userId"
                    element={isLoggedIn && userType === "tester" ? <PageHomeTesting /> : redirectToHome()}
                />
                <Route
                    path="/for-testing/:userId"
                    element={isLoggedIn && userType === "tester" ? <PageForTesting /> : redirectToHome()}
                />
                <Route
                    path="/test-results/:userId"
                    element={isLoggedIn && userType === "tester" ? <PageTestResults /> : redirectToHome()}
                />
                <Route
                    path="/testing-database/:userId"
                    element={isLoggedIn && userType === "tester" ? <PageViewDatabaseT /> : redirectToHome()}
                />

                {/* Catch-all Route */}
                <Route path="*" element={<PageLogin onLogin={handleLogin} />} />
            </Routes>
        </>
    );
}

export default App;

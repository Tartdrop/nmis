import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, userType, userId, redirectPath = '/login' }) => {
    if (!isLoggedIn) {
        return <Navigate to={redirectPath} replace />;
    }

    // Example logic for unauthorized access
    const allowedPaths = {
        client: ['/home/client', '/submit-a-request', '/track-my-request', '/guide'],
        staff: ['/home/staff', '/pending-requests', '/request-details', '/approved', '/request-additional-info', '/for-release', '/receive-release-database'],
        tester: ['/home/tester', '/for-testing', '/test-results', '/testing-database'],
    };

    const currentPath = window.location.pathname;

    if (!allowedPaths[userType]?.some(path => currentPath.startsWith(path))) {
        return <Navigate to={`/home/${userType}/${userId}`} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

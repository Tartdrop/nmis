import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, userType, userId, redirectPath = '/login' }) => {
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to={redirectPath} replace />;
    }

    // Define allowed paths for each user type
    const allowedPaths = {
        client: ['/home/client', '/submit-a-request', '/request-submitted','/track-my-request', '/guide'],
        staff: ['/home/staff', '/pending-requests', '/request-details', '/request-control-number', '/approved', '/request-additional-info', '/for-release', '/receive-release-database'],
        chemtester: ['/home/chemtester', '/for-testing-chem', '/test-results-chem', '/testing-database-chem'],
        microbiotester: ['/home/microbiotester', '/for-testing-microbio', '/test-results-microbio', '/testing-database-microbio'],
        molbiotester: ['/home/molbiotester', '/for-testing-molbio', '/test-results-molbio', '/testing-database-molbio'],
    };

    // Get the current path and check if it starts with any of the allowed paths for the userType
    const isAuthorizedPath = allowedPaths[userType]?.some(path => location.pathname.startsWith(path));

    // If the path is not authorized for the userType, redirect to the user's specific home page
    if (!isAuthorizedPath) {
        return <Navigate to={`/home/${userType}/${userId}`} replace />;
    }

    // If the user is authorized, render the child components
    return <Outlet />;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";

function PublicRoute({ isLoggedIn, userType, children }) {
    if (isLoggedIn) {
        // Redirect to the appropriate home page based on userType
        const homePage = userType === "client" 
            ? `/home/client/${localStorage.getItem('userId')}` 
            : userType === "staff"
            ? `/home/staff/${localStorage.getItem('userId')}`
            : `/home/tester/${localStorage.getItem('userId')}`;
        
        return <Navigate to={homePage} />;
    }

    return children;
}

export default PublicRoute;
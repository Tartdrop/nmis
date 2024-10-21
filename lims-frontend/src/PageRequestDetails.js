import React from "react";
import RequestDetails from './Components/3_Receive_Release/RequestDetails';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageRequestDetails() {
    return(
        <div>
            <RequestDetails/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageRequestDetails
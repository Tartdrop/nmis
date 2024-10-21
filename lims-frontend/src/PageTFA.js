import React from "react";
import TFA from './Components/1_BeforeLogin/TFA';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageTFA() {
    return(
        <div>
            <TFA/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageTFA
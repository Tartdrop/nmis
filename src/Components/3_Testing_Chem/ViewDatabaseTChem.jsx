import React, { useState, useEffect } from 'react';
import '../3A_Testing/ViewDatabaseT.css';
import './ViewDatabaseTChem.css';
import Userfront from "@userfront/core";
import axios from 'axios';
import { useTable } from 'react-table';

Userfront.init("jb7ywq8b");

const ViewDatabase = () => {
    const [chemMicrobialData, setChemMicrobialData] = useState(null);
    const [chemElisaData, setChemElisaData] = useState(null);

    useEffect(() => {
        // Fetch Chem Microbial report
        axios.get('http://localhost:8080/api/reports/chemmicrobialreport')
        .then(response => setChemMicrobialData(response.data))
        .catch(error => console.error('Error fetching Chem Microbial data:', error));

        // Fetch Chem Elisa report
        axios.get('http://localhost:8080/api/reports/chemelisareport')
        .then(response => setChemElisaData(response.data))
        .catch(error => console.error('Error fetching Chem Elisa data:', error));
    }, []);

    if (!chemMicrobialData || !chemElisaData) return <p>Loading...</p>;

    // Define months (assuming you're displaying by month)
    const months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];
    const mtests = ['BetaLactams', 'Tetracyclines', 'Sulfonamides', 'Aminoglycosides', 'Macrolides', 'Quinolones'];
    const etests = ['Chloramphenicol', 'NitrofuranAoz', 'BetaAgonists', 'Corticosteroids', 'Olaquindox', 'NitrufuranAmoz', 'Stilbenes', 'Ractopamine'];

    // Helper function to get positive/negative counts for an tests in a given month
    const MgetPosNegCounts = (mtest, month) => {
        const countKey = `${mtest}PosNegCountsByMonthAndYear`;
        return chemMicrobialData[countKey]?.[month] || { positive: 0, negative: 0 };
    };

    // Helper function to get total counts for all tests in a given month
    const MgetTotalCountsForMonth = (month) => {
        let totalPositive = 0;
        let totalNegative = 0;
    
        mtests.forEach(mtest => {
          const { positive, negative } = MgetPosNegCounts(mtest, month);
          totalPositive += positive;
          totalNegative += negative;
        });
    
        return { totalPositive, totalNegative };
      };

      // Helper function to get positive/negative counts for an tests in a given month
    const EgetPosNegCounts = (etest, month) => {
        const countKey = `${etest}PosNegCountsByMonthAndYear`;
        return chemElisaData[countKey]?.[month] || { positive: 0, negative: 0 };
    };
    
    // Helper function to get total counts for all tests in a given month
    const EgetTotalCountsForMonth = (month) => {
        let totalPositive = 0;
        let totalNegative = 0;
    
        etests.forEach(etest => {
          const { positive, negative } = EgetPosNegCounts(etest, month);
          totalPositive += positive;
          totalNegative += negative;
        });
    
        return { totalPositive, totalNegative };
      };



    return (
        <div className="database-all-container">
            <div className="database-container">
                <div className="database-title">Chem Test Results</div>
                <div>
                    <h1>Chem Microbial Test Results</h1>
                        <table>
                        <thead>
                            <tr>
                            <th>Month</th>
                            {mtests.map(mtest => (
                                <th key={mtest} colSpan="2">{mtest}</th>
                            ))}
                            <th>Total</th>
                            </tr>
                            <tr>
                            <th></th>
                            {mtests.map(mtest => (
                                <React.Fragment key={mtest}>
                                <th>Positive</th>
                                <th>Negative</th>
                                </React.Fragment>
                            ))}
                            <th>Positive / Negative</th>
                            </tr>
                        </thead>
                        <tbody>
                            {months.map(month => {
                            const { totalPositive, totalNegative } = MgetTotalCountsForMonth(month);
                
                            return (
                                <tr key={month}>
                                <td>{month}</td>
                                {mtests.map(mtest => {
                                    const { positive, negative } = MgetPosNegCounts(mtest, month);
                                    return (
                                    <React.Fragment key={mtest}>
                                        <td>{positive}</td>
                                        <td>{negative}</td>
                                    </React.Fragment>
                                    );
                                })}
                                <td>{totalPositive} / {totalNegative}</td>
                                </tr>
                            );
                            })}
                        </tbody>
                        </table>
                </div>

                <div>
                    <h1>Chem Elisa Test Results</h1>
                        <table>
                        <thead>
                            <tr>
                            <th>Month</th>
                            {etests.map(etest => (
                                <th key={etest} colSpan="2">{etest}</th>
                            ))}
                            <th>Total</th>
                            </tr>
                            <tr>
                            <th></th>
                            {etests.map(etest => (
                                <React.Fragment key={etest}>
                                <th>Positive</th>
                                <th>Negative</th>
                                </React.Fragment>
                            ))}
                            <th>Positive / Negative</th>
                            </tr>
                        </thead>
                        <tbody>
                            {months.map(month => {
                            const { totalPositive, totalNegative } = EgetTotalCountsForMonth(month);
                
                            return (
                                <tr key={month}>
                                <td>{month}</td>
                                {etests.map(etest => {
                                    const { positive, negative } = EgetPosNegCounts(etest, month);
                                    return (
                                    <React.Fragment key={etest}>
                                        <td>{positive}</td>
                                        <td>{negative}</td>
                                    </React.Fragment>
                                    );
                                })}
                                <td>{totalPositive} / {totalNegative}</td>
                                </tr>
                            );
                            })}
                        </tbody>
                        </table>
                </div>

            </div>
        </div>
    );
}

export default ViewDatabase;

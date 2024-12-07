import React, { useState, useEffect } from 'react';
import '../3A_Testing/ViewDatabaseT.css';
import './ViewDatabaseTChem.css';
import Userfront from "@userfront/core";
import axios from 'axios';

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

  const months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];
  const mtests = ['BetaLactams', 'Tetracyclines', 'Sulfonamides', 'Aminoglycosides', 'Macrolides', 'Quinolones'];
  const etests = ['Chloramphenicol', 'NitrofuranAoz', 'BetaAgonists', 'Corticosteroids', 'Olaquindox', 'NitrufuranAmoz', 'Stilbenes', 'Ractopamine'];

  const MgetPosNegCounts = (mtest, month) => {
    const countKey = `${mtest}PosNegCountsByMonthAndYear`;
    return chemMicrobialData[countKey]?.[month] || { positive: 0, negative: 0 };
  };

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

  const EgetPosNegCounts = (etest, month) => {
    const countKey = `${etest}PosNegCountsByMonthAndYear`;
    return chemElisaData[countKey]?.[month] || { positive: 0, negative: 0 };
  };

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
        <div className="database-content">
          <div className="table-header">
            <h1>Chem Microbial Test Results</h1>
          </div>
          <div className="table-wrapper">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr className="header-row">
                    <th className="month-header">Month</th>
                    {mtests.map(mtest => (
                      <th key={mtest} colSpan="2" className="test-header">{mtest}</th>
                    ))}
                    <th className="total-header">Total</th>
                  </tr>
                  <tr className="subheader-row">
                    <th></th>
                    {mtests.map(mtest => (
                      <React.Fragment key={mtest}>
                        <th className="result-header">Positive</th>
                        <th className="result-header">Negative</th>
                      </React.Fragment>
                    ))}
                    <th className="total-subheader">Positive / Negative</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map(month => {
                    const { totalPositive, totalNegative } = MgetTotalCountsForMonth(month);

                    return (
                      <tr key={month} className="data-row">
                        <td className="month-cell">{month}</td>
                        {mtests.map(mtest => {
                          const { positive, negative } = MgetPosNegCounts(mtest, month);
                          return (
                            <React.Fragment key={mtest}>
                              <td className="result-cell positive">{positive}</td>
                              <td className="result-cell negative">{negative}</td>
                            </React.Fragment>
                          );
                        })}
                        <td className="total-cell">{totalPositive} / {totalNegative}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="database-content">
          <div className="table-header">
            <h1>Chem Elisa Test Results</h1>
          </div>
          <div className="table-wrapper">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr className="header-row">
                    <th className="month-header">Month</th>
                    {etests.map(etest => (
                      <th key={etest} colSpan="2" className="test-header">{etest}</th>
                    ))}
                    <th className="total-header">Total</th>
                  </tr>
                  <tr className="subheader-row">
                    <th></th>
                    {etests.map(etest => (
                      <React.Fragment key={etest}>
                        <th className="result-header">Positive</th>
                        <th className="result-header">Negative</th>
                      </React.Fragment>
                    ))}
                    <th className="total-subheader">Positive / Negative</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map(month => {
                    const { totalPositive, totalNegative } = EgetTotalCountsForMonth(month);

                    return (
                      <tr key={month} className="data-row">
                        <td className="month-cell">{month}</td>
                        {etests.map(etest => {
                          const { positive, negative } = EgetPosNegCounts(etest, month);
                          return (
                            <React.Fragment key={etest}>
                              <td className="result-cell positive">{positive}</td>
                              <td className="result-cell negative">{negative}</td>
                            </React.Fragment>
                          );
                        })}
                        <td className="total-cell">{totalPositive} / {totalNegative}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ViewDatabase;
import React, { useState, useEffect } from 'react';
import '../3A_Testing/ViewDatabaseT.css';
import './ViewDatabaseTMicrobio.css';
import Userfront from "@userfront/core";
import axios from 'axios';
import { useTable } from 'react-table';

Userfront.init("jb7ywq8b");

const ViewDatabase = () => {
  const [reportData, setReportData] = useState(null);
  
  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('http://localhost:8080/api/reports/microbioreport')
      .then(response => setReportData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!reportData) return <p>Loading...</p>;

  // Test types and months
  const tests = ['standardPlateCount', 'staphylococcusAureus', 'salmonellaSp', 'campylobacter', 'cultureAndSensitivityTest', 'coliformCount', 'eColi', 'eColiAndEColi0O157', 'yeastAndMolds'];
  const months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];

  // Helper function to get positive/negative counts for an tests in a given month
  const getPosNegCounts = (test, month) => {
    const countKey = `${test}PosNegCountsByMonthAndYear`;
    return reportData[countKey]?.[month] || { positive: 0, negative: 0 };
  };

  // Helper function to get total counts for all testss in a given month
  const getTotalCountsForMonth = (month) => {
    let totalPositive = 0;
    let totalNegative = 0;

    tests.forEach(test => {
      const { positive, negative } = getPosNegCounts(test, month);
      totalPositive += positive;
      totalNegative += negative;
    });

    return { totalPositive, totalNegative };
  };


    return (
        <div className="database-all-container">
            <div className='database-container'>
                <div className='database-title'>Database</div>
                <div>
      <h1>Microbio Test Results</h1>
      <table>
          <thead>
            <tr>
              <th>Month</th>
              {tests.map(test => (
                <th key={test} colSpan="2">{test}</th>
              ))}
              <th>Total</th>
            </tr>
            <tr>
              <th></th>
              {tests.map(test => (
                <React.Fragment key={test}>
                  <th>Positive</th>
                  <th>Negative</th>
                </React.Fragment>
              ))}
              <th>Positive / Negative</th>
            </tr>
          </thead>
          <tbody>
            {months.map(month => {
              const { totalPositive, totalNegative } = getTotalCountsForMonth(month);
  
              return (
                <tr key={month}>
                  <td>{month}</td>
                  {tests.map(test => {
                    const { positive, negative } = getPosNegCounts(test, month);
                    return (
                      <React.Fragment key={test}>
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
import React, { useState, useEffect } from 'react';
import '../3A_Testing/ViewDatabaseT.css';
import './ViewDatabaseTMolBio.css'; // Specific styles for molbio
import Userfront from "@userfront/core";
import axios from 'axios';
import { useTable } from 'react-table';

Userfront.init("jb7ywq8b");

const ViewDatabase = () => {
    const [reportData, setReportData] = useState(null);
  
    useEffect(() => {
      // Fetch data from the API when the component mounts
      axios.get('http://localhost:8080/api/reports/molbioreport')
        .then(response => setReportData(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    if (!reportData) return <p>Loading...</p>;
  
    // Animal types and months
    const animals = ['dog', 'cat', 'chicken', 'buffalo', 'cattle', 'horse', 'goat', 'sheep', 'swine'];
    const months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];
  
    // Helper function to get positive/negative counts for an animal in a given month
    const getPosNegCounts = (animal, month) => {
      const countKey = `${animal}PosNegCountsByMonthAndYear`;
      return reportData[countKey]?.[month] || { positive: 0, negative: 0 };
    };
  
    // Helper function to get total counts for all animals in a given month
    const getTotalCountsForMonth = (month) => {
      let totalPositive = 0;
      let totalNegative = 0;
  
      animals.forEach(animal => {
        const { positive, negative } = getPosNegCounts(animal, month);
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
              {animals.map(animal => (
                <th key={animal} colSpan="2">{animal}</th>
              ))}
              <th>Total</th>
            </tr>
            <tr>
              <th></th>
              {animals.map(animal => (
                <React.Fragment key={animal}>
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
                  {animals.map(animal => {
                    const { positive, negative } = getPosNegCounts(animal, month);
                    return (
                      <React.Fragment key={animal}>
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
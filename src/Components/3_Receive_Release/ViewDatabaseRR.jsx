import React, { useState, useEffect } from 'react';
import './ViewDatabaseRR.css';  // Specific styles for all combined
import axios from 'axios';
import { useTable } from 'react-table';

const ViewDatabaseRR = () => {
  const [chemData, setChemData] = useState([]);
  const [microbioData, setMicrobioData] = useState([]);
  const [molbioData, setMolbioData] = useState([]);

  useEffect(() => {
    // Fetch Chem test results
    axios.get(`${process.env.REACT_APP_API_URL}chem-results`)
      .then(response => setChemData(response.data))
      .catch(error => console.error('Error fetching Chem test results:', error));

    // Fetch Microbio test results
    axios.get(`${process.env.REACT_APP_API_URL}microbio-results`)
      .then(response => setMicrobioData(response.data))
      .catch(error => console.error('Error fetching Microbio test results:', error));

    // Fetch Molbio test results
    axios.get(`${process.env.REACT_APP_API_URL}molbio-results`)
      .then(response => setMolbioData(response.data))
      .catch(error => console.error('Error fetching Molbio test results:', error));
  }, []);

  // Columns for Chem test table
  const chemColumns = React.useMemo(() => [
    { Header: 'Sample ID', accessor: 'sampleId' },
    { Header: 'Chemical Test 1', accessor: 'chemTest1' },  // Adjust as needed
    { Header: 'Chemical Test 2', accessor: 'chemTest2' },
    { Header: 'Sample Source', accessor: 'sampleSourceProvince' },
    { Header: 'Purpose of Testing', accessor: 'testingPurpose' }
  ], []);

  // Columns for Microbio test table
  const microbioColumns = React.useMemo(() => [
    { Header: 'Sample ID', accessor: 'sampleId' },
    { Header: 'Standard Plate Count', accessor: 'standardPlateCount' },
    { Header: 'Staphylococcus Aureus', accessor: 'staphylococcusAureus' },
    { Header: 'Sample Source', accessor: 'sampleSourceProvince' },
    { Header: 'Purpose of Testing', accessor: 'testingPurpose' }
  ], []);

  // Columns for Molbio test table
  const molbioColumns = React.useMemo(() => [
    { Header: 'Sample ID', accessor: 'sampleId' },
    { Header: 'Dog', accessor: 'dog' },
    { Header: 'Cat', accessor: 'cat' },
    { Header: 'Sample Source', accessor: 'sampleSourceProvince' },
    { Header: 'Purpose of Testing', accessor: 'testingPurpose' }
  ], []);

  // Table instances for each test type
  const chemTableInstance = useTable({ columns: chemColumns, data: chemData });
  const microbioTableInstance = useTable({ columns: microbioColumns, data: microbioData });
  const molbioTableInstance = useTable({ columns: molbioColumns, data: molbioData });

  // Function to render table
  const renderTable = (tableInstance) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
    return (
      <table {...getTableProps()} className="test-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="database-all-container">
      <div className='database-container'>
        <h1>All Test Results</h1>

        <div className='table-section'>
          <h2>Chem Test Results</h2>
          {renderTable(chemTableInstance)}
        </div>

        <div className='table-section'>
          <h2>Microbio Test Results</h2>
          {renderTable(microbioTableInstance)}
        </div>

        <div className='table-section'>
          <h2>Molbio Test Results</h2>
          {renderTable(molbioTableInstance)}
        </div>
      </div>
    </div>
  );
};

export default ViewDatabaseRR;

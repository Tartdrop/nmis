import React, { useState, useEffect } from 'react';
import '../3A_Testing/ViewDatabaseT.css';
import './ViewDatabaseTMicrobio.css';
import Userfront from "@userfront/core";
import axios from 'axios';
import { useTable } from 'react-table';

Userfront.init("jb7ywq8b");

const ViewDatabase = () => {
    const [data, setData] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    // Fetch microbio test results
    axios.get('http://localhost:8080/microbio-results')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the microbio test results!', error);
      });

    // Fetch accomplishment report data
    axios.get('http://localhost:8080/microbio-reports')
      .then(response => {
        setReportData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the report data!', error);
      });
  }, []);

  // Define the columns for the main table
  const columns = React.useMemo(
    () => [
      { Header: 'Sample ID', accessor: 'sampleId' },
      { Header: 'Standard Plate Count', accessor: 'standardPlateCount' },
      { Header: 'Staphylococcus Aureus', accessor: 'staphylococcusAureus' },
      { Header: 'Salmonella Sp', accessor: 'salmonellaSp' },
      { Header: 'Campylobacter', accessor: 'campylobacter' },
      { Header: 'Coliform Count', accessor: 'coliformCount' },
      { Header: 'E. Coli', accessor: 'eColi' },
      { Header: 'Yeast and Molds', accessor: 'yeastAndMolds' },
      { Header: 'Sample Source', accessor: 'sampleSourceProvince' },  // Add other fields based on your data model
      { Header: 'Type of Sample', accessor: 'sampleType' },
      { Header: 'Purpose of Testing', accessor: 'testingPurpose' }
    ],
    []
  );

  // Define the columns for the report table
  const reportColumns = React.useMemo(
    () => [
      { Header: 'Year', accessor: 'year' },
      { Header: 'Month', accessor: 'month' },
      { Header: 'Total Tests Conducted', accessor: 'totalTests' },
      { Header: 'Positive Results', accessor: 'positiveResults' },
      { Header: 'Negative Results', accessor: 'negativeResults' },
      { Header: 'Sample Source Province/Region', accessor: 'sampleSource' },
      { Header: 'Purpose of Testing', accessor: 'testingPurpose' },
    ],
    []
  );

  // Table instance for microbio results
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  // Table instance for the report
  const {
    getTableProps: getReportTableProps,
    getTableBodyProps: getReportTableBodyProps,
    headerGroups: reportHeaderGroups,
    rows: reportRows,
    prepareRow: prepareReportRow
  } = useTable({ columns: reportColumns, data: reportData });

    return (
        <div className="database-all-container">
            <div className='database-container'>
                <div className='database-title'>Database</div>
                <div>
      <h1>Microbio Test Results</h1>
      <table {...getTableProps()} className="microbio-table">
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

      <h2>Accomplishment Report</h2>
      <table {...getReportTableProps()} className="report-table">
        <thead>
          {reportHeaderGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getReportTableBodyProps()}>
          {reportRows.map(row => {
            prepareReportRow(row);
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
    </div>
            </div>
        </div>
    );
}

export default ViewDatabase;
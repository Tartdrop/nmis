import React, { useState, useEffect } from 'react';
import '../3A_Testing/ViewDatabaseT.css';
import './ViewDatabaseTChem.css';
import Userfront from "@userfront/core";
import axios from 'axios';
import { useTable } from 'react-table';

Userfront.init("jb7ywq8b");

const ViewDatabase = () => {
    const [chemElisaData, setChemElisaData] = useState([]);
    const [chemMicrobialData, setChemMicrobialData] = useState([]);
    const [chemElisaReport, setChemElisaReport] = useState([]);
    const [chemMicrobialReport, setChemMicrobialReport] = useState([]);

    useEffect(() => {
        // Fetch ChemElisa test results
        axios.get('http://localhost:8080/chem-elisa-results')
            .then(response => {
                setChemElisaData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the ChemElisa test results!', error);
            });

        // Fetch ChemMicrobial test results
        axios.get('http://localhost:8080/chem-microbial-results')
            .then(response => {
                setChemMicrobialData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the ChemMicrobial test results!', error);
            });

        // Fetch ChemElisa report data
        axios.get('http://localhost:8080/chem-elisa-reports')
            .then(response => {
                setChemElisaReport(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the ChemElisa report data!', error);
            });

        // Fetch ChemMicrobial report data
        axios.get('http://localhost:8080/chem-microbial-reports')
            .then(response => {
                setChemMicrobialReport(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the ChemMicrobial report data!', error);
            });
    }, []);

    // Define columns for ChemElisa results
    const chemElisaColumns = React.useMemo(
        () => [
            { Header: 'Sample ID', accessor: 'sampleId' },
            { Header: 'Chloramphenicol', accessor: 'chloramphenicol' },
            { Header: 'Nitrofuran AOZ', accessor: 'nitrofuranAoz' },
            { Header: 'Beta Agonists', accessor: 'betaAgonists' },
            { Header: 'Corticosteroids', accessor: 'corticosteroids' },
            { Header: 'Olaquindox', accessor: 'olaquindox' },
            { Header: 'Nitrofuran AMOZ', accessor: 'nitrufuranAmoz' },
            { Header: 'Stilbenes', accessor: 'stilbenes' },
            { Header: 'Ractopamine', accessor: 'ractopamine' },
            { Header: 'Sample Source', accessor: 'sampleSourceProvince' },
            { Header: 'Type of Sample', accessor: 'sampleType' },
            { Header: 'Purpose of Testing', accessor: 'testingPurpose' }
        ],
        []
    );

    // Define columns for ChemMicrobial results
    const chemMicrobialColumns = React.useMemo(
        () => [
            { Header: 'Sample ID', accessor: 'sampleId' },
            { Header: 'Beta Lactams', accessor: 'betaLactams' },
            { Header: 'Tetracyclines', accessor: 'tetracyclines' },
            { Header: 'Sulfonamides', accessor: 'sulfonamides' },
            { Header: 'Aminoglycosides', accessor: 'aminoglycosides' },
            { Header: 'Macrolides', accessor: 'macrolides' },
            { Header: 'Quinolones', accessor: 'quinolones' },
            { Header: 'Sample Source', accessor: 'sampleSourceProvince' },
            { Header: 'Type of Sample', accessor: 'sampleType' },
            { Header: 'Purpose of Testing', accessor: 'testingPurpose' }
        ],
        []
    );

    // Define columns for ChemElisa report
    const chemElisaReportColumns = React.useMemo(
        () => [
            { Header: 'Year', accessor: 'year' },
            { Header: 'Month', accessor: 'month' },
            { Header: 'Total Tests Conducted', accessor: 'totalTests' },
            { Header: 'Positive Results', accessor: 'positiveResults' },
            { Header: 'Negative Results', accessor: 'negativeResults' },
            { Header: 'Sample Source Province/Region', accessor: 'sampleSource' },
            { Header: 'Purpose of Testing', accessor: 'testingPurpose' }
        ],
        []
    );

    // Define columns for ChemMicrobial report
    const chemMicrobialReportColumns = React.useMemo(
        () => [
            { Header: 'Year', accessor: 'year' },
            { Header: 'Month', accessor: 'month' },
            { Header: 'Total Tests Conducted', accessor: 'totalTests' },
            { Header: 'Positive Results', accessor: 'positiveResults' },
            { Header: 'Negative Results', accessor: 'negativeResults' },
            { Header: 'Sample Source Province/Region', accessor: 'sampleSource' },
            { Header: 'Purpose of Testing', accessor: 'testingPurpose' }
        ],
        []
    );

    // Create table instances for ChemElisa results and reports
    const chemElisaTable = useTable({ columns: chemElisaColumns, data: chemElisaData });
    const chemElisaReportTable = useTable({ columns: chemElisaReportColumns, data: chemElisaReport });

    // Create table instances for ChemMicrobial results and reports
    const chemMicrobialTable = useTable({ columns: chemMicrobialColumns, data: chemMicrobialData });
    const chemMicrobialReportTable = useTable({ columns: chemMicrobialReportColumns, data: chemMicrobialReport });

    const renderTable = (tableInstance) => (
        <table {...tableInstance.getTableProps()} className="data-table">
            <thead>
                {tableInstance.headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...tableInstance.getTableBodyProps()}>
                {tableInstance.rows.map(row => {
                    tableInstance.prepareRow(row);
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

    return (
        <div className="database-all-container">
            <div className="database-container">
                <div className="database-title">Chem Test Results</div>

                <h1>ChemElisa Test Results</h1>
                {renderTable(chemElisaTable)}

                <h2>ChemElisa Accomplishment Report</h2>
                {renderTable(chemElisaReportTable)}

                <h1>ChemMicrobial Test Results</h1>
                {renderTable(chemMicrobialTable)}

                <h2>ChemMicrobial Accomplishment Report</h2>
                {renderTable(chemMicrobialReportTable)}
            </div>
        </div>
    );
}

export default ViewDatabase;

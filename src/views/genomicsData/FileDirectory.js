import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';

import { Grid, Button, FormControl, InputLabel, NativeSelect } from '@mui/material';
import { useSelector } from 'react-redux';

import { genomicsFileTypes } from 'store/constant';
import GenericTable from 'ui-component/Tables/GenericTable';
import { searchGenomicSets } from 'store/api';
import { Map, Description } from '@mui/icons-material';
import LightCard from 'views/dashboard/Default/LightCard';
import DatasetIdSelect from 'views/dashboard/Default/datasetIdSelect';
import { SearchIndicator } from 'ui-component/LoadingIndicator/SearchIndicator';
import { LoadingIndicator, usePromiseTracker, trackPromise } from 'ui-component/LoadingIndicator/LoadingIndicator';
import AlertComponent from 'ui-component/AlertComponent';

import 'assets/css/VariantsSearch.css';

function FileDirectory() {
    const [isLoading, setLoading] = useState(true);
    const events = useSelector((state) => state);
    const [datasetId, setDatasetId] = useState(events.customization.update.datasetId);
    const { promiseInProgress } = usePromiseTracker();

    const [rowData, setRowData] = useState([]);
    const [columnDef, setColumnDef] = useState([]);
    const [displayFilesTable, setDisplayFilesTable] = useState(false);
    const [currentTable, setCurrentTable] = useState(genomicsFileTypes[0]);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    /** *
     * Build the column definition dynamically.
     * @param {array} apiResponse - The data to be displayed in the table.
     */
    function columnDefBuilder(apiResponse) {
        const fields = Object.keys(apiResponse[0]);
        const columnDefs = [];

        fields.forEach((field) => {
            columnDefs.push({
                headerName: field,
                field
            });
        });

        return columnDefs;
    }

    /**
     * Transform all fields of API response into string.
     * @returns a complete API response with all values being string.
     */
    function dataStringifier(apiResponse) {
        const updatedResponse = [];

        apiResponse.forEach((item) => {
            let temp = {};
            Object.keys(item).forEach((key) => {
                temp = item;
                if (typeof item[key] !== 'string') {
                    temp[key] = JSON.stringify(item[key]);
                }
            });
            updatedResponse.push(temp);
        });
        return updatedResponse;
    }

    /*
  Build the dropdown for chromosome
  * @param {None}
  * Return a list of options with chromosome
  */
    function typeSelectBuilder() {
        const fileTypeList = [];

        genomicsFileTypes.forEach((fileType) => {
            fileTypeList.push(
                <option key={fileType} value={fileType}>
                    {fileType}
                </option>
            );
        });
        return fileTypeList;
    }

    useEffect(() => {
        setLoading(false);
        // Called on the initial page load, or when dataset gets switched.
        const reqType = currentTable;
        const reqPath = currentTable.toLowerCase();
        setDisplayFilesTable(false);
        setDatasetId(events.customization.update.datasetId);

        trackPromise(
            searchGenomicSets(datasetId, reqPath)
                .then((data) => {
                    setDisplayFilesTable(true);
                    setColumnDef(columnDefBuilder(data.results[reqType]));
                    setNumberOfRecords(data.results[reqType].length);
                    setRowData(dataStringifier(data.results[reqType]));
                })
                .catch(() => {
                    setRowData([]);
                    setNumberOfRecords(0);
                    setDisplayFilesTable(false);

                    if (datasetId !== '') {
                        setOpen(true);
                        setAlertMessage('Sorry, no data was found for your request.');
                        setAlertSeverity('warning');
                    }
                }),
            'table'
        );
    }, [datasetId, currentTable, events.customization.update.datasetId, setDatasetId]);

    const formHandler = (e) => {
        e.preventDefault(); // Prevent form submission
        setDisplayFilesTable(false);
        setNumberOfRecords(0);
        const reqType = e.target.fileType.value;
        const reqPath = e.target.fileType.value.toLowerCase();
        setCurrentTable(reqType);

        trackPromise(
            searchGenomicSets(datasetId, reqPath)
                .then((data) => {
                    setDisplayFilesTable(true);
                    setNumberOfRecords(data.results[reqType].length);
                    setColumnDef(columnDefBuilder(data.results[reqType]));
                    setRowData(dataStringifier(data.results[reqType]));
                })
                .catch(() => {
                    setRowData([]);
                    setDisplayFilesTable(false);
                }),
            'table'
        );
    };

    return (
        <>
            <MainCard title="File Directory" sx={{ minHeight: 830, position: 'relative' }}>
                <DatasetIdSelect />
                <AlertComponent
                    open={open}
                    setOpen={setOpen}
                    text={alertMessage}
                    severity={alertSeverity}
                    variant="filled"
                    fontColor={alertSeverity === 'error' ? 'white' : 'black'}
                />
                <Grid container direction="column" className="content">
                    <Grid container direction="row" justifyContent="center" spacing={2} p={2}>
                        <Grid item sm={12} xs={12} md={4} lg={4}>
                            {promiseInProgress === true ? (
                                <LoadingIndicator />
                            ) : (
                                <LightCard
                                    isLoading={isLoading}
                                    header="Currently Displaying"
                                    value={currentTable}
                                    icon={<Map fontSize="inherit" />}
                                    color="primary"
                                />
                            )}
                        </Grid>
                        <Grid item sm={12} xs={12} md={4} lg={4}>
                            {promiseInProgress === true ? (
                                <LoadingIndicator />
                            ) : (
                                <LightCard
                                    isLoading={isLoading}
                                    header="Number of Records"
                                    value={numberOfRecords}
                                    icon={<Description fontSize="inherit" />}
                                    color="secondary"
                                />
                            )}
                        </Grid>
                    </Grid>

                    <form onSubmit={formHandler} style={{ justifyContent: 'center' }}>
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} p={2}>
                            <Grid item sx={{ minWidth: 150 }}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel id="fileType">File Type</InputLabel>
                                    <NativeSelect labelId="fileType" required id="fileType">
                                        {typeSelectBuilder()}
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl variant="standard">
                                    <Button type="submit" variant="contained">
                                        Search
                                    </Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>

                    {displayFilesTable ? <GenericTable rowData={rowData} columnDefs={columnDef} /> : <SearchIndicator area="table" />}
                </Grid>
            </MainCard>
        </>
    );
}

export default FileDirectory;

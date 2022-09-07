import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';

import { Grid, Button, FormControl, InputLabel, Input, NativeSelect } from '@mui/material';

import { useSelector } from 'react-redux';

import { ListOfReferenceNames } from 'store/constant';
import ReadsTable from 'ui-component/Tables/ReadsTable';
import { searchReadGroupSets, searchReads, getReferenceSet } from 'store/api';
import { Map, Description } from '@mui/icons-material';
import LightCard from 'views/dashboard/Default/LightCard';
import DatasetIdSelect from 'views/dashboard/Default/datasetIdSelect';

import { LoadingIndicator, usePromiseTracker, trackPromise } from 'ui-component/LoadingIndicator/LoadingIndicator';
import { SearchIndicator } from 'ui-component/LoadingIndicator/SearchIndicator';
import AlertComponent from 'ui-component/AlertComponent';

import 'assets/css/ReadsSearch.css';

function ReadsSearch() {
    const [isLoading, setLoading] = useState(true);
    const events = useSelector((state) => state);
    const [datasetId, setDatasetId] = useState(events.customization.update.datasetId);
    const [rowData, setRowData] = useState([]);
    const [displayReadsTable, setDisplayReadsTable] = useState(false);
    const { promiseInProgress } = usePromiseTracker();
    const [readGroupSetCount, setReadGroupSetCount] = useState('');
    const [referenceSetName, setReferenceSetName] = useState('');
    const [apiResponse, setApiResponse] = useState({});
    const [bamOptionList, setBamOptionList] = useState([]);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    /*
  Fetches reference set Name and sets referenceSetName
  * @param {string}... referenceSetId
  */
    function settingReferenceSetName(referenceSetId) {
        getReferenceSet(referenceSetId)
            .then((data) => {
                setReferenceSetName(data.results.name);
            })
            .catch(() => {
                setReferenceSetName('Not Available');
            });
    }

    /*
  Build the dropdown for BAM files
  * @param {None}
  * Return a list of options with BAM files
  */
    function bamSelectBuilder(readGroupSets) {
        const bamOptions = [];

        readGroupSets.forEach((readGroupSet) => {
            bamOptions.push(
                <option key={readGroupSet.name} value={readGroupSet.id}>
                    {readGroupSet.name}
                </option>
            );
        });

        setBamOptionList(bamOptions);
    }

    /*
  Build the dropdown for chromosome
  * @param {None}
  * Return a list of options with chromosome
  */
    function chrSelectBuilder() {
        const refNameList = [];

        ListOfReferenceNames.forEach((refName) => {
            refNameList.push(
                <option key={refName} value={refName}>
                    {refName}
                </option>
            );
        });
        return refNameList;
    }

    useEffect(() => {
        setBamOptionList([]);
        setLoading(false);
        setDisplayReadsTable(false);

        // Check for variant and reference name set on datasetId changes
        setDatasetId(events.customization.update.datasetId);

        if (events.customization.update.datasetId) {
            trackPromise(
                searchReadGroupSets(datasetId)
                    .then((data) => {
                        setApiResponse(data);
                        setReadGroupSetCount(data.results.total);

                        bamSelectBuilder(data.results.readGroupSets);
                        settingReferenceSetName(data.results.readGroupSets[0].readGroups[0].referenceSetId);
                    })
                    .catch(() => {
                        setReadGroupSetCount('Not Available');
                        setReferenceSetName('Not Available');
                    }),
                'tile'
            );
        }
    }, [datasetId, events.customization.update.datasetId, setDatasetId]);

    const formHandler = (e) => {
        e.preventDefault(); // Prevent form submission
        setDisplayReadsTable(false);

        const readGroupSetId = e.target.bam.value;
        const readGroupIds = [];

        apiResponse.results.readGroupSets.forEach((readGroupSet) => {
            if (readGroupSetId === readGroupSet.id) {
                readGroupSet.readGroups.forEach((readGroup) => {
                    readGroupIds.push(readGroup.id);
                });
            }
        });

        trackPromise(
            searchReads(e.target.start.value, e.target.end.value, e.target.chromosome.value, referenceSetName, readGroupIds)
                .then((data) => {
                    setDisplayReadsTable(true);
                    setRowData(data.results.alignments);
                    setOpen(false);
                })
                .catch(() => {
                    setRowData([]);
                    setDisplayReadsTable(false);

                    if (datasetId !== '') {
                        setOpen(true);
                        setAlertMessage('Sorry, but no reads were found in your search range.');
                        setAlertSeverity('warning');
                    }
                }),
            'table'
        );
    };

    return (
        <>
            <MainCard title="Reads Search" sx={{ minHeight: 830, position: 'relative', borderRadius: events.customization.borderRadius * 0.25 }}>
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
                                    header="Reference Genome"
                                    value={referenceSetName}
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
                                    header="ReadGroupSets/BAMs"
                                    value={readGroupSetCount}
                                    icon={<Description fontSize="inherit" />}
                                    color="secondary"
                                />
                            )}
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="center" spacing={2} p={2}>
                        <form inline onSubmit={formHandler} style={{ justifyContent: 'center', marginBottom: '20px' }}>
                            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} p={2}>
                                <Grid item sx={{ minWidth: 150 }}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel id="bam-label">BAM</InputLabel>
                                        <NativeSelect labelId="bam-label" required id="bam">
                                            <option selected disabled hidden>
                                                Choose one
                                            </option>
                                            {bamOptionList}
                                        </NativeSelect>
                                    </FormControl>
                                </Grid>
                                <Grid item sx={{ minWidth: 150 }}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel id="chr-label">Chromosome</InputLabel>
                                        <NativeSelect labelId="chr-label" required id="chromosome">
                                            {chrSelectBuilder()}
                                        </NativeSelect>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl variant="standard">
                                        <InputLabel for="start">Start</InputLabel>
                                        <Input required type="number" id="start" />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl variant="standard">
                                        <InputLabel for="end">End</InputLabel>
                                        <Input required type="number" id="end" />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl variant="standard">
                                        <Button type="submit" variant="contained" sx={{ borderRadius: events.customization.borderRadius * 0.15 }}>
                                            Search
                                        </Button>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>

                    {displayReadsTable ? <ReadsTable rowData={rowData} datasetId={datasetId} /> : <SearchIndicator area="table" />}
                </Grid>
            </MainCard>
        </>
    );
}

export default ReadsSearch;

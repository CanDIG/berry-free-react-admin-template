import * as React from 'react';

// mui
import { useTheme } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

// REDUX

// project imports
import { useSearchQueryReaderContext, useSearchResultsReaderContext } from '../SearchResultsContext';

function GenomicData() {
    const theme = useTheme();

    // Mobile
    const [desktopResolution, setdesktopResolution] = React.useState(window.innerWidth > 1200);

    const searchResults = useSearchResultsReaderContext().genomic;
    const query = useSearchQueryReaderContext().query;

    // Flatten the search results so that we are filling in the rows
    let rows = [];
    if (searchResults) {
        rows =
            searchResults
                ?.map((patient, index) => {
                    // Filter out undefined
                    if (!patient) {
                        return undefined;
                    }
                    // Make sure each row has an ID
                    const retVal = { ...patient };
                    retVal.id = index;
                    retVal.genotypeLabel = patient.genotype.value;
                    if (patient.genotype.secondaryAlleleIds) {
                        retVal.genotypeLabel += ` (${patient.genotype.secondaryAlleleIds[0]})`;
                    }
                    retVal.zygosityLabel = patient.genotype.zygosity?.label || '';
                    retVal.location = patient.location.name;

                    // TODO: Fix the below with the actual normal ID
                    retVal.normalId = patient.biosampleId;
                    return retVal;
                })
                ?.filter((patient) => typeof patient !== 'undefined') || [];
    }

    // Tracks Screensize
    React.useEffect(() => {
        window.addEventListener('resize', () => setdesktopResolution(window.innerWidth > 1200));
    }, [desktopResolution, setdesktopResolution]);

    // JSON on bottom now const screenWidth = desktopResolution ? '48%' : '100%';
    const columns = [
        { field: 'location', headerName: 'Node', minWidth: 120, sortable: false, filterable: false },
        { field: 'donor_id', headerName: 'Donor ID', minWidth: 150, sortable: false, filterable: false },
        { field: 'program_id', headerName: 'Program ID', minWidth: 150, sortable: false, filterable: false },
        { field: 'position', headerName: 'Position', minWidth: 150, sortable: false, filterable: false },
        { field: 'tumour_normal_designation', headerName: 'Tumour/Normal', minWidth: 200, sortable: false, filterable: false },
        { field: 'submitter_specimen_id', headerName: 'Sample Registration ID', minWidth: 300, sortable: false, filterable: false },
        { field: 'genotypeLabel', headerName: 'Genotype', minWidth: 300, sortable: false, filterable: false },
        { field: 'zygosityLabel', headerName: 'Zygosity', minWidth: 200, sortable: false, filterable: false }
    ];

    const queryParams = query?.gene || query?.chrom;
    const hasValidQuery = (query?.assembly && query?.chrom) || query?.gene;

    return (
        <Box mr={1} ml={1} p={1} sx={{ border: 1, borderRadius: 2, boxShadow: 2, borderColor: theme.palette.primary[200] + 75 }}>
            <Typography pb={1} variant="h4">
                {hasValidQuery ? `Genomic Variants: ${queryParams}` : 'Genomic Variants: Please query from the sidebar to populate'}
            </Typography>
            <div style={{ height: 510, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} hideFooterSelectedRowCount />
            </div>
        </Box>
    );
}

export default GenomicData;

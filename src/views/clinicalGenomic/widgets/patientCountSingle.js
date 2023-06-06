import { useEffect, useState } from 'react';

import { Avatar, Box, Button, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material';
import { useTheme, makeStyles } from '@mui/styles';

import { useSearchResultsReaderContext } from '../SearchResultsContext';

const useStyles = makeStyles((theme) => {
    return {
        patientEntry: {
            // React center span?
        },
        siteName: {
            // Left-aligned
            width: 120
        },
        locked: {
            backgroundColor: theme.palette.action.disabledBackground
        },
        button: {
            // Right-aligned
            float: 'right',
            marginLeft: 'auto'
        },
        divider: {
            borderColor: theme.palette.primary.main,
            marginTop: 20,
            marginBottom: 4
        }
    };
});

function PatientCountSingle(props) {
    const { site, searchResults } = props;
    const theme = useTheme();
    const classes = useStyles();

    console.log(searchResults);
    let totalPatients = Object.values(searchResults['results'])?.reduce((partialSum, cohortTotal) => partialSum + cohortTotal, 0) || 0;
    let patientsInSearch = 0; //searchResults[site]['patientsInSearch'];
    let numCohorts = Object.values(searchResults['results'])?.length || 0;
    let locked = false; //searchResults['locked'];

    let avatarProps = locked
        ? {
              // If we're locked out, gray out the avatar
              sx: { bgcolor: theme.palette.action.disabled }
          }
        : {};

    return (
        <Box
            mr={2}
            ml={1}
            pr={5}
            sx={{ border: 1, borderRadius: 2, boxShadow: 2, borderColor: 'primary.main' }}
            className={locked ? classes.locked : ''}
        >
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={2}>
                    <CardHeader avatar={<Avatar {...avatarProps}>{site.slice(0, 1).toUpperCase()}</Avatar>} title={<b>{site}</b>} />
                </Grid>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <Grid item xs={2}>
                    <Typography align="center" className={classes.patientEntry}>
                        {totalPatients}
                    </Typography>
                </Grid>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <Grid item xs={2}>
                    <Typography align="center" className={classes.patientEntry}>
                        {patientsInSearch}
                    </Typography>
                </Grid>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <Grid item xs={2}>
                    <Typography align="center" className={classes.patientEntry}>
                        {numCohorts}
                    </Typography>
                </Grid>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <Grid item xs={1} ml={'auto'} className={classes.button}>
                    {locked ? (
                        <Button type="submit" variant="contained" sx={{ borderRadius: 1.8 }}>
                            Request&nbsp;Access
                        </Button>
                    ) : (
                        <></>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default PatientCountSingle;

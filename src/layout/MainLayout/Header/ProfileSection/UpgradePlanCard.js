import React from 'react';

import { makeStyles } from '@mui/styles';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        background: theme.palette.warning.light,
        marginTop: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '19px solid ',
            borderColor: theme.palette.warning.main,
            borderRadius: '50%',
            top: '65px',
            right: '-150px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '3px solid ',
            borderColor: theme.palette.warning.main,
            borderRadius: '50%',
            top: '145px',
            right: '-70px'
        }
    },
    tagLine: {
        color: theme.palette.grey[900],
        opacity: 0.6
    },
    button: {
        color: theme.palette.grey[800],
        backgroundColor: theme.palette.warning.main,
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.warning.dark
        }
    }
}));

// ===========================|| PROFILE MENU - UPGRADE PLAN CARD ||=========================== //

const UpgradePlanCard = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h4">Upgrade your plan</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" className={classes.tagLine}>
                            70% discount for 1 years <br />
                            subscriptions.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row">
                            <AnimateButton>
                                <Button variant="contained" className={classes.button}>
                                    Go Premium
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UpgradePlanCard;

import IngestMenu from 'ui-component/ingest/IngestMenu';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

function IngestPage() {
    const useStyles = makeStyles({
        container: {
            color: 'white',
            background: 'white',
            height: '100%',
            width: '100%',
            paddingTop: '0.8em',
            borderRadius: '1em',
            overflow: 'hidden',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            display: 'inline-flex'
        },
        label: {
            color: 'black',
            fontSize: 24,
            fontFamily: 'Roboto',
            fontWeight: '700',
            wordWrap: 'break-word',
            marginLeft: '0.65em',
            marginBottom: '1em',
            marginTop: '0.51em'
        }
    });
    const classes = useStyles();
    return (
        <Grid container className={classes.container}>
            <Grid item sx={{ height: '100%', width: '100%' }}>
                <div className={classes.label}>Ingest Data</div>
                <IngestMenu />
            </Grid>
        </Grid>
    );
}

export default IngestPage;
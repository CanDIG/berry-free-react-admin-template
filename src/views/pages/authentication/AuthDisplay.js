import { MutatingDots } from 'react-loader-spinner';

// mui
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import useTheme from '@mui/system/useTheme';
import SmallCountCard from 'ui-component/cards/SmallCountCard';
import CustomOfflineChart from 'views/summary/CustomOfflineChart';
import TreatingCentreMap from 'views/summary/TreatingCentreMap';
import { IconShieldLock } from '@tabler/icons-react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useAuthContext } from './AuthContext';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';

// assets
const PREFIX = 'AuthDisplay';

const classes = {
    mainCard: `${PREFIX}-maincard`,
    mainContainer: `${PREFIX}-maincontainer`,
    iconwrapper: `${PREFIX}-iconwrapper`,
    icon: `${PREFIX}-icon`,
    centered: `${PREFIX}-centered`,
    spacer: `${PREFIX}-spacer`
};

const Root = styled('div')(({ _ }) => ({
    [`& .${classes.mainContainer}`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    [`& .${classes.mainCard}`]: {
        width: '80%'
    },

    [`& .${classes.iconwrapper}`]: {
        backgroundColor: '#EBEBEB',
        width: 'calc(100% + 24px)',
        marginLeft: -12,
        marginRight: -12,
        textAlign: 'center'
    },

    [`& .${classes.icon}`]: {
        width: 200,
        height: 200,
        color: '#7A0C0C'
    },

    [`& .${classes.centered}`]: {
        textAlign: 'center'
    },

    [`& .${classes.spacer}`]: {
        height: 50
    }
}));

function AuthDisplay() {
    // Fire off the authorization check
    const authStatus = useAuthContext();

    const isPending = useState(false);

    const requestAccess = () => {
        fetch('/ingest/user/pending/request', {
            method: 'POST'
        });
    };

    let content;
    if (authStatus.loading) {
        content = <MutatingDots color="#2BAD60" secondaryColor="#037DB5" height="100" width="110" />;
    } else if (!authStatus.authorized) {
        content = (
            <div className={classes.centered}>
                <div className={classes.iconwrapper}>
                    <IconShieldLock className={classes.icon} />
                </div>
                <div className={classes.spacer} />
                <Typography variant="h2">Sorry, you are not authorized to access this site. Please request access.</Typography>
                <div className={classes.spacer} />
                <Button variant="contained" onClick={requestAccess}>
                    Request access
                </Button>
            </div>
        );
    }

    return (
        <Root>
            <div className={classes.mainContainer}>
                <MainCard className={classes.mainCard}>{content}</MainCard>
            </div>
        </Root>
    );
}

export default AuthDisplay;

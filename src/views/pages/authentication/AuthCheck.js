import { useState, useEffect } from 'react';
import { MutatingDots } from 'react-loader-spinner';

// mui
import { IconShieldLock } from '@tabler/icons-react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { INGEST_URL } from 'store/api';

// assets

function AuthCheck(props) {
    const { children } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    // Fire off the authorization check
    useEffect(() => {
        fetch(`${INGEST_URL}/programs`)
            .then((request) => {
                if (request.ok) {
                    return request.json();
                }
                throw new Error(`${request.status}: ${request.statusText}`);
            })
            .then((_) => {
                setAuthorized(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <MainCard>
                <MutatingDots color="#2BAD60" secondaryColor="#037DB5" height="100" width="110" />
            </MainCard>
        );
    }

    if (authorized) {
        return children;
    }

    return (
        <MainCard>
            <IconShieldLock />
        </MainCard>
    );
}

export default AuthCheck;

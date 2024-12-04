import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// project imports
import { INGEST_URL } from 'store/api';
import { UseUnauthorizedRoutes } from 'routes/UnauthorizedRoutes';
import { AuthContext } from './AuthContext';

// assets

function AuthCheck(props) {
    const { children } = props;
    const [authCheckState, setAuthCheckState] = useState({
        loading: true,
        authorized: false
    });

    // Fire off the authorization check
    useEffect(() => {
        fetch(`${INGEST_URL}/user/self_authorize`)
            .then((request) => {
                if (request.ok) {
                    return request.json();
                }
                throw new Error(`${request.status}: ${request.statusText}`);
            })
            .then((_) => {
                setAuthCheckState((old) => {
                    const retVal = { ...old };
                    retVal.authorized = true;
                    return retVal;
                });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setAuthCheckState((old) => {
                    const retVal = { ...old };
                    retVal.loading = false;
                    return retVal;
                });
            });
    }, []);

    return (
        <AuthContext.Provider value={authCheckState}>
            {authCheckState.authorized ? children : <UseUnauthorizedRoutes />}
        </AuthContext.Provider>
    );
}

AuthCheck.propTypes = {
    children: PropTypes.node
};

export default AuthCheck;

import { useState, useEffect, useMemo } from 'react';
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
        authorized: false,
        pending: false,
        reqNum: 0
    });

    // Fire off the authorization check
    useEffect(() => {
        fetch(`${INGEST_URL}/user/me/authorize`)
            .then((request) => {
                if (request.ok) {
                    return request.json();
                }
                throw new Error(`${request.status}: ${request.statusText}`);
            })
            .then((data) => {
                setAuthCheckState((old) => {
                    const retVal = { ...old };
                    retVal.pending = data.results === 'Pending';
                    retVal.authorized = Array.isArray(data.results);
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
    }, [authCheckState.reqNum]);

    const contextValue = useMemo(() => [authCheckState, setAuthCheckState], [authCheckState, setAuthCheckState]);

    return (
        <AuthContext.Provider value={contextValue}>{authCheckState.authorized ? children : <UseUnauthorizedRoutes />}</AuthContext.Provider>
    );
}

AuthCheck.propTypes = {
    children: PropTypes.node
};

export default AuthCheck;

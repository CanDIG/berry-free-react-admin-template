import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// import project config
import config from 'config';

// import basename
const { basename } = config;

// Unauthorized page
const AuthCheck = Loadable(lazy(() => import('views/pages/authentication/AuthCheck')));

// Error Pages
const ErrorNotFoundPage = Loadable(lazy(() => import('views/errorPages/ErrorNotFoundPage')));

// ===========================|| MAIN ROUTING ||=========================== //

const UnauthorizedRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: `/`,
            element: <AuthCheck />
        },
        {
            path: `${basename}/unauthorized`,
            element: <AuthCheck />
        },
        {
            path: '*',
            element: <AuthCheck />
        }
    ]
};

export default UnauthorizedRoutes;

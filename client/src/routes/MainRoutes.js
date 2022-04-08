import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable.js';

// dashboard routing
const UserDashboard = Loadable(lazy(() => import('../views/userDashboard/UserDashboard.js')));
const SellerDashboard = Loadable(lazy(() => import('../views/sellerDashboard/SellerDashboard.js')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography.js')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color.js')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow.js')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons.js')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons.js')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/seller/dashboard',
            element: <SellerDashboard />
        },
        // {
        //     path: '/dashboard/default',
        //     element: <DashboardDefault />
        // },
        {
            path: '/user/dashboard',
            element: <UserDashboard />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;

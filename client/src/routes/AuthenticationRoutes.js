import { lazy } from 'react';

// project imports
import Loadable from '../ui-component/Loadable.js';
import MinimalLayout from '../layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login3.js')));
const AuthRegister3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Register3.js')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <AuthLogin3 />
        },
        {
            path: '/register',
            element: <AuthRegister3 />
        }
    ]
};

export default AuthenticationRoutes;

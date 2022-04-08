import React, { lazy } from 'react'
import Loadable from '../../ui-component/Loadable.js';

const UserDashboardDefault = Loadable(lazy(() => import('../dashboard/Default')));

const UserDashboard = () => {
  return (
    <UserDashboardDefault />
  )
}

export default UserDashboard
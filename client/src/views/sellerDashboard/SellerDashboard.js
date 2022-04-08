import React, { lazy } from 'react'
import Loadable from '../../ui-component/Loadable.js';

const SellerDashboardDefault = Loadable(lazy(() => import('../dashboard/Default')));

const SellerDashboard = () => {
  return (
    <SellerDashboardDefault />
  )
}

export default SellerDashboard
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SellerDashboard from "./components/seller/sellerDashboard/Dashboard";
import MyProduct from "./components/seller/sellerDashboard/MyProducts/MyProducts";
import DashboardHome from "./components/seller/sellerDashboard/Home";
import AddProduct from "./components/seller/sellerDashboard/addProduct";

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path='/seller/dashboard' element={<SellerDashboard child={<DashboardHome/>} />} />
      <Route exact path='/seller/myproducts' element={<SellerDashboard child={<MyProduct/>}/>} />
      <Route exact path='/seller/addproduct' element={<SellerDashboard child={<AddProduct/>}/>} />
    </Routes>
  </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SellerDashboard from "./components/seller/sellerDashboard/Dashboard";
import UserDashboard from "./components/user/userDashboard/Dashboard";
// import MyProduct from "./components/seller/sellerDashboard/MyProducts/MyProducts";
import Home from "./components/user/Home.js";
import Category from "./components/user/Category";
import SellerDashboard from "./components/seller/sellerDashboard/Dashboard";
import MyProduct from "./components/seller/sellerDashboard/MyProducts/MyProducts";
import DashboardHome from "./components/seller/sellerDashboard/Home";
import AddProduct from "./components/seller/sellerDashboard/MyProducts/addProduct";
import Orders from "./components/seller/sellerDashboard/Orders";
import Product from "./components/seller/sellerDashboard/Product";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/user/dashboard' element={<UserDashboard child={<Home />}/>} />
        <Route path='/user/category' element={<UserDashboard child={<Category />}/>} />
      <Route exact path='/seller/dashboard' element={<SellerDashboard child={<DashboardHome/>} />} />
      <Route exact path='/seller/myproducts' element={<SellerDashboard child={<MyProduct/>}/>} />
      <Route exact path='/seller/addproduct' element={<SellerDashboard child={<AddProduct/>}/>} />
      <Route exact path='/seller/editproduct' element={<SellerDashboard child={<AddProduct/>}/>} />
      <Route exact path='/seller/orders' element={<SellerDashboard child={<Orders/>}/>} />
      <Route exact path='/seller/product' element={<SellerDashboard child={<Product/>}/>} />
    </Routes>
  </Router>
  );
}

export default App;

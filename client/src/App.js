import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SellerDashboard from "./components/seller/sellerDashboard/Dashboard";
import UserDashboard from "./components/user/userDashboard/Dashboard";
// import MyProduct from "./components/seller/sellerDashboard/MyProducts/MyProducts";
import Home from "./components/user/Home.js";
import Category from "./components/user/Category";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/user/dashboard' element={<UserDashboard child={<Home />}/>} />
        <Route path='/user/category' element={<UserDashboard child={<Category />}/>} />
      </Routes>
    </Router>
  );
}

export default App;

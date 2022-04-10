import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SellerDashboard from "./components/seller/sellerDashboard/Dashboard";
import MyProduct from "./components/seller/sellerDashboard/MyProducts/MyProducts";

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path='/seller/dashboard' element={<SellerDashboard />} />
      <Route exact path='/seller/myproducts' element={<MyProduct />} />
    </Routes>
  </Router>
  );
}

export default App;

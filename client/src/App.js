import React from "react";
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./components/user/userDashboard/Dashboard";
import Home from "./components/user/Home.js";
import Category from "./components/user/Category";
import UserOrders from "./components/user/userDashboard/Orders"; 
import UserCart from "./components/user/Cart";
import Checkout from "./components/user/checkout/Checkout";
import UserProfile from "./components/user/UserProfile";
import EditUserProfile from "./components/user/EditUserProfile";
import Tracking from "./components/user/Tracking";
import Fashion from "./components/user/categories/Fashion";
import Electronics from "./components/user/categories/Electronics";
import Sports from "./components/user/categories/Sports";
import UserSignIn from "./components/user/UserSignIn";
import UserRegister from "./components/user/UserRegister";
import ProductPage from "./components/user/ProductPage"

import SellerDashboard from "./components/seller/Dashboard";
import MyProduct from "./components/seller/MyProducts/MyProducts";
import DashboardHome from "./components/seller/Home.js";
import AddProduct from "./components/seller/MyProducts/addProduct";
import Orders from "./components/seller/Orders/Orders";
import Product from "./components/seller/MyProducts/Product";
import Order from "./components/seller/Orders/Order";
import Payments from "./components/seller/Payments";
import Discounts from "./components/seller/Discounts/Discounts";
import AddDiscount from "./components/seller/Discounts/AddDiscount";
import Register from "./components/seller/Entry/register";
import SellerProfile from "./components/seller/Profile/SellerProfile";
import EditSellerProfile from "./components/seller/Profile/EditSellerProfile";
import SignIn from "./components/seller/Entry/SignIn";
import EditProduct from "./components/seller/MyProducts/editProduct";
import EditDiscount from "./components/seller/Discounts/editDiscount";
import EditOrder from "./components/seller/Orders/editOrder";

function App() {

  const [user, setUser] = React.useState(localStorage.getItem("userId"));
  const [seller, setSeller] = React.useState(localStorage.getItem("sellerId"));
  const [productInfo, setProductInfo] = React.useState();

  return (
    <Router>
      <Routes>
      <Route path="/" element={ <Navigate to="/user/signin" /> } />
        <Route path='/user/dashboard' element={<UserDashboard child={<Home user={user} />}/>} />
        {/* <Route path='/user/category' element={<UserDashboard child={<Category />}/>} /> */}
        <Route path='/user/orders' element={<UserDashboard child={<UserOrders user={user}/>}/>} />
        <Route path='/user/cart' element={<UserDashboard child={<UserCart user={user}/>}/>} />
        <Route path='/user/product' element={<UserDashboard child={<ProductPage/>}/>} />
        <Route path='/user/checkout' element={<Checkout user={user}/>} />
        <Route path='/user/profile' element={<UserDashboard child={<UserProfile user={user}/>}/>} />
        <Route path='/user/edituserprofile' element={<UserDashboard child={<EditUserProfile user={user}/>}/>} />
        <Route path='/user/tracking' element={<UserDashboard child={<Tracking user={user}/>}/>} />
        <Route path='/sports' element={<UserDashboard child={<Sports />}/>} />
        <Route path='/electronics' element={<UserDashboard child={<Electronics />}/>}/>
        <Route path='/fashion' element={<UserDashboard child={<Fashion />}/>} />
        <Route path='/user/signin' element={<UserSignIn setUser={setUser} />} />
        <Route path='/user/register' element={<UserRegister />} />

        <Route exact path='/seller/dashboard' element={<SellerDashboard header="Dashboard" child={<DashboardHome sellerId={seller}/>}/>} />
        <Route exact path='/seller/myproducts' element={<SellerDashboard header="My Products" child={<MyProduct sellerId={seller} setproductInfo={setProductInfo}/>}/>} />
        <Route exact path='/seller/addproduct' element={<SellerDashboard header="My Products" child={<AddProduct sellerId={seller}/>}/>} />
        <Route exact path='/seller/editproduct' element={<SellerDashboard header="My Products" child={<EditProduct sellerId={seller}/>}/>} />
        <Route exact path='/seller/orders' element={<SellerDashboard header="Orders" child={<Orders sellerId={seller}/>}/>} />
        <Route exact path='/seller/editorder' element={<SellerDashboard header="Orders" child={<EditOrder sellerId={seller}/>}/>} />
        <Route exact path='/seller/product' element={<SellerDashboard header="My Products" child={<Product sellerId={seller} productInfo={productInfo}/>}/>} />
        <Route exact path='/seller/order' element={<SellerDashboard header="Orders" child={<Order sellerId={seller}/>}/>} />
        <Route exact path='/seller/payments' element={<SellerDashboard header="Payments" child={<Payments sellerId={seller}/>}/>} />
        <Route exact path='/seller/discounts' element={<SellerDashboard header="Discounts" child={<Discounts sellerId={seller}/>}/>} />
        <Route exact path='/seller/adddiscount' element={<SellerDashboard header="Discounts" child={<AddDiscount sellerId={seller}/>}/>} />
        <Route exact path='/seller/editdiscount' element={<SellerDashboard header="Discounts" child={<EditDiscount sellerId={seller}/>}/>} />
        <Route exact path='/seller/register' element={<Register setSeller={setSeller}/>} />
        <Route exact path='/seller/signin' element={<SignIn setSeller={setSeller}  />} />
        <Route exact path='/seller/profile' element={<SellerDashboard header="Profile" child={<SellerProfile sellerId={seller}/>}/>} />
        <Route exact path='/seller/editsellerprofile' element={<SellerDashboard header="Profile" child={<EditSellerProfile sellerId={seller}/>} />}/>
      </Routes>
    </Router>
  );
}

export default App;

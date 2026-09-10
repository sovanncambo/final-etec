import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Layouts
import CustomerLayout from "./layout/CustomerLayout";
import DashboardLayout from "./layout/DashboardLayout";

// Customer Pages
import Home from "./page/customer/Home";
import FoodDetail from "./page/customer/FoodDetail";
import Cart from "./page/customer/Cart";
import Checkout from "./page/customer/Checkout";
import Login from "./page/customer/Login";
import Register from "./page/customer/Register";
import Aboutus from "./page/customer/Aboutus";
import Contact from "./page/customer/Contact";
import Location from './page/customer/Location';
import Categry from './page/customer/Categry';
// Dashboard Pages (Admin)
import Dashboard from "./page/dashboard/Dashboard";
import Food from "./page/dashboard/Food";
import AddFood from "./page/dashboard/AddFood";
import Categories from "./page/dashboard/Categories";
import Order from "./page/dashboard/Order";
import Users from "./page/dashboard/Users";

// Protected Route Component
import ProtectedRout from "./ProtectedRout";
import HomeproductData from "./Data/HomeproductData"

const App = () => {
   const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [ProductData,setProductData]=useState(HomeproductData)
  const [searchItem,setSearchItem] = useState('')

  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* Public Routes: អាចចូលបានដោយមិនបាច់ Login */}
       <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
       <Route path="/register" element={<Register/>} />

        {/* Customer Routes: អតិថិជន និង Staff មើលបាន */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home ProductData={ProductData}  />} />
          <Route path="/category" element={<Categry />} />
          <Route path="/fooddetail" element={<FoodDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/aboutus' element={<Aboutus/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/location' element={<Location/>}></Route>
        </Route>

        {/* Protected Admin Routes: ស្រោបដោយ ProtectedRout (ចូលបានតែ STAFF) */}
        <Route element={<ProtectedRout currentUser={currentUser} />}>
          <Route path="/admin" element={<DashboardLayout setCurrentUser={setCurrentUser} searchItem={searchItem} setSearchItem={setSearchItem}/>}>
            <Route index element={<Dashboard ProductData={ProductData} searchItem={searchItem}/>} />
            <Route path="food" element={<Food />} />
            <Route path="add-food" element={<AddFood setProductData={setProductData} />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Order />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>

        {/* បើវាយ Path មិនត្រូវ រុញទៅ Home វិញ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
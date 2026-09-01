<<<<<<< HEAD
import React from 'react'
import Home from './page/customer/Home'

const App = () => {
  return (
    <div>
      <Home/>
    </div>
  )
}

export default App
=======
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Layouts
import CustomerLayout from "./layout/CustomerLayout";
import DashboardLayout from "./layout/DashboardLayout";

// Customer Pages
import Home from "./page/customer/Home";
import Menu from "./page/customer/Menu";
import FoodDetail from "./page/customer/FoodDetail";
import Cart from "./page/customer/Cart";
import Checkout from "./page/customer/Checkout";
import Login from "./page/customer/Login";
import Register from "./page/customer/Register";

// Dashboard Pages (Admin)
import Dashboard from "./page/dashboard/Dashboard";
import Food from "./page/dashboard/Food";
import AddFood from "./page/dashboard/AddFood";
import Categories from "./page/dashboard/Categories";
import Order from "./page/dashboard/Order";
import Users from "./page/dashboard/Users";

// Protected Route Component
import ProtectedRout from "./ProtectedRout";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes: អាចចូលបានដោយមិនបាច់ Login */}
       <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
       <Route path="/register" element={<Register/>} />

        {/* Customer Routes: អតិថិជន និង Staff មើលបាន */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="food/:id" element={<FoodDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* Protected Admin Routes: ស្រោបដោយ ProtectedRout (ចូលបានតែ STAFF) */}
        <Route element={<ProtectedRout currentUser={currentUser} />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="food" element={<Food />} />
            <Route path="add-food" element={<AddFood />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Order />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>

        {/* បើវាយ Path មិនត្រូវ រុញទៅ Home វិញ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
>>>>>>> sovannKH

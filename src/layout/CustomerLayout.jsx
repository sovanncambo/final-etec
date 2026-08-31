import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function CustomerLayout() {
  return (
    <div className="customer-layout">
      {/* Header / Navbar បង្ហាញគ្រប់ទំព័រ Customer */}
      <header >
        <nav >
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      {/* ផ្នែកកណ្តាល៖ <Outlet /> នឹងផ្លាស់ប្តូរទៅតាម Route (Home, Menu, FoodDetail...) */}
      <main >
        <Outlet />
      </main>

     
      <footer >
          <p>2026 Food App. All rights reserved.</p>
      </footer>
    </div>
  );
}
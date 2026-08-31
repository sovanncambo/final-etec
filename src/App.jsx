import { BrowserRouter, Routes, Route ,Link} from "react-router-dom";

// Layouts
import CustomerLayout from "./layout/CustomerLayout";
import DashboardLayout from "./layout/DashboardLayout";

// ទំព័រខាង Customer
import Home from "./page/customer/Home";
import Menu from "./page/customer/Menu";
import FoodDetail from "./page/customer/FoodDetail";
import Cart from "./page/customer/Cart";
import Checkout from "./page/customer/Checkout";
import Login from "./page/customer/Login";
import Register from "./page/customer/Register";

// ទំព័រខាង Dashboard (Admin)
import Dashboard from "./page/dashboard/Dashboard";
import Food from "./page/dashboard/Food";
import AddFood from "./page/dashboard/AddFood";
import Categories from "./page/dashboard/Categories";
import Order from "./page/dashboard/Order";
import Users from "./page/dashboard/Users";

export default function App() {
  return (
    <BrowserRouter>
    <div className="flex gap-5">
      <Link to={'/'}>User</Link>
      <Link to={'/admin'}>Admin</Link>
    </div>
      <Routes>
        {/* Route សម្រាប់អតិថិជន (Customer) */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="food/:id" element={<FoodDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Route សម្រាប់ Admin (Dashboard) */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="food" element={<Food />} />
          <Route path="add-food" element={<AddFood />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Order />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
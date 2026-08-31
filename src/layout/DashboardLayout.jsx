
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar ខាងឆ្វេង */}
      <aside >
        <h2>Admin Panel</h2>
        <ul >
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/add-food" >Add Food</Link></li>
          <li><Link to="/admin/categories">Categories</Link></li>
          <li><Link to="/admin/orders" >Orders</Link></li>
          <li><Link to="/admin/users" >Users</Link></li>
        </ul>
      </aside>

      
      <div >
        {/* Dashboard Top Header */}
        <header >
          <span>Welcome, Admin!</span>
        </header>
        <main >
          <Outlet/>
        </main>
        <footer >
          <p>2026 Food App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/customer/Navbar';
const CustomerLayout = () => {
  return (
     <div className="customer-layout">
      
      <header >
        <Navbar/>
      </header>

    
      <main >
        <Outlet />
      </main>

     
      <footer >
          
      </footer>
    </div>
  )
}

export default CustomerLayout





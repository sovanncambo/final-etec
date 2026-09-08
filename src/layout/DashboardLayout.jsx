import React, { useState } from 'react'
import { Link, Outlet } from "react-router-dom";
import SideBar from '../components/deshboard/SideBar';
import Search from '../components/deshboard/Search';
const DashboardLayout = ({setCurrentUser,searchItem,setSearchItem}) => {

  return (
     <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar ខាងឆ្វេង */}
    

      <SideBar/>
      <div className='w-[100%]'> 
        {/* Dashboard Top Header */}
        <header className='py-3' >
          <Search searchItem={searchItem} setSearchItem={setSearchItem}/>

        </header>
        <main className='bg-gray-100'>
          <Outlet/>
        </main>
        <footer >
          <p>2026 Food App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default DashboardLayout



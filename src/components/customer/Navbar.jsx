import React from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
       <div className='nav-container w-full h-[100px]  shadow-2xl flex'>
         <div className="Comapany-logo w-[30%] h-full flex justify-center items-center gap-3">
            <div className='w-[75px] h-[75px] '>
              <img className='w-full h-full' src="https://i.pinimg.com/1200x/d8/9a/8a/d89a8aa6e670284f88a320353d7c3e18.jpg" alt="" />
            </div>
             <div>
               <h1 className='text-5xl font-bold'>Quick<span className='text-red-600'>Bite</span></h1>
              <p className='font-bold text-sm'>F A S T F O O D</p>
             </div>
         </div>
         <div className="Nav-Link w-[45%] h-full  flex justify-evenly text-[18px] items-center">
              <Link to={'/'} className='transition duration-200 hover:text-red-600 hover:underline'>Home</Link>
              <Link to={'/category'} className='transition duration-200 hover:text-red-600 hover:underline'>Category</Link>
              <Link to={'/aboutus'} className='transition duration-200 hover:text-red-600 hover:underline'>About Us</Link>
              <Link to={'/location'} className='tranition duration-200 hover:text-red-600 hover:underline'>Our Location</Link>
              <Link to={'/contact'} className='transition duration-200 hover:text-red-600 hover:underline'>Contact Us</Link>
         </div>
         <div className="Comapany-logo w-[25%] h-full flex justify-center items-center gap-[12px]">
            <MdOutlineShoppingCart className='text-2xl cursor-pointer'/>
            <button className='w-[100px] h-[40px] bg-red-600 text-white rounded-[10px] cursor-pointer '><Link to={'/login'}>Sign Up</Link></button>
         </div>
      </div>
    </div>
  )
}

export default Navbar

import React from 'react'

const DashboardNav = () => {
  return (
     <div className='flex w[200px]'>
      
            <div className='w-[40px] h-[40px] '>
              <img className='w-full h-full' src="https://i.pinimg.com/1200x/d8/9a/8a/d89a8aa6e670284f88a320353d7c3e18.jpg" alt="" />
            </div>
             <div>
               <h1 className='text- xl font-bold'>Quick<span className='text-red-600'>Bite</span></h1>
              <p className='font-bold text-[10px]'>F A S T F O O D</p>
             </div>
    </div>
  )
}

export default DashboardNav

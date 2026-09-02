import React from 'react'
import { TbTruckDelivery } from 'react-icons/tb'
import { SiCodefresh } from 'react-icons/si'
import { GiCottonFlower, GiPriceTag } from 'react-icons/gi'
import { FaArrowRightLong } from 'react-icons/fa6'
import Customerfavorite from '../../components/customer/Customerfavorite'

const Home = ({ProductData}) => {
 
  return (
    <div>
      <div  className='main-image w-full h-[690px] bg-amber-500 px-[70px] pt-[40px] '>
        <p className='font-medium ml-[10px]'>FAST FOOD GREAT TASTE</p>
        <h1 className='text-[80px] font-medium'>CRAVE IT.</h1>
        <h1 className='text-[80px] font-medium text-red-600'>LOVE IT.</h1>
        <p>Delicious meals, made fresh and served fast. <br /> Because good food makes good moments.</p>
        <div className='flex gap-[30px] mt-[15px]'>
          <button className='w-[130px] h-[40px] bg-red-600 text-white rounded-[8px] cursor-pointer hover:bg-red-800'>Order Now</button>
          <button className='w-[130px] h-[40px] outline-red-600 outline-1 cursor-pointer rounded-[8px] hover:bg-red-600 hover:text-white'>View Menu</button>
        </div>
        <div className='cotaint flex gap-10 mt-16'>
          <div className='fast-deli'>
            <div className='lgo '>
              <TbTruckDelivery className='text-4xl text-red-600'/>
            </div>
            <div className='cn'>
                <p className='font-medium text-sm'>Fast Delivery</p>
                <p className='text-sm'>Quick & reliable <br /> delivery to you</p>
            </div>
          </div>
          <div className='ferh-ingredient'>
            <div className='lgo '>
              <SiCodefresh className='text-4xl text-red-600' />
            </div>
            <div className='cn'>
                <p className='font-medium text-sm'>Fresh Ingredients</p>
                <p className='text-sm'>Hight quality & <br />always fresh</p>
            </div>
          </div>
          <div className='price-best'>
            <div className='lgo '>
              <GiPriceTag className='text-4xl text-red-600' />
            </div>
            <div className='cn'>
                <p className='font-medium text-sm'>Best Prices</p>
                <p className='text-sm'>Great taste at<br />great prices</p>
            </div>
          </div>
          <div className='statis'>
            <div className='lgo '>
             <GiCottonFlower className='text-4xl text-red-600'/>
            </div>
            <div className='cn'>
                <p className='font-medium text-sm'>100% Statisfaction</p>
                <p className='text-sm'>We care about <br />your happiness</p>
            </div>
          </div>
        </div>
      </div>    
      {/* Popular pick */}
      <div className='w-full h-[80px] py-3'>
        <p className='font-medium text-sm text-red-600 text-center'>POPULAR PICKS</p>
        <h3 className='font-medium text-3xl text-center'>Most Love Menu</h3>
      </div>
      {/* Product card */}
      <div className='product-container grid grid-cols-5 gap-[20px] max-w-[1200px] mx-auto '>
         {ProductData.map((items)=>(
             <div className="product-card w-[230px] h-[300px] shadow rounded-[10px]">
              <div className="image-product w-full h-[60%] ">
                    <img className='w-full h-full rounded-t-[10px]' src={items.img} alt="" />
              </div>
              <div className='content-product w-full h-[40%]'>
                  <div className="tittle">
                      <p className='font-bold text-center text-[17px] mt-1.5'> {items.title} </p>
                      <p className='Price text-center font-bold text-2xl text-red-600'>${items.Price}  </p>
                      <button className='w-[70%] h-[40px] flex items-center justify-center gap-1 rounded-[10px] mt-2 ml-8 cursor-pointer hover:bg-yellow-500 bg-yellow-400'>View Details<FaArrowRightLong className='mt-1' /></button>
                  </div>
              </div>
          </div>
         ))}    
      </div>
      {/* View all btn */}
      <div className='mt-8 flex justify-center'>
         <button className='w-[160px] h-[40px] bg-red-600 text-white rounded-[10px] flex items-center justify-center gap-1  hover:bg-red-700 cursor-pointer'>View Full Menu<FaArrowRightLong className='mt-1' /></button>
      </div>
      {/* HOt deal */}
      <div className='w-[90%] mx-auto h-[350px] bg-amber-400 mt-8 rounded-tl-[80px] rounded-br-[80px]'></div>
      {/* CustumerReview */}
      <Customerfavorite/>
    </div>
  )
}

export default Home

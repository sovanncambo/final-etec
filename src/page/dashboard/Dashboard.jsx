import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6' // ត្រូវប្រាកដថាបាន import មក
import DashBoardMenu from '../../components/deshboard/DashBoardMenu';
const Dashboard = ({ searchItem = "", ProductData = [] }) => {
  const safeSearch = (searchItem ?? "").toLowerCase().trim();

  const filterProduct = ProductData.filter((p) => {
    const title = (p?.title ?? "").toLowerCase();
    return title.includes(safeSearch);
  });

  return (
    <div className='p-4 pt-2'>
      {/* categoies */}
      <DashBoardMenu />
      {/* កែ grid-cols-md-3 ទៅជា md:grid-cols-3 */}
      <div className='product-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[20px] max-w-[1200px] mx-auto'>
        {filterProduct.map((items, index) => (
          // បន្ថែម key prop នៅទីនេះ
          <div key={items.id || index} className="product-card w-[230px] h-[300px] shadow rounded-[10px] bg-white">
            <div className="image-product w-full h-[60%]">
              <img className='w-full h-full object-cover rounded-t-[10px]' src={items.img} alt={items.title} />
            </div>
            <div className='content-product w-full h-[40%] p-2'>
              <div className="tittle">
                <p className='font-bold text-center text-[17px] truncate mt-1.5'> {items.title} </p>
                <p className='Price text-center font-bold text-2xl text-red-600'>${items.Price}</p>
                
                <button className='w-[80%] h-[35px] mx-auto flex items-center justify-center gap-1 rounded-[10px] mt-2 cursor-pointer hover:bg-yellow-500 bg-yellow-400 text-sm'>
                  View Details <FaArrowRightLong className='mt-0.5' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
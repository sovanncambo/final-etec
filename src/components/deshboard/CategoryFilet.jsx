import React from 'react'

const CategoryFilet = ({Image,category}) => {

    
  return (
    <button>
      <div className="bg-white w-[50px] h-[50px] rounded  flex flex-col items-center shadow "> 
        <div className="w-full h-[60%] flex justify-center px-1 py-1 overflow-">
            <img className='w-[25px] h-[25px] object-cover' src={Image} alt="categories" />   
        </div>

        <p className='text-[12px]'>{category}</p>
        
      </div>
    </button>
  )
}

export default CategoryFilet

import React from 'react'
import CategoryFilet from './CategoryFilet'

const DashBoardMenu = () => {
  return (
    <div className='mb-4 '>  
        <h3 className="text-2xl text-red-500 font-bold">Categries</h3>
        <div className='flex gap-5 mt-2'>
            <CategoryFilet  category='Berger' Image='https://cdn-icons-png.flaticon.com/512/1531/1531385.png'/>
            <CategoryFilet  category='Berger' Image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWMZQNFf1LTOCquDNbthLVVDRPBS9LmgLRK0Z0b_fgA&s=10'/>
            <CategoryFilet  category='Berger' Image='https://static.vecteezy.com/system/resources/previews/070/915/791/non_2x/a-3d-cartoon-sandwich-icon-isolated-on-transparent-background-png.png'/>
            <CategoryFilet  category='Berger' Image='https://static.vecteezy.com/system/resources/thumbnails/055/757/287/small_2x/pizza-icon-isolated-3d-render-png.png'/>
            <CategoryFilet  category='Berger' Image='https://cdn-icons-png.flaticon.com/512/5771/5771640.png'/>
            <CategoryFilet  category='Berger' Image='https://cdn-icons-png.flaticon.com/512/4163/4163765.png'/>
            <CategoryFilet  category='Berger' Image=''/>
        </div>
    </div>
  )
}

export default DashBoardMenu

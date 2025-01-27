import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditCategory from './AdminEditCategory';

const AdminCategoryCard = ({
    data,
    fetchData
}) => {

    const [editCategory,setEditCategory] = useState(false)

  return (
    <div className='bg-white p-4 rounded'>
    <div className='w-40'>
      <div className='w-32 h-32 flex justify-center items-center'>
      <img src={data?.imageUrl[0]} className='mx-auto object-fill h-full' />
      </div>
    <h1 className='text-ellipis line-clamp-2'>{data?.categoryName}</h1>

    <div>


    <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditCategory(true)}>
        <MdModeEditOutline />
    </div>

    </div>

      </div>

    {
        editCategory && (
        <AdminEditCategory categoryData={data} onClose={()=>setEditCategory(false)} fetchData={fetchData}/>
      )
    }
    
  </div>
  )
}

export default AdminCategoryCard

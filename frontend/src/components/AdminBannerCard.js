import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditBanner from './AdminEditBanner';

const AdminBannerCard = ({
    data,
    fetchData
}) => {
    const [editBanner, setEditBanner] = useState(false)
    
    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.images[0]} className='mx-auto object-fill h-full' />
                </div>
                <div className='mt-2'>
                    <p className='text-gray-600'>Order: {data?.order}</p>
                </div>
                <div>
                    <div 
                        className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' 
                        onClick={() => setEditBanner(true)}
                    >
                        <MdModeEditOutline />
                    </div>
                </div>
            </div>
            {
                editBanner && (
                    <AdminEditBanner 
                        bannerData={data} 
                        onClose={() => setEditBanner(false)} 
                        fetchData={fetchData}
                    />
                )
            }
        </div>
    )
}

export default AdminBannerCard
import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { BsListOl } from "react-icons/bs";
import AdminEditBanner from './AdminEditBanner';

const AdminBannerCard = ({ data, fetchData }) => {
    const [editBanner, setEditBanner] = useState(false);

    // Function to format position text
    const formatPosition = (position) => {
        return position?.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Function to get display text for order
    const getOrderDisplay = (order) => {
        if (order === 0) return "Top Banner";
        return `After ${order} ${order === 1 ? 'Card' : 'Cards'}`;
    };

    return (
        <div className='bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow'>
            <div className='space-y-4'>
                {/* Image Section */}
                <div className='w-full aspect-video rounded-lg overflow-hidden bg-slate-100'>
                    <img 
                        src={data?.images[0]} 
                        className='w-full h-full object-contain'
                        alt={`Banner for ${data?.serviceName}`}
                    />
                </div>

                {/* Info Section */}
                <div className='space-y-2'>
                    {/* Service Name */}
                    <h3 className='font-semibold text-lg text-gray-800'>
                        {data?.serviceName || 'Unnamed Service'}
                    </h3>

                    {/* Position */}
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <IoLocationOutline className="text-blue-500" />
                        <span>{formatPosition(data?.position)}</span>
                    </div>

                    {/* Display Order */}
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <BsListOl className="text-green-500" />
                        <span>{getOrderDisplay(data?.displayOrder)}</span>
                    </div>

                    {/* Status Badge */}
                    <div className='flex items-center gap-2'>
                        <span 
                            className={`px-2 py-1 text-xs rounded-full ${
                                data?.isActive 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                            }`}
                        >
                            {data?.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>

                {/* Edit Button */}
                <div className='flex justify-end'>
                    <button
                        onClick={() => setEditBanner(true)}
                        className='flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors'
                    >
                        <MdModeEditOutline />
                        <span className='text-sm'>Edit</span>
                    </button>
                </div>
            </div>

            {/* Edit Modal */}
            {editBanner && (
                <AdminEditBanner
                    bannerData={data}
                    onClose={() => setEditBanner(false)}
                    fetchData={fetchData}
                />
            )}
        </div>
    );
};

export default AdminBannerCard;
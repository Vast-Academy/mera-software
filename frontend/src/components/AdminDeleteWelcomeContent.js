import React from 'react'
import { CgClose } from "react-icons/cg";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminDeleteWelcomeContent = ({
    contentId,
    onClose,
    fetchData
}) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`${SummaryApi.deleteWelcomeContent.url}/${contentId}`, {
                method: SummaryApi.deleteWelcomeContent.method,
                credentials: 'include'
            })

            const responseData = await response.json()

            if(responseData.success){
                toast.success(responseData?.message)
                onClose()
                fetchData()
            }

            if(responseData.error){
                toast.error(responseData?.message)
            }
        } catch (error) {
            console.error("Error deleting welcome content:", error)
            toast.error("Failed to delete welcome content")
        }
    }

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-40 top-0 left-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-md'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Delete Welcome Content</h2>
                    <div className='text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose/>
                    </div>
                </div>

                <div className='py-4'>
                    <p>Are you sure you want to delete this welcome content?</p>
                    <p className='text-red-500 text-sm mt-2'>This action cannot be undone.</p>
                </div>

                <div className='flex justify-end gap-3'>
                    <button 
                        className='px-4 py-2 border rounded hover:bg-gray-100'
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminDeleteWelcomeContent
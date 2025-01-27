import React, { useState, useEffect } from 'react';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditBanner = ({
    onClose,
    bannerData,
    fetchData
}) => {
    // Initialize state with bannerData
    const [data, setData] = useState(bannerData || {
        images: [],
        order: 0,
        isActive: true
    });

    // Update state if bannerData changes
    useEffect(() => {
        if (bannerData) {
            setData(bannerData);
        }
    }, [bannerData]);

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        try {
            const uploadImageCloudinary = await uploadImage(file);
            setData((prev) => ({
                ...prev,
                images: [...prev.images, uploadImageCloudinary.url]
            }));
        } catch (error) {
            toast.error("Error uploading image");
            console.error("Error uploading image:", error);
        }
    };

    const handleDeleteImage = (index) => {
        setData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data._id) {
            toast.error("Banner ID not found");
            return;
        }

        try {
            const response = await fetch(`${SummaryApi.updateBanner.url}/${data._id}`, {
                method: SummaryApi.updateBanner.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                if (typeof fetchData === 'function') {
                    await fetchData();
                }
                return;
            }

            toast.error(responseData.message || "Failed to update banner");

        } catch (error) {
            console.error("API Error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[75%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Edit Banner</h2>
                    <div className='text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-4 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    {/* Order Input */}
                    <div>
                        <label htmlFor='order'>Display Order:</label>
                        <input
                            type='number'
                            id='order'
                            name='order'
                            value={data.order || 0}
                            onChange={handleOnChange}
                            className='w-full p-2 bg-slate-100 border rounded'
                            min="0"
                        />
                    </div>

                    {/* Active Status */}
                    <div className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            id='isActive'
                            name='isActive'
                            checked={data.isActive}
                            onChange={handleOnChange}
                            className='w-4 h-4'
                        />
                        <label htmlFor='isActive'>Active Banner</label>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor='uploadImageInput' className='block mb-2'>Banner Images:</label>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Banner Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadImage} />
                            </div>
                        </div>

                        {/* Image Preview */}
                        <div className='mt-2'>
                            {data.images.length > 0 ? (
                                <div className='flex flex-wrap gap-2'>
                                    {data.images.map((image, index) => (
                                        <div key={index} className='relative group'>
                                            <img
                                                src={image}
                                                alt={`Banner ${index + 1}`}
                                                className='w-20 h-20 object-cover border cursor-pointer'
                                                onClick={() => {
                                                    setFullScreenImage(image);
                                                    setOpenFullScreenImage(true);
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className='absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full hidden group-hover:block'
                                                onClick={() => handleDeleteImage(index)}
                                            >
                                                <MdDelete size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-red-500 text-sm mt-1'>* Please upload at least one banner image</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={data.images.length === 0}
                        className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 mt-4'
                    >
                        Update Banner
                    </button>
                </form>
            </div>

            {/* Full Screen Image Preview */}
            {openFullScreenImage && (
                <DisplayImage 
                    onClose={() => setOpenFullScreenImage(false)} 
                    imgUrl={fullScreenImage}
                />
            )}
        </div>
    );
};

export default AdminEditBanner;
import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
// import { MdDelete, MdAdd } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const GuestSlidesForm = ({ onClose, fetchData }) => {
    const [data, setData] = useState({
        title: '',
        subtitle: '',
        description: '',
        ctaButtons: [
            {
                text: '',
                link: '',
                type: 'primary'
            }
        ],
        isActive: true,
        displayOrder: 0
    });

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleGuestSlideChange = (field, value) => {
        setData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCtaButtonChange = (field, value) => {
        setData(prev => ({
            ...prev,
            ctaButtons: [{ ...prev.ctaButtons[0], [field]: value }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.title) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            const response = await fetch(SummaryApi.uploadGuestSlides.url, {
                method: SummaryApi.uploadGuestSlides.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData?.message);
                onClose();
                fetchData?.();
            } else {
                toast.error(responseData?.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error uploading guest slides');
        }
    };

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[75%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload Guest Slide</h2>
                    <div className='text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <div className="bg-slate-50 p-4 rounded mb-4">
                        <div className="grid gap-3">
                            <input
                                type="text"
                                placeholder="Title *"
                                value={data.title}
                                onChange={(e) => handleGuestSlideChange('title', e.target.value)}
                                className="p-2 bg-white border rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Subtitle"
                                value={data.subtitle}
                                onChange={(e) => handleGuestSlideChange('subtitle', e.target.value)}
                                className="p-2 bg-white border rounded"
                            />
                            <textarea
                                placeholder="Description"
                                value={data.description}
                                onChange={(e) => handleGuestSlideChange('description', e.target.value)}
                                className="p-2 bg-white border rounded h-20"
                            />

                            {/* CTA Button Fields */}
                            <div className="grid gap-2">
                                <input
                                    type="text"
                                    placeholder="Button Text"
                                    value={data.ctaButtons[0].text}
                                    onChange={(e) => handleCtaButtonChange('text', e.target.value)}
                                    className="p-2 bg-white border rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Button Link"
                                    value={data.ctaButtons[0].link}
                                    onChange={(e) => handleCtaButtonChange('link', e.target.value)}
                                    className="p-2 bg-white border rounded"
                                />
                                <select
                                    value={data.ctaButtons[0].type}
                                    onChange={(e) => handleCtaButtonChange('type', e.target.value)}
                                    className="p-2 bg-white border rounded"
                                >
                                    <option value="primary">Primary</option>
                                    <option value="secondary">Secondary</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={data.isActive}
                            onChange={handleOnChange}
                            className="w-4 h-4"
                        />
                        <label htmlFor="isActive">Active Content</label>
                    </div>

                    {/* Display Order */}
                    <div>
                        <label htmlFor="displayOrder" className="block mb-1">Display Order:</label>
                        <input
                            type="number"
                            id="displayOrder"
                            name="displayOrder"
                            value={data.displayOrder}
                            onChange={handleOnChange}
                            className="p-2 bg-slate-100 border rounded w-full"
                            min="0"
                        />
                    </div>

                    <button className='px-3 py-2 bg-red-600 text-white mt-4 hover:bg-red-700'>
                        Upload Guest Slide
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GuestSlidesForm;
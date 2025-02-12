import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import RichTextEditor from '../helpers/richTextEditor';

const UserWelcomeForm = ({ onClose, fetchData }) => {
    const [data, setData] = useState({
        title: '',
        description: '',
        cta: {
            text: '',
            link: ''
        },
        isActive: true
    });

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCtaChange = (field, value) => {
        setData(prev => ({
            ...prev,
            cta: { ...prev.cta, [field]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.title) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            const response = await fetch(SummaryApi.uploadUserWelcome.url, {
                method: SummaryApi.uploadUserWelcome.method,
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
            toast.error('Error uploading user welcome');
        }
    };

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[75%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload User Welcome</h2>
                    <div className='text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <div className="grid gap-3">
                        <input
                            type="text"
                            placeholder="Title *"
                            name="title"
                            value={data.title}
                            onChange={handleOnChange}
                            className="p-2 bg-slate-100 border rounded"
                            required
                        />
                        <RichTextEditor
                            value={data.description}
                            onChange={(content) => setData(prev => ({ ...prev, description: content }))}
                            placeholder="Description..."
                        />
                        <input
                            type="text"
                            placeholder="CTA Text"
                            value={data.cta.text}
                            onChange={(e) => handleCtaChange('text', e.target.value)}
                            className="p-2 bg-slate-100 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="CTA Link"
                            value={data.cta.link}
                            onChange={(e) => handleCtaChange('link', e.target.value)}
                            className="p-2 bg-slate-100 border rounded"
                        />
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

                    <button className='px-3 py-2 bg-red-600 text-white mt-4 hover:bg-red-700'>
                        Upload User Welcome
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserWelcomeForm;
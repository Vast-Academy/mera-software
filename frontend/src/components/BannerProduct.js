import React, { useEffect, useState } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import SummaryApi from '../common';

const BannerProduct = ({ serviceName = "home" }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch banners from API
    const fetchBanners = async () => {
        try {
            const response = await fetch(SummaryApi.allBanner.url);
            const data = await response.json();
            if (data.success) {
                // Filter banners for home page
                const filteredBanners = data.data.filter(banner => 
                    banner.position === "home" && banner.isActive
                );
                // Sort banners by order if needed
                const sortedBanners = filteredBanners.sort((a, b) => a.order - b.order);
                setBanners(sortedBanners);
            }
        } catch (error) {
            console.error("Error fetching banners:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, [serviceName]);

    const nextImage = () => {
        if (banners.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1);
        }
    };

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1);
        }
    };

    // Updated useEffect for auto-slide with dynamic duration
    useEffect(() => {
        const currentBanner = banners[currentImage];
        // Default to 5 seconds if no duration specified
        const slideDuration = (currentBanner?.duration || 5) * 1000;
    
        const interval = setInterval(() => {
            if (banners.length - 1 > currentImage) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, slideDuration);
        
        return () => clearInterval(interval);
    }, [currentImage, banners]);


    if (loading) {
        return (
            <div className='container mx-auto px-4 md:mt-5 rounded'>
                <div className='h-40 md:h-[400px] w-full bg-slate-200 animate-pulse'></div>
            </div>
        );
    }

    if (banners.length === 0) {
        return null; // No banners to show
    }

    return (
        <div className='container mx-auto px-4 md:mt-5 rounded'>
            <div className='h-40 md:h-auto w-full bg-slate-200 relative rounded-lg shadow-lg'>
                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>
                {/* desktop and tablet version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {banners.map((banner) => (
                        <div className='w-full h-full min-h-full min-w-full transition-all' 
                             key={banner._id} 
                             style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                            <img src={banner.images[0]} className='w-full h-full object-cover' alt="Banner" />
                        </div>
                    ))}
                </div>
                {/* mobile version */}
                <div className='flex h-full w-full overflow-hidden md:hidden rounded-lg'>
                    {banners.map((banner) => (
                        <div className='w-full h-full min-h-full min-w-full transition-all' 
                             key={banner._id} 
                             style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                            <img src={banner.images[0]} className='rounded-lg w-full h-full object-cover' alt="Banner" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;

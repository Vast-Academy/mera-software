import React, { useEffect, useState, useRef } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import SummaryApi from '../common';

const BannerProduct = ({ serviceName = "home" }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    
    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    // Fetch banners from API
    const fetchBanners = async () => {
        try {
            const response = await fetch(SummaryApi.allBanner.url);
            const data = await response.json();
            if (data.success) {
                const filteredBanners = data.data.filter(banner => 
                    banner.position === "home" && banner.isActive
                );
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

    // Touch event handlers
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && currentImage < banners.length - 1) {
            nextImage();
        } else if (isRightSwipe && currentImage > 0) {
            prevImage();
        }
    };

    // Auto slide effect
    useEffect(() => {
        const currentBanner = banners[currentImage];
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
        return null;
    }

    return (
        <div className='container mx-auto px-2 md:mt-5 rounded'>
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
                {/* mobile version with touch events */}
                <div 
                    className='flex h-full w-full overflow-hidden md:hidden rounded-lg'
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {banners.map((banner) => (
                        <div className='w-full h-full min-h-full min-w-full transition-all' 
                             key={banner._id} 
                             style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                            <img src={banner.images[0]} className='rounded-lg w-full h-full object-cover' alt="Banner" />
                        </div>
                    ))}
                </div>
            </div>
            {/* Slider Indicators */}
            <div className="flex justify-center mt-3 gap-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentImage === index ? 'bg-blue-500 w-4' : 'bg-gray-300'
                        }`}
                        onClick={() => setCurrentImage(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerProduct;
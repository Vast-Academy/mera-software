import React, { useEffect, useState, useCallback  } from 'react'
import { Link } from 'react-router-dom'
import SummaryApi from '../common'
// import SingleBanner from './SingleBanner'

const VerticalCard = ({loading, data = [], currentCategory = ''}) => {
    const loadingList = new Array(8).fill(null);
    const [banners, setBanners] = useState([]);
   // Function to shuffle array
   const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

useEffect(() => {
    const fetchBanners = async () => {
        try {
            const response = await fetch(SummaryApi.allBanner.url);
            const responseData = await response.json();
            if (responseData.success && responseData.data) {
                // Filter active banners for current category
                const categoryBanners = responseData.data.filter(banner => 
                    banner.isActive && 
                    banner.position === currentCategory
                );
                
                // Group and shuffle banners
                const groupedBanners = {};
                categoryBanners.forEach(banner => {
                    if (!groupedBanners[banner.displayOrder]) {
                        groupedBanners[banner.displayOrder] = [];
                    }
                    groupedBanners[banner.displayOrder].push(banner);
                });

                // Shuffle each group
                Object.keys(groupedBanners).forEach(order => {
                    if (groupedBanners[order].length > 1) {
                        groupedBanners[order] = shuffleArray(groupedBanners[order]);
                    }
                });

                setBanners(groupedBanners);
            }
        } catch (error) {
            console.error("Error fetching banners:", error);
        }
    };

    fetchBanners();

    // Set up interval for periodic reshuffling
    const intervalId = setInterval(() => {
        setBanners(prevBanners => {
            const newBanners = { ...prevBanners };
            Object.keys(newBanners).forEach(order => {
                if (newBanners[order].length > 1) {
                    newBanners[order] = shuffleArray(newBanners[order]);
                }
            });
            return newBanners;
        });
    }, 5000); // Reshuffle every 5 seconds

    return () => clearInterval(intervalId);
}, [currentCategory]);

const getBannerForPosition = useCallback((index) => {
    // For top banner
    if (index === -1 && banners['0'] && banners['0'].length > 0) {
        const randomImageIndex = Math.floor(Math.random() * banners['0'][0].images.length);
        return {
            ...banners['0'][0],
            currentImage: banners['0'][0].images[randomImageIndex]
        };
    }

    // For in-between banners
    const orderKey = (index + 1).toString();
    if (banners[orderKey] && banners[orderKey].length > 0) {
        const randomImageIndex = Math.floor(Math.random() * banners[orderKey][0].images.length);
        return {
            ...banners[orderKey][0],
            currentImage: banners[orderKey][0].images[randomImageIndex]
        };
    }

    return null;
}, [banners]);

    return (
        <div className='grid grid-cols-1 gap-6 px-2 pb-4 mb-28'>
        {/* Show top banner */}
        {getBannerForPosition(-1) && (
                <div className="w-full">
                    <img 
                        src={getBannerForPosition(-1).currentImage}
                        alt="Top Banner"
                        className="w-full h-40 object-cover rounded-lg"
                    />
                </div>
            )}

            {loading ? (
                loadingList.map((_, index) => (
                    <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm'>
                        <div className='bg-slate-200 h-40 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                        </div>
                        <div className='p-4 grid gap-3 w-full'>
                            <h2 className='font-medium text-base md:text-lg text-ellipis line-clamp-1 text-black p-1 animate-pulse rounded-full bg-slate-200 py-2'></h2>
                            <p className='capitalize text-slate-500 py-2 animate-pulse rounded-full bg-slate-200 p-1'></p>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                            </div>
                            <button className='text-sm text-white px-3 p-1 animate-pulse rounded-full bg-slate-200 py-2'></button>
                        </div>
                    </div>
                ))
            ) : (
                data.map((product, index) => (
                    <React.Fragment key={product._id || index}>
                        <Link to={"/product/"+product?._id} className="bg-white p-3 rounded-lg block border border-gray-200">
                            <div className="space-y-2.5">
                                <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full w-fit">
                                    MOST POPULAR  
                                </div>

                                <div className="flex justify-between items-start gap-2">
                                    <div>
                                        <h3 className="font-bold text-lg">{product?.serviceName}</h3>
                                        <p className="text-gray-600 text-sm capitalize">
                                            {product?.category.split('_').join(' ')}
                                        </p>
                                    </div>
                                    <button className="shrink-0 border border-blue-500 text-blue-500 px-3 py-1 rounded-lg text-sm">
                                        ADD +
                                    </button>
                                </div>

                                <ul className="space-y-1.5 text-gray-600 text-sm">
                                    {product?.packageIncludes?.map((detail, idx) => (
                                        <li key={idx} className="flex items-center gap-2 capitalize">
                                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-baseline gap-2">
                                    <span className="text-lg">₹</span>
                                    <span className="text-2xl font-bold">
                                        {(product?.sellingPrice || 15999).toLocaleString()}
                                    </span>
                                    <div className="ml-1 flex items-center gap-2">
                                        <span className="text-gray-400 text-sm line-through">
                                            ₹{(product?.price || 34000).toLocaleString()}
                                        </span>
                                        <span className="text-green-600 text-sm">25% OFF</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                         {/* Show banner after card if exists */}
                         {getBannerForPosition(index) && (
                            <div className="w-full">
                                <img 
                                    src={getBannerForPosition(index).currentImage}
                                    alt={`Banner after card ${index + 1}`}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </React.Fragment>
                ))
            )}
        </div>
    );
}

export default VerticalCard
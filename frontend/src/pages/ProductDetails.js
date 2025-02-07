import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaStarHalf } from "react-icons/fa";
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import CartPopup from '../components/CartPopup';
import TriangleMazeLoader from '../components/TriangleMazeLoader';

const ProductDetails = () => {
  const [data, setData] = useState({
    serviceName: "",
    category: "",
    packageIncludes: [],
    perfectFor: [],
    serviceImage: [],
    description: "",
    websiteTypeDescription: "",
    price: "",
    sellingPrice: ""
  });

  const params = useParams();
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  });

  const [zoomImage, setZoomImage] = useState(false);
  const minSwipeDistance = 50;

  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    try {
      setInitialLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setInitialLoading(false);

      setLoading(true);
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          productId: params?.id
        })
      });
      
      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.serviceImage[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setInitialLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  // Mobile touch handlers
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
    
    if (isLeftSwipe) {
      setActiveImageIndex(prev => 
        prev === data.serviceImage.length - 1 ? 0 : prev + 1
      );
      setActiveImage(data.serviceImage[activeImageIndex]);
    }
    if (isRightSwipe) {
      setActiveImageIndex(prev => 
        prev === 0 ? data.serviceImage.length - 1 : prev - 1
      );
      setActiveImage(data.serviceImage[activeImageIndex]);
    }
  };

  // Desktop handlers
  const handleMouseEnterProduct = (imageURL, index) => {
    setActiveImage(imageURL);
    setActiveImageIndex(index);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    try {
      setAddToCartLoading(true);
      const result = await addToCart(e, id);

      // Artificial delay of 1 second
      await new Promise(resolve => setTimeout(resolve, 1500));

       await fetchUserAddToCart();
      setAddToCartLoading(false); // Hide loader
      setShowCartPopup(true); // Show cart popup
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddToCartLoading(false); // Hide loader in case of error
    } finally {
      setAddToCartLoading(false); // Always ensure loader is hidden
    }
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  const calculateDiscount = () => {
    const discount = ((data.price - data.sellingPrice) / data.price) * 100;
    return Math.round(discount);
  };

  if (initialLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
        <div className="rounded-lg p-8">
          <TriangleMazeLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
       {/* Add to Cart Loading Overlay */}
       {addToCartLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="rounded-lg p-8">
            <TriangleMazeLoader />
          </div>
        </div>
      )}
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4 relative">
        {/* Mobile View */}
        <div className="lg:hidden w-full">
          <div className="w-full h-auto">
            <div 
              className="w-full h-full"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <img 
                src={data.serviceImage[activeImageIndex]} 
                className="w-full h-full object-contain"
                alt={`Product ${activeImageIndex + 1}`}
              />
            </div>
          </div>
          {/* Dots for Mobile - Moved outside */}
          <div className="flex justify-center gap-2 mt-4">
            {data.serviceImage.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveImageIndex(index);
                  setActiveImage(data.serviceImage[index]);
                }}
                className={`w-2 h-2 rounded-full ${
                  index === activeImageIndex ? 'bg-black' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex gap-4 sticky">
          <div className="h-fit flex flex-col lg:flex-row-reverse gap-4">
            <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
              <img 
                src={activeImage} 
                className="h-full w-full object-scale-down mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
              />
              
              {zoomImage && (
                <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0">
                  <div 
                    className="h-full w-full min-w-[500px] min-h-[400px] mix-blend-multiply scale-125"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                    }}>
                  </div>
                </div>
              )}
            </div>

            <div className="h-full">
              {loading ? (
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                  {new Array(4).fill(null).map((_, index) => (
                    <div className="h-20 w-20 bg-slate-200 rounded animate-pulse" key={`loadingImage${index}`} />
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                  {data?.serviceImage?.map((imgURL, index) => (
                    <div 
                      className={`h-20 w-20 bg-slate-200 rounded p-1 ${
                        index === activeImageIndex ? 'border-2 border-gray-900' : ''
                      }`} 
                      key={imgURL}
                    >
                      <img 
                        src={imgURL} 
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer" 
                        onMouseEnter={() => handleMouseEnterProduct(imgURL, index)}
                        onClick={() => handleMouseEnterProduct(imgURL, index)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section - Same for both Mobile and Desktop */}
        {loading ? (
          <div className="grid w-full gap-1">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full"></p>
            <h2 className="text-2xl lg:text-4xl font-medium bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full"></p>
          </div>
        ) : (
          <div className="flex-1 px-2 py-4 space-y-4 lg:px-4 lg:py-6 lg:space-y-6">
            <div className="text-sm text-gray-600">
              {data?.category?.split('_').join(' ')}
            </div>

            <div>
              <h1 className="text-2xl lg:text-4xl font-medium mb-4">{data?.serviceName}</h1>
              
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">₹{data.sellingPrice?.toLocaleString()}</span>
                <span className="text-gray-400 line-through">₹{data.price?.toLocaleString()}</span>
                <span className="text-sm text-green-600 font-medium">
                  {calculateDiscount()}% off
                </span>
              </div>
            </div>

            {/* Package Includes */}
            <div>
              <h2 className="text-lg font-medium mb-3">Package Includes</h2>
              <div className="space-y-2">
                {data?.packageIncludes?.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 bg-green-50 p-3 rounded-lg"
                  >
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Perfect For */}
            <div>
              <h2 className="text-lg font-medium mb-3">Perfect For</h2>
              <div className="flex flex-wrap gap-2">
                {data?.perfectFor?.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm lg:prose-base max-w-none">
              <div dangerouslySetInnerHTML={{ __html: data?.description }} />
              <div dangerouslySetInnerHTML={{ __html: data?.websiteTypeDescription }} />
            </div>

            {/* Action Buttons - Fixed on mobile */}
            <div className="lg:static fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex gap-3 z-10">
              <button 
                className="flex-1 px-6 py-3 bg-white border border-gray-900 text-gray-900 rounded-lg font-medium"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy Now
              </button>
              <button 
                className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategoryWiseProductDisplay 
          category={data?.category} 
          heading={"Recommended Product"}
        />
      )}

      <CartPopup 
        isOpen={showCartPopup}
        onClose={() => setShowCartPopup(false)}
        product={data}
      />
    </div>
  );
};

export default ProductDetails;
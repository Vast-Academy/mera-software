import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import { LiaCogSolid } from "react-icons/lia";

const CategoryIcons = {
  static_websites: () => (
    <svg viewBox="0 0 40 40" className="w-16 h-16 drop-shadow-sm">
    <defs>
      <linearGradient id="staticWebGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e"/>
        <stop offset="100%" stopColor="#16a34a"/>
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <rect x="5" y="5" width="30" height="6" rx="1" fill="url(#staticWebGrad)"/>
    <rect x="5" y="13" width="20" height="4" rx="1" fill="#e2e8f0"/>
    <rect x="5" y="19" width="30" height="4" rx="1" fill="#e2e8f0"/>
    <rect x="5" y="25" width="15" height="4" rx="1" fill="#e2e8f0"/>
    <circle cx="33" cy="15" r="2" fill="url(#staticWebGrad)"/>
  </svg>
  ),
  standard_websites: () => (
    <svg viewBox="0 0 40 40" className="w-16 h-16 drop-shadow-sm">
    <defs>
      <linearGradient id="standardWebGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#2563eb"/>
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <rect x="5" y="5" width="30" height="8" rx="1" fill="url(#standardWebGrad)"/>
    <circle cx="8" cy="9" r="1.5" fill="#fff"/>
    <circle cx="13" cy="9" r="1.5" fill="#fff"/>
    <circle cx="18" cy="9" r="1.5" fill="#fff"/>
    <rect x="5" y="15" width="14" height="20" rx="1" fill="#e2e8f0"/>
    <rect x="21" y="15" width="14" height="20" rx="1" fill="url(#standardWebGrad)" fillOpacity="0.3"/>
  </svg>
  ),
  dynamic_websites: () => (
    <svg viewBox="0 0 40 40" className="w-16 h-16 drop-shadow-sm">
          <defs>
            <linearGradient id="dynamicWebGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7"/>
              <stop offset="100%" stopColor="#9333ea"/>
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
          <rect x="5" y="5" width="30" height="8" rx="1" fill="url(#dynamicWebGrad)"/>
          <circle cx="8" cy="9" r="1.5" fill="#fff"/>
          <circle cx="13" cy="9" r="1.5" fill="#fff"/>
          <circle cx="18" cy="9" r="1.5" fill="#fff"/>
          <rect x="5" y="15" width="30" height="20" rx="1" fill="url(#dynamicWebGrad)" fillOpacity="0.1"/>
          <path d="M10 22h20M10 28h15" stroke="url(#dynamicWebGrad)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="32" cy="25" r="3" fill="url(#dynamicWebGrad)"/>
          <circle cx="25" cy="25" r="2" fill="url(#dynamicWebGrad)" fillOpacity="0.6"/>
          <circle cx="18" cy="25" r="1" fill="url(#dynamicWebGrad)" fillOpacity="0.3"/>
        </svg>
  ),
  web_apps: () => (
    <svg viewBox="0 0 40 40" className="w-16 h-16 drop-shadow-sm">
    <defs>
      <linearGradient id="webAppGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5"/>
        <stop offset="100%" stopColor="#3b82f6"/>
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <rect x="5" y="5" width="30" height="20" rx="2" fill="url(#webAppGrad)"/>
    <rect x="8" y="8" width="24" height="14" rx="1" fill="#fff" fillOpacity="0.1"/>
    <circle cx="11" cy="11" r="1" fill="#fff"/>
    <circle cx="15" cy="11" r="1" fill="#fff"/>
    <circle cx="19" cy="11" r="1" fill="#fff"/>
    <rect x="10" y="28" width="20" height="8" rx="1" fill="#e2e8f0"/>
  </svg>
  ),
  mobile_apps: () => (
    <svg viewBox="0 0 40 40" className="w-16 h-16 drop-shadow-sm">
    <defs>
      <linearGradient id="mobileAppGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899"/>
        <stop offset="100%" stopColor="#f43f5e"/>
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <rect x="12" y="5" width="16" height="30" rx="2" fill="url(#mobileAppGrad)"/>
    <rect x="14" y="8" width="12" height="22" rx="1" fill="#fff" fillOpacity="0.1"/>
    <circle cx="20" cy="32" r="2" fill="#fff"/>
    <circle cx="17" cy="12" r="1" fill="#fff"/>
    <circle cx="20" cy="12" r="1" fill="#fff"/>
    <circle cx="23" cy="12" r="1" fill="#fff"/>
  </svg>
  ),
  website_updates: () => (
    <svg viewBox="0 0 40 40" className="w-16 h-16 drop-shadow-sm">
          <defs>
            <linearGradient id="updateWebGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6"/>
              <stop offset="100%" stopColor="#2563eb"/>
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
          <rect x="5" y="5" width="30" height="22" rx="2" fill="url(#updateWebGrad)" fillOpacity="0.1"/>
          <path d="M20,10 A8,8 0 1,0 20,26 A8,8 0 1,0 20,10" 
                fill="none" 
                stroke="url(#updateWebGrad)" 
                strokeWidth="2"
                strokeLinecap="round"/>
          <path d="M20,14 L20,19 L24,21" 
                fill="none" 
                stroke="url(#updateWebGrad)" 
                strokeWidth="2"
                strokeLinecap="round"/>
          <circle cx="20" cy="18" r="1.5" fill="url(#updateWebGrad)"/>
          <LiaCogSolid className="absolute bottom-2 right-2 w-4 h-4 text-orange-500 drop-shadow-md" />
        </svg>
  ),
  app_update: () => (
    <svg viewBox="0 0 40 40" className="w-16 h-16 drop-shadow-sm">
    <defs>
      <linearGradient id="appUpdateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#0ea5e9"/>
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <rect x="12" y="5" width="16" height="30" rx="2" fill="url(#appUpdateGrad)"/>
    <rect x="14" y="8" width="12" height="22" rx="1" fill="#fff" fillOpacity="0.1"/>
    <path d="M16,20 L24,20 M20,16 L20,24" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
  )
};

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(7).fill(null);

  const fetchCategoryProduct = async() => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto px-7 py-6">
      <div className="flex flex-row gap-3 flex-wrap">
        {loading ? (
          categoryLoading.map((el, index) => (
            <div className="flex flex-col items-center" key={"categoryLoading"+index}>
              <div className="w-16 h-16 bg-slate-200 rounded-lg animate-pulse" />
              <div className="w-12 h-8 bg-slate-200 rounded mt-1 animate-pulse" />
            </div>
          ))
        ) : (
          categoryProduct.map((product) => (
            <Link 
              to={"/product-category?category="+product?.category} 
              className="flex-shrink-0" 
              key={product?.category}
            >
              <div className="flex flex-col items-center p-1">
                <div className="">
                  <div className=" relative z-10">
                    {CategoryIcons[product?.category] ? 
                      CategoryIcons[product?.category]() : 
                      <img 
                        src={product?.serviceImage[0]} 
                        alt={product?.category}
                        className=" w-20 h-16 object-contain "
                      />
                    }
                  </div>
                </div>
                <div className="text-center mt-2 mb-2">
                  {product?.category.split('_').map((word, i) => (
                    <div key={i} className="text-xs font-medium text-gray-600 space-x-1  capitalize">
                      {word}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
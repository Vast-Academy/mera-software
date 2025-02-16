import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import { useDatabase } from '../context/DatabaseContext';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const { db, isCacheValid, isInitialized  } = useDatabase();
  const { advancedCache, isInitialized, isOnline } = useDatabase();
  const categoryLoading = new Array(6).fill(null);

  useEffect(() => {
    const loadCategories = async () => {
      if (!isInitialized) return;
    
      try {
        const cachedData = await advancedCache.get('categories', 'categories_all');
        
        if (cachedData?.data) {
          setCategories(cachedData.data);
          setLoading(false);
          
          if (isOnline) {
            const response = await fetch(SummaryApi.allCategory.url);
            const freshData = await response.json();
            if (freshData.success) {
              setCategories(freshData.data);
              // Add unique key for categories
              await advancedCache.store('categories', 'categories_all', freshData.data, 'medium');
            }
          }
          return;
        }
    
        if (isOnline) {
          const response = await fetch(SummaryApi.allCategory.url);
          const data = await response.json();
          if (data.success) {
            setCategories(data.data);
            // Add unique key for categories
            await advancedCache.store('categories', 'categories_all', data.data, 'medium');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadCategories();
  }, [advancedCache, isInitialized, isOnline]);


  if (loading) {
    return (
      <div className="my-6 mx-4 rounded-lg w-auto bg-white">
        <div className="flex flex-wrap md:flex-nowrap w-full rounded-lg overflow-hidden">
          {categoryLoading.map((_, index) => (
            <div className="w-1/3 flex items-center justify-center border h-24" key={`loading-${index}`}>
              <div className="flex flex-col items-center w-full">
                <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse" />
                <div className="w-12 h-3 bg-slate-200 rounded mt-1 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 mx-4 rounded-lg w-auto bg-white">
      <div className="flex flex-wrap md:flex-nowrap w-full rounded-lg overflow-hidden">
        {categories.map((category) => (
          <Link
            to={`/product-category?category=${category.categoryValue}`}
            key={category.categoryId}
            className="w-1/3 flex items-center justify-center h-32 px-3 bg-white border border-gray-50 active:bg-gray-100 md:hover:bg-[#F5EBE4] transition-all duration-200 touch-manipulation"
          >
            <div className="flex flex-col items-center w-full h-28">
              <div className="relative mb-1 pt-2">
                <div className="" style={{ width: '50px', height: '50px' }}>
                  <img
                    src={category?.imageUrl}
                    alt={category.categoryName}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'placeholder-image-url';
                    }}
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <span className="text-gray-700 capitalize text-center" style={{ lineHeight: '18px', fontSize: '13px' }}>
                  {category.categoryName}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
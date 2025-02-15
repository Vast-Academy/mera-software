import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import { useDatabase } from '../context/DatabaseContext';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { db, isCacheValid, isInitialized  } = useDatabase();
  const categoryLoading = new Array(6).fill(null);

  useEffect(() => {
    const loadCategories = async () => {
      if (!isInitialized) {
        return;
      }

      try {
        // Try to get data from cache first
        const cachedData = await db.get('categories', 'all');
        
        if (cachedData && isCacheValid(cachedData.timestamp)) {
          setCategories(cachedData.data);
          setLoading(false);
          
          // Fetch fresh data in background
          const response = await fetch(SummaryApi.allCategory.url);
          const freshData = await response.json();
          if (freshData.success) {
            setCategories(freshData.data);
            await db.set('categories', {
              id: 'all',
              data: freshData.data,
              timestamp: new Date().toISOString()
            });
          }
          return;
        }
        
        // If no cache or cache is stale, fetch fresh data
        const response = await fetch(SummaryApi.allCategory.url);
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
          
          // Update cache
          await db.set('categories', {
            id: 'all',
            data: data.data,
            timestamp: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Error loading categories:', error);
        
        // Try to load from cache in case of error
        try {
          const cachedData = await db.get('categories', 'all');
          if (cachedData?.data) {
            setCategories(cachedData.data);
          }
        } catch (cacheError) {
          console.error('Error loading from cache:', cacheError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [db, isCacheValid, isInitialized]);

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
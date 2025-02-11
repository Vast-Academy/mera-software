import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import { useDatabase } from '../context/DatabaseContext';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { db, fetchAndCache } = useDatabase();

  const categoryLoading = new Array(6).fill(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Using fetchAndCache from our DatabaseContext
      const dataResponse = await fetchAndCache(SummaryApi.allCategory.url);
      
      if (dataResponse.success && Array.isArray(dataResponse.data)) {
        setCategories(dataResponse.data);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error.message);
      
      // Try to load from IndexedDB as fallback
      try {
        const cachedData = await db.get('pages', SummaryApi.allCategory.url);
        if (cachedData && cachedData.data && Array.isArray(cachedData.data.data)) {
          setCategories(cachedData.data.data);
          setError(null); // Clear error if we successfully loaded from cache
        }
      } catch (cacheError) {
        console.error('Error loading from cache:', cacheError);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (error && categories.length === 0) {
    return (
      <div className="my-8 mx-4 text-red-600">
        Error loading categories: {error}
      </div>
    );
  }

  return (
    <div className="my-6 mx-4 rounded-lg w-auto bg-white">
      <div className="flex flex-wrap md:flex-nowrap w-full rounded-lg overflow-hidden">
        {loading && categories.length === 0 ? (
          categoryLoading.map((el, index) => (
            <div className="w-1/3 flex items-center justify-center border h-24" key={`loading-${index}`}>
              <div className="flex flex-col items-center w-full">
                <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse" />
                <div className="w-12 h-3 bg-slate-200 rounded mt-1 animate-pulse" />
              </div>
            </div>
          ))
        ) : (
          categories.map((category) => (
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
                  <span className=" text-gray-700 capitalize text-center" style={{ lineHeight: '18px', fontSize: '13px' }}>
                    {category.categoryName}
                  </span>
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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';

const CACHE_KEY = 'categories_data';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryLoading = new Array(8).fill(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      
      const response = await fetch(SummaryApi.allCategory.url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const dataResponse = await response.json();
      console.log('API Response data:', dataResponse); // Debug log

      if (dataResponse.success && Array.isArray(dataResponse.data)) {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: dataResponse.data,
          timestamp: Date.now()
        }));
        
        setCategories(dataResponse.data);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error.message);
      
      // Try to load from cache as fallback
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { data } = JSON.parse(cached);
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data);
            setError(null); // Clear error if we successfully loaded from cache
          }
        } catch (cacheError) {
          console.error('Error loading from cache:', cacheError);
        }
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
    <div className="my-5 mb-7 ">
      <div className="flex flex-wrap md:flex-nowrap w-full">
        {loading && categories.length === 0 ? (
          categoryLoading.map((el, index) => (
            <div className="w-1/4 flex items-center justify-center border h-24" key={`loading-${index}`}>
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
              className="w-1/4 flex items-center justify-center h-32 px-4  bg-white border border-gray-50"
            >
              <div className="flex flex-col items-center w-full hover:bg-[#F5EBE4] transition-colors">
                <div className="relative mb-3">
                  <div className="" style={{ width: '55px', height: '55px' }}>
                    <img
                      src={category?.imageUrl}
                      alt={category.categoryName}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'placeholder-image-url'; // Add a fallback image URL
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-center">
                  <span className="text-xs text-gray-700 capitalize text-center" style={{ lineHeight: '16px' }}>
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
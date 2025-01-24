import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import staticWeb from '../assest/services/static-website.png';
import standardWeb from '../assest/services/Standard-website.png';
import dynamicWeb from '../assest/services/dynamic-website.png';
import mobileApp from '../assest/services/mobile-app.png';
import appUpdate from '../assest/services/app-update.png';
import webApp from '../assest/services/web-app.png'
import websiteUpdate from '../assest/services/website-update.png'
import featureUpgrade from '../assest/services/upgrade.png'
import productCategory from '../helpers/productCategory';

const CategoryImages = {
  static_websites: staticWeb,
  standard_websites: standardWeb,
  dynamic_websites: dynamicWeb,
  mobile_apps: mobileApp,
  app_update: appUpdate,
  web_applications: webApp,
  website_updates: websiteUpdate,
  feature_upgrades: featureUpgrade,
};

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(8).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url);
      const dataResponse = await response.json();
      
      // Sort based on predefined order
      const sortedProducts = dataResponse.data.sort((a, b) => {
        const aIndex = productCategory.findIndex(p => p.value === a.category);
        const bIndex = productCategory.findIndex(p => p.value === b.category);
        return aIndex - bIndex;
      });
      
      setCategoryProduct(sortedProducts);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className=" my-8  mx-4 border">
      <div className="flex flex-wrap md:flex-nowrap w-full">
        {loading ? (
          categoryLoading.map((el, index) => (
            <div className="w-1/4 flex items-center justify-center border h-24" key={`loading-${index}`}>
              <div className="flex flex-col items-center w-full">
                <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse" />
                <div className="w-12 h-3 bg-slate-200 rounded mt-1 animate-pulse" />
              </div>
            </div>
          ))
        ) : (
          categoryProduct.map((product) => (
            <Link
              to={`/product-category?category=${product?.category}`}
              key={product?.category}
              className="w-1/4 flex items-center justify-center border h-24 px-4"
            >
              <div className="flex flex-col items-center w-full hover:bg-[#F5EBE4] transition-colors">
                <div className="relative">
                  <div className="w-8 h-8">
                    {CategoryImages[product?.category] ? (
                      <img
                        src={CategoryImages[product?.category]}
                        alt={product?.category}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <img
                        src={product?.serviceImage[0]}
                        alt={product?.category}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  {product?.category === 'periodic_services' && (
                    <span className="absolute -top-1 -left-1 text-xs bg-green-100 text-green-800 px-1 py-px rounded-sm whitespace-nowrap">
                      Heavy Discount
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-center">
                  <span className="text-xs text-gray-700 capitalize text-center" style={{ lineHeight: '14px' }}>
                    {product?.category.split('_').join(' ')}
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
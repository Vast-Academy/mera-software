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

const CategoryImages = {
  static_websites: staticWeb,
  standard_websites: standardWeb,
  dynamic_websites: dynamicWeb,
  mobile_apps: mobileApp,
  app_update: appUpdate,
  web_apps: webApp,
  website_updates: websiteUpdate,
};

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(7).fill(null);

  const fetchCategoryProduct = async () => {
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
    <div className=" my-4 bg-gray-100 mx-4">
      <div className="flex flex-wrap md:flex-nowrap w-full">
        {loading ? (
          categoryLoading.map((el, index) => (
            <div className="w-1/4 flex items-center justify-center border h-20" key={`loading-${index}`}>
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
              className="w-1/4 flex items-center justify-center border h-20 py-2"
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
                <div className="mt-1 h-8 flex items-center justify-center">
                  <span className="text-xs text-gray-700 capitalize leading-1 text-center">
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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import staticWeb from '../assest/services/static-website.png';
import standardWeb from '../assest/services/Standard-website.png';
import dynamicWeb from '../assest/services/dynamic-website.png';
import mobileApp from '../assest/services/mobile-app.png'
import appUpdate from '../assest/services/app-update.png'

const CategoryImages = {
  static_websites: staticWeb,
  standard_websites: standardWeb,
  dynamic_websites: dynamicWeb,
  mobile_apps : mobileApp,
  app_update: appUpdate,
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
    <div className="bg-[hsla(0,0%,91.8%,.56)] container my-4 mx-4">
 <div className="grid grid-cols-4">
   {loading ? (
     categoryLoading.map((el, index) => (
       <div className="flex flex-col items-center p-4" key={`loading-${index}`}>
         <div className="w-16 h-16 bg-slate-200 rounded-lg animate-pulse" />
         <div className="w-20 h-4 bg-slate-200 rounded mt-2 animate-pulse" />
       </div>
     ))
   ) : (
     categoryProduct.map((product, index) => (
       <Link 
         to={`/product-category?category=${product?.category}`}
         key={product?.category}
         className={`relative ${index < categoryProduct.length - 4 ? 'border-b' : ''} ${(index + 1) % 4 !== 0 ? 'border-r' : ''} border-gray-300`}
       >
         <div className="flex flex-col items-center px-8 py-2 hover:bg-[#F5EBE4] transition-colors">
           <div className="relative">
             <div className=" w-14 h-14">
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
               <span className="absolute -top-2 -left-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm whitespace-nowrap">
                 Heavy Discount
               </span>
             )}
           </div>
           <div className="text-center mt-1">
             {product?.category.split('_').map((word, i) => (
               <span key={i} className="text-sm text-gray-700 capitalize font-medium">
                 {word} {i !== product?.category.split('_').length - 1 && ' '}
               </span>
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
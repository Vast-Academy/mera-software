import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';

const CartPopup = ({ isOpen, onClose, product }) => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);

  const fetchCartProducts = async () => {
    try {
      const response = await fetch(SummaryApi.userCart.url, {
        method: SummaryApi.userCart.method,
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success && data.data) {
        setCartProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCartProducts();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoToCart = () => {
    navigate('/cart');
    onClose();
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mb-16">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Popup Content */}
      <div className="relative bg-white rounded-t-lg mx-auto max-w-md">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500"
        >
          <IoMdClose size={24} />
        </button>

        {/* Success Message */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <IoCheckmarkCircleSharp className="text-green-500 text-2xl" />
            <span className="font-medium text-green-600">
              Hooray! 1 item added to the cart
            </span>
          </div>
        </div>

        {/* Products List */}
        <div className="max-h-64 overflow-y-auto">
          {/* Latest added product first */}
          {product && (
            <div className="p-4 flex items-center gap-3 border-b bg-blue-50">
              <img 
                src={product.serviceImage[0]} 
                alt={product.serviceName}
                className="w-16 h-16 object-contain bg-gray-50 rounded"
              />
              <div>
                <p className="font-medium text-sm">{product.serviceName}</p>
                <p className="text-gray-700 mt-1">₹{product.sellingPrice}</p>
              </div>
            </div>
          )}
          
          {/* Other cart products */}
          {cartProducts
            .filter(item => item._id !== product?._id) // Exclude current product
            .map((item) => (
              <div 
                key={item._id}
                className="p-4 flex items-center gap-3 border-b"
              >
                <img 
                  src={item.serviceImage[0]} 
                  alt={item.serviceName}
                  className="w-16 h-16 object-contain bg-gray-50 rounded"
                />
                <div>
                  <p className="font-medium text-sm">{item.serviceName}</p>
                  <p className="text-gray-700 mt-1">₹{item.sellingPrice}</p>
                </div>
              </div>
            ))}
        </div>

        {/* Go to Cart Button */}
        <div className="p-4">
          <button 
            onClick={handleGoToCart}
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
          >
            Go to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
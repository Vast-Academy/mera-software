import React, { useState, useEffect } from 'react';
import { FiArrowRight  } from "react-icons/fi";
import { LuSmartphone } from "react-icons/lu";
import { BsFillBarChartFill } from "react-icons/bs";

const AppConvertingBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome Dear Client",
      subtitle: "Track Your Project Progress",
      description: "Login to view your website development progress",
      icon: <BsFillBarChartFill  className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Convert Website to Mobile App",
      subtitle: "Expand Your Reach",
      description: "Transform your website into a mobile application",
      icon: <LuSmartphone  className="w-12 h-12 text-blue-500" />,
    }
  ];

  // Auto slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='container mx-auto px-4'>

   <div className="bg-white rounded-xl py-6 px-2 shadow-lg max-w-xl mx-auto overflow-hidden">
      <div className="relative">
        {/* Slides Container */}
        <div 
          className="transition-all duration-500 ease-in-out flex"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index}
              className="w-full flex-shrink-0 flex flex-col items-center  px-2"
            >
            {/* <div className="mb-4 p-3 bg-blue-50 rounded-full">
                {slide.icon}
              </div> */}

              <div className=''>
              <h2 className="text-xl font-bold text-gray-800 mb-2 text-left">
                {slide.title}
              </h2>
              {/* <p className="text-lg font-medium text-blue-600 mb-2">
                {slide.subtitle}
              </p> */}
              <p className="text-gray-600 mb-6 text-xs text-left">
                {slide.description}
              </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                  Login
                  <FiArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
 {/* Slide Indicators */}
 <div className="flex justify-center mt-6 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-blue-500 w-4' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
    </div>
   
  );
};

export default AppConvertingBanner

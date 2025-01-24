import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";

const AppConvertingBanner = () => {
  return (
    <div>
       {/* Convert Section */}
       <div className="mx-4 px-4 py-6 h-28 bg-blue-800 text-white rounded-lg mb-4">
        <h2 className="text-lg font-bold mb-2">Convert Website to App</h2>
        <div className='flex flex-row gap-2'>
        <p className="text-gray-300 text-sm">Transform your website into a mobile app</p>
        <FaLongArrowAltRight className='mt-1 '/>
        </div>
        
      </div>
    </div>
  )
}

export default AppConvertingBanner

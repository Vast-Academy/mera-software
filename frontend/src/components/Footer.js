import React from 'react'
import { FaHome } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { FiUser } from "react-icons/fi";

const Footer = () => {
  return (
   <div>
     {/* Bottom Navigation */}
     <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t">
        <div className="flex justify-around py-2">
          <div className="flex flex-col text-white items-center">
            <FaHome className="w-6 h-6 " />
            <span className="text-xs">Home</span>
          </div>
          <div className="flex flex-col text-white items-center">
            <FiFileText className="w-6 h-6" />
            <span className="text-xs">Orders</span>
          </div>
          <div className="flex flex-col text-white items-center">
            <LuUsers className="w-6 h-6" />
            <span className="text-xs">Referral</span>
          </div>
          <div className="flex flex-col text-white items-center">
            <FiUser className="w-6 h-6" />
            <span className="text-xs">Login</span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Footer

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { useSelector } from 'react-redux';

const Footer = () => {
  const user = useSelector(state => state?.user?.user)
  const [menuDisplay,setMenuDisplay] = useState(false)
  return (
   <div className=' mt-32'>
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
          <Link to={"/login"}>
              {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <div className='flex flex-col text-white items-center'>
                      <img src={user?.profilePic} className='w-6 h-6 rounded-full' alt={user?.name} />
                      <span className="text-xs">You</span>
                      </div>
                    ) : (
                        <div className="flex flex-col text-white items-center">
                        <FiUser className="w-6 h-6" />
                        <span className="text-xs">Login</span>
                      </div>
                    )
                  }
                </div>
              )
            }
          
          </Link>
        </div>
      </div>
    </div>

  )
}

export default Footer

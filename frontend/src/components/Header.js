import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common'; 
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
// import { FaArrowLeft } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { BiSolidUser } from "react-icons/bi";

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  // const location = useLocation();
  // const showBackButton = location.pathname !== '/';

  // const onBack = () => {
  //   navigate(-1); 
  // };

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
       method : SummaryApi.logout_user.method,
       credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
    toast.success(data.message)
    dispatch(setUserDetails(null))
    navigate("/")
  }

  if(data.error){
    toast.error(data.message)
  }
}

const handleSearch = (e) =>{
const { value } = e.target
setSearch(value)

if(value){
  navigate(`/search?q=${value}`)
  }else{
    navigate("/search")
  }
}
  return (
    <>

    <header className='hidden md:block h-16 shadow-md bg-white fixed w-full z-40'>
       <div className="h-full flex items-center px-4 container mx-auto justify-between">
       <div className=''>
       <Link to={"/"}>
            <Logo w={90} h={50} />
        </Link>
       </div>


       <div className='hidden
       lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
       <input type='text' placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
           <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
              <GrSearch />
            </div>
       </div>


       <div className="flex items-center gap-7">

    <div className='relative flex justify-center'>
               {
                    user?._id && (
                      <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                        {
                          user?.profilePic ? (
                            <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                          ) : (
                            <FaRegCircleUser/>
                          )
                        }
                      </div>
                    )
                  }

    {
      menuDisplay && (
        <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
        <nav>
            {
                user?.role === ROLE.ADMIN && (
                    <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                )
            } 
            <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Order</Link>  
            </nav>
      </div>
    )
  }
    </div>


          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl relative'>
             <span><FaShoppingCart/></span>
          
          <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
            <p className='text-sm'>{context?.cartProductCount}</p>
        </div>
          </Link>
            )
          }
     

     <div className='hidden md:block'>
    {
        user?._id ? (
            <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
        ): (
            <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
        )
    }
    </div>


       </div>

       </div>
    </header>

    {/* Mobile Search Bar with Login and Dynamic Back Button */}

    <div className="md:hidden w-full max-w-lg mx-auto bg-white">
      {/* Header */}
      <header className="bg-gray-900 px-4 h-12 flex justify-between items-center">
      <div className=''>
       <Link to={"/"}>
            <Logo w={50} h={50} />
        </Link>
        </div>
        
        <div className='flex items-center gap-5'>
        <IoIosNotifications className='text-white text-3xl '/>

              <Link to={"/cart"} className='text-2xl relative'>
             <FaShoppingCart className='text-white'/>
          
          <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
            <p className='text-sm'>{context?.cartProductCount}</p>
        </div>
          </Link>
      
        {/* <FaShoppingCart className='text-white w-8 h-8' /> */}
        <Link to={"/login"}>
        {
                    user?._id && (
                      <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                        {
                          user?.profilePic ? (
                            <img src={user?.profilePic} className='w-8 h-8 rounded-full' alt={user?.name} />
                          ) : (
                            <BiSolidUser className="text-white text-2xl"/>
                          )
                        }
                      </div>
                    )
                  }
                  
        </Link>
        </div>
      </header>

      {/* Search Bar */}
      <div className="py-3 px-4">
        <div className="relative flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search services..."
            className="w-full outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 bg-gray-900 flex items-center justify-center rounded-r-full text-white">
              <GrSearch />
            </div>
        </div>
      </div>

      </div>

      </>
  )
}

export default Header

import React, { useContext, useState } from 'react'
import Logo from '../assest/newlogo.png'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common'; 
import { toast } from 'react-toastify';
import { setUserDetails, logout  } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDatabase } from '../context/DatabaseContext';
import { IoWalletOutline } from "react-icons/io5";
import CookieManager from '../utils/cookieManager';
import StorageService from '../utils/storageService';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  // const { clearCache } = useDatabase();
  const { hybridCache } = useDatabase();
  const context = useContext(Context)
  const navigate = useNavigate()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const location = useLocation();
  const showBackButton = location.pathname !== '/';

  const onBack = () => {
    navigate(-1); 
  };

  const handleLogout = async () => {
    try {
      // 1. BEFORE ANYTHING ELSE - Save guest slides to multiple locations
      const guestSlides = StorageService.getGuestSlides();
      if (guestSlides) {
        console.log('Preserving guest slides before logout');
        try {
          // Save to sessionStorage as primary backup during logout
          sessionStorage.setItem('sessionGuestSlides', JSON.stringify(guestSlides));
          // Also save to a special localStorage key that won't be cleared
          localStorage.setItem('preservedGuestSlides', JSON.stringify(guestSlides));
          // Mark logout timestamp for post-refresh detection
          localStorage.setItem('lastLogoutTimestamp', Date.now().toString());
        } catch (backupError) {
          console.error('Failed to backup slides before logout:', backupError);
        }
      }
  
      // 2. Call logout API
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include'
      });
  
      const data = await fetchData.json();
  
      if (data.success) {
        try {
          // 3. Clear cookies
          CookieManager.clearAll();
          
          // 4. Clear only user data
          StorageService.clearUserData();
          
          // 5. Do a controlled clear of hybridCache to preserve guest slides
          if (hybridCache && typeof hybridCache.clearAll === 'function') {
            await hybridCache.clearAll();
          }
          
          // 6. Restore guest slides from our backups if the main key was cleared
          if (!localStorage.getItem('guestSlides')) {
            console.log('Restoring guest slides after cache clear');
            const preserved = localStorage.getItem('preservedGuestSlides');
            const sessionBackup = sessionStorage.getItem('sessionGuestSlides');
            
            // Prioritize preserved data if available
            if (preserved) {
              localStorage.setItem('guestSlides', preserved);
              StorageService.setGuestSlides(JSON.parse(preserved));
            } else if (sessionBackup) {
              localStorage.setItem('guestSlides', sessionBackup);
              StorageService.setGuestSlides(JSON.parse(sessionBackup));
            }
          }
          
          // 7. Dispatch Redux logout
          dispatch(logout());
          
          // 8. Reset component states
          setMenuDisplay(false);
          setSearch('');
          
          toast.success(data.message);
          navigate("/");
        } catch (cacheError) {
          console.error("Cache clearing error:", cacheError);
          // Still proceed with logout even if cache clearing fails
          dispatch(logout());
          navigate("/");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  
const handleSearch = (e) =>{
const { value } = e.target
setSearch(value)

if(value){
  navigate(`/search?q=${value}`)
  }else{
    navigate("/search")
  }
}

// useEffect(() => {
//   if (user?._id) {
//     context.fetchWalletBalance();
//   }
// }, []); 
  return (
    <>

    <header className='hidden md:block h-16 shadow-md bg-white fixed w-full z-40'>
       <div className="h-full flex items-center px-4 container mx-auto justify-between">
       <div className=''>
       <Link to={"/"}>
       <img src={Logo} className='w-24 h-8'/>
            {/* <Logo w={90} h={50} /> */}
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

       {/* Add Wallet Balance Display */}
       {user?._id && (
              <div className='flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full'>
                <IoWalletOutline className="text-xl text-gray-600" />
                <span className='font-medium'>₹{context.walletBalance}</span>
              </div>
            )}

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
            {/* Add Wallet Balance in Menu too */}
            <div className='p-2 hover:bg-slate-100 flex items-center gap-2'>
                <IoWalletOutline />
                <span>Balance: ₹{context.walletBalance}</span>
              </div>
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

    <div className="md:hidden w-full max-w-lg mx-auto  fixed z-10 bg-gray-900 mb-10">
      {/* Header */}
      {/* <header className="bg-gray-900 px-4 h-12 flex justify-between items-center">
      <div className=''>
       <Link to={"/"}>
       <img src={Logo} className=' h-8'/>
        </Link>
        </div>
        
        <div className='flex items-center gap-5'>
         {user?._id && (
              <div className='flex items-center gap-1 bg-gray-800 px-2 py-1 rounded-full'>
                <IoWalletOutline className="text-white" />
                <span className='text-white text-sm'>₹{context.walletBalance}</span>
              </div>
            )}

        <IoIosNotifications className='text-white text-3xl '/>

        <Link to={"/cart"} className='text-2xl relative'>
             <FaShoppingCart className='text-white'/>
          
          <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
            <p className='text-sm'>{context?.cartProductCount || 0}</p>
        </div>
          </Link>
      
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
      </header> */}

      {/* Search Bar */}

      <div className="py-3 pt-6 px-4">
 <div className="relative flex items-center w-full justify-between max-w-sm">
   {showBackButton && (
     <button 
       onClick={onBack} 
       className='p-2 text-white mr-2'
       aria-label="Go back"
     >
       <FaArrowLeftLong size={24} />
     </button>
   )}
   <div className="flex-1 flex items-center border rounded-lg border-gray-500 focus-within:shadow">
     <input
       type="text"
       placeholder="Search services..."
       className="w-full outline-none h-10 rounded-l-lg  px-4 "
       onChange={handleSearch}
       value={search}
     />
     <div className="text-lg min-w-[50px] h-10 bg-gray-900 rounded-r-lg flex items-center justify-center  text-white">
       <GrSearch />
     </div>
   </div>
 </div>
</div>

      </div>

      </>
  )
}

export default Header

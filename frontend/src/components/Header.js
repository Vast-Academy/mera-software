import React, { useContext, useEffect, useRef, useState } from 'react'
import Logo from '../assest/newlogo.png' // Not used in new UI, can be removed or kept for future
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa"; // Not used in new UI, can be removed or kept for future
import { GoArrowSwitch } from "react-icons/go";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails, logout, updateUserRole } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import { useOnlineStatus } from '../App';
import { IoWalletOutline } from "react-icons/io5";
import CookieManager from '../utils/cookieManager';
import StorageService from '../utils/storageService';
import displayCurrency from "../helpers/displayCurrency"
import NotificationBell from './NotificationBell';
import LoginPopup from '../components/LoginPopup';
import TriangleMazeLoader from '../components/TriangleMazeLoader';
import { ChevronRight, Globe, Smartphone, Settings, Users, Wrench, UserCheck, Zap, Shield, Award, Search, Code, Home, Edit, Lightbulb, Handshake, TrendingUp, Menu, X } from 'lucide-react'; // Added Lucide icons

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const { isOnline } = useOnlineStatus();
  const context = useContext(Context);
  const activeProject = context.activeProject;
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false); // For user profile dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // For mobile navigation
  const dropdownRef = useRef(null); // For notification dropdown (not directly used in this update, but kept)
  const userMenuRef = useRef(null); // New ref for user profile menu dropdown
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)
  const [serviceTypes, setServiceTypes] = useState([]) // Kept for potential future use, not directly used in new nav structure
  const [loading, setLoading] = useState(true); // Kept for potential future use
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [isRoleSwitching, setIsRoleSwitching] = useState(false);

  // New states for Practice.js like dropdowns
  const [activeDropdown, setActiveDropdown] = useState(null); // For desktop main navigation dropdowns
  const [activeServiceSubCategory, setActiveServiceSubCategory] = useState(null); // For Services sub-categories
  const dropdownTimeoutRef = useRef(null); // For managing dropdown hover timeout

  // Get user authentication status
  const userDetails = useSelector((state) => state.user.user);
  const isAuthenticated = !!userDetails?._id;
  const isInitialized = useSelector((state) => state.user.initialized);

  const location = useLocation();
  const currentPath = location.pathname;

  const onBack = () => {
    navigate(-1);
  };

  const getProjectLink = () => {
    if (activeProject && activeProject._id) {
      return `/project-details/${activeProject._id}`;
    }
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/project-details/')) {
      return currentPath;
    }
    return '/order';
  };

  const buildCategoryQueryString = (categoryValues) => {
    if (!categoryValues || categoryValues.length === 0) return '';
    return categoryValues.map(val => `category=${val}`).join('&&');
  };

  const handleProtectedNavigation = (e) => {
    e.preventDefault();
    if (isInitialized && !userDetails) {
      setShowLoginPopup(true);
    } else {
      window.location.href = e.currentTarget.href;
    }
  };

  // Fetch service types for navigation (kept for potential future use, not directly used in new nav structure)
  useEffect(() => {
    const loadServiceTypes = async () => {
      const cachedCategories = StorageService.getProductsData('categories');
      if (cachedCategories) {
        processCategories(cachedCategories);
        setLoading(false);
      }
      if (isOnline) {
        try {
          const response = await fetch(SummaryApi.allCategory.url);
          const data = await response.json();
          if (data.success) {
            StorageService.setProductsData('categories', data.data);
            processCategories(data.data);
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadServiceTypes();
  }, [isOnline]);

  // Add this effect for handling clicks outside and ESC key press
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target) && menuDisplay) {
        setMenuDisplay(false);
      }
      if (roleDropdownOpen && !event.target.closest('.role-dropdown')) {
        setRoleDropdownOpen(false);
      }
      // Close main navigation dropdowns if clicked outside
      if (activeDropdown !== null && !event.target.closest('.main-nav-dropdown')) {
        setActiveDropdown(null);
        setActiveServiceSubCategory(null);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (menuDisplay) setMenuDisplay(false);
        if (roleDropdownOpen) setRoleDropdownOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (activeDropdown !== null) {
          setActiveDropdown(null);
          setActiveServiceSubCategory(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [menuDisplay, roleDropdownOpen, mobileMenuOpen, activeDropdown]);

  const processCategories = (data) => {
    const uniqueServiceTypes = [...new Set(data.map(item => item.serviceType))];
    const serviceTypeObjects = uniqueServiceTypes.map(type => {
      const typeCategories = data.filter(cat => cat.serviceType === type);
      return {
        serviceType: type,
        queryCategoryValues: typeCategories.map(cat => cat.categoryValue),
      };
    });
    setServiceTypes(serviceTypeObjects);
  };

  const handleLogout = async () => {
    try {
      const guestSlides = StorageService.getGuestSlides();
      if (guestSlides && guestSlides.length > 0) {
        try {
          sessionStorage.setItem('sessionGuestSlides', JSON.stringify(guestSlides));
          localStorage.setItem('preservedGuestSlides', JSON.stringify(guestSlides));
          localStorage.setItem('guestSlides', JSON.stringify(guestSlides));
          localStorage.setItem('lastLogoutTimestamp', Date.now().toString());
        } catch (backupError) {
          console.error('Failed to backup slides:', backupError);
        }
      }

      if (isOnline) {
        const response = await fetch(SummaryApi.logout_user.url, {
          method: SummaryApi.logout_user.method,
          credentials: 'include'
        });
        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
        }
      }

      CookieManager.clearAll();
      StorageService.clearUserData();

      const preserved = localStorage.getItem('preservedGuestSlides');
      const sessionBackup = sessionStorage.getItem('sessionGuestSlides');

      if (!localStorage.getItem('guestSlides')) {
        if (preserved) {
          localStorage.setItem('guestSlides', preserved);
        } else if (sessionBackup) {
          localStorage.setItem('guestSlides', sessionBackup);
        }
      }

      dispatch(logout());
      setMenuDisplay(false);
      setSearch('');
      navigate("/");

    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }

  const handleRoleChange = async (newRole) => {
    if (newRole === user.role) {
      setRoleDropdownOpen(false);
      return;
    }
    try {
      setIsRoleSwitching(true);

      const response = await fetch(SummaryApi.userRoleSwitch.url, {
        method: SummaryApi.userRoleSwitch.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newRole })
      });
      const data = await response.json();
      if (data.success) {
        const updatedUser = {
          ...user,
          role: newRole,
          userDetails: {
            ...user.userDetails,
            isDetailsCompleted: data.data.isDetailsCompleted
          }
        };
        dispatch(setUserDetails(updatedUser));
        StorageService.setUserDetails(updatedUser);
        toast.success("Role switched to " + newRole);
        setRoleDropdownOpen(false);
        CookieManager.setUserDetails({
          ...user,
          role: newRole,
          isDetailsCompleted: data.data.isDetailsCompleted
        });

        const isDetailsCompleted = data.data.isDetailsCompleted;
        if (!isDetailsCompleted && newRole !== "customer") {
          setTimeout(() => {
            navigate("/complete-profile");
            setIsRoleSwitching(false);
          }, 100);
        } else {
          let redirectPath = "/";
          switch (newRole) {
            case ROLE.ADMIN:
              redirectPath = '/admin-panel/all-products';
              break;
            case ROLE.MANAGER:
              redirectPath = '/manager-panel/dashboard';
              break;
            case ROLE.PARTNER:
              redirectPath = '/partner-panel/dashboard';
              break;
            case ROLE.DEVELOPER:
              redirectPath = '/developer-panel';
              break;
            case ROLE.CUSTOMER:
              redirectPath = '/home';
              break;
            default:
              redirectPath = '/';
          }
          setTimeout(() => {
            navigate(redirectPath);
            setIsRoleSwitching(false);
          }, 100);
        }
      } else {
        toast.error(data.message || "Failed to switch role");
        setIsRoleSwitching(false);
      }
    } catch (error) {
      console.error("Error switching role:", error);
      toast.error("Error switching role");
      setIsRoleSwitching(false);
    }
    setRoleDropdownOpen(false);
  };

  // Menu items structure similar to Practice.js
  const menuItems = [
    {
      name: 'Home',
      href: '/',
      icon: <Home className="w-4 h-4" />
    },
    {
      name: 'Services',
      dropdown: [
        {
          category: 'Development Services',
          items: [
            {
              name: 'Website Development',
              href: '/website-development-service',
              desc: 'Custom Website Plans for Your Business',
              subCategories: [
                { name: 'Static Websites', href: '/static-websites' },
                { name: 'Dynamic Website', href: '/dynamic-websites' },
                // { name: 'Local Service Website', href: '/product-category?category=local-service-website' },
                // { name: 'Portfolio Website', href: '/product-category?category=portfolio-website' },
                // { name: 'Restaurant Website', href: '/product-category?category=restaurant-website' }
              ]
            },
            {
              name: 'Mobile App Development',
              href: '/mobile-app-development-service',
              desc: 'iOS & Android App Development',
              subCategories: [
                // { name: 'iOS App Development', href: '/product-category?category=ios-app-development' },
                { name: 'Native App Development', href: '/product-category?category=android-app-development' },
                { name: 'Hybrid App Development', href: '/product-category?category=hybrid-app-development' },
                // { name: 'Custom Mobile Solutions', href: '/product-category?category=custom-mobile-solutions' }
              ]
            },
            {
              name: 'Cloud Software Development',
              href: '/cloud-software-service',
              desc: 'Software to Automate Your Business',
              subCategories: [
                { name: 'Cloud Softwares', href: '/product-category?category=saas-development' },
                // { name: 'CRM Solutions', href: '/product-category?category=crm-solutions' },
                // { name: 'ERP Systems', href: '/product-category?category=erp-systems' },
                // { name: 'Cloud Migration', href: '/product-category?category=cloud-migration' }
              ]
            },
            {
              name: 'Feature Upgrades',
              href: '/feature-upgrades-service',
              desc: 'Add Features to Existing Projects',
              subCategories: [
                { name: 'Static Website Update Plans', href: '/product-category?category=performance-optimization' },
                { name: 'Dynamic Website Update Plans', href: '/product-category?category=security-enhancements' },
                { name: 'Cloud Software Update Plans', href: '/product-category?category=ui-ux-improvements' },
                { name: 'Mobile App Update Plans', href: '/product-category?category=new-feature-integration' }
              ]
            }
          ]
        },
      ]
    },
    {
      name: 'Solutions',
      dropdown: [
        {
          category: 'Business Solutions',
          items: [
            { name: 'Small Business', href: '/solutions?type=small-business' },
            { name: 'Enterprise', href: '/solutions?type=enterprise' },
            { name: 'Startups', href: '/solutions?type=startups' },
            { name: 'Non-Profit', href: '/solutions?type=non-profit' }
          ]
        },
        {
          category: 'Industry Solutions',
          items: [
            { name: 'Education', href: '/solutions?industry=education' },
            { name: 'Healthcare', href: '/solutions?industry=healthcare' },
            { name: 'Retail', href: '/solutions?industry=retail' },
            { name: 'Real Estate', href: '/solutions?industry=real-estate' }
          ]
        }
      ]
    },
    {
      name: 'Resources',
      dropdown: [
        {
          category: 'Learn & Support',
          items: [
            { name: 'Blog', href: '/blog' },
            { name: 'Documentation', href: '/docs' },
            { name: 'Tutorials', href: '/tutorials' },
            { name: 'Case Studies', href: '/case-studies' },
            { name: 'FAQ', href: '/faq' }
          ]
        },
        {
          category: 'Tools',
          items: [
            { name: 'Website Builder', href: '/tools/website-builder' },
            { name: 'Domain Checker', href: '/tools/domain-checker' },
            { name: 'SEO Tools', href: '/tools/seo-tools' }
          ]
        }
      ]
    },
    {
      name: 'Company',
      dropdown: [
        {
          category: 'About',
          items: [
            { name: 'About Us', href: '/about' },
            { name: 'Our Team', href: '/team' },
            { name: 'Careers', href: '/careers' },
            { name: 'Press & Media', href: '/press' }
          ]
        },
        {
          category: 'Legal',
          items: [
            { name: 'Terms & Conditions', href: '/terms' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Cookie Policy', href: '/cookies' }
          ]
        }
      ]
    },
    {
      name: 'Contact',
      href: '/contact'
    }
  ];

  const handleMouseEnter = (index) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(index);
    if (menuItems[index].name !== 'Services') {
      setActiveServiceSubCategory(null);
    }
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveServiceSubCategory(null);
    }, 200); // Reduced timeout for better UX
  };

  const handleServiceItemMouseEnter = (serviceItem) => {
    if (serviceItem.subCategories) {
      setActiveServiceSubCategory(serviceItem.subCategories);
    } else {
      setActiveServiceSubCategory(null);
    }
  };

  const handleMobileMenuItemClick = (index, hasDropdown) => {
    if (hasDropdown) {
      setActiveDropdown(activeDropdown === index ? null : index);
    } else {
      setMobileMenuOpen(false); // Close mobile menu if it's a direct link
      setActiveDropdown(null); // Close any open dropdown
    }
  };

  return (
    <>
      {isRoleSwitching && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <TriangleMazeLoader />
        </div>
      )}

      {/* Desktop Header */}
      <header className='hidden lg:block bg-white shadow-sm sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className="flex justify-between items-center h-16">
            <Link to={"/"}>
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                  M
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">MeraSoftware</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group main-nav-dropdown"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.href ? (
                    <Link to={item.href} className="text-gray-700 hover:text-emerald-600 flex items-center">
                      {item.icon && <span className="mr-1">{item.icon}</span>}
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      className="text-gray-700 hover:text-emerald-600 flex items-center focus:outline-none"
                    >
                      {item.name}
                      <ChevronRight className={`ml-1 w-4 h-4 transform ${activeDropdown === index ? 'rotate-90' : ''} transition-transform`} />
                    </button>
                  )}

                  {item.dropdown && activeDropdown === index && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-max bg-white rounded-lg shadow-xl p-6 grid grid-cols-2 gap-x-8 gap-y-4 z-50">
                      {item.dropdown.map((category, catIndex) => (
                        <div key={catIndex}>
                          <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">{category.category}</h4>
                          <ul className="space-y-2">
                            {category.items.map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                onMouseEnter={() => {
                                  if (item.name === 'Services') {
                                    handleServiceItemMouseEnter(subItem);
                                  }
                                }}
                              >
                                <Link to={subItem.href} className="block text-gray-800 hover:text-emerald-600 text-sm font-medium">
                                  {subItem.name}
                                  {subItem.desc && <p className="text-gray-500 text-xs mt-0.5">{subItem.desc}</p>}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {item.name === 'Services' && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                            Sub-Categories
                          </h4>
                          <ul className="space-y-2">
                            {activeServiceSubCategory ? (
                              activeServiceSubCategory.map((subCat, subCatIndex) => (
                                <li key={subCatIndex}>
                                  <Link to={subCat.href} className="block text-gray-800 hover:text-emerald-600 text-sm font-medium">
                                    {subCat.name}
                                  </Link>
                                </li>
                              ))
                            ) : (
                              // Default content when no specific service item is hovered
                              <>
                                <li><Link to="/static-websites" className="block text-gray-800 hover:text-emerald-600 text-sm font-medium">Static Websites</Link></li>
                                <li><Link to="/dynamic-websites" className="block text-gray-800 hover:text-emerald-600 text-sm font-medium">Dynamic Websites</Link></li>
                                {/* <li><Link to="/product-category?category=local-service-website" className="block text-gray-800 hover:text-emerald-600 text-sm font-medium">Local Service Website</Link></li>
                                <li><Link to="/product-category?category=portfolio-website" className="block text-gray-800 hover:text-emerald-600 text-sm font-medium">Portfolio Website</Link></li>
                                <li><Link to="/product-category?category=restaurant-website" className="block text-gray-800 hover:text-emerald-600 text-sm font-medium">Restaurant Website</Link></li> */}
                              </>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section - Buttons & User Info */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  {/* {user?.roles && user.roles.length > 1 && (
                    <div className="relative role-dropdown">
                      <button
                        onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                        className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        {user.role.toUpperCase()} ▼
                      </button>
                      {roleDropdownOpen && !isRoleSwitching && (
                        <ul className="absolute right-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                          {user.roles.map((roleItem) => (
                            <li
                              key={roleItem}
                              className={`cursor-pointer px-4 py-2 hover:bg-blue-600 hover:text-white ${roleItem === user.role ? 'font-bold bg-blue-100' : ''
                                }`}
                              onClick={() => handleRoleChange(roleItem)}
                            >
                              {roleItem.toUpperCase()}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )} */}

                  {/* Dashboard Button */}
                  <Link to="/dashboard" className="bg-cyan-600 text-white border border-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-800 transition-colors flex gap-2">
                  <GoArrowSwitch className='mt-1 h-5 text-lg' />
                    Dashboard
                  </Link>

                  {/* User Profile & Dropdown */}
                  <div className='relative flex justify-center'>
                    <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                      {
                        user?.profilePic ? (
                          <img src={user?.profilePic} className='w-10 h-10 rounded-full object-cover' alt={user?.name} />
                        ) : (
                          <FaRegCircleUser className="w-10 h-10 text-gray-700" />
                        )
                      }
                    </div>

                    {menuDisplay && (
                      <div className='absolute bg-white bottom-0 w-44 top-11 h-fit p-2 shadow-lg rounded' ref={userMenuRef}>
                        <nav>
                          {user?.role === ROLE.ADMIN && (
                            <Link to={"/admin-panel/all-products"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                          )}
                          {user?.role === ROLE.MANAGER && (
                            <Link to={"/manager-panel/dashboard"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Manager Panel</Link>
                          )}
                          {user?.role === ROLE.PARTNER && (
                            <Link to={"/partner-panel/dashboard"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Partner Panel</Link>
                          )}
                          {user?.role === ROLE.DEVELOPER && (
                            <Link to={"/developer-panel"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Developer Panel</Link>
                          )}
                          <Link to={'/order'} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Settings</Link>
                          <div className='p-2 hover:bg-slate-100 flex items-center gap-2'>
                            <IoWalletOutline />
                            <span>Balance: {displayCurrency(context.walletBalance)}</span>
                          </div>
                          <button onClick={handleLogout} className='w-full text-left hover:bg-slate-100 p-2'>Logout</button>
                        </nav>
                      </div>
                    )}
                  </div>
                </>
              ) :
               (
                <>
                  <Link to="/staff-login" className="bg-white text-cyan-600 border border-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors">
                    Staff Login
                  </Link>
                  <Link to="/login" className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
                    Login
                  </Link>
                </>
              )}
              {/* <NotificationBell /> */}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-bold rounded-md mr-2">
                M
              </div>
              <span className="font-bold text-lg">MeraSoftware</span>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            <NotificationBell />
            {isAuthenticated ? (
              <div className='relative flex justify-center'>
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-8 h-8 rounded-full object-cover' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser className="w-8 h-8 text-gray-700" />
                    )
                  }
                </div>

                {menuDisplay && (
                  <div className='absolute bg-white bottom-0 w-44 top-11 h-fit p-2 shadow-lg rounded right-0' ref={userMenuRef}>
                    <nav>
                      {user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                      )}
                      {user?.role === ROLE.MANAGER && (
                        <Link to={"/manager-panel/dashboard"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Manager Panel</Link>
                      )}
                      {user?.role === ROLE.PARTNER && (
                        <Link to={"/partner-panel/dashboard"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Partner Panel</Link>
                      )}
                      {user?.role === ROLE.DEVELOPER && (
                        <Link to={"/developer-panel"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Developer Panel</Link>
                      )}
                      <Link to={'/order'} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Settings</Link>
                      <div className='p-2 hover:bg-slate-100 flex items-center gap-2'>
                        <IoWalletOutline />
                        <span>Balance: {displayCurrency(context.walletBalance)}</span>
                      </div>
                      <button onClick={handleLogout} className='w-full text-left hover:bg-slate-100 p-2'>Logout</button>
                    </nav>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-cyan-700 transition-colors">
                Login
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 relative">
          <input
            type="text"
            placeholder="Search for services..."
            className="w-full py-2 px-4 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={handleSearch}
            value={search}
          />
          <div className="absolute right-3 top-2.5 text-gray-400">
            <GrSearch size={16} />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="bg-white shadow-lg py-4 px-4 sm:px-6 mt-3">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.href ? (
                    <Link to={item.href} className="block text-gray-700 hover:text-emerald-600 py-2 px-3 rounded-lg flex items-center" onClick={() => setMobileMenuOpen(false)}>
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleMobileMenuItemClick(index, true)}
                        className="w-full text-left text-gray-700 hover:text-emerald-600 py-2 px-3 rounded-lg flex items-center justify-between"
                      >
                        {item.name}
                        <ChevronRight className={`w-4 h-4 transform ${activeDropdown === index ? 'rotate-90' : ''} transition-transform`} />
                      </button>
                      {activeDropdown === index && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdown.map((category, catIndex) => (
                            <div key={catIndex}>
                              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">{category.category}</h4>
                              <ul className="space-y-1">
                                {category.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link to={subItem.href} className="block text-gray-800 hover:text-emerald-600 text-sm py-1 px-2 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                                      {subItem.name}
                                      {subItem.desc && <p className="text-gray-500 text-xs mt-0.5">{subItem.desc}</p>}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          {item.name === 'Services' && (
                            <div className="mt-2">
                              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Sub-Categories</h4>
                              <ul className="space-y-1">
                                {activeServiceSubCategory ? (
                                  activeServiceSubCategory.map((subCat, subCatIndex) => (
                                    <li key={subCatIndex}>
                                      <Link to={subCat.href} className="block text-gray-800 hover:text-emerald-600 text-sm py-1 px-2 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                                        {subCat.name}
                                      </Link>
                                    </li>
                                  ))
                                ) : (
                                  <>
                                    <li><Link to="/product-category?category=college-website" className="block text-gray-800 hover:text-emerald-600 text-sm py-1 px-2 rounded-md" onClick={() => setMobileMenuOpen(false)}>College Website</Link></li>
                                    <li><Link to="/product-category?category=educational-website" className="block text-gray-800 hover:text-emerald-600 text-sm py-1 px-2 rounded-md" onClick={() => setMobileMenuOpen(false)}>Educational Website</Link></li>
                                    <li><Link to="/product-category?category=local-service-website" className="block text-gray-800 hover:text-emerald-600 text-sm py-1 px-2 rounded-md" onClick={() => setMobileMenuOpen(false)}>Local Service Website</Link></li>
                                  </>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              {isAuthenticated && (
                <button onClick={handleLogout} className='w-full text-left text-gray-700 hover:text-emerald-600 py-2 px-3 rounded-lg flex items-center'>
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
    </>
  )
}

export default Header;

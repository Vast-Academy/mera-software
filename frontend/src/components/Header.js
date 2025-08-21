import React, { useContext, useEffect, useRef, useState } from 'react'
import Logo from '../assest/newlogo.png' // Make sure this path is correct
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { GoArrowSwitch } from "react-icons/go";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common'; // Make sure this path is correct
import { toast } from 'react-toastify';
import { setUserDetails, logout } from '../store/userSlice'; // Make sure this path is correct
import ROLE from '../common/role'; // Make sure this path is correct
import Context from '../context'; // Make sure this path is correct
import { useOnlineStatus } from '../App'; // Make sure this path is correct
import { IoWalletOutline } from "react-icons/io5";
import CookieManager from '../utils/cookieManager'; // Make sure this path is correct
import StorageService from '../utils/storageService'; // Make sure this path is correct
import displayCurrency from "../helpers/displayCurrency" // Make sure this path is correct
import NotificationBell from '../components/NotificationBell'; // Make sure this path is correct
import LoginPopup from '../components/LoginPopup'; // Make sure this path is correct
import TriangleMazeLoader from '../components/TriangleMazeLoader'; // Make sure this path is correct
import { ChevronRight, Home, Menu, X } from 'lucide-react'; // Ensure lucide-react is installed

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const { isOnline } = useOnlineStatus();
  const context = useContext(Context);
  const activeProject = context.activeProject;
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)
  const [serviceTypes, setServiceTypes] = useState([])
  const [loading, setLoading] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isRoleSwitching, setIsRoleSwitching] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeServiceSubCategory, setActiveServiceSubCategory] = useState(null);
  const [hoveredServiceItemName, setHoveredServiceItemName] = useState(null); // New state for service item name
  const dropdownTimeoutRef = useRef(null);
  const [activeCategoryByMenu, setActiveCategoryByMenu] = useState({}); // { [menuIndex]: catIndex }

  const userDetails = useSelector((state) => state.user.user);
  const isAuthenticated = !!userDetails?._id;
  const isInitialized = useSelector((state) => state.user.initialized);

  const onBack = () => navigate(-1);

  const getProjectLink = () => {
    if (activeProject && activeProject._id) return `/project-details/${activeProject._id}`;
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/project-details/')) return currentPath;
    return '/order';
  };

  const handleProtectedNavigation = (e) => {
    e.preventDefault();
    if (isInitialized && !userDetails) setShowLoginPopup(true);
    else window.location.href = e.currentTarget.href;
  };

  useEffect(() => {
    const loadServiceTypes = async () => {
      const cached = StorageService.getProductsData('categories');
      if (cached) {
        processCategories(cached);
        setLoading(false);
      }
      if (isOnline) {
        try {
          const res = await fetch(SummaryApi.allCategory.url);
          const data = await res.json();
          if (data.success) {
            StorageService.setProductsData('categories', data.data);
            processCategories(data.data);
          }
        } catch (e) {
          console.error('Error fetching categories:', e);
        } finally {
          setLoading(false);
        }
      }
    };
    loadServiceTypes();
  }, [isOnline]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target) && menuDisplay) {
        setMenuDisplay(false);
      }
      if (activeDropdown !== null && !event.target.closest('.main-nav-dropdown')) {
        setActiveDropdown(null);
        setActiveServiceSubCategory(null); // Reset service sub-category on outside click
        setHoveredServiceItemName(null); // Reset hovered service item name on outside click
      }
    };
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (menuDisplay) setMenuDisplay(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (activeDropdown !== null) {
          setActiveDropdown(null);
          setActiveServiceSubCategory(null); // Reset service sub-category on escape
          setHoveredServiceItemName(null); // Reset hovered service item name on escape
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [menuDisplay, mobileMenuOpen, activeDropdown]);

  const processCategories = (data) => {
    const unique = [...new Set(data.map(item => item.serviceType))];
    const objs = unique.map(type => {
      const typeCategories = data.filter(cat => cat.serviceType === type);
      return { serviceType: type, queryCategoryValues: typeCategories.map(cat => cat.categoryValue) };
    });
    setServiceTypes(objs);
  };

  const handleLogout = async () => {
    try {
      const guestSlides = StorageService.getGuestSlides();
      if (guestSlides?.length) {
        try {
          sessionStorage.setItem('sessionGuestSlides', JSON.stringify(guestSlides));
          localStorage.setItem('preservedGuestSlides', JSON.stringify(guestSlides));
          localStorage.setItem('guestSlides', JSON.stringify(guestSlides));
          localStorage.setItem('lastLogoutTimestamp', Date.now().toString());
        } catch (e) { console.error('Failed to backup slides:', e); }
      }
      if (isOnline) {
        const response = await fetch(SummaryApi.logout_user.url, {
          method: SummaryApi.logout_user.method,
          credentials: 'include'
        });
        const data = await response.json();
        if (data.success) toast.success(data.message);
      }
      CookieManager.clearAll();
      StorageService.clearUserData();

      const preserved = localStorage.getItem('preservedGuestSlides');
      const sessionBackup = sessionStorage.getItem('sessionGuestSlides');
      if (!localStorage.getItem('guestSlides')) {
        if (preserved) localStorage.setItem('guestSlides', preserved);
        else if (sessionBackup) localStorage.setItem('guestSlides', sessionBackup);
      }

      dispatch(logout());
      setMenuDisplay(false);
      setSearch('');
      navigate("/");
    } catch (e) {
      console.error("Error during logout:", e);
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    if (value) navigate(`/search?q=${value}`)
    else navigate("/search")
  }

  // =========================
  // MENU ITEMS
  // =========================
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
          category: 'Software Solutions',
          items: [
            { name: 'Customer Relation Management', href: '/customer-relation-management' },
            { name: 'Complaint Management', href: '/complaint-management' },
            { name: 'Laptop/Mobile Repair Registration', href: '/laptop-mobile-repair-registration' },
            { name: 'Partner and Service Management', href: '/partner-service-management' }
          ]
        },
        {
          category: 'IT Solutions',
          items: [
            { name: 'Security Alarm & Theft Prevention', href:'https://www.3gdigital.net/Solutions/security-alarm/' },
            { name: 'Parking Management System', href: 'https://www.3gdigital.net/Solutions/parking-managemen/t' },
            { name: 'Automatic Main Gates', href: 'https://www.3gdigital.net/Solutions/automatic-gates/' },
            { name: 'Fire Hydrant & Alarms', href: 'https://www.3gdigital.net/Solutions/fire-hydrant-alarms/' }
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
            { name: 'FAQ', href: '/faq' }
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
            { name: 'About Us', href: '/about-us' },
            { name: 'Our Team', href: '/our-team' }
          ]
        },
        {
          category: 'Legal',
          items: [
            { name: 'Terms & Conditions', href: '/terms-and-conditions' },
            { name: 'Privacy Policy', href: '/privacy-policy' },
            { name: 'Cookie Policy', href: '/cookies-policy' }
          ]
        }
      ]
    },
    {
      name: 'Contact',
      href: '/contact'
    }
  ];

  // Hover handlers
  const handleMouseEnter = (index) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(index);

    // For Services, initialize activeServiceSubCategory to the first item's sub-categories
    // AND set the default hoveredServiceItemName
    if (menuItems[index].name === 'Services') {
      const firstServiceItem = menuItems[index].dropdown[0]?.items[0];
      setActiveServiceSubCategory(firstServiceItem?.subCategories || null);
      setHoveredServiceItemName(firstServiceItem?.name || null); // Set default name
    } else {
      setActiveServiceSubCategory(null); // Reset for other dropdowns
      setHoveredServiceItemName(null); // Reset for other dropdowns
    }

    if (menuItems[index].name === 'Solutions' || menuItems[index].name === 'Company') {
      setActiveCategoryByMenu(prev => ({ ...prev, [index]: 0 }));
    }
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveServiceSubCategory(null);
      setHoveredServiceItemName(null); // Reset hovered service item name
    }, 200);
  };

  const handleServiceItemMouseEnter = (serviceItem) => {
    if (serviceItem.subCategories) {
      setActiveServiceSubCategory(serviceItem.subCategories);
      setHoveredServiceItemName(serviceItem.name); // Set the name of the hovered item
    } else {
      setActiveServiceSubCategory(null);
      setHoveredServiceItemName(null);
    }
  };

  const handleMobileMenuItemClick = (index, hasDropdown) => {
    if (hasDropdown) setActiveDropdown(activeDropdown === index ? null : index);
    else {
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  const setActiveLeftPane = (menuIndex, catIndex) => {
    setActiveCategoryByMenu(prev => ({ ...prev, [menuIndex]: catIndex }));
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
                    <button className="text-gray-700 hover:text-emerald-600 flex items-center focus:outline-none">
                      {item.name}
                      <ChevronRight className={`ml-1 w-4 h-4 transform ${activeDropdown === index ? 'rotate-90' : ''} transition-transform`} />
                    </button>
                  )}

                  {item.dropdown && activeDropdown === index && (
                    <>
                      {/* SERVICES - Updated to match Solutions/Company layout */}
                      {item.name === 'Services' ? (
                        <div className="absolute left-0 mt-3 bg-white rounded-lg shadow-xl ring-1 ring-gray-100 p-6 z-50">
                          <div className="flex min-w-[640px]"> {/* Adjust min-w as needed */}
                            {/* Left Pane (Main Service Categories and their items) */}
                            <div className="w-56 pr-8 border-r border-gray-100">
                              {/* Iterate through the main categories like 'Development Services' */}
                              {item.dropdown.map((mainCategory, mainCatIndex) => {
                                return (
                                  <div key={mainCatIndex}>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wide">{mainCategory.category}</h4>
                                    <ul className="space-y-1">
                                      {mainCategory.items.map((serviceItem, serviceItemIndex) => {
                                        // Determine if this serviceItem's subCategories are currently active
                                        const isActiveServiceItem = activeServiceSubCategory && serviceItem.subCategories === activeServiceSubCategory;

                                        return (
                                          <li key={serviceItemIndex}>
                                            <button
                                              onMouseEnter={() => handleServiceItemMouseEnter(serviceItem)} // This will set activeServiceSubCategory and hoveredServiceItemName
                                              className={`w-full text-left text-sm font-medium py-1 ${
                                                isActiveServiceItem ? 'text-emerald-700' : 'text-gray-800 hover:text-emerald-600'
                                              }`}
                                            >
                                              {serviceItem.name} {/* e.g., Website Development */}
                                            </button>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Right Pane (Sub-Categories of the hovered Service Item) */}
                            <div className="flex-1 pl-8">
                              {activeServiceSubCategory ? (
                                <>
                                  {/* Display the name of the currently hovered main service item as heading */}
                                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wide">
                                    {hoveredServiceItemName || 'Sub-Categories'} {/* Use the new state here */}
                                  </h4>
                                  <ul className="space-y-2">
                                    {activeServiceSubCategory.map((subCat, subCatIndex) => (
                                      <li key={subCatIndex}>
                                        <Link
                                          to={subCat.href}
                                          className="block text-gray-800 hover:text-emerald-600 text-sm font-medium whitespace-nowrap"
                                        >
                                          {subCat.name} {/* e.g., College Website */}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              ) : (
                                // Default content for the right pane if no service item is hovered
                                // Show sub-categories of the first service item by default
                                <>
                                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wide">
                                    {hoveredServiceItemName || 'Sub-Categories'} {/* Also use the new state for default */}
                                  </h4>
                                  <ul className="space-y-2">
                                    {item.dropdown[0]?.items[0]?.subCategories?.map((subCat, subCatIndex) => (
                                      <li key={subCatIndex}>
                                        <Link
                                          to={subCat.href}
                                          className="block text-gray-800 hover:text-emerald-600 text-sm font-medium whitespace-nowrap"
                                        >
                                          {subCat.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {/* SOLUTIONS & COMPANY — styled to match Services (same card/padding/typography) */}
                      {(item.name === 'Solutions' || item.name === 'Company') ? (
                        <div className="absolute left-0 mt-3 bg-white rounded-lg shadow-xl ring-1 ring-gray-100 p-6 z-50">
                          <div className="flex min-w-[640px]">
                            {/* Left Pane (categories) */}
                            <div className="w-56 pr-8 border-r border-gray-100">
                              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wide">Categories</h4>
                              <ul className="space-y-1">
                                {item.dropdown.map((cat, catIndex) => {
                                  const isActive = (activeCategoryByMenu[index] ?? 0) === catIndex;
                                  return (
                                    <li key={catIndex}>
                                      <button
                                        onMouseEnter={() => setActiveLeftPane(index, catIndex)}
                                        className={`w-full text-left text-sm font-medium py-1 ${
                                          isActive ? 'text-emerald-700' : 'text-gray-800 hover:text-emerald-600'
                                        }`}
                                      >
                                        {cat.category}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>

                            {/* Right Pane (items) */}
                            <div className="flex-1 pl-8">
                              {(() => {
                                const activeCatIndex = activeCategoryByMenu[index] ?? 0;
                                const activeCat = item.dropdown[activeCatIndex] || item.dropdown[0];
                                return (
                                  <>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wide">{activeCat.category}</h4>
                                    <ul className="space-y-2">
                                      {activeCat.items.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                          <Link
                                            to={subItem.href}
                                            className="block text-gray-800 hover:text-emerald-600 text-sm font-medium whitespace-nowrap"
                                          >
                                            {subItem.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {/* RESOURCES — simple, but styled same card */}
                      {item.name === 'Resources' ? (
                        <div className="absolute left-0 mt-3 w-max bg-white rounded-lg shadow-xl ring-1 ring-gray-100 p-6 grid grid-cols-1 gap-x-8 gap-y-4 z-50">
                          {item.dropdown.map((category, catIndex) => (
                            <div key={catIndex}>
                              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wide">{category.category}</h4>
                              <ul className="space-y-2">
                                {category.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link to={subItem.href} className="block text-gray-800 hover:text-emerald-600 text-sm font-medium">
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="bg-cyan-600 text-white border border-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-800 transition-colors flex gap-2">
                    <GoArrowSwitch className='mt-1 h-5 text-lg' />
                    Dashboard
                  </Link>

                  <div className='relative flex justify-center'>
                    <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
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
                            <Link to={"/admin-panel/all-products"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                          )}
                          {user?.role === ROLE.MANAGER && (
                            <Link to={"/manager-panel/dashboard"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Manager Panel</Link>
                          )}
                          {user?.role === ROLE.PARTNER && (
                            <Link to={"/partner-panel/dashboard"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Partner Panel</Link>
                          )}
                          {user?.role === ROLE.DEVELOPER && (
                            <Link to={"/developer-panel"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Developer Panel</Link>
                          )}
                          <Link to={'/order'} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Settings</Link>
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
              ) : (
                <>
                  <Link to="/staff-login" className="bg-white text-cyan-600 border border-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors">
                    Staff Login
                  </Link>
                  <Link to="/login" className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-bold rounded-md mr-2">M</div>
              <span className="font-bold text-lg">MeraSoftware</span>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            <NotificationBell />
            {isAuthenticated ? (
              <div className='relative flex justify-center'>
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                  {user?.profilePic ? (
                    <img src={user?.profilePic} className='w-8 h-8 rounded-full object-cover' alt={user?.name} />
                  ) : (
                    <FaRegCircleUser className="w-8 h-8 text-gray-700" />
                  )}
                </div>

                {menuDisplay && (
                  <div className='absolute bg-white bottom-0 w-44 top-11 h-fit p-2 shadow-lg rounded right-0' ref={userMenuRef}>
                    <nav>
                      {user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                      )}
                      {user?.role === ROLE.MANAGER && (
                        <Link to={"/manager-panel/dashboard"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Manager Panel</Link>
                      )}
                      {user?.role === ROLE.PARTNER && (
                        <Link to={"/partner-panel/dashboard"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Partner Panel</Link>
                      )}
                      {user?.role === ROLE.DEVELOPER && (
                        <Link to={"/developer-panel"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Developer Panel</Link>
                      )}
                      <Link to={'/order'} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Settings</Link>
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
              <Link to="/login" className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-cyan-700 transition-colors">Login</Link>
            )}

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 focus:outline-none">
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
                          {/* Mobile Services Dropdown - Simplified for mobile */}
                          {item.name === 'Services' ? (
                            item.dropdown.map((mainCategory, mainCatIndex) => (
                              <div key={mainCatIndex}>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">{mainCategory.category}</h4>
                                <ul className="space-y-1">
                                  {mainCategory.items.map((serviceItem, serviceItemIndex) => (
                                    <li key={serviceItemIndex}>
                                      <Link to={serviceItem.href} className="block text-gray-800 hover:text-emerald-600 text-sm py-1 px-2 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                                        {serviceItem.name}
                                      </Link>
                                      {/* Optionally show sub-categories directly here for mobile if desired */}
                                      {serviceItem.subCategories && (
                                        <ul className="ml-4 mt-1 space-y-0.5">
                                          {serviceItem.subCategories.map((subCat, subCatIndex) => (
                                            <li key={subCatIndex}>
                                              <Link to={subCat.href} className="block text-gray-600 hover:text-emerald-500 text-xs py-0.5 px-1 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                                                {subCat.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))
                          ) : (
                            // Original mobile dropdown logic for Solutions, Resources, Company
                            item.dropdown.map((category, catIndex) => (
                              <div key={catIndex}>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">{category.category}</h4>
                                <ul className="space-y-1">
                                  {category.items.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                      <Link to={subItem.href} className="block text-gray-800 hover:text-emerald-600 text-sm py-1 px-2 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))
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

      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
    </>
  )
}

export default Header;

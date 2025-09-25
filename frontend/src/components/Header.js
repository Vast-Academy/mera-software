import React, { useContext, useEffect, useRef, useState } from 'react'
import Logo from '../assest/newlogo.png' // Make sure this path is correct
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common'; // Make sure this path is correct
import { toast } from 'react-toastify';
import { logout } from '../store/userSlice'; // Make sure this path is correct
import ROLE from '../common/role'; // Make sure this path is correct
import Context from '../context'; // Make sure this path is correct
import { useOnlineStatus } from '../App'; // Make sure this path is correct
import CookieManager from '../utils/cookieManager'; // Make sure this path is correct
import StorageService from '../utils/storageService'; // Make sure this path is correct
import displayCurrency from "../helpers/displayCurrency" // Make sure this path is correct
import NotificationBell from '../components/NotificationBell'; // Make sure this path is correct
import LoginPopup from '../components/LoginPopup'; // Make sure this path is correct
import TriangleMazeLoader from '../components/TriangleMazeLoader'; // Make sure this path is correct
import { 
  Search, User, Wallet, LogOut, ChevronDown, ChevronRight, 
  Menu, X, Home, Settings, ExternalLink
} from 'lucide-react'; // Ensure lucide-react is installed

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
  const [hoveredServiceItemName, setHoveredServiceItemName] = useState(null);
  const dropdownTimeoutRef = useRef(null);
  const [activeCategoryByMenu, setActiveCategoryByMenu] = useState({}); // { [menuIndex]: catIndex }
  const searchInputRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);

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
        setActiveServiceSubCategory(null);
        setHoveredServiceItemName(null);
      }
      if (searchOpen && searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (menuDisplay) setMenuDisplay(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (activeDropdown !== null) {
          setActiveDropdown(null);
          setActiveServiceSubCategory(null);
          setHoveredServiceItemName(null);
        }
        if (searchOpen) setSearchOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [menuDisplay, mobileMenuOpen, activeDropdown, searchOpen]);

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
    const { value } = e.target;
    setSearch(value);
    if (value) navigate(`/search?q=${value}`);
    else navigate("/search");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) navigate(`/search?q=${search}`);
  };

  // Menu items configuration
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
              href: '/product-category?category=website-development',
              desc: 'Custom Website Plans for Your Business',
              subCategories: [
                { name: 'College Website', href: '/product-category?category=college-website' },
                { name: 'Educational Website', href: '/product-category?category=educational-website' },
                { name: 'Local Service Website', href: '/product-category?category=local-service-website' },
                { name: 'Portfolio Website', href: '/product-category?category=portfolio-website' },
                { name: 'Restaurant Website', href: '/product-category?category=restaurant-website' }
              ]
            },
            {
              name: 'Mobile App Development',
              href: '/product-category?category=mobile-app-development',
              desc: 'iOS & Android App Development',
              subCategories: [
                { name: 'iOS App Development', href: '/product-category?category=ios-app-development' },
                { name: 'Android App Development', href: '/product-category?category=android-app-development' },
                { name: 'Hybrid App Development', href: '/product-category?category=hybrid-app-development' },
                { name: 'Custom Mobile Solutions', href: '/product-category?category=custom-mobile-solutions' }
              ]
            },
            {
              name: 'Cloud Software Development',
              href: '/product-category?category=cloud-software-development',
              desc: 'Software to Automate Your Business',
              subCategories: [
                { name: 'SaaS Development', href: '/product-category?category=saas-development' },
                { name: 'CRM Solutions', href: '/product-category?category=crm-solutions' },
                { name: 'ERP Systems', href: '/product-category?category=erp-systems' },
                { name: 'Cloud Migration', href: '/product-category?category=cloud-migration' }
              ]
            },
            {
              name: 'Feature Upgrades',
              href: '/product-category?category=feature-upgrades',
              desc: 'Add Features to Existing Projects',
              subCategories: [
                { name: 'Performance Optimization', href: '/product-category?category=performance-optimization' },
                { name: 'Security Enhancements', href: '/product-category?category=security-enhancements' },
                { name: 'UI/UX Improvements', href: '/product-category?category=ui-ux-improvements' },
                { name: 'New Feature Integration', href: '/product-category?category=new-feature-integration' }
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
            { name: 'Customer Relation Management', href: '/solutions?type=crm' },
            { name: 'Complaint Management', href: '/solutions?type=complaint-management' },
            { name: 'Laptop/Mobile Repair Registration', href: '/solutions?type=laptop-mobile-repair-registration' },
            { name: 'Partner and Service Management', href: '/solutions?type=partner-service-management' }
          ]
        },
        {
          category: 'IT Solutions',
          items: [
            { name: 'Security Alarm & Theft Prevention', href: '/solutions?industry=security-alarm-theft-prevention' },
            { name: 'Parking Management System', href: '/solutions?industry=parking-management-system' },
            { name: 'Automatic Main Gates', href: '/solutions?industry=automatic-main-gates' },
            { name: 'Fire Hydrant & Alarms', href: '/solutions?industry=fire-hydrant-alarms' }
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
            { name: 'About Us', href: '/about' },
            { name: 'Our Team', href: '/team' }
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

  // Hover handlers
  const handleMouseEnter = (index) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(index);

    // Initialize Services right-pane with first service by default
    if (menuItems[index].name === 'Services') {
      const firstServiceItem = menuItems[index].dropdown[0]?.items[0];
      setActiveServiceSubCategory(firstServiceItem?.subCategories || null);
      setHoveredServiceItemName(firstServiceItem?.name || null);
    } else {
      setActiveServiceSubCategory(null);
      setHoveredServiceItemName(null);
    }

    if (menuItems[index].name === 'Solutions' || menuItems[index].name === 'Company') {
      setActiveCategoryByMenu(prev => ({ ...prev, [index]: 0 }));
    }
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveServiceSubCategory(null);
      setHoveredServiceItemName(null);
    }, 200);
  };

  const handleServiceItemMouseEnter = (serviceItem) => {
    if (serviceItem.subCategories) {
      setActiveServiceSubCategory(serviceItem.subCategories);
      setHoveredServiceItemName(serviceItem.name);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <TriangleMazeLoader />
        </div>
      )}

      {/* Desktop Header */}
      <header className='hidden lg:block bg-white sticky top-0 z-50 border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-12">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-indigo-200">
                  M
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent">
                  MeraSoftware
                </span>
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
                      <Link 
                        to={item.href} 
                        className="text-gray-700 hover:text-indigo-600 flex items-center py-1 transition-all duration-200 group"
                      >
                        {item.icon && <span className="mr-1.5">{item.icon}</span>}
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    ) : (
                      <button 
                        className="text-gray-700 hover:text-indigo-600 flex items-center focus:outline-none py-1 transition-all duration-200 group"
                      >
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <ChevronDown className="ml-1 w-4 h-4 group-hover:text-indigo-600 transition-all duration-200" />
                      </button>
                    )}

                    {item.dropdown && activeDropdown === index && (
                      <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-xl ring-1 ring-gray-100 z-50">
                        {/* SERVICES */}
                        {item.name === 'Services' && (
                          <div className="p-6">
                            <div className="flex min-w-[720px]">
                              {/* Left Pane (Main Service Categories and their items) */}
                              <div className="w-64 pr-8 border-r border-gray-100">
                                {item.dropdown.map((mainCategory, mainCatIndex) => (
                                  <div key={mainCatIndex}>
                                    <h4 className="text-sm font-semibold text-indigo-600 uppercase mb-3 tracking-wide">
                                      {mainCategory.category}
                                    </h4>
                                    <ul className="space-y-2">
                                      {mainCategory.items.map((serviceItem, serviceItemIndex) => {
                                        const isActiveServiceItem =
                                          activeServiceSubCategory &&
                                          serviceItem.subCategories === activeServiceSubCategory;

                                        return (
                                          <li key={serviceItemIndex}>
                                            <Link
                                              to={serviceItem.href}
                                              onMouseEnter={() => handleServiceItemMouseEnter(serviceItem)}
                                              className={`flex justify-between items-center text-sm font-medium py-1.5 px-2 rounded-md transition-all duration-200 ${
                                                isActiveServiceItem 
                                                  ? 'text-indigo-700 bg-indigo-50' 
                                                  : 'text-gray-800 hover:text-indigo-600 hover:bg-gray-50'
                                              }`}
                                            >
                                              <div>
                                                <div>{serviceItem.name}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{serviceItem.desc}</div>
                                              </div>
                                              {serviceItem.subCategories && (
                                                <ChevronRight className={`ml-2 w-4 h-4 ${isActiveServiceItem ? 'text-indigo-600' : 'text-gray-400'}`} />
                                              )}
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                ))}
                              </div>

                              {/* Right Pane (Sub-Categories) */}
                              <div className="flex-1 pl-8">
                                {activeServiceSubCategory ? (
                                  <>
                                    <h4 className="text-sm font-semibold text-indigo-600 uppercase mb-3 tracking-wide flex items-center">
                                      <span>{hoveredServiceItemName || 'Sub-Categories'}</span>
                                      <ChevronRight className="h-3 w-3 mx-2" />
                                      <span className="text-gray-500">Options</span>
                                    </h4>
                                    <ul className="grid grid-cols-2 gap-2">
                                      {activeServiceSubCategory.map((subCat, subCatIndex) => (
                                        <li key={subCatIndex}>
                                          <Link
                                            to={subCat.href}
                                            className="block text-gray-800 hover:text-indigo-600 hover:bg-gray-50 text-sm font-medium py-1.5 px-3 rounded-md transition-all duration-200"
                                          >
                                            {subCat.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                ) : (
                                  <>
                                    <h4 className="text-sm font-semibold text-indigo-600 uppercase mb-3 tracking-wide flex items-center">
                                      <span>{hoveredServiceItemName || 'Website Development'}</span>
                                      <ChevronRight className="h-3 w-3 mx-2" />
                                      <span className="text-gray-500">Options</span>
                                    </h4>
                                    <ul className="grid grid-cols-2 gap-2">
                                      {item.dropdown[0]?.items[0]?.subCategories?.map((subCat, subCatIndex) => (
                                        <li key={subCatIndex}>
                                          <Link
                                            to={subCat.href}
                                            className="block text-gray-800 hover:text-indigo-600 hover:bg-gray-50 text-sm font-medium py-1.5 px-3 rounded-md transition-all duration-200"
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
                        )}

                        {/* SOLUTIONS & COMPANY */}
                        {(item.name === 'Solutions' || item.name === 'Company') && (
                          <div className="p-6">
                            <div className="flex min-w-[640px]">
                              {/* Left Pane (categories) */}
                              <div className="w-56 pr-8 border-r border-gray-100">
                                <h4 className="text-sm font-semibold text-indigo-600 uppercase mb-3 tracking-wide">Categories</h4>
                                <ul className="space-y-2">
                                  {item.dropdown.map((cat, catIndex) => {
                                    const isActive = (activeCategoryByMenu[index] ?? 0) === catIndex;
                                    return (
                                      <li key={catIndex}>
                                        <button
                                          onMouseEnter={() => setActiveLeftPane(index, catIndex)}
                                          className={`w-full text-left text-sm font-medium py-1.5 px-2 rounded-md transition-all duration-200 ${
                                            isActive 
                                              ? 'text-indigo-700 bg-indigo-50' 
                                              : 'text-gray-800 hover:text-indigo-600 hover:bg-gray-50'
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
                                      <h4 className="text-sm font-semibold text-indigo-600 uppercase mb-3 tracking-wide flex items-center">
                                        <span>{activeCat.category}</span>
                                        <ChevronRight className="h-3 w-3 mx-2" />
                                        <span className="text-gray-500">Options</span>
                                      </h4>
                                      <ul className="grid grid-cols-1 gap-2">
                                        {activeCat.items.map((subItem, subIndex) => (
                                          <li key={subIndex}>
                                            <Link
                                              to={subItem.href}
                                              className="block text-gray-800 hover:text-indigo-600 hover:bg-gray-50 text-sm font-medium py-1.5 px-3 rounded-md transition-all duration-200 flex items-center"
                                            >
                                              <span>{subItem.name}</span>
                                              <ExternalLink className="ml-2 h-3 w-3 text-gray-400" />
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
                        )}

                        {/* RESOURCES */}
                        {item.name === 'Resources' && (
                          <div className="p-6">
                            <div className="w-64">
                              {item.dropdown.map((category, catIndex) => (
                                <div key={catIndex}>
                                  <h4 className="text-sm font-semibold text-indigo-600 uppercase mb-3 tracking-wide">{category.category}</h4>
                                  <ul className="space-y-2">
                                    {category.items.map((subItem, subIndex) => (
                                      <li key={subIndex}>
                                        <Link 
                                          to={subItem.href} 
                                          className="block text-gray-800 hover:text-indigo-600 hover:bg-gray-50 text-sm font-medium py-1.5 px-3 rounded-md transition-all duration-200"
                                        >
                                          {subItem.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative" ref={searchInputRef}>
                {searchOpen ? (
                  <form 
                    className="relative"
                    onSubmit={handleSearchSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Search services..."
                      className="w-64 py-2 pl-4 pr-10 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={search}
                      onChange={handleSearch}
                      autoFocus
                    />
                    <button 
                      type="submit" 
                      className="absolute right-3 top-2 text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      <Search size={18} />
                    </button>
                  </form>
                ) : (
                  <button 
                    onClick={() => setSearchOpen(true)} 
                    className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-100"
                  >
                    <Search size={18} />
                  </button>
                )}
              </div>

              <NotificationBell />

              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span>Dashboard</span>
                  </Link>

                  <div className='relative flex justify-center'>
                    <button 
                      onClick={() => setMenuDisplay(prev => !prev)} 
                      className='cursor-pointer relative flex justify-center items-center'
                    >
                      {user?.profilePic ? (
                        <div className="relative">
                          <img 
                            src={user?.profilePic} 
                            className='w-10 h-10 rounded-full object-cover border-2 border-indigo-100 shadow-sm' 
                            alt={user?.name} 
                          />
                          <span className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white w-3.5 h-3.5 rounded-full"></span>
                        </div>
                      ) : (
                        <div className="p-2 bg-indigo-100 rounded-full text-indigo-700 hover:bg-indigo-200 transition-colors">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                    </button>

                    {menuDisplay && (
                      <div 
                        className='absolute bg-white top-12 right-0 w-64 rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50' 
                        ref={userMenuRef}
                      >
                        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
                          <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
                          <div className="text-sm text-gray-500 truncate">{user?.email || 'user@example.com'}</div>
                        </div>
                        
                        <nav className="py-2">
                          {user?.role === ROLE.ADMIN && (
                            <Link to="/admin-panel/all-products" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                                <Settings className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Admin Panel</div>
                                <div className="text-xs text-gray-500">Manage all products</div>
                              </div>
                            </Link>
                          )}
                          
                          {user?.role === ROLE.MANAGER && (
                            <Link to="/manager-panel/dashboard" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                <Settings className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Manager Panel</div>
                                <div className="text-xs text-gray-500">View dashboard</div>
                              </div>
                            </Link>
                          )}
                          
                          {user?.role === ROLE.PARTNER && (
                            <Link to="/partner-panel/dashboard" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                              <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                                <Settings className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Partner Panel</div>
                                <div className="text-xs text-gray-500">View dashboard</div>
                              </div>
                            </Link>
                          )}
                          
                          {user?.role === ROLE.DEVELOPER && (
                            <Link to="/developer-panel" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                                <Settings className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Developer Panel</div>
                                <div className="text-xs text-gray-500">Access development tools</div>
                              </div>
                            </Link>
                          )}
                          
                          <Link to='/order' className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                            <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                              <Settings className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Settings</div>
                              <div className="text-xs text-gray-500">Manage your account</div>
                            </div>
                          </Link>
                          
                          <div className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors'>
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                              <Wallet className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Wallet Balance</div>
                              <div className="text-xs font-medium text-emerald-600">{displayCurrency(context.walletBalance)}</div>
                            </div>
                          </div>
                          
                          <button 
                            onClick={handleLogout} 
                            className='w-full text-left flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors border-t border-gray-100 mt-2'
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                              <LogOut className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Logout</div>
                              <div className="text-xs text-gray-500">Sign out of your account</div>
                            </div>
                          </button>
                        </nav>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/staff-login" 
                    className="bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
                  >
                    Staff Login
                  </Link>
                  <Link 
                    to="/login" 
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-md">
                M
              </div>
              <span className="ml-2 text-lg font-bold bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent">
                MeraSoftware
              </span>
            </Link>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-full"
              >
                <Search size={20} />
              </button>
              
              <NotificationBell />
              
              {isAuthenticated ? (
                <div className='relative'>
                  <button 
                    onClick={() => setMenuDisplay(prev => !prev)} 
                    className='cursor-pointer relative flex justify-center items-center'
                  >
                    {user?.profilePic ? (
                      <div className="relative">
                        <img 
                          src={user?.profilePic} 
                          className='w-8 h-8 rounded-full object-cover border-2 border-indigo-100' 
                          alt={user?.name} 
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 bg-green-500 border-2 border-white w-2.5 h-2.5 rounded-full"></span>
                      </div>
                    ) : (
                      <div className="p-1.5 bg-indigo-100 rounded-full text-indigo-700">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                  
                  {menuDisplay && (
                    <div className='absolute bg-white top-10 right-0 w-64 rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50' ref={userMenuRef}>
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
                        <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
                        <div className="text-sm text-gray-500 truncate">{user?.email || 'user@example.com'}</div>
                      </div>
                      
                      <nav className="py-2">
                        {user?.role === ROLE.ADMIN && (
                          <Link to="/admin-panel/all-products" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                              <Settings className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Admin Panel</div>
                              <div className="text-xs text-gray-500">Manage all products</div>
                            </div>
                          </Link>
                        )}
                        
                        {/* Other roles similar to desktop */}
                        {user?.role === ROLE.MANAGER && (
                          <Link to="/manager-panel/dashboard" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                              <Settings className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Manager Panel</div>
                            </div>
                          </Link>
                        )}
                        
                        {user?.role === ROLE.PARTNER && (
                          <Link to="/partner-panel/dashboard" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                              <Settings className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Partner Panel</div>
                            </div>
                          </Link>
                        )}
                        
                        {user?.role === ROLE.DEVELOPER && (
                          <Link to="/developer-panel" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                              <Settings className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Developer Panel</div>
                            </div>
                          </Link>
                        )}
                        
                        <Link to='/order' className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                          <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                            <Settings className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Settings</div>
                          </div>
                        </Link>
                        
                        <div className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors'>
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <Wallet className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Balance: {displayCurrency(context.walletBalance)}</div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={handleLogout} 
                          className='w-full text-left flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors border-t border-gray-100 mt-2'
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Logout</div>
                          </div>
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-indigo-700 shadow-md"
                >
                  Login
                </Link>
              )}
              
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="p-2 text-gray-700 focus:outline-none hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Search Bar - Expandable */}
          {searchOpen && (
            <div className="mt-3">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search for services..."
                  className="w-full py-2 px-4 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  onChange={handleSearch}
                  value={search}
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-2 text-gray-400"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="bg-white border-t border-gray-100 overflow-hidden">
            <nav className="max-h-[70vh] overflow-y-auto py-4 px-4">
              {menuItems.map((item, index) => (
                <div key={index} className="py-1">
                  {item.href ? (
                    <Link 
                      to={item.href} 
                      className="block text-gray-700 hover:text-indigo-600 py-2 px-3 rounded-lg flex items-center" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon && <span className="mr-3">{item.icon}</span>}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleMobileMenuItemClick(index, true)}
                        className="w-full text-left text-gray-700 hover:text-indigo-600 py-2 px-3 rounded-lg flex items-center justify-between"
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown className={`w-5 h-5 transform transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {activeDropdown === index && (
                        <div className="ml-4 mt-2 space-y-2 overflow-hidden">
                          {/* Mobile Services Dropdown - Simplified for mobile */}
                          {item.name === 'Services' ? (
                            item.dropdown.map((mainCategory, mainCatIndex) => (
                              <div key={mainCatIndex} className="mb-4">
                                <h4 className="text-xs font-semibold text-indigo-600 uppercase mb-2 px-2">{mainCategory.category}</h4>
                                <ul className="space-y-1">
                                  {mainCategory.items.map((serviceItem, serviceItemIndex) => (
                                    <li key={serviceItemIndex}>
                                      <Link 
                                        to={serviceItem.href} 
                                        className="block text-gray-800 hover:text-indigo-600 hover:bg-gray-50 text-sm py-2 px-3 rounded-md transition-colors" 
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        <div className="font-medium">{serviceItem.name}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{serviceItem.desc}</div>
                                      </Link>
                                      
                                      {serviceItem.subCategories && (
                                        <ul className="ml-4 mt-1 space-y-0.5 border-l-2 border-indigo-100 pl-2 my-2">
                                          {serviceItem.subCategories.map((subCat, subCatIndex) => (
                                            <li key={subCatIndex}>
                                              <Link 
                                                to={subCat.href} 
                                                className="block text-gray-600 hover:text-indigo-500 text-xs py-1.5 px-2 rounded-md transition-colors" 
                                                onClick={() => setMobileMenuOpen(false)}
                                              >
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
                            item.dropdown.map((category, catIndex) => (
                              <div key={catIndex} className="mb-4">
                                <h4 className="text-xs font-semibold text-indigo-600 uppercase mb-2 px-2">{category.category}</h4>
                                <ul className="space-y-1">
                                  {category.items.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                      <Link 
                                        to={subItem.href} 
                                        className="block text-gray-800 hover:text-indigo-600 hover:bg-gray-50 text-sm py-2 px-3 rounded-md transition-colors" 
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
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
              
              {/* Login/Staff Login buttons for mobile when not authenticated */}
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 mt-4 px-3">
                  <Link 
                    to="/staff-login" 
                    className="bg-white text-indigo-600 border border-indigo-200 py-2 rounded-lg text-center font-medium hover:bg-indigo-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Staff Login
                  </Link>
                  <Link 
                    to="/login" 
                    className="bg-indigo-600 text-white py-2 rounded-lg text-center font-medium hover:bg-indigo-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
              
              {/* Dashboard link for mobile when authenticated */}
              {isAuthenticated && (
                <div className="mt-4 px-3">
                  <Link 
                    to="/dashboard" 
                    className="bg-indigo-600 text-white py-2 rounded-lg text-center font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Dashboard
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
    </>
  );
};

export default Header;
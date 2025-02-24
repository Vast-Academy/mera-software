import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import { useOnlineStatus } from '../App';
import StorageService from '../utils/storageService';
import { Monitor, Smartphone, Cloud, Plus, ArrowRight } from 'lucide-react';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOnline, isInitialized } = useOnlineStatus();
  const categoryLoading = new Array(4).fill(null);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Check if viewport is desktop or mobile
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Icon mapping based on service type
  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'Websites Development':
        return <Monitor className={isDesktop ? "w-12 h-12 mb-6 group-hover:scale-110 transition-transform" : "h-6 w-6 text-indigo-600"} />;
      case 'Mobile Apps':
        return <Smartphone className={isDesktop ? "w-12 h-12 mb-6 group-hover:scale-110 transition-transform" : "h-6 w-6 text-green-600"} />;
      case 'Cloud Softwares':
        return <Cloud className={isDesktop ? "w-12 h-12 mb-6 group-hover:scale-110 transition-transform" : "h-6 w-6 text-blue-600"} />;
      case 'Feature Upgrades':
        return <Plus className={isDesktop ? "w-12 h-12 mb-6 group-hover:scale-110 transition-transform" : "h-6 w-6 text-purple-600"} />;
      default:
        return <Monitor className={isDesktop ? "w-12 h-12 mb-6 group-hover:scale-110 transition-transform" : "h-6 w-6 text-gray-600"} />;
    }
  };

  // Background color mapping based on service type
  const getServiceBgColor = (serviceType) => {
    switch (serviceType) {
      case 'Websites Development':
        return 'bg-blue-600';
      case 'Mobile Apps':
        return 'bg-green-600';
      case 'Cloud Softwares':
        return 'bg-purple-600';
      case 'Feature Upgrades':
        return 'bg-amber-600';
      default:
        return 'bg-gray-100';
    }
  };

  // Get text color for service type
  const getServiceTextColor = (serviceType) => {
    switch (serviceType) {
      case 'Websites Development':
        return 'text-blue-100';
      case 'Mobile Apps':
        return 'text-green-100';
      case 'Cloud Softwares':
        return 'text-purple-100';
      case 'Feature Upgrades':
        return 'text-orange-100';
      default:
        return 'text-gray-100';
    }
  };

  // Process categories function
  const processCategories = (data) => {
    setCategories(data);
    
    // Group by service type and extract unique service types
    const uniqueServiceTypes = [...new Set(data.map(item => item.serviceType))];
    
    // Create service type objects with associated categories
    const serviceTypeObjects = uniqueServiceTypes.map(type => {
      const typeCategories = data.filter(cat => cat.serviceType === type);
      const representativeCategory = typeCategories[0] || {};
      
      return {
        serviceType: type,
        icon: getServiceIcon(type),
        bgColor: getServiceBgColor(type),
        textColor: getServiceTextColor(type),
        description: representativeCategory.description || `Professional ${type.toLowerCase()} services`,
        categories: typeCategories,
        queryCategoryValues: typeCategories.map(cat => cat.categoryValue),
      };
    });
    
    setServiceTypes(serviceTypeObjects);
  };

  useEffect(() => {
    const loadCategories = async () => {
      if (!isInitialized) return;

      // Check localStorage first
      const cachedCategories = StorageService.getProductsData('categories');
      if (cachedCategories) {
        processCategories(cachedCategories);
        setLoading(false);
      }

      // If online, fetch fresh data
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

    loadCategories();
  }, [isInitialized, isOnline]);

  // Build query string for all subcategories of a service type
  const buildCategoryQueryString = (categoryValues) => {
    if (!categoryValues || categoryValues.length === 0) return '';
    return categoryValues.map(val => `category=${val}`).join('&&');
  };

  // Desktop loading skeleton
  const DesktopLoadingSkeleton = () => (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {categoryLoading.map((_, index) => (
            <div key={`loading-${index}`} className="bg-gray-100 p-8 rounded-xl shadow-lg animate-pulse">
              <div className="h-12 w-12 bg-gray-200 rounded-full mb-6"></div>
              <div className="h-6 w-48 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-6"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Mobile loading skeleton
  const MobileLoadingSkeleton = () => (
    <div className="mb-8 mx-4">
      <div className="grid grid-cols-2 gap-3">
        {categoryLoading.map((_, index) => (
          <div key={`loading-${index}`} className="bg-gray-100 rounded-xl p-3 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mb-2">
              <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
            <div className="flex items-center">
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Desktop view
  const DesktopView = () => (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600">Choose from our range of professional digital solutions</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {serviceTypes.map((service) => (
            <Link
              to={`/product-category?${buildCategoryQueryString(service.queryCategoryValues)}`}
              key={service.serviceType}
              className={`${service.bgColor} bg-opacity-95 text-white p-8 rounded-xl hover:scale-105 transition-transform cursor-pointer shadow-lg group`}
            >
              {getServiceIcon(service.serviceType)}
              <h3 className="text-2xl font-semibold mb-3">{service.serviceType}</h3>
              <p className={`${service.textColor} mb-6`}>{service.description}</p>
              <button className="text-white group-hover:translate-x-2 transition-transform inline-flex items-center">
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  // Mobile view (original)
  const MobileView = () => (
    <section className="mb-8 mx-4 mt-6">
      <div className="grid grid-cols-2 gap-3">
        {serviceTypes.map((service) => (
          <Link
            to={`/product-category?${buildCategoryQueryString(service.queryCategoryValues)}`}
            key={service.serviceType}
            className={`${service.bgColor} rounded-xl p-3 hover:shadow-sm transition-shadow cursor-pointer flex flex-col`}
          >
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mb-2">
              {service.icon}
            </div>
            <h3 className="text-sm text-white font-semibold mb-1">{service.serviceType}</h3>
            <p className="text-xs text-gray-100 mb-2 flex-grow">
              {service.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );

  if (loading) {
    return isDesktop ? <DesktopLoadingSkeleton /> : <MobileLoadingSkeleton />;
  }

  return isDesktop ? <DesktopView /> : <MobileView />;
};

export default CategoryList;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import { useDatabase } from '../context/DatabaseContext';
import { Monitor, Smartphone, Cloud, Plus, ChevronRight } from 'lucide-react';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hybridCache, isInitialized, isOnline } = useDatabase();
  const categoryLoading = new Array(4).fill(null);
  const [serviceTypes, setServiceTypes] = useState([]);

  // Icon mapping based on service type
  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'Websites Development':
        return <Monitor className="h-6 w-6 text-indigo-600" />;
      case 'Mobile Apps ':
        return <Smartphone className="h-6 w-6 text-green-600" />;
      case 'Cloud Softwares ':
        return <Cloud className="h-6 w-6 text-blue-600" />;
      case 'Feature Upgrades':
        return <Plus className="h-6 w-6 text-purple-600" />;
      default:
        return <Monitor className="h-6 w-6 text-gray-600" />;
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

  useEffect(() => {
    const loadCategories = async () => {
      if (!isInitialized) return;

      const cacheKey = 'categories_all';
      
      try {
        // First try to get from hybrid cache
        const cachedData = await hybridCache.get('categories', cacheKey);
        
        if (cachedData) {
          // Immediately show cached data
          processCategories(cachedData.data);
          setLoading(false);
          
          // If online, fetch fresh data in background
          if (isOnline) {
            fetchFreshCategories(cacheKey);
          }
          return;
        }
    
        // If no cache and online, fetch fresh data
        if (isOnline) {
          await fetchFreshCategories(cacheKey);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
        
        // On error, try to use cached data as fallback
        const cachedFallback = await hybridCache.get('categories', cacheKey);
        if (cachedFallback?.data) {
          processCategories(cachedFallback.data);
        }
      } finally {
        setLoading(false);
      }
    };

    const processCategories = (data) => {
      setCategories(data);
      
      // Group by service type and extract unique service types
      const uniqueServiceTypes = [...new Set(data.map(item => item.serviceType))];
      
      // Create a complete service type object with associated categories
      const serviceTypeObjects = uniqueServiceTypes.map(type => {
        // Get all categories for this service type
        const typeCategories = data.filter(cat => cat.serviceType === type);
        // Find the first category as representative or use default values
        const representativeCategory = typeCategories[0] || {};
        
        return {
          serviceType: type,
          icon: getServiceIcon(type),
          bgColor: getServiceBgColor(type),
          // Use the first category's description or a generic one
          description: representativeCategory.description || `Professional ${type.toLowerCase()} services`,
          categories: typeCategories,
          // Generate query string for all subcategories of this service type
          queryCategoryValues: typeCategories.map(cat => cat.categoryValue),
        };
      });
      
      setServiceTypes(serviceTypeObjects);
    };

    const fetchFreshCategories = async (cacheKey) => {
      try {
        const response = await fetch(SummaryApi.allCategory.url);
        const data = await response.json();
        
        if (data.success) {
          processCategories(data.data);
          // Store in hybrid cache with medium priority
          await hybridCache.store('categories', cacheKey, data.data, 'medium');
        }
      } catch (error) {
        console.error('Error fetching fresh categories:', error);
      }
    };
  
    loadCategories();
  }, [hybridCache, isInitialized, isOnline]);

  // Build query string for all subcategories of a service type
  const buildCategoryQueryString = (categoryValues) => {
    if (!categoryValues || categoryValues.length === 0) return '';
    return categoryValues.map(val => `category=${val}`).join('&&');
  };

  if (loading) {
    return (
      <div className="mb-8 mx-4">
        {/* <h2 className="text-xl font-bold text-gray-800 mb-4">Our Services</h2> */}
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
  }

  return (
    <section className="mb-8 mx-4 mt-6">
      {/* <h2 className="text-xl font-bold text-gray-800 mb-4">Our Services</h2> */}
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
            <p className="text-xs text-gray-100  mb-2 flex-grow">
              {service.description}
            </p>
            {/* <div className="flex items-center text-xs font-medium text-gray-100">
              View Products <ChevronRight className="ml-1 h-3 w-3" />
            </div> */}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
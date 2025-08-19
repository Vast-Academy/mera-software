import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import { useOnlineStatus } from '../App';
import StorageService from '../utils/storageService';
import { Monitor, Smartphone, Cloud, Plus, ChevronRight, Globe, Settings, Wrench } from 'lucide-react';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOnline, isInitialized } = useOnlineStatus();
  const categoryLoading = new Array(4).fill(null);
  const [serviceTypes, setServiceTypes] = useState([]);

  // Updated icon mapping with new icons
  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'Websites Development':
      case 'Website Development':
        return <Globe className="w-9 h-9 text-white" />;
      case 'Mobile Apps':
        return <Smartphone className="w-9 h-9 text-white" />;
      case 'Cloud Softwares':
      case 'Web Software':
        return <Cloud className="w-9 h-9 text-white" />;
      case 'Feature Upgrades':
      case 'After Sale Services':
        return <Plus className="w-9 h-9 text-white" />;
      default:
        return <Globe className="w-9 h-9 text-white" />;
    }
  };

  // Updated color scheme with gradients and borders
  const getServiceColors = (serviceType) => {
    switch (serviceType) {
      case 'Websites Development':
      case 'Website Development':
        return {
          bgGradient: 'bg-gradient-to-br from-blue-600 to-blue-900',
          // bgGradient: 'bg-blue-500' ,
          iconBg: 'bg-blue-500',
          border: 'border-blue-200',
          // chevronColor: 'text-blue-600'
        };
      case 'Mobile Apps':
        return {
          bgGradient: 'bg-gradient-to-br from-teal-600 to-teal-900',
          // bgGradient: 'bg-pink-500',
          iconBg: 'bg-pink-500',
          border: 'border-pink-200',
          chevronColor: 'text-pink-600'
        };
      case 'Cloud Softwares':
      case 'Web Software':
        return {
          bgGradient: 'bg-gradient-to-br from-purple-600 to-purple-900',
          // bgGradient: 'bg-purple-500',
          iconBg: 'bg-purple-500',
          border: 'border-purple-200',
          chevronColor: 'text-purple-600'
        };
      case 'Feature Upgrades':
      case 'After Sale Services':
        return {
          bgGradient: 'bg-gradient-to-br from-cyan-600 to-cyan-900',
          // bgGradient: 'bg-emerald-600',
          iconBg: 'bg-emerald-600',
          border: 'border-green-200',
          chevronColor: 'text-green-600'
        };
      default:
        return {
          bgGradient: 'bg-gradient-to-br from-gray-50 to-gray-100',
          iconBg: 'bg-gray-500',
          border: 'border-gray-200',
          chevronColor: 'text-gray-600'
        };
    }
  };

  const getServiceUrl = (serviceType) => {
  switch (serviceType) {
    case 'Websites Development':
    case 'Website Development':
      return '/website-development-service';
    case 'Mobile Apps':
      return '/mobile-app-development-service';
    case 'Cloud Softwares':
    case 'Web Software':
      return '/cloud-software-service';
    case 'Feature Upgrades':
    case 'After Sale Services':
      return '/feature-upgrades-service';
    default:
      return '/services';
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
      const colors = getServiceColors(type);
      
      return {
        serviceType: type,
        icon: getServiceIcon(type),
        colors: colors,
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

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryLoading.map((_, index) => (
              <div key={`loading-${index}`} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 animate-pulse">
                <div className="bg-gray-300 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-7 h-7 bg-gray-400 rounded"></div>
                </div>
                <div className="h-5 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600">Choose the perfect solution for your business</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceTypes.map((service) => (
            <Link
            to={getServiceUrl(service.serviceType)}
            key={service.serviceType}
              className={`${service.colors.bgGradient} p-8 rounded-2xl cursor-pointer hover:shadow-xl transition-all group border hover:-translate-y-1 ${service.colors.border}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{service.serviceType}</h3>
              <p className="text-white text-sm mb-4">
                {service.description}
              </p>
              <ChevronRight className={`w-5 h-5 text-white ${service.colors.chevronColor} group-hover:translate-x-1 transition-transform`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
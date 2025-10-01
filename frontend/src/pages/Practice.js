import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Code, Cloud, Shield, Calculator, Settings, Target, TrendingUp, Check, Zap, Star, Users, Award, X, Globe } from 'lucide-react';
import { PiUsersFill } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import { AiOutlineRise } from "react-icons/ai";

const Homepage = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  // const [isExpanded, setIsExpanded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    goals: useRef(null),
    bridge: useRef(null),
    calculator: useRef(null)
  };

  const handlePricingClick = () => {
    console.log("Pricing button clicked!");
    setShowPricingModal(true);
  };

  const handleServiceSelection = (serviceType) => {
    console.log("Service selected:", serviceType);
    setSelectedService(serviceType);
    setIsAnimatingOut(true);

    // Wait for expand animation to complete, then redirect
    setTimeout(() => {
      setShowPricingModal(false);
      setIsAnimatingOut(false);
      setSelectedService(null);

      // Routing logic based on service selection
      switch(serviceType) {
        case 'website':
          console.log('Redirecting to Website Development Service page');
          // window.location.href = '/website-development-service';
          break;
        case 'software':
          console.log('Redirecting to Cloud Software Service page');
          // window.location.href = '/cloud-software-service';
          break;
        default:
          break;
      }
    }, 600);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionName = entry.target.dataset.section;
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, sectionName]));
        } else {
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            newSet.delete(sectionName);
            return newSet;
          });
        }
      });
    }, observerOptions);

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);


  return (
    <div className="min-h-screen bg-white">
   {/* Hero Section */}
<section
  ref={sectionRefs.hero}
  data-section="hero"
  className="relative overflow-hidden"
>
  {/* Background Pattern */}
  <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100"></div>
 
  
  <div className="relative max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-36">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
      {/* Left Content */}
      <div className="lg:col-span-6 text-center lg:text-left">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-3 sm:px-4 py-1 sm:py-2 mb-4 sm:mb-6">
          <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
          <span className="text-xs sm:text-sm font-medium text-gray-700">Custom Automation Within Your Budget</span>
        </div>

        {/* Main Headline */}
        <h1 className="capitalize font-bold mb-4 sm:mb-4 leading-tight text-gray-900 relative">
  <span className="block text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl">
    Stop working IN your business
  </span>
  
   {/* <span className="block text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-4xl bg-gradient-to-r from-blue-600 mt-1 sm:mt-1 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
    with a software that 
  </span> */}
   <span className="block text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-5xl bg-gradient-to-r from-blue-600 mt-1 sm:mt-2 via-blue-700 to-indigo-700 font-bold bg-clip-text text-transparent">
    Start Working on it
  </span>
  <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 rounded-full opacity-30"></div>
</h1>
        
        {/* Sub-headline */}
        <div className="text-lg sm:text-xl md:text-xl text-black mb-6 sm:mb-8 space-y-2 sm:space-y-3">
          <p className="leading-relaxed font-semibold">
          <span className="block font-medium">Successful businesses use software to automate daily tasks.</span>
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
          <button className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative flex items-center gap-2">
              Read How It Works
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          {/* <button className="group border-2 border-gray-300 text-gray-700 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 justify-center">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            View Our Work
          </button> */}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12 justify-center lg:justify-start flex-wrap">
          <div className="text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">12 → 1 Hour</div>
            <div className="text-xs sm:text-sm text-gray-500">Typical daily time savings</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">3 Months</div>
            <div className="text-xs sm:text-sm text-gray-500">Average Transformation</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-xs sm:text-sm text-gray-500">Automated Operations</div>
          </div>
        </div>
      </div>

      {/* Right Images */}
      <div className="lg:col-span-6 relative mt-8 lg:mt-0">
        {/* Main large image */}
        <div className="relative z-10">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-1 sm:p-2">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format" 
              alt="Digital Business Growth Dashboard"
              className="rounded-xl sm:rounded-2xl w-full"
            />
          </div>
          
          {/* Floating Card */}
          <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 z-20 border border-gray-100">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <AiOutlineRise className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-green-600"
                style={{ strokeWidth: 60 }} />
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">280% </div>
                <div className="text-xs sm:text-sm text-gray-500">Typical Outcome</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Small overlapping image */}
        <div className="absolute -top-4 sm:-top-6 md:-top-8 -right-2 sm:-right-4 z-30">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-1 sm:p-2">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=150&fit=crop&auto=format" 
              alt="Analytics Charts"
              className="rounded-lg sm:rounded-xl w-20 sm:w-24 md:w-32 h-16 sm:h-18 md:h-24 object-cover"
            />
          </div>
          
          {/* Rating Badge */}
          <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-current" />
            <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-current" />
           
          </div>
        </div>
      </div>
    </div>


  </div>
</section>

{/* About Us Section - Professional Design */}
<section
  ref={sectionRefs.about}
  data-section="about"
  className="py-8 sm:py-10 md:py-12 bg-gray-50 relative overflow-hidden"
>
  {/* Background Elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>
  <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-100/20 rounded-full -translate-y-32 sm:-translate-y-40 md:-translate-y-48 translate-x-32 sm:translate-x-40 md:translate-x-48 blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-100/20 rounded-full translate-y-32 sm:translate-y-40 md:translate-y-48 -translate-x-32 sm:-translate-x-40 md:-translate-x-48 blur-3xl"></div>
  
  <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 relative">
    
    <div className="text-center mb-6 sm:mb-8 md:mb-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mt-6 sm:mt-8 md:mt-10 text-gray-900 mb-2">
        Before You Continue
      </h2>
      <p className="text-lg sm:text-xl md:text-2xl lg:text-5xl capitalize text-blue-600 font-semibold">Know Our Story</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <PiUsersFill className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-2">Who We Are?</h3>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg">We're a software company helping startups and small businesses with custom management software solutions for business automation.</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
            <BiSupport className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 text-pink-600" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-2">We Almost Lost </h3>
            <p className="text-gray-900 text-sm sm:text-base md:text-lg">Our business nearly died during lockdown. We rebuilt our system and automated all manual work which created a massive profit difference.</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AiOutlineRise className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-2">Our Vision</h3>
            <p className="text-gray-900 text-sm sm:text-base md:text-lg">Our goal is helping every business automate so they too experience 
the same life-changing transformation we did, within their budget.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

        <div className="lg:col-span-4">
          <div className="h-full min-h-[300px] lg:min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              alt="Director"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 sm:p-6 border-b border-gray-100">
            <h4 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-900">Director's Message</h4>
            <div className="w-6 sm:w-8 h-1 bg-blue-500 mt-1"></div>
          </div>

          <div className="p-4 sm:p-6">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-200 mb-2 sm:mb-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>

            <div className="space-y-3 sm:space-y-4 text-gray-900 leading-relaxed">
              <p className='text-base  sm:text-xl leading-relaxed'>
                At Mera Software, your service and satisfaction are our priority. To ensure you receive the attention you deserve, we've designed a special portal where you can connect with us in real-time and access your developer directly.
              </p>

              {/* <p className="text-xl text-gray-900 ">
                We take time to understand your specific needs and deliver solutions that fit your budget. Professional automation shouldn't be complicated or expensive - that's our commitment to you.
              </p> */}
            </div>
          </div>

          {/* Mission Section */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <div>
                  <p className="text-gray-700 font-semibold text-sm sm:text-base md:text-lg leading-relaxed">
                   We take time to understand your specific needs and deliver solutions that fit your budget. Professional automation shouldn't be complicated or expensive - that's our commitment to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Bridge Section */}
    <div className="mt-12 sm:mt-16 mb-8 sm:mb-12">
      <div className="text-center">
        <div className="inline-block bg-blue-50/50 border border-blue-100 text-gray-800 px-10 py-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Now that you know who we are,{' '}
            <span className="text-blue-600">let's see what we can do for you</span>
          </h3>
        </div>
      </div>
    </div>

  </div>
</section>

{/* Investment Section */}
<section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-blue-50/30"></div>
  <div className="absolute top-0 left-0 w-72 h-72 bg-green-100/20 rounded-full -translate-y-36 -translate-x-36 blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100/20 rounded-full translate-y-36 translate-x-36 blur-3xl"></div>

  <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 relative">
    
    {/* Header */}
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
        This Isn't An Expense - It's An <span className="text-green-600">Investment</span>
      </h2>
      <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold">
        Every Rupee You Invest Returns More Than Double
      </p>
    </div>

    {/* Main Message */}
    <div className="text-center mb-12 sm:mb-16">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-green-100 shadow-sm">
        <p className="text-lg sm:text-xl md:text-2xl text-gray-800 font-medium leading-relaxed">
          Most business owners worry about software costs. But what about the cost of NOT automating?
        </p>
      </div>
    </div>

    {/* ROI Breakdown */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
      
      {/* Monthly Savings */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center capitalize">Every day without automation</h3>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 capitalize">Time Wasting on Manual Data Entry</h4>
              <p className="text-gray-700">Your staff could be <span className="text-green-600 font-bold">doing meaningful work instead</span></p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900">Risk of Losing Critical Business Data</h4>
              <p className="text-gray-700">Notebooks and local drives -  <span className="text-green-600 font-bold">one mistake away from disaster</span></p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900">Heavy Dependency on Few Key People</h4>
              <p className="text-gray-700">Work stops when <span className="text-green-600 font-bold">key people aren't available</span></p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900">Always Busy, Never Growing</h4>
              <p className="text-gray-700">No time for innovation  <span className="text-green-600 font-bold">when trapped in daily operations</span></p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="text-center">
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">This is exactly where most business owners are</h4>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600">stuck right now.</p>
          </div>
        </div>
      </div>

      {/* Key Insight & Statistics */}
      <div className="space-y-6 sm:space-y-8">
        
        {/* Key Insight */}
       <div className="lg:col-span-4">
          <div className="h-full min-h-[300px] lg:min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              alt="Director"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Statistics */}
        {/* <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Statistics</h3>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="flex justify-between items-center p-3 sm:p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <span className="text-lg sm:text-xl font-medium">Average ROI:</span>
              <span className="text-xl sm:text-2xl font-bold text-green-400">250% in first year</span>
            </div>
            
            <div className="flex justify-between items-center p-3 sm:p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <span className="text-lg sm:text-xl font-medium">Payback period:</span>
              <span className="text-xl sm:text-2xl font-bold text-blue-400">3-6 months</span>
            </div>
            
            <div className="flex justify-between items-center p-3 sm:p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <span className="text-lg sm:text-xl font-medium">Long-term savings:</span>
              <span className="text-xl sm:text-2xl font-bold text-yellow-400">10x investment over 5 years</span>
            </div>
          </div>
        </div> */}

      </div>
    </div>

    {/* Bridge Section 2 */}
    <div className="text-center">
      <div className="inline-block bg-blue-50/50 border border-blue-100 text-gray-800 px-10 py-6 rounded-xl shadow-sm">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
          But Custom Software Must Be Expensive?{' '} <br />
          That's what everyone thinks 
          <span className="text-blue-600"> until they see the actual numbers.</span>
        </h3>
      </div>
    </div>

  </div>
</section>


     {/* Instant Price Calculator */}
<section
  ref={sectionRefs.calculator}
  data-section="calculator"
  className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white"
>
  <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">
      {/* Left Content */}
      <div>
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
          <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
          Absolutely Free Tool
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Know Your Budget Before You Start
        </h2>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-3 sm:mb-4 font-medium">
          Get your project estimate in under 30 seconds
        </p>
        
        <p className="text-base sm:text-lg md:text-xl text-blue-600 font-semibold mb-6 sm:mb-8">
          Absolutely Free
        </p>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          No hidden costs. No surprises. No obligations.
        </p>

        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <span className="text-gray-700 text-sm sm:text-base md:text-lg">Choose your service type</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <span className="text-gray-700 text-sm sm:text-base md:text-lg">Select features you need</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <span className="text-gray-700 text-sm sm:text-base md:text-lg">See transparent pricing instantly</span>
          </div>
        </div>

 <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-3 sm:mb-4 font-medium">
          Everyone checks this first to understand their budget before reaching out
        </p>
        {/* Dual CTAs - Side by Side */}
        {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="group relative bg-gradient-to-r from-blue-600 to-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2 justify-center">
                     <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                    Website Price
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

          <button className="group relative bg-gradient-to-r from-pink-600 to-pink-600 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-pink-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2 justify-center">
                     <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />
                    Software Price
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
        </div> */}
      </div>

      {/* Right Images */}
      <div className="relative mt-8 lg:mt-0">
        {/* Main large image */}
        <div className="relative z-10">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-2 sm:p-4">
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=350&fit=crop&auto=format" 
              alt="Calculator and Financial Planning"
              className="rounded-xl sm:rounded-2xl w-full"
            />
          </div>
          
          {/* Floating Pricing Card */}
          <div className="absolute -bottom-6 sm:-bottom-8 -right-4 sm:-right-6 bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 z-20 border border-gray-100">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">100% FREE</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">Make Your Quote</div>
              <div className="w-6 sm:w-8 h-1 bg-green-500 rounded-full mx-auto mt-2"></div>
            </div>
          </div>
        </div>
        
        {/* Small overlapping image */}
        <div className="absolute -top-8 sm:-top-12 -left-6 sm:-left-8 z-30">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-2 sm:p-3">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=120&fit=crop&auto=format" 
              alt="Business Growth Analytics"
              className="rounded-lg sm:rounded-xl w-24 sm:w-28 md:w-36 h-16 sm:h-20 md:h-24 object-cover"
            />
          </div>
          
          {/* Time Badge */}
          <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl text-center">
            <div className="text-xs sm:text-sm font-bold">30sec</div>
            <div className="text-xs opacity-90">Instant</div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-6 sm:right-8 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-3 sm:left-4 w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-2000"></div>
      </div>

      
    </div>

    {/* Bridge Section 2 */}
    <div className="text-center mt-8">
      <div className="inline-block bg-blue-50/50 border border-blue-100 text-gray-800 px-10 py-6 rounded-xl shadow-sm">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Each service includes a free price calculator - {' '}
          <span className="text-blue-600"> choose what fits your needs</span>
        </h3>
      </div>
    </div>

  </div>
</section>
    
      {/* Goal Selector */}
      <section
        ref={sectionRefs.goals}
        data-section="goals"
        className="py-12 sm:py-16 md:py-20 bg-white"
            >
        <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 capitalize">
              Our Services
            </h2>
            {/* <p className="text-lg sm:text-xl md:text-2xl text-gray-900 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
              Let us know what matters most to you, and we'll guide you to the service that fits your goals best.
            </p> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto">
            {/* Website Development */}
            <div className="group bg-white text-center p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden sm:col-span-2 lg:col-span-1">
              {/* Arrow - appears on hover */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </div>
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-100 rounded-xl sm:rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                 Dynamic Website Development
                </h3>
                
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-gray-900 text-sm sm:text-base md:text-lg leading-relaxed">Websites that grow with your business and update anytime, anywhere.</span>
                  </li>
                </ul>
                
               <button className="group relative bg-gradient-to-r from-blue-600 to-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2 justify-center">
                    Pricing & Details
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            {/* Cloud Software Development */}
            <div className="group bg-white text-center p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100 hover:border-pink-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
                {/* Arrow - appears on hover */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </div>
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-pink-100 rounded-xl sm:rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Cloud className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-pink-600" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                  Cloud-Based Software Development
                </h3>
                
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-gray-900 text-sm sm:text-base md:text-lg leading-relaxed">Custom web software that automates your daily operations.</span>
                  </li>
                </ul>
                
                <button className="group relative bg-gradient-to-r from-pink-600 to-pink-600 text-white py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-xl font-semibold text-sm sm:text-base md:text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-pink-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2 justify-center">
                    Get Your Quote
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            {/* Service & Maintenance */}
            <div className="group bg-white text-center p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-green-100 hover:border-green-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden sm:col-span-2 lg:col-span-1">
              {/* Arrow - appears on hover */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </div>
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 rounded-xl sm:rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                  Service & Maintenance
                </h3>
                
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-gray-900 text-sm sm:text-base md:text-lg leading-relaxed">Add new features and updates to your existing software or website.</span>
                  </li>
                </ul>
                
                 <button className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-xl font-semibold text-sm sm:text-base md:text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2 justify-center">
                    See Pricing Plans
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Portfolio Section */}
<section className="py-12 sm:py-16 md:py-20 bg-gray-50 relative overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-purple-50/40"></div>
  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/30 rounded-full -translate-y-40 translate-x-40 blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/30 rounded-full translate-y-40 -translate-x-40 blur-3xl"></div>

  <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 relative">
    
    {/* Header */}
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
        Our <span className="text-blue-600">Portfolio</span>
      </h2>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">
        Real businesses. Real results. Real transformations.
      </p>
      <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
    </div>

    {/* Portfolio Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
      
      {/* Portfolio Item 1 - E-Commerce */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
        <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h4 className="text-xl font-bold mb-1">E-Commerce Platform</h4>
            <p className="text-blue-100 text-sm">Retail Business</p>
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Revenue Growth</p>
              <p className="text-xl font-bold text-green-600">+280%</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Complete automation of inventory management, order processing, and customer support system with real-time analytics.
          </p>
          <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
            <span>View Details</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Portfolio Item 2 - CRM */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
        <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h4 className="text-xl font-bold mb-1">CRM Automation</h4>
            <p className="text-purple-100 text-sm">Service Company</p>
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Time Saved</p>
              <p className="text-xl font-bold text-blue-600">50+ hrs/week</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Complete customer lifecycle automation with intelligent lead scoring, automated follow-ups, and performance tracking.
          </p>
          <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
            <span>View Details</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Portfolio Item 3 - Manufacturing */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
        <div className="h-48 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h4 className="text-xl font-bold mb-1">Manufacturing ERP</h4>
            <p className="text-orange-100 text-sm">Manufacturing Unit</p>
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Error Reduction</p>
              <p className="text-xl font-bold text-red-600">-95%</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            End-to-end production management with quality control automation, real-time reporting, and predictive maintenance.
          </p>
          <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
            <span>View Details</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Portfolio Item 4 - Financial */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
        <div className="h-48 bg-gradient-to-br from-green-500 to-green-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h4 className="text-xl font-bold mb-1">Financial Dashboard</h4>
            <p className="text-green-100 text-sm">Finance Firm</p>
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Accuracy</p>
              <p className="text-xl font-bold text-purple-600">99.8%</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Real-time financial reporting with automated reconciliation, compliance tracking, and intelligent risk assessment.
          </p>
          <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
            <span>View Details</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Portfolio Item 5 - HR */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
        <div className="h-48 bg-gradient-to-br from-teal-500 to-teal-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h4 className="text-xl font-bold mb-1">HR Management</h4>
            <p className="text-teal-100 text-sm">Corporate Office</p>
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h2a2 2 0 012 2v6.5" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Efficiency</p>
              <p className="text-xl font-bold text-yellow-600">+400%</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Complete employee lifecycle management with automated onboarding, payroll processing, and performance tracking.
          </p>
          <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
            <span>View Details</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Portfolio Item 6 - Mobile App */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
        <div className="h-48 bg-gradient-to-br from-indigo-500 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h4 className="text-xl font-bold mb-1">Mobile App</h4>
            <p className="text-indigo-100 text-sm">Healthcare Startup</p>
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">User Rating</p>
              <p className="text-xl font-bold text-green-600">4.9/5</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Patient management app with automated appointment scheduling, telemedicine features, and health tracking.
          </p>
          <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
            <span>View Details</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

    </div>

    {/* Portfolio Stats */}
    <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Portfolio Overview</h3>
        <p className="text-lg text-gray-300">Measurable results across diverse industries</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
          <p className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">50+</p>
          <p className="text-lg text-gray-300 font-medium">Projects Completed</p>
        </div>
        <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
          <p className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">98%</p>
          <p className="text-lg text-gray-300 font-medium">Client Satisfaction</p>
        </div>
        <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
          <p className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">₹2Cr+</p>
          <p className="text-lg text-gray-300 font-medium">Client Savings</p>
        </div>
        <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
          <p className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">15+</p>
          <p className="text-lg text-gray-300 font-medium">Industries Served</p>
        </div>
      </div>
    </div>

    {/* Bridge Section */}
    <div className="mt-12 sm:mt-16 text-center">
      <div className="inline-block bg-blue-50/50 border border-blue-100 text-gray-800 px-10 py-6 rounded-xl shadow-sm">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Impressed by our work?{' '}
          <span className="text-blue-600">Let's discuss your project</span>
        </h3>
      </div>
    </div>

  </div>
</section>

{/* Testimonials Section */}
<section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-transparent to-blue-50/30"></div>
  <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-100/20 rounded-full -translate-y-36 -translate-x-36 blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100/20 rounded-full translate-y-36 translate-x-36 blur-3xl"></div>

  <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 relative">
    
    {/* Header */}
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
        What Our <span className="text-yellow-600">Clients Say</span>
      </h2>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium mb-6">
        Real feedback from real businesses we've transformed
      </p>
      
      {/* Add Review Button */}
      <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <span className="flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Write Your Experience
        </span>
      </button>
    </div>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
      
      {/* Testimonial 1 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          <span className="text-yellow-400">★★★★★</span>
          <span className="text-sm text-gray-500 ml-2">5.0</span>
        </div>
        
        {/* Quote */}
        <div className="mb-6">
          <svg className="w-8 h-8 text-blue-200 mb-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
          <p className="text-gray-800 leading-relaxed text-lg">
            "The automation system increased our efficiency by 300%. We recovered our investment in just 2 months. Outstanding work!"
          </p>
        </div>
        
        {/* Profile */}
        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
            alt="Client" 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold text-gray-900">Rajesh Sharma</h4>
            <p className="text-sm text-gray-600">CEO, SharmaTech Solutions</p>
            <p className="text-xs text-gray-500">2 months ago</p>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          <span className="text-yellow-400">★★★★★</span>
          <span className="text-sm text-gray-500 ml-2">5.0</span>
        </div>
        
        {/* Quote */}
        <div className="mb-6">
          <svg className="w-8 h-8 text-blue-200 mb-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
          <p className="text-gray-800 leading-relaxed text-lg">
            "Error rates dropped by 95% and we're saving ₹2 lakhs monthly. Complete transformation of our production line."
          </p>
        </div>
        
        {/* Profile */}
        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
            alt="Client" 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold text-gray-900">Priya Patel</h4>
            <p className="text-sm text-gray-600">Operations Director, GreenLeaf Manufacturing</p>
            <p className="text-xs text-gray-500">3 months ago</p>
          </div>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          <span className="text-yellow-400">★★★★★</span>
          <span className="text-sm text-gray-500 ml-2">5.0</span>
        </div>
        
        {/* Quote */}
        <div className="mb-6">
          <svg className="w-8 h-8 text-blue-200 mb-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
          <p className="text-gray-800 leading-relaxed text-lg">
            "From 12-hour days to 1-hour monitoring. Their CRM automation gave me my life back while growing revenue by 250%."
          </p>
        </div>
        
        {/* Profile */}
        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
            alt="Client" 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold text-gray-900">Amit Gupta</h4>
            <p className="text-sm text-gray-600">Founder, Digital Solutions Ltd</p>
            <p className="text-xs text-gray-500">1 month ago</p>
          </div>
        </div>
      </div>

      {/* Testimonial 4 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          <span className="text-yellow-400">★★★★★</span>
          <span className="text-sm text-gray-500 ml-2">5.0</span>
        </div>
        
        {/* Quote */}
        <div className="mb-6">
          <svg className="w-8 h-8 text-blue-200 mb-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
          <p className="text-gray-800 leading-relaxed text-lg">
            "Incredible ROI! The financial dashboard they built saves us 40 hours weekly and ensures 99.8% accuracy in reporting."
          </p>
        </div>
        
        {/* Profile */}
        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
            alt="Client" 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold text-gray-900">Neha Singh</h4>
            <p className="text-sm text-gray-600">CFO, TechCorp Industries</p>
            <p className="text-xs text-gray-500">4 months ago</p>
          </div>
        </div>
      </div>

      {/* Testimonial 5 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          <span className="text-yellow-400">★★★★★</span>
          <span className="text-sm text-gray-500 ml-2">5.0</span>
        </div>
        
        {/* Quote */}
        <div className="mb-6">
          <svg className="w-8 h-8 text-blue-200 mb-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
          <p className="text-gray-800 leading-relaxed text-lg">
            "Our inventory management went from chaos to clockwork. Zero stockouts, minimal waste, and happy customers."
          </p>
        </div>
        
        {/* Profile */}
        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" 
            alt="Client" 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold text-gray-900">Vikram Joshi</h4>
            <p className="text-sm text-gray-600">Owner, Retail Plus Chain</p>
            <p className="text-xs text-gray-500">5 months ago</p>
          </div>
        </div>
      </div>

      {/* Add New Review Card */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-blue-300 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:from-blue-100 hover:to-blue-200 transition-all duration-300 cursor-pointer group">
        <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-300 transition-colors">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h4 className="text-xl font-bold text-blue-800 mb-2">Share Your Experience</h4>
        <p className="text-blue-600 mb-4">Help others by sharing your success story</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Add Your Review
        </button>
      </div>

    </div>

    {/* Stats Section */}
    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 sm:p-12 text-white text-center shadow-xl">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        <div>
          <p className="text-3xl sm:text-4xl font-bold mb-2">4.9/5</p>
          <p className="text-lg text-yellow-100">Average Rating</p>
        </div>
        <div>
          <p className="text-3xl sm:text-4xl font-bold mb-2">200+</p>
          <p className="text-lg text-yellow-100">Happy Clients</p>
        </div>
        <div>
          <p className="text-3xl sm:text-4xl font-bold mb-2">100%</p>
          <p className="text-lg text-yellow-100">Verified Reviews</p>
        </div>
      </div>
    </div>

    {/* Bridge Section */}
    <div className="mt-12 sm:mt-16 text-center">
      <div className="inline-block bg-blue-50/50 border border-blue-100 text-gray-800 px-10 py-6 rounded-xl shadow-sm">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Ready to become our next{' '}
          <span className="text-blue-600">success story?</span>
        </h3>
      </div>
    </div>

  </div>
</section>

{/* Contact Us Section */}
<section className="py-12 sm:py-16 md:py-20 bg-gray-50 relative overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-green-50/30"></div>
  <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full -translate-y-48 -translate-x-48 blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100/20 rounded-full translate-y-48 translate-x-48 blur-3xl"></div>

  <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 relative">
    
    {/* Header */}
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
        Get In <span className="text-blue-600">Touch</span>
      </h2>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">
        Ready to transform your business? Let's discuss your automation needs.
      </p>
      <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
    </div>

    {/* Main Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
      
      {/* Contact Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
        
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
            <input 
              type="text" 
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
            <input 
              type="tel" 
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Company Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
            <input 
              type="text" 
              placeholder="Enter your company name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Interested In</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
              <option value="">Select a service</option>
              <option value="automation">Business Automation</option>
              <option value="crm">CRM Development</option>
              <option value="erp">ERP Solutions</option>
              <option value="mobile">Mobile App Development</option>
              <option value="web">Web Development</option>
              <option value="consultation">Free Consultation</option>
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Details *</label>
            <textarea 
              rows="4"
              placeholder="Tell us about your project requirements and current challenges..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <span className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Message
            </span>
          </button>

          {/* Contact Info */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600 text-center">
              Or reach us directly at{' '}
              <a href="tel:+919876543210" className="text-blue-600 font-semibold hover:text-blue-700">+91 98765 43210</a>
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information & Map */}
      <div className="space-y-6 sm:space-y-8">
        
        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Phone Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Call Us</h4>
                <p className="text-blue-600 font-semibold">+91 98765 43210</p>
                <p className="text-sm text-gray-600">Mon-Sat, 9 AM - 7 PM</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Email Us</h4>
                <p className="text-green-600 font-semibold">info@company.com</p>
                <p className="text-sm text-gray-600">24/7 Response</p>
              </div>
            </div>
          </div>

        </div>

        {/* Office Address */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Visit Our Office</h4>
              <p className="text-gray-700 leading-relaxed">
                123 Tech Park, Civil Lines<br/>
                Ludhiana, Punjab 141001<br/>
                India
              </p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
          <div className="h-64 sm:h-80 bg-gray-200 relative">
            {/* Placeholder Map */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h5 className="text-lg font-semibold text-gray-800 mb-2">Our Location</h5>
                <p className="text-gray-600">Ludhiana, Punjab</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Open in Maps
                </button>
              </div>
            </div>
            
            {/* You can replace this with actual Google Maps embed */}
            {/* 
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54887.56168655594!2d75.80118282167969!3d30.90092398047271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837462345a7d%3A0x681102348a29acd7!2sLudhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
            */}
          </div>
        </div>

        {/* Quick Response Promise */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h4 className="text-lg font-bold">Quick Response Guarantee</h4>
          </div>
          <p className="text-green-100">We respond to all inquiries within 2 hours during business hours!</p>
        </div>

      </div>
    </div>

    {/* Bottom CTA */}
    <div className="text-center bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 sm:p-12 text-white">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h3>
      <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
        Take the first step towards business automation. Schedule a free consultation today!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
          Schedule Free Consultation
        </button>
        <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
          Download Company Profile
        </button>
      </div>
    </div>

  </div>
</section>

{/* Footer */}
<footer className="bg-gray-900 text-white py-8 sm:py-12">
  <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4">
    
    {/* Footer Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
      
      {/* Company Info */}
      <div>
        <h4 className="text-xl font-bold mb-4">Your Company</h4>
        <p className="text-gray-400 leading-relaxed mb-4">
          Transforming businesses through smart automation solutions. Your success is our mission.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.751-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-xl font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
          <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Our Services</a></li>
          <li><a href="#portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</a></li>
          <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
          <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h4 className="text-xl font-bold mb-4">Our Services</h4>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Business Automation</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">CRM Development</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">ERP Solutions</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mobile Apps</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Web Development</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="text-xl font-bold mb-4">Contact Info</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-400">+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-400">info@company.com</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-400">123 Tech Park, Civil Lines<br/>Ludhiana, Punjab 141001</span>
          </div>
        </div>
      </div>

    </div>

    {/* Footer Bottom */}
    <div className="border-t border-gray-800 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          © 2025 Your Company Name. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>

  </div>
</footer>


      {/* Compact Service Selection Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          >
            
            {/* Compact Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 sm:p-4 text-center relative">
              <button 
                onClick={() => setShowPricingModal(false)}
                className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
              <h3 className="text-base sm:text-lg font-bold">Get Project Price</h3>
              <p className="text-blue-100 text-xs sm:text-sm">Choose your service</p>
            </div>

            {/* Two Services Only - Stacked on mobile, side by side on larger */}
            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Website Development */}
                <button
                  onClick={() => handleServiceSelection('website')}
                  className={`
                    group relative p-3 sm:p-4 rounded-xl transition-all duration-300 text-center overflow-hidden
                    ${selectedService === 'website' && isAnimatingOut 
                      ? 'bg-blue-600 text-white scale-110 rotate-12' 
                      : 'border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50'
                    }
                  `}
                >
                  {/* Expanding ripple effect */}
                  {selectedService === 'website' && isAnimatingOut && (
                    <div className="absolute inset-0 bg-blue-600 animate-ping rounded-xl"></div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200 transition-colors">
                      <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 mb-1">Website</h4>
                    <p className="text-xs text-gray-600">Professional sites</p>
                  </div>
                </button>

                {/* Cloud Software */}
                <button
                  onClick={() => handleServiceSelection('software')}
                  className={`
                    group relative p-3 sm:p-4 rounded-xl transition-all duration-300 text-center overflow-hidden
                    ${selectedService === 'software' && isAnimatingOut 
                      ? 'bg-indigo-600 text-white scale-110 -rotate-12' 
                      : 'border-2 border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50'
                    }
                  `}
                >
                  {/* Expanding ripple effect */}
                  {selectedService === 'software' && isAnimatingOut && (
                    <div className="absolute inset-0 bg-indigo-600 animate-ping rounded-xl"></div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-indigo-200 transition-colors">
                      <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 mb-1">Software</h4>
                    <p className="text-xs text-gray-600">Automate work</p>
                  </div>
                </button>

              </div>
            </div>

            {/* Compact Footer */}
            <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 text-center rounded-b-2xl">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Free • Instant • No signup
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Homepage;
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Award, Star, TrendingUp } from 'lucide-react';

const Homepage = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());

  const sectionRefs = {
    hero: useRef(null),
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
      {/* Hero Section - Professional & Clean */}
      <section
        ref={sectionRefs.hero}
        data-section="hero"
        className="relative py-8 flex items-center bg-gradient-to-br from-white via-slate-50 to-blue-50"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-slate-100 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2.5 bg-white shadow-sm border border-slate-200 rounded-full px-4 py-2.5">
                <Award className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">Custom Automation Solutions</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4 ">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight uppercase">
                  Stop working <span className='text-blue-600'>IN</span> 
                </h1>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 uppercase">
                  Start Working <span className='text-blue-600'>on</span> it
                </h2>
                
                <div className="w-24 h-1.5 bg-blue-600 rounded-full"></div>
              </div>

              {/* Sub-headline */}
              <p className="text-2xl text-slate-700 font-semibold max-w-lg leading-relaxed">
                Successful businesses use software to automate daily tasks.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <button className="group relative bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    Read How It Works
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Stats - Card Style */}
                <div className="pt-6">
                <div className="flex flex-wrap items-start gap-8">
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold text-slate-900">12 → 1 Hour</div>
                    <div className="text-sm text-slate-600 mt-1">Daily time saved</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold text-slate-900">90 Days</div>
                    <div className="text-sm text-slate-600 mt-1">Full implementation</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold text-slate-900">24/7</div>
                    <div className="text-sm text-slate-600 mt-1">Automated operations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              {/* Main Image Card */}
              <div className="relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-3">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format" 
                    alt="Digital Business Growth Dashboard"
                    className="rounded-xl w-full"
                  />
                </div>
                
                {/* Success Metric Card - Professional Style */}
                <div className="absolute -bottom-6 -left-6 z-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-5 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="text-white">
                      <div className="text-3xl font-bold">280%</div>
                      <div className="text-sm font-medium text-slate-300">Typical Outcome</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small Chart Image - Professional Badge */}
              <div className="absolute -top-6 -right-6 z-30">
                <div className="bg-white rounded-xl shadow-xl p-2.5 border border-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=150&fit=crop&auto=format" 
                    alt="Analytics Charts"
                    className="rounded-lg w-32 h-24 object-cover"
                  />
                </div>
                
                {/* Professional Badge */}
                <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-2 shadow-lg">
                  <div className="flex gap-0.5">
                    <Star className="w-3 h-3 fill-white text-white" />
                    <Star className="w-3 h-3 fill-white text-white" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

     {/* About Us Section - Horizontal Layout */}
<section className="py-20 lg:py-20 bg-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    
    {/* Section Header */}
    <div className="mb-12 text-center">
      <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2 uppercase">
        Before You Continue
      </h2>
      <p className="text-2xl lg:text-3xl text-blue-600 font-bold uppercase">
        Know Our Story
      </p>
    </div>

    {/* Story Items - Horizontal Flow */}
    <div className="mb-20">
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-6">
        
        {/* Story Item 1 */}
        <div className="flex-1">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center rotate-3">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Who We Are?</h3>
              <p className="text-xl text-slate-900 leading-relaxed">
                We're a software company helping startups and small businesses with custom management software solutions for business automation.
              </p>
            </div>
          </div>
        </div>

        {/* Connecting Line */}
        <div className="hidden lg:block w-12 h-0.5 bg-blue-600 self-start mt-8"></div>

        {/* Story Item 2 */}
        <div className="flex-1">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center -rotate-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">We Almost Lost</h3>
              <p className="text-xl text-slate-900 leading-relaxed">
                Our business nearly died during lockdown. We rebuilt our system and automated all manual work which created a massive profit difference.
              </p>
            </div>
          </div>
        </div>

        {/* Connecting Line */}
        <div className="hidden lg:block w-12 h-0.5 bg-blue-600 self-start mt-8"></div>

        {/* Story Item 3 */}
        <div className="flex-1">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center rotate-3">
              <TrendingUp className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-xl text-slate-900 leading-relaxed">
                Our goal is helping every business automate so they too experience the same life-changing transformation we did, within their budget.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Director's Message - Photo Left, Message Right */}
    <div className="bg-blue-600/10 border border-blue-600 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Side - Director Image */}
        <div className="lg:col-span-3 ml-10">
      <div className="relative h-full min-h-[400px] lg:min-h-full flex items-center justify-center p-8">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3"></div>
          <div className="relative w-[250px] h-[300px] bg-white rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
              alt="Director"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

        {/* Right Side - Message */}
        <div className="lg:col-span-9 p-8 lg:p-12 ">
          <div className="h-full flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-10 bg-blue-600 rounded-full"></div>
              <h4 className="text-2xl font-bold text-slate-900">Director's Message</h4>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-slate-900 leading-relaxed">
                At Mera Software, your service and satisfaction are our priority. To ensure you receive the attention you deserve, we've designed a special portal where you can connect with us in real-time and access your developer directly.
              </p>

              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-600">
                <p className="text-lg text-slate-900 italic  leading-relaxed">
                  We take time to understand your specific needs and deliver solutions that fit your budget. Professional automation shouldn't be complicated or expensive - that's our commitment to you.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Bridge Section */}
   <div className="mt-20 text-center">
            <div className="inline-block bg-slate-800 border border-slate-600 rounded-xl px-8 py-5 shadow-xl">
              <h3 className="text-3xl font-semibold text-slate-200">
               Every business should have a management software,{' '} {' '}
                
                <span className="text-cyan-300"> But!</span>
              </h3>
            </div>
          </div>

  </div>
</section>

      {/* Investment Section - Fresh Design */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Header */}
          <div className="text-center mb-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase">
              Is this an Expense or<span className="text-cyan-300"> an Investment ?</span>
            </h2>
            {/* <p className="text-2xl sm:text-3xl text-slate-300 font-semibold">
              Many business owners unknowingly struggle with these problems every day!
            </p> */}
          </div>

          {/* Key Message */}
          <p className="text-lg mb-16 sm:text-2xl text-slate-100 font-medium leading-relaxed text-center">
                Many business owners unknowingly struggle with these problems every day!
              </p>
          {/* <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-cyan-200/10 rounded-2xl p-8  shadow-2xl">
              <p className="text-xl sm:text-3xl text-slate-100 font-medium leading-relaxed text-center">
                Many business owners silently struggle with these problems every day!
              </p>
            </div>
          </div> */}

          {/* Main Content Grid */}
          <div className="">
            
            {/* Left - Image */}
            {/* <div className="flex items-center justify-center lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-2xl transform -rotate-6 opacity-20"></div>
                <div className="relative bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face"
                    alt="Business Professional"
                    className="w-full h-[600px] object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
              </div>
            </div> */}

            {/* Right - Pain Points */}
            <div className="space-y-6 lg:order-2">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-2 capitalize">
                  Every day without automation
                </h3>
                <div className="w-24 h-1 bg-cyan-300 rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Pain Point 1 */}
                <div className="bg-cyan-200/5 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2 capitalize">
                        Time Wasting on Manual Data Entry
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-lg">
                       Staff time  <span className="text-cyan-300 font-semibold"> should create value, not waste. </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pain Point 2 */}
                <div className="bg-cyan-200/5 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2">
                        Risk of Losing Critical Business Data
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        Losing data could be a <span className="text-red-300 font-semibold">disaster for your business.</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pain Point 3 */}
                <div className="bg-cyan-200/5 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2">
                        Heavy Dependency on Few Key People
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        Work stops when <span className="text-orange-300 font-semibold">key people aren't available</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pain Point 4 */}
                <div className="bg-cyan-200/5 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2">
                        Always Busy, Never Growing
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        No time for innovation <span className="text-purple-300 font-semibold">when trapped in daily operations</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Box */}
              {/* <div className="mt-8 bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 rounded-xl p-6 border border-emerald-600/30">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white mb-2">
                    This is exactly where most business owners are
                  </h4>
                  <p className="text-3xl font-bold text-emerald-400">stuck right now.</p>
                </div>
              </div> */}
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="inline-block bg-blue-200/20 border border-blue-100 rounded-xl px-8 py-5 shadow-xl">
              <h3 className="text-3xl font-semibold text-slate-200">
               Every moment spent in these problems is {' '}
                
                <span className="text-cyan-300"> time, money, and opportunity lost.</span>
              </h3>
            </div>
          </div>

        </div>
      </section>

      {/* Calculator Section - Original Content */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-cyan-50 via-blue-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        {/* <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-300 rounded-full blur-3xl"></div>
        </div> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
           <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 uppercase">
              Why waste time?   <span className="text-cyan-300"></span>
            </h2>
            <p className="text-lg mb-16 sm:text-2xl text-blue-600 font-semibold leading-relaxed text-center">
            Let’s start building your software
      </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">     
            {/* Left - Content */}
            <div className="space-y-8 order-2 lg:order-1">
              
              {/* Header */}
              <div className="space-y-4">
               <div className="mb-8">
                <h3 className="text-5xl font-bold text-slate-800 mb-2 capitalize">
                  Getting started is <span className='block mt-2'>not that hard</span>
                </h3>
                <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
              </div>

                <p className="text-lg sm:text-2xl text-blue-600 font-bold">
                  Know Your Budget Before You Start
                </p>
              </div>

              {/* Main Message */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                <p className="text-xl font-semibold text-slate-700">
Use our interactive price calculator — it’s absolutely free
                </p>
              </div>

              {/* Process */}
              <div className="space-y-4">
                <p className="text-lg sm:text-2xl text-slate-600 font-bold">
                  Follow these three simple steps:
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full text-white flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <span className="text-slate-700 text-lg font-semibold">Choose your service type below</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full text-white flex items-center justify-center flex-shrink-0">
                      2
                      {/* <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg> */}
                    </div>
                    <span className="text-slate-700 text-lg font-semibold">Click on “Get Price Estimate”</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full text-white flex items-center justify-center flex-shrink-0">
                      3
                      {/* <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg> */}
                    </div>
                    <span className="text-slate-700 text-lg font-semibold">Select the features you need & get an instant price</span>
                  </div>
                </div>
              </div>

              {/* Bottom Text */}
              {/* <p className="text-xl text-slate-700 font-semibold leading-relaxed">
                Everyone checks this first to understand their budget before reaching out
              </p> */}
            </div>

            {/* Right - Visual Content */}
            <div className="relative order-1 lg:order-2">
              {/* Main Calculator Image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-200">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&auto=format" 
                    alt="Price Calculator"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Floating Stats Card - Top Right */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-slate-200 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">30 Seconds</div>
                    <div className="text-sm font-bold text-slate-900">Instant Result</div>
                  </div>
                </div>
              </div>

              {/* FREE Badge - Bottom Left */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-5 z-10">
                <div className="text-center">
                  <div className="text-2xl font-black text-white">100% FREE</div>
                  <div className="text-xs text-blue-100 font-semibold mt-1">No Obligations</div>
                </div>
              </div>
            </div>

          </div>

          
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-slate-900 mb-4 uppercase">
              Choose Your <span className='text-blue-600'>Service Type</span>
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            
            {/* Website Development Service */}
            <div className="group relative bg-white rounded-2xl p-8 flex flex-col items-center text-center gap-4 hover:border-blue-600 hover:border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              {/* Arrow Icon */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 rotate-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Dynamic Web Applications
              </h3>
              
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed mb-6">
                Custom portals, Interactive platforms, E-commerce, Blogs, Online booking.
              </p>
              
              {/* CTA Button */}
              {/* <button className="w-full group/btn relative bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-blue-700 transform translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Pricing & Details
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button> */}
            </div>

            {/* Cloud Software Development Service */}
            <div className="group relative flex flex-col items-center text-center gap-4 bg-white rounded-2xl p-8 hover:border-2 hover:border-pink-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              {/* Arrow Icon */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 -rotate-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Cloud-Based Management Software
              </h3>
              
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed mb-6">
                CRM, CMS, LMS, Inventory Management, Staff Management, Sales Monitoring.
              </p>
              
              {/* CTA Button */}
              {/* <button className="w-full group/btn relative bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-pink-700 transform translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Get Your Quote
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button> */}
            </div>

            {/* Service & Maintenance */}
            {/* <div className="group relative bg-white rounded-2xl p-8 border-2 border-emerald-200 hover:border-emerald-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 md:col-span-2 lg:col-span-1">
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </div>

              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Service & Maintenance
              </h3>
              
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Add new features and updates to your existing software or website.
              </p>
              
              <button className="w-full group/btn relative bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-700 transform translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  See Pricing Plans
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div> */}

          </div>

           {/* Bridge Section */}
   <div className="mt-20 text-center">
            <div className="inline-block bg-slate-800 border border-slate-600 rounded-xl px-8 py-5 shadow-xl">
              <h3 className="text-3xl font-semibold text-slate-200">
               What after {' '} {' '}
                
                <span className="text-cyan-300"> Development ?</span>
              </h3>
            </div>
          </div>

        </div>
      </section>


{/* Portal Section - Calculator Style with Grid + CTA */}
 <section className="py-20 lg:py-24 bg-gradient-to-br from-cyan-50 via-blue-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 uppercase">
            Delivery is Just the <span className="text-blue-600">Beginning</span>
          </h2>
          <p className="text-lg sm:text-2xl text-blue-600 font-semibold leading-relaxed">
            Stay Connected With Your Personal Development Portal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">     
          
          {/* Left - Image */}
          <div className="relative order-1 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-200">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format" 
                  alt="Development Portal Dashboard"
                  className="w-full"
                />
              </div>
            </div>

            {/* Floating Stats Card - Top Right */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-slate-200 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Real-Time</div>
                  <div className="text-sm font-bold text-slate-900">Live Updates</div>
                </div>
              </div>
            </div>

            {/* 24/7 Badge - Bottom Left */}
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-5 z-10">
              <div className="text-center">
                <div className="text-2xl font-black text-white">24/7</div>
                <div className="text-xs text-blue-100 font-semibold mt-1">Portal Access</div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 order-2 lg:order-2">
            
            {/* Header */}
            <div className="space-y-4">
              <div className="mb-8">
                <h3 className="text-5xl font-bold text-slate-800 mb-2 capitalize">
                  Built for Long-Term Success
                </h3>
                <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed">
                Our business is built on after-service support — because in this field, nobody stops at just development. Everyone needs regular updates and new features. That's why we've designed a dedicated portal that puts complete control in your hands.
              </p>
            </div>
          </div>

        </div>

        {/* What You Get Heading */}
        <div className="text-center mt-16 mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 uppercase">
            What You Get In Our <span className="text-blue-600">Portal</span>
          </h3>
          <div className="w-24 h-1 bg-blue-600 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Grid - 2x2 + 1 Full Width with CTA */}
        <div className="max-w-6xl mx-auto">
          
          {/* First 4 Boxes - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Box 1 */}
            <div className="bg-cyan-200/5 backdrop-blur-sm rounded-xl p-6 border border-slate-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">
                    1. Direct Access to Developer
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    Chat directly with your developer. <span className="text-blue-600 font-semibold">No middlemen, no delays.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-cyan-200/5 backdrop-blur-sm rounded-xl p-6 border border-slate-200 hover:border-emerald-600 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">
                    2. Track Your Progress
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    Watch your project come to life in real-time — <span className="text-emerald-600 font-semibold">see what's being built, when, and by whom.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-cyan-200/5 backdrop-blur-sm rounded-xl p-6 border border-slate-200 hover:border-orange-600 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">
                    3. Instant Support
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    Report issues and get real-time solutions with <span className="text-orange-600 font-semibold">complete transparency.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-cyan-200/5 backdrop-blur-sm rounded-xl p-6 border border-slate-200 hover:border-purple-600 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">
                    4. Easy Data Sharing
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    Share files and requirements <span className="text-purple-600 font-semibold">faster than WhatsApp — organized and secure.</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Box 5 - Full Width with CTA */}
          <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border-2 border-pink-200 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">
                    5. Need More Features or Updates?
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-lg mb-4">
                    Visit our <span className="text-pink-600 font-bold">Feature Store & Maintenance</span> page to add new capabilities or get regular updates for your software.
                  </p>
                </div>
              </div>
              <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex-shrink-0">
                <span className="flex items-center gap-2">
                  Explore Options
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>

      
    </div>
  );
};

export default Homepage;
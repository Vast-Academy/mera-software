import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Globe, Smartphone, Database, Code, UserCheck, Search, Settings, Link, Star, Plus, MapPin, Phone, Mail, Shield, Clock, Award, ArrowRight, TrendingUp, Zap } from 'lucide-react';

const HomePage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Dynamic Services State
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Google Ranking',
      icon: Users,
      color: 'bg-white border-blue-200',
      iconColor: 'text-blue-600',
      accentColor: 'bg-blue-500',
      features: ['Responsive Design Branding', 'Custom Contact Forms'],
      price: '₹6,999',
      purchases: 47,
      rank: 1,
      trending: 'up'
    },
    {
      id: 2,
      name: 'Business Website',
      icon: Globe,
      color: 'bg-white border-green-200',
      iconColor: 'text-green-600',
      accentColor: 'bg-green-500',
      features: ['Multi-page Professional Layout', 'Service Showcase Pages'],
      price: '₹12,999',
      purchases: 43,
      rank: 2,
      trending: 'up'
    },
    {
      id: 3,
      name: 'E-commerce App',
      icon: Smartphone,
      color: 'bg-white border-purple-200',
      iconColor: 'text-purple-600',
      accentColor: 'bg-purple-500',
      features: ['Native App Development', 'Payment Gateway Integration'],
      price: '₹65,999',
      purchases: 31,
      rank: 3,
      trending: 'down'
    },
    {
      id: 4,
      name: 'CRM System',
      icon: Settings,
      color: 'bg-white border-orange-200',
      iconColor: 'text-orange-600',
      accentColor: 'bg-orange-500',
      features: ['Custom Business Solutions', 'Database System Integration'],
      price: '₹45,999',
      purchases: 28,
      rank: 4,
      trending: 'up'
    }
  ]);

  const [realtimeUpdates, setRealtimeUpdates] = useState([]);

  // Simulate real-time purchase updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomService = Math.floor(Math.random() * services.length);
      const purchaseIncrease = Math.floor(Math.random() * 3) + 1;
      
      setServices(prev => {
        const updated = prev.map((service, index) => {
          if (index === randomService) {
            return {
              ...service,
              purchases: service.purchases + purchaseIncrease,
              trending: 'up'
            };
          }
          return service;
        });
        
        // Sort by purchases and update ranks
        const sorted = [...updated].sort((a, b) => b.purchases - a.purchases);
        return sorted.map((service, index) => ({
          ...service,
          rank: index + 1,
          trending: service.rank > index + 1 ? 'up' : service.rank < index + 1 ? 'down' : service.trending
        }));
      });

      // Add realtime update notification
      const serviceName = services[randomService]?.name;
      const updateId = Date.now();
      setRealtimeUpdates(prev => [{
        id: updateId,
        message: `${serviceName} +${purchaseIncrease} orders`,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 4)]);

      // Remove notification after 3 seconds
      setTimeout(() => {
        setRealtimeUpdates(prev => prev.filter(update => update.id !== updateId));
      }, 3000);

    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds

    return () => clearInterval(interval);
  }, [services]);

  const getRankBadge = (rank) => {
    const badges = {
      1: { bg: 'bg-yellow-500', text: 'text-white', label: '🏆 #1' },
      2: { bg: 'bg-gray-400', text: 'text-white', label: '🥈 #2' },
      3: { bg: 'bg-orange-600', text: 'text-white', label: '🥉 #3' },
      4: { bg: 'bg-blue-600', text: 'text-white', label: '#4' }
    };
    return badges[rank] || { bg: 'bg-gray-300', text: 'text-gray-700', label: `#${rank}` };
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">MeraSoftware</span>
          </div>
          <nav className="hidden lg:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Solutions</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 font-medium">Sign In</button>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Award className="w-4 h-4 mr-2" />
                Trusted by 100+ Businesses
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                We Build Software
                <span className="block text-blue-600">That Fits Your Needs</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                We start by understanding your business challenges, then design and develop software tailored to your exact requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-br from-blue-500 to-blue-900 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-blue-900 font-semibold flex items-center justify-center transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
                  Start Your Project <ChevronRight className="ml-2 w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-purple-600 hover:text-purple-600 font-semibold transition-colors">
                  View Portfolio
                </button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100+</div>
                  <div className="text-sm text-gray-600">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Client Retention</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Professional team working on software development" 
                  className="rounded-3xl shadow-3xl border-4 mb-20 border-teal-600"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-900 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">99.9% Uptime</div>
                    <div className="text-sm text-gray-600">Enterprise Grade Security</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


            {/* Portfolio Section */}
   {/* PORTFOLIO HIGHLIGHTS – drop‑in section with web images */}
<section id="portfolio" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    {/* Header */}
    <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-4xl font-bold text-gray-900">Portfolio Highlights</h2>
        <p className="mt-2 max-w-2xl text-gray-600">
          500+ deliveries across industries — here are a few representative builds.
        </p>
      </div>
      <div className="flex gap-2">
        <a
          href="/portfolio"
          className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
        >
          View Full Portfolio
        </a>
        <a
          href="#contact"
          className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50"
        >
          Request a Demo
        </a>
      </div>
    </div>

    {/* Impact stats */}
    <div className="mb-10 grid grid-cols-3 gap-3 sm:gap-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow">
        <div className="text-2xl font-extrabold text-gray-900">500+</div>
        <div className="mt-1 text-xs font-medium text-gray-600">Projects Delivered</div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow">
        <div className="text-2xl font-extrabold text-gray-900">12+</div>
        <div className="mt-1 text-xs font-medium text-gray-600">Industries</div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow">
        <div className="text-2xl font-extrabold text-gray-900">4.8/5</div>
        <div className="mt-1 text-xs font-medium text-gray-600">Avg. Rating</div>
      </div>
    </div>

    {/* 3 Highlights (using web images) */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "Modern Business Website",
          type: "Website",
          blurb: "Clean UI with lead forms.",
          image:
            "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=60",
          href: "#",
          alt: "Laptop with modern business website UI",
        },
        {
          title: "Operations CRM",
          type: "Software",
          blurb: "Workflow tracking & roles.",
          image:
            "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1200&q=60",
          href: "#",
          alt: "Dashboard UI for CRM operations",
        },
        {
          title: "Appointment Booking App",
          type: "Software",
          blurb: "Scheduling with notifications.",
          image:
            "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=1200&q=60",
          href: "#",
          alt: "Phone showing appointment booking app",
        },
      ].map((h) => (
        <a
          key={h.title}
          href={h.href}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow hover:shadow-lg"
        >
          <div className="relative">
            <div className="aspect-[16/10] bg-gray-50">
              <img
                src={h.image}
                alt={h.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-700 ring-1 ring-gray-200">
              {h.type}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">{h.title}</h3>
            <p className="line-clamp-2 text-sm text-gray-700">{h.blurb}</p>
          </div>
        </a>
      ))}
    </div>

    {/* Snapshot strip (web images for breadth) */}
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-3 shadow">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Snapshot Wall</h3>
        <span className="text-xs text-gray-500">Glimpses from various builds</span>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
        {[
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1541560052-77ec6f20e33c?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&h=300&q=60",
        ].map((src, i) => (
          <div key={i} className="overflow-hidden rounded-xl bg-gray-50 ring-1 ring-gray-100">
            <img
              src={src}
              alt={`Snapshot ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

       {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600 max-w-6xl mx-auto">Real success stories from businesses that have transformed with our solutions</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                  alt="Raj Patel" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-bold text-lg text-gray-900">Raj Patel</div>
                  <div className="text-gray-600">CEO, TechVenture Inc.</div>
                </div>
              </div>
              <div className="flex mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">"MeraSoftware transformed our business operations completely. Their ongoing support and innovative approach have been instrumental in our 300% growth over the past two years."</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                  alt="Priya Sharma" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-bold text-lg text-gray-900">Priya Sharma</div>
                  <div className="text-gray-600">Founder, Digital Solutions</div>
                </div>
              </div>
              <div className="flex mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">"The enterprise-grade solutions and exceptional support team make MeraSoftware our trusted technology partner. Their expertise in modern frameworks is unmatched."</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                  alt="Amit Kumar" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-bold text-lg text-gray-900">Amit Kumar</div>
                  <div className="text-gray-600">CTO, E-commerce Pro</div>
                </div>
              </div>
              <div className="flex mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">"Working with MeraSoftware has been a game-changer. Their scalable solutions and proactive approach to technology challenges have exceeded all our expectations."</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 font-semibold flex items-center mx-auto shadow-lg border border-gray-100 transition-all transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Share Your Experience
            </button>
          </div>
        </div>
      </section>

         {/* Existing Customer Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              For Our Valued Clients
            </div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-3">
              Your Project,
              <span className=" text-blue-600"> Always Under Your Watch</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-7xl mx-auto">
              Log in to your client portal to check progress, share updates with your developer, and raise support requests whenever needed.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Customer Dashboard Interface" 
                  className="rounded-2xl shadow-2xl mt-12 mb-20 w-full h-full"
                />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">100+ Active</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                </div>
              </div>
              {/* Floating Feature Card */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Live Dashboard</span>
                </div>
              </div>
            </div>

            {/* Information & Directions Side */}
            <div className="space-y-8">

              {/* Direction Cards */}
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Database className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">Track Your Project Progress</h3>
                      <p className="text-gray-600">Access your dashboard to see how much work has been completed.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium flex items-center transition-colors">
                      Dashboard<ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                      <Plus className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">Share Data & Updates</h3>
                      <p className="text-gray-600">Directly connect with your project developer – share files & chat inside the portal.</p>
                    </div>
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 font-medium flex items-center transition-colors">
                      Open Portal <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <Phone className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">Get Help & Support</h3>
                      <p className="text-gray-600">Submit tickets for any issues and get quick help from our team.</p>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-medium flex items-center transition-colors">
                      Support <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">100+</div>
                  <div className="text-sm text-gray-600">Projects Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600">Tickets Resolved on Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

 





  {/* Business-Specific Cloud Software Section */}
<section className="py-20 bg-gray-50">
  
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">
        Business-Specific Cloud Software We've Created
      </h2>
      <p className="text-xl text-gray-600 max-w-5xl mx-auto">
        Professional software solutions designed for specific industries to streamline operations and boost productivity.
      </p>
    </div>
    
    <div className="grid lg:grid-cols-3 gap-8">
      {/* CRM Card */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group relative">
        {/* Arrow - appears on CTA hover */}
        <div className="absolute top-4 right-4 opacity-0 transform translate-x-2 transition-all duration-300 cta-arrow">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </div>
        
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
              All Businesses
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Customer Relationship Management
            </h3>
          </div>
          
          {/* Features */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">☁️ Cloud Based</span>
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">🆓 Free License</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Complete CRM solution for managing customers, leads, and sales. Essential for every business with zero software cost.
            </p>
          </div>
          
          {/* Target Industries */}
          <div className="border-t border-gray-100 pt-4 mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Target Industries:</h4>
            <p className="text-sm text-purple-600 font-medium">
              Suitable for All Business Types
            </p>
          </div>
          
          {/* Pricing & CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">Free</div>
              <div className="text-sm text-gray-500">Setup & Forever Use</div>
            </div>
            <button className="cta-button group/btn relative bg-gradient-to-br from-purple-500 to-purple-900 hover:from-purple-600 hover:to-purple-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:border hover:border-purple-700 hover:shadow-lg">
              <span className="flex items-center">
                Get Started
                <span className="ml-1 opacity-0 group-hover/btn:opacity-100 transform translate-x-1 group-hover/btn:translate-x-0 transition-all duration-300">
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Complaint Management Card */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group relative">
        {/* Arrow - appears on CTA hover */}
        <div className="absolute top-4 right-4 opacity-0 transform translate-x-2 transition-all duration-300 cta-arrow">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </div>
        
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-block bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
              Service Industries
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Complaint Management System
            </h3>
          </div>
          
          {/* Features */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">☁️ Cloud Based</span>
              <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">📱 WhatsApp API</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Advanced complaint tracking with WhatsApp integration. Automated notifications, status updates, and customer communication.
            </p>
          </div>
          
          {/* Target Industries */}
          <div className="border-t border-gray-100 pt-4 mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Target Industries:</h4>
            <p className="text-sm text-emerald-600 font-medium">
              Service Businesses (repair/maintenance)
            </p>
          </div>
          
          {/* Pricing & CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-emerald-600">₹499</div>
              <div className="text-sm text-gray-500">per month</div>
            </div>
            <button className="cta-button group/btn relative bg-gradient-to-br from-emerald-500 to-emerald-900 hover:from-emerald-600 hover:to-emerald-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:border hover:border-emerald-700 hover:shadow-lg">
              <span className="flex items-center">
                Get Started
                <span className="ml-1 opacity-0 group-hover/btn:opacity-100 transform translate-x-1 group-hover/btn:translate-x-0 transition-all duration-300">
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Staff Management Card */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group relative">
        {/* Arrow - appears on CTA hover */}
        <div className="absolute top-4 right-4 opacity-0 transform translate-x-2 transition-all duration-300 cta-arrow">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </div>
        
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
              Enterprise Companies
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Staff Management System
            </h3>
          </div>
          
          {/* Features */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">☁️ Cloud Based</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">💼 CRM Integration</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Complete employee tracking and management solution. Monitor work progress, attendance, and performance metrics.
            </p>
          </div>
          
          {/* Target Industries */}
          <div className="border-t border-gray-100 pt-4 mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Target Industries:</h4>
            <p className="text-sm text-blue-600 font-medium">
              Sales & Service Enterprises
            </p>
          </div>
          
          {/* Pricing & CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-blue-600">₹899</div>
              <div className="text-sm text-gray-500">per month</div>
            </div>
            <button className="cta-button group/btn relative bg-gradient-to-br from-blue-500 to-blue-900 hover:from-blue-600 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:border hover:border-blue-700 hover:shadow-lg">
              <span className="flex items-center">
                Get Started
                <span className="ml-1 opacity-0 group-hover/btn:opacity-100 transform translate-x-1 group-hover/btn:translate-x-0 transition-all duration-300">
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style jsx>{`
    /* Style for normal card hover - only shadow effect */
    .group:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    
    /* Styles for CTA hover effects */
    .group:has(.cta-button:hover) {
      transform: translateY(-4px);
      transition: transform 0.3s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out;
    }
    
    /* Border colors for each card on CTA hover */
    .group:has(.cta-button:hover):nth-child(1) {
      border-color: rgb(147 51 234); /* purple-600 */
    }
    
    .group:has(.cta-button:hover):nth-child(2) {
      border-color: rgb(5 150 105); /* emerald-600 */
    }
    
    .group:has(.cta-button:hover):nth-child(3) {
      border-color: rgb(37 99 235); /* blue-600 */
    }
    
    /* Show arrow on CTA hover */
    .group:has(.cta-button:hover) .cta-arrow {
      opacity: 1;
      transform: translateX(0);
    }
  `}</style>
</section>


     

    {/* Ready to Transform Your Business Section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Business?</h2>
      <p className="text-xl text-gray-600 max-w-6xl mx-auto">Explore the options and choose the solution that matches your need.</p>
    </div>
    <div className="bg-gray-50 p-10 rounded-3xl shadow-xl max-w-6xl mx-auto border border-gray-100">
      <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">What's Your Primary Business Goal?</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="group bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
          {/* Arrow - appears on hover */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Simple Website</h3>
          <p className="text-gray-600 mb-4">Professional business website with modern design</p>
          <div className="text-blue-800 font-medium group-hover:text-blue-600">Starting from ₹5,999</div>
        </div>
        
        <div className="group bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-purple-100 hover:border-purple-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
          {/* Arrow - appears on hover */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Web Software</h3>
          <p className="text-gray-600 mb-4">Custom business management systems</p>
          <div className="text-purple-800 font-medium group-hover:text-purple-600">Starting from ₹19,999</div>
        </div>
        
        <div className="group bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-teal-100 hover:border-teal-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
          {/* Arrow - appears on hover */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </div>
          
          <div className="bg-gradient-to-br from-teal-500 to-teal-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile App</h3>
          <p className="text-gray-600 mb-4">Native iOS and Android applications</p>
          <div className="text-teal-800 font-medium group-hover:text-teal-600">Starting from ₹59,999</div>
        </div>
        
        <div className="group bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-cyan-100 hover:border-cyan-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
          {/* Arrow - appears on hover */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Promote Business on Google</h3>
          <p className="text-gray-600 mb-4">SEO optimization and Google business promotion</p>
          <div className="text-cyan-800 font-medium group-hover:text-cyan-600">Starting from ₹4,999</div>
        </div>
        
        <div className="group bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100 hover:border-pink-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
          {/* Arrow - appears on hover */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </div>
          
          <div className="bg-gradient-to-br from-pink-500 to-pink-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Hire a Developer</h3>
          <p className="text-gray-600 mb-4">Dedicated developers for your project needs</p>
          <div className="text-pink-800 font-medium group-hover:text-pink-600">Lower cost than in-house</div>
        </div>
        
        <div className="group bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-indigo-100 hover:border-indigo-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
          {/* Arrow - appears on hover */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Update Your Website/App</h3>
          <p className="text-gray-600 mb-4">Maintenance and updates for existing projects</p>
          <div className="text-indigo-800 font-medium group-hover:text-indigo-600">Explore our pricing plans</div>
        </div>
      </div>
    </div>
  </div>
</section>

    

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Build Something Amazing Together</h2>
            <p className="text-xl text-gray-600 max-w-7xl mx-auto">Ready to transform your business with cutting-edge technology? Get in touch with our expert team</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-10 rounded-3xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Start Your Project</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Business Email</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="your.email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Project Details</label>
                  <textarea 
                    rows={5} 
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white resize-none"
                    placeholder="Tell us about your project requirements and goals..."
                  ></textarea>
                </div>
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 font-semibold text-lg transition-colors transform hover:scale-105">
                  Send Project Inquiry
                </button>
              </div>
            </div>
            
            {/* Map and Contact Info */}
            <div className="space-y-8">
              <div className="bg-gray-100 rounded-3xl h-80 flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Office Location" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-600 bg-opacity-80 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Visit Our Office</h4>
                    <p>Interactive map integration available</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Head Office</h4>
                      <p className="text-gray-600 text-sm">Tech Hub, Innovation District</p>
                    </div>
                  </div>
                  <p className="text-gray-700">123 Business Street, Tech City, TC 12345</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Call Us</h4>
                      <p className="text-gray-600 text-sm">Business Hours: 9 AM - 7 PM</p>
                    </div>
                  </div>
                  <p className="text-gray-700">+91 98765 43210</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Us</h4>
                      <p className="text-gray-600 text-sm">Quick Response Guaranteed</p>
                    </div>
                  </div>
                  <p className="text-gray-700">hello@merasoftware.com</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Support</h4>
                      <p className="text-gray-600 text-sm">24/7 Technical Assistance</p>
                    </div>
                  </div>
                  <p className="text-gray-700">support@merasoftware.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
              <p className="text-gray-600">Sign in to share your experience with our community</p>
            </div>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
              <div className="flex space-x-4 pt-4">
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-colors">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
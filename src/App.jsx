import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Users, Heart, Star, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [memberCount, setMemberCount] = useState(0);

  // Animated counter effect
  useEffect(() => {
    const timer = setInterval(() => {
      setMemberCount(prev => prev < 15420 ? prev + 150 : 15420);
    }, 50);
    
    if (memberCount >= 15420) {
      clearInterval(timer);
    }
    
    return () => clearInterval(timer);
  }, [memberCount]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero carousel data
  const heroSlides = [
    {
      title: "গৃহহীনদের কণ্ঠস্বর",
      subtitle: "জাতীয়তাবাদের নতুন পথযাত্রী",
      description: "মানবতার রাজনীতিতে বিশ্বাসী, সমাজের পিছিয়ে পড়া মানুষের অধিকার আদায়ে অঙ্গীকারবদ্ধ একটি দল।",
      image: "https://i.ibb.co/CpKchMTf/ad-2-20240611090126.jpg"
    },
    {
      title: "সবার জন্য আবাসন",
      subtitle: "স্বপ্নের বাংলাদেশ গড়ি",
      description: "প্রতিটি পরিবারের জন্য নিরাপদ আবাসনের নিশ্চয়তা এবং সমান সুযোগের অধিকার।",
      image: "https://i.ibb.co/CpKchMTf/ad-2-20240611090126.jpg"
    }
  ];

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const navItems = [
    { id: 'home', label: 'প্রচ্ছদ', icon: '🏠' },
    { id: 'about', label: 'দলের পরিচিতি', icon: '📋' },
    { id: 'leadership', label: 'নেতৃত্ব', icon: '👥' },
    { id: 'news', label: 'সংবাদ', icon: '📰' },
    { id: 'join', label: 'যোগ দিন', icon: '🤝' }
  ];

  const features = [
    {
      icon: React.createElement(Users, { className: "w-8 h-8" }),
      title: "সামাজিক ন্যায়বিচার",
      description: "সমাজের সকল স্তরের মানুষের জন্য সমান সুযোগ নিশ্চিত করা।"
    },
    {
      icon: React.createElement(Heart, { className: "w-8 h-8" }),
      title: "মানবতার সেবা",
      description: "দুর্দশাগ্রস্ত মানুষের পাশে থেকে সাহায্যের হাত বাড়ানো।"
    },
    {
      icon: React.createElement(Star, { className: "w-8 h-8" }),
      title: "জাতীয়তাবাদী চেতনা",
      description: "বাংলাদেশের স্বাধীনতা ও সার্বভৌমত্ব রক্ষায় অঙ্গীকারবদ্ধ।"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-green-800/95 backdrop-blur-md shadow-2xl' : 'bg-gradient-to-r from-green-700 to-green-800'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with animation */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-green-800 font-bold text-xl">জ</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-white hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                জাতীয়তাবাদী গৃহহীন পার্টি
              </h1>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex gap-8 text-lg">
              {navItems.map((item) => (
                <li key={item.id} className="relative group">
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-yellow-400 text-green-800 shadow-lg'
                        : 'text-white hover:text-yellow-400 hover:bg-green-600/30'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></div>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button className="hidden md:block bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-800 px-6 py-3 rounded-full font-semibold hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              যোগাযোগ করুন
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              {isMenuOpen ? React.createElement(X, { size: 24 }) : React.createElement(Menu, { size: 24 })}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="mt-4 bg-green-900/95 backdrop-blur-md rounded-lg shadow-2xl">
              <ul className="py-4 space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-yellow-400 text-green-800'
                          : 'text-white hover:bg-green-700 hover:text-yellow-400'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
<div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-800 to-emerald-900">
  <div className="absolute inset-0 bg-black/20"></div>
  <div
    className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20viewBox%3D%270%200%2060%2060%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.05%27%3E%3Ccircle%20cx%3D%2730%27%20cy%3D%2730%27%20r%3D%272%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"
  ></div>
</div>


        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-bounce"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${10 + (i * 20)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + (i * 0.3)}s`
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Enhanced Text Section */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <div className="inline-flex items-center bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
                  {React.createElement(Users, { className: "w-4 h-4 mr-2" })}
                  {memberCount.toLocaleString()} সদস্য আমাদের সাথে
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                  <span className="block transform hover:scale-105 transition-transform duration-300">
                    {heroSlides[currentSlide].title}
                  </span>
                  <span className="block text-yellow-400 text-3xl md:text-4xl mt-2">
                    {heroSlides[currentSlide].subtitle}
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed max-w-2xl">
                  {heroSlides[currentSlide].description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-800 px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl">
                  <span className="flex items-center justify-center">
                    দলে যোগ দিন
                    {React.createElement(ArrowRight, { className: "ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" })}
                  </span>
                </button>
                <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 hover:text-green-800 transition-all duration-300 backdrop-blur-sm">
                  আরও জানুন
                </button>
              </div>

              {/* Social Proof */}
              <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">১৫০+</div>
                  <div className="text-sm text-green-200">স্থানীয় শাখা</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">৫০০+</div>
                  <div className="text-sm text-green-200">কর্মী</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">২৫+</div>
                  <div className="text-sm text-green-200">বছরের অভিজ্ঞতা</div>
                </div>
              </div>
            </div>

            {/* Enhanced Image Section */}
            <div className="flex-1 relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <img 
                  src={heroSlides[currentSlide].image}
                  alt="Party Banner" 
                  className="relative w-full rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 border-4 border-yellow-400/30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                
                {/* Floating Action Button */}
                <button className="absolute bottom-6 right-6 bg-yellow-400 hover:bg-yellow-300 text-green-800 p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300">
                  {React.createElement(Phone, { className: "w-6 h-6" })}
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-yellow-400 w-8' : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          {React.createElement(ChevronDown, { className: "w-8 h-8" })}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              আমাদের মূল্যবোধ
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              জাতীয়তাবাদী গৃহহীন পার্টির মূল লক্ষ্য এবং আদর্শ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-green-100 hover:border-green-300"
              >
                <div className="text-green-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-green-800 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-800">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
            আমাদের সাথে যোগাযোগ করুন
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex items-center space-x-3 text-white">
              {React.createElement(Phone, { className: "w-6 h-6 text-yellow-400" })}
              <span className="text-lg">+৮৮০ ১৭০০ ০০০০০০</span>
            </div>
            <div className="flex items-center space-x-3 text-white">
              {React.createElement(Mail, { className: "w-6 h-6 text-yellow-400" })}
              <span className="text-lg">info@jgrp.bd</span>
            </div>
            <div className="flex items-center space-x-3 text-white">
              {React.createElement(MapPin, { className: "w-6 h-6 text-yellow-400" })}
              <span className="text-lg">ঢাকা, বাংলাদেশ</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
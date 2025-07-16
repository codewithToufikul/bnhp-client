import { Menu, X, ChevronDown, Users, Heart, Star, ArrowRight, Phone, Mail, MapPin, Facebook, MessageCircle, Home, Info, Newspaper, Crown, Calendar } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const divisions = {
    'ঢাকা': ['ঢাকা', 'ফরিদপুর', 'গাজীপুর', 'গোপালগঞ্জ', 'কিশোরগঞ্জ', 'মাদারীপুর', 'মানিকগঞ্জ', 'মুন্শিগঞ্জ', 'নারায়ণগঞ্জ', 'নরসিংদী', 'রাজবাড়ী', 'শরীয়তপুর', 'টাঙ্গাইল'],
    'চট্টগ্রাম': ['চট্টগ্রাম', 'বান্দরবান', 'ব্রাহ্মণবাড়িয়া', 'চাঁদপুর', 'কুমিল্লা', 'কক্সবাজার', 'ফেনী', 'খাগড়াছড়ি', 'লক্ষ্মীপুর', 'নোয়াখালী', 'রাঙ্গামাটি'],
    'রাজশাহী': ['রাজশাহী', 'বগুড়া', 'জয়পুরহাট', 'নওগাঁ', 'নাটোর', 'চাঁপাইনবাবগঞ্জ', 'পাবনা', 'সিরাজগঞ্জ'],
    'খুলনা': ['খুলনা', 'বাগেরহাট', 'চুয়াডাঙ্গা', 'যশোর', 'ঝিনাইদহ', 'কুষ্টিয়া', 'মাগুরা', 'মেহেরপুর', 'নড়াইল', 'সাতক্ষীরা'],
    'সিলেট': ['সিলেট', 'হবিগঞ্জ', 'মৌলভীবাজার', 'সুনামগঞ্জ'],
    'বরিশাল': ['বরিশাল', 'বরগুনা', 'ভোলা', 'ঝালকাঠি', 'পটুয়াখালী', 'পিরোজপুর'],
    'রংপুর': ['রংপুর', 'দিনাজপুর', 'গাইবান্ধা', 'কুড়িগ্রাম', 'লালমনিরহাট', 'নীলফামারী', 'পঞ্চগড়', 'ঠাকুরগাঁও'],
    'ময়মনসিংহ': ['ময়মনসিংহ', 'জামালপুর', 'নেত্রকোনা', 'শেরপুর']
  };

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    setActiveSubDropdown(null);
  };

  const handleSubDropdownToggle = (subDropdown) => {
    setActiveSubDropdown(activeSubDropdown === subDropdown ? null : subDropdown);
  };

  const handleNavigation = (section, item = null) => {
    setActiveSection(section);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setIsMenuOpen(false);
    console.log(`Navigating to: ${section}`, item ? `- ${item}` : '');
  };

  return (
    <div>
      {/* Header Section */}
      <header className={`bg-gradient-to-r from-green-700 via-green-800 to-green-900 shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? ' py-1 md:py-2' : ' py-2 md:py-4'}`}>
        <div className="container mx-auto px-2 md:px-6 py-1 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Website Name */}
            <div
              className="flex items-center space-x-4 cursor-pointer group"
              onClick={() => handleNavigation('home')}
            >
              <div className="relative">
                <div className={`bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${isScrolled ? 'w-10 h-10' : 'w-14 h-14'}`}>
                  <img className=' w-12 md:w-16 rounded-4xl' src="https://i.ibb.co/RkZLhBnm/1.jpg" alt="" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className={`font-bold text-white group-hover:text-yellow-400 transition-all duration-300 ${isScrolled ? 'text-sm md:text-xl' : 'text-sm md:text-3xl'}`}>
                  জাতীয়তাবাদী বাস্তুহারা দল
                </h1>
                <p className={`text-green-200 transition-all duration-300 ${isScrolled ? 'text-xs md:text-sm' : 'text-xs md:text-base'}`}>গৃহহীনদের অধিকার প্রতিষ্ঠায় প্রতিশ্রুতিবদ্ধ</p>
              </div>
            </div>

            {/* Social Media Icons and CTA */}
            <div className="flex items-center space-x-4">
              {/* Social Media Icons */}
              <div className="hidden md:flex items-center space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 hover:scale-110 shadow-lg"
                  title="Facebook"
                >
                  <Facebook size={20} className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-300 hover:scale-110 shadow-lg"
                  title="WhatsApp Group"
                >
                  <MessageCircle size={20} className="text-white" />
                </a>
              </div>

              {/* CTA Button */}
              <button
                className={`bg-gradient-to-r from-yellow-400 text-sm to-yellow-500 text-green-800 font-semibold hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 rounded-full ${isScrolled ? ' px-1 md:px-4 py-1 md:py-2' : ' px-2 md:px-6 py-3'}`}
                onClick={() => handleNavigation('join')}
              >
                <span className="hidden md:inline">এখনই যোগ দিন</span>
                <span className="md:hidden whitespace-nowrap">যোগ দিন</span>
                <ArrowRight size={isScrolled ? 16 : 18} />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white pr-1 rounded-lg hover:bg-green-600 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className={`bg-gradient-to-r from-green-800 to-green-900 shadow-md fixed left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? ' top-16 lg:top-24 shadow-xl' : 'top-16 md:top-28'}`}>
        <div className="container mx-auto px-6">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8 py-4">
            {/* About Us */}
            <li>
              <button
                onClick={() => handleNavigation('about')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'about'
                  ? 'bg-yellow-400 text-green-800 shadow-lg'
                  : 'text-white hover:text-yellow-400 hover:bg-green-700'
                  }`}
              >
                <Info size={18} />
                <span>পরিচিতি</span>
              </button>
            </li>

            {/* News & Contact */}
            <li>
              <button
                onClick={() => handleNavigation('news')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'news'
                  ? 'bg-yellow-400 text-green-800 shadow-lg'
                  : 'text-white hover:text-yellow-400 hover:bg-green-700'
                  }`}
              >
                <Newspaper size={18} />
                <span>সংবাদ-যোগাযোগ</span>
              </button>
            </li>

            {/* Leadership with Dropdown */}
            <li className="relative">
              <button
                onClick={() => handleDropdownToggle('leadership')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'leadership'
                  ? 'bg-yellow-400 text-green-800 shadow-lg'
                  : 'text-white hover:text-yellow-400 hover:bg-green-700'
                  }`}
              >
                <Crown size={18} />
                <span>নেতৃত্ব</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'leadership' ? 'rotate-180' : ''}`} />
              </button>

              {/* Leadership Dropdown */}
              {activeDropdown === 'leadership' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-green-200 z-50">
                  <div className="py-2">
                    <button
                      onClick={() => handleNavigation('leadership', 'central')}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors duration-200"
                    >
                      কেন্দ্রীয়
                    </button>
                    <button
                      onClick={() => handleNavigation('leadership', 'dhaka-metro')}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors duration-200"
                    >
                      ঢাকা মহানগর
                    </button>

                    {/* All Divisions with Nested Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => handleSubDropdownToggle('divisions')}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors duration-200 flex items-center justify-between"
                      >
                        <span>সব বিভাগ</span>
                        <ChevronDown size={16} className={`transition-transform duration-300 ${activeSubDropdown === 'divisions' ? 'rotate-180' : ''}`} />
                      </button>

                      {activeSubDropdown === 'divisions' && (
                        <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-2xl border border-green-200 max-h-96 overflow-y-auto">
                          <div className="py-2">
                            {Object.entries(divisions).map(([division, districts]) => (
                              <div key={division} className="border-b border-gray-100 last:border-b-0">
                                <button
                                  onClick={() => handleNavigation('division', division)}
                                  className="w-full text-left px-4 py-3 text-green-800 font-semibold hover:bg-green-50 transition-colors duration-200"
                                >
                                  {division} বিভাগ
                                </button>
                                <div className="pl-4 bg-gray-50">
                                  {districts.map((district) => (
                                    <button
                                      key={district}
                                      onClick={() => handleNavigation('district', district)}
                                      className="w-full text-left px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-800 transition-colors duration-200 text-sm"
                                    >
                                      {district}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Current Events */}
            <li>
              <button
                onClick={() => handleNavigation('events')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'events'
                  ? 'bg-yellow-400 text-green-800 shadow-lg'
                  : 'text-white hover:text-yellow-400 hover:bg-green-700'
                  }`}
              >
                <Calendar size={18} />
                <span>কারেন্ট ইভেন্ট</span>
              </button>
            </li>
          </ul>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}>
            <div className="py-4 bg-green-900/95 backdrop-blur-md rounded-lg shadow-2xl mt-4 mb-4">
              <ul className="space-y-2">
                {/* Mobile Social Media */}
                <li className="px-4 py-2 border-b border-green-700">
                  <div className="flex items-center space-x-4">
                    <span className="text-white text-sm">সোশ্যাল মিডিয়া:</span>
                    <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <Facebook size={16} className="text-white" />
                    </a>
                    <a href="#" className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                      <MessageCircle size={16} className="text-white" />
                    </a>
                  </div>
                </li>

                {/* Mobile Menu Items */}
                <li>
                  <button
                    onClick={() => handleNavigation('about')}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left text-white hover:bg-green-700 hover:text-yellow-400 transition-colors"
                  >
                    <Info size={18} />
                    <span>পরিচিতি</span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => handleNavigation('news')}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left text-white hover:bg-green-700 hover:text-yellow-400 transition-colors"
                  >
                    <Newspaper size={18} />
                    <span>সংবাদ-যোগাযোগ</span>
                  </button>
                </li>

                {/* Mobile Leadership */}
                <li>
                  <button
                    onClick={() => handleDropdownToggle('leadership')}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-white hover:bg-green-700 hover:text-yellow-400 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Crown size={18} />
                      <span>নেতৃত্ব</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'leadership' ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === 'leadership' && (
                    <div className="pl-8 bg-green-800/50">
                      <button
                        onClick={() => handleNavigation('leadership', 'central')}
                        className="w-full text-left px-4 py-2 text-white hover:text-yellow-400 transition-colors"
                      >
                        কেন্দ্রীয়
                      </button>
                      <button
                        onClick={() => handleNavigation('leadership', 'dhaka-metro')}
                        className="w-full text-left px-4 py-2 text-white hover:text-yellow-400 transition-colors"
                      >
                        ঢাকা মহানগর
                      </button>
                      <button
                        onClick={() => handleSubDropdownToggle('divisions')}
                        className="w-full flex items-center justify-between px-4 py-2 text-left text-white hover:text-yellow-400 transition-colors"
                      >
                        <span>সব বিভাগ</span>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${activeSubDropdown === 'divisions' ? 'rotate-180' : ''}`} />
                      </button>

                      {activeSubDropdown === 'divisions' && (
                        <div className="pl-4 bg-green-800/30 max-h-64 overflow-y-auto">
                          {Object.entries(divisions).map(([division, districts]) => (
                            <div key={division} className="border-b border-green-700 last:border-b-0">
                              <button
                                onClick={() => handleNavigation('division', division)}
                                className="w-full text-left px-4 py-2 text-yellow-400 font-semibold hover:bg-green-700 transition-colors"
                              >
                                {division} বিভাগ
                              </button>
                              <div className="pl-4">
                                {districts.map((district) => (
                                  <button
                                    key={district}
                                    onClick={() => handleNavigation('district', district)}
                                    className="w-full text-left px-4 py-1 text-green-200 hover:text-yellow-400 transition-colors text-sm"
                                  >
                                    {district}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </li>

                <li>
                  <button
                    onClick={() => handleNavigation('events')}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left text-white hover:bg-green-700 hover:text-yellow-400 transition-colors"
                  >
                    <Calendar size={18} />
                    <span>কারেন্ট ইভেন্ট</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-14 md:h-32' : 'h-20 md:h-44'}`}></div>
    </div>
  );
}

export default Navbar;
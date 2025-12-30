import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Tag, Eye, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import axiosInstance from '../../Hooks/axiosIntance';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(9);

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/blogs/get-all-blogs');
        if (response.data.success) {
          setBlogs(response.data.blogs);
          setFilteredBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search term, type, and location
  useEffect(() => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedType) {
      filtered = filtered.filter(blog => blog.type === selectedType);
    }

    if (selectedLocation) {
      filtered = filtered.filter(blog => blog.location.includes(selectedLocation));
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedLocation, blogs]);

  // Get unique types and locations for filters
  const uniqueTypes = [...new Set(blogs.map(blog => blog.type))];
  const uniqueLocations = [...new Set(blogs.map(blog => blog.location.split(',')[0].trim()))];

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedLocation('');
  };

  const BlogCard = ({ blog }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
            blog.type === 'program' ? 'bg-teal-800' : 
            blog.type === 'news' ? 'bg-emerald-500' : 'bg-yellow-500 text-slate-900'
          }`}>
            {blog.type === 'program' ? 'কর্মসূচি' : 
             blog.type === 'news' ? 'সংবাদ' : blog.type}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-teal-800 transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.summary}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{blog.location.split(',')[0]}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 bg-teal-50 text-teal-800 rounded-md text-xs"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
        
        <button className="w-full bg-teal-800 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
          <Eye className="w-4 h-4" />
          বিস্তারিত পড়ুন
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-teal-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-800 mx-auto mb-4"></div>
            <p className="text-teal-800 font-semibold">ব্লগ লোড হচ্ছে...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-teal-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-800 to-emerald-500 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">সকল ব্লগ</h1>
              <p className="text-xl opacity-90">আমাদের সমস্ত কার্যক্রম ও সংবাদ একনজরে দেখুন</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="শিরোনাম, সারসংক্ষেপ বা ট্যাগ দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">সব ধরনের</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'program' ? 'কর্মসূচি' : 
                     type === 'news' ? 'সংবাদ' : type}
                  </option>
                ))}
              </select>

              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">সব এলাকা</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              {/* Clear Filters Button */}
              {(searchTerm || selectedType || selectedLocation) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  ক্লিয়ার
                </button>
              )}
            </div>
          </div>

          {/* Results Counter */}
          <div className="mb-6">
            <p className="text-gray-600">
              মোট <span className="font-semibold text-teal-800">{filteredBlogs.length}</span> টি ব্লগ পাওয়া গেছে
            </p>
          </div>

          {/* Blog Grid */}
          {currentBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {currentBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isCurrentPage = pageNumber === currentPage;
                    const showPage = pageNumber === 1 || 
                                   pageNumber === totalPages || 
                                   (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2);

                    if (!showPage) {
                      if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                        return <span key={pageNumber} className="px-2">...</span>;
                      }
                      return null;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`px-4 py-2 rounded-lg ${
                          isCurrentPage
                            ? 'bg-teal-800 text-white'
                            : 'bg-white shadow-md hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">কোনো ব্লগ পাওয়া যায়নি</h3>
              <p className="text-gray-600 mb-6">
                আপনার অনুসন্ধানের জন্য কোনো ফলাফল পাওয়া যায়নি। অন্য কিছু দিয়ে চেষ্টা করুন।
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-teal-800 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200"
              >
                সব ব্লগ দেখুন
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllBlogs;
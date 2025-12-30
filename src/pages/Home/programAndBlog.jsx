import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, User, ArrowRight, Users, BookOpen, Loader2 } from 'lucide-react'
import axiosInstance from '../../Hooks/axiosIntance'
import { Link } from 'react-router-dom';

const ProgramAndBlog = () => {
    const [programAndBlogData, setProgramAndBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLatestBlogs();
    }, []);

const fetchLatestBlogs = async () => {
    try {
        setLoading(true);
        const response = await axiosInstance.get('/api/blogs/recent/latest');
        console.log("API Response:", response.data);

        if (response.data.success && response.data.blogs?.length > 0) {
            setProgramAndBlogData(response.data.blogs);
            setError(null);
        } else {
            setError('কোনো ব্লগ পাওয়া যায়নি।');
        }
    } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Error loading blogs. Please try again later.');
    } finally {
        setLoading(false);
    }
};


    if (loading) {
        return (
            <section className="py-16 px-4 bg-green-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            কার্যক্রম ও ব্লগ
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-teal-800 to-emerald-500 mx-auto mb-4"></div>
                    </div>
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-teal-800" />
                        <span className="ml-3 text-teal-800 text-lg">লোড হচ্ছে...</span>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 px-4 bg-green-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            কার্যক্রম ও ব্লগ
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-teal-800 to-emerald-500 mx-auto mb-4"></div>
                    </div>
                    <div className="text-center py-20">
                        <p className="text-red-600 text-lg">{error}</p>
                        <button 
                            onClick={fetchLatestBlogs}
                            className="mt-4 bg-teal-800 hover:bg-emerald-500 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300"
                        >
                            পুনরায় চেষ্টা করুন
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 px-4 bg-green-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">
                        কার্যক্রম ও ব্লগ
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-teal-800 to-emerald-500 mx-auto mb-4"></div>
                    <p className="text-lg text-teal-700 max-w-2xl mx-auto">
                        আমাদের সাম্প্রতিক কার্যক্রম এবং চিন্তাপ্রসূত লেখনী যা জনগণের কল্যাণে নিবেদিত
                    </p>
                </div>

                {/* Cards Grid */}
                {programAndBlogData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {programAndBlogData.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = '/api/placeholder/400/250';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                    {/* Type Badge */}
                                    <div className="absolute top-4 left-4">
                                        <div className={`flex items-center px-3 py-1.5 rounded-full text-sm font-semibold text-white ${item.type === 'program'
                                            ? 'bg-teal-800'
                                            : 'bg-emerald-500'
                                            }`}>
                                            {item.type === 'program' ? (
                                                <>
                                                    <Users className="w-4 h-4 mr-1" />
                                                    কার্যক্রম
                                                </>
                                            ) : (
                                                <>
                                                    <BookOpen className="w-4 h-4 mr-1" />
                                                    ব্লগ
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="absolute bottom-4 left-4">
                                        <div className="flex flex-wrap gap-2">
                                            {item.tags && item.tags.slice(0, 2).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-yellow-300/90 text-slate-900 text-xs font-medium rounded-md"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-teal-800 transition-colors duration-200">
                                        {item.title}
                                    </h3>

                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {item.summary}
                                    </p>

                                    {/* Meta Information */}
                                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {item.date}
                                        </div>

                                        {item.type === 'program' ? (
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                <span className="truncate max-w-32">{item.location}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <User className="w-4 h-4 mr-1" />
                                                <span className="truncate max-w-32">{item.author || 'লেখক'}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Read More */}
                                    <Link to={`/blog-details/${item._id}`} className="flex items-center justify-between">
                                        <div className="text-emerald-500 text-sm font-semibold group-hover:text-teal-800 transition-colors duration-200">
                                            বিস্তারিত পড়ুন
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:text-teal-800 group-hover:translate-x-1 transition-all duration-200" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-600 text-lg">কোনো কার্যক্রম বা ব্লগ পোস্ট পাওয়া যায়নি।</p>
                    </div>
                )}

                {/* See All Button */}
                <div className="text-center">
                    <Link to={"/all-blogs"} className="bg-teal-800 hover:bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center gap-2">
                        সকল কার্যক্রম ও ব্লগ দেখুন
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProgramAndBlog;
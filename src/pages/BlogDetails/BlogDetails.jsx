import React, { useState, useEffect } from 'react'
import axiosInstance from '../../Hooks/axiosIntance'
import { useParams } from 'react-router-dom'
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/api/blogs/${id}`);
                if (response.data.success) {
                    setBlog(response.data.blog);
                } else {
                    setError('ব্লগ পাওয়া যায়নি');
                }
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError('ব্লগ লোড করতে সমস্যা হয়েছে');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlogDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen bg-teal-50 flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-800"></div>
                        <p className="text-teal-800 font-medium">লোড হচ্ছে...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen bg-teal-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">সমস্যা হয়েছে</h3>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                            >
                                পুনরায় চেষ্টা করুন
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!blog) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen bg-teal-50 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-teal-800 text-lg">ব্লগ পাওয়া যায়নি</p>
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
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-teal-800 to-emerald-500">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="text-white space-y-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-yellow-300 text-slate-900 px-3 py-1 rounded-full text-sm font-medium">
                                        {blog.type === 'program' ? 'কর্মসূচি' : blog.type}
                                    </span>
                                    <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                                        📍 {blog.location}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                    {blog.title}
                                </h1>
                                <div className="flex items-center space-x-4 text-lg">
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        {blog.date}
                                    </span>
                                </div>
                                <p className="text-xl text-gray-100 leading-relaxed">
                                    {blog.summary}
                                </p>
                            </div>
                            <div className="lg:pl-8">
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <img 
                                        src={blog.image} 
                                        alt={blog.title}
                                        className="w-full h-64 md:h-80 object-cover transform hover:scale-105 transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/600x400/0f766e/ffffff?text=ছবি+লোড+হয়নি';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8 md:p-12">
                            {/* Tags */}
                            {blog.tags && blog.tags.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-3">ট্যাগসমূহ</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {blog.tags.map((tag, index) => (
                                            <span 
                                                key={index}
                                                className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-teal-200 transition-colors"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Main Content */}
                            <div className="prose prose-lg max-w-none">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b-2 border-teal-200 pb-3">
                                    বিস্তারিত
                                </h2>
                                <div className="text-gray-700 leading-relaxed text-justify space-y-4">
                                    {blog.content.split('\n').map((paragraph, index) => (
                                        paragraph.trim() && (
                                            <p key={index} className="text-lg">
                                                {paragraph.trim()}
                                            </p>
                                        )
                                    ))}
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-teal-50 p-6 rounded-xl text-center">
                                        <div className="w-12 h-12 bg-teal-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-teal-800 mb-2">অবস্থান</h4>
                                        <p className="text-gray-600">{blog.location}</p>
                                    </div>
                                    <div className="bg-emerald-50 p-6 rounded-xl text-center">
                                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-emerald-600 mb-2">তারিখ</h4>
                                        <p className="text-gray-600">{blog.date}</p>
                                    </div>
                                    <div className="bg-yellow-50 p-6 rounded-xl text-center">
                                        <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-yellow-700 mb-2">ধরণ</h4>
                                        <p className="text-gray-600">
                                            {blog.type === 'program' ? 'কর্মসূচি' : blog.type}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex flex-wrap gap-4 justify-center">
                                <button 
                                    onClick={() => window.history.back()}
                                    className="bg-teal-800 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                    </svg>
                                    <span>ফিরে যান</span>
                                </button>
                                <button 
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: blog.title,
                                                text: blog.summary,
                                                url: window.location.href
                                            });
                                        } else {
                                            navigator.clipboard.writeText(window.location.href);
                                            alert('লিংক কপি করা হয়েছে!');
                                        }
                                    }}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                                    </svg>
                                    <span>শেয়ার করুন</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogDetails;
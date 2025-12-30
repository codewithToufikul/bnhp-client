import React, { useState, useEffect } from 'react'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer';
import { Link } from 'react-router-dom';
import axiosInstance from '../../Hooks/axiosIntance';

const AllNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch news from API
    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/news/get-all-news');
                
                if (response.data.success) {
                    setNews(response.data.news);
                } else {
                    setError('Failed to fetch news');
                }
            } catch (error) {
                console.error('Error fetching news:', error);
                setError(error.response?.data?.message || 'Failed to fetch news');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Format date to Bengali format (২০২৫-০৬-৩০)

    // Truncate text for summary
    const truncateText = (text, maxLength = 150) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    // Loading component
    const LoadingSpinner = () => (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-800"></div>
        </div>
    );

    // Error component
    const ErrorMessage = () => (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                <div className="flex items-center">
                    <span className="text-red-500 text-2xl mr-3">⚠️</span>
                    <div>
                        <h3 className="text-red-800 font-bold">সমস্যা হয়েছে</h3>
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                </div>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    পুনরায় চেষ্টা করুন
                </button>
            </div>
        </div>
    );

    // No news component
    const NoNews = () => (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
                <span className="text-6xl">📰</span>
                <h3 className="text-xl font-bold text-gray-600 mt-4">কোনো সংবাদ পাওয়া যায়নি</h3>
                <p className="text-gray-500 mt-2">শীঘ্রই নতুন সংবাদ যোগ করা হবে</p>
            </div>
        </div>
    );

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-teal-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            সকল সংবাদ
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-teal-800 to-emerald-500 mx-auto mb-4"></div>
                        <p className="text-lg text-teal-700 max-w-2xl mx-auto">
                            বাস্তুচ্যুত মানুষদের অধিকার আদায়ের সংগ্রাম ও আমাদের আন্দোলনের সর্বশেষ খবর
                        </p>
                    </div>

                    {/* Content */}
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <ErrorMessage />
                    ) : news.length === 0 ? (
                        <NoNews />
                    ) : (
                        /* News Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((item) => (
                                <Link
                                    key={item._id}
                                    to={`/news-details/${item._id}`}
                                    className="block"
                                >
                                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-teal-100 cursor-pointer">
                                        {/* Image Section */}
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={item.image || item.imageUrl || "https://via.placeholder.com/400x300?text=No+Image"}
                                                alt={item.title}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                                                }}
                                            />
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-teal-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    📰 সংবাদ
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6">
                                            {/* Date */}
                                            <div className="flex items-center gap-2 text-teal-600 text-sm mb-3">
                                                <span>📅</span>
                                                <span>{item.date}</span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-teal-800 transition-colors duration-300">
                                                {item.title}
                                            </h3>

                                            {/* Summary */}
                                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                {truncateText(item.summary || item.description || item.content)}
                                            </p>

                                            {/* Full Content Preview */}
                                            {item.fullContent || item.content ? (
                                                <div className="bg-teal-50 border-l-4 border-teal-800 p-3 rounded-r-lg mb-4">
                                                    <p className="text-slate-700 text-xs leading-relaxed">
                                                        {truncateText(item.fullContent || item.content, 100)}
                                                    </p>
                                                </div>
                                            ) : null}

                                            {/* Read More Button */}
                                            <div className="w-full bg-gradient-to-r text-center from-teal-800 to-emerald-500 hover:from-teal-700 hover:to-emerald-400 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform group-hover:scale-105">
                                                বিস্তারিত পড়ুন
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="bg-gray-50 px-6 py-3 border-t">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span>🏷️</span>
                                                    <span>{item.category || 'বাস্তুচ্যুত অধিকার'}</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AllNews
import React, { useState, useEffect } from 'react'
import axiosInstance from '../../Hooks/axiosIntance'
import { Link } from 'react-router-dom';

const NewsSection = () => {
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
                    // Sort by date (newest first) and take only latest 3
                    const sortedNews = response.data.news
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .slice(0, 3);
                    setNews(sortedNews);
                } else {
                    setError('Failed to fetch news');
                }
            } catch (err) {
                setError('Network error occurred');
                console.error('Error fetching news:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-teal-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-800 mx-auto"></div>
                        <p className="mt-4 text-teal-700">সংবাদ লোড হচ্ছে...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-teal-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <p>সংবাদ লোড করতে সমস্যা হয়েছে: {error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // No news available
    if (!news || news.length === 0) {
        return (
            <div className="min-h-screen bg-teal-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <p className="text-teal-700 text-lg">কোন সংবাদ পাওয়া যায়নি</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-teal-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        সাম্প্রতিক সংবাদ
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-teal-800 to-emerald-500 mx-auto mb-4"></div>
                    <p className="text-lg text-teal-700 max-w-2xl mx-auto">
                        বাস্তুচ্যুত মানুষদের অধিকার আদায়ের সংগ্রাম ও আমাদের আন্দোলনের সর্বশেষ খবর
                    </p>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-teal-100"
                        >
                            {/* Image Section */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x200/14b8a6/ffffff?text=No+Image';
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
                                    {item.summary}
                                </p>

                                {/* Full Content Preview */}
                                <div className="bg-teal-50 border-l-4 border-teal-800 p-3 rounded-r-lg mb-4">
                                    <p className="text-slate-700 text-xs leading-relaxed">
                                        {item.fullContent.length > 100 
                                            ? item.fullContent.substring(0, 100) + '...' 
                                            : item.fullContent}
                                    </p>
                                </div>

                                {/* Read More Button */}
                                <Link
                                to={`/news-details/${item._id}`} 
                                    className="w-full bg-gradient-to-r from-teal-800 to-emerald-500 hover:from-teal-700 hover:to-emerald-400 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"

                                >
                                    বিস্তারিত পড়ুন
                                </Link>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 px-6 py-3 border-t">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>🏷️</span>
                                        <span>বাস্তুচ্যুত অধিকার</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Section */}
                <Link to={"/all-news"} className=" flex justify-center cursor-pointer mt-12">
                    <button 
                        className="bg-teal-800 hover:bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center gap-2"
                    >
                        আরও সংবাদ দেখুন
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default NewsSection
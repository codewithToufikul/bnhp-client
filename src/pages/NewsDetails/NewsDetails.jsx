import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../component/Navbar';
import { Calendar, ArrowLeft, Share2, Eye } from 'lucide-react';
import Footer from '../../component/Footer';
import axiosInstance from '../../Hooks/axiosIntance';

const NewsDetails = () => {
    const { id } = useParams();
    const [newsDetails, setNewsDetails] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch single news details
    useEffect(() => {
        const fetchNewsDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/news/${id}`);
                if (response.data.success) {
                    setNewsDetails(response.data.news);
                } else {
                    setError('সংবাদ খুঁজে পাওয়া যায়নি');
                }
            } catch (error) {
                console.error('Error fetching news details:', error);
                setError('সংবাদ লোড করতে সমস্যা হয়েছে');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchNewsDetails();
        }
    }, [id]);

    // Fetch related news (all news except current one)
    useEffect(() => {
        const fetchRelatedNews = async () => {
            try {
                const response = await axiosInstance.get('/news/get-all-news');
                if (response.data.success) {
                    // Filter out current news and get first 2
                    const filtered = response.data.news
                        .filter(item => item._id !== id)
                        .slice(0, 2);
                    setRelatedNews(filtered);
                }
            } catch (error) {
                console.error('Error fetching related news:', error);
            }
        };

        fetchRelatedNews();
    }, [id]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: newsDetails.title,
                text: newsDetails.summary,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('লিংক কপি করা হয়েছে!');
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-teal-50">
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-800 mx-auto mb-4"></div>
                        <p className="text-slate-600">সংবাদ লোড হচ্ছে...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state or news not found
    if (error || !newsDetails) {
        return (
            <div className="min-h-screen bg-teal-50">
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">
                            {error || 'সংবাদ খুঁজে পাওয়া যায়নি'}
                        </h2>
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 mx-auto bg-teal-800 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            ফিরে যান
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-teal-50">
            <Navbar />
            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="p-6 pb-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{newsDetails.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye size={16} />
                                    <span>১২৫ বার পড়া হয়েছে</span>
                                </div>
                            </div>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                            >
                                <Share2 size={16} />
                                <span className="hidden sm:inline">শেয়ার</span>
                            </button>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-4">
                            {newsDetails.title}
                        </h1>

                        <div className="bg-yellow-300 bg-opacity-20 border-l-4 border-yellow-300 p-4 rounded-r-lg">
                            <p className="text-slate-700 font-medium text-lg leading-relaxed">
                                {newsDetails.summary}
                            </p>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="px-6">
                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                src={newsDetails.image}
                                alt={newsDetails.title}
                                className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/800x400/0f766e/ffffff?text=সংবাদের+ছবি';
                                }}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="prose prose-lg max-w-none">
                            {newsDetails.fullContent.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="text-slate-700 leading-relaxed mb-6 text-justify">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Tags */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">বাস্তুচ্যুত</span>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">অধিকার</span>
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">সমাজ</span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related News */}
                {relatedNews.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">সংশ্লিষ্ট অন্যান্য সংবাদ</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {relatedNews.map((item) => (
                                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x200/0f766e/ffffff?text=সংবাদের+ছবি';
                                        }}
                                    />
                                    <div className="p-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                                            <Calendar size={14} />
                                            <span>{item.date}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 hover:text-teal-800 cursor-pointer">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm line-clamp-2">
                                            {item.summary}
                                        </p>
                                        <Link to={`/news-details/${item._id}`} className="mt-3 text-teal-800 hover:text-emerald-500 font-medium text-sm transition-colors">
                                            আরও পড়ুন →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default NewsDetails
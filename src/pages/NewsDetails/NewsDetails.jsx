import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../component/Navbar';
import { Calendar, ArrowLeft, Share2, Eye } from 'lucide-react';
import Footer from '../../component/Footer';

const NewsDetails = () => {
    const { id } = useParams();
    const news = [
        {
            id: 1,
            title: "বাস্তুহারা দিবস উপলক্ষে মানববন্ধন",
            date: "২০২৫-০৭-১৮",
            image: "https://i.ibb.co/kRWBCvz/image-355624-1.jpg",
            summary: "জাতীয় প্রেসক্লাবের সামনে বাস্তুচ্যুতদের অধিকার আদায়ে মানববন্ধন অনুষ্ঠিত হয়েছে।",
            fullContent: `আজ সকাল ১০টায় প্রেসক্লাবের সামনে হাজারো বাস্তুচ্যুত নাগরিক মানববন্ধনে অংশ নেন। বক্তারা সরকারের প্রতি তাদের বাস্তুভিটা ফেরত দেওয়ার আহ্বান জানান।

বাস্তুহারা দিবস পালনের অংশ হিসেবে এই মানববন্ধনের আয়োজন করা হয়। উপস্থিত বক্তারা বলেন, দীর্ঘদিন ধরে তারা তাদের ন্যায্য অধিকার থেকে বঞ্চিত। সরকারি প্রতিশ্রুতি অনুযায়ী তাদের পুনর্বাসনের ব্যবস্থা করা হলেও বাস্তবে তা বাস্তবায়িত হয়নি।

মানববন্ধনে অংশগ্রহণকারীরা জানান, তারা শুধু তাদের বাস্তুভিটা ফেরত চান না, সাথে সাথে চান মর্যাদাপূর্ণ জীবনযাত্রার নিশ্চয়তা। তারা সরকারের কাছে দ্রুত এবং কার্যকর পদক্ষেপের দাবি জানান।`
        },
        {
            id: 2,
            title: "অধিকার মেলা ২০২৫ সফলভাবে সম্পন্ন",
            date: "২০২৫-০৬-৩০",
            image: "https://i.ibb.co/V0V7W2Kp/images.jpg",
            summary: "রাজশাহীতে অনুষ্ঠিত অধিকার মেলায় প্রায় ৫ হাজার মানুষ অংশগ্রহণ করেছেন।",
            fullContent: `দুই দিনব্যাপী এই মেলায় বাস্তুচ্যুতদের জন্য আইন সহায়তা, স্বাস্থ্য সেবা এবং অর্থনৈতিক পরামর্শ দেওয়া হয়।

রাজশাহী বিভাগীয় স্টেডিয়ামে আয়োজিত এই মেলায় বিভিন্ন সেবামূলক সংস্থা, আইনজীবী, চিকিৎসক এবং সমাজসেবীরা অংশগ্রহণ করেন। মেলায় বিনামূল্যে আইনি পরামর্শ, স্বাস্থ্য পরীক্ষা এবং কারিগরি প্রশিক্ষণের ব্যবস্থা ছিল।

বাস্তুচ্যুত পরিবারগুলো এই মেলা থেকে ব্যাপক উপকৃত হয়েছে। অনেকেই তাদের আইনি সমস্যার সমাধানের পথ খুঁজে পেয়েছেন। পাশাপাশি, বিভিন্ন দক্ষতা উন্নয়ন কর্মশালায় অংশ নিয়ে তারা স্বনির্ভর হওয়ার পথ খুঁজে পেয়েছেন।

আয়োজকরা জানিয়েছেন, এই ধরনের মেলা নিয়মিত আয়োজনের পরিকল্পনা রয়েছে যাতে বাস্তুচ্যুত জনগোষ্ঠী ক্রমাগত সহায়তা পেতে পারে।`
        },
        {
            id: 3,
            title: "রাজনৈতিক সহিংসতায় বাস্তুচ্যুত আরও ৩০ পরিবার",
            date: "২০২৫-০৬-১০",
            image: "https://i.ibb.co/cccMBgN7/Teknaf-36c4b4004b64586a3ab685ffff46cad6-1.jpg",
            summary: "রাজনৈতিক দাঙ্গার কারণে ৩০টি পরিবার বসতভিটা হারিয়েছে, জরুরি সহায়তার দাবি উঠেছে।",
            fullContent: `গতকাল সন্ধ্যায় সংঘটিত সহিংসতায় বাস্তুচ্যুত হয়েছে অন্তত ৩০টি পরিবার। সংগঠনের পক্ষ থেকে সহায়তা পৌঁছে দেওয়া হয়েছে।

স্থানীয় সূত্রে জানা যায়, রাজনৈতিক দ্বন্দ্বের জেরে শুরু হওয়া সহিংসতায় কমপক্ষে ৩০টি বাড়িঘর পুড়িয়ে দেওয়া হয়েছে। ক্ষতিগ্রস্ত পরিবারগুলোর মধ্যে শিশু ও বৃদ্ধদের সংখ্যাই বেশি।

আক্রান্ত এলাকার বাসিন্দারা জানান, তাদের সম্পূর্ণ সহায় সম্পত্তি পুড়ে ছাই হয়ে গেছে। এখন তারা আকাশের নিচে রাত কাটাতে বাধ্য হচ্ছেন। তারা সরকার ও বেসরকারি সংস্থাগুলোর কাছে জরুরি সহায়তার আবেদন জানিয়েছেন।

স্থানীয় প্রশাসন ক্ষতিগ্রস্ত পরিবারগুলোর তালিকা প্রস্তুত করেছে এবং জরুরি ত্রাণ বিতরণের ব্যবস্থা করেছে। তবে দীর্ঘমেয়াদী পুনর্বাসনের জন্য আরও কার্যকর পদক্ষেপ প্রয়োজন বলে মনে করছেন স্থানীয়রা।`
        }
    ];

    const newsdetails = news.find(news => news.id == id);

    if (!newsdetails) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen bg-teal-50 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">সংবাদ খুঁজে পাওয়া যায়নি</h2>
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

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: newsdetails.title,
                text: newsdetails.summary,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('লিংক কপি করা হয়েছে!');
        }
    };

    const relatedNews = news.filter(item => item.id !== parseInt(id)).slice(0, 2);

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
                                    <span>{newsdetails.date}</span>
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
                            {newsdetails.title}
                        </h1>

                        <div className="bg-yellow-300 bg-opacity-20 border-l-4 border-yellow-300 p-4 rounded-r-lg">
                            <p className="text-slate-700 font-medium text-lg leading-relaxed">
                                {newsdetails.summary}
                            </p>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="px-6">
                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                src={newsdetails.image}
                                alt={newsdetails.title}
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
                            {newsdetails.fullContent.split('\n\n').map((paragraph, index) => (
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
                                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                                        <Link to={`/news-details/${item.id}`} className="mt-3 text-teal-800 hover:text-emerald-500 font-medium text-sm transition-colors">
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
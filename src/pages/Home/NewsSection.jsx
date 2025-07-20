import React from 'react'

const NewsSection = () => {
    // src/data/news.js
    const news = [
        {
            id: 1,
            title: "বাস্তুহারা দিবস উপলক্ষে মানববন্ধন",
            date: "২০২৫-০৭-১৮",
            image: "https://i.ibb.co/kRWBCvz/image-355624-1.jpg",
            summary: "জাতীয় প্রেসক্লাবের সামনে বাস্তুচ্যুতদের অধিকার আদায়ে মানববন্ধন অনুষ্ঠিত হয়েছে।",
            fullContent: `আজ সকাল ১০টায় প্রেসক্লাবের সামনে হাজারো বাস্তুচ্যুত নাগরিক মানববন্ধনে অংশ নেন। বক্তারা সরকারের প্রতি তাদের বাস্তুভিটা ফেরত দেওয়ার আহ্বান জানান।`
        },
        {
            id: 2,
            title: "অধিকার মেলা ২০২৫ সফলভাবে সম্পন্ন",
            date: "২০২৫-০৬-৩০",
            image: "https://i.ibb.co/V0V7W2Kp/images.jpg",
            summary: "রাজশাহীতে অনুষ্ঠিত অধিকার মেলায় প্রায় ৫ হাজার মানুষ অংশগ্রহণ করেছেন।",
            fullContent: `দুই দিনব্যাপী এই মেলায় বাস্তুচ্যুতদের জন্য আইন সহায়তা, স্বাস্থ্য সেবা এবং অর্থনৈতিক পরামর্শ দেওয়া হয়।`
        },
        {
            id: 3,
            title: "রাজনৈতিক সহিংসতায় বাস্তুচ্যুত আরও ৩০ পরিবার",
            date: "২০২৫-০৬-১০",
            image: "https://i.ibb.co/cccMBgN7/Teknaf-36c4b4004b64586a3ab685ffff46cad6-1.jpg",
            summary: "রাজনৈতিক দাঙ্গার কারণে ৩০টি পরিবার বসতভিটা হারিয়েছে, জরুরি সহায়তার দাবি উঠেছে।",
            fullContent: `গতকাল সন্ধ্যায় সংঘটিত সহিংসতায় বাস্তুচ্যুত হয়েছে অন্তত ৩০টি পরিবার। সংগঠনের পক্ষ থেকে সহায়তা পৌঁছে দেওয়া হয়েছে।`
        }
    ];
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
                            key={item.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-teal-100"
                        >
                            {/* Image Section */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
                                        {item.fullContent}
                                    </p>
                                </div>

                                {/* Read More Button */}
                                <button className="w-full bg-gradient-to-r from-teal-800 to-emerald-500 hover:from-teal-700 hover:to-emerald-400 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                                    বিস্তারিত পড়ুন
                                </button>
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
                <div className="text-center mt-12">
                    <button className="bg-teal-800 hover:bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center gap-2">
                        আরও সংবাদ দেখুন
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsSection
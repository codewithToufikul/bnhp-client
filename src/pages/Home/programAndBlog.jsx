import React from 'react'
import { Calendar, MapPin, User, ArrowRight, Users, BookOpen } from 'lucide-react'

const ProgramAndBlog = () => {
    const programAndBlogData = [
        {
            id: 1,
            type: "program",
            title: "সচেতনতা মিছিল – বরিশাল",
            date: "১০ জুন ২০২৫",
            location: "বরিশাল শহর, লালবাগ মাঠ",
            summary: "বাস্তুহারা অধিকার বাস্তবায়নে এক বিশাল সচেতনতামূলক মিছিল অনুষ্ঠিত হয় বরিশালে।",
            image: "https://i.ibb.co/RkVXLVgt/IMG-20250616-WA0003.jpg",
            tags: ["মিছিল", "বাস্তুচ্যুত", "বরিশাল"],
            content: "দলের বরিশাল ইউনিটের উদ্যোগে আয়োজিত এই মিছিলের উদ্দেশ্য ছিল বাস্তুচ্যুত নাগরিকদের অধিকার আদায়ে সরকারকে চাপ প্রয়োগ করা। হাজারো কর্মী এতে অংশ নেন এবং দলীয় নেতৃত্ব সরাসরি বক্তব্য প্রদান করেন।"
        },
        {
            id: 2,
            type: "blog",
            title: "বিভাগীয় প্রতিনিধি সভা – চট্টগ্রাম",
            date: "৫ এপ্রিল ২০২৫",
            location: "চট্টগ্রাম শিল্পকলা একাডেমি",
            summary: "দলের ভবিষ্যৎ আন্দোলনের রূপরেখা নির্ধারণে অনুষ্ঠিত হয় এই প্রতিনিধি সভা।",
            image: "https://i.ibb.co/scBpFqc/1669044744-3-Small.jpg",
            tags: ["সভা", "চট্টগ্রাম", "প্রতিনিধি"],
            content: "এই প্রতিনিধি সভায় সভাপতিত্ব করেন কেন্দ্রীয় নেতা জনাব রফিকুল ইসলাম। সভায় বিভিন্ন জেলা নেতারা তাদের মতামত প্রকাশ করেন। ভবিষ্যৎ আন্দোলনের পরিকল্পনা এবং সংগঠনের পরিকাঠামো উন্নয়ন নিয়ে আলোচনা হয়।"
        },
        {
            id: 3,
            type: "program",
            title: "বাস্তুচ্যুতদের অধিকার বিষয়ক সেমিনার",
            date: "২২ মার্চ ২০২৫",
            location: "রাজশাহী বিশ্ববিদ্যালয় অডিটোরিয়াম",
            summary: "একাডেমিক গবেষণা ও বাস্তব অভিজ্ঞতার আলোকে অনুষ্ঠিত হয় বিশেষ সেমিনার।",
            image: "https://i.ibb.co/Hpg772N3/470053146-1412889113013789-2558920982862448611-n.jpg",
            tags: ["সেমিনার", "রাজশাহী", "মানবাধিকার"],
            content: "উপস্থিত ছিলেন মানবাধিকার কর্মী, শিক্ষক ও গবেষকবৃন্দ। বাস্তুচ্যুত জনগণের সমস্যাগুলো উপস্থাপন করে সমাধান খোঁজা হয় এই আলোচনায়। উপস্থিত শিক্ষার্থীদের মধ্যে সচেতনতা বাড়াতে প্রচারপত্রও বিতরণ করা হয়।"
        },
        {
            id: 4,
            type: "blog",
            title: "বাস্তুচ্যুতদের রাজনীতি – নতুন দৃষ্টিভঙ্গি",
            date: "১০ ফেব্রুয়ারি ২০২৫",
            author: "ড. মাহফুজা হোসেন",
            summary: "বাংলাদেশের রাজনৈতিক বাস্তবতায় বাস্তুচ্যুতদের নিয়ে দলগুলোর ভূমিকা ও করণীয়।",
            image: "https://i.ibb.co/jDhTYnv/politics.jpg",
            tags: ["রাজনীতি", "বিশ্লেষণ", "বাস্তুচ্যুত"],
            content: "এই নিবন্ধে আলোচনা করা হয়েছে কিভাবে বাস্তুচ্যুতদের বিষয়টি রাজনৈতিকভাবে ব্যবহৃত হচ্ছে এবং কিভাবে একটি কার্যকর দলীয় অবস্থান তাদের জীবনমান উন্নয়নে ভূমিকা রাখতে পারে।"
        },
        {
            id: 5,
            type: "blog",
            title: "আদর্শিক সংগ্রাম ও নতুন প্রজন্ম",
            date: "২ জানুয়ারি ২০২৫",
            author: "মোহাম্মদ তানভীর ইসলাম",
            summary: "নতুন প্রজন্মের চোখে বাস্তবতা ও দলের আদর্শিক লড়াইয়ের তাৎপর্য।",
            image: "https://i.ibb.co/PgD0vRP/youth.jpg",
            tags: ["নতুন প্রজন্ম", "আদর্শ", "ভবিষ্যৎ"],
            content: "এই ব্লগে বিশ্লেষণ করা হয়েছে কিভাবে দলীয় আদর্শ নতুন প্রজন্মের মধ্যে ছড়িয়ে দেওয়া যায় এবং কিভাবে তাদের নেতৃত্বে আনা সম্ভব। সামাজিক যোগাযোগ মাধ্যমের ভূমিকাও বিশ্লেষণ করা হয়েছে।"
        }
    ];

    const displayData = programAndBlogData.slice(0, 3);

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {displayData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden h-64">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
                                        {item.tags.slice(0, 2).map((tag, index) => (
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
                                            <span className="truncate max-w-32">{item.author}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Read More */}
                                <div className="flex items-center justify-between">
                                    <div className="text-emerald-500 text-sm font-semibold group-hover:text-teal-800 transition-colors duration-200">
                                        বিস্তারিত পড়ুন
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:text-teal-800 group-hover:translate-x-1 transition-all duration-200" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See All Button */}
                <div className="text-center">
                    <button className="bg-teal-800 hover:bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center gap-2">
                        সকল কার্যক্রম ও ব্লগ দেখুন
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProgramAndBlog;
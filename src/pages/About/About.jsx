import React from 'react';
import { Home, Target, Users, Heart, Calendar, Globe, Award, ArrowRight } from 'lucide-react';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';

const About = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-teal-50 min-h-screen">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-teal-800 to-emerald-500 text-white py-20 px-4">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="mb-6">
                            <img
                                src="https://i.ibb.co/RkZLhBnm/1.jpg"
                                alt="BNVH Logo"
                                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                            />
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                বাংলাদেশ জাতীয়তাবাদী বাস্তুহারা দল
                            </h1>
                            <div className="w-24 h-1 bg-yellow-300 mx-auto mb-6"></div>
                            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
                                বাস্তুচ্যুত, গৃহহীন এবং ভূমিহীন জনগোষ্ঠীর অধিকার রক্ষায় অগ্রণী ভূমিকা পালনকারী একটি জাতীয়তাবাদী রাজনৈতিক ও মানবাধিকারভিত্তিক সংগঠন
                            </p>
                        </div>
                    </div>
                </div>

                {/* Introduction Section */}
                <div className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-teal-800 mb-6 flex items-center gap-3">
                                    <Home className="w-8 h-8 text-emerald-500" />
                                    পরিচিতি
                                </h2>
                                <div className="space-y-4 text-slate-900 text-lg leading-relaxed">
                                    <p>
                                        বাংলাদেশ জাতীয়তাবাদী বাস্তুহারা দল একটি জাতীয়তাবাদী রাজনৈতিক ও মানবাধিকারভিত্তিক সংগঠন, যা বাস্তুচ্যুত, গৃহহীন এবং ভূমিহীন জনগোষ্ঠীর অধিকার রক্ষায় অগ্রণী ভূমিকা পালন করে যাচ্ছে।
                                    </p>
                                    <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-teal-800">
                                        <p className="font-semibold text-teal-800 mb-2">প্রতিষ্ঠাকাল: ১৯৯৫ সাল</p>
                                        <p>
                                            প্রতিষ্ঠাতা জনাব ফজলুল হক মিয়া ছিলেন একজন মুক্তিযোদ্ধা, যিনি নিজে বাস্তুচ্যুত মানুষের দুর্দশা দেখে এই সংগঠনের ভিত্তি স্থাপন করেন।
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Award className="w-8 h-8 text-slate-900" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-teal-800 mb-4">আমাদের মূল আদর্শ</h3>
                                    <blockquote className="text-xl font-semibold text-slate-900 italic">
                                        "ভূমি নেই, অধিকার নেই – এই অসম সমাজব্যবস্থা বদলে দিতে হবে"
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Goals Section */}
                <div className="py-16 px-4 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-teal-800 text-center mb-12 flex items-center justify-center gap-3">
                            <Target className="w-8 h-8 text-emerald-500" />
                            আদর্শ ও লক্ষ্য
                        </h2>
                        <div className="bg-teal-50 rounded-xl p-8 text-center">
                            <p className="text-lg text-slate-900 leading-relaxed max-w-4xl mx-auto">
                                আমরা বিশ্বাস করি, রাষ্ট্রের প্রতিটি নাগরিকের নিরাপদ আবাসন, সামাজিক মর্যাদা ও রাজনৈতিক অংশগ্রহণের অধিকার রয়েছে।
                            </p>
                        </div>
                    </div>
                </div>

                {/* Work Areas */}
                <div className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-teal-800 text-center mb-12 flex items-center justify-center gap-3">
                            <Users className="w-8 h-8 text-emerald-500" />
                            আমরা যেসব বিষয়ে কাজ করি
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: "বাস্তুচ্যুত জনগণের অধিকার রক্ষা", icon: "🏠" },
                                { title: "পুনর্বাসন নীতি বাস্তবায়নে চাপ প্রয়োগ", icon: "🏛️" },
                                { title: "ভূমি অধিকার আন্দোলন ও সচেতনতামূলক ক্যাম্পেইন", icon: "📢" },
                                { title: "আইনি সহায়তা, হেল্পলাইন ও মানবাধিকার প্রশিক্ষণ", icon: "⚖️" },
                                { title: "স্থানীয় ও জাতীয় পর্যায়ে সংগঠন গঠন", icon: "🤝" },
                                { title: "নেতৃত্ব বিকাশ", icon: "👑" }
                            ].map((item, index) => (
                                <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="text-3xl mb-4">{item.icon}</div>
                                    <p className="text-slate-900 font-medium">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Commitment */}
                <div className="py-16 px-4 bg-white">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-teal-800 mb-8 flex items-center justify-center gap-3">
                            <Heart className="w-8 h-8 text-emerald-500" />
                            আমাদের অঙ্গীকার
                        </h2>
                        <div className="bg-gradient-to-r from-teal-800 to-emerald-500 rounded-xl p-8 text-white">
                            <p className="text-lg leading-relaxed mb-4">
                                বাংলাদেশ জাতীয়তাবাদী বাস্তুহারা দল দেশের প্রতিটি বিভাগের জেলা ও উপজেলা পর্যায়ে সংগঠন বিস্তারের মাধ্যমে একটি গণতান্ত্রিক, মানবিক ও বাস্তবতানির্ভর রাজনৈতিক সংস্কৃতি গড়ে তুলতে চায়।
                            </p>
                            <p className="text-xl font-semibold text-yellow-300">
                                আমরা চাই—বাস্তুহারা কোনো মানুষ যেন নিজেকে আর "অপর" না ভাবে।
                            </p>
                        </div>
                    </div>
                </div>

                {/* Future Plans */}
                <div className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-teal-800 text-center mb-12 flex items-center justify-center gap-3">
                            <Calendar className="w-8 h-8 text-emerald-500" />
                            ভবিষ্যৎ পরিকল্পনা
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                "প্রতিটি বিভাগে 'বাস্তুহারা অধিকার মেলা' আয়োজন",
                                "অনলাইন সদস্য নিবন্ধন ও তথ্যভাণ্ডার তৈরি",
                                "বাস্তুচ্যুত শিশুদের জন্য শিক্ষা সহায়তা প্রকল্প",
                                "আন্তর্জাতিক মানবাধিকার সংস্থার সঙ্গে যৌথ কার্যক্রম",
                                "একটি ডিজিটাল প্ল্যাটফর্ম তৈরি, যেখানে অনলাইন আবেদন, রিপোর্ট ও তথ্য যাচাই করা যাবে"
                            ].map((plan, index) => (
                                <div key={index} className="bg-white rounded-lg p-6 shadow-lg flex items-start gap-4">
                                    <div className="w-8 h-8 bg-teal-800 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <p className="text-slate-900">{plan}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Message */}
                <div className="py-16 px-4 bg-gradient-to-r from-teal-800 to-emerald-500">
                    <div className="max-w-4xl mx-auto text-center">
                        <Globe className="w-16 h-16 text-yellow-300 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-8">আমাদের বার্তা</h2>
                        <blockquote className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-8">
                            "আবাসন কোনো দয়া নয়, এটা একটি মৌলিক অধিকার। বাস্তুচ্যুত নয়, গর্বিত নাগরিক হিসেবে বাঁচতে চাই।"
                        </blockquote>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/join"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-300 text-slate-900 font-bold rounded-lg hover:bg-white transition-colors"
                            >
                                আমাদের সাথে যোগ দিন
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-slate-900 transition-colors"
                            >
                                যোগাযোগ করুন
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
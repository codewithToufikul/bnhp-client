import React from 'react';
import { Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-12 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Website Info with Logo */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src="https://i.ibb.co/RkZLhBnm/1.jpg"
                            alt="BNVH Logo"
                            className="w-12 h-12 rounded-lg object-cover"
                        />
                        <h3 className="text-xl font-bold text-white">বিএনভিএইচ</h3>
                    </div>
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">বাংলাদেশ জাতীয়তাবাদী বাস্তুহারা দল</h4>
                    <p className="text-white text-sm leading-relaxed">
                        বাস্তুচ্যুতদের অধিকার প্রতিষ্ঠায় প্রতিশ্রুতিবদ্ধ একটি জাতীয়তাবাদী শক্তি।
                    </p>
                </div>

                {/* Important Links */}
                <div>
                    <h4 className="text-lg font-semibold text-emerald-500 mb-4">গুরুত্বপূর্ণ লিংক</h4>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <a href="/" className="text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2">
                                <span className="w-1 h-1 bg-teal-800 rounded-full"></span>
                                হোম
                            </a>
                        </li>
                        <li>
                            <a href="/news" className="text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2">
                                <span className="w-1 h-1 bg-teal-800 rounded-full"></span>
                                সংবাদ
                            </a>
                        </li>
                        <li>
                            <a href="/events" className="text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2">
                                <span className="w-1 h-1 bg-teal-800 rounded-full"></span>
                                কারেন্ট ইভেন্ট
                            </a>
                        </li>
                        <li>
                            <a href="/join" className="text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2">
                                <span className="w-1 h-1 bg-teal-800 rounded-full"></span>
                                যোগদান করুন
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2">
                                <span className="w-1 h-1 bg-teal-800 rounded-full"></span>
                                যোগাযোগ
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-semibold text-emerald-500 mb-4">যোগাযোগ</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-3 text-white hover:text-yellow-300 transition-colors">
                            <div className="w-8 h-8 bg-teal-800 rounded-lg flex items-center justify-center">
                                <Phone size={16} className="text-white" />
                            </div>
                            <a href="tel:+8801711000000">+৮৮০ ১৭১১-০০০০০০</a>
                        </li>
                        <li className="flex items-center gap-3 text-white hover:text-yellow-300 transition-colors">
                            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                                <Mail size={16} className="text-white" />
                            </div>
                            <a href="mailto:info@bnvh.org">info@bnvh.org</a>
                        </li>
                        <li className="flex items-start gap-3 text-white">
                            <div className="w-8 h-8 bg-yellow-300 rounded-lg flex items-center justify-center mt-0.5">
                                <MapPin size={16} className="text-slate-900" />
                            </div>
                            <span>১২৩ নয়াপল্টন রোড<br />ঢাকা ১০০০, বাংলাদেশ</span>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h4 className="text-lg font-semibold text-emerald-500 mb-4">সোশ্যাল মিডিয়া</h4>
                    <div className="flex gap-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-teal-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 group"
                        >
                            <Facebook size={20} className="text-white group-hover:scale-110 transition-transform" />
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors duration-300 group"
                        >
                            <Youtube size={20} className="text-white group-hover:scale-110 transition-transform" />
                        </a>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="mt-6">
                        <p className="text-sm text-white mb-3">নিউজলেটার সাবস্ক্রাইব করুন</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="ইমেইল ঠিকানা"
                                className="flex-1 px-3 py-2 text-sm bg-white text-slate-900 rounded-l-lg focus:outline-none"
                            />
                            <button className="px-4 py-2 bg-teal-800 text-white rounded-r-lg hover:bg-emerald-500 transition-colors">
                                সাবস্ক্রাইব
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 border-t border-teal-800 pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p className="text-white">
                        © {new Date().getFullYear()} বাংলাদেশ জাতীয়তাবাদী বাস্তুহারা দল — সর্বস্বত্ব সংরক্ষিত
                    </p>
                    <div className="flex gap-6 text-white">
                        <a href="/privacy" className="hover:text-yellow-300 transition-colors">গোপনীয়তা নীতি</a>
                        <a href="/terms" className="hover:text-yellow-300 transition-colors">শর্তাবলী</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
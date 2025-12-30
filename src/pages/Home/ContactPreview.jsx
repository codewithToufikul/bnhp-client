import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactPreview = () => {
    return (
        <section className="bg-teal-50 py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-teal-800 mb-1">যোগাযোগ করুন</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-teal-800 to-emerald-500 mx-auto mb-4"></div>
                    <p className="text-teal-700 text-lg">
                        আমাদের সঙ্গে যোগাযোগ করতে নিচের যেকোনো মাধ্যমে যোগাযোগ করুন।
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Address */}
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-teal-800 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <MapPin className="text-white w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-lg text-slate-900 mb-3">ঠিকানা</h4>
                        <p className="text-slate-900">
                            ১২৩ নয়াপল্টন রোড<br />
                            ঢাকা ১০০০, বাংলাদেশ
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Phone className="text-white w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-lg text-slate-900 mb-3">ফোন</h4>
                        <p className="text-slate-900">+৮৮০ ১৭১১-০০০০০০</p>
                    </div>

                    {/* Email */}
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-yellow-300 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Mail className="text-slate-900 w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-lg text-slate-900 mb-3">ইমেইল</h4>
                        <p className="text-slate-900">info@bnvh.org</p>
                    </div>
                </div>

                
            </div>
        </section>
    );
};

export default ContactPreview;
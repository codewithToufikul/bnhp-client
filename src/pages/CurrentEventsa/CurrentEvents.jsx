import React from 'react'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer';

const CurrentEvents = () => {
    const events = [
        {
            id: 1,
            title: "কেন্দ্রীয় কমিটির জরুরি সভা",
            date: "২০ জুলাই ২০২৫",
            location: "নয়াপল্টন, ঢাকা",
            description: "দলের সাংগঠনিক ভবিষ্যৎ পরিকল্পনা ও নতুন সদস্য নিয়োগ নিয়ে আলোচনা।",
            testimonial: "“এই সভা আমাদের সংগঠনের জন্য নতুন দিগন্ত উন্মোচন করেছে।” – মহাসচিব",
            donation: "৳১,২০,০০০ অনুদান সংগ্রহ করা হয়েছে সদস্যদের কাছ থেকে।",
            politicalUpdate: "নতুন রাজনৈতিক কর্মসূচির ঘোষণা দেওয়া হয়েছে, যার মাধ্যমে সারাদেশে সচেতনতামূলক সভা আয়োজন করা হবে।"
        },
        {
            id: 2,
            title: "চট্টগ্রাম বিভাগীয় সম্মেলন",
            date: "১৫ জুন ২০২৫",
            location: "জিএসসি মিলনায়তন, চট্টগ্রাম",
            description: "বিভাগীয় পর্যায়ে দলের শক্তি বৃদ্ধি ও নেতাকর্মীদের সমন্বয় সভা।",
            testimonial: "“এত বড় সম্মেলন আগে কখনো হয়নি। গর্বিত।” – বিভাগীয় সভাপতি",
            donation: "৳৭০,০০০ এর বেশি অনুদান এসেছে স্থানীয়দের কাছ থেকে।",
            politicalUpdate: "সরকারের ভূমি নীতির বিরুদ্ধ্যে প্রতিবাদ জানিয়ে ঘোষণা দেওয়া হয়েছে বিভাগীয় অবস্থান কর্মসূচি।"
        },
        {
            id: 3,
            title: "বাস্তুহারা অধিকার মেলা",
            date: "৫ মে ২০২৫",
            location: "লালবাগ মাঠ, বরিশাল",
            description: "বাস্তুহারা পরিবারগুলোর জন্য অধিকার সংক্রান্ত তথ্য, আইন সহায়তা ও অনুদান সংগ্রহ কর্মসূচি।",
            testimonial: "“আমরা আজ সত্যিই আশার আলো দেখছি।” – একজন বাস্তুচ্যুত নাগরিক",
            donation: "৳৯৫,০০০ সংগৃহীত হয়েছে মেলার দিনেই।",
            politicalUpdate: "মানবাধিকার কমিশনের সহযোগিতায় সরকারের কাছে স্মারকলিপি প্রদান করা হয়েছে।"
        },
        {
            id: 4,
            title: "উন্নয়ন ও বাস্তবতা সেমিনার",
            date: "২৮ এপ্রিল ২০২৫",
            location: "রাজশাহী বিশ্ববিদ্যালয় অডিটোরিয়াম",
            description: "বাস্তুহারা জনগণের জীবনমান উন্নয়ন বিষয়ক গবেষণাপত্র উপস্থাপন এবং বাস্তবচিত্র বিশ্লেষণ।",
            testimonial: "“প্রত্যেকের কণ্ঠে ছিল সত্যের প্রতিধ্বনি।” – অধ্যাপক শওকত",
            donation: "৳৩৫,০০০ একাডেমিক অনুদান ও পাবলিক অনুদান হিসাবে এসেছে।",
            politicalUpdate: "নতুন কর্মসূচির অংশ হিসেবে শিক্ষাপ্রতিষ্ঠানে সচেতনতামূলক ক্যাম্পেইন চালু করা হয়েছে।"
        }
    ];
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-teal-50 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-slate-900 text-center pb-2 ">
                        সাম্প্রতিক ইভেন্টসমূহ
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-teal-800 to-emerald-500 mx-auto mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-teal-100"
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-teal-800 to-emerald-500 p-6">
                                    <h2 className="text-xl font-bold text-white mb-2">
                                        {event.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-teal-50">
                                        <div className="flex items-center gap-2">
                                            <span>📅</span>
                                            <span className="text-sm">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>📍</span>
                                            <span className="text-sm">{event.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    {/* Description */}
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg">📝</span>
                                        <p className="text-slate-700 leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>

                                    {/* Testimonial */}
                                    <div className="bg-yellow-50 border-l-4 border-yellow-300 p-4 rounded-r-lg">
                                        <div className="flex items-start gap-3">
                                            <span className="text-lg">💬</span>
                                            <div>
                                                <p className="text-slate-700 italic text-sm leading-relaxed">
                                                    {event.testimonial}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Donation */}
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg">💰</span>
                                        <div>
                                            <p className="text-emerald-600 font-semibold">
                                                {event.donation}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Political Update */}
                                    <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <span className="text-lg">📰</span>
                                            <div>
                                                <h4 className="font-semibold text-teal-800 mb-1">রাজনৈতিক আপডেট</h4>
                                                <p className="text-slate-700 text-sm leading-relaxed">
                                                    {event.politicalUpdate}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-gray-50 px-6 py-3 border-t">
                                    <div className="flex justify-end items-center">
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CurrentEvents
import { Heart, Star, Users } from 'lucide-react';
import React from 'react'

const Features = () => {
    const features = [
        {
            icon: React.createElement(Users, { className: "w-8 h-8" }),
            title: "সামাজিক ন্যায়বিচার",
            description: "সমাজের সকল স্তরের মানুষের জন্য সমান সুযোগ নিশ্চিত করা।"
        },
        {
            icon: React.createElement(Heart, { className: "w-8 h-8" }),
            title: "মানবতার সেবা",
            description: "দুর্দশাগ্রস্ত মানুষের পাশে থেকে সাহায্যের হাত বাড়ানো।"
        },
        {
            icon: React.createElement(Star, { className: "w-8 h-8" }),
            title: "জাতীয়তাবাদী চেতনা",
            description: "বাংলাদেশের স্বাধীনতা ও সার্বভৌমত্ব রক্ষায় অঙ্গীকারবদ্ধ।"
        }
    ];
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                        আমাদের মূল্যবোধ
                    </h3>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        জাতীয়তাবাদী গৃহহীন পার্টির মূল লক্ষ্য এবং আদর্শ
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-green-100 hover:border-green-300"
                        >
                            <div className="text-green-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold text-green-800 mb-3">
                                {feature.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
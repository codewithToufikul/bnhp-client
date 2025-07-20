import React, { useEffect, useState } from 'react'
import { Menu, X, ChevronDown, Users, Heart, Star, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [memberCount, setMemberCount] = useState(0);

    // Animated counter effect
    useEffect(() => {
        const timer = setInterval(() => {
            setMemberCount(prev => prev < 15420 ? prev + 150 : 15420);
        }, 50);

        if (memberCount >= 15420) {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [memberCount]);


    // Hero carousel data
    const heroSlides = [
        {
            title: "গৃহহীনদের কণ্ঠস্বর",
            subtitle: "জাতীয়তাবাদের নতুন পথযাত্রী",
            description: "মানবতার রাজনীতিতে বিশ্বাসী, সমাজের পিছিয়ে পড়া মানুষের অধিকার আদায়ে অঙ্গীকারবদ্ধ একটি দল।",
            image: "https://i.ibb.co/CpKchMTf/ad-2-20240611090126.jpg"
        },
        {
            title: "সবার জন্য আবাসন",
            subtitle: "স্বপ্নের বাংলাদেশ গড়ি",
            description: "প্রতিটি পরিবারের জন্য নিরাপদ আবাসনের নিশ্চয়তা এবং সমান সুযোগের অধিকার।",
            image: "https://i.ibb.co/8LMwWgNF/asroyon-gor.jpg"
        }
    ];

    // Auto-slide carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);


    return (
        <section className="relative md:h-[calc(100vh-160px)] flex items-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E53935] via-[#FBC02D] to-[#388E3C]

">
                <div className="absolute inset-0 bg-black/20"></div>
                <div
                    className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20viewBox%3D%270%200%2060%2060%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.05%27%3E%3Ccircle%20cx%3D%2730%27%20cy%3D%2730%27%20r%3D%272%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"
                ></div>
            </div>


            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-bounce"
                        style={{
                            left: `${20 + (i * 15)}%`,
                            top: `${10 + (i * 20)}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${2 + (i * 0.3)}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="container mx-auto px-6 py-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Enhanced Text Section */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="mb-6">
                            <div className="inline-flex items-center bg-yellow-400/20 text-white/90 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
                                {React.createElement(Users, { className: "w-4 h-4 mr-2" })}
                                {memberCount.toLocaleString()} সদস্য আমাদের সাথে
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                                <span className="block transform hover:scale-105 transition-transform duration-300">
                                    {heroSlides[currentSlide].title}
                                </span>
                                <span className="block text-yellow-400 text-3xl md:text-4xl mt-2">
                                    {heroSlides[currentSlide].subtitle}
                                </span>
                            </h2>
                            <p className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed max-w-2xl">
                                {heroSlides[currentSlide].description}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-800 px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl">
                                <span className="flex items-center justify-center">
                                    দলে যোগ দিন
                                    {React.createElement(ArrowRight, { className: "ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" })}
                                </span>
                            </button>
                            <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 hover:text-green-800 transition-all duration-300 backdrop-blur-sm">
                                আরও জানুন
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">১৫০+</div>
                                <div className="text-sm text-green-200">স্থানীয় শাখা</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">৫০০+</div>
                                <div className="text-sm text-green-200">কর্মী</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">২৫+</div>
                                <div className="text-sm text-green-200">বছরের অভিজ্ঞতা</div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Image Section */}
                    <div className="flex-1 relative">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                            <img
                                src={heroSlides[currentSlide].image}
                                alt="Party Banner"
                                className="relative w-full rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 border-4 border-yellow-400/30"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>

                            {/* Floating Action Button */}
                            <button className="absolute bottom-6 right-6 bg-yellow-400 hover:bg-yellow-300 text-green-800 p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300">
                                {React.createElement(Phone, { className: "w-6 h-6" })}
                            </button>
                        </div>

                        {/* Carousel Indicators */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {heroSlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-yellow-400 w-8' : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                {React.createElement(ChevronDown, { className: "w-8 h-8" })}
            </div>
        </section>
    )
}

export default HeroSection
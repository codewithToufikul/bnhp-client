import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SliderSection = () => {
    const swiperRef = useRef(null);
    const swiperInstance = useRef(null);

    // Sample images - replace with your own
    const images = [
        {
            src: "https://i.ibb.co/bMCKSzHy/bnp20140629005036.jpg",
            title: "দলের কেন্দ্রীয় সম্মেলন",
            description: "২০২৫ সালের সংগঠনের রূপরেখা ও নেতৃত্ব নিয়ে আলোচনা"
        },
        {
            src: "https://i.ibb.co/5WVdqtqX/IMG20241029143459-20241029145829.jpg",
            title: "বাস্তুচ্যুতদের জন্য মানববন্ধন",
            description: "সরকারি নীতির বিরুদ্ধে প্রতিবাদ ও সচেতনতা কর্মসূচি"
        },
        {
            src: "https://i.ibb.co/TB28JfRz/13-2411271420.jpg",
            title: "নেতৃত্বের বার্তা",
            description: "দলের মহাসচিবের ঐক্যের আহ্বান ও দিকনির্দেশনা"
        },
        {
            src: "https://i.ibb.co/JRzm322J/dsc-0386-20250525200627.jpg",
            title: "বরিশালে সচেতনতামূলক মেলা",
            description: "বাস্তুহারা পরিবারদের সহায়তায় আয়োজিত বিশেষ আয়োজন"
        },
        {
            src: "https://i.ibb.co/1YZVG0qG/edit1-1.jpg",
            title: "স্বপ্নের স্লোগান",
            description: "গণতন্ত্র পুনঃপ্রতিষ্ঠায় আমরা একতাবদ্ধ"
        }
    ];

    useEffect(() => {
        // Load Swiper CSS
        const swiperCSS = document.createElement('link');
        swiperCSS.rel = 'stylesheet';
        swiperCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.7/swiper-bundle.min.css';
        document.head.appendChild(swiperCSS);

        // Load Swiper JS
        const swiperScript = document.createElement('script');
        swiperScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.7/swiper-bundle.min.js';
        swiperScript.onload = () => {
            // Initialize Swiper after script loads
            if (window.Swiper && swiperRef.current) {
                swiperInstance.current = new window.Swiper(swiperRef.current, {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    },
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true,
                    },
                    speed: 800,
                });
            }
        };
        document.head.appendChild(swiperScript);

        // Cleanup
        return () => {
            if (swiperInstance.current) {
                swiperInstance.current.destroy();
            }
            if (document.head.contains(swiperCSS)) {
                document.head.removeChild(swiperCSS);
            }
            if (document.head.contains(swiperScript)) {
                document.head.removeChild(swiperScript);
            }
        };
    }, []);

    const goNext = () => {
        if (swiperInstance.current) {
            swiperInstance.current.slideNext();
        }
    };

    const goPrev = () => {
        if (swiperInstance.current) {
            swiperInstance.current.slidePrev();
        }
    };

    return (
        <div className='bg-teal-50 py-16'>
            <div className='max-w-[700px] mx-auto text-center space-y-2 px-4'>
                <h1 className='text-2xl md:text-4xl font-bold text-slate-900'>নিরাপদ বসতভিটা, মানবাধিকারের গ্যারান্টি</h1>
                <div className="w-42 h-1 bg-gradient-to-r from-teal-800 to-emerald-500 mx-auto mb-4"></div>
                <p className='text-base md:text-lg font-normal text-teal-700'>দেশের বাস্তুচ্যুত মানুষদের জন্য আমাদের আন্দোলন – একতা, ন্যায় ও সাহসের পথে।</p>
            </div>
            <div className="relative w-full max-w-7xl mx-auto my-8 px-4">
                {/* Swiper Container with proper containment */}
                <div ref={swiperRef} className="swiper relative h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-teal-100">
                    <div className="swiper-wrapper">
                        {images.map((image, index) => (
                            <div key={index} className="swiper-slide relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-800/40 to-transparent z-10"></div>
                                <div className="w-full h-full overflow-hidden">
                                    <img
                                        src={image.src}
                                        alt={image.title}
                                        className="w-full h-full object-cover object-center"
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                </div>
                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 lg:p-12 text-white">
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 transform translate-y-4 opacity-0 animate-slide-up">
                                        {image.title}
                                    </h3>
                                    <p className="text-sm md:text-base lg:text-lg opacity-90 transform translate-y-4 opacity-0 animate-slide-up-delay">
                                        {image.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Custom Navigation Buttons */}
                    <button
                        onClick={goPrev}
                        className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-teal-800/30 backdrop-blur-sm hover:bg-teal-800/50 transition-all duration-300 rounded-full p-3 group border border-teal-600/30"
                    >
                        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={goNext}
                        className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-teal-800/30 backdrop-blur-sm hover:bg-teal-800/50 transition-all duration-300 rounded-full p-3 group border border-teal-600/30"
                    >
                        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Pagination */}
                    <div className="swiper-pagination !bottom-6 !left-1/2 !transform !-translate-x-1/2"></div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-800/20 z-20">
                    <div className="h-full bg-gradient-to-r from-teal-800 to-emerald-500 animate-progress"></div>
                </div>

                <style jsx>{`
        @keyframes slide-up {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slide-up-delay {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.3s forwards;
        }

        .animate-slide-up-delay {
          animation: slide-up-delay 0.8s ease-out 0.6s forwards;
        }

        .animate-progress {
          animation: progress 4s linear infinite;
        }

        /* Custom Swiper Pagination Styles */
        .swiper-pagination-bullet {
          background: rgba(15, 118, 110, 0.4) !important;
          opacity: 1 !important;
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
          border: 2px solid rgba(253, 224, 71, 0.6) !important;
        }

        .swiper-pagination-bullet-active {
          background: linear-gradient(45deg, #0f766e, #10b981) !important;
          transform: scale(1.3) !important;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.6) !important;
          border-color: #fde047 !important;
        }

        .swiper-pagination-bullet:hover {
          background: rgba(16, 185, 129, 0.6) !important;
          border-color: #fde047 !important;
        }

        /* Hide default Swiper buttons */
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }
      `}</style>
            </div>
        </div>
    );
};

export default SliderSection;
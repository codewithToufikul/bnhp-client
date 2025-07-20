import React from 'react';

const JoinBanner = () => {
    return (
        <section className="bg-gradient-to-r from-teal-600 to-emerald-500 py-12 px-4 text-white text-center rounded-xl shadow-lg my-12">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    আপনার কণ্ঠস্বর দিন – আজই আমাদের সঙ্গে যুক্ত হন!
                </h2>

                <p className="text-lg md:text-xl font-medium mb-8">
                    জাতীয়তাবাদী আন্দোলনের শক্তি বাড়াতে এখনই ফেসবুক বা হোয়াটসঅ্যাপে যুক্ত হোন।
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a
                        href="https://facebook.com/yourgroup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-teal-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                        📘 ফেসবুক গ্রুপে যোগ দিন
                    </a>

                    <a
                        href="https://chat.whatsapp.com/yourlink"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                        📲 হোয়াটসঅ্যাপে যুক্ত হোন
                    </a>
                </div>
            </div>
        </section>
    );
};

export default JoinBanner;

import React, { useState, useEffect } from 'react'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer';
import axiosInstance from '../../Hooks/axiosIntance';

const CurrentEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events from API using axiosInstance
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/events/get-all-events');
                
                if (response.data.success) {
                    setEvents(response.data.events);
                } else {
                    throw new Error(response.data.message || 'Failed to fetch events');
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Network error occurred');
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Loading component
    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen bg-teal-50 py-12 px-4 flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-800 mb-4"></div>
                        <p className="text-teal-800 text-lg">ইভেন্ট লোড হচ্ছে...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Error component
    if (error) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen bg-teal-50 py-12 px-4 flex items-center justify-center">
                    <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">ত্রুটি ঘটেছে</h2>
                        <p className="text-slate-600 mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            পুনরায় চেষ্টা করুন
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // No events component
    if (events.length === 0) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen bg-teal-50 py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-4xl font-bold text-slate-900 text-center pb-2">
                            সাম্প্রতিক ইভেন্টসমূহ
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-teal-800 to-emerald-500 mx-auto mb-8"></div>
                        <div className="text-center bg-white p-12 rounded-xl shadow-lg">
                            <div className="text-slate-400 text-6xl mb-4">📅</div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">কোন ইভেন্ট পাওয়া যায়নি</h2>
                            <p className="text-slate-600">বর্তমানে কোন ইভেন্ট নেই। পরে আবার দেখুন।</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-teal-50 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-slate-900 text-center pb-2">
                        সাম্প্রতিক ইভেন্টসমূহ
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-teal-800 to-emerald-500 mx-auto mb-8"></div>
                    
                    {/* Events count */}
                    <div className="text-center mb-6">
                        <p className="text-slate-600">মোট {events.length}টি ইভেন্ট পাওয়া গেছে</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {events.map((event) => (
                            <div
                                key={event._id || event.id}
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
                                    {event.testimonial && (
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
                                    )}

                                    {/* Donation */}
                                    {event.donation && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-lg">💰</span>
                                            <div>
                                                <p className="text-emerald-600 font-semibold">
                                                    {event.donation}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Political Update */}
                                    {event.politicalUpdate && (
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
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="bg-gray-50 px-6 py-3 border-t">
                                    <div className="flex justify-between items-center">
                                        <div className="text-xs text-slate-500">
                                            ID: {event._id}
                                        </div>
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

                    {/* Refresh button */}
                    <div className="text-center mt-8">
                        <button 
                            onClick={async () => {
                                setLoading(true);
                                try {
                                    const response = await axiosInstance.get('/events/get-all-events');
                                    if (response.data.success) {
                                        setEvents(response.data.events);
                                        setError(null);
                                    }
                                } catch (err) {
                                    setError(err.response?.data?.message || err.message || 'Network error occurred');
                                } finally {
                                    setLoading(false);
                                }
                            }}
                            disabled={loading}
                            className={`bg-gradient-to-r from-teal-800 to-emerald-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span>{loading ? '🔄' : '🔄'}</span>
                            {loading ? 'লোড হচ্ছে...' : 'রিফ্রেশ করুন'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CurrentEvents
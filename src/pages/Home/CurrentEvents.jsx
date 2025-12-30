import React, { useState, useEffect } from 'react'
import axiosInstance from '../../Hooks/axiosIntance'

const CurrentEvents = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch events from API using axiosInstance
    const fetchEvents = async () => {
        try {
            setLoading(true)
            setError(null)
            
            const response = await axiosInstance.get('/events/get-all-events')
            
            if (response.data.success) {
                setEvents(response.data.events)
            } else {
                throw new Error(response.data.message || 'Failed to fetch events')
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to fetch events')
            console.error('Error fetching events:', err)
        } finally {
            setLoading(false)
        }
    }

    // Format date to Bangla format

    // Retry function for error handling
    const handleRetry = () => {
        fetchEvents()
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-teal-50 py-12 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                    <p className="text-teal-600 font-medium">ইভেন্ট লোড হচ্ছে...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-teal-50 py-12 px-4 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">কিছু সমস্যা হয়েছে</h2>
                    <p className="text-slate-600 mb-4">{error}</p>
                    <button
                        onClick={handleRetry}
                        className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        পুনরায় চেষ্টা করুন
                    </button>
                </div>
            </div>
        )
    }

    // Empty state
    if (events.length === 0) {
        return (
            <div className="min-h-screen bg-teal-50 py-12 px-4 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
                    <div className="text-gray-400 text-5xl mb-4">📅</div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">কোন ইভেন্ট নেই</h2>
                    <p className="text-slate-600">এই মুহূর্তে কোন ইভেন্ট পাওয়া যায়নি।</p>
                    <button
                        onClick={handleRetry}
                        className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        পুনরায় লোড করুন
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-teal-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 text-center pb-2 ">
                    সাম্প্রতিক ইভেন্টসমূহ
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-teal-800 to-emerald-500 mx-auto mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.map((event) => (
                        <div
                            key={event._id || event.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-teal-100"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-teal-800 to-emerald-500 p-6">
                                <h2 className="text-xl font-bold text-white mb-2">
                                    {event.title || 'শিরোনাম উল্লেখ নেই'}
                                </h2>
                                <div className="flex items-center gap-4 text-teal-50">
                                    <div className="flex items-center gap-2">
                                        <span>📅</span>
                                        <span className="text-sm">
                                            {event.date }
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>📍</span>
                                        <span className="text-sm">{event.location || 'স্থান উল্লেখ নেই'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                {/* Description */}
                                <div className="flex items-start gap-3">
                                    <span className="text-lg">📝</span>
                                    <p className="text-slate-700 leading-relaxed">
                                        {event.description || 'বিবরণ উল্লেখ নেই'}
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

                                {/* Additional fields that might come from backend */}
                                {event.organizer && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg">👥</span>
                                        <div>
                                            <p className="text-slate-700">
                                                <span className="font-semibold">আয়োজক:</span> {event.organizer}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {event.participants && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg">🎯</span>
                                        <div>
                                            <p className="text-slate-700">
                                                <span className="font-semibold">অংশগ্রহণকারী:</span> {event.participants}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Event Status */}
                                {event.status && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg">
                                            {event.status === 'completed' ? '✅' : 
                                             event.status === 'ongoing' ? '🔄' : 
                                             event.status === 'upcoming' ? '⏳' : '📋'}
                                        </span>
                                        <div>
                                            <p className="text-slate-700">
                                                <span className="font-semibold">অবস্থা:</span> 
                                                <span className={`ml-1 px-2 py-1 rounded text-sm ${
                                                    event.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                                    event.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {event.status === 'completed' ? 'সম্পন্ন' :
                                                     event.status === 'ongoing' ? 'চলমান' :
                                                     event.status === 'upcoming' ? 'আসন্ন' :
                                                     event.status}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Event Type/Category */}
                                {event.category && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg">🏷️</span>
                                        <div>
                                            <p className="text-slate-700">
                                                <span className="font-semibold">ধরন:</span> 
                                                <span className="ml-1 px-2 py-1 bg-teal-100 text-teal-800 rounded text-sm">
                                                    {event.category}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Contact Information */}
                                {event.contactInfo && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg">📞</span>
                                        <div>
                                            <p className="text-slate-700">
                                                <span className="font-semibold">যোগাযোগ:</span> {event.contactInfo}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 px-6 py-3 border-t">
                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-gray-500">
                                        {event.createdAt && (
                                            <span>যোগ করা হয়েছে: {event.date }</span>
                                        )}
                                        {event.updatedAt && event.updatedAt !== event.createdAt && (
                                            <span className="ml-2">| আপডেট: {event.updatedAt}</span>
                                        )}
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
                        onClick={handleRetry}
                        className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                        ইভেন্ট রিফ্রেশ করুন
                    </button>
                </div>

                {/* Events count */}
                {events.length > 0 && (
                    <div className="text-center mt-4">
                        <p className="text-slate-600">
                            মোট ইভেন্ট: <span className="font-semibold text-teal-600">{events.length}</span>টি
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CurrentEvents
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, MapPin, Users, DollarSign, MessageSquare, AlertCircle, X, MessageSquareQuote } from 'lucide-react';
import axiosInstance from '../../../Hooks/axiosIntance';

const DashboardEvents = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    testimonial: '',
    donation: '',
    politicalUpdate: ''
  });

  // Fetch all events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/events/get-all-events');
      if (response.data.success) {
        setEvents(response.data.events);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open modal for adding new event
  const openAddModal = () => {
    setModalType('add');
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      testimonial: '',
      donation: '',
      politicalUpdate: ''
    });
    setIsModalOpen(true);
  };

  // Open modal for editing event
  const openEditModal = (event) => {
    setModalType('edit');
    setSelectedEvent(event);
    setFormData({
      title: event.title || '',
      date: event.date || '',
      location: event.location || '',
      description: event.description || '',
      testimonial: event.testimonial || '',
      donation: event.donation || '',
      politicalUpdate: event.politicalUpdate || ''
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      testimonial: '',
      donation: '',
      politicalUpdate: ''
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (modalType === 'add') {
        const response = await axiosInstance.post('/events/add-event', {
          eventData: formData
        });
        if (response.data.success) {
          await fetchEvents();
          closeModal();
          alert('Event added successfully!');
        }
      } else {
        const response = await axiosInstance.put(`/events/update-event/${selectedEvent._id}`, {
          updateData: formData
        });
        if (response.data.success) {
          await fetchEvents();
          closeModal();
          alert('Event updated successfully!');
        }
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete event
  const handleDelete = async (eventId) => {
    if (window.confirm('আপনি কি এই ইভেন্টটি মুছে ফেলতে চান?')) {
      try {
        setLoading(true);
        const response = await axiosInstance.delete(`/events/delete-event/${eventId}`);
        if (response.data.success) {
          await fetchEvents();
          alert('Event deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#ecfdf5' }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#0f172a' }}>
            ইভেন্ট ম্যানেজমেন্ট
          </h1>
          <p className="text-gray-600 mt-2">সকল রাজনৈতিক ইভেন্ট পরিচালনা করুন</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
          style={{ backgroundColor: '#0f766e' }}
        >
          <Plus size={20} />
          নতুন ইভেন্ট যোগ করুন
        </button>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#0f766e' }}></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4"
              style={{ borderLeftColor: '#10b981' }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#0f172a' }}>
                  {event.title}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(event)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    style={{ color: '#10b981' }}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="p-2 rounded-full hover:bg-red-50 transition-colors text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} style={{ color: '#0f766e' }} />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} style={{ color: '#0f766e' }} />
                  <span>{event.location}</span>
                </div>

                <p className="text-gray-700 text-sm line-clamp-2">
                  {event.description}
                </p>

                {event.testimonial && (
                  <div className="flex items-start gap-2 p-3 rounded-lg" style={{ backgroundColor: '#f0fdfa' }}>
                    <MessageSquareQuote size={16} style={{ color: '#0f766e' }} />
                    <p className="text-sm italic text-gray-600">{event.testimonial}</p>
                  </div>
                )}

                {event.donation && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} style={{ color: '#10b981' }} />
                    <span style={{ color: '#10b981' }} className="font-semibold">{event.donation}</span>
                  </div>
                )}

                {event.politicalUpdate && (
                  <div className="flex items-start gap-2 p-3 rounded-lg" style={{ backgroundColor: '#fef7cd' }}>
                    <AlertCircle size={16} style={{ color: '#d97706' }} />
                    <p className="text-sm text-gray-700">{event.politicalUpdate}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <>
          <style jsx>{`
            .modal-backdrop {
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
            }
          `}</style>
          
          <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
              <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center rounded-t-2xl">
                <h2 className="text-2xl font-bold" style={{ color: '#0f172a' }}>
                  {modalType === 'add' ? 'নতুন ইভেন্ট যোগ করুন' : 'ইভেন্ট সম্পাদনা করুন'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} style={{ color: '#6b7280' }} />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>
                      ইভেন্টের নাম *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors"
                      style={{ focusRingColor: '#0f766e' }}
                      placeholder="ইভেন্টের নাম লিখুন"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>
                      তারিখ *
                    </label>
                    <input
                      type="text"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors"
                      placeholder="যেমন: ১৫ জুন ২০২৫"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>
                      স্থান *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors"
                      placeholder="ইভেন্টের স্থান"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>
                      বিবরণ *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors resize-vertical"
                      placeholder="ইভেন্টের বিস্তারিত বিবরণ"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>
                      প্রশংসাপত্র
                    </label>
                    <textarea
                      name="testimonial"
                      value={formData.testimonial}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors resize-vertical"
                      placeholder="অংশগ্রহণকারীদের মন্তব্য বা প্রশংসাপত্র"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>
                      অনুদান
                    </label>
                    <input
                      type="text"
                      name="donation"
                      value={formData.donation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors"
                      placeholder="যেমন: ৳৭০,০০০ এর বেশি অনুদান"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>
                      রাজনৈতিক আপডেট
                    </label>
                    <textarea
                      name="politicalUpdate"
                      value={formData.politicalUpdate}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors resize-vertical"
                      placeholder="রাজনৈতিক ঘোষণা বা আপডেট"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8 pt-6 border-t">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    style={{ color: '#6b7280' }}
                  >
                    বাতিল
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#0f766e' }}
                  >
                    {loading ? 'সংরক্ষণ করা হচ্ছে...' : modalType === 'add' ? 'ইভেন্ট যোগ করুন' : 'পরিবর্তন সংরক্ষণ করুন'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {events.length === 0 && !loading && (
        <div className="text-center py-16">
          <Users size={64} className="mx-auto mb-4 opacity-50" style={{ color: '#6b7280' }} />
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#0f172a' }}>
            কোন ইভেন্ট পাওয়া যায়নি
          </h3>
          <p className="text-gray-600 mb-6">
            প্রথম ইভেন্ট যোগ করতে উপরের বোতামে ক্লিক করুন
          </p>
          <button
            onClick={openAddModal}
            className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#10b981' }}
          >
            <Plus size={20} className="inline mr-2" />
            নতুন ইভেন্ট যোগ করুন
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardEvents;
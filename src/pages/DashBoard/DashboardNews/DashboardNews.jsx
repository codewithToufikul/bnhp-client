import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, X, Check, AlertTriangle, Upload, Image as ImageIcon } from 'lucide-react';
import axiosInstance from '../../../Hooks/axiosIntance';

const DashboardNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    image: '',
    summary: '',
    fullContent: ''
  });

  // ImgBB API Key - Replace with your actual API key
  const IMGBB_API_KEY = import.meta.env.IMGBB_HOSTING_KEY;

  // Fetch all news
  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/news/get-all-news');
      if (response.data.success) {
        setNews(response.data.news);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload to ImgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be less than 10MB');
      return;
    }

    setImageUploading(true);

    try {
      const formDataImg = new FormData();
      formDataImg.append('image', file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formDataImg
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          image: data.data.url
        }));
        alert('Image uploaded successfully!');
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      image: '',
      summary: '',
      fullContent: ''
    });
  };

  // Add news
  const handleAddNews = async () => {
    try {
      const response = await axiosInstance.post('/news/add-news', {
        newsData: formData
      });
      if (response.data.success) {
        fetchNews();
        setShowAddForm(false);
        resetForm();
        alert('News added successfully!');
      }
    } catch (error) {
      console.error('Error adding news:', error);
      alert('Error adding news. Please try again.');
    }
  };

  // Edit news
  const handleEditNews = async () => {
    try {
      const response = await axiosInstance.put(`/news/update-news/${selectedNews._id}`, {
        updateData: formData
      });
      if (response.data.success) {
        fetchNews();
        setShowEditForm(false);
        resetForm();
        setSelectedNews(null);
        alert('News updated successfully!');
      }
    } catch (error) {
      console.error('Error updating news:', error);
      alert('Error updating news. Please try again.');
    }
  };

  // Delete news
  const handleDeleteNews = async () => {
    try {
      const response = await axiosInstance.delete(`/news/delete-news/${selectedNews._id}`);
      if (response.data.success) {
        fetchNews();
        setShowDeleteModal(false);
        setSelectedNews(null);
        alert('News deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Error deleting news. Please try again.');
    }
  };

  // Open edit form
  const openEditForm = (newsItem) => {
    setSelectedNews(newsItem);
    setFormData({
      title: newsItem.title || '',
      date: newsItem.date || '',
      image: newsItem.image || '',
      summary: newsItem.summary || '',
      fullContent: newsItem.fullContent || ''
    });
    setShowEditForm(true);
  };

  // Filter news based on search
  const filteredNews = news.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.summary?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-800"></div>
      </div>
    );
  }

  return (
    <>
      {/* Background blur styles */}
      <style>
        {`
          .modal-blur-bg {
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
          
          .main-content-blur {
            filter: blur(4px);
            transition: filter 0.3s ease;
          }
        `}
      </style>

      <div className={`min-h-screen bg-green-50 p-6 ${(showAddForm || showEditForm || showDeleteModal) ? 'main-content-blur' : ''}`}>
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">News Management</h1>
              <p className="text-gray-600">Manage your news articles efficiently</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-teal-800 hover:bg-teal-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add News
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search news by title or summary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-800 focus:border-transparent"
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredNews.map((newsItem) => (
            <div key={newsItem._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {newsItem.image && (
                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full">
                    News
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditForm(newsItem)}
                      className="text-teal-800 hover:text-teal-600 transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedNews(newsItem);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
                  {newsItem.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {newsItem.summary}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{newsItem.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Eye size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No news found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first news article'}
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit News Modal */}
      {(showAddForm || showEditForm) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 modal-blur-bg flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                  {showAddForm ? 'Add New News' : 'Edit News'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setShowEditForm(false);
                    resetForm();
                    setSelectedNews(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-800 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-800 focus:border-transparent"
                />
              </div>
              
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Image</label>
                <div className="space-y-4">
                  {/* File Upload */}
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {imageUploading ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-800"></div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={imageUploading}
                      />
                    </label>
                  </div>
                  
                  {/* Direct URL Input */}
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="Or paste image URL directly"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-800 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Image Preview */}
                  {formData.image && (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Summary *</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-800 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Full Content</label>
                <textarea
                  name="fullContent"
                  value={formData.fullContent}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-800 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={showAddForm ? handleAddNews : handleEditNews}
                  disabled={imageUploading}
                  className="flex-1 bg-teal-800 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  {showAddForm ? 'Add News' : 'Update News'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setShowEditForm(false);
                    resetForm();
                    setSelectedNews(null);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 modal-blur-bg flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 text-center">
              <div className="text-red-500 mb-4">
                <AlertTriangle size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Delete News</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{selectedNews?.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDeleteNews}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedNews(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNews;
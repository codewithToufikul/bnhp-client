import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Upload, Eye, AlertCircle } from 'lucide-react';
import axiosInstance from '../../../Hooks/axiosIntance';
import toast from 'react-hot-toast';

const DashboardSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSlider, setCurrentSlider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    src: '',
    title: '',
    description: ''
  });

  // Load sliders on component mount
  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get('/slider/get-all-sliders');
      const data = response.data;
      
      if (data.success) {
        setSliders(data.sliders);
      } else {
        setError(data.message || 'Failed to fetch sliders');
      }
    } catch (error) {
      setError('Error fetching sliders: ' + (error.response?.data?.message || error.message));
      console.error('Error fetching sliders:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_HOSTING_KEY}`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setImageUploading(true);
    try {
      const imageUrl = await uploadToImgBB(file);
      setFormData(prev => ({ ...prev, src: imageUrl }));
    } catch (error) {
        console.log(error)
      toast.error('Image upload failed. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({ src: '', title: '', description: '' });
    setCurrentSlider(null);
    setError('');
  };

  const handleAddSlider = async () => {
    if (!formData.src || !formData.title || !formData.description) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/slider/add-slider', {
        sliderData: formData
      });
      
      const data = response.data;
      
      if (data.success) {
        setSliders(prev => [...prev, data.slider]);
        setShowAddModal(false);
        resetForm();
        toast.success('Slider added successfully!');
      } else {
        setError(data.message || 'Failed to add slider');
      }
    } catch (error) {
      setError('Failed to add slider: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEditSlider = async () => {
    if (!formData.src || !formData.title || !formData.description) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.put(`/slider/update-slider/${currentSlider._id}`, {
        updateData: formData
      });
      
      const data = response.data;
      
      if (data.success) {
        setSliders(prev => prev.map(slider => 
          slider._id === currentSlider._id 
            ? data.slider
            : slider
        ));
        setShowEditModal(false);
        resetForm();
        toast.success('Slider updated successfully!');
      } else {
        setError(data.message || 'Failed to update slider');
      }
    } catch (error) {
      setError('Failed to update slider: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlider = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.delete(`/slider/delete-slider/${currentSlider._id}`);
      
      const data = response.data;
      
      if (data.success) {
        setSliders(prev => prev.filter(slider => slider._id !== currentSlider._id));
        setShowDeleteModal(false);
        resetForm();
        toast.success('Slider deleted successfully!');
      } else {
        setError(data.message || 'Failed to delete slider');
      }
    } catch (error) {
      setError('Failed to delete slider: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (slider) => {
    setCurrentSlider(slider);
    setFormData({
      src: slider.src,
      title: slider.title,
      description: slider.description
    });
    setShowEditModal(true);
    setError('');
  };

  const openDeleteModal = (slider) => {
    setCurrentSlider(slider);
    setShowDeleteModal(true);
    setError('');
  };

  const closeAllModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-[#ecfdf5] p-6">
      <style jsx>{`
        .backdrop-blur {
          backdrop-filter: blur(10px);
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        .modal-blur {
          backdrop-filter: blur(5px);
          background-color: rgba(236, 253, 245, 0.95);
        }
        
        .loading-spinner {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #0f766e;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(15, 118, 110, 0.1);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #0f766e, #10b981);
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #0d5f57, #059669);
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(15, 118, 110, 0.3);
        }
        
        .btn-secondary {
          background: linear-gradient(135deg, #10b981, #34d399);
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: linear-gradient(135deg, #059669, #10b981);
          transform: translateY(-1px);
        }
        
        .btn-danger {
          background: linear-gradient(135deg, #dc2626, #ef4444);
          transition: all 0.3s ease;
        }
        
        .btn-danger:hover {
          background: linear-gradient(135deg, #b91c1c, #dc2626);
          transform: translateY(-1px);
        }
        
        .input-field {
          transition: all 0.3s ease;
        }
        
        .input-field:focus {
          border-color: #0f766e;
          box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
          transform: translateY(-1px);
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Slider Management</h1>
            <p className="text-gray-600">Manage your website sliders</p>
          </div>
          <button
            onClick={() => {
              setShowAddModal(true);
              resetForm();
            }}
            className="btn-primary px-6 py-3 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg"
            disabled={loading}
          >
            <Plus size={20} />
            Add New Slider
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => setError('')}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && !showAddModal && !showEditModal && !showDeleteModal && (
          <div className="flex justify-center items-center py-12">
            <div className="loading-spinner"></div>
            <span className="ml-3 text-[#0f766e] font-medium">Loading sliders...</span>
          </div>
        )}

        {/* Sliders Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sliders.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Eye size={64} className="mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Sliders Found</h3>
                <p className="text-gray-500 mb-6">Get started by adding your first slider</p>
                <button
                  onClick={() => {
                    setShowAddModal(true);
                    resetForm();
                  }}
                  className="btn-primary px-6 py-3 text-white rounded-lg font-semibold flex items-center gap-2 mx-auto"
                >
                  <Plus size={20} />
                  Add First Slider
                </button>
              </div>
            ) : (
              sliders.map((slider) => (
                <div key={slider._id} className="bg-white rounded-xl shadow-lg card-hover fade-in overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={slider.src}
                      alt={slider.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#0f172a] mb-2 line-clamp-2">
                      {slider.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {slider.description}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(slider)}
                        className="btn-secondary flex-1 px-4 py-2 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(slider)}
                        className="btn-danger flex-1 px-4 py-2 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Add Slider Modal */}
        {showAddModal && (
          <div className="fixed inset-0 backdrop-blur z-50 flex items-center justify-center p-4">
            <div className="modal-blur rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#0f172a]">Add New Slider</h2>
                  <button
                    onClick={closeAllModals}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={loading}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0f172a] mb-3">
                      Upload Image
                    </label>
                    <div className="border-2 border-dashed border-[#10b981] rounded-lg p-6 text-center hover:border-[#0f766e] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                        disabled={imageUploading}
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload size={48} className="mx-auto mb-4 text-[#10b981]" />
                        <p className="text-[#0f172a] font-medium mb-2">
                          {imageUploading ? 'Uploading...' : 'Click to upload image'}
                        </p>
                        <p className="text-sm text-gray-600">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </label>
                    </div>
                    
                    {/* Image Preview */}
                    {formData.src && (
                      <div className="mt-4">
                        <img
                          src={formData.src}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>

                  {/* Title Input */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0f172a] mb-3">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter slider title"
                      className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                      disabled={loading}
                    />
                  </div>

                  {/* Description Input */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0f172a] mb-3">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter slider description"
                      rows="4"
                      className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none resize-none"
                      disabled={loading}
                    />
                  </div>

                  {/* Error Display in Modal */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                      <AlertCircle className="text-red-500" size={16} />
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={closeAllModals}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddSlider}
                      className="btn-primary flex-1 px-6 py-3 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                      disabled={loading || !formData.src || !formData.title || !formData.description}
                    >
                      {loading ? (
                        <>
                          <div className="loading-spinner"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus size={20} />
                          Add Slider
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Slider Modal */}
        {showEditModal && (
          <div className="fixed inset-0 backdrop-blur z-50 flex items-center justify-center p-4">
            <div className="modal-blur rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#0f172a]">Edit Slider</h2>
                  <button
                    onClick={closeAllModals}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={loading}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0f172a] mb-3">
                      Upload New Image (Optional)
                    </label>
                    <div className="border-2 border-dashed border-[#10b981] rounded-lg p-6 text-center hover:border-[#0f766e] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="edit-image-upload"
                        disabled={imageUploading}
                      />
                      <label htmlFor="edit-image-upload" className="cursor-pointer">
                        <Upload size={48} className="mx-auto mb-4 text-[#10b981]" />
                        <p className="text-[#0f172a] font-medium mb-2">
                          {imageUploading ? 'Uploading...' : 'Click to upload new image'}
                        </p>
                        <p className="text-sm text-gray-600">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </label>
                    </div>
                    
                    {/* Current Image Preview */}
                    {formData.src && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-[#0f172a] mb-2">Current Image:</p>
                        <img
                          src={formData.src}
                          alt="Current"
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>

                  {/* Title Input */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0f172a] mb-3">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter slider title"
                      className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                      disabled={loading}
                    />
                  </div>

                  {/* Description Input */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0f172a] mb-3">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter slider description"
                      rows="4"
                      className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none resize-none"
                      disabled={loading}
                    />
                  </div>

                  {/* Error Display in Modal */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                      <AlertCircle className="text-red-500" size={16} />
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={closeAllModals}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSlider}
                      className="btn-secondary flex-1 px-6 py-3 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                      disabled={loading || !formData.src || !formData.title || !formData.description}
                    >
                      {loading ? (
                        <>
                          <div className="loading-spinner"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Edit2 size={20} />
                          Update Slider
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 backdrop-blur z-50 flex items-center justify-center p-4">
            <div className="modal-blur rounded-xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0f172a] mb-2">Delete Slider</h2>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this slider? This action cannot be undone.
                  </p>
                  
                  {/* Slider Preview */}
                  {currentSlider && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                      <h3 className="font-semibold text-[#0f172a] mb-1">{currentSlider.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{currentSlider.description}</p>
                    </div>
                  )}

                  {/* Error Display in Modal */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 mb-4">
                      <AlertCircle className="text-red-500" size={16} />
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={closeAllModals}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteSlider}
                      className="btn-danger flex-1 px-6 py-3 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="loading-spinner"></div>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 size={20} />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSlider;
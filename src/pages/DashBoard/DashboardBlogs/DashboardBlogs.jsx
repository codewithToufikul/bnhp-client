import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, Filter, Calendar, MapPin, Tag, Upload, X, Save } from 'lucide-react';
import axiosInstance from '../../../Hooks/axiosIntance';

const DashboardBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'edit', 'view'
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState({ totalBlogs: 0, blogsByType: [], blogsByLocation: [] });

  const [formData, setFormData] = useState({
    type: '',
    title: '',
    date: '',
    location: '',
    summary: '',
    image: '',
    tags: [],
    content: ''
  });

  const blogTypes = ['program', 'news', 'event', 'announcement', 'article'];

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/blogs/get-all-blogs');
      if (response.data.success) {
        setBlogs(response.data.blogs);
        setFilteredBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/api/blogs/stats/overview');
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchStats();
  }, []);

  // Filter blogs
  useEffect(() => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(blog => blog.type === filterType);
    }

    if (filterLocation !== 'all') {
      filtered = filtered.filter(blog => blog.location.includes(filterLocation));
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, filterType, filterLocation, blogs]);

  // Upload image to ImageBB
  const uploadImageToImageBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      setUploading(true);
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_HOSTING_KEY}`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Image upload failed. Please try again.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadImageToImageBB(file);
      if (imageUrl) {
        setFormData(prev => ({ ...prev, image: imageUrl }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'add') {
        const response = await axiosInstance.post('/api/blogs/add-blog', {
          blogData: formData
        });
        if (response.data.success) {
          fetchBlogs();
          fetchStats();
          setShowModal(false);
          resetForm();
          alert('Blog added successfully!');
        }
      } else if (modalType === 'edit') {
        const response = await axiosInstance.put(`/api/blogs/update-blog/${selectedBlog._id}`, {
          updateData: formData
        });
        if (response.data.success) {
          fetchBlogs();
          fetchStats();
          setShowModal(false);
          resetForm();
          alert('Blog updated successfully!');
        }
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog. Please try again.');
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await axiosInstance.delete(`/api/blogs/delete-blog/${id}`);
        if (response.data.success) {
          fetchBlogs();
          fetchStats();
          alert('Blog deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Error deleting blog. Please try again.');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      type: '',
      title: '',
      date: '',
      location: '',
      summary: '',
      image: '',
      tags: [],
      content: ''
    });
    setSelectedBlog(null);
  };

  // Open modal
  const openModal = (type, blog = null) => {
    setModalType(type);
    setSelectedBlog(blog);
    if (blog) {
      setFormData({
        type: blog.type || '',
        title: blog.title || '',
        date: blog.date || '',
        location: blog.location || '',
        summary: blog.summary || '',
        image: blog.image || '',
        tags: blog.tags || [],
        content: blog.content || ''
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  // Handle tags input
  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
              <p className="text-gray-600 mt-1">Manage your blog posts and content</p>
            </div>
            <button
              onClick={() => openModal('add')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add New Blog
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBlogs}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blog Types</p>
                <p className="text-3xl font-bold text-gray-900">{stats.blogsByType.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Tag className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Locations</p>
                <p className="text-3xl font-bold text-gray-900">{stats.blogsByLocation.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {blogTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              {[...new Set(blogs.map(blog => blog.location))].map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog List */}
        <div className="bg-white rounded-lg shadow-sm">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading blogs...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No blogs found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBlogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={blog.image || '/api/placeholder/60/60'}
                            alt={blog.title}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                            <div className="text-sm text-gray-500">{blog.summary.substring(0, 60)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {blog.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {blog.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {blog.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal('view', blog)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openModal('edit', blog)}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">
                  {modalType === 'add' ? 'Add New Blog' : modalType === 'edit' ? 'Edit Blog' : 'View Blog'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {modalType === 'view' ? (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={selectedBlog?.image || '/api/placeholder/400/300'}
                        alt={selectedBlog?.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{selectedBlog?.title}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Tag size={16} className="text-gray-500" />
                          <span className="text-sm font-medium">Type:</span>
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {selectedBlog?.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-500" />
                          <span className="text-sm font-medium">Date:</span>
                          <span className="text-sm">{selectedBlog?.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-gray-500" />
                          <span className="text-sm font-medium">Location:</span>
                          <span className="text-sm">{selectedBlog?.location}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedBlog?.tags?.map((tag, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">Summary</h4>
                    <p className="text-gray-700 mb-4">{selectedBlog?.summary}</p>
                    <h4 className="text-lg font-semibold mb-2">Content</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedBlog?.content}</p>
                  </div>
                </div>
              ) : (
                <div onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blog Type *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Type</option>
                        {blogTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                      </label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        placeholder="e.g., ১০ জুন ২০২৫"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.tags.join(', ')}
                        onChange={handleTagsChange}
                        placeholder="e.g., মিছিল, বাস্তুচ্যুত, বরিশাল"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Summary *
                      </label>
                      <textarea
                        value={formData.summary}
                        onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        {formData.image ? (
                          <div className="text-center">
                            <img
                              src={formData.image}
                              alt="Preview"
                              className="mx-auto h-32 w-auto rounded-lg mb-4"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove Image
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <div className="flex justify-center">
                              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                <Upload size={20} />
                                {uploading ? 'Uploading...' : 'Upload Image'}
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                  disabled={uploading}
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content *
                      </label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        required
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                    >
                      <Save size={20} />
                      {modalType === 'add' ? 'Add Blog' : 'Update Blog'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardBlogs;
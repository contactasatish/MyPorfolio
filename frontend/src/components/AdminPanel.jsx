import React, { useState, useEffect } from 'react';
import { 
  Users, Mail, BarChart3, Download, Eye, MessageSquare, 
  Calendar, TrendingUp, Clock, CheckCircle, AlertCircle 
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [showCredentialsManager, setShowCredentialsManager] = useState(false);
  const [newCredentials, setNewCredentials] = useState({ username: '', password: '', confirmPassword: '' });
  
  // Dashboard data
  const [analytics, setAnalytics] = useState(null);
  const [contactMessages, setContactMessages] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  // Check if we're on GitHub Pages (no backend) - enhanced detection
  const isGitHubPages = 
    process.env.REACT_APP_USE_STATIC_DATA === 'true' || 
    !BACKEND_URL || 
    BACKEND_URL === '' || 
    BACKEND_URL === 'undefined' ||
    window.location.hostname.includes('github.io') ||
    (process.env.NODE_ENV === 'production' && !BACKEND_URL);

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const verifyToken = async () => {
    try {
      const response = await axios.get(`${API}/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
      setToken('');
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${API}/admin/login`, loginData);
      const { access_token } = response.data;
      
      setToken(access_token);
      localStorage.setItem('adminToken', access_token);
      setIsAuthenticated(true);
    } catch (error) {
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
  };

  const loadDashboardData = async () => {
    setDashboardLoading(true);
    try {
      const [analyticsRes, messagesRes] = await Promise.all([
        axios.get(`${API}/analytics/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API}/contact`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setAnalytics(analyticsRes.data);
      setContactMessages(messagesRes.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setDashboardLoading(false);
    }
  };

  const updateMessageStatus = async (messageId, status) => {
    try {
      await axios.put(`${API}/contact/${messageId}`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const handleUpdateCredentials = async () => {
    if (isGitHubPages) {
      alert('Credential updates are not available on GitHub Pages. Please use the full-stack version.');
      return;
    }

    if (!newCredentials.username || !newCredentials.password) {
      alert('Please fill in all fields');
      return;
    }

    if (newCredentials.password !== newCredentials.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (newCredentials.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await axios.put(`${API}/admin/credentials`, {
        username: newCredentials.username,
        password: newCredentials.password
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        alert('Credentials updated successfully! Please log in again.');
        setIsAuthenticated(false);
        setToken('');
        localStorage.removeItem('adminToken');
        setNewCredentials({ username: '', password: '', confirmPassword: '' });
        setShowCredentialsManager(false);
      }
    } catch (error) {
      alert('Error updating credentials. This feature may not be available in the current setup.');
      console.error('Error updating credentials:', error);
    }
  };

  const uploadPhoto = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API}/upload/photo`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Photo uploaded successfully! Refresh the main page to see it.');
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo. Please try again.');
    }
  };

  if (!isAuthenticated) {
    // GitHub Pages - Show only restriction message
    if (isGitHubPages) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Panel</h1>
              <p className="text-slate-600">Administrative Access</p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
              <div className="flex items-center text-yellow-800 mb-2">
                <AlertCircle size={16} className="mr-2" />
                <strong>Access Restricted</strong>
              </div>
              <p className="text-yellow-700 mb-3">
                Contact Satish for Administrative access.
              </p>
              <div className="text-xs text-yellow-600 space-y-1">
                <div><strong>Email:</strong> contactasatish@gmail.com</div>
                <div><strong>Phone:</strong> 347-341-7341</div>
                <div><strong>LinkedIn:</strong> linkedin.com/in/asatishkr</div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <a 
                href="/#" 
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                ← Back to Portfolio
              </a>
            </div>
          </div>
        </div>
      );
    }

    // Full-stack version - Show login form
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Panel</h1>
            <p className="text-slate-600">Sign in to access portfolio management</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
            <div className="flex items-center text-blue-800 mb-2">
              <MessageSquare size={16} className="mr-2" />
              <strong>Need Access?</strong>
            </div>
            <p className="text-blue-700">
              Contact the administrator to set up your credentials or request access.
            </p>
            <button
              onClick={() => setShowCredentialsManager(!showCredentialsManager)}
              className="mt-2 text-blue-600 hover:text-blue-800 underline text-xs"
            >
              {showCredentialsManager ? 'Hide' : 'Show'} Credentials Manager
            </button>
          </div>
          
          {showCredentialsManager && (
            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-3">Update Admin Credentials</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="New Username"
                  value={newCredentials.username}
                  onChange={(e) => setNewCredentials({...newCredentials, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newCredentials.password}
                  onChange={(e) => setNewCredentials({...newCredentials, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={newCredentials.confirmPassword}
                  onChange={(e) => setNewCredentials({...newCredentials, confirmPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <button
                  onClick={handleUpdateCredentials}
                  className="w-full bg-slate-600 text-white py-2 px-4 rounded text-sm hover:bg-slate-700 transition-colors"
                >
                  Update Credentials
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Portfolio Admin</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-8 w-fit">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
            { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} /> },
            { id: 'photo', label: 'Upload Photo', icon: <Users size={18} /> },
            { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {dashboardLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && analytics && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Views</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.total_views}</p>
                      </div>
                      <Eye className="text-blue-500" size={24} />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Contact Messages</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.contact_submissions}</p>
                      </div>
                      <Mail className="text-green-500" size={24} />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Downloads</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.downloads}</p>
                      </div>
                      <Download className="text-purple-500" size={24} />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Section Views</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {Object.values(analytics.section_views).reduce((a, b) => a + b, 0)}
                        </p>
                      </div>
                      <Users className="text-orange-500" size={24} />
                    </div>
                  </div>
                </div>

                {/* Section Views Breakdown */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Section Popularity</h3>
                  <div className="space-y-3">
                    {Object.entries(analytics.section_views).map(([section, views]) => (
                      <div key={section} className="flex items-center justify-between">
                        <span className="text-gray-600 capitalize">{section}</span>
                        <span className="font-semibold text-gray-900">{views} views</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {analytics.recent_activity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">
                            {activity.event_type.replace('_', ' ')} 
                            {activity.section && ` - ${activity.section}`}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Contact Messages</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {contactMessages.map((message) => (
                    <div key={message.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{message.name}</h4>
                          <p className="text-gray-600">{message.email}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(message.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            message.status === 'unread' 
                              ? 'bg-red-100 text-red-800'
                              : message.status === 'read'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {message.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2">Subject: {message.subject}</h5>
                        <p className="text-gray-700">{message.message}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        {message.status === 'unread' && (
                          <button
                            onClick={() => updateMessageStatus(message.id, 'read')}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                          >
                            Mark as Read
                          </button>
                        )}
                        {message.status === 'read' && (
                          <button
                            onClick={() => updateMessageStatus(message.id, 'replied')}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm"
                          >
                            Mark as Replied
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Upload Tab */}
            {activeTab === 'photo' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Upload Professional Photo</h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-3">📸 Your Mediterranean Photo</h4>
                  <p className="text-blue-800 text-sm mb-4">
                    I can see your beautiful professional photo with the Mediterranean coastal background! 
                    Upload it here to replace the placeholder in your portfolio.
                  </p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>✅ <strong>Great professional appearance</strong> - Perfect for executive roles</li>
                    <li>✅ <strong>Beautiful coastal background</strong> - Shows international experience</li>
                    <li>✅ <strong>Professional lighting</strong> - Will look amazing with our styling</li>
                    <li>✅ <strong>Perfect composition</strong> - Ideal for portfolio use</li>
                  </ul>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-4">📸</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Professional Photo</h4>
                  <p className="text-gray-600 mb-4">
                    Select your Mediterranean coastal photo to use as your professional headshot
                  </p>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadPhoto}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: JPG or PNG, at least 400x500 pixels
                  </p>
                </div>

                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What happens after upload:</h4>
                  <ol className="text-sm text-gray-700 space-y-1">
                    <li>1. Your photo will be saved as the professional headshot</li>
                    <li>2. It will automatically appear in the hero section</li>
                    <li>3. Professional styling and overlay will be applied</li>
                    <li>4. Refresh the main portfolio page to see it live!</li>
                  </ol>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && analytics && (
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Overview</h3>
                  <div className="text-sm text-gray-600">
                    <p>Detailed analytics data showing user engagement across the portfolio.</p>
                    <p className="mt-2">Data is collected for the last 30 days.</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
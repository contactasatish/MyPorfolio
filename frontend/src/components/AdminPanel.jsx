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
  
  // Dashboard data
  const [analytics, setAnalytics] = useState(null);
  const [contactMessages, setContactMessages] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);

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

  if (!isAuthenticated) {
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
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <strong>Demo Credentials:</strong><br />
            Username: admin<br />
            Password: admin123
          </div>
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
import React, { useState, useEffect } from 'react';
import { Eye, ArrowRight, Check } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DesignShowcase = ({ onSelectDesign }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const designOptions = [
    {
      id: 'option1',
      name: 'Minimalist Corporate',
      description: 'Clean, professional, corporate style with elegant typography and monochrome palette',
      features: ['Clean Typography', 'Professional Layout', 'Minimal Colors', 'Corporate Feel'],
      color: 'from-gray-400 to-gray-600',
      preview: '/api/placeholder/400/300?text=Minimalist+Corporate'
    },
    {
      id: 'option2', 
      name: 'Creative Tech',
      description: 'Bold, modern with tech elements, dynamic interactions, and vibrant design',
      features: ['Tech Imagery', 'Dynamic Elements', 'Modern Design', 'Interactive UI'],
      color: 'from-blue-400 to-blue-600',
      preview: '/api/placeholder/400/300?text=Creative+Tech'
    },
    {
      id: 'option3',
      name: 'Executive Premium',
      description: 'Luxury dark theme, sophisticated design for senior executive profiles',
      features: ['Dark Premium Theme', 'Gold Accents', 'Executive Style', 'Luxury Feel'],
      color: 'from-amber-400 to-amber-600',
      preview: '/api/placeholder/400/300?text=Executive+Premium'
    },
    {
      id: 'option4',
      name: 'Modern Portfolio',
      description: 'Contemporary design with gradient accents and emphasis on projects',
      features: ['Gradient Design', 'Project Focus', 'Modern UI', 'Clean Layout'],
      color: 'from-purple-400 to-purple-600',
      preview: '/api/placeholder/400/300?text=Modern+Portfolio'
    }
  ];

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get(`${API}/portfolio`);
      setPortfolioData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setLoading(false);
    }
  };

  const handleSelectDesign = (optionId) => {
    setSelectedOption(optionId);
    // Call parent function after a brief delay to show selection
    setTimeout(() => {
      onSelectDesign(optionId, portfolioData);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading design options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Choose Your Design Style</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Select from 4 professionally designed portfolio styles, each crafted to showcase your 
            expertise in different ways. All designs are fully responsive and production-ready.
          </p>
        </div>

        {/* Design Options Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {designOptions.map((option) => (
            <div 
              key={option.id}
              className={`group relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-500 hover:scale-105 ${
                selectedOption === option.id 
                  ? 'border-green-500 shadow-2xl scale-105' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {selectedOption === option.id && (
                <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-2 z-10">
                  <Check size={20} />
                </div>
              )}
              
              {/* Preview Image Placeholder */}
              <div className={`h-64 bg-gradient-to-r ${option.color} rounded-t-2xl relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-2xl font-bold text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <div>{option.name}</div>
                  </div>
                </div>
                
                {/* Design Pattern Overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 h-full">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div key={i} className="border border-white/30"></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{option.name}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{option.description}</p>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {option.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-slate-700">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${option.color} mr-2`}></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Action Button */}
                <button
                  onClick={() => handleSelectDesign(option.id)}
                  disabled={selectedOption === option.id}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    selectedOption === option.id
                      ? 'bg-green-500 text-white'
                      : `bg-gradient-to-r ${option.color} hover:shadow-lg hover:scale-105 text-white`
                  }`}
                >
                  {selectedOption === option.id ? (
                    <span className="flex items-center justify-center">
                      <Check size={20} className="mr-2" />
                      Selected
                    </span>
                  ) : (
                    <span className="flex items-center justify-center group">
                      <Eye size={20} className="mr-2" />
                      Select This Design
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Backend Features Showcase */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Complete Backend Integration Included
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: 'Contact Management',
                description: 'Receive and manage contact form submissions',
                icon: '📧'
              },
              {
                title: 'Analytics Dashboard',
                description: 'Track page views, section engagement, downloads',
                icon: '📊'
              },
              {
                title: 'Admin Panel',
                description: 'Secure admin interface to manage content',
                icon: '🔐'
              },
              {
                title: 'File Downloads',
                description: 'Resume download tracking and management',
                icon: '📄'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specs */}
        <div className="bg-slate-900 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Technical Implementation</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Frontend Stack</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• React 19 with Modern Hooks</li>
                <li>• Tailwind CSS for Styling</li>
                <li>• Lucide React Icons</li>
                <li>• Responsive Design</li>
                <li>• Performance Optimized</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-400">Backend API</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• FastAPI Python Framework</li>
                <li>• MongoDB Database</li>
                <li>• JWT Authentication</li>
                <li>• RESTful API Design</li>
                <li>• Input Validation</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Features</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Contact Form Processing</li>
                <li>• Analytics Tracking</li>
                <li>• Admin Dashboard</li>
                <li>• File Management</li>
                <li>• Production Ready</li>
              </ul>
            </div>
          </div>
        </div>
        
        {selectedOption && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Loading Design...</h3>
              <p className="text-slate-600">Setting up your selected portfolio design</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignShowcase;
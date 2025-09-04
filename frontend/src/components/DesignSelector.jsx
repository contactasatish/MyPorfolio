import React, { useState, useEffect } from 'react';
import { Eye, Palette, Settings } from 'lucide-react';
import axios from 'axios';

// Import design options
import MinimalistPortfolio from './design-options/Option1-Minimalist';
import CreativeTechPortfolio from './design-options/Option2-CreativeTech';
import ExecutivePremiumPortfolio from './design-options/Option3-Executive';
import ModernPortfolio from './design-options/Option4-Modern';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DesignSelector = () => {
  const [selectedDesign, setSelectedDesign] = useState('option2'); // Default to Creative Tech
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  const designOptions = [
    {
      id: 'option1',
      name: 'Minimalist Corporate',
      description: 'Clean, professional, corporate style with elegant typography',
      color: 'bg-gray-500',
      component: MinimalistPortfolio
    },
    {
      id: 'option2', 
      name: 'Creative Tech',
      description: 'Bold, modern with tech elements and dynamic interactions',
      color: 'bg-blue-500',
      component: CreativeTechPortfolio
    },
    {
      id: 'option3',
      name: 'Executive Premium',
      description: 'Luxury, sophisticated, high-end business style with dark theme',
      color: 'bg-amber-500',
      component: ExecutivePremiumPortfolio
    },
    {
      id: 'option4',
      name: 'Modern Portfolio',
      description: 'Contemporary design with emphasis on projects and achievements',
      color: 'bg-purple-500',
      component: ModernPortfolio
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

  const getCurrentComponent = () => {
    const option = designOptions.find(opt => opt.id === selectedDesign);
    return option ? option.component : CreativeTechPortfolio;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  const CurrentPortfolioComponent = getCurrentComponent();

  return (
    <div className="relative">
      {/* Design Selector Panel */}
      {isPreviewMode && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Palette size={20} className="text-blue-600" />
                  <span className="font-semibold text-gray-900">Design Options</span>
                </div>
                
                <div className="flex space-x-2">
                  {designOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedDesign(option.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedDesign === option.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                        <span>{option.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => setIsPreviewMode(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Select This Design
              </button>
            </div>
            
            {/* Design Description */}
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>{designOptions.find(opt => opt.id === selectedDesign)?.name}:</strong>{' '}
                {designOptions.find(opt => opt.id === selectedDesign)?.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Design Preview Button */}
      {!isPreviewMode && (
        <button
          onClick={() => setIsPreviewMode(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 group"
          title="Preview Design Options"
        >
          <div className="relative">
            <Eye size={24} />
            <div className="absolute -top-12 right-0 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Design Options
            </div>
          </div>
        </button>
      )}

      {/* Portfolio Content */}
      <div className={isPreviewMode ? 'pt-32' : ''}>
        <CurrentPortfolioComponent portfolioData={portfolioData} />
      </div>
    </div>
  );
};

export default DesignSelector;
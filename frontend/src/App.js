import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// Import design options
import MinimalistPortfolio from "./components/design-options/Option1-Minimalist";
import CreativeTechPortfolio from "./components/design-options/Option2-CreativeTech";
import ExecutivePremiumPortfolio from "./components/design-options/Option3-Executive";
import ModernPortfolio from "./components/design-options/Option4-Modern";
import DesignShowcase from "./components/DesignShowcase";
import AdminPanel from "./components/AdminPanel";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [selectedDesign, setSelectedDesign] = useState('option4');
  const [portfolioData, setPortfolioData] = useState(null);
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio' to show Option 4 directly

  const designComponents = {
    'option1': MinimalistPortfolio,
    'option2': CreativeTechPortfolio, 
    'option3': ExecutivePremiumPortfolio,
    'option4': ModernPortfolio
  };

  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
    
    // Load portfolio data on startup
    fetchPortfolioData();
    
    // Check URL for admin panel
    if (window.location.hash === '#admin') {
      setCurrentView('admin');
    }
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get(`${API}/portfolio`);
      setPortfolioData(response.data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    }
  };

  const handleDesignSelection = (designId, data) => {
    setSelectedDesign(designId);
    setPortfolioData(data);
    setCurrentView('portfolio');
  };

  const handleBackToShowcase = () => {
    setCurrentView('showcase');
    setSelectedDesign(null);
  };

  // Admin Panel View
  if (currentView === 'admin') {
    return <AdminPanel />;
  }

  // Design Showcase View
  if (currentView === 'showcase') {
    return <DesignShowcase onSelectDesign={handleDesignSelection} />;
  }

  // Portfolio View
  if (currentView === 'portfolio' && selectedDesign && portfolioData) {
    const SelectedPortfolioComponent = designComponents[selectedDesign];
    
    return (
      <div className="relative">
        {/* Back to Design Selection Button */}
        <button
          onClick={handleBackToShowcase}
          className="fixed top-4 left-4 z-50 bg-white text-slate-900 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 font-medium"
        >
          ← Back to Design Options
        </button>
        
        {/* Admin Panel Access */}
        <button
          onClick={() => setCurrentView('admin')}
          className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
        >
          Admin Panel
        </button>
        
        <SelectedPortfolioComponent portfolioData={portfolioData} />
      </div>
    );
  }

  // Fallback loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Loading...</p>
      </div>
    </div>
  );
}

export default App;
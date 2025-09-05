import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// Import design options
import MinimalistPortfolio from "./components/design-options/Option1-Minimalist";
import CreativeTechPortfolio from "./components/design-options/Option2-CreativeTech";
import ExecutivePremiumPortfolio from "./components/design-options/Option3-Executive";
import ModernPortfolio from "./components/design-options/Option4-Modern";
import PhotoHeroPortfolio from "./components/design-options/Option5-PhotoHero";
import DesignShowcase from "./components/DesignShowcase";
import AdminPanel from "./components/AdminPanel";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [selectedDesign, setSelectedDesign] = useState('option5');
  const [portfolioData, setPortfolioData] = useState(null);
  const [currentView, setCurrentView] = useState('portfolio'); // Show Photo Hero design directly

  const designComponents = {
    'option1': MinimalistPortfolio,
    'option2': CreativeTechPortfolio, 
    'option3': ExecutivePremiumPortfolio,
    'option4': ModernPortfolio,
    'option5': PhotoHeroPortfolio
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
    // Comprehensive GitHub Pages detection
    const isProduction = process.env.NODE_ENV === 'production';
    const hasNoBackendURL = !BACKEND_URL || BACKEND_URL === '' || BACKEND_URL === 'undefined';
    const isStaticDataForced = process.env.REACT_APP_USE_STATIC_DATA === 'true';
    const isGitHubPages = isProduction || hasNoBackendURL || isStaticDataForced;
    
    console.log('Environment Detection:', {
      NODE_ENV: process.env.NODE_ENV,
      REACT_APP_USE_STATIC_DATA: process.env.REACT_APP_USE_STATIC_DATA,
      BACKEND_URL: BACKEND_URL,
      isProduction,
      hasNoBackendURL,
      isStaticDataForced,
      isGitHubPages,
      currentURL: window.location.href
    });
    
    if (isGitHubPages) {
      console.log('🌐 Using static data for GitHub Pages deployment');
      // Use static data directly for GitHub Pages
      setPortfolioData({
        personal: {
          name: "Satish",
          title: "IT Analyst / Product Manager / Product Owner",
          tagline: "SaaS | Machine Learning | Procurement | Cross-Functional Leadership | Driving $10M+ Digital Transformation Initiatives",
          location: "Dallas–Fort Worth, TX (Remote/Hybrid, open to 25% travel)",
          email: "contactasatish@gmail.com",
          phone: "347-341-7341",
          linkedin: "linkedin.com/in/asatishkr"
        },
        about: {
          title: "About Me",
          description: "Dynamic IT Analyst and Product Manager with 15+ years of experience leading digital transformation initiatives across SaaS, travel, telecom, and waste management sectors. Proven track record of driving $10M+ technology programs, implementing enterprise CRM and Big Data platforms, and spearheading cross-functional teams that deliver measurable business outcomes."
        },
        skills: [
          { 
            category: "Product Management", 
            items: ["Roadmaps", "Agile/Scrum", "Product Lifecycle", "Requirements Gathering"] 
          },
          { 
            category: "Technical Expertise", 
            items: ["Salesforce", "GCP", "Snowflake", "Hadoop/Hive", "Python", "SQL", "Tableau"] 
          },
          { 
            category: "Business Impact", 
            items: ["Digital Transformation", "Procurement Optimization", "Data Migration", "Compliance (RCRA, EPA, HIPAA)"] 
          },
          { 
            category: "Leadership & Collaboration", 
            items: ["Stakeholder Management", "Cross-Functional Leadership", "Change Management", "Training & Adoption"] 
          }
        ],
        experience: [
          {
            title: "IT Technical Analyst",
            company: "Clean Earth",
            type: "Contract",
            period: "Jun 2023 – Present",
            location: "Remote, Philadelphia, PA",
            achievements: [
              "Designed profile management system for 500+ waste facilities ensuring 100% RCRA & EPA compliance",
              "Led 12-person cross-functional team delivering CRM modernization, reducing inefficiencies by 30%",
              "Directed UAT achieving 98% user satisfaction rate",
              "Trained 200+ stakeholders for smooth system adoption"
            ]
          },
          {
            title: "Principal Technical Business Analyst",
            company: "Sabre Corporation",
            type: "Full-time",
            period: "Jun 2016 – May 2023",
            location: "Southlake, TX",
            achievements: [
              "Architected Salesforce solutions for global airline requirements across 15+ GDS integrations",
              "Managed $2M+ Agile projects, delivering 95% on time and under budget",
              "Optimized workflows via GCP services, cutting processing time by 40%",
              "Partnered with 50+ airline and hospitality stakeholders to define technical roadmaps"
            ]
          },
          {
            title: "Principal Technical Product Manager",
            company: "Verizon",
            type: "Contract",
            period: "May 2014 – May 2016",
            location: "Irving, TX",
            achievements: [
              "Spearheaded Big Data migration for 10TB+ daily volumes",
              "Developed predictive analytics models improving insights by 35%",
              "Introduced Agile frameworks across 8 dev teams, boosting velocity by 25%",
              "Built Tableau dashboards enabling data-driven C-level decisions"
            ]
          }
        ],
        projects: [
          {
            id: 1,
            title: "GenAI OCR Model Implementation",
            description: "Automated invoice and document processing system using advanced OCR and machine learning technologies",
            impact: "Saved 260+ man-hours by automating invoice/document processing",
            technologies: ["Machine Learning", "OCR", "Python", "AI/ML Models", "Document Processing"],
            image: "https://images.unsplash.com/photo-1684610529682-553625a1ffed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHRlY2glMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTcwMTc1NzN8MA&ixlib=rb-4.1.0&q=85",
            category: "AI/ML"
          },
          {
            id: 2,
            title: "SaaS Procurement to Production Transformation",
            description: "End-to-end digital transformation of procurement processes with enterprise-scale SaaS implementation",
            impact: "Delivered $5M+ efficiency improvements through streamlined procurement workflows",
            technologies: ["SaaS Platforms", "Process Automation", "Digital Transformation", "Workflow Optimization"],
            image: "https://images.unsplash.com/photo-1756756736901-a2bf24f2d2de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMHRlY2glMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTcwMTc1NzN8MA&ixlib=rb-4.1.0&q=85",
            category: "Digital Transformation"
          },
          {
            id: 3,
            title: "Compliance Automation System",
            description: "Comprehensive regulatory compliance system ensuring adherence to industry standards and regulations",
            impact: "Achieved 99% adherence to regulatory standards with automated compliance monitoring",
            technologies: ["Compliance Management", "Automation", "Regulatory Systems", "Quality Assurance"],
            image: "https://images.unsplash.com/photo-1728995025396-b5141e209455?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2glMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTcwMTc1NzN8MA&ixlib=rb-4.1.0&q=85",
            category: "Compliance"
          },
          {
            id: 4,
            title: "Travel/Airline Solutions Implementation",
            description: "Enterprise-scale NDC and GDS integration platform enabling next-generation airline distribution and booking capabilities across global travel networks",
            impact: "Delivered 38 live NDC airline integrations, facilitated 30M+ incremental bookings, achieved 5-20% airfare savings and 15-20% workflow improvements",
            technologies: ["NDC Integration", "GDS Systems", "API Development", "Travel Technology", "Airline Distribution", "Sabre Platform"],
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHRyYXZlbCUyMGF2aWF0aW9ufGVufDB8fHx8MTc1NzAxNzU3M3ww&ixlib=rb-4.1.0&q=85",
            category: "Aviation Technology"
          }
        ]
      });
      return;
    }

    try {
      console.log('Fetching portfolio data...');
      const response = await axios.get(`${API}/portfolio`);
      console.log('Portfolio data received:', response.data);
      setPortfolioData(response.data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      // Set complete fallback data if API fails
      setPortfolioData({
        personal: {
          name: "Satish",
          title: "IT Analyst / Product Manager / Product Owner",
          tagline: "SaaS | Machine Learning | Procurement | Cross-Functional Leadership | Driving $10M+ Digital Transformation Initiatives",
          location: "Dallas–Fort Worth, TX (Remote/Hybrid, open to 25% travel)",
          email: "contactasatish@gmail.com",
          phone: "347-341-7341",
          linkedin: "linkedin.com/in/asatishkr"
        },
        about: {
          title: "About Me",
          description: "Dynamic IT Analyst and Product Manager with 15+ years of experience leading digital transformation initiatives across SaaS, travel, telecom, and waste management sectors. Proven track record of driving $10M+ technology programs, implementing enterprise CRM and Big Data platforms, and spearheading cross-functional teams that deliver measurable business outcomes."
        },
        skills: [
          { 
            category: "Product Management", 
            items: ["Roadmaps", "Agile/Scrum", "Product Lifecycle", "Requirements Gathering"] 
          },
          { 
            category: "Technical Expertise", 
            items: ["Salesforce", "GCP", "Snowflake", "Hadoop/Hive", "Python", "SQL", "Tableau"] 
          },
          { 
            category: "Business Impact", 
            items: ["Digital Transformation", "Procurement Optimization", "Data Migration", "Compliance (RCRA, EPA, HIPAA)"] 
          },
          { 
            category: "Leadership & Collaboration", 
            items: ["Stakeholder Management", "Cross-Functional Leadership", "Change Management", "Training & Adoption"] 
          }
        ],
        experience: [
          {
            title: "IT Technical Analyst",
            company: "Clean Earth",
            type: "Contract",
            period: "Jun 2023 – Present",
            location: "Remote, Philadelphia, PA",
            achievements: [
              "Designed profile management system for 500+ waste facilities ensuring 100% RCRA & EPA compliance",
              "Led 12-person cross-functional team delivering CRM modernization, reducing inefficiencies by 30%",
              "Directed UAT achieving 98% user satisfaction rate",
              "Trained 200+ stakeholders for smooth system adoption"
            ]
          },
          {
            title: "Principal Technical Business Analyst",
            company: "Sabre Corporation",
            type: "Full-time",
            period: "Jun 2016 – May 2023",
            location: "Southlake, TX",
            achievements: [
              "Architected Salesforce solutions for global airline requirements across 15+ GDS integrations",
              "Managed $2M+ Agile projects, delivering 95% on time and under budget",
              "Optimized workflows via GCP services, cutting processing time by 40%",
              "Partnered with 50+ airline and hospitality stakeholders to define technical roadmaps"
            ]
          },
          {
            title: "Principal Technical Product Manager",
            company: "Verizon",
            type: "Contract",
            period: "May 2014 – May 2016",
            location: "Irving, TX",
            achievements: [
              "Spearheaded Big Data migration for 10TB+ daily volumes",
              "Developed predictive analytics models improving insights by 35%",
              "Introduced Agile frameworks across 8 dev teams, boosting velocity by 25%",
              "Built Tableau dashboards enabling data-driven C-level decisions"
            ]
          }
        ],
        projects: [
          {
            id: 1,
            title: "GenAI OCR Model Implementation",
            description: "Automated invoice and document processing system using advanced OCR and machine learning technologies",
            impact: "Saved 260+ man-hours by automating invoice/document processing",
            technologies: ["Machine Learning", "OCR", "Python", "AI/ML Models", "Document Processing"],
            image: "https://images.unsplash.com/photo-1684610529682-553625a1ffed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHRlY2glMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTcwMTc1NzN8MA&ixlib=rb-4.1.0&q=85",
            category: "AI/ML"
          },
          {
            id: 2,
            title: "SaaS Procurement to Production Transformation",
            description: "End-to-end digital transformation of procurement processes with enterprise-scale SaaS implementation",
            impact: "Delivered $5M+ efficiency improvements through streamlined procurement workflows",
            technologies: ["SaaS Platforms", "Process Automation", "Digital Transformation", "Workflow Optimization"],
            image: "https://images.unsplash.com/photo-1756756736901-a2bf24f2d2de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMHRlY2glMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTcwMTc1NzN8MA&ixlib=rb-4.1.0&q=85",
            category: "Digital Transformation"
          },
          {
            id: 3,
            title: "Compliance Automation System",
            description: "Comprehensive regulatory compliance system ensuring adherence to industry standards and regulations",
            impact: "Achieved 99% adherence to regulatory standards with automated compliance monitoring",
            technologies: ["Compliance Management", "Automation", "Regulatory Systems", "Quality Assurance"],
            image: "https://images.unsplash.com/photo-1728995025396-b5141e209455?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2glMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTcwMTc1NzN8MA&ixlib=rb-4.1.0&q=85",
            category: "Compliance"
          },
          {
            id: 4,
            title: "Travel/Airline Solutions Implementation",
            description: "Enterprise-scale NDC and GDS integration platform enabling next-generation airline distribution and booking capabilities across global travel networks",
            impact: "Delivered 38 live NDC airline integrations, facilitated 30M+ incremental bookings, achieved 5-20% airfare savings and 15-20% workflow improvements",
            technologies: ["NDC Integration", "GDS Systems", "API Development", "Travel Technology", "Airline Distribution", "Sabre Platform"],
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHRyYXZlbCUyMGF2aWF0aW9ufGVufDB8fHx8MTc1NzAxNzU3M3ww&ixlib=rb-4.1.0&q=85",
            category: "Aviation Technology"
          }
        ]
      });
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
  if (currentView === 'portfolio' && selectedDesign) {
    const SelectedPortfolioComponent = designComponents[selectedDesign];
    
    // Show loading if no portfolio data yet
    if (!portfolioData) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your portfolio...</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="relative">
        {/* Back to Design Selection Button - Hide for production/GitHub Pages */}
        {false && (
          <button
            onClick={handleBackToShowcase}
            className="fixed top-4 left-4 z-50 bg-white text-slate-900 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 font-medium"
          >
            ← Back to Design Options
          </button>
        )}
        
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
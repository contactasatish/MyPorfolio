import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Mail, Phone, Linkedin, Calendar, Building, ExternalLink, Download, Heart, Monitor, Database, Cloud, Users, Trophy, Briefcase, Target } from 'lucide-react';

// Option 5: Photo Hero Design (Inspired by Richard Brian/William Harry style)
const PhotoHeroPortfolio = ({ portfolioData }) => {
  const { personal, about, skills, experience, projects } = portfolioData;

  // Counter animation hook
  const useCountUp = (end, duration = 2000, trigger = true) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!trigger) return;
      
      let startTime;
      let animationFrame;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - percentage, 3);
        setCount(Math.floor(end * easeOutCubic));
        
        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [end, duration, trigger]);
    
    return count;
  };

  // Intersection Observer hook for scroll-triggered animations
  const useInView = () => {
    const [inView, setInView] = useState(false);
    const ref = useRef();
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        },
        { threshold: 0.3 }
      );
      
      if (ref.current) {
        observer.observe(ref.current);
      }
      
      return () => observer.disconnect();
    }, []);
    
    return [ref, inView];
  };

  // Create multiple refs for different sections
  const [heroStatsRef, heroStatsInView] = useInView();
  const [projectStatsRef, projectStatsInView] = useInView();
  const [complianceRef, complianceInView] = useInView();
  const [travelImpactRef, travelImpactInView] = useInView();

  // Animated counters for different sections
  const heroYears = useCountUp(15, 2000, heroStatsInView);
  const heroProjects = useCountUp(572, 2500, heroStatsInView);
  
  const digitalTransform = useCountUp(85, 2000, projectStatsInView);
  const saasImplementation = useCountUp(92, 2200, projectStatsInView);
  const dataAnalytics = useCountUp(78, 1800, projectStatsInView);
  const productDeliveries = useCountUp(100, 2300, projectStatsInView);
  const workingYears = useCountUp(15, 2000, projectStatsInView);
  
  const complianceRate = useCountUp(100, 2000, complianceInView);
  const facilitiesCount = useCountUp(500, 2500, complianceInView);
  const satisfactionRate = useCountUp(98, 1800, complianceInView);
  
  const ndcIntegrations = useCountUp(38, 2000, travelImpactInView);
  const incrementalBookings = useCountUp(30, 2200, travelImpactInView);
  const workflowImprovement = useCountUp(20, 1800, travelImpactInView);
  const annualSavings = useCountUp(1000, 2500, travelImpactInView);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">
            {personal.name.split(' ')[0]}<span className="text-red-500">.</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Works', 'About', 'Government', 'Projects'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} 
                 className="text-gray-700 hover:text-red-500 transition-colors font-medium">
                {item}
              </a>
            ))}
          </nav>
          <button className="px-6 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-medium">
            Let's chat
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    IT/Product Management
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Hi! I Am<br />
                  <span className="text-gray-800">{personal.name}</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Leading digital transformation initiatives for over 15 years as an IT Analyst and Product Manager
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-red-500 text-white hover:bg-red-600 transition-colors font-semibold rounded-lg">
                  Hire Me
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors font-semibold rounded-lg flex items-center">
                  Projects <ArrowRight size={20} className="ml-2" />
                </button>
              </div>

              {/* Stats */}
              <div ref={heroStatsRef} className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">+{heroYears}</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{heroProjects}</div>
                  <div className="text-gray-600">Projects Done</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="pt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact</h3>
                <p className="text-red-500 font-medium">{personal.email}</p>
              </div>

              {/* Experience Badge */}
              <div className="flex items-center space-x-4 pt-4">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                  <Briefcase size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">IT Analyst and Product Manager</div>
                  <div className="text-gray-600 text-sm">specialized in Digital Transformation</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image with Floating Icons */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-red-400 via-purple-500 to-red-600 rounded-3xl p-8 overflow-hidden">
                {/* Professional Photo - Satish's actual photo */}
                <div className="relative z-10 text-center">
                  <div className="w-80 h-96 rounded-2xl mx-auto overflow-hidden mb-6 shadow-2xl border-4 border-white/20">
                    {/* Your actual professional photo will go here */}
                    <img 
                      src="/api/placeholder/320/384" 
                      alt="Satish - IT Product Manager"
                      className="w-full h-full object-cover object-center"
                      style={{
                        // Placeholder for your actual photo
                        // Replace src above with your actual photo URL
                        filter: 'brightness(1.1) contrast(1.1)'
                      }}
                    />
                    {/* Professional overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-lg font-bold drop-shadow-lg">{personal.name}</div>
                      <div className="text-sm opacity-90 drop-shadow-lg">IT Product Manager</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block">
                    <p className="text-white font-medium">Available for Leadership Roles</p>
                  </div>
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                </div>
                
                <div className="absolute top-32 left-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Monitor size={20} className="text-blue-500" />
                </div>
                
                <div className="absolute bottom-32 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Database size={20} className="text-purple-500" />
                </div>
                
                <div className="absolute bottom-48 left-12 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Cloud size={20} className="text-green-500" />
                </div>

                {/* Award Badge */}
                <div className="absolute top-4 right-16 bg-white rounded-xl p-3 shadow-lg">
                  <Trophy size={16} className="text-yellow-500 mb-1" />
                  <div className="text-xs font-semibold text-gray-800">Best PM</div>
                  <div className="text-xs text-gray-600">Awards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Dark */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div ref={projectStatsRef}>
              <h2 className="text-3xl font-bold mb-8">Project Statistics 2024</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Digital Transformation</span>
                  <span className="text-2xl font-bold">{digitalTransform}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-2000 ease-out" 
                    style={{ width: `${digitalTransform}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">SaaS Implementation</span>
                  <span className="text-2xl font-bold">{saasImplementation}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-2200 ease-out" 
                    style={{ width: `${saasImplementation}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Data Analytics</span>
                  <span className="text-2xl font-bold">{dataAnalytics}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-1800 ease-out" 
                    style={{ width: `${dataAnalytics}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Product Deliveries</span>
                  <span className="text-2xl font-bold">{productDeliveries}+</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 rounded-full h-2 transition-all duration-2300 ease-out" 
                    style={{ width: `${Math.min(productDeliveries, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <button className="mt-8 px-6 py-3 bg-yellow-500 text-black hover:bg-yellow-400 transition-colors font-semibold rounded-lg">
                Know More
              </button>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl p-8 text-center">
                <div className="text-4xl font-bold mb-2">{workingYears}+</div>
                <div className="text-lg">Years</div>
                <div className="text-sm opacity-90">Working Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">My Expertise</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Monitor className="text-blue-500" size={32} />,
                title: "Digital Transformation",
                description: "Leading enterprise-wide digital transformation initiatives with proven ROI"
              },
              {
                icon: <Database className="text-green-500" size={32} />,
                title: "Data Analytics & ML",
                description: "Implementing machine learning solutions and big data analytics platforms"
              },
              {
                icon: <Users className="text-purple-500" size={32} />,
                title: "Product Management",
                description: "Strategic product leadership with cross-functional team management expertise"
              }
            ].map((service, index) => (
              <div key={index} className="text-center p-8 hover:bg-gray-50 transition-colors rounded-xl">
                <div className="flex justify-center mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="work" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
          </div>
          
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <div className="text-red-500 font-semibold mb-1">{job.company}</div>
                    <div className="text-gray-500 text-sm flex items-center">
                      <Calendar size={14} className="mr-2" />
                      {job.period} • {job.location}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {job.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <Target size={16} className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm leading-relaxed">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Industries & Domain Expertise Section */}
      <section id="government" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Government Industries & Domain Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep expertise in regulatory compliance and government sector requirements across aviation, environmental, and federal agencies
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              {
                name: "ATPCO",
                fullName: "Airline Tariff Publishing Company",
                logo: "🛫",
                description: "Aviation pricing and tariff data standards",
                domain: "Aviation Regulatory"
              },
              {
                name: "IATA",
                fullName: "International Air Transport Association", 
                logo: "✈️",
                description: "Global airline industry standards and regulations",
                domain: "International Aviation"
              },
              {
                name: "SITA",
                fullName: "Société Internationale de Télécommunications",
                logo: "🌐",
                description: "Air transport communications and IT solutions",
                domain: "Aviation Technology"
              },
              {
                name: "DOT",
                fullName: "Department of Transportation",
                logo: "🚗",
                description: "Federal transportation policies and regulations",
                domain: "Federal Transportation"
              }
            ].map((org, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 text-center group hover:scale-105">
                <div className="text-4xl mb-4">{org.logo}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{org.name}</h3>
                <div className="text-sm text-red-500 font-medium mb-3">{org.domain}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{org.description}</p>
                <div className="text-xs text-gray-500">{org.fullName}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "EPA",
                fullName: "Environmental Protection Agency",
                logo: "🌱",
                description: "Federal environmental regulations and compliance",
                domain: "Environmental Compliance"
              },
              {
                name: "RCRA",
                fullName: "Resource Conservation and Recovery Act",
                logo: "♻️",
                description: "Hazardous waste management regulations",
                domain: "Waste Management"
              },
              {
                name: "State EPA",
                fullName: "State Environmental Protection Agencies",
                logo: "🏛️",
                description: "State-level environmental compliance requirements",
                domain: "State Regulations"
              },
              {
                name: "Federal EPA",
                fullName: "Federal Environmental Protection Agency",
                logo: "🇺🇸",
                description: "Federal environmental standards and enforcement",
                domain: "Federal Compliance"
              }
            ].map((org, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 text-center group hover:scale-105">
                <div className="text-4xl mb-4">{org.logo}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{org.name}</h3>
                <div className="text-sm text-green-600 font-medium mb-3">{org.domain}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{org.description}</p>
                <div className="text-xs text-gray-500">{org.fullName}</div>
              </div>
            ))}
          </div>

          {/* SME Highlights */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Subject Matter Expertise (SME)</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">🛡️</div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Regulatory Compliance</h4>
                <p className="text-gray-600 text-sm">100% RCRA & EPA compliance across 500+ facilities</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">✈️</div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Aviation Industry</h4>
                <p className="text-gray-600 text-sm">15+ GDS integrations and airline stakeholder management</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">🌍</div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Environmental Systems</h4>
                <p className="text-gray-600 text-sm">Waste management and environmental data systems</p>
              </div>
            </div>
          </div>

          {/* Compliance Metrics */}
          <div ref={complianceRef} className="mt-12 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-6">Compliance Track Record</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">{complianceRate}%</div>
                <div className="text-green-100">RCRA Compliance Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{facilitiesCount}+</div>
                <div className="text-green-100">Regulated Facilities</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{satisfactionRate}%</div>
                <div className="text-green-100">Stakeholder Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className={`${project.id === 4 ? 'lg:col-span-2' : ''} bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-gray-800">{project.category}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  {/* Special detailed view for Travel/Airline project */}
                  {project.id === 4 && (
                    <div className="mb-6 space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-3">Key Accomplishments:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              <span className="text-blue-800"><strong>38 Live NDC Integrations</strong> - Major airlines including Air France-KLM, Iberia, Turkish Airlines</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              <span className="text-blue-800"><strong>30M+ Incremental Bookings</strong> facilitated across global travel networks</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              <span className="text-blue-800"><strong>5-20% Airfare Savings</strong> through exclusive fares and dynamic offers</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              <span className="text-green-800"><strong>15-20% Workflow Improvements</strong> in shopping, booking, and servicing</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              <span className="text-green-800"><strong>Reduced Processing Errors</strong> and manual rework through centralized booking</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              <span className="text-green-800"><strong>Enhanced Traveler Experience</strong> with personalized, real-time offers</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Business Impact:</h4>
                        <p className="text-purple-800 text-sm">
                          Enabled travel agencies to access exclusive content and bundled ancillaries, resulting in higher traveler satisfaction 
                          and measurable program savings—often thousands of dollars annually for large corporate customers. 
                          Scaled adoption across both corporate and leisure segments globally.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="text-sm font-medium text-green-800">Impact:</div>
                    <div className="text-green-700 text-sm">{project.impact}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, project.id === 4 ? 6 : 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Travel Industry Impact Summary */}
          <div ref={travelImpactRef} className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Travel Industry Impact</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">{ndcIntegrations}</div>
                <div className="text-blue-100">NDC Airline Integrations</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{incrementalBookings}M+</div>
                <div className="text-blue-100">Incremental Bookings</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{workflowImprovement}%</div>
                <div className="text-blue-100">Workflow Improvement</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">${Math.floor(annualSavings/1000)}K+</div>
                <div className="text-blue-100">Annual Customer Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-red-500 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl mb-12 text-red-100">Ready to transform your business with technology?</p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <a href={`mailto:${personal.email}`} className="flex items-center space-x-2 text-red-100 hover:text-white transition-colors">
              <Mail size={20} />
              <span>{personal.email}</span>
            </a>
            <a href={`tel:${personal.phone}`} className="flex items-center space-x-2 text-red-100 hover:text-white transition-colors">
              <Phone size={20} />
              <span>{personal.phone}</span>
            </a>
          </div>
          
          <button className="px-8 py-4 bg-white text-red-500 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            Download Resume
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p>© 2024 {personal.name}. Crafted with excellence and innovation.</p>
      </footer>
    </div>
  );
};

export default PhotoHeroPortfolio;
import React from 'react';
import { ArrowRight, MapPin, Mail, Phone, Linkedin, Calendar, Building, ExternalLink, Download, Heart, Monitor, Database, Cloud, Users, Trophy, Briefcase, Target } from 'lucide-react';

// Option 5: Photo Hero Design (Inspired by Richard Brian/William Harry style)
const PhotoHeroPortfolio = ({ portfolioData }) => {
  const { personal, about, skills, experience, projects } = portfolioData;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">
            {personal.name.split(' ')[0]}<span className="text-red-500">.</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Works', 'About', 'Projects', 'Services'].map(item => (
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
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">+15</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">572</div>
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
                {/* Professional Photo Placeholder */}
                <div className="relative z-10 text-center">
                  <div className="w-80 h-96 bg-white/20 rounded-2xl mx-auto flex items-center justify-center mb-6">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">👨‍💼</div>
                      <div className="text-lg font-medium">Professional Photo</div>
                      <div className="text-sm opacity-80">Satish Kumar</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block">
                    <p className="text-white font-medium">Subscribe my Newsletter</p>
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
            <div>
              <h2 className="text-3xl font-bold mb-8">Project Statistics 2024</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Digital Transformation</span>
                  <span className="text-2xl font-bold">85</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-white rounded-full h-2 w-[85%]"></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">SaaS Implementation</span>
                  <span className="text-2xl font-bold">92</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-white rounded-full h-2 w-[92%]"></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Data Analytics</span>
                  <span className="text-2xl font-bold">78</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-white rounded-full h-2 w-[78%]"></div>
                </div>
              </div>
              
              <button className="mt-8 px-6 py-3 bg-yellow-500 text-black hover:bg-yellow-400 transition-colors font-semibold rounded-lg">
                Know More
              </button>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl p-8 text-center">
                <div className="text-4xl font-bold mb-2">15+</div>
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

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
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
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="text-sm font-medium text-green-800">Impact:</div>
                    <div className="text-green-700 text-sm">{project.impact}</div>
                  </div>
                  
                  <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            ))}
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
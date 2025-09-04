import React from 'react';
import { ArrowDown, MapPin, Mail, Phone, Linkedin, TrendingUp, Code, BarChart3, Cog, Users, Calendar, Building, ExternalLink, Download, Heart } from 'lucide-react';

// Option 2: Creative Tech Design (Current Style Enhanced)
const CreativeTechPortfolio = ({ portfolioData }) => {
  const { personal, about, skills, experience, projects } = portfolioData;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-slate-900">{personal.name}</div>
          <nav className="hidden md:flex space-x-8">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight">{personal.name}</h1>
          <div className="text-xl md:text-2xl text-slate-700 mb-4 font-medium">{personal.title}</div>
          <p className="text-lg text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">{personal.tagline}</p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-600" />
              <span>Dallas–Fort Worth, TX</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-600" />
              <span>{personal.email}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium">
              Explore My Work
            </button>
            <button className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-300 hover:scale-105 font-medium">
              Let's Connect
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">About Me</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-700 leading-relaxed">{about.description}</p>
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="font-semibold text-slate-900 mb-4">Core Expertise</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                  <div>• SaaS Platforms</div>
                  <div>• Big Data Analytics</div>
                  <div>• Machine Learning</div>
                  <div>• Digital Transformation</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <TrendingUp className="text-blue-600" size={24} />, title: "15+ Years", desc: "Experience" },
                { icon: <BarChart3 className="text-green-600" size={24} />, title: "$10M+", desc: "Programs" },
                { icon: <Users className="text-purple-600" size={24} />, title: "Cross-Functional", desc: "Leadership" },
                { icon: <Cog className="text-orange-600" size={24} />, title: "Business", desc: "Impact" }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">{item.icon}</div>
                  <h4 className="font-semibold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills with Tech Visualization */}
      <section id="skills" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">Skills & Expertise</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {skills.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-6">
                  {index === 0 && <BarChart3 size={24} className="text-blue-600" />}
                  {index === 1 && <Code size={24} className="text-green-600" />}
                  {index === 2 && <Cog size={24} className="text-purple-600" />}
                  {index === 3 && <Users size={24} className="text-orange-600" />}
                  <h3 className="text-xl font-semibold text-slate-900 ml-3">{category.category}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {category.items.map((skill, i) => (
                    <div key={i} className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-slate-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects with Tech Images */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-slate-700">{project.category}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{project.title}</h3>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="text-sm text-green-700">{project.impact}</div>
                  </div>
                  <button className="w-full bg-slate-900 text-white py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center group">
                    <span>View Details</span>
                    <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">Let's Connect</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg text-slate-300 mb-12">Ready to drive your next digital transformation?</p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <a href={`mailto:${personal.email}`} className="flex items-center space-x-2 text-slate-300 hover:text-blue-400 transition-colors">
              <Mail size={20} />
              <span>{personal.email}</span>
            </a>
            <a href={`tel:${personal.phone}`} className="flex items-center space-x-2 text-slate-300 hover:text-green-400 transition-colors">
              <Phone size={20} />
              <span>{personal.phone}</span>
            </a>
          </div>
          
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover:scale-105 font-medium">
            Download Resume
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 text-slate-400 text-center">
        <p>© 2024 {personal.name}. Made with innovation and precision.</p>
      </footer>
    </div>
  );
};

export default CreativeTechPortfolio;
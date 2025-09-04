import React from 'react';
import { ArrowDown, MapPin, Mail, Phone, Linkedin, TrendingUp, Code, BarChart3, Cog, Users, Calendar, Building, ExternalLink, Download, Heart, Award, Target, Shield } from 'lucide-react';

// Option 3: Executive Premium Design
const ExecutivePremiumPortfolio = ({ portfolioData }) => {
  const { personal, about, skills, experience, projects } = portfolioData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-amber-400">{personal.name}</div>
          <nav className="hidden md:flex space-x-8">
            {['About', 'Expertise', 'Leadership', 'Portfolio', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} 
                 className="text-slate-300 hover:text-amber-400 transition-colors font-medium tracking-wide">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-slate-900/50"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-slate-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
              Senior Executive • Digital Transformation Leader
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-light text-white mb-6 tracking-tight">
            {personal.name}
          </h1>
          
          <div className="text-2xl md:text-3xl text-amber-400 mb-6 font-light">
            {personal.title}
          </div>
          
          <p className="text-xl text-slate-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            {personal.tagline}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-16 text-slate-400">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-amber-500" />
              <span>Dallas–Fort Worth, TX</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-amber-500" />
              <span>{personal.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-amber-500" />
              <span>{personal.phone}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl font-semibold">
              Executive Portfolio
            </button>
            <button className="px-10 py-5 border-2 border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-black transition-all duration-300 hover:scale-105 font-semibold">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section id="about" className="py-24 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-8">Executive Profile</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-8">
              <p className="text-xl text-slate-300 leading-relaxed">
                {about.description}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { number: "15+", label: "Years Leadership", icon: <Award className="text-amber-500" size={24} /> },
                  { number: "$10M+", label: "Programs Delivered", icon: <TrendingUp className="text-amber-500" size={24} /> },
                  { number: "500+", label: "Stakeholders Led", icon: <Users className="text-amber-500" size={24} /> }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-slate-800/50 border border-amber-500/20 rounded-xl backdrop-blur-sm">
                    <div className="flex justify-center mb-4">{stat.icon}</div>
                    <div className="text-3xl font-light text-amber-400 mb-2">{stat.number}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-amber-500/20 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-amber-400 mb-6">Executive Expertise</h3>
                <div className="space-y-4 text-slate-300">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-4"></div>
                    <span>C-Level Strategic Planning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-4"></div>
                    <span>Digital Transformation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-4"></div>
                    <span>Cross-Functional Leadership</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-4"></div>
                    <span>Enterprise Architecture</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Experience */}
      <section id="leadership" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-8">Leadership Journey</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-500"></div>
            
            {experience.slice(0, 3).map((job, index) => (
              <div key={index} className="relative mb-16 ml-16">
                <div className="absolute -left-11 top-8 w-6 h-6 bg-amber-500 rounded-full border-4 border-slate-900"></div>
                
                <div className="p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-amber-500/20 rounded-xl backdrop-blur-sm hover:border-amber-500/40 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">{job.title}</h3>
                      <div className="flex items-center text-amber-400 mb-2">
                        <Building size={18} className="mr-2" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center text-slate-400">
                        <Calendar size={16} className="mr-2" />
                        <span>{job.period}</span>
                        <span className="mx-3">•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
                      {job.type}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {job.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                        <Target size={16} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm leading-relaxed">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Portfolio */}
      <section id="portfolio" className="py-24 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-8">Executive Portfolio</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img src={project.image} alt={project.title} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center bg-amber-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-amber-500/30">
                      {project.category === 'AI/ML' && <Code className="text-amber-400 mr-2" size={16} />}
                      {project.category === 'Digital Transformation' && <BarChart3 className="text-amber-400 mr-2" size={16} />}
                      {project.category === 'Compliance' && <Shield className="text-amber-400 mr-2" size={16} />}
                      <span className="text-amber-400 text-sm font-medium">{project.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">{project.title}</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-lg p-4 mb-6">
                    <div className="text-sm font-medium text-amber-400 mb-1">Executive Impact:</div>
                    <div className="text-slate-200 text-sm">{project.impact}</div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-3 px-6 rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 font-semibold group">
                    <span>View Case Study</span>
                    <ExternalLink size={16} className="ml-2 inline group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Contact */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-8">Executive Contact</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ready to drive transformational change? Let's discuss strategic opportunities.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-amber-500/20 rounded-xl backdrop-blur-sm">
                <h3 className="text-2xl font-semibold text-amber-400 mb-6">Direct Contact</h3>
                <div className="space-y-4">
                  <a href={`mailto:${personal.email}`} 
                     className="flex items-center p-4 bg-slate-900/50 rounded-lg hover:bg-slate-800/50 transition-colors group">
                    <Mail size={20} className="text-amber-500 mr-4" />
                    <div>
                      <div className="text-slate-300 group-hover:text-white transition-colors">Email</div>
                      <div className="text-amber-400">{personal.email}</div>
                    </div>
                  </a>
                  
                  <a href={`tel:${personal.phone}`} 
                     className="flex items-center p-4 bg-slate-900/50 rounded-lg hover:bg-slate-800/50 transition-colors group">
                    <Phone size={20} className="text-amber-500 mr-4" />
                    <div>
                      <div className="text-slate-300 group-hover:text-white transition-colors">Direct Line</div>
                      <div className="text-amber-400">{personal.phone}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-4 px-8 rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:scale-105 font-semibold text-lg">
                <Download size={20} className="mr-3 inline" />
                Executive Resume
              </button>
              
              <button className="w-full border-2 border-amber-500 text-amber-400 py-4 px-8 rounded-lg hover:bg-amber-500 hover:text-black transition-all duration-300 font-semibold text-lg">
                Schedule Strategic Consultation
              </button>
              
              <div className="text-center p-6 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <div className="flex items-center justify-center text-amber-400 mb-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="font-medium">Available for Executive Roles</span>
                </div>
                <p className="text-slate-400 text-sm">Open to C-Level and VP positions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="py-12 bg-black/60 backdrop-blur-sm border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-amber-400 text-xl font-semibold mb-4">{personal.name}</div>
          <div className="text-slate-400 mb-4">Executive Leader • Digital Transformation • Strategic Innovation</div>
          <div className="flex justify-center items-center text-slate-500">
            <span>© 2024 • Crafted with</span>
            <Heart size={16} className="mx-2 text-amber-500" />
            <span>excellence</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExecutivePremiumPortfolio;
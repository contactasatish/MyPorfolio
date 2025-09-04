import React from 'react';
import { ArrowDown, MapPin, Mail, Phone, Linkedin, TrendingUp, Code, BarChart3, Cog, Users, Calendar, Building, ExternalLink, Download, Heart, Zap, Star, Briefcase } from 'lucide-react';

// Option 4: Modern Portfolio Design
const ModernPortfolio = ({ portfolioData }) => {
  const { personal, about, skills, experience, projects } = portfolioData;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-8xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">SK</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{personal.name}</div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {['About', 'Skills', 'Work', 'Projects', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} 
                 className="text-gray-600 hover:text-indigo-600 transition-colors font-medium relative group">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-8xl mx-auto px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                  <Zap size={16} />
                  <span>Available for new opportunities</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                  Hi, I'm <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {personal.name.split(' ')[0]}
                  </span>
                </h1>
                
                <p className="text-2xl text-gray-700 font-light">
                  {personal.title}
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  {personal.tagline}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-indigo-500" />
                  <span>Dallas–Fort Worth, TX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-indigo-500" />
                  <span>{personal.email}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-105 font-semibold">
                  View My Work
                </button>
                <button className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 font-semibold">
                  Get In Touch
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '15+', label: 'Years Exp.', icon: <Star className="text-indigo-500" size={20} /> },
                    { number: '$10M+', label: 'Programs', icon: <TrendingUp className="text-purple-500" size={20} /> },
                    { number: '500+', label: 'Stakeholders', icon: <Users className="text-indigo-500" size={20} /> },
                    { number: '95%', label: 'Success Rate', icon: <Briefcase className="text-purple-500" size={20} /> }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                      <div className="flex justify-center mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-8xl mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">About Me</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-8"></div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {about.description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-200">
                  <h3 className="font-semibold text-indigo-900 mb-4 flex items-center">
                    <Code className="mr-2 text-indigo-600" size={20} />
                    Technical Skills
                  </h3>
                  <div className="space-y-2 text-sm text-indigo-800">
                    <div>• Salesforce, Python, SQL</div>
                    <div>• GCP, Snowflake, Tableau</div>
                    <div>• Machine Learning & AI</div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-4 flex items-center">
                    <BarChart3 className="mr-2 text-purple-600" size={20} />
                    Business Impact
                  </h3>
                  <div className="space-y-2 text-sm text-purple-800">
                    <div>• Digital Transformation</div>
                    <div>• Process Optimization</div>
                    <div>• Stakeholder Management</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold text-gray-900">15+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Projects Led</span>
                    <span className="font-semibold text-gray-900">50+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industries</span>
                    <span className="font-semibold text-gray-900">5+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certifications</span>
                    <span className="font-semibold text-gray-900">10+</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl">
                <h3 className="font-bold mb-2">Ready to collaborate?</h3>
                <p className="text-indigo-100 text-sm mb-4">Let's discuss how I can help drive your digital transformation.</p>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                  Let's Talk
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-8xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A comprehensive toolkit developed through years of hands-on experience
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-6">
            {skills.map((category, index) => (
              <div key={index} className="group">
                <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="flex items-center mb-6">
                    {index === 0 && <BarChart3 size={28} className="text-indigo-500 mr-3" />}
                    {index === 1 && <Code size={28} className="text-purple-500 mr-3" />}
                    {index === 2 && <Cog size={28} className="text-indigo-500 mr-3" />}
                    {index === 3 && <Users size={28} className="text-purple-500 mr-3" />}
                    <h3 className="text-lg font-bold text-gray-900">{category.category}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {category.items.map((skill, i) => (
                      <div key={i} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"></div>
                        <span className="text-gray-700 font-medium text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="work" className="py-20">
        <div className="max-w-8xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 rounded-full"></div>
            
            {experience.slice(0, 3).map((job, index) => (
              <div key={index} className="relative mb-12 ml-16">
                <div className="absolute -left-12 top-6 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Building size={16} className="text-white" />
                </div>
                
                <div className="p-8 bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-wrap justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <div className="text-indigo-600 font-semibold mb-1">{job.company}</div>
                      <div className="text-gray-500 text-sm">{job.period} • {job.location}</div>
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-sm font-medium">
                      {job.type}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {job.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                        <TrendingUp size={16} className="text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-8xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Showcasing impactful solutions that drive business transformation
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img src={project.image} alt={project.title} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl mb-6">
                    <div className="text-sm font-medium text-green-800 mb-1">Impact:</div>
                    <div className="text-green-700 text-sm">{project.impact}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold group">
                    <span>Explore Project</span>
                    <ExternalLink size={16} className="ml-2 inline group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-8xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Let's Work Together</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ready to transform your business? I'm here to help you achieve your goals.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <a href={`mailto:${personal.email}`} 
                   className="flex items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">Email Me</div>
                    <div className="text-gray-600">{personal.email}</div>
                  </div>
                </a>
                
                <a href={`tel:${personal.phone}`} 
                   className="flex items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">Call Me</div>
                    <div className="text-gray-600">{personal.phone}</div>
                  </div>
                </a>
                
                <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="font-semibold">Available for Projects</span>
                  </div>
                  <p className="text-indigo-100 text-sm">Open to new opportunities and collaborations</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 font-semibold text-lg">
                  <Download size={20} className="mr-3 inline" />
                  Download Resume
                </button>
                
                <a href={`https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer"
                   className="w-full flex items-center justify-center border-2 border-indigo-600 text-indigo-600 py-4 px-8 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all duration-300 font-semibold text-lg">
                  <Linkedin size={20} className="mr-3" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-8xl mx-auto px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
              <span className="font-bold text-lg">SK</span>
            </div>
            <div className="text-xl font-bold">{personal.name}</div>
          </div>
          <p className="text-gray-400 mb-4">Transforming businesses through technology and innovation</p>
          <div className="flex justify-center items-center text-gray-500">
            <span>© 2024 • Built with</span>
            <Heart size={16} className="mx-2 text-indigo-500" />
            <span>and modern technology</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernPortfolio;
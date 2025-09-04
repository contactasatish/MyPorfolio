import React from 'react';
import { ArrowDown, MapPin, Mail, Phone, Linkedin, TrendingUp, Code, BarChart3, Cog, Users, Calendar, Building, ExternalLink, Download, Heart } from 'lucide-react';

// Option 1: Minimalist Corporate Design
const MinimalistPortfolio = ({ portfolioData }) => {
  const { personal, about, skills, experience, projects } = portfolioData;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold">{personal.name}</div>
          <nav className="hidden md:flex space-x-8">
            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 max-w-6xl mx-auto px-6">
        <div className="text-center py-20">
          <h1 className="text-5xl font-light mb-4 tracking-tight">{personal.name}</h1>
          <p className="text-xl text-gray-600 mb-2">{personal.title}</p>
          <p className="text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">{personal.tagline}</p>
          
          <div className="flex justify-center space-x-8 text-sm text-gray-500 mb-12">
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>Dallas-Fort Worth, TX</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>{personal.email}</span>
            </div>
          </div>
          
          <div className="space-x-4">
            <button className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors">
              View Projects
            </button>
            <button className="px-8 py-3 border border-gray-300 hover:border-gray-400 transition-colors">
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light mb-6">About</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{about.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="border-l-2 border-gray-300 pl-4">
                  <div className="font-semibold text-gray-900">15+</div>
                  <div className="text-gray-500">Years Experience</div>
                </div>
                <div className="border-l-2 border-gray-300 pl-4">
                  <div className="font-semibold text-gray-900">$10M+</div>
                  <div className="text-gray-500">Programs Managed</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-white border border-gray-200">
                <h3 className="font-semibold mb-3">Core Expertise</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Digital Transformation</div>
                  <div>• Product Management</div>
                  <div>• SaaS Implementation</div>
                  <div>• Big Data Analytics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-light mb-12 text-center">Experience</h2>
          <div className="space-y-8">
            {experience.slice(0, 3).map((job, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-8 pb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.company} • {job.period}</p>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{job.type}</span>
                </div>
                <ul className="space-y-2 text-gray-600">
                  {job.achievements.slice(0, 2).map((achievement, i) => (
                    <li key={i} className="text-sm">• {achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-light mb-12 text-center">Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((category, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200">
                <h3 className="font-semibold mb-4">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-light mb-12 text-center">Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                  <div className="text-xs text-green-600 mb-4">{project.impact}</div>
                  <button className="text-sm text-gray-900 border-b border-gray-300 hover:border-gray-900">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-6">Contact</h2>
          <p className="text-gray-600 mb-8">Ready to discuss your next project?</p>
          <div className="flex justify-center space-x-8 mb-8">
            <a href={`mailto:${personal.email}`} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Mail size={20} />
              <span>{personal.email}</span>
            </a>
            <a href={`tel:${personal.phone}`} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Phone size={20} />
              <span>{personal.phone}</span>
            </a>
          </div>
          <button className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors">
            Download Resume
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>© 2024 {personal.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MinimalistPortfolio;
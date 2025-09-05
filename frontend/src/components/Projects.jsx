import React from 'react';
import { portfolioData } from '../data/mock';
import { ExternalLink, Code, BarChart3, Shield, Plane } from 'lucide-react';

const Projects = () => {
  const { projects } = portfolioData;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'AI/ML':
        return <Code className="text-purple-600" size={20} />;
      case 'Digital Transformation':
        return <BarChart3 className="text-blue-600" size={20} />;
      case 'Compliance':
        return <Shield className="text-green-600" size={20} />;
      case 'Aviation Technology':
        return <Plane className="text-orange-600" size={20} />;
      default:
        return <Code className="text-slate-600" size={20} />;
    }
  };

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Showcasing innovative solutions that drive business transformation and deliver measurable impact
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  {getCategoryIcon(project.category)}
                  <span className="ml-2 text-sm font-medium text-slate-700">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Impact Badge */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="text-sm font-medium text-green-800">Impact:</div>
                  <div className="text-sm text-green-700">{project.impact}</div>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-slate-700 mb-2">Technologies Used:</div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Removed non-functional View Project Details button */}
              </div>
            </div>
          ))}
        </div>

        {/* Project Metrics */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
            Project Impact Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-light text-blue-600 mb-2">260+</div>
              <div className="text-slate-600">Hours Saved</div>
              <div className="text-sm text-slate-500 mt-1">Through AI Automation</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-green-600 mb-2">$5M+</div>
              <div className="text-slate-600">Efficiency Gains</div>
              <div className="text-sm text-slate-500 mt-1">Process Optimization</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-purple-600 mb-2">99%</div>
              <div className="text-slate-600">Compliance Rate</div>
              <div className="text-sm text-slate-500 mt-1">Regulatory Standards</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-orange-600 mb-2">38</div>
              <div className="text-slate-600">NDC Integrations</div>
              <div className="text-sm text-slate-500 mt-1">Airline Partnerships</div>
            </div>
          </div>
          
          {/* Additional metrics row for Travel/Airline solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-slate-200">
            <div className="text-center">
              <div className="text-4xl font-light text-orange-600 mb-2">30M+</div>
              <div className="text-slate-600">Incremental Bookings</div>
              <div className="text-sm text-slate-500 mt-1">Travel Platform</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-blue-600 mb-2">5-20%</div>
              <div className="text-slate-600">Airfare Savings</div>
              <div className="text-sm text-slate-500 mt-1">Cost Optimization</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;